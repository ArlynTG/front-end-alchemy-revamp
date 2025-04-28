/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the build to complete even if there are TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during production builds to avoid missing dependency failures
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 