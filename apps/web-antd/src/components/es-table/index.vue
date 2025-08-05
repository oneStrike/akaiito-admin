<script setup lang="ts">
import type { EsTableEmits, EsTableInstance, EsTableProps } from './types';

defineOptions({
  name: 'EsTable',
});

const props = withDefaults(defineProps<EsTableProps>(), {
  dataSource: () => [],
  loading: false,
  rowKey: 'id',
  size: 'middle',
  showPagination: true,
  bordered: false,
  scroll: () => ({
    y: '100%',
  }),
});

const emit = defineEmits<EsTableEmits>();

const tableRef = ref();
const selectedRowKeys = ref<any[]>([]);
const selectedRows = ref<any[]>([]);

// 分页配置
const paginationConfig = computed(() => {
  if (!props.showPagination) {
    return false;
  }

  const defaultPagination = {
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
    pageSizeOptions: ['15', '30', '50', '100'],
  };

  return typeof props.pagination === 'object'
    ? { ...defaultPagination, ...props.pagination }
    : defaultPagination;
});

// 行选择配置
const rowSelectionConfig = computed(() => {
  if (!props.rowSelection) {
    return undefined;
  }

  const defaultRowSelection = {
    selectedRowKeys: selectedRowKeys.value,
    onChange: (keys: any[], rows: any[]) => {
      selectedRowKeys.value = keys;
      selectedRows.value = rows;
      emit('selectChange', keys, rows);
    },
  };

  return typeof props.rowSelection === 'object'
    ? { ...defaultRowSelection, ...props.rowSelection }
    : defaultRowSelection;
});

// 表格变化处理
const handleTableChange = (
  pagination: any,
  filters: any,
  sorter: any,
  extra: any,
) => {
  emit('change', pagination, filters, sorter, extra);
};

// 暴露的方法
const getSelectedRowKeys = () => selectedRowKeys.value;
const getSelectedRows = () => selectedRows.value;
const clearSelection = () => {
  selectedRowKeys.value = [];
  selectedRows.value = [];
};
const setSelectedRowKeys = (keys: any[]) => {
  selectedRowKeys.value = keys;
};

// 暴露给父组件的实例方法
defineExpose<EsTableInstance>({
  getSelectedRowKeys,
  getSelectedRows,
  clearSelection,
  setSelectedRowKeys,
});
</script>

<template>
  <div class="es-table h-full">
    <a-table
      ref="tableRef"
      v-bind="$attrs"
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="paginationConfig"
      :row-key="rowKey"
      :scroll="scroll"
      :size="size"
      :bordered="bordered"
      :row-selection="rowSelectionConfig"
      @change="handleTableChange"
    >
      <!-- 透传所有插槽 -->
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.es-table {
  width: 100%;
}
</style>
