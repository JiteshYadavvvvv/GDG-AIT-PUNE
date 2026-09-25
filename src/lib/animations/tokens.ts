/**
 * Shared motion vocabulary for GSAP, Motion and CSS so choreography feels
 * like one system. Mirrors the --ease-* / --duration-* tokens in
 * src/styles/theme.css — keep both in sync.
 */

type Bezier = [number, number, number, number];

interface Ease {
  /** For Motion `transition.ease`. */
  bezier: Bezier;
  /** Equivalent GSAP named ease. */
  gsap: string;
}

export const EASE = {
  /** House curve: fast start, long settle. Entrances and large moves. */
  out: { bezier: [0.16, 1, 0.3, 1], gsap: "expo.out" },
  in: { bezier: [0.7, 0, 0.84, 0], gsap: "expo.in" },
  inOut: { bezier: [0.87, 0, 0.13, 1], gsap: "expo.inOut" },
  /** Gentler curve for small UI state changes (hover, toggles). */
  standard: { bezier: [0.25, 1, 0.5, 1], gsap: "power3.out" },
} as const satisfies Record<string, Ease>;

/** Seconds (GSAP and Motion both use seconds). */
export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  slower: 1.1,
} as const;

/** Motion spring presets, defined by perceived duration rather than physics. */
export const SPRING = {
  snappy: { type: "spring", visualDuration: 0.3, bounce: 0.15 },
  soft: { type: "spring", visualDuration: 0.6, bounce: 0.1 },
} as const;
