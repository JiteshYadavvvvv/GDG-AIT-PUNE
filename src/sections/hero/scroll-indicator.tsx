import { hero } from "@/data/hero";

// The fill is scrubbed by the hero's scroll timeline.
export function ScrollIndicator() {
  return (
    <a
      href={hero.scrollTarget}
      className="group inline-flex items-center gap-3 font-mono text-label text-fg-muted transition-colors duration-(--duration-base) hover:text-ink"
    >
      <span className="link-underline">Scroll to explore</span>
      <span aria-hidden className="relative h-12 w-0.5 overflow-hidden rounded-full bg-line-strong">
        <span
          data-hero-progress
          style={{ transform: "scaleY(0.12)" }}
          className="bg-spectrum-vertical absolute inset-0 origin-top"
        />
      </span>
    </a>
  );
}
