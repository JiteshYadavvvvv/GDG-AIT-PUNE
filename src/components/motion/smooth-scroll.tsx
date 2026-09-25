"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

// Reduced motion is handled by Lenis itself (respectReducedMotion defaults to true).
const LENIS_OPTIONS: LenisOptions = {
  autoRaf: false,
  lerp: 0.1,
  syncTouch: false,
  stopInertiaOnNavigate: true,
};

// Programmatic scrolls get a timed ease; plain lerp lurches over long distances.
export const SCROLL_TO_OPTIONS = {
  duration: 1.4,
  easing: (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2),
};

const syncScrollTrigger = () => ScrollTrigger.update();

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Run Lenis on GSAP's ticker so it stays in sync with ScrollTrigger.
    const step = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(step);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(step);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  useEffect(() => {
    // Lenis's own anchor option lets the browser jump first, so same-page hash links are handled here.
    function handleClick(event: MouseEvent) {
      const lenis = lenisRef.current?.lenis;
      if (!lenis || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target instanceof Element ? event.target.closest("a[href*='#']") : null;
      if (!(link instanceof HTMLAnchorElement)) return;

      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, SCROLL_TO_OPTIONS);
      history.pushState(null, "", url.hash);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
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

export { useLenis };
