#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Deploy to production
echo "Deploying to production..."
npm run deploy

# Verify deployment
echo "Verifying deployment..."
npm run verify

echo "Deployment complete!"