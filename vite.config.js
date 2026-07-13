import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Building produces a single self-contained dist/index.html so the
// dashboard can be pasted straight into a WordPress "Custom HTML" block
// (or any other page) with no separate asset files to host.
export default defineConfig(({ mode }) => ({
  plugins: [react(), viteSingleFile()],
  // react-grid-layout's dependency chain (prop-types, react-draggable)
  // reads process.env.NODE_ENV directly with no `typeof process` guard,
  // which throws in the browser unless we replace it at build time.
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode === "production" ? "production" : "development"),
  },
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
}));
