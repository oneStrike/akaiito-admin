<script lang="ts" setup>
import { Page, useVbenModal } from '@vben/common-ui';

import EsModalForm from '#/components/es-modal-form/index.vue';
import { formSchema, noticeColumns } from '#/views/app-manager/notice/shared';

const [ModalForm, modalApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

function openModal() {
  modalApi.open();
}

async function handleSubmit(values: any) {
  console.error(values);
}
</script>

<template>
  <Page auto-content-height>
    <EsTable :columns="noticeColumns" />

    <ModalForm :schema="formSchema" :on-submit="handleSubmit" />
  </Page>
</template>
