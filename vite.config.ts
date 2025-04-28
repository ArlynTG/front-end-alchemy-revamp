
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Remove the direct import of componentTagger

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "6c9ee1b9-b8e6-4e66-860b-5a957c238292.lovableproject.com"
    ],
  },
  plugins: [
    react({
      jsxImportSource: 'react',
      plugins: [],
    }),
    // Remove the componentTagger plugin since it's causing ESM compatibility issues
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
}));
