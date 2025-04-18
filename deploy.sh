#!/usr/bin/env bash
set -e

# Build the project
echo "Building the project..."
npm run build

echo "This script does not automate deployments by default."
echo "To deploy to Netlify, install the Netlify CLI:"
echo "  npm install -g netlify-cli"
echo "Then run:"
echo "  netlify deploy --prod"
echo "Or configure deployment via the Netlify dashboard/CI."