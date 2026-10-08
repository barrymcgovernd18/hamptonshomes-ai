import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Barry McGovern | Hamptons Luxury Real Estate",
    short_name: "BM Hamptons",
    start_url: "/",
    display: "browser",
    background_color: "#f4f0e8",
    theme_color: "#162d35",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
