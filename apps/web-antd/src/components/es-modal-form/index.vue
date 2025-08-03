<script lang="ts" setup>
import type { EsModalFormProps } from './types';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'EsModalForm',
});

const props = withDefaults(defineProps<EsModalFormProps>(), {
  record: () => ({}),
});

const modalTitle = computed(() => {
  return Object.keys(props.record).length > 0
    ? `编辑${props.title ?? ''}`
    : `新增${props.title ?? ''}`;
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  animationType: 'scale',
  onConfirm: () => formApi.submitForm(),
});

const [BaseForm, formApi] = useVbenForm({
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
  handleSubmit: async (values) => {
    modalApi.lock();
    await props.onSubmit?.(values);
    modalApi.unlock();
  },
  schema: props.schema,
});
</script>
<template>
  <Modal :title="modalTitle" class="w-[900px]">
    <template #prepend-footer>
      <a-button @click="formApi.resetForm()">重置</a-button>
    </template>
    <BaseForm />
  </Modal>
</template>
