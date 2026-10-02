"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { Color, Object3D, Vector3, type InstancedMesh } from "three";

import { brandHex } from "@/config/brand";

import type { NetworkFrame } from "./developer-network";
import { bundleAmount, type Lane } from "./layout";

interface PulsesProps {
  lanes: Lane[];
  frame: RefObject<NetworkFrame>;
  perLane: number;
}

const SPEED = 0.05;
const dummy = new Object3D();
const spread = new Vector3();
const bundled = new Vector3();
const color = new Color();

export function Pulses({ lanes, frame, perLane }: PulsesProps) {
  const mesh = useRef<InstancedMesh>(null);
  const count = lanes.length * perLane;

  useLayoutEffect(() => {
    if (!mesh.current) return;
    for (let i = 0; i < count; i++) {
      mesh.current.setColorAt(i, color.set(brandHex[lanes[i % lanes.length]!.accent]));
    }
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [lanes, count]);

  useFrame(() => {
    if (!mesh.current) return;
    const current = frame.current;
    const amount = bundleAmount(current.merge);

    for (let i = 0; i < count; i++) {
      const laneIndex = i % lanes.length;
      const lane = lanes[laneIndex]!;
      const slot = Math.floor(i / lanes.length);
      const travel = (current.time * SPEED + slot / perLane + laneIndex * 0.21) % 1;
      const start = (lane.commits[0] ?? 0.4) - 0.06;
      const u = start + travel * (1 - start);

      lane.spread.getPointAt(u, spread);
      lane.bundled.getPointAt(u, bundled);
      dummy.position.lerpVectors(spread, bundled, amount);
      dummy.scale.setScalar(Math.sin(travel * Math.PI) * current.activity);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}
