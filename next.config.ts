// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middlewarePrefetch: 'flexible',  // 'strict' 또는 'flexible'만 허용
    serverActions: {},               // true 대신 객체
  },
  images: {
    domains: [],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'x-vercel-ip-country',
          value: 'geo-ip',
        },
      ],
    },
  ],
}

module.exports = nextConfig
