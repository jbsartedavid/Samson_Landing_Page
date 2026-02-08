/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const isNetlify = Boolean(process.env.NETLIFY);
const basePath = isNetlify
  ? ""
  : process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? "/Samson_Landing_Page" : "");
const assetPrefix = basePath ? `${basePath}/` : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (isProd) {
      return [];
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
