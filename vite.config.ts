import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { demoAssetsPlugin } from './vite-plugin-demo-assets.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    demoAssetsPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
