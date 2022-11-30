import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/connect-button.ts",
      name: "connect-button",
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
