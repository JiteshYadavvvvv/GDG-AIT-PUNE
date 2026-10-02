import { RevealFade } from "@/components/motion/reveal-fade";
import { Card } from "@/components/ui/card";

import { categoryAccent, type Event } from "./data";

interface EventCardProps {
  event: Event;
  delay?: number;
  className?: string;
}

export function EventCard({ event, delay = 0, className }: EventCardProps) {
  return (
    <RevealFade delay={delay} className={className}>
      <Card
        href={`/events/${event.slug}`}
        image={event.image}
        imageAlt={`${event.name} event poster`}
        title={event.name}
        meta={`${event.category} · ${event.monthYear}`}
        accent={categoryAccent[event.category]}
        className="h-full"
        mediaClassName="aspect-square"
      />
    </RevealFade>
  );
}
