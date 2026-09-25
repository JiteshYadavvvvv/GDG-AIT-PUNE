"use client";

import { useCallback, useSyncExternalStore } from "react";

import { MEDIA } from "@/lib/utils/media";

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

export function usePrefersReducedMotion() {
  return useMediaQuery(MEDIA.reducedMotion);
}
