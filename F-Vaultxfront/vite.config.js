import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Polyfill Node globals like `global` for browser
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Fix sockjs-client global issue
  },
})
