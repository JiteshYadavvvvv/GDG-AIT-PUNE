
export const EASE = {
  out: { bezier: [0.16, 1, 0.3, 1], gsap: "expo.out" },
  in: { bezier: [0.7, 0, 0.84, 0], gsap: "expo.in" },
  inOut: { bezier: [0.87, 0, 0.13, 1], gsap: "expo.inOut" },
  standard: { bezier: [0.25, 1, 0.5, 1], gsap: "power3.out" },
} as const;

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  slower: 1.1,
} as const;

export const SPRING = {
  snappy: { type: "spring", visualDuration: 0.3, bounce: 0.15 },
  soft: { type: "spring", visualDuration: 0.6, bounce: 0.1 },
} as const;

export const FOLLOW = {
  cursor: { stiffness: 700, damping: 50, mass: 0.5 },
  magnetic: { stiffness: 260, damping: 16, mass: 0.6 },
} as const;
