// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for static export to ensure compatibility with Amplify
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  // Ensure all TypeScript files are properly transpiled
  webpack: (config) => {
    // Modify the rule for JavaScript/JSX files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    });
    
    return config;
  },
}

module.exports = nextConfig
