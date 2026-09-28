import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

import { SlideCard } from "./slide-card";
import { mission } from "./data";

export function Mission() {
  return (
    <Section id="mission" accent="green">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
      <Container className="relative overflow-x-hidden">
        <SlideCard accent="green" badge={mission.badge} heading={mission.heading} statement={mission.statement} />
      </Container>
    </Section>
  );
}
