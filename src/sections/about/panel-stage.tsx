"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/animations/gsap";
import { MEDIA } from "@/lib/utils/media";

interface PanelStageProps {
  panels: [ReactNode, ReactNode, ReactNode];
}

// Real CSS classes (not JS-computed inline styles) for the static layout, so `100vh` stays a
// live unit that tracks viewport/resize correctly instead of whatever px value GSAP's .set()
// happened to compute at mount. Only applied via classList inside the matchMedia branch below —
// never as static className — so nothing here shows up unless JS actually confirmed desktop +
// motion-ok; a plain `lg:` class would apply even when the pin itself never activates.
const STAGE_CLASSES = ["lg:h-screen", "lg:overflow-hidden"];
const PANEL_CLASSES = [
  "lg:absolute",
  "lg:inset-0",
  "lg:flex",
  "lg:flex-col",
  "lg:justify-center",
  "lg:overflow-y-auto",
  "lg:pt-nav",
];

// Reproduces a pinned panel swap: as the user scrolls through this stage, each panel slides
// fully out while the next slides fully in, both visible mid-transition — like turning a page
// rather than a normal stack of sections. Desktop + motion-ok only; below that (or with
// reduced motion) the panels render in plain stacked document flow instead.
export function PanelStage({ panels }: PanelStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${MEDIA.up("lg")} and ${MEDIA.motionOK}`, () => {
        const [a, b, c] = panelRefs.current;
        const stage = stageRef.current;
        if (!a || !b || !c || !stage) return;

        stage.classList.add(...STAGE_CLASSES);
        for (const panel of [a, b, c]) panel.classList.add(...PANEL_CLASSES);
        gsap.set([b, c], { xPercent: 100 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Scrub follows scroll position directly, so stopping mid-drag leaves two panels
            // half-visible. Snap settles to whichever panel was closer once scrolling stops.
            snap: { snapTo: [0, 0.5, 1], duration: 0.4, ease: "power2.inOut" },
          },
        });

        timeline
          .to(a, { xPercent: -100, duration: 1, ease: "none" }, 0)
          .to(b, { xPercent: 0, duration: 1, ease: "none" }, 0)
          .to(b, { xPercent: -100, duration: 1, ease: "none" }, 1)
          .to(c, { xPercent: 0, duration: 1, ease: "none" }, 1);

        return () => {
          stage.classList.remove(...STAGE_CLASSES);
          for (const panel of [a, b, c]) panel.classList.remove(...PANEL_CLASSES);
          gsap.set([a, b, c], { clearProps: "transform" });
        };
      });
    },
    { scope: stageRef },
  );

  return (
    <div ref={stageRef} className="relative bg-canvas">
      {panels.map((panel, index) => (
        <div
          key={index}
          ref={(el) => {
            panelRefs.current[index] = el;
          }}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
