import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify and remove console logs
    minify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk splitting for better caching and parallel loading
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor chunks for better caching
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "react-vendor";
            }
            if (id.includes("animejs")) {
              return "animation";
            }
            if (id.includes("@fortawesome") || id.includes("react-icons")) {
              return "icons";
            }
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "animejs"],
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
