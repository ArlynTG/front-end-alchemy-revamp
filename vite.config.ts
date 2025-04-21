
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Force the JSX runtime to be automatic
      jsxImportSource: 'react',
      // This ensures React is available in scope
      include: "**/*.{jsx,tsx}",
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Explicitly specify options to ensure React JSX runtime is used
  esbuild: {
    jsx: 'automatic',
  },
}));
