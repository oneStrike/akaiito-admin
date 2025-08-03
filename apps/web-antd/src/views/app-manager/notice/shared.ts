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

export const formSchema: FormSchema = [
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    rules: [{ required: true, message: '请输入标题' }],
  },
  {
    field: 'content',
    component: 'Textarea',
    label: '内容',
    rules: [{ required: true, message: '请输入内容' }],
  },
  {
    field: 'type',
    component: 'Select',
    label: '类型',
  },
];
