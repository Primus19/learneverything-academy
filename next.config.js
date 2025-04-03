/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ]
  },
  swcMinify: false,
  // Ensure static assets are copied to output
  assetPrefix: '',
  // Configure static file copying
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(pdf|docx)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/templates/[name][ext]'
      }
    });
    return config;
  }
};

module.exports = nextConfig;