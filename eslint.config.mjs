// @ts-check

import { defineConfig } from '@vben/eslint-config';

export default defineConfig([
  {
    rules: {
      'no-console': 'off',
    },
    ignores: ['apps/web-antd/src/apis/**'],
  },
]);
