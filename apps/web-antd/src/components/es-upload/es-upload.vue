<script setup lang="ts">
import type { UploadChangeParam, UploadFile } from 'ant-design-vue';

import type {
  BatchUploadStatus,
  EsUploadProps,
} from '#/components/es-upload/types';

import { UploadLoop } from '@vben/icons';

// 移除message导入，使用useUpload中的消息提示
import { useUpload } from '#/hooks/useUpload';

defineOptions({
  name: 'EsUpload',
});

const props = withDefaults(defineProps<EsUploadProps>(), {
  accept: 'image/*',
  maxCount: 10,
  listType: 'picture-card',
  multiple: true,
  maxSize: 2 * 1024 * 1024, // 默认2MB，单位为字节
  batchUpload: true,
  batchSize: 5,
  batchInterval: 1000,
  autoUpload: true,
  modelValue: () => [],
});

const emit = defineEmits<{
  batchComplete: [status: BatchUploadStatus];
  batchError: [status: BatchUploadStatus, error: any];
  batchProgress: [status: BatchUploadStatus];
  batchStart: [status: BatchUploadStatus];
  change: [fileList: UploadFile[]];
  remove: [file: UploadFile];
  'update:modelValue': [urls: string[]];
}>();

const fileList = ref<UploadFile[]>([]);
const pendingFiles = ref<UploadFile[]>([]);
const batchStatus = ref<BatchUploadStatus>({
  total: 0,
  uploaded: 0,
  failed: 0,
  uploading: false,
  progress: 0,
});

// 批量上传定时器
let batchTimer: NodeJS.Timeout | null = null;

// 初始化文件列表（从modelValue）
watchEffect(() => {
  if (props.modelValue && props.modelValue.length > 0) {
    fileList.value = props.modelValue.map((url, index) => ({
      uid: `${Date.now()}-${index}`,
      name: url.split('/').pop() || `file-${index}`,
      status: 'done',
      url,
      response: { url },
    }));
  }
});

// 更新双向绑定的值
function updateModelValue() {
  const urls = fileList.value
    .filter(
      (file) => file.status === 'done' && (file.url || file.response?.url),
    )
    .map((file) => file.url || file.response?.url);
  emit('update:modelValue', urls);
}

function beforeUpload(file: UploadFile) {
  const fileSizeInBytes = file?.size ?? 0;

  if (fileSizeInBytes > props.maxSize) {
    const maxSizeInMB = (props.maxSize / (1024 * 1024)).toFixed(1);
    console.error(`${file.name}大小不能超过${maxSizeInMB}M`);
    return false;
  }

  // 文件数量检查
  if (props.maxCount && fileList.value.length >= props.maxCount) {
    console.error(`最多只能上传 ${props.maxCount} 个文件`);
    return false;
  }

  if (props.autoUpload && props.batchUpload) {
    // 批量上传模式：阻止默认上传，添加到待上传队列
    pendingFiles.value.push(file);
    scheduleBatchUpload();
    return false;
  } else if (!props.autoUpload) {
    // 手动上传模式：阻止默认上传，仅添加到队列
    file.status = 'done';
    pendingFiles.value.push(file);
    return false;
  }

  // 自动单文件上传模式：允许默认上传流程
  return true;
}

function handleChange(info: UploadChangeParam) {
  // 过滤掉大小超出限制的文件
  const validFiles = info.fileList.filter((file) => {
    const fileSizeInBytes = file?.size ?? 0;
    return fileSizeInBytes <= props.maxSize;
  });

  let newFileList = [...validFiles];

  // 限制文件数量
  if (props.maxCount) {
    newFileList = newFileList.slice(-props.maxCount);
  }

  fileList.value = newFileList;
  emit('change', newFileList);

  // 更新双向绑定
  updateModelValue();
}

function handleRemove(file: UploadFile) {
  // 从待上传队列中移除
  const index = pendingFiles.value.findIndex((f) => f.uid === file.uid);
  if (index !== -1) {
    pendingFiles.value.splice(index, 1);
  }
  emit('remove', file);

  // 更新双向绑定
  updateModelValue();
}

// 批量上传处理函数
async function processBatchUpload(files: UploadFile[]) {
  if (files.length === 0) return;

  batchStatus.value = {
    total: files.length,
    uploaded: 0,
    failed: 0,
    uploading: true,
    progress: 0,
  };

  emit('batchStart', { ...batchStatus.value });

  try {
    if (props.batchUpload && files.length > props.batchSize) {
      // 分批上传
      const batches = [];
      for (let i = 0; i < files.length; i += props.batchSize) {
        batches.push(files.slice(i, i + props.batchSize));
      }

      for (const batch of batches) {
        try {
          // 更新文件状态为上传中
          batch.forEach((file) => {
            file.status = 'uploading';
          });

          const result = await useUpload(batch, {}, 'common', false);

          // 处理上传结果
          if (result.success && result.success.length > 0) {
            batch.forEach((file, index) => {
              if (index < result.success.length) {
                file.status = 'done';
                file.response = result.success[index];
                file.url = result.success[index].url || result.success[index];
                batchStatus.value.uploaded++;
              } else {
                file.status = 'error';
                batchStatus.value.failed++;
              }
            });
          } else {
            batch.forEach((file) => {
              file.status = 'error';
              batchStatus.value.failed++;
            });
          }

          // 更新进度
          batchStatus.value.progress = Math.round(
            ((batchStatus.value.uploaded + batchStatus.value.failed) /
              batchStatus.value.total) *
              100,
          );

          emit('batchProgress', { ...batchStatus.value });

          // 批次间延迟
          if (batches.indexOf(batch) < batches.length - 1) {
            await new Promise((resolve) =>
              setTimeout(resolve, props.batchInterval),
            );
          }
        } catch (error) {
          // 批次上传失败
          batch.forEach((file) => {
            file.status = 'error';
            batchStatus.value.failed++;
          });

          batchStatus.value.progress = Math.round(
            ((batchStatus.value.uploaded + batchStatus.value.failed) /
              batchStatus.value.total) *
              100,
          );

          emit('batchError', { ...batchStatus.value }, error);
        }
      }
    } else {
      // 一次性上传所有文件
      try {
        files.forEach((file) => {
          file.status = 'uploading';
        });

        const result = await useUpload(files, {}, 'common', false);

        if (result.success && result.success.length > 0) {
          files.forEach((file, index) => {
            if (index < result.success.length) {
              file.status = 'done';
              file.response = result.success[index];
              file.url = result.success[index].url || result.success[index];
              batchStatus.value.uploaded++;
            } else {
              file.status = 'error';
              batchStatus.value.failed++;
            }
          });
        } else {
          files.forEach((file) => {
            file.status = 'error';
            batchStatus.value.failed++;
          });
        }

        batchStatus.value.progress = 100;
        emit('batchProgress', { ...batchStatus.value });
      } catch (error) {
        files.forEach((file) => {
          file.status = 'error';
          batchStatus.value.failed++;
        });
        batchStatus.value.progress = 100;
        emit('batchError', { ...batchStatus.value }, error);
      }
    }

    batchStatus.value.uploading = false;
    emit('batchComplete', { ...batchStatus.value });

    // 更新双向绑定
    updateModelValue();

    // 批量上传完成，不显示消息提示（由外部处理）
  } catch (error) {
    batchStatus.value.uploading = false;
    emit('batchError', { ...batchStatus.value }, error);
  }
}

// 延迟批量上传处理
function scheduleBatchUpload() {
  if (batchTimer) {
    clearTimeout(batchTimer);
  }

  batchTimer = setTimeout(() => {
    if (pendingFiles.value.length > 0) {
      const filesToUpload = [...pendingFiles.value];
      pendingFiles.value = [];
      processBatchUpload(filesToUpload);
    }
  }, props.batchInterval);
}

const customRequest = async (options: any) => {
  const { file, onSuccess, onError } = options;

  try {
    // 不显示消息提示，因为useUpload已经处理了
    const result = await useUpload(file, {}, 'common', false);

    if (result.success && result.success.length > 0) {
      // 更新文件状态
      const fileIndex = fileList.value.findIndex((f) => f.uid === file.uid);
      if (fileIndex !== -1) {
        fileList.value[fileIndex].status = 'done';
        fileList.value[fileIndex].response = result.success[0];
        // 设置文件URL
        const uploadResult = result.success[0];
        fileList.value[fileIndex].url =
          uploadResult.url || uploadResult.path || uploadResult;
      }
      updateModelValue();
      onSuccess(result.success[0]);
    } else {
      // 更新文件状态为错误
      const fileIndex = fileList.value.findIndex((f) => f.uid === file.uid);
      if (fileIndex !== -1) {
        fileList.value[fileIndex].status = 'error';
      }
      onError(new Error('上传失败'));
    }
  } catch (error) {
    // 更新文件状态为错误
    const fileIndex = fileList.value.findIndex((f) => f.uid === file.uid);
    if (fileIndex !== -1) {
      fileList.value[fileIndex].status = 'error';
    }
    onError(error);
  }
};

// 暴露批量上传方法供外部调用
defineExpose({
  batchUpload: () => {
    if (pendingFiles.value.length > 0) {
      const filesToUpload = [...pendingFiles.value];
      pendingFiles.value = [];
      return processBatchUpload(filesToUpload);
    }
    return Promise.resolve();
  },
  clearPending: () => {
    pendingFiles.value = [];
  },
  getPendingFiles: () => [...pendingFiles.value],
  getBatchStatus: () => ({ ...batchStatus.value }),
});

// 组件卸载时清理定时器
onUnmounted(() => {
  if (batchTimer) {
    clearTimeout(batchTimer);
  }
});
</script>

<template>
  <div>
    <a-upload
      v-model:file-list="fileList"
      :accept="accept"
      :max-count="maxCount"
      :list-type="listType"
      :multiple="multiple"
      :data="data"
      :disabled="disabled"
      :name="name"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      @change="handleChange"
      @remove="handleRemove"
    >
      <div
        class="hover:text-primary flex size-full items-center justify-center text-gray-500"
      >
        <UploadLoop class="size-7" />
      </div>
    </a-upload>
  </div>
</template>

<style scoped></style>
