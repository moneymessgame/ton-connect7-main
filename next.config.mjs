// next.config.js
import nextI18NextConfig from "./next-i18next.config.mjs"
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: nextI18NextConfig.i18n,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ];
    },
};

export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: true,
})(nextConfig);
