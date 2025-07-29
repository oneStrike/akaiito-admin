/**
 * OpenAPI 生成器配置
 */
export interface GeneratorConfig {
  /** OpenAPI 文档 URL */
  openApiUrl: string;
  /** 输出目录 */
  outputDir: string;
  /** 类型文件目录名 */
  typesDirName: string;
  /** 请求处理器导入路径 */
  httpHandlerImport: string;
  /** 是否清空输出目录 */
  clearOutputDir: boolean;
  /** 日期时间格式化选项 */
  dateTimeOptions: Intl.DateTimeFormatOptions;
}

/**
 * 默认配置
 */
export const DEFAULT_CONFIG: GeneratorConfig = {
  openApiUrl: 'http://127.0.0.1:4523/export/openapi/2?version=3.0',
  outputDir: 'src/apis',
  typesDirName: 'types',
  httpHandlerImport: '@/utils/request',
  clearOutputDir: true,
  dateTimeOptions: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  },
};

/**
 * 类型映射配置
 */
export const TYPE_MAPPING = {
  array: 'any[]',
  boolean: 'boolean',
  integer: 'number',
  number: 'number',
  object: 'Record<string, any>',
  string: 'string',
  default: 'any',
} as const;

/**
 * 模板配置
 */
export const TEMPLATES = {
  /** API 方法注释模板 */
  apiMethodComment: (
    tag: string,
    summary: string,
    method: string,
    path: string,
    updateTime: string,
  ) => `/**
 *  @标签 ${tag}/${summary}
 *  @方式 ${method}
 *  @地址 ${path}
 *  @更新时间 ${updateTime}
 */`,

  /** 类型定义注释模板 */
  typeComment: (typeName: string, source: string, updateTime: string) => `/**
 *  类型定义 [${typeName}]
 *  @来源 ${source}
 *  @更新时间 ${updateTime}
 */`,

  /** 接口注释模板 */
  interfaceComment: (
    summary: string,
    tag: string,
    method: string,
    path: string,
    updateTime: string,
  ) => `/**
 *  接口 [${summary}]
 *  @标签 ${tag}/${summary}
 *  @方式 ${method}
 *  @地址 ${path}
 *  @更新时间 ${updateTime}
 */`,

  /** 索引签名模板 */
  indexSignature: '  /** 任意合法数值 */\n  [property: string]: any',
} as const;
