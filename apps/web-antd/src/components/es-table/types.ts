import type { TableColumnsType, TableProps } from 'ant-design-vue';

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

export interface EsTableInstance {
  /** 获取选中的行键 */
  getSelectedRowKeys: () => any[];
  /** 获取选中的行数据 */
  getSelectedRows: () => any[];
  /** 清空选中状态 */
  clearSelection: () => void;
  /** 设置选中的行 */
  setSelectedRowKeys: (keys: any[]) => void;
}
