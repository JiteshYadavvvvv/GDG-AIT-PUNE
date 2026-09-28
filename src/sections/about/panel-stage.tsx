"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/animations/gsap";
import { MEDIA } from "@/lib/utils/media";

interface PanelStageProps {
  panels: [ReactNode, ReactNode, ReactNode];
}

// Reproduces a pinned panel swap: as the user scrolls through this stage, each panel slides
// fully out while the next slides fully in, both visible mid-transition — like turning a page
// rather than a normal stack of sections. Desktop + motion-ok only.
//
// The pinned/absolute layout is applied entirely in JS, inside the matchMedia branch, rather
// than via static `lg:` classes — a static breakpoint class would apply even when the pin
// itself never activates (e.g. desktop + reduced motion), stacking all three panels on top of
// each other with nothing to separate them. The CSS default is always plain block flow, which
// is what everything below lg (or with reduced motion) actually renders.
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

        gsap.set(stage, { height: "100vh", overflow: "hidden" });
        gsap.set([a, b, c], {
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflowY: "auto",
          paddingTop: "var(--spacing-nav)",
        });
        gsap.set([b, c], { xPercent: 100 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        timeline
          .to(a, { xPercent: -100, duration: 1, ease: "none" }, 0)
          .to(b, { xPercent: 0, duration: 1, ease: "none" }, 0)
          .to(b, { xPercent: -100, duration: 1, ease: "none" }, 1)
          .to(c, { xPercent: 0, duration: 1, ease: "none" }, 1);

        return () => {
          gsap.set(stage, { clearProps: "height,overflow" });
          gsap.set([a, b, c], { clearProps: "all" });
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
