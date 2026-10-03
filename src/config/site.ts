import { paperHex } from "./brand";

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "GDG AIT",
  fullName: "Google Developer Groups on Campus — Army Institute of Technology, Pune",
  description: "Tech-driven student community focused on learning, building, and solving real-world challenges.",
  url: resolveSiteUrl(),
  locale: "en_IN",
  themeColor: paperHex,
} as const;
