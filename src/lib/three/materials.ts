// Material rules for scenes on the light canvas: glossy coloured plastic, no metal.
export const glossy = {
  roughness: 0.28,
  metalness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0.18,
} as const;

// Use sparingly: only where seeing through the object means something.
export const glass = {
  roughness: 0.08,
  metalness: 0,
  transmission: 1,
  thickness: 0.6,
  ior: 1.4,
} as const;
