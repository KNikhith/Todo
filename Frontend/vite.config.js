import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/add": "http://localhost:5000",
      "/get": "http://localhost:5000",
      "/edit": "http://localhost:5000",
      "/update": "http://localhost:5000",
      "/delete": "http://localhost:5000",
    },
  },
});