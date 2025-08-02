<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ClientPagePageResponse } from '#/apis/types/clientPage';
import type { NoticePageResponseDto } from '#/apis/types/notice';

import { Page } from '@vben/common-ui';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  batchDeleteNoticeApi,
  batchUpdateNoticeStatusApi,
  clientPagePageApi,
  noticePageApi,
} from '#/apis';
import { useBitMask } from '#/hooks/useBitmask';
import { useDate } from '#/hooks/useDate';
import {
  enablePlatform,
  noticePriority,
  noticePriorityObject,
  noticeType,
  noticeTypeObject,
} from '#/views/app-manager/notice/shared';

type RecordItem = NoticePageResponseDto;

const clientPages = ref<ClientPagePageResponse['list']>();
const formOptions = computed<VbenFormProps>(() => ({
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
// 添加一个计算属性来判断状态
const getStatusInfo = (row: RecordItem) => {
  if (!row.isPublished) {
    return { text: '未发布', class: 'text-gray-500' };
  }

  const now = dayjs();
  const endTime = dayjs(row.publishEndTime);

  if (now.isAfter(endTime)) {
    return { text: '已过期', class: 'text-red-500' };
  }

  return { text: '已发布', class: 'text-green-500' };
};

// 添加获取优先级颜色样式的函数
const getPriorityLevelStyle = (priorityLevel: number) => {
  switch (priorityLevel) {
    case 1: {
      // 低优先级
      return {
        text: noticePriorityObject[priorityLevel],
        class: 'text-gray-500',
      };
    }
    case 2: {
      // 中优先级
      return {
        text: noticePriorityObject[priorityLevel],
        class: 'text-blue-500',
      };
    }
    case 3: {
      // 高优先级
      return {
        text: noticePriorityObject[priorityLevel],
        class: 'text-orange-500',
      };
    }
    case 4: {
      // 紧急
      return {
        text: noticePriorityObject[priorityLevel],
        class: 'text-red-500',
      };
    }
    default: {
      return {
        text: noticePriorityObject[priorityLevel] || '-',
        class: '',
      };
    }
  }
};
const gridOptions: VxeTableGridOptions<RecordItem> = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'center', field: 'title', title: '通知标题', minWidth: 150 },
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
      slots: { default: 'priorityLevel' },
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
    },
    {
      field: 'publishEndTime',
      title: '结束时间',
      width: 180,
    },
    {
      field: 'isPublished',
      title: '发布状态',
      width: 150,
      slots: { default: 'isPublished' },
    },
    {
      field: 'action',
      title: '操作',
      width: 260,
      slots: { default: 'action' },
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const data = await noticePageApi({
          pageIndex: --page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        data.list?.forEach((item) => {
          item.publishStartTime =
            useDate.formatDate(item.publishStartTime) || '-';
          item.publishEndTime = useDate.formatDate(item.publishEndTime) || '-';
          item.publishedStatus = getStatusInfo(item);
        });
        return data;
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

const [Grid, GridApi] = useVbenVxeGrid({
  formOptions: formOptions.value,
  gridOptions,
});

async function togglePublish(row: RecordItem) {
  if (dayjs(row.publishEndTime).isBefore(dayjs())) {
    message.error('当前时间已超过发布时间');
    return;
  }
  await batchUpdateNoticeStatusApi({
    ids: [row.id],
    isPublished: !row.isPublished,
  });
  message.success(row.isPublished ? '取消发布成功' : '发布成功');
  GridApi.query();
}

async function deleteNotice(row: RecordItem) {
  await batchDeleteNoticeApi({
    ids: [row.id],
  });
  message.success('删除成功');
  GridApi.query();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <div class="ml-2">
          <a-button type="primary">添加</a-button>
        </div>
      </template>

      <template #isPublished="{ row }">
        <span :class="row.publishedStatus.class">
          {{ row.publishedStatus.text }}
        </span>
      </template>
      <template #priorityLevel="{ row }">
        <span :class="getPriorityLevelStyle(row.priorityLevel).class">
          {{ getPriorityLevelStyle(row.priorityLevel).text }}
        </span>
      </template>
      <template #action="{ row }">
        <a-popconfirm
          :title="`是否${row.isPublished ? '取消发布' : '发布'}？`"
          @confirm="togglePublish(row)"
        >
          <a-button type="link" :danger="row.isPublished">
            {{ row.isPublished ? '取消发布' : '发布' }}
          </a-button>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-popconfirm title="是否删除当前项？" @confirm="deleteNotice(row)">
          <a-button type="link" danger> 删除 </a-button>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-button size="small" type="link"> 编辑</a-button>
      </template>
    </Grid>
  </Page>
</template>
