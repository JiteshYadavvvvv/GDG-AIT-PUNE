import type { ComponentProps } from "react";

import { accentVars, type Accent } from "@/config/brand";
import { cn } from "@/lib/utils/cn";

import { Container } from "./container";

interface SectionProps extends ComponentProps<"section"> {
  accent?: Accent;
  seam?: boolean;
  fill?: boolean;
}

export function Section({ accent = "blue", seam = true, fill = false, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative scroll-mt-nav py-section",
        fill && "lg:flex lg:h-full lg:flex-col lg:justify-center-safe",
        className,
      )}
      {...props}
    >
      {seam && <SectionSeam accent={accent} />}
      {children}
    </section>
  );
}

function SectionSeam({ accent }: { accent: Accent }) {
  return (
    <div aria-hidden className="absolute inset-x-0 top-0 border-t border-line">
      <Container className="relative">
        <span
          style={accentVars(accent)}
          className="absolute top-0 left-[calc(var(--spacing-gutter)/2)] size-[7px] -translate-x-1/2 -translate-y-1/2 bg-(--accent)"
        />
        <span className="absolute top-0 right-[calc(var(--spacing-gutter)/2)] size-[7px] translate-x-1/2 -translate-y-1/2 border border-line-strong bg-canvas" />
      </Container>
    </div>
  );
}
