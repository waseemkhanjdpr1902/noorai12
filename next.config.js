const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

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
};

module.exports = withPWA(nextConfig);
