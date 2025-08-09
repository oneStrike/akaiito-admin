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

const sharedData = ref<Partial<EsModalFormProps>>({
  title: '',
});

const modalTitle = computed(() => {
  return Object.keys(props.record).length > 0
    ? `编辑${sharedData.value?.title ?? ''}`
    : `新增${sharedData.value?.title ?? ''}`;
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  animationType: 'scale',
  onConfirm: () => formApi.submitForm(),
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      sharedData.value = modalApi.getData<EsModalFormProps>();
      if (sharedData.value?.record) {
        formApi.setValues(sharedData.value.record);
      }
    }
  },
});

const [BaseForm, formApi] = useVbenForm({
  layout: 'vertical',
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 md:grid-cols-2 gap-4',
  handleSubmit: async (values) => {
    modalApi.lock();
    await props.onSubmit?.(values);
    modalApi.unlock();
  },
  schema: props.schema,
});
</script>
<template>
  <Modal :title="modalTitle" class="w-[800px]">
    <template #prepend-footer>
      <a-button @click="formApi.resetForm()">重置</a-button>
    </template>
    <BaseForm />
  </Modal>
</template>
