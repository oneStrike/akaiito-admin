import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:test-tube',
      order: 999,
      title: '组件测试',
    },
    name: 'Test',
    path: '/test',
    children: [
      {
        name: 'TestUpload',
        path: '/upload',
        component: () => import('#/views/test-upload.vue'),
        meta: {
          icon: 'lucide:upload',
          title: 'Upload 组件测试',
        },
      },
    ],
  },
];

export default routes;