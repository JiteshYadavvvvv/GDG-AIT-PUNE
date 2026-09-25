/**
 * Site-wide identity used by metadata, OG images, robots and sitemap.
 * Description is a factual placeholder — final copy lands in a later stage.
 */

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Provided automatically on Vercel builds.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "GDG AIT Pune",
  fullName: "Google Developer Groups on Campus — Army Institute of Technology, Pune",
  description: "Google Developer Groups on Campus at Army Institute of Technology, Pune.",
  url: resolveSiteUrl(),
  locale: "en_IN",
  /** Must match --color-canvas in src/styles/theme.css. */
  themeColor: "#090b0f",
} as const;
