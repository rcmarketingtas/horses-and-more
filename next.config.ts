import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow unoptimized local images to load even if they fail gracefully
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
