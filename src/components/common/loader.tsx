"use client";

import { useRef, useState } from "react";

import { useLenis } from "@/components/motion/smooth-scroll";
import { hero } from "@/data/hero";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { DURATION, EASE } from "@/lib/animations/tokens";
import { cn } from "@/lib/utils/cn";

const GDG_LETTER_COLORS = ["text-red", "text-blue", "text-green"];

const WORDMARK_SIZE = { fontSize: "clamp(2.75rem, 1.25rem + 7.5vw, 6.5rem)" };

export function Loader() {
  const [isDone, setIsDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const lenis = useLenis();

  useGSAP(
    () => {
      lenis?.stop();

      const finish = () => {
        gsap.to(ref.current, {
          opacity: 0,
          duration: DURATION.slow,
          ease: EASE.out.gsap,
          onComplete: () => {
            setIsDone(true);
            lenis?.start();
          },
        });
      };

      if (reducedMotion) {
        gsap.delayedCall(0.3, finish);
        return;
      }

      gsap.set(".loader-letter", { opacity: 0, y: 36, scale: 0.65 });
      gsap.set(".loader-tag", { opacity: 0 });
      gsap.set(".loader-bar", { opacity: 0, scaleX: 0 });

      gsap
        .timeline({ onComplete: finish })
        .to(".loader-letter", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: DURATION.slow,
          ease: "back.out(1.8)",
          stagger: 0.07,
        })
        .to(".loader-tag", { opacity: 1, duration: DURATION.base }, "-=0.35")
        .to(".loader-bar", { opacity: 1, scaleX: 1, duration: DURATION.slower, ease: EASE.standard.gsap }, "<")
        .to({}, { duration: 0.35 });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  if (isDone) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-dots bg-canvas fixed inset-0 z-(--z-loader) flex flex-col items-center justify-center gap-7"
    >
      <div className="flex flex-col items-center text-center">
        <p className="flex font-black uppercase leading-[0.9]" style={WORDMARK_SIZE}>
          {[...hero.headline[0]!].map((letter, i) => (
            <span key={i} className={cn("loader-letter", GDG_LETTER_COLORS[i % GDG_LETTER_COLORS.length])}>
              {letter}
            </span>
          ))}
        </p>
        <p className="loader-letter text-ink font-black uppercase leading-[0.9]" style={WORDMARK_SIZE}>
          {hero.headline[1]}
        </p>
      </div>

      <p className="loader-tag font-mono text-label text-fg-muted tracking-[0.3em] uppercase">Loading experience</p>

      <div className="loader-bar bg-spectrum h-1 w-40 origin-left rounded-full sm:w-56" />
    </div>
  );
}
