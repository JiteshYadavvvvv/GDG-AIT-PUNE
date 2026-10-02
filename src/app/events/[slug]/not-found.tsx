import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";

export default function EventNotFound() {
  return (
    <section className="pt-[calc(var(--spacing-nav)+clamp(2rem,8vw,5rem))] pb-24">
      <Container>
        <div className="relative mx-auto w-full max-w-lg">
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-ink bg-red" />
          <div className="relative border-2 border-ink bg-surface px-8 py-12 text-center">
            <span className="font-mono text-label text-fg-subtle uppercase">404</span>
            <h1 className="mt-4 text-heading-lg">Event not found</h1>
            <p className="mx-auto mt-4 max-w-[38ch] text-body text-fg-muted">
              This event doesn&apos;t exist or may have been moved. Take a look at everything we&apos;ve run so far.
            </p>
            <ButtonLink href="/#events" accent="red" className="mt-8">
              Back to events
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
