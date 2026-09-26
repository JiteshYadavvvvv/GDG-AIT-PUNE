import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/motion/magnetic";
import { ButtonLink } from "@/components/ui/button";
import { hero } from "@/data/hero";
import { cn } from "@/lib/utils/cn";

import community from "./assets/community.png";

// Entrances are CSS (they run at first paint); the scroll timeline in hero-stage moves the wrappers.
export function HeroCopy() {
  const [firstLine, secondLine] = hero.headline;

  return (
    <div className="relative z-10 flex h-full flex-col pt-[calc(var(--spacing-nav)+clamp(1.25rem,5vh,4rem))] pb-[clamp(1.5rem,6vh,3.5rem)]">
      {/*
        Sized in three overlapping segments instead of one linear vw clamp: a single rate can't
        serve both the tight 1024–1280px range (where it was crowding the CTA) and ultra-wide
        monitors (where a flat max-width looked stuck and small) at once. Each segment keeps the
        image at roughly the same 34–36% share of the viewport as it grows.
      */}
      <div
        data-hero-footer
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 hidden w-[clamp(260px,36vw,400px)] animate-fade-up [animation-delay:860ms] md:block xl:w-[clamp(420px,34vw,650px)] 3xl:w-[clamp(650px,34vw,860px)]"
      >
        <Image src={community} alt="" className="h-auto w-full select-none" />
      </div>

      <Container className="flex flex-1 flex-col">
        <div data-hero-meta className="overflow-hidden">

        </div>

        <h1
          id="hero-title"
          className="mt-[clamp(1.5rem,8vh,5.5rem)] text-display"
          // Capped below the display token so the headline keeps clear of the network on wide screens.
          style={{ fontSize: "clamp(3.25rem, 1.5rem + 8.2vw, 9.5rem)" }}
        >
          <HeadlineLine index={1} delay={240}>
            <GdgWordmark word={firstLine ?? ""} />
          </HeadlineLine>
          <HeadlineLine index={2} delay={360} className="mt-[0.04em]">
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
              <ButtonLink href={hero.cta.href} size="lg" accent="blue" className="shadow-raised">
                {hero.cta.label}
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </Container>

      <HeroIdentity />
    </div>
  );
}

// G / D / G in the brand colours, one solid hue each — the only coloured letters in the wordmark.
const GDG_LETTER_COLORS = ["text-red", "text-blue", "text-green"];

function GdgWordmark({ word }: { word: string }) {
  return (
    <>
      {[...word].map((letter, i) => (
        <span key={i} className={GDG_LETTER_COLORS[i]}>
          {letter}
        </span>
      ))}
    </>
  );
}

// Mask › scroll layer › entrance layer, so the CSS entrance and the GSAP scroll never share a transform.
function HeadlineLine({
  index,
  delay,
  className,
  children,
}: {
  index: number;
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span data-hero-line={index} className={cn("-mb-[0.2em] block overflow-hidden pb-[0.2em]", className)}>
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
          className="ml-[0.08em] inline-block size-[0.19em] -translate-y-[0.05em] rounded-full border-[0.05em] border-green bg-surface align-baseline"
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
