/// <reference types="vitest" />

import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const alias = {
  '@components': path.resolve(__dirname, 'src/components'),
  '@shared': path.resolve(__dirname, 'src/components/shared'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@stores': path.resolve(__dirname, 'src/stores'),
  '@app': path.resolve(__dirname, 'src/app'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@api': path.resolve(__dirname, 'src/api'),
  '@assests': path.resolve(__dirname, 'src/assests'),
  '@constants': path.resolve(__dirname, 'src/constants.tsx'),
  '@types': path.resolve(__dirname, 'src/types.ts'),
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    watch: {
      usePolling: true,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'istanbul',
    },
    setupFiles: ['./setupTests.ts'],
  },
});
