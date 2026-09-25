import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF first: noticeably smaller for the photo-heavy sections to come.
    formats: ["image/avif", "image/webp"],
    // Next 16 only allows quality 75 by default; allow lighter thumbnails
    // and crisper hero imagery.
    qualities: [60, 75, 90],
  },
};

export default nextConfig;
