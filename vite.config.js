import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  publicDir: 'public',
  base: process.env.BASE_URL,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
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
