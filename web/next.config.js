/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Samson_Landing_Page',
  assetPrefix: '/Samson_Landing_Page/',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001" + "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
