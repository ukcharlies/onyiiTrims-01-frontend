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
  // Preview server configuration
  // This is used when deploying to Vercel or similar platforms

  preview: {
    port: 3000,
  },
  base: "/",
});
