import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // Specify "https" for security
        hostname: "**", // Match any hostname
      },
    ],
  },
};

export default nextConfig;
