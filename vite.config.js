import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
      icons: path.resolve('src/assets/icons'),
      components: path.resolve('src/components'),
      hooks: path.resolve('src/hooks'),
      pages: path.resolve('src/pages'),
      services: path.resolve('src/services'),
      utils: path.resolve('src/utils'),
    },
  },
});
