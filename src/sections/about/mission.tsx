import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

import { SlideCard } from "./slide-card";
import { mission } from "./data";

export function Mission() {
  return (
    <Section id="mission" accent="green" fill className="lg:py-8">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-50" />
      <Container className="relative overflow-x-hidden pb-5">
        <SlideCard accent="green" badge={mission.badge} heading={mission.heading} statement={mission.statement} />
      </Container>
    </Section>
  );
}
