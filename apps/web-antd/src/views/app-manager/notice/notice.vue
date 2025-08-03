<script lang="ts" setup>
import { Page, useVbenModal, VbenButton } from '@vben/common-ui';

import EsModalForm from '#/components/es-modal-form/index.vue';
import { formSchema } from '#/views/app-manager/notice/shared';

const [ModalForm, modalApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

function openModal() {
  modalApi.open();
}
</script>

<template>
  <Page>
    <ModalForm :schema="formSchema" />
    <VbenButton @click="openModal">Open</VbenButton>
  </Page>
</template>
