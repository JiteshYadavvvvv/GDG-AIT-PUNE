import { cn } from "@/lib/utils/cn";

import { GdgMark } from "./gdg-mark";

export function Logo({ className }: { className?: string }) {
  return <GdgMark className={cn("h-7 w-auto shrink-0", className)} />;
}
