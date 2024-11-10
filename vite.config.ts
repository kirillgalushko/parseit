import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  const basePath = process.env.VITE_DEMO_MODE === 'true' ? '/parseit/' : '/'
  return {
    base: basePath,
    plugins: [vue()],
    resolve: {
      alias: {
        src: resolve(__dirname, 'src')
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: '[name].js',
          assetFileNames: '[name]-[hash][extname]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  }
})
