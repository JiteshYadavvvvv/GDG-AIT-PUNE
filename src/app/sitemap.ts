import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { events } from "@/sections/events/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const eventUrls: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteConfig.url}/events/${event.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...eventUrls,
  ];
}
