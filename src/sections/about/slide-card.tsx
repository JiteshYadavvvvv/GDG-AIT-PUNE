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
        {/* Badge lives in normal document flow, above the card, pulled down over its border by
            a negative margin — not absolutely positioned with a negative transform. A flow
            element can never be clipped by an ancestor's overflow: it has no coordinate that
            depends on escaping its own box, so there's nothing for a clipping ancestor to cut
            off. The margin is half the badge's own rendered height (~41px: line-height ~15px +
            py-2.5 20px + border-[3px] 6px), so the border lands across its vertical center —
            the classic "half above, half below" overlapping-tab look, not just a sliver
            dipping into the border. z-10 is for paint order only (so it sits visually in front
            of the card that follows it in the DOM), not for positioning. */}
        <div className="relative z-10 mb-[-1.3rem] flex justify-center">
          <span className="border-[3px] border-ink bg-(--accent) px-6 py-2.5 font-mono text-label font-bold tracking-wide text-ink uppercase">
            {badge}
          </span>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-x-5 translate-y-5 bg-(--accent)" />

          {/* lg:pt/pb use dvh-based clamps, not fixed values: on the pinned desktop stage the
              card has exactly one screen's height to work with, so on a short/constrained
              viewport (e.g. devtools docked at the bottom) padding needs to shrink before the
              heading or footer badge runs out of room. The normal-desktop values below are a
              no-op below ~550px of height, where the dvh term takes over. */}
          <div className="relative border-[3px] border-ink bg-surface px-6 pt-12 pb-14 text-center sm:px-16 sm:pt-16 sm:pb-20 lg:px-20 lg:pt-[clamp(1.75rem,11dvh,4rem)] lg:pb-[clamp(1.5rem,13dvh,4.5rem)]">
            {/* Accent-strong (legible contrast) with a soft, blurred shadow in the raw accent
                colour for depth — not a hard-edged duplicate copy, which reads as "doubled"
                text at this size. The em units scale with the heading's own clamped font-size. */}
            <span className="block text-heading-xl text-(--accent-strong) [text-shadow:0.04em_0.04em_0.09em_var(--accent)]">
              {heading}
            </span>

            <p className="mx-auto mt-6 max-w-[50ch] text-heading-sm text-fg-muted">{statement}</p>

            <span className="mt-8 inline-flex items-center gap-2 bg-ink px-4 py-2 font-mono text-label font-semibold text-canvas shadow-[3px_3px_0_var(--accent)]">
              GDG · AIT Pune
            </span>
          </div>
        </div>
      </div>
    </RevealFade>
  );
}
