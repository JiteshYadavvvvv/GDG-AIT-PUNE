import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealFade } from "@/components/motion/reveal-fade";
import { RevealText } from "@/components/motion/reveal-text";

import { events } from "./data";
import { EventGallery } from "./event-gallery";

export function Events() {
  return (
    <Section id="events" accent="red" className="py-16 lg:py-24">
      <Container>
        <div aria-hidden className="flex items-center justify-center gap-2">
          <span className="size-1.5 bg-red" />
          <span className="block h-0.5 w-14 bg-red" />
          <span className="size-1.5 bg-red" />
        </div>

        <RevealText delay={0.05} className="mt-4 text-center text-heading-xl">
          Our Events
        </RevealText>

        <RevealFade delay={0.1} className="mx-auto mt-6 max-w-2xl text-center text-body text-fg-muted">
          A look at the hackathons, workshops, and study jams GDG AIT Pune has run — real teams, real projects, real
          Google technologies.
        </RevealFade>

        <div className="mt-12 lg:mt-16">
          <EventGallery events={events} />
        </div>
      </Container>
    </Section>
  );
}
