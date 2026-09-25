import type { Metadata } from "next";

import { ColourSpecimen } from "./_preview/colour-specimen";
import { InteractionSpecimen } from "./_preview/interaction-specimen";
import { PlaceholderSections } from "./_preview/placeholder-sections";
import { PreviewIntro } from "./_preview/preview-intro";
import { TypeSpecimen } from "./_preview/type-specimen";

// Temporary: the design system preview stands in until the homepage sections land.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <>
      <PreviewIntro />
      <TypeSpecimen />
      <ColourSpecimen />
      <InteractionSpecimen />
      <PlaceholderSections />
    </>
  );
}
