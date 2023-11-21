import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      providers: '/src/providers',
      service: '/src/service',
      ui: '/src/ui',
      utils: '/src/utils',
      store: '/src/store',
      hooks: '/src/hooks',
      api: '/src/api'
    }
  },
  server: {
    port: 3000
  }
})
