import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@libs': path.resolve(__dirname, '../libs'),
      },
    },
    server: {
      proxy: {
        '/api/posts': {
          target: env.VITE_CONTENT_SERVICE_URL || 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/posts/, '/api/content-service/posts'),
        },
        '/api/users': {
          target: env.VITE_USER_SERVICE_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/users/, '/api/user-service/users'),
        },
      },
    },
  }
})
