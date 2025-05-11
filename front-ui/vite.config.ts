import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: 'build',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@api': path.resolve(__dirname, 'ts-built/api'),
      '@components': path.resolve(__dirname, 'ts-built/components'),
      '@i18n': path.resolve(__dirname, 'ts-built/i18n'),
      '@lib': path.resolve(__dirname, 'ts-built/lib'),
      '@services': path.resolve(__dirname, 'ts-built/services'),
      '@utils': path.resolve(__dirname, 'ts-built/utils'),
      '@hooks': path.resolve(__dirname, 'ts-built/hooks'),
    },
  },
});
