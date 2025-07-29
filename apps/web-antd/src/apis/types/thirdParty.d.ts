export type PlatformResponse = PlatformResponseDto[];

/**
 *  接口 [搜索第三方平台漫画]
 *  @标签 第三方漫画平台内容解析/搜索第三方平台漫画
 *  @方式
 *  @地址
 *  @更新时间 2025-07-29 19:01:20
 */
export interface SearchRequest {
  /* 搜索关键词 */
  keyword: string;

  /* 平台代码 */
  platform: string;

  /** 任意合法数值 */
  [property: string]: any;
}

export type SearchResponse = SearchComicItemDto;

/**
 *  类型定义 [PlatformResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type PlatformResponseDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 平台名称code */
  code: string;

  /* 平台名称 */
  name: string;
};

/**
 *  类型定义 [SearchComicItemDto]
 *  @来源 components.schemas
 *  @更新时间 2025-07-29 19:01:20
 */
export type SearchComicItemDto = {
  /** 任意合法数值 */
  [property: string]: any;
  /* 作者列表 */
  author: string[];
  /* 封面图片URL */
  cover: string;
  /* 漫画ID */
  id: string;
  /* 漫画名称 */
  name: string;

  /* 来源平台 */
  source: string;
};
