"use client";

import type { RootState } from "@react-three/fiber";
import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import { Component, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import type { SceneCanvasProps } from "./scene-canvas";

const SceneCanvas = dynamic(() => import("./scene-canvas"), { ssr: false });

export interface LazySceneProps extends Omit<SceneCanvasProps, "active"> {
  /** Size the wrapper; the canvas fills it. */
  className?: string;
  /** Static stand-in shown until WebGL is ready, or if it is unavailable. */
  fallback?: ReactNode;
  /** Describe the scene if it carries meaning; otherwise it is aria-hidden. */
  label?: string;
}

/**
 * Entry point for all 3D.
 * - three / R3F are fetched only when the scene approaches the viewport.
 * - The render loop stops while the scene is offscreen.
 * - WebGL failure degrades to `fallback` instead of breaking the page.
 *
 * Lazy-load scene contents as well, so `three` stays out of section bundles:
 *
 *   const NetworkField = lazy(() => import("./network-field"));
 *   <LazyScene className="h-dvh" fallback={<Poster />}>
 *     <NetworkField />
 *   </LazyScene>
 */
export function LazyScene({
  className,
  fallback = null,
  label,
  onCreated,
  ...canvasProps
}: LazySceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isNear = useInView(ref, { once: true, margin: "50% 0px" });
  const isVisible = useInView(ref);
  const [isReady, setIsReady] = useState(false);

  const handleCreated = (state: RootState) => {
    setIsReady(true);
    onCreated?.(state);
  };

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {!isReady && <div className="absolute inset-0">{fallback}</div>}
      {isNear && (
        <SceneErrorBoundary onError={() => setIsReady(false)}>
          <SceneCanvas active={isVisible} onCreated={handleCreated} {...canvasProps} />
        </SceneErrorBoundary>
      )}
    </div>
  );
}

/** Contains WebGL/scene errors so the page keeps working; the fallback returns. */
class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch() {
    this.props.onError();
  }

  override render() {
    return this.state.failed ? null : this.props.children;
  }
}
