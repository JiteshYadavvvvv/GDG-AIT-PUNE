import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge only knows Tailwind's default scale. Without this, custom
// tokens are misclassified — e.g. `text-display` is read as a text *colour*
// and silently dropped by cn("text-display", "text-fg").
// Keep in sync with src/styles/theme.css.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "heading-xl",
        "heading-lg",
        "heading-md",
        "heading-sm",
        "body",
        "small",
        "caption",
        "label",
      ],
      font: ["display"],
      spacing: ["gutter", "section"],
      container: ["prose", "content", "wide"],
      shadow: ["raised", "overlay", "glow-blue", "glow-red", "glow-yellow", "glow-green"],
      ease: ["standard"],
    },
  },
});

/** Compose class names; later Tailwind classes win over conflicting earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
