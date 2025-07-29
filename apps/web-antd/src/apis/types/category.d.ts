/**
 *  接口 [创建分类]
 *  @标签 分类管理模块/创建分类
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface CreateCategoryRequest {
  /* 引用类型 */
  data: CreateCategoryDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CreateCategoryResponse = IdDto;

/**
 *  接口 [分页查询分类列表]
 *  @标签 分类管理模块/分页查询分类列表
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface CategoryPageRequest {
  /* 单页大小，最大500，默认15 */
  pageSize?: number;

  /* 当前页码 */
  pageIndex?: number;

  /* 排序字段，json格式 */
  orderBy?: string;

  /* 开始时间 */
  startDate?: string;

  /* 结束时间 */
  endDate?: string;

  /* 分类名称 */
  name?: string;

  /* 是否启用 */
  isEnabled?: boolean;

  /* 应用类型 */
  contentTypes?: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CategoryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseCategoryDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  接口 [获取分类详情]
 *  @标签 分类管理模块/获取分类详情
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface CategoryDetailRequest {
  /* 主键id */
  id: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CategoryDetailResponse = BaseCategoryDto;

/**
 *  接口 [更新分类信息]
 *  @标签 分类管理模块/更新分类信息
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface UpdateCategoryRequest {
  /* 引用类型 */
  data: UpdateCategoryDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateCategoryResponse = IdDto;

/**
 *  接口 [批量更新分类状态]
 *  @标签 分类管理模块/批量更新分类状态
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface BatchUpdateCategoryStatusRequest {
  /* 引用类型 */
  data: BatchEnabledDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateCategoryStatusResponse = CountDto;

export type DeleteBatchResponse = CountDto;

/**
 *  接口 [分类拖拽排序]
 *  @标签 分类管理模块/分类拖拽排序
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface CategoryOrderRequest {
  /* 引用类型 */
  data: OrderDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CategoryOrderResponse = OrderDto;

/**
 *  类型定义 [CreateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type CreateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 应用类型 */
  contentTypes: number;
  /* 分类图标URL */
  icon?: string;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 分类名称 */
  name: string;

  /* 排序值 */
  order?: number;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [BaseCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type BaseCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 漫画数量 */
  comicCount?: number;
  /* 应用类型 */
  contentTypes: number;
  /* 创建时间 */
  createdAt?: string;
  /* 分类图标URL */
  icon?: string;
  /* 分类ID */
  id: number;
  /* 插画数量 */
  illustrationCount?: number;
  /* 图片数量 */
  imageSetCount?: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 分类名称 */
  name: string;
  /* 小说数量 */
  novelCount?: number;
  /* 排序值 */
  order?: number;
  /* 人气值 */
  popularity?: number;
  /* 辅助人气值 */
  popularityWeight?: number;

  /* 更新时间 */
  updatedAt?: string;
};

/**
 *  类型定义 [UpdateCategoryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type UpdateCategoryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 应用类型 */
  contentTypes?: number;
  /* 分类图标URL */
  icon?: string;
  /* 主键id */
  id: number;
  /* 是否启用 */
  isEnabled?: boolean;
  /* 分类名称 */
  name?: string;
  /* 排序值 */
  order?: number;
  /* 人气值 */
  popularity?: number;

  /* 辅助人气值 */
  popularityWeight?: number;
};

/**
 *  类型定义 [BatchEnabledDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type BatchEnabledDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  ids: number[];

  /* 启用或者禁用 */
  isEnabled: boolean;
};

/**
 *  类型定义 [CountDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type CountDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 操作成功的数据数量 */
  count: number;
};

/**
 *  类型定义 [OrderDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type OrderDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 当前拖拽数据的id */
  dragId: number;

  /* 拖拽的目标id */
  targetId: number;
};
