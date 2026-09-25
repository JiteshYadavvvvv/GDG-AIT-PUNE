"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import { MathUtils, Plane, Vector2, Vector3, type Group, type PerspectiveCamera } from "three";

import { useSceneQuality } from "@/components/three/scene-canvas";
import { StudioLighting } from "@/components/three/studio-lighting";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

import { Commits } from "./commits";
import { Hub } from "./hub";
import { Lanes } from "./lanes";
import { bundleAmount, buildLanes, cameraFor, layoutFor } from "./layout";
import { Pulses } from "./pulses";

export interface NetworkInput {
  /** Scroll progress through the hero, 0–1. */
  scroll: number;
  /** Mouse position in the viewport, -1 to 1. */
  pointerX: number;
  pointerY: number;
  hasPointer: boolean;
  /** Set once the live scene has replaced the static drawing. */
  active: boolean;
}

export interface NetworkFrame {
  merge: number;
  pointer: Vector3;
  pointerX: number;
  pointerY: number;
  pointerStrength: number;
  activity: number;
  time: number;
}

const ground = new Plane(new Vector3(0, 0, 1), 0);
const ndc = new Vector2();
const cameraTarget = new Vector3();
const lookTarget = new Vector3();

export default function DeveloperNetwork({ input }: { input: RefObject<NetworkInput> }) {
  const aspect = useThree((state) => state.size.width / state.size.height);
  const layout = layoutFor(aspect);
  const lanes = useMemo(() => buildLanes(layout), [layout]);
  const quality = useSceneQuality();
  const reducedMotion = usePrefersReducedMotion();
  const tilt = useRef<Group>(null);
  const frame = useRef<NetworkFrame>({
    merge: 0,
    pointer: new Vector3(99, 99, 0),
    pointerX: 0,
    pointerY: 0,
    pointerStrength: 0,
    activity: 0,
    time: 0,
  });

  // Runs before the layers so they all read the same values this frame.
  useFrame((state, delta) => {
    const current = frame.current;
    const { scroll, pointerX, pointerY, hasPointer, active } = input.current;
    const camera = state.camera as PerspectiveCamera;
    const followPointer = hasPointer && !reducedMotion;

    if (!reducedMotion) current.time += delta;
    current.merge = MathUtils.damp(current.merge, scroll, 5, delta);
    // Reduced motion renders on demand, so nothing can ease in: show everything at once.
    current.activity = reducedMotion ? 1 : MathUtils.damp(current.activity, active ? 1 : 0, 2, delta);
    current.pointerStrength = MathUtils.damp(current.pointerStrength, followPointer ? 1 : 0, 3, delta);
    current.pointerX = MathUtils.damp(current.pointerX, pointerX, 4, delta);
    current.pointerY = MathUtils.damp(current.pointerY, pointerY, 4, delta);

    const { fov, distance } = cameraFor(layout, state.size.width / state.size.height);
    const push = bundleAmount(current.merge);
    const parallax = current.pointerStrength * (1 - push * 0.6);
    const [mx, my, mz] = layout.merge;
    const [ex, ey, ez] = layout.cameraEnd;

    cameraTarget.set(
      MathUtils.lerp(0, mx + ex, push) + current.pointerX * 0.35 * parallax,
      MathUtils.lerp(0, my + ey, push) + current.pointerY * 0.2 * parallax,
      MathUtils.lerp(distance, mz + ez, push),
    );
    camera.position.copy(cameraTarget);
    camera.lookAt(lookTarget.set(mx * push, my * push, mz * push));
    if (camera.fov !== fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }

    ndc.set(current.pointerX, current.pointerY);
    state.raycaster.setFromCamera(ndc, camera);
    state.raycaster.ray.intersectPlane(ground, current.pointer);

    if (tilt.current) {
      const sway = Math.sin(current.time * 0.12) * 0.03;
      tilt.current.rotation.y = MathUtils.damp(tilt.current.rotation.y, current.pointerX * 0.06 * current.pointerStrength + sway, 3, delta);
      tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, -current.pointerY * 0.04 * current.pointerStrength, 3, delta);
    }
  }, -1);

  return (
    <>
      <StudioLighting shadow={false} />
      <group ref={tilt}>
        <Lanes lanes={lanes} layout={layout} frame={frame} />
        <Commits lanes={lanes} frame={frame} />
        {!reducedMotion && (
          <Pulses lanes={lanes} frame={frame} perLane={quality.tier === "high" ? 2 : 1} />
        )}
        <Hub lanes={lanes} layout={layout} frame={frame} />
      </group>
    </>
  );
}
