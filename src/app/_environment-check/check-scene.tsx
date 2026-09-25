"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { REVISION, type Mesh } from "three";

import { useSceneQuality } from "@/components/three/scene-canvas";

export default function CheckScene({ onReady }: { onReady: (detail: string) => void }) {
  const mesh = useRef<Mesh>(null);
  const quality = useSceneQuality();

  useEffect(() => {
    onReady(`r${REVISION} · quality tier: ${quality.tier}`);
  }, [onReady, quality.tier]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.3;
    mesh.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.4, 0]} />
      <meshNormalMaterial wireframe />
    </mesh>
  );
}
