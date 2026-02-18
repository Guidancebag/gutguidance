import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gutguidance",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
