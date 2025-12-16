import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '',
  root: path.resolve(__dirname, '.'),
  publicDir: 'public',
  build: {
    outDir: '../ui/dist',
    emptyOutDir: true,
    minify: 'terser',
    sourcemap: false
  },
  server: {
    port: 5173,
    host: 'localhost',
    hmr: {
      hostname: 'localhost',
      port: 5173,
      protocol: 'ws'
    },
    strictPort: false,
    open: false
  }
})