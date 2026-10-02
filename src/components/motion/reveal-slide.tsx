"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/animations/gsap";
import { DURATION, EASE } from "@/lib/animations/tokens";
import { cn } from "@/lib/utils/cn";
import { MEDIA } from "@/lib/utils/media";

interface RevealSlideProps {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  delay?: number;
  distance?: number;
}

export function RevealSlide({ children, className, from = "left", delay = 0, distance = 80 }: RevealSlideProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOK, () => {
        gsap.fromTo(
          innerRef.current,
          { x: from === "left" ? -distance : distance, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: DURATION.slower,
            delay,
            ease: EASE.standard.gsap,
            scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", once: true },
          },
        );
      });
    },
    { scope: wrapperRef },
  );

  return (
    <div ref={wrapperRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} data-reveal="fade" className="relative">
        {children}
      </div>
    </div>
  );
}
