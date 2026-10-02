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

export function SlideCard({ accent, badge, heading, statement, className }: SlideCardProps) {
  return (
    <RevealFade className={cn("relative mx-auto w-full max-w-4xl", className)}>
      <div style={accentVars(accent)}>
        <div className="relative z-10 mb-[-1.3rem] flex justify-center">
          <span className="border-[3px] border-ink bg-(--accent) px-6 py-2.5 font-mono text-label font-bold tracking-wide text-ink uppercase">
            {badge}
          </span>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-x-5 translate-y-5 bg-(--accent)" />

          <div className="relative border-[3px] border-ink bg-surface px-6 pt-12 pb-14 text-center sm:px-16 sm:pt-16 sm:pb-20 lg:px-20 lg:pt-[clamp(1.75rem,11dvh,4rem)] lg:pb-[clamp(1.5rem,13dvh,4.5rem)]">
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
