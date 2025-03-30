// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for static export to ensure compatibility with Amplify
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: ['localhost'],
  }
}

module.exports = nextConfig
