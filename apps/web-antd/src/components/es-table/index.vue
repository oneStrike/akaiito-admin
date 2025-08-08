<script setup lang="ts">
import type { EsTableEmits, EsTableInstance, EsTableProps } from './types';

import { useVbenForm } from '#/adapter/form';

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
    y: '1000px',
  }),
});

const emit = defineEmits<EsTableEmits>();

const tableRef = ref();
const tableContainerRef = ref();
const selectedRowKeys = ref<any[]>([]);
const selectedRows = ref<any[]>([]);

// 内部数据状态
const internalDataSource = ref<any[]>([]);
const internalLoading = ref(false);
const pagination = ref({
  pageIndex: 1,
  pageSize: 15,
  total: 0,
});

// 请求参数
const requestParams = ref<any>({});

// 计算属性：使用内部数据还是外部数据
const computedDataSource = computed(() => {
  return props.requestApi ? internalDataSource.value : props.dataSource;
});

const computedLoading = computed(() => {
  return props.requestApi ? internalLoading.value : props.loading;
});

// 分页配置
const paginationConfig = computed(() => {
  if (!props.showPagination) {
    return false;
  }

  const defaultPagination = {
    current: pagination.value.pageIndex,
    pageSize: pagination.value.pageSize,
    total: pagination.value.total,
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

// 数据请求函数
const fetchData = async (params: any = {}) => {
  if (!props.requestApi) return;

  try {
    internalLoading.value = true;

    // 构建请求参数，pageIndex 从 0 开始
    const requestData = {
      pageIndex: pagination.value.pageIndex - 1, // 转换为从 0 开始
      pageSize: pagination.value.pageSize,
      ...requestParams.value,
      ...params,
    };

    const response = await props.requestApi(requestData);

    // 处理响应数据，兼容 NoticePageResponse 格式
    if (response) {
      internalDataSource.value = response.list || response.data || [];
      pagination.value.total = response.total || 0;
      // pageIndex 从 0 开始，需要转换为 current（从 1 开始）
      pagination.value.pageIndex =
        (response.pageIndex ?? pagination.value.pageIndex - 1) + 1;
      pagination.value.pageSize =
        response.pageSize || pagination.value.pageSize;
    }
  } catch (error) {
    console.error('EsTable 数据请求失败:', error);
    internalDataSource.value = [];
    pagination.value.total = 0;
  } finally {
    internalLoading.value = false;
  }
};

// 表格变化处理
const handleTableChange = (
  paginationInfo: any,
  filters: any,
  sorter: any,
  extra: any,
) => {
  // 如果使用 requestApi，处理内部状态
  if (props.requestApi) {
    // 更新分页信息
    pagination.value.pageIndex = paginationInfo.current;
    pagination.value.pageSize = paginationInfo.pageSize;

    // 构建请求参数
    const params: any = {};

    // 处理排序
    if (sorter && sorter.field) {
      params.orderBy = JSON.stringify({
        [sorter.field]: sorter.order === 'ascend' ? 'asc' : 'desc',
      });
    }

    // 处理筛选
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key] && filters[key].length > 0) {
          params[key] = filters[key];
        }
      });
    }

    // 更新请求参数并重新请求数据
    requestParams.value = { ...requestParams.value, ...params };
    fetchData();
  }

  // 触发外部事件
  emit('change', paginationInfo, filters, sorter, extra);
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

// 刷新数据
const refresh = (resetPage = false) => {
  if (resetPage) {
    pagination.value.pageIndex = 1;
  }
  fetchData();
};

// 设置查询参数
const setSearchParams = (params: any) => {
  requestParams.value = { ...requestParams.value, ...params };
  pagination.value.pageIndex = 1; // 重置到第一页
  fetchData();
};

// 获取表单数据
const getFormValues = () => {
  if (formApi) {
    return formApi.getValues();
  }
  return {};
};

// 设置表单数据
const setFormValues = (values: Record<string, any>) => {
  if (formApi) {
    formApi.setValues(values);
  }
};

// 重置表单
const resetForm = () => {
  if (formApi) {
    formApi.resetForm();
    // 重置表单后，清空查询参数并重新获取数据
    requestParams.value = {};
    pagination.value.pageIndex = 1;
    fetchData();
  }
};

// 组件挂载时初始化数据
onMounted(() => {
  if (props.requestApi) {
    fetchData();
  }
});

// 计算是否显示表单
const showForm = computed(() => {
  return props.filterSchema && props.filterSchema.length > 0;
});

// 只有当 filterSchema 有值时才调用，避免不必要的钩子调用
let BaseForm: null | ReturnType<typeof useVbenForm>[0] = null;
let formApi: null | ReturnType<typeof useVbenForm>[1] = null;

if (props.filterSchema && props.filterSchema.length > 0) {
  const [form, api] = useVbenForm({
    wrapperClass:
      'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
    schema: props.filterSchema,
    compact: true,
    showCollapseButton: true,
    submitOnChange: true,
    collapsed: true,
    /*  */ // 表单值变化时的回调
    handleSubmit: (values: Record<string, any>) => {
      setSearchParams(values);
    },
  });
  BaseForm = form;
  formApi = api;
}

// 暴露给父组件的实例方法
defineExpose<EsTableInstance>({
  getSelectedRowKeys,
  getSelectedRows,
  clearSelection,
  setSelectedRowKeys,
  refresh,
  setSearchParams,
  getFormValues,
  setFormValues,
  resetForm,
});
</script>

<template>
  <div class="es-table">
    <BaseForm v-if="showForm" />
    <div ref="tableContainerRef">
      <a-table
        ref="tableRef"
        v-bind="$attrs"
        :columns="columns"
        :data-source="computedDataSource"
        :loading="computedLoading"
        :pagination="paginationConfig"
        :row-key="rowKey"
        :size="size"
        :bordered="bordered"
        :row-selection="rowSelectionConfig"
        class="h-full"
        @change="handleTableChange"
      >
        <!-- 透传所有插槽 -->
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </a-table>
    </div>
  </div>
</template>
