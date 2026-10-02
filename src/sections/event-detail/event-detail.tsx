import { categoryAccent, getRelatedEvents, type Event } from "@/sections/events/data";

import { EventAbout } from "./event-about";
import { EventHero } from "./event-hero";
import { EventRelated } from "./event-related";

interface EventDetailProps {
  event: Event;
}

export function EventDetail({ event }: EventDetailProps) {
  const accent = categoryAccent[event.category];
  const related = getRelatedEvents(event.slug);

  return (
    <>
      <EventHero event={event} accent={accent} />
      <EventAbout description={event.description} accent={accent} />
      <EventRelated events={related} accent={accent} />
    </>
  );
}
