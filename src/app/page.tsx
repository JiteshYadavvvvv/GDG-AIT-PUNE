import type { Metadata } from "next";

import { Hero } from "@/sections/hero/hero";

import { PlaceholderSections } from "./_preview/placeholder-sections";

// Kept out of search results until the remaining sections are in.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <>
      <Hero />
      <PlaceholderSections />
    </>
  );
}
