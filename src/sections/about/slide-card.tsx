import { RevealFade } from "@/components/motion/reveal-fade";
import { RevealText } from "@/components/motion/reveal-text";
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
// closer to a presentation title card than a normal flowing section.
export function SlideCard({ accent, badge, heading, statement, className }: SlideCardProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-2xl", className)} style={accentVars(accent)}>
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 bg-(--accent)" />

      <RevealFade className="relative border-2 border-ink bg-surface px-8 py-16 text-center sm:px-16">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-2 border-2 border-ink bg-(--accent) px-4 py-1.5 font-mono text-label font-bold tracking-wide text-ink uppercase">
          {badge}
        </span>

        <RevealText delay={0.1} className="mt-4 text-heading-xl">
          <span className="block">{heading}</span>
        </RevealText>

        <RevealText delay={0.2} className="mx-auto mt-6 max-w-[46ch] text-lead text-fg-muted">
          <p>{statement}</p>
        </RevealText>

        <RevealFade
          delay={0.32}
          className="mt-10 inline-flex items-center gap-2 border border-line-strong px-4 py-1.5 font-mono text-label text-fg-subtle"
        >
          GDG · AIT Pune
        </RevealFade>
      </RevealFade>
    </div>
  );
}
