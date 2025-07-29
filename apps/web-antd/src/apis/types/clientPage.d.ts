/**
 *  接口 [创建页面配置]
 *  @标签 客户端页面配置模块/创建页面配置
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface CreateClientPageRequest {
  /* 引用类型 */
  data: BasePageConfigFieldsDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CreateClientPageResponse = IdDto;

/**
 *  接口 [分页查询页面配置列表]
 *  @标签 客户端页面配置模块/分页查询页面配置列表
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface ClientPagePageRequest {
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

  /* 页面编码（唯一标识） */
  pageCode?: string;

  /* 页面名称 */
  pageName?: string;

  /* 页面权限级别 */
  accessLevel?: number;

  /* 页面状态 */
  pageStatus?: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type ClientPagePageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ClientPageConfigPageResponseDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  接口 [根据ID查询页面配置详情]
 *  @标签 客户端页面配置模块/根据ID查询页面配置详情
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface ClientPageDetailByIdRequest {
  id: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type ClientPageDetailByIdResponse = ClientPageConfigResponseDto;

/**
 *  接口 [根据页面编码查询页面配置详情]
 *  @标签 客户端页面配置模块/根据页面编码查询页面配置详情
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface ClientPageDetailByCodeRequest {
  pageCode: string;

  /** 任意合法数值 */
  [property: string]: any;
}

export type ClientPageDetailByCodeResponse = ClientPageConfigResponseDto;

/**
 *  接口 [更新页面配置]
 *  @标签 客户端页面配置模块/更新页面配置
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UpdateClientPageRequest {
  /* 引用类型 */
  data: UpdateClientPageConfigDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateClientPageResponse = IdDto;

/**
 *  接口 [批量软删除页面配置]
 *  @标签 客户端页面配置模块/批量软删除页面配置
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface BatchDeleteClientPageRequest {
  /* 引用类型 */
  data: IdsDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchDeleteClientPageResponse = CountDto;

/**
 *  类型定义 [BasePageConfigFieldsDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type BasePageConfigFieldsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 页面权限级别 */
  accessLevel: number;
  /* 页面描述信息 */
  description?: string;
  /* 页面编码（唯一标识） */
  pageCode: string;
  /* 页面名称 */
  pageName: string;
  /* 页面路径（URL路径） */
  pagePath: string;
  /* 页面状态 */
  pageStatus: number;

  /* 页面标题（用于SEO） */
  pageTitle?: string;
};

/**
 *  类型定义 [IdDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type IdDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  id: number;
};

/**
 *  类型定义 [ClientPageConfigPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type ClientPageConfigPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 页面权限级别 */
  accessLevel: number;
  /* 创建时间 */
  createdAt: string;
  /* 主键id */
  id: number;
  /* 页面编码（唯一标识） */
  pageCode: string;
  /* 页面名称 */
  pageName: string;
  /* 页面路径（URL路径） */
  pagePath: string;
  /* 页面状态 */
  pageStatus: number;
  /* 页面标题（用于SEO） */
  pageTitle?: string;
  /* 更新时间 */
  updatedAt: string;

  /* 访问次数统计 */
  viewCount: number;
};

/**
 *  类型定义 [ClientPageConfigResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type ClientPageConfigResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 页面权限级别 */
  accessLevel: number;
  /* 创建时间 */
  createdAt: string;
  /* 页面描述信息 */
  description?: string;
  /* 主键id */
  id: number;
  /* 页面编码（唯一标识） */
  pageCode: string;
  /* 页面名称 */
  pageName: string;
  /* 页面路径（URL路径） */
  pagePath: string;
  /* 页面状态 */
  pageStatus: number;
  /* 页面标题（用于SEO） */
  pageTitle?: string;
  /* 更新时间 */
  updatedAt: string;

  /* 访问次数统计 */
  viewCount: number;
};

/**
 *  类型定义 [UpdateClientPageConfigDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type UpdateClientPageConfigDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 页面权限级别 */
  accessLevel?: number;
  /* 页面描述信息 */
  description?: string;
  /* 页面ID */
  id: number;
  /* 页面编码（唯一标识） */
  pageCode?: string;
  /* 页面名称 */
  pageName?: string;
  /* 页面路径（URL路径） */
  pagePath?: string;
  /* 页面状态 */
  pageStatus?: number;

  /* 页面标题（用于SEO） */
  pageTitle?: string;
};

/**
 *  类型定义 [IdsDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type IdsDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 主键id */
  ids: number[];
};

/**
 *  类型定义 [CountDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type CountDto = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 操作成功的数据数量 */
  count: number;
};
