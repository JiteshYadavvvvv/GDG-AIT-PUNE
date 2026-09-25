import { ImageResponse } from "next/og";

import { GdgMark } from "@/components/ui/gdg-mark";
import { accents, brandHex, inkHex, mutedHex, paperHex } from "@/config/brand";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: paperHex,
          color: inkHex,
        }}
      >
        <div style={{ display: "flex", padding: "80px 80px 0" }}>
          <GdgMark width={132} height={68} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "0 80px 72px" }}>
          <div style={{ fontSize: 112, letterSpacing: -5, lineHeight: 1 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 30, marginTop: 24, color: mutedHex }}>{siteConfig.fullName}</div>
        </div>
        <div style={{ display: "flex", height: 14 }}>
          {accents.map((accent) => (
            <div key={accent} style={{ flex: 1, background: brandHex[accent] }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
