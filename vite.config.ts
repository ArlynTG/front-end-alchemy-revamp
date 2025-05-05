
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Custom component tagger implementation
function createComponentTagger() {
  return {
    name: 'custom-component-tagger',
    transform(code: string, id: string) {
      // Only process TypeScript React files
      if (id.endsWith('.tsx') && (code.includes('export default') || code.includes('React.') || code.includes('import React'))) {
        // Add displayName to components for better debugging
        return code.replace(
          /export default (\w+)/g,
          (match: string, componentName: string) => {
            return `${match}\n${componentName}.displayName = '${componentName}'`;
          }
        );
      }
      return code;
    }
  };
}

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
    // Use our custom component tagger in development mode
    mode === 'development' && createComponentTagger(),
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
