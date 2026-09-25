"use client";

import { Float, Line, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Group } from "three";

import { StudioLighting } from "@/components/three/studio-lighting";
import { brandHex, inkHex } from "@/config/brand";
import { glossy } from "@/lib/three/materials";

type Vec3 = [number, number, number];

const NODES: { position: Vec3; color: string; shape: "sphere" | "box" }[] = [
  { position: [-1.9, 0.35, 0], color: brandHex.blue, shape: "sphere" },
  { position: [-0.75, 1.15, -0.6], color: "#ffffff", shape: "box" },
  { position: [-0.45, -0.6, 0.5], color: brandHex.red, shape: "box" },
  { position: [0.75, 0.45, 0.2], color: "#ffffff", shape: "sphere" },
  { position: [1.95, -0.25, -0.4], color: brandHex.yellow, shape: "sphere" },
  { position: [0.9, -1.05, 0.8], color: "#ffffff", shape: "sphere" },
  { position: [1.45, 1.2, -0.9], color: brandHex.green, shape: "box" },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 6],
  [4, 5],
  [2, 5],
  [4, 6],
];

export default function NetworkSample() {
  const group = useRef<Group>(null);
  const spin = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    spin.current += delta * 0.12;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, spin.current + state.pointer.x * 0.5, 3, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.25, 3, delta);
  });

  return (
    <>
      <StudioLighting floor={-1.8} />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <group ref={group}>
          {EDGES.map(([from, to]) => (
            <Line
              key={`${from}-${to}`}
              points={[NODES[from]!.position, NODES[to]!.position]}
              color={inkHex}
              lineWidth={1}
              transparent
              opacity={0.28}
            />
          ))}
          {NODES.map((node) =>
            node.shape === "box" ? (
              <RoundedBox key={node.position.join()} args={[0.46, 0.46, 0.46]} radius={0.1} position={node.position}>
                <meshPhysicalMaterial color={node.color} {...glossy} />
              </RoundedBox>
            ) : (
              <mesh key={node.position.join()} position={node.position}>
                <sphereGeometry args={[0.27, 48, 48]} />
                <meshPhysicalMaterial color={node.color} {...glossy} />
              </mesh>
            ),
          )}
        </group>
      </Float>
    </>
  );
}
