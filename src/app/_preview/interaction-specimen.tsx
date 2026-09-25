import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { RevealText } from "@/components/motion/reveal-text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/ui/section-label";
import { TextLink } from "@/components/ui/text-link";
import { accents } from "@/config/brand";

import enliven from "./images/enliven.webp";
import flutter from "./images/flutter.webp";
import solution from "./images/solution.webp";
import { SceneSample } from "./scene-sample";

export function InteractionSpecimen() {
  return (
    <Section accent="green">
      <Container>
        <SectionLabel accent="green">Interaction</SectionLabel>
        <RevealText className="mt-8 max-w-4xl">
          <h2 className="text-heading-xl">Anything you can touch answers back, quietly.</h2>
        </RevealText>

        <div className="mt-16 border-t border-line md:mt-24">
          <SpecimenRow title="Buttons" note="The accent floods out of the icon. Press and it gives a little.">
            <div className="flex flex-wrap gap-3">
              {accents.map((accent) => (
                <Button key={accent} accent={accent}>
                  <span className="capitalize">{accent}</span> action
                </Button>
              ))}
              <Button variant="secondary">Secondary</Button>
            </div>
            <div className="mt-6">
              <Magnetic>
                <Button size="lg" accent="red">
                  Magnetic, large
                </Button>
              </Magnetic>
            </div>
          </SpecimenRow>

          <SpecimenRow title="Links" note="The underline draws in from the left and leaves to the right.">
            <p className="max-w-prose text-lead text-fg-muted">
              Read more <TextLink href="#about">about the chapter</TextLink>, browse the{" "}
              <TextLink href="#events">events we run</TextLink>, or learn about the wider{" "}
              <TextLink href="https://developers.google.com/community/gdg">Google Developer Groups</TextLink>{" "}
              programme.
            </p>
          </SpecimenRow>

          <SpecimenRow title="Cards" note="Lift, a slow zoom and an accent on the arrow. The cursor offers a label.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              <Card href="#events" image={enliven} imageAlt="Enliven 2 hackathon poster" title="Enliven 2" meta="Hackathon" accent="red" mediaClassName="aspect-square" />
              <Parallax speed={-0.06}>
                <Card href="#events" image={solution} imageAlt="Solutions Challenge poster" title="Solutions Challenge" meta="Challenge" accent="yellow" mediaClassName="aspect-square" />
              </Parallax>
              <Card href="#events" image={flutter} imageAlt="Flutter Forward poster" title="Flutter Forward" meta="Workshop" accent="blue" mediaClassName="aspect-square" />
            </div>
          </SpecimenRow>

          <SpecimenRow title="3D" note="Light studio, glossy colour, soft contact shadows. Loads only when it is close to view.">
            <SceneSample />
          </SpecimenRow>
        </div>
      </Container>
    </Section>
  );
}

function SpecimenRow({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <div className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
      <div className="md:col-span-3">
        <h3 className="font-mono text-label">{title}</h3>
        <p className="mt-2 max-w-[28ch] text-small text-fg-muted">{note}</p>
      </div>
      <div className="min-w-0 md:col-span-9">{children}</div>
    </div>
  );
}
