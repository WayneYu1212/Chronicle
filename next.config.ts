import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Chronicle",
  assetPrefix: "/Chronicle/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
