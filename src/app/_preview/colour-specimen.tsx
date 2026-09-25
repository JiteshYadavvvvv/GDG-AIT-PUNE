import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealMedia } from "@/components/motion/reveal-media";
import { RevealText } from "@/components/motion/reveal-text";
import { SectionLabel } from "@/components/ui/section-label";

const BRAND = [
  { name: "Blue", use: "Focus, links, primary accent", base: "bg-blue", strong: "bg-blue-strong", soft: "bg-blue-soft", hex: ["#4285F4", "#1967D2", "#E8F0FE"] },
  { name: "Red", use: "Emphasis and live moments", base: "bg-red", strong: "bg-red-strong", soft: "bg-red-soft", hex: ["#EA4335", "#C5221F", "#FCE8E6"] },
  { name: "Yellow", use: "Highlights and selection", base: "bg-yellow", strong: "bg-yellow-strong", soft: "bg-yellow-soft", hex: ["#FBBC04", "#A35A00", "#FEF7E0"] },
  { name: "Green", use: "Community and calls to join", base: "bg-green", strong: "bg-green-strong", soft: "bg-green-soft", hex: ["#34A853", "#137333", "#E6F4EA"] },
];

const STONES = [
  "bg-stone-50",
  "bg-stone-100",
  "bg-stone-150",
  "bg-stone-200",
  "bg-stone-300",
  "bg-stone-400",
  "bg-stone-500",
  "bg-stone-600",
  "bg-stone-700",
  "bg-stone-800",
  "bg-stone-900",
  "bg-stone-950",
];

export function ColourSpecimen() {
  return (
    <Section accent="yellow">
      <Container>
        <SectionLabel accent="yellow">Colour</SectionLabel>
        <RevealText className="mt-8 max-w-4xl">
          <h2 className="text-heading-xl">Warm paper and ink, with four colours used on purpose.</h2>
        </RevealText>

        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-24 lg:grid-cols-4 lg:gap-6">
          {BRAND.map((colour) => (
            <figure key={colour.name}>
              <RevealMedia className="rounded-lg">
                <div className={`aspect-[4/5] ${colour.base}`} />
              </RevealMedia>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className={`h-12 rounded-sm ${colour.strong}`} />
                <div className={`h-12 rounded-sm shadow-hairline ${colour.soft}`} />
              </div>
              <figcaption className="mt-4">
                <p className="text-heading-sm">{colour.name}</p>
                <p className="mt-1 text-small text-fg-muted">{colour.use}</p>
                <p className="mt-3 font-mono text-label text-fg-subtle">{colour.hex.join(" · ")}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-6 overflow-hidden rounded-md shadow-hairline md:grid-cols-12">
          {STONES.map((stone) => (
            <div key={stone} className={`h-16 ${stone}`} title={stone.replace("bg-", "")} />
          ))}
        </div>
        <p className="mt-3 font-mono text-label text-fg-subtle">Stone 50 → 950 · canvas #FAF9F6 · ink #151411</p>
      </Container>
    </Section>
  );
}
