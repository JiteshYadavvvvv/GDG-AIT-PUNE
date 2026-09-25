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
      className="group inline-flex items-center gap-2 font-mono text-label text-fg-muted transition-colors hover:text-ink"
    >
      <span className="link-underline">Back to top</span>
      <ArrowUp
        aria-hidden
        className="size-3.5 transition-transform duration-(--duration-base) ease-out group-hover:-translate-y-0.5"
      />
    </button>
  );
}
