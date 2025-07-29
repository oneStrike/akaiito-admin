/**
 *  接口 [创建通知消息]
 *  @标签 客户端通知模块/创建通知消息
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface CreateNoticeRequest {
  /* 引用类型 */
  data: CreateNoticeDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type CreateNoticeResponse = IdDto;

/**
 *  接口 [分页查询通知列表]
 *  @标签 客户端通知模块/分页查询通知列表
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface NoticePageRequest {
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

  /* 通知标题 */
  title?: string;

  /* 通知类型 */
  noticeType?: number;

  /* 优先级 */
  priorityLevel?: number;

  /* 是否发布 */
  isPublished?: boolean;

  /* 是否置顶 */
  isPinned?: boolean;

  /* 是否弹窗显示 */
  showAsPopup?: boolean;

  /** 任意合法数值 */
  [property: string]: any;
}

export type NoticePageResponse = {
  /** 任意合法数值 */
  [property: string]: any;

  /* 列表数据 */
  list?: NoticePageResponseDto[];

  /* 当前页码 */
  pageIndex?: number;

  /* 每页条数 */
  pageSize?: number;

  /* 总条数 */
  total?: number;
};

/**
 *  接口 [根据ID查询通知详情]
 *  @标签 客户端通知模块/根据ID查询通知详情
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface NoticeDetailRequest {
  /* 主键id */
  id: number;

  /** 任意合法数值 */
  [property: string]: any;
}

export type NoticeDetailResponse = BaseNoticeDto;

/**
 *  接口 [更新通知消息]
 *  @标签 客户端通知模块/更新通知消息
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface UpdateNoticeRequest {
  /* 引用类型 */
  data: UpdateNoticeDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type UpdateNoticeResponse = IdDto;

/**
 *  接口 [批量更新通知状态]
 *  @标签 客户端通知模块/批量更新通知状态
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface BatchUpdateNoticeStatusRequest {
  /* 引用类型 */
  data: UpdateNoticeStatusDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchUpdateNoticeStatusResponse = CountDto;

/**
 *  接口 [批量删除通知]
 *  @标签 客户端通知模块/批量删除通知
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface BatchDeleteNoticeRequest {
  /* 引用类型 */
  data: IdsDto;

  /** 任意合法数值 */
  [property: string]: any;
}

export type BatchDeleteNoticeResponse = CountDto;

/**
 *  类型定义 [CreateNoticeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type CreateNoticeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知所关联的客户端页面信息 */
  clientPage: ClientPageDto;
  /* 通知内容详情 */
  content: string;
  /* 启用的平台 */
  enablePlatform: number;
  /* 是否置顶 */
  isPinned?: boolean;
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3;
  /* 排序权重（数值越大越靠前） */
  order?: number;
  /* 关联页面代码 */
  pageCode?: string;
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string;
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: string;
  /* 发布开始时间 */
  publishStartTime?: string;
  /* 是否弹窗显示 */
  showAsPopup?: boolean;

  /* 通知标题 */
  title: string;
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
 *  类型定义 [NoticePageResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type NoticePageResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知所关联的客户端页面信息 */
  clientPage: ClientPageDto;
  /* 创建时间 */
  createdAt: string;
  /* 启用的平台 */
  enablePlatform: number;
  /* 通知ID */
  id: number;
  /* 是否置顶 */
  isPinned?: boolean;
  /* 是否发布 */
  isPublished: boolean;
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3;
  /* 排序权重（数值越大越靠前） */
  order?: number;
  /* 关联页面代码 */
  pageCode?: string;
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string;
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: string;
  /* 发布开始时间 */
  publishStartTime?: string;
  /* 阅读次数 */
  readCount?: number;
  /* 是否弹窗显示 */
  showAsPopup?: boolean;
  /* 通知标题 */
  title: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [BaseNoticeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type BaseNoticeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知所关联的客户端页面信息 */
  clientPage: ClientPageDto;
  /* 通知内容详情 */
  content: string;
  /* 创建时间 */
  createdAt: string;
  /* 启用的平台 */
  enablePlatform: number;
  /* 通知ID */
  id: number;
  /* 是否置顶 */
  isPinned?: boolean;
  /* 是否发布 */
  isPublished: boolean;
  /* 通知类型 */
  noticeType: 0 | 1 | 2 | 3;
  /* 排序权重（数值越大越靠前） */
  order?: number;
  /* 关联页面代码 */
  pageCode?: string;
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string;
  /* 优先级 */
  priorityLevel: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: string;
  /* 发布开始时间 */
  publishStartTime?: string;
  /* 阅读次数 */
  readCount?: number;
  /* 是否弹窗显示 */
  showAsPopup?: boolean;
  /* 通知标题 */
  title: string;

  /* 更新时间 */
  updatedAt: string;
};

/**
 *  类型定义 [UpdateNoticeDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type UpdateNoticeDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知所关联的客户端页面信息 */
  clientPage?: ClientPageDto;
  /* 通知内容详情 */
  content?: string;
  /* 启用的平台 */
  enablePlatform?: number;
  /* 主键id */
  id: number;
  /* 是否置顶 */
  isPinned?: boolean;
  /* 通知类型 */
  noticeType?: 0 | 1 | 2 | 3;
  /* 排序权重（数值越大越靠前） */
  order?: number;
  /* 关联页面代码 */
  pageCode?: string;
  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string;
  /* 优先级 */
  priorityLevel?: 0 | 1 | 2 | 3;
  /* 发布结束时间 */
  publishEndTime?: string;
  /* 发布开始时间 */
  publishStartTime?: string;
  /* 是否弹窗显示 */
  showAsPopup?: boolean;

  /* 通知标题 */
  title?: string;
};

/**
 *  类型定义 [UpdateNoticeStatusDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type UpdateNoticeStatusDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 通知ID列表 */
  ids: number[];

  /* 是否发布 */
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
