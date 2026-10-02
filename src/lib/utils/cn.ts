import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "heading-xl",
        "heading-lg",
        "heading-md",
        "heading-sm",
        "lead",
        "body",
        "small",
        "caption",
        "label",
      ],
      font: ["display"],
      spacing: ["gutter", "section", "nav"],
      container: ["prose", "content", "wide"],
      shadow: ["hairline", "raised", "floating"],
      ease: ["standard"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
