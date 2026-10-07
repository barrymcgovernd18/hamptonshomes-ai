import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 50 is used for B&W hero and portfolio photographs (AVIF, visually indistinguishable at display size); 75 is the default elsewhere.
    qualities: [50, 75],
  },
  async redirects() {
    return [
      // Market and Insights merged into one Market hub (Oct 2026). Article URLs under /blog/<slug> are unchanged.
      { source: "/blog", destination: "/market", statusCode: 301 },
      { source: "/insights", destination: "/market", statusCode: 301 },
    ];
  },
};

export default nextConfig;
