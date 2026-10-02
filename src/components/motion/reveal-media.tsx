"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/animations/gsap";
import { DURATION, EASE } from "@/lib/animations/tokens";
import { cn } from "@/lib/utils/cn";
import { MEDIA } from "@/lib/utils/media";

type RevealDirection = "up" | "left" | "right";

interface RevealMediaProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  distance?: number;
}

function fromVars(direction: RevealDirection, distance: number) {
  if (direction === "up") return { y: distance };
  return { x: direction === "left" ? -distance : distance };
}

export function RevealMedia({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 100,
}: RevealMediaProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOK, () => {
        gsap.fromTo(
          innerRef.current,
          { ...fromVars(direction, distance), opacity: 0 },
          {
            x: 0,
            y: 0,
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
      <div ref={innerRef} data-reveal="fade" className="size-full">
        {children}
      </div>
    </div>
  );
}
