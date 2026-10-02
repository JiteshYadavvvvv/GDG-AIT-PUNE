"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

const LENIS_OPTIONS: LenisOptions = {
  autoRaf: false,
  lerp: 0.1,
  syncTouch: false,
  stopInertiaOnNavigate: true,
};

export const SCROLL_TO_OPTIONS = {
  duration: 1.4,
  easing: (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2),
};

const syncScrollTrigger = () => ScrollTrigger.update();

function resolvePinnedScrollTarget(target: HTMLElement): HTMLElement | number {
  const group = target.closest<HTMLElement>("[data-panel-group]");
  const panel = target.closest<HTMLElement>("[data-panel-index]");
  if (!group || !panel) return target;

  const st = ScrollTrigger.getById(group.dataset.panelGroup!);
  const count = Number(group.dataset.panelCount);
  const index = Number(panel.dataset.panelIndex);
  if (!st || !Number.isFinite(count) || count < 2 || !Number.isFinite(index)) return target;

  return st.start + (st.end - st.start) * (index / (count - 1));
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const step = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(step);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(step);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  useEffect(() => {
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
      lenis.scrollTo(resolvePinnedScrollTarget(target), SCROLL_TO_OPTIONS);
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
