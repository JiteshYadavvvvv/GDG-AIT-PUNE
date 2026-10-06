import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealSlide } from "@/components/motion/reveal-slide";
import { RevealText } from "@/components/motion/reveal-text";

import { AboutPhoto } from "./about-photo";
import { about } from "./data";

export function About() {
  return (
    <Section id="about" accent="blue" fill className="lg:py-22 lg:-mt-17.5">
      <Container>
        <div aria-hidden className="flex items-center justify-center gap-2">
          <span className="size-1.5 bg-blue" />
          <span className="block h-0.5 w-14 bg-blue" />
          <span className="size-1.5 bg-blue" />
        </div>

        <RevealText delay={0.05} className="mt-4 text-center text-heading-xl">
          {about.label}
        </RevealText>

        <div className="mt-12 flex flex-col gap-12 lg:mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
          <div className="lg:col-span-5">
            <div className="relative">
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
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <AboutPhoto />
          </div>
        </div>
      </Container>
    </Section>
  );
}
