"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/animations/gsap";
import { DURATION, EASE } from "@/lib/animations/tokens";
import { cn } from "@/lib/utils/cn";
import { MEDIA } from "@/lib/utils/media";

interface RevealMediaProps {
  children: ReactNode;
  className?: string;
}

export function RevealMedia({ children, className }: RevealMediaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOK, () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });

        timeline
          .fromTo(
            ref.current,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: DURATION.slower, ease: EASE.inOut.gsap },
          )
          .from(ref.current?.firstElementChild ?? [], { scale: 1.15, duration: 1.6 }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-reveal="media" className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
