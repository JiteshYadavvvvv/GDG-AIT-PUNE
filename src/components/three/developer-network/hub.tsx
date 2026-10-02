"use client";

import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import { MathUtils, Vector3, type Group } from "three";

import { GdgMark } from "@/components/ui/gdg-mark";
import { accentVars } from "@/config/brand";
import { technologies } from "@/data/hero";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

import type { NetworkFrame } from "./developer-network";
import { bundleAmount, cameraFor, HUB_SIZE, type Lane, type NetworkLayout } from "./layout";

interface HubProps {
  lanes: Lane[];
  layout: NetworkLayout;
  frame: RefObject<NetworkFrame>;
}

export function Hub({ lanes, layout, frame }: HubProps) {
  const size = useThree((state) => state.size);
  const reducedMotion = usePrefersReducedMotion();
  const hub = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const anchors = useRef<(Group | null)[]>([]);

  const merge = useMemo(() => new Vector3(...layout.merge), [layout]);
  const unit = size.height / cameraFor(layout, size.width / size.height).visibleHeight;

  const labelPoints = useMemo(
    () =>
      layout.labels.map(({ lane, u }) => ({
        accent: lanes[lane]!.accent,
        spread: lanes[lane]!.spread.getPointAt(u),
        bundled: lanes[lane]!.bundled.getPointAt(u),
      })),
    [lanes, layout],
  );

  useFrame(({ camera }) => {
    const current = frame.current;
    if (hub.current) {
      const scale = layout.distance / camera.position.distanceTo(merge);
      hub.current.style.transform = `scale(${scale.toFixed(3)})`;
    }

    const amount = bundleAmount(current.merge);
    const visible = current.activity * (1 - MathUtils.smoothstep(current.merge, 0.04, 0.25));
    labelPoints.forEach((point, i) => {
      anchors.current[i]?.position.lerpVectors(point.spread, point.bundled, amount);
      const label = labels.current[i];
      if (label) {
        label.style.opacity = visible.toFixed(3);
        label.style.transform = `translateY(${((1 - visible) * 8).toFixed(1)}px)`;
      }
    });
  });

  return (
    <>
      <Html position={layout.merge} center zIndexRange={[4, 0]} pointerEvents="none">
        <div
          ref={hub}
          style={{ width: HUB_SIZE * unit }}
          className="grid aspect-square place-items-center rounded-full bg-surface shadow-floating"
        >
          <GdgMark label="Google Developer Groups" className="w-1/2" />
        </div>
      </Html>

      {labelPoints.map((point, i) => (
        <group
          key={`${point.accent}-${i}`}
          ref={(group) => {
            anchors.current[i] = group;
          }}
        >
          <Html position={[0, 0.36, 0]} center zIndexRange={[3, 0]} pointerEvents="none">
            <span
              ref={(label) => {
                labels.current[i] = label;
              }}
              style={{ ...accentVars(point.accent), opacity: reducedMotion ? 1 : 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 font-mono text-[0.6875rem] leading-none tracking-wide whitespace-nowrap text-ink shadow-raised"
            >
              <span aria-hidden className="size-1.5 rounded-full border-[1.5px] border-(--accent) bg-surface" />
              {technologies[i]}
            </span>
          </Html>
        </group>
      ))}
    </>
  );
}
