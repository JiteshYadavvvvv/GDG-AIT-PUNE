"use client";

import { useRef, type ReactNode } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/animations/gsap";
import { DURATION } from "@/lib/animations/tokens";
import { MEDIA } from "@/lib/utils/media";

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealText({ children, className, delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOK, () => {
        let split: SplitText | undefined;

        const createSplit = () => {
          split?.revert();
          split = SplitText.create(ref.current, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              gsap.set(ref.current, { visibility: "visible" });
              return gsap.from(self.lines, {
                yPercent: 110,
                rotate: 2,
                duration: DURATION.slower,
                stagger: 0.08,
                delay,
                scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
                onComplete() {
                  self.lines.forEach((line) => {
                    const mask = line.parentElement;
                    if (mask) mask.style.overflow = "visible";
                  });
                },
              });
            },
          });
        };

        const cs = ref.current ? getComputedStyle(ref.current) : null;
        const fontLoad = cs
          ? document.fonts.load(`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`).catch(() => {})
          : Promise.resolve();

        Promise.all([fontLoad, document.fonts.ready]).then(createSplit);

        return () => split?.revert();
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-reveal="text" className={className}>
      {children}
    </div>
  );
}
