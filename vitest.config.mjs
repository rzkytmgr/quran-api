import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@db': path.resolve(__dirname, './src/db'),
      '@test': path.resolve(__dirname, './__test__'),
      '@server': path.resolve(__dirname, './src/_server'),
      '@api': path.resolve(__dirname, './src/_server/api'),
      '@enum': path.resolve(__dirname, './src/enum'),
      '@interface': path.resolve(__dirname, './src/interfaces'),
      '@lib': path.resolve(__dirname, './src/libraries'),
      '@middleware': path.resolve(__dirname, './src/middlewares'),
      '@service': path.resolve(__dirname, './src/services'),
      '@util': path.resolve(__dirname, './src/utils'),
      '@constant': path.resolve(__dirname, './src/utils/constants'),
    },
  },
});
