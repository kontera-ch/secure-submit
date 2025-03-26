import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/secure-submit' : undefined,
  plugins: [
    vue()
  ],
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 8080,
    strictPort: true
  }
});
