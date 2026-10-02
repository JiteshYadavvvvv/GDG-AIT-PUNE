"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/animations/gsap";
import { MEDIA } from "@/lib/utils/media";

interface PanelStageProps {
  panels: [ReactNode, ReactNode, ReactNode];
}


// Only overflow-x needs hiding — it's what keeps the horizontally xPercent-translated
// off-stage panels from poking out sideways during the slide. overflow-y is deliberately
// left alone (not "hidden"): a blanket overflow-hidden here would also hard-clip any
// vertical overflow from a panel's own content (e.g. a badge/card sitting a few px past the
// stage's h-screen box), with no visible fallback. Per the CSS overflow spec, pairing
// overflow-x: hidden with no overflow-y declaration computes overflow-y to `auto`, so any
// vertical excess becomes a scrollbar instead of invisible clipping.
const STAGE_CLASSES = ["lg:h-screen", "lg:overflow-x-hidden"];
// The panel is just a viewport-sized, nav-offset slot — it does NOT center its content itself
// (that's each panel's own <Section fill> doing `lg:h-full lg:flex lg:justify-center-safe`
// internally). Centering at this level, one wrapper up from the section, would leave the
// section's own box short and vertically floating inside the panel instead of spanning it —
// which is what put the section's top-boundary seam line adrift in the middle of the screen
// instead of at the panel's actual top edge.
const PANEL_CLASSES = ["lg:absolute", "lg:inset-0", "lg:overflow-y-auto", "lg:pt-nav"];

// Once pinned, every panel sits at inset:0 — identical getBoundingClientRect() regardless of
// which one is actually showing. Anchor-link scrolling (smooth-scroll.tsx) can't tell panels
// apart from their rect alone, so it looks this id up via ScrollTrigger.getById() and computes
// the real target from the pin's own start/end instead.
export const PANEL_GROUP_ID = "about-panel-stage";


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
            id: PANEL_GROUP_ID,
            trigger: stage,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,

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
    <div ref={stageRef} className="relative bg-canvas" data-panel-group={PANEL_GROUP_ID} data-panel-count={panels.length}>
      {panels.map((panel, index) => (
        <div
          key={index}
          data-panel-index={index}
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
