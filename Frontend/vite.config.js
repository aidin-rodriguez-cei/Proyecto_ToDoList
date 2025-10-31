import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: 'dist/stats.html', open: false })
  ],
  resolve: {
    alias: { '@': '/src' }
  },
  build: {
    sourcemap: false,
    target: 'es2019',
    cssMinify: true,
    minify: 'esbuild',
    esbuild: { drop: ['console', 'debugger'] },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})

