import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/motion/reveal-text";
import type { Accent } from "@/config/brand";
import { EventCard } from "@/sections/events/event-card";
import type { Event } from "@/sections/events/data";

interface EventRelatedProps {
  events: Event[];
  accent: Accent;
}

const ROTATIONS = [-2, 1.5, -1];

export function EventRelated({ events, accent }: EventRelatedProps) {
  if (events.length === 0) return null;

  return (
    <Section accent={accent} className="py-16 lg:py-20">
      <Container>
        <div className="px-3 lg:px-6">
          <RevealText delay={0.05} className="text-heading-lg font-bold">
            More events
          </RevealText>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <EventCard
                key={event.slug}
                event={event}
                delay={index * 0.08}
                rotation={ROTATIONS[index % ROTATIONS.length]}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
