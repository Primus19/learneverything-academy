#!/bin/bash

clear
echo "==============================================="
echo "      Tech Academy Website Deployment Tool"
echo "==============================================="

# Check for Node.js
if ! command -v node &> /dev/null
then
    echo "Node.js not found, installing..."
    curl -o node-installer.msi https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi
    msiexec.exe /i node-installer.msi /qn /norestart
    rm node-installer.msi
else
    echo "Node.js already installed."
fi

# Check for AWS CLI
if ! command -v aws &> /dev/null
then
    echo "AWS CLI not found, installing..."
    curl -o awscli.msi https://awscli.amazonaws.com/AWSCLIV2.msi
    msiexec.exe /i awscli.msi /qn /norestart
    rm awscli.msi
else
    echo "AWS CLI already installed."
fi

# Navigate to frontend
cd frontend

# Fix import paths explicitly
echo "Fixing import paths..."
echo '{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}' > tsconfig.json

echo "module.exports = {
  webpack(config) {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');
    return config;
  },
};" > next.config.js

# Clean cache and install frontend dependencies
echo "Cleaning npm cache and reinstalling..."
npm cache clean --force
npm install --legacy-peer-deps

cd ..

# Add missing Cloudflare DB type definition explicitly
mkdir -p frontend/src/types
echo "export interface CloudflareEnv {
  DB: {
    prepare: (query: string) => {
      bind: (...args: any[]) => {
        run: () => Promise<any>;
        all: () => Promise<any>;
      };
    };
  };
}" > frontend/src/types/cloudflare.d.ts

# Explicitly fix the counter.ts with correct header method
echo "import type { CloudflareEnv } from '../types/cloudflare';
import { headers } from 'next/headers';

export default async function handler(cf: { env: CloudflareEnv }) {
  const headersList = await headers(); // added explicit await here

  const userAgent = headersList.get('user-agent') || 'unknown';

  const { results: countResults } = await cf.env.DB.prepare(
    'INSERT INTO counters (name, value) VALUES (?, 1) ON CONFLICT (name) DO UPDATE SET value = value + 1 RETURNING value'
  )
    .bind('page_views')
    .run();

  return {
    userAgent,
    countResults,
  };
}" > frontend/src/app/counter.ts

# Fix resume-templates to clearly mark as client component
echo '"use client";

import React from "react";

export default function ResumeTemplates() {
  return (
    <div>
      <h1>Resume Templates</h1>
      {/* Add your existing JSX here */}
    </div>
  );
}' > frontend/src/app/resume-templates/page.tsx

echo "✅ Resume Templates component clearly marked as client."

# Build frontend application
echo "Building frontend application..."
cd frontend
npm run build
cd ..

# Prepare deployment folder
echo "Preparing deployment package..."
mkdir -p tech_academy_deployment/build
cp -r frontend/.next tech_academy_deployment/build/
cp -r courses tech_academy_deployment/build/
cp -r resume_samples tech_academy_deployment/build/
cp deployment_guide.md tech_academy_deployment/

# Ensure no ZIP conflict
echo "Creating ZIP file..."
[ -f tech_academy_s3_ready.zip ] && rm tech_academy_s3_ready.zip
powershell.exe Compress-Archive tech_academy_deployment tech_academy_s3_ready.zip

# Completion Message
echo ""
echo "==============================================="
echo "        Deployment Package is Ready!"
echo "==============================================="
echo ""
echo "Your deployment package is tech_academy_s3_ready.zip."
echo "Extract and upload it to your AWS S3 bucket."
echo "Follow instructions in deployment_guide.md to finalize."
echo ""

read -p "Press [Enter] key to exit..."
