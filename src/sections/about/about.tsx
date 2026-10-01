import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealFade } from "@/components/motion/reveal-fade";
import { RevealSlide } from "@/components/motion/reveal-slide";

import { AboutPhoto } from "./about-photo";
import { about } from "./data";

export function About() {
  return (
    <Section id="about" accent="blue" className="lg:py-14">
      <Container className="overflow-x-hidden">
        <RevealFade className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 font-mono text-label font-bold tracking-[0.15em] text-ink uppercase">
            <span aria-hidden className="size-1.5 bg-blue" />
            {about.label}
          </span>
          <span aria-hidden className="block h-0.5 w-14 bg-blue" />
        </RevealFade>

        <div className="mt-16 flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
          <div className="relative lg:col-span-5">
            {/* Decorative comma marks live outside RevealSlide's own overflow-hidden clip,
                otherwise they'd be cut off since they intentionally extend past its box. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 -left-4 font-serif text-[4.5rem] leading-none text-blue/25 select-none"
            >
              &rsquo;
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -bottom-10 rotate-180 font-serif text-[2.75rem] leading-none text-green/25 select-none"
            >
              &rsquo;
            </span>

            <RevealSlide from="left" delay={0.1} distance={70}>
              <div className="space-y-4">
                <p className="text-body text-fg-muted">
                  <strong className="font-semibold text-ink">GDG AIT Pune</strong> is a student-driven community
                  powered by <strong className="font-semibold text-blue-strong">Google Developers</strong>.
                </p>

                <p className="text-body text-fg-muted">
                  We aim to <strong className="font-semibold text-ink">bridge the gap</strong> between theory and
                  practice through <strong className="font-semibold text-red-strong">hands-on learning</strong>.
                </p>

                <p className="text-body text-fg-muted">
                  Our members explore technologies like{" "}
                  <strong className="font-semibold text-blue-strong">Web</strong>,{" "}
                  <strong className="font-semibold text-green-strong">Android</strong>,{" "}
                  <strong className="font-semibold text-red-strong">AI/ML</strong>, and{" "}
                  <strong className="font-semibold text-yellow-strong">Cloud</strong>.
                </p>

                <p className="text-body text-fg-muted">
                  We organize <strong className="font-semibold text-ink">workshops</strong>,{" "}
                  <strong className="font-semibold text-ink">hackathons</strong>, and events to upskill and
                  collaborate. Together, we <strong className="font-semibold text-blue-strong">learn</strong>,{" "}
                  <strong className="font-semibold text-red-strong">build</strong>, and{" "}
                  <strong className="font-semibold text-green-strong">solve real-world problems</strong> using tech.
                </p>
              </div>
            </RevealSlide>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:-mt-6">
            <AboutPhoto />
          </div>
        </div>
      </Container>
    </Section>
  );
}
