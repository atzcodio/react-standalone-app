import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import lowcodeInject from './vite-plugin-lowcode-inject.js';
const dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [
    react(),
    lowcodeInject(),
  ],
  resolve: {
    alias: {
      '@/components': path.resolve(dirname, 'public/components'),
    },
  },
  publicDir: 'public',
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'static/js/[name].js',
        chunkFileNames: 'static/js/[name].js',
        assetFileNames: 'static/[ext]/[name].[ext]',
      },
    },
  },
});
