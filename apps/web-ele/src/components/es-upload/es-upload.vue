<script setup lang="ts">
import type { UploadFile } from 'ant-design-vue';

import type { EsUploadProps } from '#/components/es-upload/types';

import { UploadLoop } from '@vben/icons';

import { message } from 'ant-design-vue';
import { cloneDeep, random, uniqueId } from 'lodash-es';

import { useUpload } from '#/hooks/useUpload';
import { safeParseJson } from '#/utils/parseJson';

// 移除message导入，使用useUpload中的消息提示

defineOptions({
  name: 'EsUpload',
});

const props = withDefaults(defineProps<EsUploadProps>(), {
  accept: 'image/*',
  maxCount: 10,
  listType: 'picture-card',
  multiple: true,
  maxSize: 200 * 1024 * 1024, // 默认200MB，单位为字节
  autoUpload: true,
  showProgress: true,
  modelValue: () => [],
  returnDataType: 'url',
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: EsUploadProps['modelValue']): void;
}>();

const fileList = ref<UploadFile[]>([]);
const fileListDataType: EsUploadProps['returnDataType'] = props.returnDataType;

function formatFileList(files: EsUploadProps['modelValue']) {
  if (Array.isArray(files)) {
    files.forEach((file) => {
      if (typeof file === 'string') {
        formatFileList(file);
      } else {
        fileList.value.push({
          uid: `${uniqueId()}_${random(1000, 9999)}`,
          size: file.fileSize,
          name: file.originalName,
          url: file.filePath,
          status: 'done',
          response: cloneDeep(file),
        });
      }
    });
  } else {
    const json = safeParseJson(files);
    if (json) {
      formatFileList(json);
    } else {
      const fileName = files.split('/').pop();
      fileList.value.push({
        uid: `${uniqueId()}_${random(1000, 9999)}`,
        size: 0,
        name: fileName ?? '',
        url: files,
        status: 'done',
        response: { filePath: files },
      });
    }
  }
}

let skipModalValueWatch = false;
watch(
  () => props.modelValue,
  (val) => {
    if (skipModalValueWatch) {
      skipModalValueWatch = false;
      return;
    }
    fileList.value = [];
    formatFileList(val);
  },
  { immediate: true, deep: true },
);

function beforeUpload(file: UploadFile) {
  if ((file?.size ?? Number.MAX_VALUE) > props.maxSize) {
    message.error(`文件${file.name}大小超出限制`);
    return false;
  }
  if (fileList.value.length >= props.maxCount) {
    message.error(`文件超出数量限制`);
    return false;
  }
  return true;
}

function handlerModalValue() {
  if (!Array.isArray(fileList.value) || fileList.value.length === 0) {
    emit('update:modelValue', []);
    return;
  }

  let data;
  if (fileListDataType === 'url') {
    data = fileList.value.map((item) => item.response.filePath).join(',');
  } else if (fileListDataType === 'array') {
    data = fileList.value.map((item) => item.response?.filePath);
  } else {
    data = JSON.stringify(fileList.value.map((item) => item.response));
  }

  emit('update:modelValue', data);
}
async function customRequest(params: Record<string, any>) {
  params.onProgress({ percent: 0 });

  const { success, error } = await useUpload(
    params.file,
    params.data,
    'common',
    // 进度回调函数
    (progressEvent) => {
      params.onProgress({
        percent: progressEvent.percent,
      });
    },
  );
  if (error?.length) {
    message.error(error[0].message);
    return;
  }
  params.onSuccess(success[0]);
  skipModalValueWatch = true;
  handlerModalValue();
}
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
