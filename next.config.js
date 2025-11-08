/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    
    // Add any production-specific webpack overrides here
    if (process.env.NODE_ENV === 'production') {
      // Production-specific webpack configuration
    }
    
    return config;
  },
  // Enable CSS modules
  cssModules: true,
  // Enable CSS source maps in development
  productionBrowserSourceMaps: true,
  },
  // Enable Turbopack in development
  experimental: {
    turbo: {}
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Webpack configuration (fallback for production build)
  webpack: (config, { isServer }) => {
    // Apply the moment.js alias for webpack builds
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'moment': 'moment/moment.js'
      };
    }
    return config;
  },
};

// Enable webpack for production build
if (process.env.NODE_ENV === 'production') {
  // Remove turbopack config for production
  delete nextConfig.experimental.turbo;
  
  // Add any production-specific webpack overrides here
  nextConfig.webpack = (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'moment': 'moment/moment.js'
      };
    }
    return config;
  };
}

module.exports = nextConfig;
