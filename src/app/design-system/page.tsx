import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/ui/section-label";

import { ColourSpecimen } from "../_preview/colour-specimen";
import { InteractionSpecimen } from "../_preview/interaction-specimen";
import { TypeSpecimen } from "../_preview/type-specimen";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return (
    <>
      <section className="pt-[calc(var(--spacing-nav)+clamp(3rem,10vw,8rem))] pb-24">
        <Container>
          <SectionLabel accent="blue">Internal reference</SectionLabel>
          <h1 className="mt-8 text-heading-xl">Design system</h1>
          <p className="mt-6 max-w-prose text-lead text-fg-muted">
            Type, colour and interaction components used across the site.
          </p>
        </Container>
      </section>
      <TypeSpecimen />
      <ColourSpecimen />
      <InteractionSpecimen />
    </>
  );
}
