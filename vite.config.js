import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@composables': '/src/composables',
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    quasar(),
  ],
});
