import type { UploadListType } from 'ant-design-vue/es/upload/interface';

export interface EsUploadProps {
  /** 允许上传的文件类型 */
  accept?: string;
  /** 上传时附带的额外参数 */
  data?: Record<string, any>;
  /** 是否禁用上传组件 */
  disabled?: boolean;
  /** 上传列表的内建样式 */
  listType?: UploadListType;
  /** 限制上传文件的最大数量 */
  maxCount?: number;
  /** 是否支持多选文件 */
  multiple?: boolean;
  /** 上传的文件字段名 */
  name?: string;
  /** 限制文件大小（单位：字节） */
  maxSize?: number;
  /** 是否启用批量上传模式 */
  batchUpload?: boolean;
  /** 批量上传时每批次的文件数量限制 */
  batchSize?: number;
  /** 批量上传间隔时间（毫秒） */
  batchInterval?: number;
  /** 是否显示批量操作按钮 */
  showBatchActions?: boolean;
  /** 是否自动上传（false时需要手动触发上传） */
  autoUpload?: boolean;
  /** 双向绑定的文件地址列表 */
  modelValue?: string[];
}

export interface BatchUploadStatus {
  /** 总文件数 */
  total: number;
  /** 已上传文件数 */
  uploaded: number;
  /** 上传失败文件数 */
  failed: number;
  /** 当前是否正在上传 */
  uploading: boolean;
  /** 上传进度百分比 */
  progress: number;
}
