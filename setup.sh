
#!/bin/bash

# Install dependencies
npm install react react-dom react-router-dom @tanstack/react-query lucide-react

# Add dev dependencies
npm install -D typescript @types/react @types/react-dom @types/node @vitejs/plugin-react-swc vite

# Start development server
npm run dev
