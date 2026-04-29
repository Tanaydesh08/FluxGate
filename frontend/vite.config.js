import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": "http://localhost:8080",
      "/api-keys": "http://localhost:8080",
      "/billing": "http://localhost:8080",
      "/dashboard": "http://localhost:8080",
      "/usage": "http://localhost:8080",
      "/gateway": "http://localhost:8080",
    },
  },
});
