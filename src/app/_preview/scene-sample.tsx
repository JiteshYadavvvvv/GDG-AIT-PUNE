"use client";

import { lazy } from "react";

import { LazyScene } from "@/components/three/lazy-scene";

const NetworkSample = lazy(() => import("./network-sample"));

export function SceneSample() {
  return (
    <div data-cursor="interactive" data-cursor-label="Move" className="overflow-hidden rounded-lg bg-surface shadow-raised">
      <LazyScene
        className="aspect-[4/3] md:aspect-[16/9]"
        camera={{ position: [0, 0.3, 6.4], fov: 35 }}
        fallback={<div className="bg-dots h-full" />}
      >
        <NetworkSample />
      </LazyScene>
    </div>
  );
}
