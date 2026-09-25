"use client";

import { m, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { FOLLOW } from "@/lib/animations/tokens";
import { cn } from "@/lib/utils/cn";
import { MEDIA } from "@/lib/utils/media";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, FOLLOW.magnetic);
  const y = useSpring(0, FOLLOW.magnetic);
  const canHover = useMediaQuery(MEDIA.finePointer);
  const reducedMotion = usePrefersReducedMotion();

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!canHover || reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("inline-flex", className)}
    >
      {children}
    </m.div>
  );
}
