// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export to avoid generateStaticParams requirement
  // output: 'export',
  // Configure images
  images: {
    domains: ['localhost'],
  }
}

module.exports = nextConfig
