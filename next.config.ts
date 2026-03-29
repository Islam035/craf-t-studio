import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-f41f73c1-c6a5-48d3-a03e-5f47cef9a08e.space.z.ai",
  ],
};

export default nextConfig;
