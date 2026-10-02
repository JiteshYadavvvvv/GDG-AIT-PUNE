"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { Color, MathUtils, Object3D, Vector3, type InstancedMesh } from "three";

import { brandHex } from "@/config/brand";
import { glossy } from "@/lib/three/materials";

import type { NetworkFrame } from "./developer-network";
import { bundleAmount, type Lane } from "./layout";

interface CommitsProps {
  lanes: Lane[];
  frame: RefObject<NetworkFrame>;
}

const dummy = new Object3D();
const position = new Vector3();

export function Commits({ lanes, frame }: CommitsProps) {
  const nodes = useRef<InstancedMesh>(null);
  const rings = useRef<InstancedMesh>(null);
  const hover = useRef<number[]>([]);

  const commits = useMemo(
    () =>
      lanes.flatMap((lane) =>
        lane.commits.map((u) => ({
          color: new Color(brandHex[lane.accent]),
          spread: lane.spread.getPointAt(u),
          bundled: lane.bundled.getPointAt(u),
        })),
      ),
    [lanes],
  );

  useLayoutEffect(() => {
    const mesh = rings.current;
    if (!mesh) return;
    commits.forEach((commit, i) => mesh.setColorAt(i, commit.color));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [commits]);

  useFrame((_, delta) => {
    if (!nodes.current || !rings.current) return;
    const current = frame.current;
    const amount = bundleAmount(current.merge);

    commits.forEach((commit, i) => {
      position.lerpVectors(commit.spread, commit.bundled, amount);
      position.y += Math.sin(current.time * 0.9 + i * 1.3) * 0.03 * current.activity;

      const distance = Math.hypot(position.x - current.pointer.x, position.y - current.pointer.y);
      const proximity = (1 - MathUtils.smoothstep(distance, 0.25, 1.4)) * current.pointerStrength;
      const h = MathUtils.damp(hover.current[i] ?? 0, proximity, 6, delta);
      hover.current[i] = h;

      position.x += (current.pointer.x - position.x) * 0.14 * h;
      position.y += (current.pointer.y - position.y) * 0.14 * h;
      position.z += 0.35 * h;

      const size = 1 - amount * 0.4;

      dummy.position.copy(position);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(size * (1 + h * 0.6));
      dummy.updateMatrix();
      nodes.current!.setMatrixAt(i, dummy.matrix);

      dummy.rotation.set(h * 1.1 + Math.sin(current.time * 0.6 + i) * 0.15 * current.activity, 0, 0);
      dummy.scale.setScalar(size * (1 + h * 0.9));
      dummy.updateMatrix();
      rings.current!.setMatrixAt(i, dummy.matrix);
    });

    nodes.current.instanceMatrix.needsUpdate = true;
    rings.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={nodes} args={[undefined, undefined, commits.length]} frustumCulled={false}>
        <sphereGeometry args={[0.085, 24, 24]} />
        <meshPhysicalMaterial color="#ffffff" {...glossy} />
      </instancedMesh>
      <instancedMesh ref={rings} args={[undefined, undefined, commits.length]} frustumCulled={false}>
        <torusGeometry args={[0.15, 0.02, 12, 48]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </instancedMesh>
    </>
  );
}
