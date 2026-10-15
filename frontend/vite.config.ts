import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/posts': {
          target: env.VITE_CONTENT_SERVICE_URL || 'http://localhost:3002',
          changeOrigin: true,
        },
        '/api/users': {
          target: env.VITE_USER_SERVICE_URL || 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  }
})
