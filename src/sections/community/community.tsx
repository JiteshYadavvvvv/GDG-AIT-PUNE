import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealFade } from "@/components/motion/reveal-fade";
import { RevealText } from "@/components/motion/reveal-text";

import { CommunityPanel } from "./community-panel";

export function Community() {
  return (
    <Section id="community" accent="blue" className="py-16 lg:py-24">
      <Container>
        <div aria-hidden className="flex items-center justify-center gap-2">
          <span className="size-1.5 bg-blue" />
          <span className="block h-0.5 w-14 bg-blue" />
          <span className="size-1.5 bg-blue" />
        </div>

        <RevealText delay={0.05} className="mt-4 text-center text-heading-xl">
          Find Your{" "}
          <span className="text-blue-strong [text-shadow:0.04em_0.04em_0.09em_var(--color-blue)]">People.</span>
        </RevealText>

        <RevealFade delay={0.1} className="mx-auto mt-6 max-w-2xl text-center text-body text-fg-muted">
          A place to learn together, build meaningful projects, explore new technologies, and grow alongside a
          community of curious developers.
        </RevealFade>

        <CommunityPanel />

        <RevealFade delay={0.3} className="mt-16 flex justify-center">
          <p className="border-2 border-ink bg-surface px-5 py-2.5 font-mono text-small text-fg-muted">
            Special thanks to AADU 🥰
          </p>
        </RevealFade>
      </Container>
    </Section>
  );
}
