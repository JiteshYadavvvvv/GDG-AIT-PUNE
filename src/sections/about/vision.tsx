import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

import { SlideCard } from "./slide-card";
import { vision } from "./data";

export function Vision() {
  return (
    <Section accent="yellow">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
      <Container className="relative">
        <SlideCard accent="yellow" badge={vision.badge} heading={vision.heading} statement={vision.statement} />
      </Container>
    </Section>
  );
}
