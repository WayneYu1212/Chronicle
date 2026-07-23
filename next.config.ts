import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGithubPages ? "/Chronicle" : undefined,
  assetPrefix: isGithubPages ? "/Chronicle/" : undefined,
};

export default nextConfig;
