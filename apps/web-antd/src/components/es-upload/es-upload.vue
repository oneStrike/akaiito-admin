<script setup lang="ts">
import type { UploadFile } from 'ant-design-vue';

import type { EsUploadProps } from '#/components/es-upload/types';

import { UploadLoop } from '@vben/icons';

import { message } from 'ant-design-vue';

import { useUpload } from '#/hooks/useUpload';

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
  batchUpload: true,
  batchSize: 5,
  batchInterval: 1000,
  autoUpload: true,
  showProgress: true,
  modelValue: () => [],
});

const fileList = defineModel<Required<UploadFile>[]>({
  default: () => [],
});

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
  params.onError();
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
