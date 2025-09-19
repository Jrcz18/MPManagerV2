/** @type {import('next').NextConfig} */

const isMobile = process.env.BUILD_TARGET === 'mobile';

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
  ...(isMobile && {
    output: 'export',
    webpack: (config) => {
      // Ignore ALL server-side API routes
      config.module.rules.push({
        test: /\/app\/api\//,
        loader: 'ignore-loader',
      });

      // Ignore any server-only action files
      config.module.rules.push({
        test: /sync(-calendars)?\.ts$/,
        loader: 'ignore-loader',
      });

      return config;
    },
  }),
};

module.exports = nextConfig;
