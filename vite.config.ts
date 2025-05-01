
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
    mode === 'development' && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Improve chunking strategy
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/pages')) {
            return 'pages';
          }
        },
      },
    },
    // Ensure clean builds
    emptyOutDir: true,
    // Improve sourcemaps for debugging
    sourcemap: true,
  },
  // Enhance caching for development and production
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: [],
  },
  // Add timestamp to invalidate cached assets
  define: {
    'import.meta.env.VITE_BUILD_TIMESTAMP': JSON.stringify(new Date().toISOString()),
    'import.meta.env.VITE_CHAT_ENABLED': JSON.stringify(true),
    'import.meta.env.VITE_COMPONENT_TAGGER_ENABLED': JSON.stringify(true)
  }
}));
