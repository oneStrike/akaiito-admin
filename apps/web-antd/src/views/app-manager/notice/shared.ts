import type { EsFormSchema } from '#/global';

export const noticeType = [
  {
    label: '系统通知',
    value: 0,
  },
  {
    label: '活动公告',
    value: 1,
  },
  {
    label: '维护通知',
    value: 2,
  },
  {
    label: '更新公告',
    value: 3,
  },
];

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
  },
  {
    label: '中等优先级',
    value: 1,
  },
  {
    label: '高优先级',
    value: 2,
  },
  {
    label: '紧急',
    value: 3,
  },
];

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
    label: '排序权重',

    fieldName: 'order',
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入排序权重',
      min: 0,
      max: 99_999_999,
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

export const noticeColumns = [
  {
    title: '通知标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '通知类型',
    dataIndex: 'noticeType',
    key: 'noticeType',
    customRender: ({ record }) => {
      const noticeType = noticeType.find(
        (item) => item.value === record.noticeType,
      );
      return noticeType?.label || '未知';
    },
  },
];
