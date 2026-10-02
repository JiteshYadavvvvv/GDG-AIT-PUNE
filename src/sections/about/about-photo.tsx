"use client";

import { m } from "motion/react";
import Image from "next/image";

import { RevealMedia } from "@/components/motion/reveal-media";
import { SPRING } from "@/lib/animations/tokens";

import community from "./assets/community.jpg";
import { about } from "./data";

export function AboutPhoto() {
  return (
    <figure className="relative">
      <div className="group relative rotate-[1.25deg]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-2xl bg-blue transition-transform duration-(--duration-slow) ease-out group-hover:translate-x-4 group-hover:translate-y-4"
        />

        <div className="relative rounded-2xl border-4 border-ink bg-ink p-2.5 shadow-floating sm:p-3">
          <RevealMedia direction="right" delay={0.16} distance={130} className="relative aspect-[4/3] rounded-lg">
            <m.div whileHover={{ scale: 1.035 }} transition={SPRING.soft} className="relative size-full">
              <Image
                src={community}
                alt={about.photoAlt}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </m.div>
          </RevealMedia>
        </div>
      </div>

      <figcaption className="mt-4 flex items-center gap-2 pl-1 font-mono text-caption text-fg-subtle">
        <span aria-hidden className="h-px w-5 bg-line-strong" />
        {about.photoCaption}
      </figcaption>
    </figure>
  );
}
