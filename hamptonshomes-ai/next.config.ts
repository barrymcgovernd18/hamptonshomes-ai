import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Market and Insights merged into one Market hub (Oct 2026). Article URLs under /blog/<slug> are unchanged.
      { source: "/blog", destination: "/market", statusCode: 301 },
      { source: "/insights", destination: "/market", statusCode: 301 },
    ];
  },
};

export default nextConfig;
