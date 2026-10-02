"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/animations/gsap";
import { MEDIA } from "@/lib/utils/media";

interface PanelStageProps {
  panels: [ReactNode, ReactNode, ReactNode];
}


const STAGE_CLASSES = ["lg:h-screen", "lg:overflow-x-hidden"];
const PANEL_CLASSES = ["lg:absolute", "lg:inset-0", "lg:overflow-y-auto", "lg:pt-nav"];

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
