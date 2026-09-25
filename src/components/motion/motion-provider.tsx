"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { DURATION, EASE } from "@/lib/animations/tokens";

const loadFeatures = () =>
  import("@/lib/animations/motion-features").then((mod) => mod.default);

/**
 * Motion defaults for the whole app.
 *
 * - `reducedMotion="user"`: transform/layout animations are skipped when the
 *   OS asks for reduced motion; opacity/colour still animate.
 * - `LazyMotion strict`: components must use `m.div` (not `motion.div`) so the
 *   animation engine is code-split. ESLint blocks importing `motion`.
 *
 * Ownership: Motion handles component state (hover, presence, layout,
 * micro-interactions). Scroll choreography belongs to GSAP — never animate
 * the same property of the same element with both.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.base, ease: EASE.out.bezier }}
    >
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
