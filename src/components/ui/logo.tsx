import { cn } from "@/lib/utils/cn";

import { GdgMark } from "./gdg-mark";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <GdgMark className="h-[1.375rem] w-auto shrink-0" />
      <span className="text-body font-medium tracking-tight whitespace-nowrap">
        GDG <span className="text-fg-muted">AIT Pune</span>
      </span>
    </span>
  );
}
