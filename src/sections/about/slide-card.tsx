import { RevealFade } from "@/components/motion/reveal-fade";
import { accentVars, type Accent } from "@/config/brand";
import { cn } from "@/lib/utils/cn";

interface SlideCardProps {
  accent: Accent;
  badge: string;
  heading: string;
  statement: string;
  className?: string;
}

// A self-contained "slide": a hard-edged card with a flat offset colour panel behind it,
// closer to a presentation title card than a normal flowing section. The card is ONE rigid
// object — badge/heading/statement/tag are static content that travels with it, not
// independent animations of their own. Its own motion is a light secondary touch: the primary
// entrance (the whole panel sliding in) is driven by the pinned PanelStage that wraps it.
export function SlideCard({ accent, badge, heading, statement, className }: SlideCardProps) {
  return (
    <RevealFade className={cn("relative mx-auto w-full max-w-4xl", className)}>
      <div style={accentVars(accent)}>
        <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 bg-(--accent)" />

        <div className="relative border-2 border-ink bg-surface px-6 py-14 text-center sm:px-16 sm:py-20 lg:px-20 lg:py-24">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-2 border-2 border-ink bg-(--accent) px-5 py-2 font-mono text-label font-bold tracking-wide text-ink uppercase">
            {badge}
          </span>

          <span className="mt-4 block text-heading-xl" style={{ fontSize: "clamp(3.25rem, 1.75rem + 7vw, 9.5rem)" }}>
            {heading}
          </span>

          <p className="mx-auto mt-8 max-w-[50ch] text-heading-sm text-fg-muted">{statement}</p>

          <span className="mt-12 inline-flex items-center gap-2 border border-line-strong px-4 py-1.5 font-mono text-label text-fg-subtle">
            GDG · AIT Pune
          </span>
        </div>
      </div>
    </RevealFade>
  );
}
