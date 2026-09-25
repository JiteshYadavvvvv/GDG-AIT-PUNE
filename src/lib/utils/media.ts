/** Mirrors the --breakpoint-* tokens in src/styles/theme.css (in px). */
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

/**
 * Media queries shared by hooks (useMediaQuery) and gsap.matchMedia().
 * Breakpoints are emitted in rem to match Tailwind's generated queries.
 */
export const MEDIA = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  motionOK: "(prefers-reduced-motion: no-preference)",
  /** Mouse/trackpad: enables hover-only effects and custom cursor. */
  finePointer: "(hover: hover) and (pointer: fine)",
  coarsePointer: "(pointer: coarse)",
  up: (bp: Breakpoint) => `(min-width: ${BREAKPOINTS[bp] / 16}rem)`,
  down: (bp: Breakpoint) => `(max-width: ${(BREAKPOINTS[bp] - 0.02) / 16}rem)`,
} as const;
