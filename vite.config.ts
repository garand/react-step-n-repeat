import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      include: ['src/index.ts', 'src/components'],
      exclude: ['src/App.tsx', 'src/main.tsx', 'src/**/*.stories.tsx'],
      insertTypesEntry: true,
    }),
  ],
  publicDir: command === 'build' ? false : 'public',
  build:
    command === 'build'
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'index',
            cssFileName: 'styles',
          },
          rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
          },
        }
      : undefined,
}))
