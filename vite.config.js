import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  preview: {
    port: 3000,
  },
  base: "/",
});
