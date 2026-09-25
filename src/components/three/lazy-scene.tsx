"use client";

import type { RootState } from "@react-three/fiber";
import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import { Component, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import type { SceneCanvasProps } from "./scene-canvas";

const SceneCanvas = dynamic(() => import("./scene-canvas"), { ssr: false });

export interface LazySceneProps extends Omit<SceneCanvasProps, "active"> {
  className?: string;
  /** Static stand-in until WebGL is ready, or if it fails. */
  fallback?: ReactNode;
  /** Only if the scene carries meaning; otherwise it's aria-hidden. */
  label?: string;
}

/**
 * Loads three.js when the scene nears the viewport and pauses it offscreen.
 * Load the scene contents with React.lazy too, so three stays out of section bundles.
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

  function handleCreated(state: RootState) {
    setIsReady(true);
    onCreated?.(state);
  }

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

// Keeps a WebGL failure from taking the page down.
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
