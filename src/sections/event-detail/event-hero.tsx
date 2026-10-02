import Image from "next/image";

import { Container } from "@/components/layout/container";
import { RevealFade } from "@/components/motion/reveal-fade";
import { RevealMedia } from "@/components/motion/reveal-media";
import { RevealText } from "@/components/motion/reveal-text";
import { ButtonLink } from "@/components/ui/button";
import { accentVars, type Accent } from "@/config/brand";
import { joinLink } from "@/data/navigation";
import { isPastEvent, type Event } from "@/sections/events/data";

interface EventHeroProps {
  event: Event;
  accent: Accent;
}

export function EventHero({ event, accent }: EventHeroProps) {
  const past = isPastEvent(event);
  const canRegister = !past && Boolean(event.registrationUrl);
  const words = event.name.trim().split(" ");
  const lastWord = words.pop();
  const leadingWords = words.join(" ");

  const facts = [
    { label: "Date", value: event.date },
    { label: "Status", value: past ? "Completed" : "Upcoming" },
    { label: "Eligibility", value: event.eligibility },
    ...(event.venue ? [{ label: "Venue", value: event.venue }] : []),
  ];

  return (
    <section style={accentVars(accent)} className="pt-[calc(var(--spacing-nav)+clamp(2rem,8vw,5rem))] pb-16 lg:pb-24">
      <Container>
        <RevealText delay={0.05} className="text-center text-heading-lg font-bold text-green-strong">
          Event Details
        </RevealText>

        <div className="relative mx-auto mt-14 max-w-6xl">
          <span
            aria-hidden
            className="absolute -top-4 left-8 z-20 border-2 border-ink bg-(--accent) px-4 py-1.5 font-mono text-label font-bold tracking-wide text-ink uppercase"
          >
            {event.category}
          </span>

          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-ink bg-ink" />

          <div className="relative grid overflow-hidden rounded-lg border-2 border-ink bg-surface lg:grid-cols-12">
            <div className="relative aspect-square overflow-hidden border-b-2 border-ink bg-sunken lg:col-span-5 lg:aspect-auto lg:border-r-2 lg:border-b-0">
              <RevealMedia direction="right" delay={0.2} className="relative size-full">
                <span aria-hidden className="bg-dots absolute inset-0 opacity-60" />
                <Image
                  src={event.image}
                  alt={`${event.name} event poster`}
                  fill
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="object-contain p-6"
                  priority
                />
              </RevealMedia>
            </div>

            <div className="flex flex-col justify-center p-8 lg:col-span-7 lg:p-12">
              <RevealText delay={0.1} className="text-heading-lg">
                {leadingWords && `${leadingWords} `}
                <span className="text-(--accent-strong) [text-shadow:0.04em_0.04em_0.09em_var(--accent)]">
                  {lastWord}
                </span>
              </RevealText>

              <RevealFade delay={0.2} className="mt-4 text-body text-fg-muted">
                {event.description}
              </RevealFade>

              <RevealFade delay={0.3} className="mt-8 flex flex-wrap gap-3">
                {facts.map((fact) => (
                  <div key={fact.label} className="min-w-30 flex-1 border-2 border-ink bg-surface px-4 py-3">
                    <p className="text-small font-bold text-ink">{fact.value}</p>
                    <p className="mt-1 font-mono text-caption text-fg-subtle uppercase">{fact.label}</p>
                  </div>
                ))}
              </RevealFade>

              <RevealFade delay={0.35}>
                <ButtonLink href={canRegister ? event.registrationUrl! : joinLink.href} accent={accent} className="mt-8">
                  {canRegister ? "Register now" : "Join the community"}
                </ButtonLink>
              </RevealFade>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
