/**
 *  接口 [创建漫画章节]
 *  @标签 漫画章节管理模块/创建漫画章节
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface CreateComicChapterRequest {
  /* 引用类型 */
  data: CreateComicChapterDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CreateComicChapterResponse = IdDto;

/**
 *  接口 [分页查询漫画章节列表]
 *  @标签 漫画章节管理模块/分页查询漫画章节列表
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface ComicChapterPageRequest {
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

  /* 章节标题（模糊搜索） */
  title?: string;

  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished?: boolean;

  /* 关联的漫画版本ID */
  versionId?: number;

  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule?: number;

  /* 是否为试读章节 */
  isPreview?: boolean;

  /* 漫画ID（精确匹配） */
  comicId: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type ComicChapterPageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: ComicChapterPageResponseDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  接口 [获取漫画章节详情]
 *  @标签 漫画章节管理模块/获取漫画章节详情
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface ComicChapterDetailRequest {
  /* 主键id */
  id: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type ComicChapterDetailResponse = ComicChapterDetailDto;

/**
 *  接口 [更新漫画章节信息]
 *  @标签 漫画章节管理模块/更新漫画章节信息
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface UpdateComicChapterRequest {
  /* 引用类型 */
  data: UpdateComicChapterDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateComicChapterResponse = IdDto;

/**
 *  接口 [批量更新章节发布状态]
 *  @标签 漫画章节管理模块/批量更新章节发布状态
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface BatchUpdateChapterPublishStatusRequest {
  /* 引用类型 */
  data: UpdateChapterPublishStatusDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateChapterPublishStatusResponse = CountDto;

/**
 *  接口 [批量软删除章节]
 *  @标签 漫画章节管理模块/批量软删除章节
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface BatchDeleteComicChapterRequest {
  /* 引用类型 */
  data: IdsDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchDeleteComicChapterResponse = CountDto;

/**
 *  接口 [交换两个章节的章节号]
 *  @标签 漫画章节管理模块/交换两个章节的章节号
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface SwapChapterNumbersRequest {
  /* 引用类型 */
  data: OrderDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type SwapChapterNumbersResponse = OrderDto;

/**
 *  接口 [获取章节内容详情]
 *  @标签 漫画章节管理模块/获取章节内容详情
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface ChapterContentsRequest {
  /* 主键id */
  id: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type ChapterContentsResponse = string[];

/**
 *  接口 [添加章节内容]
 *  @标签 漫画章节管理模块/添加章节内容
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface AddChapterContentRequest {
  /* 引用类型 */
  data: AddChapterContentDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type AddChapterContentResponse = string[];

/**
 *  接口 [更新章节内容]
 *  @标签 漫画章节管理模块/更新章节内容
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface UpdateChapterContentRequest {
  /* 引用类型 */
  data: UpdateChapterContentDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateChapterContentResponse = string[];

/**
 *  接口 [删除章节内容]
 *  @标签 漫画章节管理模块/删除章节内容
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface DeleteChapterContentRequest {
  /* 引用类型 */
  data: DeleteChapterContentDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type DeleteChapterContentResponse = string[];

/**
 *  接口 [移动章节内容（排序）]
 *  @标签 漫画章节管理模块/移动章节内容（排序）
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface MoveChapterContentRequest {
  /* 引用类型 */
  data: MoveChapterContentDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type MoveChapterContentResponse = string[];

/**
 *  接口 [批量更新章节内容]
 *  @标签 漫画章节管理模块/批量更新章节内容
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface BatchUpdateChapterContentsRequest {
  /* 引用类型 */
  data: BatchUpdateChapterContentsDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateChapterContentsResponse = string[];

/**
 *  接口 [清空章节内容]
 *  @标签 漫画章节管理模块/清空章节内容
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface ClearChapterContentsRequest {
  /* 引用类型 */
  data: IdDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type ClearChapterContentsResponse = IdDto;

/**
 *  类型定义 [CreateComicChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type CreateComicChapterDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 章节序号（用于排序） */
  chapterNumber: number;
  /* 关联的漫画ID */
  comicId: number;
  /* 是否为试读章节 */
  isPreview: boolean;
  /* 发布时间 */
  publishAt?: string;
  /* 购买需要消耗的积分 */
  purchaseAmount?: number;
  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule: 0 | 1 | 2 | 3;
  /* 管理员备注 */
  remark?: string;
  /* 章节副标题或描述 */
  subtitle?: string;
  /* 章节缩略图 */
  thumbnail?: string;
  /* 章节标题 */
  title: string;

  /* 关联的漫画版本ID */
  versionId?: number;
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
 *  类型定义 [ComicChapterPageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type ComicChapterPageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 章节序号（用于排序） */
  chapterNumber: number;
  /* 关联的漫画ID */
  comicId: number;
  /* 评论数 */
  commentCount: number;
  /* 创建时间 */
  createdAt: string;
  /* 章节ID */
  id: number;
  /* 是否为试读章节 */
  isPreview: boolean;
  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished: boolean;
  /* 点赞数 */
  likeCount: number;
  /* 发布时间 */
  publishAt?: string;
  /* 购买需要消耗的积分 */
  purchaseAmount?: number;
  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule: 0 | 1 | 2 | 3;
  /* 章节副标题或描述 */
  subtitle?: string;
  /* 章节缩略图 */
  thumbnail?: string;
  /* 章节标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
  /* 关联的漫画版本ID */
  versionId?: number;

  /* 阅读次数 */
  viewCount: number;
};

/**
 *  类型定义 [ComicChapterDetailDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type ComicChapterDetailDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 章节序号（用于排序） */
  chapterNumber: number;
  /* 关联的漫画ID */
  comicId: number;
  /* 评论数 */
  commentCount: number;
  /* 漫画内容（JSON格式存储图片URL数组） */
  contents: string;
  /* 创建时间 */
  createdAt: string;
  /* 章节ID */
  id: number;
  /* 是否为试读章节 */
  isPreview: boolean;
  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished: boolean;
  /* 点赞数 */
  likeCount: number;
  /* 发布时间 */
  publishAt?: string;
  /* 购买需要消耗的积分 */
  purchaseAmount?: number;
  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule: 0 | 1 | 2 | 3;
  /* 关联的漫画信息 */
  relatedComic: RelatedComicDto;
  /* 关联的漫画版本信息 */
  relatedVersion: RelatedVersionDto;
  /* 管理员备注 */
  remark?: string;
  /* 章节副标题或描述 */
  subtitle?: string;
  /* 章节缩略图 */
  thumbnail?: string;
  /* 章节标题 */
  title: string;
  /* 更新时间 */
  updatedAt: string;
  /* 关联的漫画版本ID */
  versionId?: number;

  /* 阅读次数 */
  viewCount: number;
};

/**
 *  类型定义 [UpdateComicChapterDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type UpdateComicChapterDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 章节序号（用于排序） */
  chapterNumber?: number;
  /* 关联的漫画ID */
  comicId?: number;
  /* 漫画内容（JSON格式存储图片URL数组） */
  contents?: string;
  /* 主键id */
  id: number;
  /* 是否为试读章节 */
  isPreview?: boolean;
  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished?: boolean;
  /* 发布时间 */
  publishAt?: string;
  /* 购买需要消耗的积分 */
  purchaseAmount?: number;
  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule?: 0 | 1 | 2 | 3;
  /* 管理员备注 */
  remark?: string;
  /* 章节副标题或描述 */
  subtitle?: string;
  /* 章节缩略图 */
  thumbnail?: string;
  /* 章节标题 */
  title?: string;

  /* 关联的漫画版本ID */
  versionId?: number;
};

/**
 *  类型定义 [UpdateChapterPublishStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type UpdateChapterPublishStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 章节ID列表 */
  ids: number[];

  /* 发布状态（true: 发布, false: 取消发布） */
  isPublished: boolean;
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

/**
 *  类型定义 [AddChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type AddChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 要添加的内容（图片URL） */
  content: string;
  /* 主键id */
  id: number;

  /* 插入位置索引（可选，默认添加到末尾） */
  index?: number;
};

/**
 *  类型定义 [UpdateChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type UpdateChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 要添加的内容（图片URL） */
  content: string;
  /* 主键id */
  id: number;

  /* 插入位置索引（可选，默认添加到末尾） */
  index: number;
};

/**
 *  类型定义 [DeleteChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type DeleteChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 主键id */
  id: number;

  /* 插入位置索引（可选，默认添加到末尾） */
  index: number;
};

/**
 *  类型定义 [MoveChapterContentDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type MoveChapterContentDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 源索引位置 */
  fromIndex: number;
  /* 主键id */
  id: number;

  /* 目标索引位置 */
  toIndex: number;
};

/**
 *  类型定义 [BatchUpdateChapterContentsDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type BatchUpdateChapterContentsDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 新的内容数组（JSON格式） */
  contents: string[];

  /* 主键id */
  id: number;
};
