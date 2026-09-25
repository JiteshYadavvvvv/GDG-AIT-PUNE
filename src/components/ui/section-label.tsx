import type { ReactNode } from "react";

import { accentVars, type Accent } from "@/config/brand";
import { cn } from "@/lib/utils/cn";

interface SectionLabelProps {
  children: ReactNode;
  index?: string;
  accent?: Accent;
  className?: string;
}

export function SectionLabel({ children, index, accent = "blue", className }: SectionLabelProps) {
  return (
    <p className={cn("flex items-center gap-2.5 font-mono text-label text-fg-muted", className)}>
      <span aria-hidden className="size-1.5 shrink-0 bg-(--accent)" style={accentVars(accent)} />
      {index && <span className="text-fg-subtle">{index}</span>}
      <span>{children}</span>
    </p>
  );
}
