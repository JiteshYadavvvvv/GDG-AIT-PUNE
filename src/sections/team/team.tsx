import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealFade } from "@/components/motion/reveal-fade";
import { RevealText } from "@/components/motion/reveal-text";

import { TeamGallery } from "./team-gallery";

export function Team() {
  return (
    <Section id="team" accent="green" className="py-16 lg:py-24">
      <Container>
        <div aria-hidden className="flex items-center justify-center gap-2">
          <span className="size-1.5 bg-green" />
          <span className="block h-0.5 w-14 bg-green" />
          <span className="size-1.5 bg-green" />
        </div>

        <RevealText delay={0.05} className="mt-4 text-center text-heading-xl">
          Meet the{" "}
          <span className="text-green-strong [text-shadow:0.04em_0.04em_0.09em_var(--color-green)]">Team</span>
        </RevealText>

        <RevealFade delay={0.1} className="mx-auto mt-6 max-w-2xl text-center text-body text-fg-muted">
          Students who organize events, mentor peers, explore new technologies, and help each other learn and build —
          this is who makes GDG AIT Pune happen.
        </RevealFade>

        <div className="mt-16 lg:mt-20">
          <TeamGallery />
        </div>
      </Container>
    </Section>
  );
}
