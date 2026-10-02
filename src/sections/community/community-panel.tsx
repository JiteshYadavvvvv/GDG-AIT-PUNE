import { RevealFade } from "@/components/motion/reveal-fade";
import { ButtonLink } from "@/components/ui/button";
import { socialLinks } from "@/data/navigation";

const instagram = socialLinks.find((link) => link.label === "Instagram")!;

export function CommunityPanel() {
  return (
    <RevealFade delay={0.2} className="relative mx-auto mt-14 max-w-3xl rotate-[-1deg]">
      <span
        aria-hidden
        className="absolute -top-4 left-8 z-20 border-2 border-ink bg-blue px-4 py-1.5 font-mono text-label font-bold tracking-wide text-ink uppercase"
      >
        Join us
      </span>

      <div aria-hidden className="bg-spectrum absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-ink" />

      <div className="relative flex flex-col items-center gap-6 rounded-lg border-2 border-ink bg-surface px-8 py-12 text-center sm:px-14 sm:py-16">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-blue" />
          <span className="size-2 rounded-full bg-red" />
          <span className="size-2 rounded-full bg-yellow" />
          <span className="size-2 rounded-full bg-green" />
        </div>

        <p className="max-w-md text-lead text-fg-muted">
          Learn together, build real projects, and grow alongside developers just like you.
        </p>

        <ButtonLink href={instagram.href} accent="blue" size="lg">
          Join the Community
        </ButtonLink>
      </div>
    </RevealFade>
  );
}
