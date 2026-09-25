import type { Metadata, Viewport } from "next";
import { Google_Sans_Code, Google_Sans_Flex } from "next/font/google";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

import { Providers } from "./providers";

import "./globals.css";

// Variable weight axis only (~50 KB latin). Extra axes are opt-in for Stage 1:
// `axes: ["opsz"]` or `["wdth"]` ≈ +67 KB each, both together ≈ 308 KB.
//
// Next.js has no fallback metrics for these families yet, so a size-adjusted
// fallback can't be generated automatically; system fonts are declared instead.
const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google-sans-flex",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-google-sans-code",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  // Icons and the OG image come from file conventions in this folder:
  // icon.svg, opengraph-image.tsx (add apple-icon.png with the final logo).
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(googleSansFlex.variable, googleSansCode.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
