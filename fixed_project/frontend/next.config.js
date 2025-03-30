// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export configuration
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
