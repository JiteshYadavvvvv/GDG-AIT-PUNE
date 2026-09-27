"use client";

import { m } from "motion/react";
import Image from "next/image";

import { RevealMedia } from "@/components/motion/reveal-media";
import { SPRING } from "@/lib/animations/tokens";

import community from "./assets/community.jpg";
import { about } from "./data";

// Treated as a physical object on the page: a static rotated frame (never touched by GSAP)
// holding a layered back panel and the photo itself, which reveal/hover independently.
export function AboutPhoto() {
  return (
    <figure className="relative">
      <div className="group relative -rotate-[1.25deg]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 translate-x-3 translate-y-3 border border-line-strong bg-sunken transition-transform duration-(--duration-slow) ease-out group-hover:translate-x-4 group-hover:translate-y-4"
        />

        <div className="relative border border-line-strong bg-sunken shadow-floating">
          <RevealMedia className="relative aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0">
              <m.div whileHover={{ scale: 1.035 }} transition={SPRING.soft} className="absolute inset-0">
                <Image
                  src={community}
                  alt={about.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </m.div>
            </div>
          </RevealMedia>
        </div>

        <span aria-hidden className="absolute -top-3 -left-3 size-3 bg-blue" />
      </div>

      <figcaption className="mt-4 flex items-baseline justify-between gap-4 font-mono text-caption text-fg-subtle">
        <span>{about.photoCaption}</span>
        <span>GDG // AIT PUNE</span>
      </figcaption>
    </figure>
  );
}
