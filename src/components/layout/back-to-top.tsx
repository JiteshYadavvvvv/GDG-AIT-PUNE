"use client";

import { ArrowUp } from "lucide-react";

import { SCROLL_TO_OPTIONS, useLenis } from "@/components/motion/smooth-scroll";

export function BackToTop() {
  const lenis = useLenis();

  function handleClick() {
    if (lenis) lenis.scrollTo(0, SCROLL_TO_OPTIONS);
    else window.scrollTo({ top: 0 });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex items-center gap-2.5 rounded-full border-2 border-white/20 bg-white py-2.5 pr-3.5 pl-5 font-mono text-label font-semibold tracking-wide text-ink uppercase transition-transform duration-(--duration-base) ease-out active:scale-[0.97]"
    >
      Back to top
      <ArrowUp
        aria-hidden
        className="size-3.5 transition-transform duration-(--duration-base) ease-out group-hover:-translate-y-0.5"
      />
    </button>
  );
}
