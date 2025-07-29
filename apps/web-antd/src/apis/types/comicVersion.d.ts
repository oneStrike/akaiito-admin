/**
 *  接口 [创建漫画版本]
 *  @标签 漫画版本管理模块/创建漫画版本
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface CreateComicVersionRequest {
  /* 引用类型 */
  data: CreateComicVersionDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CreateComicVersionResponse = IdDto;

/**
 *  接口 [分页查询漫画版本列表]
 *  @标签 漫画版本管理模块/分页查询漫画版本列表
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface ComicVersionPageRequest {
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

  /* 漫画ID（精确匹配） */
  comicId: number;

  /* 语言代码（如：zh-CN, en-US, ja-JP） */
  language?: string;

  /* 翻译组名称（模糊搜索） */
  translatorGroup?: string;

  /* 是否为推荐版本 */
  isRecommended?: boolean;

  /* 发布状态 */
  isPublished?: boolean;

  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  readRule?: number;

  /* 版本名称（模糊搜索） */
  versionName?: string;

  /** 任意合法数值 */
  [property: string]: any;
}

export type ComicVersionPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: BaseComicVersionDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  接口 [获取漫画版本详情]
 *  @标签 漫画版本管理模块/获取漫画版本详情
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface ComicVersionDetailRequest {
  /* 主键id */
  id: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type ComicVersionDetailResponse = ComicVersionDetailResponseDto;

/**
 *  接口 [更新漫画版本信息]
 *  @标签 漫画版本管理模块/更新漫画版本信息
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface UpdateComicVersionRequest {
  /* 引用类型 */
  data: UpdateComicVersionDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateComicVersionResponse = IdDto;

/**
 *  接口 [批量更新版本发布状态]
 *  @标签 漫画版本管理模块/批量更新版本发布状态
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface BatchUpdateVersionPublishStatusRequest {
  /* 引用类型 */
  data: BatchPublishDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateVersionPublishStatusResponse = CountDto;

/**
 *  接口 [批量更新版本推荐状态]
 *  @标签 漫画版本管理模块/批量更新版本推荐状态
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface BatchUpdateVersionRecommendedStatusRequest {
  /* 引用类型 */
  data: UpdateVersionRecommendedStatusDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateVersionRecommendedStatusResponse = CountDto;

/**
 *  接口 [批量更新版本启用状态]
 *  @标签 漫画版本管理模块/批量更新版本启用状态
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface BatchUpdateVersionEnabledStatusRequest {
  /* 引用类型 */
  data: UpdateVersionEnabledStatusDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateVersionEnabledStatusResponse = CountDto;

/**
 *  接口 [软删除版本]
 *  @标签 漫画版本管理模块/软删除版本
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 11:57:07
 */
export interface DeleteComicVersionRequest {
  /* 引用类型 */
  data: IdDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type DeleteComicVersionResponse = IdDto;

/**
 *  类型定义 [CreateComicVersionDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type CreateComicVersionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关联的原始漫画ID */
  comicId: number;
  /* 版权信息 */
  copyright?: string;
  /* 版本描述 */
  description?: string;
  /* 免责声明 */
  disclaimer?: string;
  /* 是否为推荐版本 */
  isRecommended: boolean;
  /* 语言代码（如：zh-CN, en-US, ja-JP） */
  language: string;
  /* 最后更新时间 */
  lastUpdated?: string;
  /* 发布时间 */
  publishAt?: string;
  /* 购买需要消耗的积分 */
  purchaseAmount: number;
  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  readRule: number;
  /* 备注（内部使用） */
  remark?: string;
  /* 翻译组/汉化组名称 */
  translatorGroup?: string;

  /* 版本名称（如：英语版、日语版、XX汉化组等） */
  versionName: string;
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
 *  类型定义 [BaseComicVersionDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type BaseComicVersionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关联的原始漫画ID */
  comicId: number;
  /* 版权信息 */
  copyright?: string;
  /* 创建时间 */
  createdAt: string;
  /* 版本描述 */
  description?: string;
  /* 免责声明 */
  disclaimer?: string;
  /* 收藏数 */
  favoriteCount: number;
  /* 版本ID */
  id: number;
  /* 发布状态 */
  isPublished: boolean;
  /* 是否为推荐版本 */
  isRecommended: boolean;
  /* 语言代码（如：zh-CN, en-US, ja-JP） */
  language: string;
  /* 最后更新时间 */
  lastUpdated?: string;
  /* 点赞数 */
  likeCount: number;
  /* 发布时间 */
  publishAt?: string;
  /* 购买需要消耗的积分 */
  purchaseAmount: number;
  /* 评分（1-10分，保留一位小数） */
  rating?: number;
  /* 评分人数 */
  ratingCount: number;
  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  readRule: number;
  /* 备注（内部使用） */
  remark?: string;
  /* 排序权重（用于版本列表排序） */
  sortOrder: number;
  /* 总阅读次数 */
  totalViews: number;
  /* 翻译组/汉化组名称 */
  translatorGroup?: string;
  /* 更新时间 */
  updatedAt: string;

  /* 版本名称（如：英语版、日语版、XX汉化组等） */
  versionName: string;
};

/**
 *  类型定义 [ComicVersionDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type ComicVersionDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 关联的原始漫画ID */
  comicId: number;
  /* 版权信息 */
  copyright?: string;
  /* 创建时间 */
  createdAt: string;
  /* 版本描述 */
  description?: string;
  /* 免责声明 */
  disclaimer?: string;
  /* 收藏数 */
  favoriteCount: number;
  /* 版本ID */
  id: number;
  /* 发布状态 */
  isPublished: boolean;
  /* 是否为推荐版本 */
  isRecommended: boolean;
  /* 语言代码（如：zh-CN, en-US, ja-JP） */
  language: string;
  /* 最后更新时间 */
  lastUpdated?: string;
  /* 点赞数 */
  likeCount: number;
  /* 发布时间 */
  publishAt?: string;
  /* 购买需要消耗的积分 */
  purchaseAmount: number;
  /* 评分（1-10分，保留一位小数） */
  rating?: number;
  /* 评分人数 */
  ratingCount: number;
  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  readRule: number;
  /* 备注（内部使用） */
  remark?: string;
  /* 排序权重（用于版本列表排序） */
  sortOrder: number;
  /* 总阅读次数 */
  totalViews: number;
  /* 翻译组/汉化组名称 */
  translatorGroup?: string;
  /* 更新时间 */
  updatedAt: string;

  /* 版本名称（如：英语版、日语版、XX汉化组等） */
  versionName: string;
};

/**
 *  类型定义 [UpdateComicVersionDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type UpdateComicVersionDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 版权信息 */
  copyright?: string;
  /* 版本描述 */
  description?: string;
  /* 免责声明 */
  disclaimer?: string;
  /* 主键id */
  id: number;
  /* 发布状态 */
  isPublished?: boolean;
  /* 是否为推荐版本 */
  isRecommended?: boolean;
  /* 语言代码（如：zh-CN, en-US, ja-JP） */
  language?: string;
  /* 最后更新时间 */
  lastUpdated?: string;
  /* 发布时间 */
  publishAt?: string;
  /* 购买需要消耗的积分 */
  purchaseAmount?: number;
  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  readRule?: number;
  /* 备注（内部使用） */
  remark?: string;
  /* 排序权重（用于版本列表排序） */
  sortOrder?: number;
  /* 翻译组/汉化组名称 */
  translatorGroup?: string;

  /* 版本名称（如：英语版、日语版、XX汉化组等） */
  versionName?: string;
};

/**
 *  类型定义 [BatchPublishDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type BatchPublishDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  ids: number[];

  /* 发布或者取消发布 */
  isPublished: boolean;
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

/**
 *  类型定义 [UpdateVersionRecommendedStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type UpdateVersionRecommendedStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  ids: number[];
  /* 启用或者禁用 */
  isEnabled: boolean;

  /* 推荐状态 */
  isRecommended: boolean;
};

/**
 *  类型定义 [UpdateVersionEnabledStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 11:57:07
 */
export type UpdateVersionEnabledStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  ids: number[];

  /* 启用或者禁用 */
  isEnabled: boolean;
};
