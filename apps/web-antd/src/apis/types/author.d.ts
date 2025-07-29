/**
 *  接口 [创建作者]
 *  @标签 作者管理模块/创建作者
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface CreateAuthorRequest {
  /* 引用类型 */
  data: CreateAuthorDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CreateAuthorResponse = IdDto;

/**
 *  接口 [分页查询作者列表]
 *  @标签 作者管理模块/分页查询作者列表
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface AuthorPageRequest {
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

  /* 作者姓名（模糊搜索） */
  name?: string;

  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled?: boolean;

  /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
  roles?: number;

  /* 国籍 */
  nationality?: string;

  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender?: number;

  /* 是否为推荐作者（用于前台推荐展示） */
  featured?: boolean;

  /** 任意合法数值 */
  [property: string]: any;
}

export type AuthorPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: AuthorPageResponseDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  接口 [获取作者详情]
 *  @标签 作者管理模块/获取作者详情
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface AuthorDetailRequest {
  /* 主键id */
  id: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type AuthorDetailResponse = AuthorDetailResponseDto;

/**
 *  接口 [更新作者信息]
 *  @标签 作者管理模块/更新作者信息
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface UpdateAuthorRequest {
  /* 引用类型 */
  data: UpdateAuthorDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateAuthorResponse = IdDto;

/**
 *  接口 [批量更新作者状态]
 *  @标签 作者管理模块/批量更新作者状态
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface BatchUpdateAuthorStatusRequest {
  /* 引用类型 */
  data: BatchEnabledDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateAuthorStatusResponse = CountDto;

/**
 *  接口 [批量更新作者推荐状态]
 *  @标签 作者管理模块/批量更新作者推荐状态
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface BatchUpdateAuthorFeaturedRequest {
  /* 引用类型 */
  data: UpdateAuthorFeaturedDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateAuthorFeaturedResponse = CountDto;

/**
 *  接口 [软删除作者]
 *  @标签 作者管理模块/软删除作者
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface DeleteAuthorRequest {
  /* 引用类型 */
  data: IdDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type DeleteAuthorResponse = IdDto;

/**
 *  类型定义 [CreateAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type CreateAuthorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 作者头像URL */
  avatar?: string;
  /* 作者描述 */
  description?: string;
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender: 0 | 1 | 2 | 3;
  /* 作者姓名 */
  name: string;
  /* 国籍 */
  nationality?: string;
  /* 管理员备注 */
  remark?: string;
  /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
  roles?: number;

  /* 社交媒体链接（JSON格式存储多个平台链接） */
  socialLinks?: string;
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
 *  类型定义 [AuthorPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type AuthorPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 作者头像URL */
  avatar?: string;
  /* 创建时间 */
  createdAt: string;
  /* 是否为推荐作者（用于前台推荐展示） */
  featured: boolean;
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number;
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender: 0 | 1 | 2 | 3;
  /* 作者ID */
  id: number;
  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled: boolean;
  /* 作者姓名 */
  name: string;
  /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
  roles?: number;
  /* 更新时间 */
  updatedAt: string;

  /* 作品数量（冗余字段，用于提升查询性能） */
  worksCount: number;
};

/**
 *  类型定义 [AuthorDetailResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type AuthorDetailResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 作者头像URL */
  avatar?: string;
  /* 创建时间 */
  createdAt: string;
  /* 作者描述 */
  description?: string;
  /* 是否为推荐作者（用于前台推荐展示） */
  featured: boolean;
  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number;
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender: 0 | 1 | 2 | 3;
  /* 作者ID */
  id: number;
  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled: boolean;
  /* 作者姓名 */
  name: string;
  /* 国籍 */
  nationality?: string;
  /* 管理员备注 */
  remark?: string;
  /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
  roles?: number;
  /* 社交媒体链接（JSON格式存储多个平台链接） */
  socialLinks?: string;
  /* 更新时间 */
  updatedAt: string;

  /* 作品数量（冗余字段，用于提升查询性能） */
  worksCount: number;
};

/**
 *  类型定义 [UpdateAuthorDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type UpdateAuthorDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 作者头像URL */
  avatar?: string;
  /* 作者描述 */
  description?: string;
  /* 是否为推荐作者（用于前台推荐展示） */
  featured?: boolean;
  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender?: 0 | 1 | 2 | 3;
  /* 主键id */
  id: number;
  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled?: boolean;
  /* 作者姓名 */
  name?: string;
  /* 国籍 */
  nationality?: string;
  /* 管理员备注 */
  remark?: string;
  /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
  roles?: number;

  /* 社交媒体链接（JSON格式存储多个平台链接） */
  socialLinks?: string;
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
 *  类型定义 [UpdateAuthorFeaturedDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type UpdateAuthorFeaturedDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 是否为推荐作者（用于前台推荐展示） */
  featured: boolean;

  /* 作者ID列表 */
  ids: number[];
};
