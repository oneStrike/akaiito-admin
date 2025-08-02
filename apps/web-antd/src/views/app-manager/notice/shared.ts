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

export const noticeTypeObject = Object.fromEntries(
  noticeType.map((item) => [item.value, item.label]),
);

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
export const noticePriorityObject = Object.fromEntries(
  noticePriority.map((item) => [item.value, item.label]),
);

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
