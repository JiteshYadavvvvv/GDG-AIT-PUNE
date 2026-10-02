"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { createContext, Suspense, useContext, useState } from "react";
import type { WebGLRendererParameters } from "three";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { detectQualityTier, QUALITY_PROFILES, type QualityProfile } from "@/lib/three/quality";

const QualityContext = createContext<QualityProfile>(QUALITY_PROFILES.medium);

export function useSceneQuality() {
  return useContext(QualityContext);
}

export interface SceneCanvasProps extends Omit<CanvasProps, "dpr" | "frameloop" | "gl"> {
  active?: boolean;
  animate?: boolean;
  gl?: Omit<WebGLRendererParameters, "canvas">;
}

export default function SceneCanvas({
  active = true,
  animate = true,
  gl,
  children,
  ...props
}: SceneCanvasProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [quality] = useState(() => QUALITY_PROFILES[detectQualityTier()]);
  const [dpr, setDpr] = useState(quality.dpr[1]);

  const frameloop = !active ? "never" : animate && !reducedMotion ? "always" : "demand";

  return (
    <Canvas
      dpr={dpr}
      frameloop={frameloop}
      gl={{ antialias: quality.antialias, powerPreference: "high-performance", ...gl }}
      {...props}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(quality.dpr[0])}
        onIncline={() => setDpr(quality.dpr[1])}
      />
      <QualityContext value={quality}>
        <Suspense fallback={null}>{children}</Suspense>
      </QualityContext>
    </Canvas>
  );
}
