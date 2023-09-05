import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  jsx: "react",
  plugins: [react(), pluginRewriteAll()],
  server: {
    hmr: true,
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@app",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@containers",
        replacement: path.resolve(__dirname, "./src/containers"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "./src/styles"),
      },
      {
        find: "@providers",
        replacement: path.resolve(__dirname, "./src/providers"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "./src/store"),
      },
      {
        find: "@routes",
        replacement: path.resolve(__dirname, "./src/routes"),
      },
    ],
  },
})
