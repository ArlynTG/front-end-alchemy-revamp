
#!/bin/bash

# Make sure scripts are executable
chmod +x install-deps.sh

# Install dependencies if needed
./install-deps.sh

# Run Vite directly from node_modules
npx vite
