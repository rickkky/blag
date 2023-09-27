import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'g',
        fileName: 'g-matrix',
      },
    },
    server: {
      host: true,
    },
  };
});
