import type { EsTableColumn } from '#/components/es-table';
import type { EsFormSchema } from '#/global';

type ColumnItemExtra = Partial<
  Record<
    EsFormSchema[number]['fieldName'],
    Partial<EsTableColumn> & { hide?: boolean; show?: boolean; sort?: number }
  >
>;

type FilterItemExtra = Partial<
  Record<
    EsFormSchema[number]['fieldName'],
    Partial<EsFormSchema[number]> & {
      hide?: boolean;
      show?: boolean;
      sort?: number;
    }
  >
>;

interface FormSchemaTransform {
  columns: (schema: EsFormSchema, extra?: ColumnItemExtra) => EsTableColumn[];
  sift: (schema: EsFormSchema, extra?: FilterItemExtra) => EsFormSchema;
}

const filterComponentProps = {
  RangePicker: {
    className: 'w-[400px]',
    placeholder: ['开始时间', '结束时间'],
  },
};

export const formSchemaTransform: FormSchemaTransform = {
  columns: (schema, extra) => {
    const columnsWithSort: Array<
      EsTableColumn & { originalIndex: number; sortValue?: number }
    > = [];

    for (const [i, item] of schema.entries()) {
      const itemExtra = extra?.[item.fieldName];

      if (!itemExtra?.hide) {
        columnsWithSort.push({
          title: item.label as string,
          dataIndex: item.fieldName,
          align: 'center',
          ...itemExtra,
          originalIndex: i,
          sortValue: itemExtra?.sort,
        });
      }
    }

    // 根据 sort 属性排序，没有 sort 的保持原有位置
    columnsWithSort.sort((a, b) => {
      // 如果两个都有 sort 值，按 sort 值排序
      if (a.sortValue !== undefined && b.sortValue !== undefined) {
        return a.sortValue - b.sortValue;
      }
      // 如果只有 a 有 sort 值，a 排在前面
      if (a.sortValue !== undefined && b.sortValue === undefined) {
        return 1;
      }
      // 如果只有 b 有 sort 值，b 排在前面
      if (a.sortValue === undefined && b.sortValue !== undefined) {
        return -1;
      }
      // 如果两个都没有 sort 值，按原有位置排序
      return a.originalIndex - b.originalIndex;
    });

    // 移除辅助属性，返回最终的列配置
    return columnsWithSort;
  },
  sift: (schema, extra) => {
    const filterList: EsFormSchema[number][] = [];

    // 先过滤出需要的项目
    const filteredItems = schema.filter((item) => {
      const itemExtra = extra?.[item.fieldName];
      return itemExtra?.hide !== true;
    });

    // 然后处理每个项目
    for (const item of filteredItems) {
      const { className, placeholder } =
        filterComponentProps[
          item.component as keyof typeof filterComponentProps
        ] || {};

      // 获取原有的options（如果componentProps是对象类型）
      const existingOptions =
        item.componentProps &&
        typeof item.componentProps === 'object' &&
        !Array.isArray(item.componentProps)
          ? item.componentProps.options
          : undefined;

      item.componentProps = {
        placeholder: placeholder || item.label,
        class: className || 'w-[230px]',
        allowClear: true,
        options: existingOptions ?? [],
      };
      if (item.component === 'CheckboxGroup') {
        item.component = 'Select';
        item.componentProps.mode = 'multiple';
      }
      item.label = '';
      item.rules = '';
      item.hideLabel = true;
      filterList.push(item);
    }

    return filterList;
  },
};
