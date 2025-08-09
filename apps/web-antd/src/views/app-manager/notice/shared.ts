import type { NoticePageResponseDto } from '#/apis/types/notice';
import type { EsFormSchema } from '#/global';

import { formSchemaTransform } from '#/utils/formSchemaTransform';

export const noticeType = [
  {
    label: '系统通知',
    value: 0,
    color: '#1890ff', // 蓝色
  },
  {
    label: '活动公告',
    value: 1,
    color: '#52c41a', // 绿色
  },
  {
    label: '维护通知',
    value: 2,
    color: '#faad14', // 橙色
  },
  {
    label: '更新公告',
    value: 3,
    color: '#722ed1', // 紫色
  },
];

export const noticeTypeObj: Record<number, { color: string; label: string }> =
  {};
for (const item of noticeType) {
  noticeTypeObj[item.value] = {
    label: item.label,
    color: item.color,
  };
}

export const enablePlatform = [
  {
    label: 'H5',
    value: 1,
  },
  {
    label: 'APP',
    value: 2,
  },
  {
    label: '小程序',
    value: 4,
  },
];

export const noticePriority = [
  {
    label: '低优先级',
    value: 0,
    color: '#52c41a',
  },
  {
    label: '中等优先级',
    value: 1,
    color: '#1890ff',
  },
  {
    label: '高优先级',
    value: 2,
    color: '#fa8c16',
  },
  {
    label: '紧急',
    value: 3,
    color: '#ff4d4f',
  },
];

export const noticePriorityObj: Record<
  number,
  { color: string; label: string }
> = {};
for (const item of noticePriority) {
  noticePriorityObj[item.value] = {
    label: item.label,
    color: item.color,
  };
}

export const formSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入通知标题',
    },
    fieldName: 'title',
    label: '通知标题',
    rules: 'required',
  },
  {
    label: '通知类型',
    fieldName: 'noticeType',
    component: 'Select',
    rules: 'required',
    componentProps: {
      placeholder: '请选择通知类型',
      options: noticeType,
      class: 'w-full',
    },
  },
  {
    label: '发布平台',

    fieldName: 'enablePlatform',
    component: 'CheckboxGroup',
    rules: 'required',
    componentProps: {
      placeholder: '请选择发布平台',
      options: enablePlatform,
      valueType: 'bitMask',
    },
  },
  {
    label: '紧急程度',
    fieldName: 'priorityLevel',
    component: 'Select',
    rules: 'required',
    componentProps: {
      placeholder: '请选择紧急程度',
      options: noticePriority,
      class: 'w-full',
    },
  },
  {
    label: '跳转页面',
    fieldName: 'pageCode',
    component: 'Select',
    componentProps: {
      placeholder: '请选择跳转页面',
      options: [],
      class: 'w-full',
    },
  },
  {
    fieldName: 'popupBackgroundImage',
    component: 'Upload',
    label: '弹窗背景',
    componentProps: {},
  },
  {
    label: '通知时间',
    fieldName: 'dateTimeRange',
    component: 'RangePicker',
    componentProps: {
      disabledDate: (date: Date) =>
        new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0),
    },
  },
  {
    label: '是否置顶',
    fieldName: 'isPinned',
    component: 'RadioGroup',
    componentProps: {
      placeholder: '请选择是否置顶',
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
  },
  {
    label: '首页弹窗展示',
    fieldName: 'showAsPopup',
    component: 'RadioGroup',
    componentProps: {
      placeholder: '请选择是否首页弹窗展示',
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
  },
  {
    label: '内容',
    fieldName: 'content',
    component: 'RichText',
    rules: 'required',
    componentProps: {
      placeholder: '请输入内容...',
    },
  },
];

export const noticeColumns =
  formSchemaTransform.toTableColumns<NoticePageResponseDto>(formSchema, {
    content: {
      hide: true,
    },
    showAsPopup: {
      hide: true,
    },
    isPinned: {
      hide: true,
    },
    popupBackgroundImage: {
      hide: true,
    },
    actions: {
      show: true,
    },
    dateTimeRange: {
      sort: 99,
    },
    noticeType: {
      slots: { default: 'noticeType' },
    },
    priorityLevel: {
      slots: { default: 'priorityLevel' },
    },
    enablePlatform: {
      slots: { default: 'enablePlatform' },
    },
  });

export const noticeFilter = formSchemaTransform.toSearchSchema(formSchema, {
  content: {
    hide: true,
  },
  showAsPopup: {
    hide: true,
  },
  isPinned: {
    hide: true,
  },
  popupBackgroundImage: {
    hide: true,
  },
  actions: {
    show: true,
  },
  title: {
    sort: 99,
  },
});
