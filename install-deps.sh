
#!/bin/bash

# Make script executable
chmod +x ./install-deps.sh

# Install core dependencies
npm install react react-dom react-router-dom @tanstack/react-query lucide-react

# Install TypeScript and type declarations
npm install -D typescript @types/react @types/react-dom @types/node @types/react-router-dom

# Install Vite and build tools
npm install -D vite @vitejs/plugin-react-swc

# Install additional UI and utility libraries
npm install -D class-variance-authority clsx tailwind-merge

# Make sure Vite is installed globally
npm install -g vite

# Make script executable
chmod +x ./install-deps.sh

echo "All dependencies installed successfully. Run './run-dev.sh' to start the application."
