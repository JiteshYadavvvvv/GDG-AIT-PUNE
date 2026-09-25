"use client";

import type { RootState } from "@react-three/fiber";
import { AnimatePresence, m } from "motion/react";
import { lazy, version as reactVersion, useCallback, useRef, useState } from "react";

import { useLenis } from "@/components/motion/smooth-scroll";
import { LazyScene } from "@/components/three/lazy-scene";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { SPRING } from "@/lib/animations/tokens";
import { cn } from "@/lib/utils/cn";

const CheckScene = lazy(() => import("./check-scene"));

type Status = "pending" | "ok";
type Check = { status: Status; detail: string };
type RuntimeCheck = "tailwind" | "gsap" | "scrolltrigger" | "motion" | "three" | "r3f";

const PENDING: Check = { status: "pending", detail: "waiting…" };

const STATUS_DOT: Record<Status, string> = {
  ok: "bg-gdg-green",
  pending: "bg-gdg-yellow",
};

export function EnvironmentCheck({ nextVersion }: { nextVersion: string }) {
  const scope = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [runtime, setRuntime] = useState<Record<RuntimeCheck, Check>>({
    tailwind: PENDING,
    gsap: PENDING,
    scrolltrigger: { status: "pending", detail: "scroll down to trigger" },
    motion: PENDING,
    three: PENDING,
    r3f: PENDING,
  });

  const report = useCallback((id: RuntimeCheck, detail: string) => {
    setRuntime((prev) =>
      prev[id].status === "ok" ? prev : { ...prev, [id]: { status: "ok", detail } },
    );
  }, []);

  useGSAP(
    () => {
      const swatch = scope.current?.querySelector<HTMLElement>("[data-tailwind-probe]");
      if (swatch && getComputedStyle(swatch).backgroundColor === "rgb(66, 133, 244)") {
        report("tailwind", "theme tokens resolve (bg-gdg-blue)");
      }

      gsap.from("[data-gsap-probe]", {
        rotate: -180,
        scale: 0.4,
        duration: 0.8,
        onComplete: () => report("gsap", `v${gsap.version} · tween completed`),
      });

      gsap.fromTo(
        "[data-scroll-probe]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-scroll-track]",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => report("scrolltrigger", `scrubbing · progress ${self.progress.toFixed(2)}`),
          },
        },
      );
    },
    { scope },
  );

  const handleCreated = useCallback(
    (state: RootState) => {
      report("r3f", `${state.gl.capabilities.isWebGL2 ? "WebGL2" : "WebGL1"} · dpr ${state.viewport.dpr}`);
    },
    [report],
  );

  const handleSceneReady = useCallback((detail: string) => report("three", detail), [report]);

  const rows: [string, Check][] = [
    ["Next.js", { status: "ok", detail: `v${nextVersion} · App Router` }],
    ["React", { status: "ok", detail: `v${reactVersion}` }],
    ["TypeScript", { status: "ok", detail: "strict · compiled" }],
    ["Tailwind CSS", runtime.tailwind],
    ["GSAP", runtime.gsap],
    ["ScrollTrigger", runtime.scrolltrigger],
    ["Motion", runtime.motion],
    [
      "Lenis",
      lenis
        ? {
            status: "ok",
            detail: lenis.prefersReducedMotion ? "active · reduced motion (1:1)" : "active · smooth",
          }
        : PENDING,
    ],
    ["Three.js", runtime.three],
    ["React Three Fiber", runtime.r3f],
  ];

  return (
    <main ref={scope} className="mx-auto max-w-content px-gutter py-16">
      <p className="font-mono text-label text-fg-subtle uppercase">Stage 0 · environment check</p>
      <h1 className="mt-4 text-heading-lg">GDG AIT Pune — foundation</h1>
      <p className="mt-4 max-w-prose text-fg-muted">
        Temporary diagnostics page. It is replaced by the real homepage in Stage 1.
      </p>

      <ul className="mt-12 divide-y divide-line border-y border-line">
        {rows.map(([name, { status, detail }]) => (
          <li
            key={name}
            data-check={name}
            data-status={status}
            className="flex items-center gap-4 py-3"
          >
            <span className={cn("size-2 shrink-0 rounded-full", STATUS_DOT[status])} />
            <span className="w-44 shrink-0 text-small">{name}</span>
            <span className="font-mono text-caption text-fg-muted">{detail}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-gutter md:grid-cols-3">
        <div className="flex h-56 items-center justify-center gap-6 rounded-lg border border-line bg-surface">
          <div data-gsap-probe className="size-12 rounded-md bg-gdg-red" />
          <div data-tailwind-probe className="size-12 rounded-md bg-gdg-blue" />
        </div>

        <div className="flex h-56 flex-col items-center justify-center gap-4 rounded-lg border border-line bg-surface">
          <m.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING.snappy}
            onAnimationComplete={() => report("motion", "LazyMotion features loaded · presence ready")}
            onClick={() => setOpen((value) => !value)}
            className="rounded-full bg-gdg-yellow px-5 py-2 text-small font-medium text-on-accent"
          >
            Toggle presence
          </m.button>
          <AnimatePresence>
            {open && (
              <m.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="font-mono text-caption text-fg-muted"
              >
                AnimatePresence ✓
              </m.span>
            )}
          </AnimatePresence>
        </div>

        <LazyScene
          className="h-56 overflow-hidden rounded-lg border border-line bg-surface"
          camera={{ position: [0, 0, 4] }}
          onCreated={handleCreated}
          fallback={
            <p className="grid h-full place-items-center font-mono text-caption text-fg-subtle">
              loading WebGL…
            </p>
          }
        >
          <CheckScene onReady={handleSceneReady} />
        </LazyScene>
      </div>

      <div data-scroll-track className="mt-24 h-[150vh]">
        <div className="sticky top-1/2 h-1 origin-left rounded-full bg-line">
          <div data-scroll-probe className="h-full origin-left rounded-full bg-gdg-green" />
        </div>
      </div>
    </main>
  );
}
