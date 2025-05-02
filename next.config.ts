import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // If you’re on Next 15+, you can remove swcMinify—minification is auto-enabled.
  swcMinify: true,

  // Tell Next.js to skip ESLint checks during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
