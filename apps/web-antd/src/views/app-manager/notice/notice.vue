<script lang="ts" setup>
import { Page, useVbenModal, VbenButton } from '@vben/common-ui';

import EsModalForm from '#/components/es-modal-form/index.vue';

const [ModalForm, modalApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

function openModal() {
  modalApi.open();
}
</script>

<template>
  <Page>
    <ModalForm
      :schema="[
        {
          // 组件需要在 #/adapter.ts内注册，并加上类型
          component: 'Input',
          // 对应组件的参数
          componentProps: {
            placeholder: '请输入用户名',
          },
          // 字段名
          fieldName: 'username',
          // 界面显示的label
          label: '字符串',
        },
      ]"
    />
    <VbenButton @click="openModal">Open</VbenButton>
  </Page>
</template>
