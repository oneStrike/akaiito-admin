<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { noticePageApi } from '#/apis';
import {
  enablePlatform,
  noticePriority,
  noticeType,
} from '#/views/app-manager/notice/shared';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
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
      component: 'Input',
      defaultValue: '',
      fieldName: 'title',
      label: '',
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
};

const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'center', field: 'title', title: '通知标题' },
    { field: 'noticeType', title: '通知类型' },
    { field: 'enablePlatform', title: '发布平台' },
    { field: 'priorityLevel', title: '紧急程度' },
    { field: 'pageCode', title: '跳转页面' },
    { field: 'price', title: '结束时间' },
    { field: 'price1', title: '发布状态' },
    { field: 'price2', title: '操作' },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const { list } = await noticePageApi({
          pageIndex: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return { items: list };
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
