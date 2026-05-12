/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.qurancdn.com" },
      { protocol: "https", hostname: "cdn.islamic.network" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "api.alquran.cloud" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ✅ ADD THIS — skips static pre-render for all dynamic pages
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
module.exports = nextConfig;
