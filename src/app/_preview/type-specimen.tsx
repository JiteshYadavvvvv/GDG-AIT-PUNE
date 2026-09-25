import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/motion/reveal-text";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils/cn";

const SAMPLES = [
  { role: "display", range: "48–176", className: "text-display", text: "Build together" },
  { role: "heading-xl", range: "38–108", className: "text-heading-xl", text: "Developer community" },
  { role: "heading-lg", range: "30–72", className: "text-heading-lg", text: "Workshops and hackathons" },
  { role: "heading-md", range: "24–48", className: "text-heading-md", text: "Study jams, talks and code reviews" },
  { role: "heading-sm", range: "20–30", className: "text-heading-sm", text: "Hands-on with Google technologies" },
  {
    role: "lead",
    range: "18–24",
    className: "text-lead",
    text: "A student community that learns, builds and ships with Google technologies — Android, Cloud, AI/ML, Web and Flutter.",
  },
  {
    role: "body",
    range: "16–18",
    className: "text-body",
    text: "Body copy carries long-form reading: event write-ups, project descriptions and anything longer than a sentence or two. It stays comfortable at every width.",
  },
  { role: "small", range: "14–15", className: "text-small", text: "Saturday · 10:00 · AIT Pune" },
  { role: "caption", range: "12–13", className: "text-caption text-fg-muted", text: "Captions sit under images and figures." },
  { role: "label", range: "12–13 mono", className: "font-mono text-label", text: "Events / Upcoming / 03" },
];

export function TypeSpecimen() {
  return (
    <Section accent="red">
      <Container>
        <SectionLabel accent="red">Typography</SectionLabel>
        <RevealText className="mt-8 max-w-4xl">
          <h2 className="text-heading-xl">Google Sans Flex for the story, Google Sans Code for the details.</h2>
        </RevealText>

        <dl className="mt-16 border-t border-line md:mt-24">
          {SAMPLES.map((sample) => (
            <div key={sample.role} className="grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-8 md:py-8">
              <dt className="font-mono text-label text-fg-subtle md:col-span-3">
                {sample.role}
                <span className="block text-fg-subtle/70">{sample.range} px</span>
              </dt>
              <dd className={cn("min-w-0 md:col-span-9", sample.className)}>{sample.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
