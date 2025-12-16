import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, '.'),
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser'
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    cors: true,
    strictPort: false,
    open: false
  }
})