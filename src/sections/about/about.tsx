import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealFade } from "@/components/motion/reveal-fade";
import { RevealText } from "@/components/motion/reveal-text";

import { AboutPhoto } from "./about-photo";
import { about } from "./data";

export function About() {
  return (
    <Section id="about" accent="blue">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <RevealFade className="inline-flex items-center gap-2 font-mono text-label tracking-[0.15em] text-fg-muted uppercase">
            <span aria-hidden className="size-1.5 bg-blue" />
            {about.label}
          </RevealFade>

          <RevealFade delay={0.06}>
            <span aria-hidden className="block h-0.5 w-14 bg-blue" />
          </RevealFade>

          <RevealText className="mt-2 text-heading-xl">
            <span className="block">{about.heading[0]}</span>
            <span className="block text-blue">{about.heading[1]}</span>
          </RevealText>
        </div>

        <div className="mt-16 flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <div className="space-y-5 lg:col-span-4">
            <RevealText className="text-body text-fg-muted">
              <p>
                <strong className="font-semibold text-ink">GDG AIT Pune</strong> is a student-driven community
                powered by <strong className="font-semibold text-blue-strong">Google Developers</strong>.
              </p>
            </RevealText>

            <RevealText delay={0.08} className="text-body text-fg-muted">
              <p>
                We aim to <strong className="font-semibold text-ink">bridge the gap</strong> between theory and
                practice through <strong className="font-semibold text-red-strong">hands-on learning</strong>.
              </p>
            </RevealText>

            <RevealText delay={0.16} className="text-body text-fg-muted">
              <p>
                Our members explore technologies like <strong className="font-semibold text-blue-strong">Web</strong>
                , <strong className="font-semibold text-green-strong">Android</strong>,{" "}
                <strong className="font-semibold text-red-strong">AI/ML</strong>, and{" "}
                <strong className="font-semibold text-yellow-strong">Cloud</strong>.
              </p>
            </RevealText>

            <RevealText delay={0.24} className="text-body text-fg-muted">
              <p>
                We organize <strong className="font-semibold text-ink">workshops</strong>,{" "}
                <strong className="font-semibold text-ink">hackathons</strong>, and events to upskill and
                collaborate. Together, we <strong className="font-semibold text-blue-strong">learn</strong>,{" "}
                <strong className="font-semibold text-red-strong">build</strong>, and{" "}
                <strong className="font-semibold text-green-strong">solve real-world problems</strong> using tech.
              </p>
            </RevealText>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:mt-16">
            <AboutPhoto />
          </div>
        </div>
      </Container>
    </Section>
  );
}
