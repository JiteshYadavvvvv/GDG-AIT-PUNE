import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetail } from "@/sections/event-detail/event-detail";
import { events, getEventBySlug } from "@/sections/events/data";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}



export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return {
    title: `${event.name} | GDG AIT Pune`,
    description: event.description,
    alternates: {
      canonical: `/events/${event.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/events/${event.slug}`,
      title: `${event.name} | GDG AIT Pune`,
      description: event.description,
      siteName: "GDG AIT Pune",
      images: [
        {
          url: event.image.src,
          width: event.image.width,
          height: event.image.height,
          alt: `${event.name} event poster`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.name} | GDG AIT Pune`,
      description: event.description,
      images: [event.image.src],
    },
  };
}

function EventStructuredData({ event }: { event: (typeof events)[number] }) {
  const eventDate = new Date(event.date);
  const isValidDate = !Number.isNaN(eventDate.getTime());
  const isPast = isValidDate && eventDate.getTime() < Date.now();

  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    url: `${siteConfig.url}/events/${event.slug}`,
    image: [`${siteConfig.url}${event.image.src}`],
    startDate: isValidDate ? eventDate.toISOString() : undefined,
    eventStatus: isPast
      ? "https://schema.org/EventCompleted"
      : "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: "GDG AIT Pune",
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  return (
    <>
      <EventStructuredData event={event} />
      <EventDetail event={event} />
    </>
  );
}
