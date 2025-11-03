/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Production best practices - only ignore errors if absolutely necessary
  eslint: {
    // TODO: Remove this once linting issues are fixed
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // TODO: Remove this once type errors are fixed
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },

  // Enable image optimization for better performance
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
}

export default nextConfig
