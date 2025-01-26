import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://honkai-star-rail-backend.onrender.com",
        changeOrigin: true,
        secure: false, // à utiliser uniquement en dev
      },
    },
  },
});
