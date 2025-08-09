<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { NoticePageResponseDto } from '#/apis/types/notice';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { noticePageApi } from '#/apis';
import { useBitMask } from '#/hooks/useBitmask';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  enablePlatform,
  noticeColumns,
  noticeFilter,
  noticePriorityObj,
  noticeTypeObj,
} from './shared';

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
      query: async ({ page }) => {
        return await noticePageApi({
          pageIndex: --page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
    sort: true,
  },
  sortConfig: {
    defaultSort: { field: 'category', order: 'desc' },
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    export: true,
    // import: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(noticeFilter),
  gridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
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
      <template #enablePlatform="{ row }">
        <a-typography-text>
          {{
            useBitMask.getLabels(row.enablePlatform, enablePlatform).join('、')
          }}
        </a-typography-text>
      </template>
    </Grid>
  </Page>
</template>
