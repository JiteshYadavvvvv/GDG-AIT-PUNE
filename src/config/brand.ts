import type { CSSProperties } from "react";

export type Accent = "blue" | "red" | "yellow" | "green";

export const accents: Accent[] = ["blue", "red", "yellow", "green"];

export const brandHex: Record<Accent, string> = {
  blue: "#4285f4",
  red: "#ea4335",
  yellow: "#fbbc04",
  green: "#34a853",
};

export const inkHex = "#151411";
export const paperHex = "#faf9f6";
export const mutedHex = "#605d58";

export function accentVars(accent: Accent) {
  return {
    "--accent": `var(--color-${accent})`,
    "--accent-strong": `var(--color-${accent}-strong)`,
    "--accent-soft": `var(--color-${accent}-soft)`,
  } as CSSProperties;
}
