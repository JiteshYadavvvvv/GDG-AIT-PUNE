import Image from "next/image";
import type { CSSProperties } from "react";

import { RevealFade } from "@/components/motion/reveal-fade";
import { accentVars } from "@/config/brand";

import { categoryAccent, type Event } from "./data";

interface EventCardProps {
  event: Event;
  delay?: number;
  rotation?: number;
  className?: string;
}

export function EventCard({ event, delay = 0, rotation = 0, className }: EventCardProps) {
  const accent = categoryAccent[event.category];
  const style = { ...accentVars(accent), "--rotate": `${rotation}deg` } as CSSProperties;

  return (
    <RevealFade delay={delay} className={className}>
      <div style={style} className="group relative h-full">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-2 translate-y-2 rotate-(--rotate) rounded-lg border-2 border-ink bg-ink transition-[background-color,translate,rotate] duration-(--duration-slow) ease-out group-hover:translate-x-3 group-hover:translate-y-3.5 group-hover:rotate-0 group-hover:bg-(--accent) max-sm:rotate-0"
        />

        <a
          href={`/events/${event.slug}`}
          data-cursor="view"
          className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-ink bg-surface rotate-(--rotate) transition-[translate,scale,rotate] duration-(--duration-slow) ease-out group-hover:-translate-y-2 group-hover:scale-[1.015] group-hover:rotate-0 active:scale-[0.985] max-sm:rotate-0"
        >
          <div className="relative aspect-square overflow-hidden border-b-2 border-ink bg-sunken">
            <span aria-hidden className="bg-dots absolute inset-0 opacity-60" />
            <Image
              src={event.image}
              alt={`${event.name} event poster`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain p-4 transition-transform duration-(--duration-slower) ease-out group-hover:scale-[1.04] sm:p-5"
            />
          </div>

          <div className="flex flex-1 items-center justify-center bg-surface px-4 py-5 text-center transition-colors duration-(--duration-base) group-hover:bg-(--accent-soft)">
            <h3 className="text-heading-sm font-semibold text-(--accent-strong)">{event.name}</h3>
          </div>
        </a>
      </div>
    </RevealFade>
  );
}
