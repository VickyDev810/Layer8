import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      // Svelte 3 configuration
      compilerOptions: {
        dev: true
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})
