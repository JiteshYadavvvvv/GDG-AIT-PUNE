"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

const LENIS_OPTIONS: LenisOptions = {
  // Stepped by GSAP's ticker (below) so Lenis and ScrollTrigger share a frame.
  autoRaf: false,
  // Default interpolation: smooth but responsive, never floaty.
  lerp: 0.1,
  // Touch devices keep native momentum scrolling.
  syncTouch: false,
  // In-page `#anchor` links scroll through Lenis.
  anchors: true,
  stopInertiaOnNavigate: true,
  // `respectReducedMotion` defaults to true: under prefers-reduced-motion
  // Lenis tracks input 1:1 and programmatic scrolls jump instantly.
};

const syncScrollTrigger = () => ScrollTrigger.update();

/** App-level smooth scrolling. Mounted once in app/providers.tsx. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const step = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(step);
    // Lag smoothing would let GSAP's clock drift from Lenis after a long frame.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(step);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <ReactLenis root options={LENIS_OPTIONS} ref={lenisRef}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

function ScrollTriggerSync() {
  useLenis(syncScrollTrigger);
  return null;
}

/** Access the root Lenis instance, e.g. `useLenis()?.scrollTo("#events")`. */
export { useLenis };
