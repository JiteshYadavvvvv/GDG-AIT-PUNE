"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { LineCurve3, TubeGeometry, Vector3, type Mesh } from "three";

import { brandHex, inkHex } from "@/config/brand";
import { glossy } from "@/lib/three/materials";

import type { NetworkFrame } from "./developer-network";
import { bundleAmount, type Lane, type NetworkLayout } from "./layout";

const SEGMENTS = 140;
const RADIAL_SEGMENTS = 16;
const RADIUS = 0.045;

interface LanesProps {
  lanes: Lane[];
  layout: NetworkLayout;
  frame: RefObject<NetworkFrame>;
}

export function Lanes({ lanes, layout, frame }: LanesProps) {
  return (
    <>
      {lanes.map((lane) => (
        <LaneTube key={lane.accent} lane={lane} frame={frame} />
      ))}
      <MainLine layout={layout} />
    </>
  );
}

function LaneTube({ lane, frame }: { lane: Lane; frame: RefObject<NetworkFrame> }) {
  const mesh = useRef<Mesh>(null);

  // The bundled shape is a morph target, so scrolling only changes one uniform.
  const geometry = useMemo(() => {
    const tube = new TubeGeometry(lane.spread, SEGMENTS, RADIUS, RADIAL_SEGMENTS);
    const bundled = new TubeGeometry(lane.bundled, SEGMENTS, RADIUS, RADIAL_SEGMENTS);
    tube.morphAttributes.position = [bundled.getAttribute("position")];
    tube.morphAttributes.normal = [bundled.getAttribute("normal")];
    return tube;
  }, [lane]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    const influences = mesh.current?.morphTargetInfluences;
    if (influences) influences[0] = bundleAmount(frame.current.merge);
  });

  return (
    <mesh ref={mesh} geometry={geometry} morphTargetInfluences={[0]}>
      <meshPhysicalMaterial color={brandHex[lane.accent]} {...glossy} />
    </mesh>
  );
}

function MainLine({ layout }: { layout: NetworkLayout }) {
  const geometry = useMemo(() => {
    const path = new LineCurve3(new Vector3(...layout.merge), new Vector3(...layout.mainLineEnd));
    return new TubeGeometry(path, 8, RADIUS, RADIAL_SEGMENTS);
  }, [layout]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial color={inkHex} {...glossy} />
    </mesh>
  );
}
