// Mirrors --breakpoint-* in styles/theme.css (px).
export const BREAKPOINTS = {
  xs: 375,
  sm: 430,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
  "3xl": 1920,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const MEDIA = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  motionOK: "(prefers-reduced-motion: no-preference)",
  finePointer: "(hover: hover) and (pointer: fine)",
  coarsePointer: "(pointer: coarse)",
  up: (bp: Breakpoint) => `(min-width: ${BREAKPOINTS[bp] / 16}rem)`,
} as const;
