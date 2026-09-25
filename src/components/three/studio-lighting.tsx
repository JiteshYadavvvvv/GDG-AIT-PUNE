"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

import { inkHex } from "@/config/brand";

interface StudioLightingProps {
  /** Y position of the contact-shadow plane. */
  floor?: number;
  shadow?: boolean;
}

// Lightformers stand in for an HDR, so nothing is downloaded.
export function StudioLighting({ floor = -1.4, shadow = true }: StudioLightingProps) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 2]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
      </Environment>
      {shadow && (
        <ContactShadows position={[0, floor, 0]} opacity={0.32} scale={10} blur={2.6} far={4} color={inkHex} />
      )}
    </>
  );
}
