"use client";

import { useEffect, useRef } from "react";

import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { MEDIA } from "@/lib/utils/media";

const TRAIL_COLORS = ["var(--color-blue)", "var(--color-red)", "var(--color-yellow)", "var(--color-green)"];
const MAX_AGE_MS = 260;
const FADE_DELAY_MS = 180;

interface Point {
  x: number;
  y: number;
  t: number;
}

export function PointerTrail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const polylineRef = useRef<SVGPolylineElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canHover = useMediaQuery(MEDIA.finePointer);
  const reducedMotion = usePrefersReducedMotion();
  const active = canHover && !reducedMotion;

  useEffect(() => {
    if (!active) return;

    const svg = svgRef.current;
    const polyline = polylineRef.current;
    const parent = svg?.parentElement;
    if (!svg || !polyline || !parent) return;

    function handlePointerMove(event: PointerEvent) {
      const rect = svg!.getBoundingClientRect();
      const now = performance.now();

      pointsRef.current.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, t: now });
      pointsRef.current = pointsRef.current.filter((point) => now - point.t < MAX_AGE_MS);

      polyline!.setAttribute("points", pointsRef.current.map((point) => `${point.x},${point.y}`).join(" "));
      polyline!.style.opacity = "1";

      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      fadeTimeout.current = setTimeout(() => {
        polyline!.style.opacity = "0";
      }, FADE_DELAY_MS);
    }

    parent.addEventListener("pointermove", handlePointerMove);
    return () => {
      parent.removeEventListener("pointermove", handlePointerMove);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <svg ref={svgRef} aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
      <defs>
        <linearGradient id="event-trail-gradient" gradientUnits="userSpaceOnUse">
          {TRAIL_COLORS.map((color, index) => (
            <stop key={color} offset={`${(index / (TRAIL_COLORS.length - 1)) * 100}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      <polyline
        ref={polylineRef}
        fill="none"
        stroke="url(#event-trail-gradient)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0 transition-opacity duration-300 ease-out"
      />
    </svg>
  );
}
