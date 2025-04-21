
#!/bin/bash

# This script manually installs the essential dependencies
# to get the app running, without relying on package.json

# Install core dependencies
npm install --no-save react react-dom react-router-dom @tanstack/react-query lucide-react

# Install TypeScript and types
npm install --no-save typescript @types/react @types/react-dom

# Install build tools
npm install --no-save vite @vitejs/plugin-react-swc

# Install UI libraries
npm install --no-save class-variance-authority clsx tailwind-merge lucide-react date-fns 

echo "Core dependencies installed. Run 'npm run dev' to start the application."
