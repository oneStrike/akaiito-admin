import { defineConfig } from '@vben/vite-config';

import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        AutoImport({
          imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'],
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          dirs: ['src/components'],
          directoryAsNamespace: false,
          resolvers: [ElementPlusResolver()],
        }),
      ],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:3000/',
            ws: true,
          },
          '/uploads': {
            changeOrigin: true,
            // mock代理目标地址
            target: 'http://localhost:3000/',
            ws: true,
          },
        },
      },
    },
  };
});
