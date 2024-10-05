import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with `/api`
      '/api': {
        target: 'http://backend:5000',  // Backend server
        // changeOrigin: true,               // Ensures the host header matches the target
      },
    },
  },
});
