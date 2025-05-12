
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// Custom component tagger implementation for Lovable features
function componentTagger() {
  return {
    name: 'lovable-component-tagger',
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
      '6c9ee1b9-b8e6-4e66-860b-5a957c238292.lovableproject.com',
      '6c9ee1b9-b8e6-4e66-860b-5a957c238292.lovable.app',
      '.lovableproject.com',
      '.lovable.app',
      'localhost'
    ]
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
