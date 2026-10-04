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

const SHAPES = [
  { className: "bg-red rounded-full", style: { top: "15%", left: "10%", width: 100, height: 100 } },
  { className: "bg-blue", style: { bottom: "20%", right: "10%", width: 120, height: 120 } },
  {
    className: "",
    style: {
      top: "30%",
      right: "5%",
      width: 0,
      height: 0,
      borderLeft: "70px solid transparent",
      borderRight: "70px solid transparent",
      borderBottom: "140px solid var(--color-green)",
    },
  },
  { className: "bg-yellow rounded-lg", style: { bottom: "5%", left: "25%", width: 150, height: 80 } },
  { className: "bg-blue rounded-full", style: { top: "50%", left: "5%", width: 80, height: 80 } },
];

export function Loader() {
  const [isDone, setIsDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const lenis = useLenis();

  useGSAP(
    () => {
      // Guards against React Strict Mode's double-invoke in dev: without this, two
      // competing timelines can end up killing each other's in-flight tweens on these
      // shared selectors, permanently stalling the sequence partway through.
      gsap.killTweensOf(".loader-letter, .loader-shape");

      lenis?.stop();

      const finish = () => {
        lenis?.start();
        gsap.set(ref.current, { pointerEvents: "none" });
        gsap.to(ref.current, {
          opacity: 0,
          duration: DURATION.slow,
          ease: EASE.out.gsap,
          onComplete: () => setIsDone(true),
        });
      };

      if (reducedMotion) {
        gsap.delayedCall(0.3, finish);
        return;
      }

      gsap.set(".loader-letter", { opacity: 0, y: 50, scale: 0.5 });
      gsap.set(".loader-shape", { opacity: 0, scale: 0 });

      gsap
        .timeline({ onComplete: finish })
        .to(".loader-letter", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
        })
        .to(
          ".loader-shape",
          { opacity: 0.2, scale: 1, duration: 1.5, ease: EASE.standard.gsap, stagger: 0.2 },
          "-=0.3",
        )
        .to({}, { duration: 2.3 });

      gsap.to(".loader-shape", {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        rotate: "random(0, 360)",
        repeat: -1,
        yoyo: true,
        duration: "random(8, 16)",
        ease: "sine.inOut",
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  if (isDone) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-canvas fixed inset-0 z-(--z-loader) flex items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        {SHAPES.map((shape, i) => (
          <div
            key={i}
            className={cn("loader-shape absolute", shape.className)}
            style={shape.style}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
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
    </div>
  );
}
