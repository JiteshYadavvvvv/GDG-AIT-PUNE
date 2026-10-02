import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealFade } from "@/components/motion/reveal-fade";
import { RevealText } from "@/components/motion/reveal-text";
import type { Accent } from "@/config/brand";

interface EventAboutProps {
  description: string;
  accent: Accent;
}

export function EventAbout({ description, accent }: EventAboutProps) {
  return (
    <Section accent={accent} className="py-16 lg:py-20">
      <Container>
        <RevealText delay={0.05} className="text-heading-lg">
          About the event
        </RevealText>

        <RevealFade delay={0.1} className="mt-6 max-w-prose text-lead text-fg-muted">
          {description}
        </RevealFade>
      </Container>
    </Section>
  );
}
