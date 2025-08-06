<script lang="ts" setup>
import { Page, useVbenModal } from '@vben/common-ui';

import { noticePageApi } from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import {
  formSchema,
  noticeColumns,
  noticeFilter,
} from '#/views/app-manager/notice/shared';

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
    <div class="h-full rounded-lg bg-white p-4">
      <EsTable
        :columns="noticeColumns"
        :request-api="noticePageApi"
        :filter-schema="noticeFilter"
      />

      <ModalForm :schema="formSchema" :on-submit="handleSubmit" />
    </div>
  </Page>
</template>
