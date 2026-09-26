"use client";

import { lazy, useEffect, useRef, useState, type ReactNode } from "react";

import type { NetworkInput } from "@/components/three/developer-network/developer-network";
import { LazyScene } from "@/components/three/lazy-scene";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils/cn";
import { MEDIA } from "@/lib/utils/media";

const DeveloperNetwork = lazy(() => import("@/components/three/developer-network/developer-network"));

// Length of the static drawing's entrance; the live scene waits for it to finish.
const DRAWING_MS = 1900;

// Without WebGL the drawing zooms instead: slide its hub to the centre, where the camera would end.
function offsetToCentre(svg: Element) {
  const hub = svg.querySelector("[data-hub]")?.getBoundingClientRect();
  if (!hub || hub.width === 0) return { x: 0, y: 0 };
  return {
    x: window.innerWidth / 2 - (hub.left + hub.width / 2),
    y: window.innerHeight / 2 - (hub.top + hub.height / 2),
  };
}

interface HeroStageProps {
  fallback: ReactNode;
  children: ReactNode;
}

export function HeroStage({ fallback, children }: HeroStageProps) {
  const section = useRef<HTMLElement>(null);
  const takeover = useRef<number | undefined>(undefined);
  const input = useRef<NetworkInput>({ scroll: 0, pointerX: 0, pointerY: 0, hasPointer: false, active: false });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      input.current.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      input.current.pointerY = -((event.clientY / window.innerHeight) * 2 - 1);
      input.current.hasPointer = true;
    }

    function handlePointerLeave() {
      input.current.hasPointer = false;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      window.clearTimeout(takeover.current);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOK, () => {
        const shown = "inset(0% 0% 0% 0%)";

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              onUpdate: (self) => {
                input.current.scroll = self.progress;
              },
            },
          })
          .fromTo("[data-hero-meta]", { clipPath: shown }, { clipPath: "inset(0% 0% 100% 0%)", yPercent: -80, duration: 0.25 }, 0)
          .to("[data-hero-line-inner]", { yPercent: -150, stagger: 0.08, duration: 0.36 }, 0.03)
          .to("[data-hero-line='1']", { xPercent: -6, duration: 0.5 }, 0)
          .to("[data-hero-line='2']", { xPercent: 4, duration: 0.5 }, 0)
          .fromTo("[data-hero-footer]", { clipPath: shown }, { clipPath: "inset(100% 0% 0% 0%)", y: 56, duration: 0.3 }, 0)
          .to("[data-hero-fallback] > svg", { scale: 2.3, x: (_, svg) => offsetToCentre(svg).x, y: (_, svg) => offsetToCentre(svg).y, duration: 1 }, 0)
          .to("[data-hero-wash]", { opacity: 1, duration: 1 }, 0)
          .set("[data-hero-identity]", { visibility: "visible" }, 0.62)
          .fromTo(
            "[data-hero-identity-line]",
            { yPercent: 110 },
            { yPercent: 0, stagger: 0.06, duration: 0.24, ease: "power2.out" },
            0.64,
          );

        return () => {
          input.current.scroll = 0;
        };
      });
    },
    { scope: section },
  );

  function handleSceneCreated() {
    const firstPaint = performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
    const reducedMotion = window.matchMedia(MEDIA.reducedMotion).matches;
    const wait = reducedMotion ? 0 : Math.max(0, firstPaint + DRAWING_MS - performance.now());

    takeover.current = window.setTimeout(() => {
      input.current.active = true;
      setIsLive(true);
    }, wait);
  }

  return (
    <section
      ref={section}
      aria-labelledby="hero-title"
      className="relative h-svh min-h-[34rem] cinematic:h-[200svh] max-lg:cinematic:h-[170svh]"
    >
      <div className="sticky top-0 h-svh min-h-[34rem] overflow-hidden">
        <div aria-hidden className="absolute inset-0 isolate">
          <div
            data-hero-wash
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,var(--color-white)_0%,transparent_58%)] opacity-0"
          />
          <div className={cn("absolute inset-0 transition-opacity duration-(--duration-slower) ease-out", isLive && "opacity-0")}>
            {fallback}
          </div>
          <LazyScene
            className={cn(
              "absolute inset-0 transition-opacity duration-(--duration-slower) ease-out",
              !isLive && "opacity-0",
            )}
            camera={{ fov: 40, position: [0, 0, 12.4], near: 0.1, far: 80 }}
            flat
            onCreated={handleSceneCreated}
          >
            <DeveloperNetwork input={input} />
          </LazyScene>
        </div>
        {children}
      </div>
    </section>
  );
}
