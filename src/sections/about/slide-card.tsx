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

        {/* lg:py uses a dvh-based clamp, not a fixed value: on the pinned desktop stage the
            card has exactly one screen's height to work with, so on a short/constrained
            viewport (e.g. devtools docked at the bottom) padding needs to shrink before the
            badge or footer tag runs out of room — at 13dvh, the clamp only engages below
            ~740px of height and is a no-op (pinned at its 6rem max) at normal desktop sizes. */}
        <div className="relative border-2 border-ink bg-surface px-6 py-14 text-center sm:px-16 sm:py-20 lg:px-20 lg:py-[clamp(1.5rem,13dvh,6rem)]">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-2 border-2 border-ink bg-(--accent) px-5 py-2 font-mono text-label font-bold tracking-wide text-ink uppercase">
            {badge}
          </span>

          <span className="mt-4 block text-heading-xl">{heading}</span>

          <p className="mx-auto mt-8 max-w-[50ch] text-heading-sm text-fg-muted">{statement}</p>

          <span className="mt-12 inline-flex items-center gap-2 border border-line-strong px-4 py-1.5 font-mono text-label text-fg-subtle">
            GDG · AIT Pune
          </span>
        </div>
      </div>
    </RevealFade>
  );
}
