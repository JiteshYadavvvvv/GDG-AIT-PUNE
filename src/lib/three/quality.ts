import { MEDIA } from "@/lib/utils/media";

export type QualityTier = "low" | "medium" | "high";

export interface QualityProfile {
  tier: QualityTier;
  dpr: [number, number];
  antialias: boolean;
  /** Multiplier for particle / instance counts. */
  density: number;
}

export const QUALITY_PROFILES: Record<QualityTier, QualityProfile> = {
  low: { tier: "low", dpr: [1, 1], antialias: false, density: 0.35 },
  medium: { tier: "medium", dpr: [1, 1.5], antialias: true, density: 0.65 },
  high: { tier: "high", dpr: [1, 2], antialias: true, density: 1 },
};

// Rough starting point; PerformanceMonitor adjusts DPR at runtime.
export function detectQualityTier(): QualityTier {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory ?? 4;

  if (nav.connection?.saveData || cores <= 2 || memory <= 2) return "low";
  if (window.matchMedia(MEDIA.coarsePointer).matches || cores <= 4 || memory <= 4) {
    return "medium";
  }
  return "high";
}
