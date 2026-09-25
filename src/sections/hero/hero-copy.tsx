import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/motion/magnetic";
import { ButtonLink } from "@/components/ui/button";
import { hero } from "@/data/hero";
import { cn } from "@/lib/utils/cn";

import { ScrollIndicator } from "./scroll-indicator";

// Entrances are CSS (they run at first paint); the scroll timeline in hero-stage moves the wrappers.
export function HeroCopy() {
  const [firstLine, secondLine] = hero.headline;

  return (
    <div className="relative z-10 flex h-full flex-col pt-[calc(var(--spacing-nav)+clamp(1.25rem,5vh,4rem))] pb-[clamp(1.5rem,6vh,3.5rem)]">
      <Container className="flex flex-1 flex-col">
        <div data-hero-meta className="overflow-hidden">
          <p className="flex animate-rise-in flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label text-fg-muted [animation-delay:120ms]">
            <span aria-hidden className="size-1.5 bg-blue" />
            <span>{hero.community}</span>
            <span aria-hidden className="text-fg-subtle">
              /
            </span>
            <span className="text-fg-subtle">{hero.campus}</span>
          </p>
        </div>

        <h1
          id="hero-title"
          className="mt-[clamp(1.5rem,8vh,5.5rem)] text-display"
          // Capped below the display token so the headline keeps clear of the network on wide screens.
          style={{ fontSize: "clamp(3rem, 1.4rem + 8vw, 8.75rem)" }}
        >
          <HeadlineLine index={1} delay={240}>
            {firstLine}
          </HeadlineLine>
          <HeadlineLine index={2} delay={360}>
            <LastLine text={secondLine ?? ""} />
          </HeadlineLine>
        </h1>

        <div data-hero-footer className="mt-10 grid items-end gap-x-8 gap-y-6 landscape:mt-auto md:grid-cols-12">
          <div className="overflow-hidden md:col-span-5">
            <p className="max-w-[36ch] animate-rise-in text-lead text-fg-muted [animation-delay:560ms]">
              {hero.lead}
            </p>
          </div>
          <div className="animate-rise-in [animation-delay:680ms] md:col-span-4">
            <Magnetic>
              <ButtonLink href={hero.cta.href} size="lg" accent="blue">
                {hero.cta.label}
              </ButtonLink>
            </Magnetic>
          </div>
          <div className="hidden justify-self-end overflow-hidden md:col-span-3 md:block">
            <div className="animate-rise-in [animation-delay:820ms]">
              <ScrollIndicator />
            </div>
          </div>
        </div>
      </Container>

      <HeroIdentity />
    </div>
  );
}

// Mask › scroll layer › entrance layer, so the CSS entrance and the GSAP scroll never share a transform.
function HeadlineLine({ index, delay, children }: { index: number; delay: number; children: ReactNode }) {
  return (
    <span data-hero-line={index} className="-mb-[0.2em] block overflow-hidden pb-[0.2em]">
      <span data-hero-line-inner className="block">
        <span className="block animate-rise-in" style={{ animationDelay: `${delay}ms` }}>
          {children}
        </span>
      </span>
    </span>
  );
}

// The closing full stop is drawn as a commit node, kept on the same line as the last word.
function LastLine({ text }: { text: string }) {
  const words = text.replace(/\.$/, "").split(" ");
  const lastWord = words.pop();

  return (
    <>
      {words.join(" ")}{" "}
      <span className="whitespace-nowrap">
        {lastWord}
        <span
          aria-hidden
          className="ml-[0.06em] inline-block size-[0.17em] rounded-full border-[0.045em] border-green bg-surface align-baseline"
        />
        <span className="sr-only">.</span>
      </span>
    </>
  );
}

// Revealed at the end of the scroll: under the GDG hub, or above it in portrait where the main line runs down.
function HeroIdentity() {
  return (
    <div
      data-hero-identity
      aria-hidden
      className={cn(
        "invisible absolute inset-x-0 top-1/2 isolate mt-[clamp(6.5rem,17vh,10rem)] px-gutter text-center",
        "portrait:top-auto portrait:bottom-1/2 portrait:mt-0 portrait:mb-[clamp(6rem,13vh,9rem)]",
        // Paper halo keeps the text clear of any lane passing behind it.
        "before:absolute before:inset-x-[8%] before:-inset-y-10 before:-z-10 before:bg-[radial-gradient(closest-side,var(--color-canvas)_55%,transparent)]",
      )}
    >
      <span className="block overflow-hidden">
        <span data-hero-identity-line className="block text-heading-md">
          {hero.community}
        </span>
      </span>
      <span className="mt-3 block overflow-hidden">
        <span data-hero-identity-line className="block font-mono text-label text-fg-muted">
          {hero.campus}
        </span>
      </span>
    </div>
  );
}
