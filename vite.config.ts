import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'events': path.resolve(__dirname, './src/polyfills/events.ts'),
      'util': path.resolve(__dirname, './src/polyfills/util.ts'),
    },
  },
  define: {
    global: 'window',
  },
  optimizeDeps: {
    exclude: ['simple-peer'],
    esbuildOptions: {
      plugins: [
        {
          name: 'node-polyfills',
          setup(build) {
            build.onResolve({ filter: /^events$/ }, () => ({
              path: path.resolve(__dirname, './src/polyfills/events.ts'),
            }));
            build.onResolve({ filter: /^util$/ }, () => ({
              path: path.resolve(__dirname, './src/polyfills/util.ts'),
            }));
          },
        },
      ],
    },
  },
})
