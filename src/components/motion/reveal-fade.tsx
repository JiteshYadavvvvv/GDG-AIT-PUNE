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

export function RevealFade({ children, className, delay = 0 }: RevealFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOK, () => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: DURATION.slow,
            delay,
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
