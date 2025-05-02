/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // If you’re on Next 15+, you can remove swcMinify—it’s automatic.
    swcMinify: true,
  
    // THIS IS THE KEY: skip ESLint during production builds
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;
  