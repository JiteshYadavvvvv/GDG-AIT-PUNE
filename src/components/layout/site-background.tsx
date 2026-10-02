import { Container } from "./container";

export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="bg-noise absolute inset-0 opacity-[0.07]" />
      <Container className="h-full">
        <div className="h-full border-x border-line" />
      </Container>
    </div>
  );
}
