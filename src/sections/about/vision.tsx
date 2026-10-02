import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

import { SlideCard } from "./slide-card";
import { vision } from "./data";

export function Vision() {
  return (
    <Section accent="yellow" fill className="lg:py-8">
      {/* Per the CSS overflow spec, pairing a non-"visible" overflow-x with an unset overflow-y
          forces overflow-y to compute as "auto" — and "auto" still clips (it only adds a
          scroll affordance; it doesn't make the overflow visible without scrolling). That was
          silently clipping the card's shadow where it peeks below the card, because Container's
          own height tracks only its normal-flow child (the card), not the absolutely-positioned
          shadow extending 20px past it. pb-5 gives Container that same 20px back as genuine,
          height-contributing padding, so the shadow's bottom edge lands at (or inside)
          Container's own box instead of past it — nothing overflows, so there's nothing left
          for the forced "auto" to clip, and overflow-x-hidden can stay in place for its real
          job: containing the shadow's 20px right-bleed on narrow/mobile widths, where the card
          fills Container's full width with little horizontal margin to spare. */}
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-50" />
      <Container className="relative overflow-x-hidden pb-5">
        <SlideCard accent="yellow" badge={vision.badge} heading={vision.heading} statement={vision.statement} />
      </Container>
    </Section>
  );
}
