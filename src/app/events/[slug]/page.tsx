import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetail } from "@/sections/event-detail/event-detail";
import { events, getEventBySlug } from "@/sections/events/data";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return {
    title: event.name,
    description: event.description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      type: "article",
      url: `/events/${event.slug}`,
      title: event.name,
      description: event.description,
      images: [{ url: event.image.src, width: event.image.width, height: event.image.height }],
    },
  };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  return <EventDetail event={event} />;
}
