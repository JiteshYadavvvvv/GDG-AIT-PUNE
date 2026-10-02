"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/animations/gsap";
import { DURATION } from "@/lib/animations/tokens";
import { MEDIA } from "@/lib/utils/media";

interface RevealFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Fade + rise for small standalone accents (labels, tags, marks) that aren't masked text or media. */
export function RevealFade({ children, className, delay = 0 }: RevealFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOK, () => {
        // fromTo (not from): base.css pre-sets opacity:0 to avoid FOUC, so a `.from()` tween
        // would read that as its own end value too and animate opacity 0 → 0 (a no-op).
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: DURATION.slow,
            delay,
            // clearProps: once settled, GSAP would otherwise leave an inline
            // `transform: translate(0px, 0px)` on the element permanently. That's visually a
            // no-op, but any transform value other than `none` creates a new CSS stacking
            // context — which silently breaks paint order against stacking-context-forming
            // siblings elsewhere on the page (e.g. an `opacity < 1` background layer painting
            // over content that should be on top of it). Dropping the inline style once the
            // animation is done removes that side effect entirely.
            clearProps: "transform",
            scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-reveal="fade" className={className}>
      {children}
    </div>
  );
}
