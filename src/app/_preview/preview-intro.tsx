import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/motion/magnetic";
import { RevealText } from "@/components/motion/reveal-text";
import { ButtonLink } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { collaborateLink, joinLink } from "@/data/navigation";

export function PreviewIntro() {
  return (
    <section className="relative pt-[calc(var(--spacing-nav)+clamp(4rem,12vw,10rem))] pb-section">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel accent="blue">Design system preview</SectionLabel>
          <p className="font-mono text-label text-fg-subtle">Army Institute of Technology, Pune</p>
        </div>

        <RevealText className="mt-10 md:mt-14">
          <h1 className="text-display">
            GDG AIT Pune
            <span aria-hidden className="ml-[0.04em] inline-block size-[0.14em] bg-blue" />
          </h1>
        </RevealText>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
          <p className="max-w-prose text-lead text-fg-muted lg:col-span-6">
            Type, colour, layout and interaction for the Google Developer Groups on Campus chapter at Army
            Institute of Technology, Pune. The homepage sections are built on top of this next.
          </p>
          <div className="flex flex-wrap items-start gap-3 lg:col-span-6 lg:justify-end">
            <Magnetic>
              <ButtonLink href={joinLink.href} size="lg">
                {joinLink.label}
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href={collaborateLink.href} variant="secondary" size="lg" accent="yellow">
                {collaborateLink.label}
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </Container>
    </section>
  );
}
