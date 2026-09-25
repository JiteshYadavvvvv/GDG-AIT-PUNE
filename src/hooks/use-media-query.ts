"use client";

import { useCallback, useSyncExternalStore } from "react";

import { MEDIA } from "@/lib/utils/media";

/**
 * Subscribes to a media query. Returns `serverFallback` during SSR and
 * hydration, then the live value. For layout differences prefer CSS
 * breakpoints; use this for behaviour (which effect to mount, quality tier).
 */
export function useMediaQuery(query: string, serverFallback = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

/** For non-Motion code (GSAP setup, R3F). Motion components already respect it. */
export function usePrefersReducedMotion() {
  return useMediaQuery(MEDIA.reducedMotion);
}
