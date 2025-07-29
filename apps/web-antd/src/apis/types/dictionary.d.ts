/**
 *  接口 [分页查询字典]
 *  @标签 字典管理/分页查询字典
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface DictionaryPageRequest {
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

  /* 字典名称（模糊查询） */
  name?: string;

  /* 字典编码（模糊查询） */
  code?: string;

  /* 状态筛选 */
  isEnabled?: boolean;

  /** 任意合法数值 */
  [property: string]: any;
}

export type DictionaryPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: DictionaryDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  接口 [获取字典详情]
 *  @标签 字典管理/获取字典详情
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface DictionaryDetailRequest {
  /* 主键id */
  id: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type DictionaryDetailResponse = DictionaryDto;

/**
 *  接口 [创建字典]
 *  @标签 字典管理/创建字典
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface CreateDictionaryRequest {
  /* 引用类型 */
  data: CreateDictionaryDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CreateDictionaryResponse = IdDto;

/**
 *  接口 [更新字典]
 *  @标签 字典管理/更新字典
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface UpdateDictionaryRequest {
  /* 引用类型 */
  data: DictionaryDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateDictionaryResponse = IdDto;

/**
 *  接口 [删除字典]
 *  @标签 字典管理/删除字典
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface DeleteDictionaryRequest {
  /* 引用类型 */
  data: IdsDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type DeleteDictionaryResponse = IdsDto;

/**
 *  接口 [批量启用禁用字典]
 *  @标签 字典管理/批量启用禁用字典
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface BatchUpdateDictionaryStatusRequest {
  /* 引用类型 */
  data: BatchEnabledDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateDictionaryStatusResponse = CountDto;

/**
 *  接口 [获取字典项]
 *  @标签 字典管理/获取字典项
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface DictionaryItemsRequest {
  /* 字典编码 */
  dictionaryCode: string;

  /* 字典项名称（模糊查询） */
  name?: string;

  /* 字典项编码（模糊查询） */
  code?: string;

  /* 状态筛选 */
  isEnabled?: boolean;

  /** 任意合法数值 */
  [property: string]: any;
}

export type DictionaryItemsResponse = DictionaryItemDto[];

/**
 *  接口 [创建字典项]
 *  @标签 字典管理/创建字典项
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface CreateDictionaryItemRequest {
  /* 引用类型 */
  data: CreateDictionaryItemDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CreateDictionaryItemResponse = IdDto;

/**
 *  接口 [更新字典项]
 *  @标签 字典管理/更新字典项
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface UpdateDictionaryItemRequest {
  /* 引用类型 */
  data: UpdateDictionaryItemDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateDictionaryItemResponse = IdDto;

/**
 *  接口 [删除字典项]
 *  @标签 字典管理/删除字典项
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface DeleteDictionaryItemRequest {
  /* 引用类型 */
  data: IdsDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type DeleteDictionaryItemResponse = CountDto;

/**
 *  接口 [启用禁用字典项]
 *  @标签 字典管理/启用禁用字典项
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface UpdateDictionaryItemStatusRequest {
  /* 引用类型 */
  data: BatchEnabledDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateDictionaryItemStatusResponse = CountDto;

/**
 *  类型定义 [DictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type DictionaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典编码 */
  code: string;
  /* 字典封面 */
  cover?: string;
  /* 创建时间 */
  createdAt: string;
  /* 字典ID */
  id: number;
  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
  /* 字典名称 */
  name: string;
  /* 备注信息 */
  remark?: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateDictionaryDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type CreateDictionaryDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典编码 */
  code: string;
  /* 字典封面 */
  cover?: string;
  /* 状态 true启用 false禁用 */
  isEnabled?: boolean;
  /* 字典名称 */
  name: string;

  /* 备注信息 */
  remark?: string;
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
 *  类型定义 [IdsDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type IdsDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  ids: number[];
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
 *  类型定义 [DictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type DictionaryItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典项编码 */
  code: string;
  /* 字典项封面 */
  cover?: string;
  /* 创建时间 */
  createdAt: string;
  /* 字典编码 */
  dictionaryCode: string;
  /* 字典项ID */
  id: number;
  /* 状态 true启用 false禁用 */
  isEnabled: boolean;
  /* 字典项名称 */
  name: string;
  /* 排序 */
  order?: number;
  /* 备注信息 */
  remark?: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [CreateDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type CreateDictionaryItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典项编码 */
  code: string;
  /* 字典项封面 */
  cover?: string;
  /* 字典编码 */
  dictionaryCode: string;
  /* 状态 true启用 false禁用 */
  isEnabled?: boolean;
  /* 字典项名称 */
  name: string;
  /* 排序 */
  order?: number;

  /* 备注信息 */
  remark?: string;
};

/**
 *  类型定义 [UpdateDictionaryItemDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type UpdateDictionaryItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 字典项编码 */
  code: string;
  /* 字典项封面 */
  cover?: string;
  /* 字典编码 */
  dictionaryCode: string;
  /* 字典项ID */
  id: number;
  /* 状态 true启用 false禁用 */
  isEnabled?: boolean;
  /* 字典项名称 */
  name: string;
  /* 排序 */
  order?: number;

  /* 备注信息 */
  remark?: string;
};
