import type { TableColumnsType, TableProps } from 'ant-design-vue';

import type { EsFormSchema } from '#/global';

export interface EsTableColumn {
  /** 列标题 */
  title: string;
  /** 列数据在数据项中对应的路径 */
  dataIndex: string;
  /** 列的 key */
  key?: string;
  /** 列宽度 */
  width?: number | string;
  /** 列对齐方式 */
  align?: 'center' | 'left' | 'right';
  /** 是否固定列 */
  fixed?: 'left' | 'right' | boolean;
  /** 排序配置 */
  sorter?: ((a: any, b: any) => number) | boolean;
  /** 筛选配置 */
  filters?: Array<{ text: string; value: any }>;
  /** 自定义渲染函数 */
  customRender?: (opt: { index: number; record: any; text: any }) => any;
  /** 列是否可以调整宽度 */
  resizable?: boolean;
  /** 列是否可以拖拽排序 */
  sortable?: boolean;
}

export interface EsTableProps {
  /** 表格列配置 */
  columns: EsTableColumn[] | TableColumnsType;
  /** 表格数据 */
  dataSource?: any[];
  /** 请求API函数，用于内部处理数据请求 */
  requestApi?: EsTableRequestApi<any>;
  /** 筛选表单 */
  filterSchema?: EsFormSchema;
  /** 加载状态 */
  loading?: boolean;
  /** 行键 */
  rowKey?: ((record: any) => string) | string;
  /** 表格大小 */
  size?: 'large' | 'middle' | 'small';
  /** 滚动配置 */
  scroll?: { x?: number | string; y?: number | string };
  /** 分页配置 */
  pagination?: TableProps['pagination'];
  /** 是否显示分页 */
  showPagination?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 行选择配置 */
  rowSelection?: TableProps['rowSelection'];
}

export interface EsTableEmits {
  /** 表格变化事件 */
  change: [pagination: any, filters: any, sorter: any, extra: any];
  /** 行选择变化事件 */
  selectChange: [selectedRowKeys: any[], selectedRows: any[]];
}

/** EsTable 请求参数接口 */
export interface EsTableRequestParams {
  /** 页码索引（从 0 开始） */
  pageIndex?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 排序字段 */
  sortField?: string;
  /** 排序方式 */
  sortOrder?: 'ascend' | 'descend';
  /** 筛选条件 */
  filters?: Record<string, any>;
  /** 排序配置 */
  orderBy?: string;
  /** 是否置顶 */
  isPinned?: boolean;
  /** 是否发布 */
  isPublished?: boolean;
  /** 通知类型 */
  noticeType?: string;
  /** 优先级 */
  priorityLevel?: number;
  /** 是否显示为弹窗 */
  showAsPopup?: boolean;
  /** 标题 */
  title?: string;
}

/** EsTable 响应数据接口 */
export interface EsTableRequestResponse {
  /** 数据列表 */
  list?: any[];
  /** 数据列表（备用字段） */
  data?: any[];
  /** 总数 */
  total?: number;
  /** 页码索引（从 0 开始） */
  pageIndex?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 请求是否成功 */
  success?: boolean;
}

/** EsTable 请求API函数类型 */
export type EsTableRequestApi<
  T = EsTableRequestParams,
  R = EsTableRequestResponse,
> = (params: T) => Promise<R>;

export interface EsTableInstance {
  /** 获取选中的行键 */
  getSelectedRowKeys: () => any[];
  /** 获取选中的行数据 */
  getSelectedRows: () => any[];
  /** 清空选中状态 */
  clearSelection: () => void;
  /** 设置选中的行 */
  setSelectedRowKeys: (keys: any[]) => void;
  /** 刷新数据 */
  refresh: (resetPage?: boolean) => void;
  /** 设置查询参数 */
  setSearchParams: (params: any) => void;
  /** 获取表单数据 */
  getFormValues: () => Record<string, any>;
  /** 设置表单数据 */
  setFormValues: (values: Record<string, any>) => void;
  /** 重置表单 */
  resetForm: () => void;
}
