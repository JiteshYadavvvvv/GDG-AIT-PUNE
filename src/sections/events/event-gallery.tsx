import type { Event } from "./data";
import { EventCard } from "./event-card";

interface EventGalleryProps {
  events: Event[];
}

export function EventGallery({ events }: EventGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <EventCard key={event.slug} event={event} delay={index * 0.08} />
      ))}
    </div>
  );
}
