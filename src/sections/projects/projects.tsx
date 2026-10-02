import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealFade } from "@/components/motion/reveal-fade";
import { RevealText } from "@/components/motion/reveal-text";

import { projects } from "./data";
import { ProjectGallery } from "./project-gallery";

export function Projects() {
  return (
    <Section id="projects" accent="yellow" className="py-16 lg:py-24">
      <Container>
        <div aria-hidden className="flex items-center justify-center gap-2">
          <span className="size-1.5 bg-yellow" />
          <span className="block h-0.5 w-14 bg-yellow" />
          <span className="size-1.5 bg-yellow" />
        </div>

        <RevealText delay={0.05} className="mt-4 text-center text-heading-xl leading-[1.15]">
          Our{" "}
          <span className="text-yellow-strong [text-shadow:0.04em_0.04em_0.09em_var(--color-yellow)]">
            Projects
          </span>
        </RevealText>

        <RevealFade delay={0.1} className="mx-auto mt-6 max-w-2xl text-center text-body text-fg-muted">
          Ideas turned into real products. Explore what our community is building.
        </RevealFade>

        <div className="mt-16 lg:mt-20">
          <ProjectGallery projects={projects} />
        </div>
      </Container>
    </Section>
  );
}
