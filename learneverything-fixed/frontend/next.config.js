/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Add any other configuration options your project needs
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
