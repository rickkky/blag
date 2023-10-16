import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'g',
        fileName: 'g-matrix',
      },
    },
    plugins: [
      dts({
        rollupTypes: true,
      }),
    ],
    server: {
      host: true,
    },
  };
});
