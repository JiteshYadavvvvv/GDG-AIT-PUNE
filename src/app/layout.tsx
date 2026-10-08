import type { Metadata, Viewport } from "next";
import { Google_Sans_Code, Google_Sans_Flex } from "next/font/google";

import { CustomCursor } from "@/components/common/custom-cursor";
// import { Loader } from "@/components/common/loader";
import { Footer } from "@/components/layout/footer";
import { SiteBackground } from "@/components/layout/site-background";
import { Navbar } from "@/components/navigation/navbar";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

import { Providers } from "./providers";

import "./globals.css";

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
    default: "GDG AIT",
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "GDG AIT Pune",
    "Google Developer Group AIT Pune",
    "GDG AIT",
    "developer community Pune",
    "student developer community",
    "Army Institute of Technology",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: "GDG AIT Pune | Google Developer Group",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG AIT Pune | Google Developer Group",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(googleSansFlex.variable, googleSansCode.variable)}>
      <body>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GDG AIT Pune",
              url: siteConfig.url,
              description: siteConfig.description,
              sameAs: [
                "https://github.com/GDG-AIT-PUNE",
                "https://www.instagram.com/gdsc_aitpune/",
                "https://www.linkedin.com/company/gdsc-aitpune/",
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GDG AIT Pune",
              url: siteConfig.url,
            }),
          }}
        />
        
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-small text-canvas focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-(--z-toast)"
        >
          Skip to content
        </a>

        <Providers>

          <SiteBackground />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
