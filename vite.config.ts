import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'connect-button',
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
})
