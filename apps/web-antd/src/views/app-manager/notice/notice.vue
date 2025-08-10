<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  CreateNoticeDto,
  NoticeDetailResponse,
  NoticePageResponseDto,
  UpdateNoticeDto,
} from '#/apis/types/notice';

import { Page, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  clientPagePageApi,
  createNoticeApi,
  noticeDetailApi,
  noticePageApi,
  updateNoticeApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useBitMask } from '#/hooks/useBitmask';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  enablePlatform,
  formSchema,
  noticeColumns,
  noticeFilter,
  noticePriorityObj,
  noticeTypeObj,
} from './shared';

const currentRecord = ref<NoticeDetailResponse>();
const clientPageObj = ref<Record<string, string>>({});

clientPagePageApi({
  pageSize: 500,
}).then((res) => {
  const pageOptions =
    res.list?.map((pageItem) => {
      clientPageObj.value[pageItem.pageCode] = pageItem.pageName;
      return {
        label: pageItem.pageName,
        value: pageItem.pageCode, // 使用 pageCode 作为 value
        ...pageItem,
      };
    }) || [];

  noticeFilter.forEach((item) => {
    if (item.fieldName === 'pageCode' && item.componentProps) {
      (item.componentProps as any).options = pageOptions;
    }
  });
  formSchema.forEach((item) => {
    if (item.fieldName === 'pageCode' && item.componentProps) {
      (item.componentProps as any).options = pageOptions;
    }
  });

  gridApi.formApi.updateSchema(noticeFilter);
});

const gridOptions: VxeGridProps<NoticePageResponseDto> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: noticeColumns,
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await noticePageApi({
          pageIndex: --page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
    sort: true,
  },

  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    zoom: true,
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(noticeFilter),
  gridOptions,
});

async function openFormModal(row?: NoticePageResponseDto) {
  let record;
  if (row) {
    record = await noticeDetailApi({ id: row.id });
  }
  formApi
    .setData({ title: '通知公告', record, bitMaskField: ['enablePlatform'] })
    .open();
}

async function handleSubmit(values: CreateNoticeDto | UpdateNoticeDto) {
  await (values?.id
    ? updateNoticeApi(values as UpdateNoticeDto)
    : createNoticeApi(values as CreateNoticeDto));
  formApi.close();
  message.success('操作成功');
  gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <a-button class="ml-2" type="primary" @click="openFormModal()">
          添加
        </a-button>
      </template>
      <template #noticeType="{ row }">
        <a-typography-text
          :style="{ color: noticeTypeObj[row.noticeType]?.color }"
        >
          {{ noticeTypeObj[row.noticeType]?.label }}
        </a-typography-text>
      </template>
      <template #priorityLevel="{ row }">
        <a-typography-text
          :style="{ color: noticePriorityObj[row.priorityLevel]?.color }"
        >
          {{ noticePriorityObj[row.priorityLevel]?.label }}
        </a-typography-text>
      </template>
      <template #pageCode="{ row }">
        <a-typography-text>
          {{ row.pageCode ? clientPageObj[row.pageCode] : '-' }}
        </a-typography-text>
      </template>
      <template #enablePlatform="{ row }">
        <a-typography-text>
          {{
            useBitMask.getLabels(row.enablePlatform, enablePlatform).join('、')
          }}
        </a-typography-text>
      </template>
      <template #actions="{ row }">
        <a-button @click="openFormModal(row)">编辑</a-button>
      </template>
    </Grid>

    <Form
      :record="currentRecord"
      :schema="formSchema"
      :on-submit="handleSubmit"
    />
  </Page>
</template>
