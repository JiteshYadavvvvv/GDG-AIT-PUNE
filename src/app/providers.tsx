"use client";

import type { ReactNode } from "react";

import { MotionProvider } from "@/components/motion/motion-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </MotionProvider>
  );
}
