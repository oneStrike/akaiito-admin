import { TYPE_MAPPING } from './config';

/**
 * 转换为驼峰命名
 */
export function toCamelCase(str: string): string {
  return str
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

/**
 * 转换为帕斯卡命名
 */
export function toPascalCase(str: string): string {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * 映射 OpenAPI 类型到 TypeScript 类型
 */
export function mapOpenAPIType(type: string): string {
  return (
    TYPE_MAPPING[type as keyof typeof TYPE_MAPPING] || TYPE_MAPPING.default
  );
}

/**
 * 映射 schema 到 TypeScript 类型
 */
export function mapSchemaToType(schema: any): string {
  if (!schema) return 'any';

  // 处理 $ref 引用
  if (schema.$ref) {
    return resolveRef(schema.$ref) as string;
  }

  switch (schema.type) {
    case 'array': {
      return `${mapSchemaToType(schema.items)}[]`;
    }
    case 'boolean': {
      return 'boolean';
    }
    case 'integer':
    case 'number': {
      return 'number';
    }
    case 'object': {
      if (schema.properties) {
        // 这里需要递归处理，但为了简化，返回通用对象类型
        return 'Record<string, any>';
      }
      return 'Record<string, any>';
    }
    case 'string': {
      return 'string';
    }
    default: {
      return 'any';
    }
  }
}

/**
 * 解析 $ref 引用
 */
export function resolveRef(ref: string) {
  // 从 $ref 中提取类型名称
  // 例如: "#/components/schemas/AuthorDetailResponse" -> "AuthorDetailResponse"
  const parts = ref.split('/');
  return parts[parts.length - 1];
}

/**
 * 格式化当前时间
 */
export function formatCurrentTime(options: Intl.DateTimeFormatOptions): string {
  return new Date().toLocaleString('zh-CN', options).replaceAll('/', '-');
}

/**
 * 收集引用的类型
 */
export function collectReferencedTypes(
  schema: any,
  referencedTypes: Set<string>,
): void {
  if (!schema) return;

  if (schema.$ref) {
    const typeName = resolveRef(schema.$ref);
    referencedTypes.add(typeName as string);
  } else if (schema.type === 'array' && schema.items) {
    collectReferencedTypes(schema.items, referencedTypes);
  } else if (schema.type === 'object' && schema.properties) {
    for (const prop of Object.values(schema.properties)) {
      collectReferencedTypes(prop, referencedTypes);
    }
  }
}
