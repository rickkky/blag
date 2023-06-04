import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'VMATRIX',
        fileName: 'v-matrix',
      },
    },
    server: {
      host: true,
    },
  };
});
