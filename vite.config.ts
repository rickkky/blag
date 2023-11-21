import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(() => {
  console.log(__dirname);
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'vectrix',
        fileName: 'vectrix',
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
