import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

// Placeholder share card, generated at build time. Replace with the designed
// card once the visual identity is final.

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GDG_COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: siteConfig.themeColor,
          color: "#f9fafb",
        }}
      >
        <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
          {GDG_COLORS.map((color) => (
            <div key={color} style={{ width: 28, height: 28, borderRadius: 14, background: color }} />
          ))}
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 32, marginTop: 16, color: "#a2a5aa" }}>{siteConfig.fullName}</div>
      </div>
    ),
    size,
  );
}
