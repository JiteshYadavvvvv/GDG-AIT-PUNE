import type { Event } from "./data";
import { EventCard } from "./event-card";

interface EventGalleryProps {
  events: Event[];
}

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1];

export function EventGallery({ events }: EventGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
      {events.map((event, index) => (
        <EventCard
          key={event.slug}
          event={event}
          delay={index * 0.08}
          rotation={ROTATIONS[index % ROTATIONS.length]}
        />
      ))}
    </div>
  );
}
