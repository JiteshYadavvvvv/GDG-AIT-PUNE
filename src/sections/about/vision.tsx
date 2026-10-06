import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

import { SlideCard } from "./slide-card";
import { vision } from "./data";

export function Vision() {
  return (
    <Section accent="yellow" fill className="lg:py-8 mt-[-12]">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-50" />
      <Container className="relative overflow-x-hidden pb-5">
        <SlideCard accent="yellow" badge={vision.badge} heading={vision.heading} statement={vision.statement} />
      </Container>
    </Section>
  );
}
