<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ClientPagePageResponse } from '#/apis/types/clientPage';
import type { NoticeDetailResponse } from '#/apis/types/notice';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { clientPagePageApi, noticePageApi } from '#/apis';
import { useBitMask } from '#/hooks/useBitmask';
import { useDate } from '#/hooks/useDate';
import {
  enablePlatform,
  noticePriority,
  noticePriorityObject,
  noticeType,
  noticeTypeObject,
} from '#/views/app-manager/notice/shared';

const clientPages = ref<ClientPagePageResponse['list']>();
const formOptions = computed<VbenFormProps>(() => ({
  fieldMappingTime: [['date', ['start', 'end']]],
  schema: [
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: noticeType,
        placeholder: '通知类型',
      },
      fieldName: 'noticeType',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: noticePriority,
        placeholder: '优先级',
      },
      fieldName: 'priorityLevel',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: enablePlatform,
        placeholder: '通知平台',
      },
      fieldName: 'enablePlatform',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: clientPages.value,
        placeholder: '关联页面',
        showSearch: true,
        filterOption: (value: string, option: Record<string, any>) => {
          return option.label.includes(value);
        },
      },
      fieldName: 'pageCode',
    },
    {
      component: 'Input',
      fieldName: 'title',
      componentProps: {
        placeholder: '通知标题',
      },
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
}));

clientPagePageApi({
  pageSize: 500,
}).then((data) => {
  clientPages.value = data.list?.map((item) => ({
    label: item.pageName,
    value: item.pageCode,
    ...item,
  }));
});

const gridOptions: VxeTableGridOptions<NoticeDetailResponse> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'center', field: 'title', title: '通知标题' },
    {
      field: 'noticeType',
      title: '通知类型',
      width: 150,
      formatter: ({ cellValue }) => {
        return noticeTypeObject[cellValue] || '-';
      },
    },
    {
      field: 'enablePlatform',
      title: '发布平台',
      width: 150,
      formatter: ({ cellValue }) => {
        const labels = useBitMask.getLabels(cellValue, enablePlatform);
        return labels ? labels.join(', ') : '-';
      },
    },
    {
      field: 'priorityLevel',
      title: '紧急程度',
      width: 150,
      formatter: ({ cellValue }) => {
        return noticePriorityObject[cellValue] || '-';
      },
    },
    {
      field: 'pageCode',
      title: '跳转页面',
      width: 150,
      formatter: ({ cellValue }) => {
        return (
          clientPages.value?.find((item) => item.pageCode === cellValue)
            ?.pageName || '-'
        );
      },
    },
    {
      field: 'publishStartTime',
      title: '开始时间',
      width: 180,
      formatter: ({ cellValue }) => {
        return useDate.formatDate(cellValue) || '-';
      },
    },
    {
      field: 'publishEndTime',
      title: '结束时间',
      width: 180,
      formatter: ({ cellValue }) => {
        return useDate.formatDate(cellValue) || '-';
      },
    },
    { field: 'price1', title: '发布状态', width: 150 },
    { field: 'price2', title: '操作', width: 160 },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
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
  },
  sortConfig: {
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
};

const [Grid] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <Grid />
  </Page>
</template>
