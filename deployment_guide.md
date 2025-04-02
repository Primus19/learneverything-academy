# Deployment Guide

This guide explains how to deploy the LearnEverything Academy platform.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Access to deployment environment

## Build Process

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Test the build:
   ```bash
   npm run start
   ```

## Deployment Steps

1. Configure environment variables
2. Run deployment script:
   ```bash
   ./deploy.sh
   ```

## Verification

1. Check application status
2. Verify all routes are working
3. Test functionality in production

## Troubleshooting

If you encounter issues during deployment:

1. Check build logs
2. Verify environment variables
3. Ensure all dependencies are installed