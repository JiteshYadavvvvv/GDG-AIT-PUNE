import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";
import { mainNav } from "@/data/navigation";
import { formatIndex } from "@/lib/utils/format";

const CHAPTERS_BEFORE = 5;

export function PlaceholderSections() {
  return mainNav
    .filter((item) => item.href !== "/#about" && item.href !== "/#events" && item.href !== "/#team")
    .map((item, index) => (
      <Section key={item.href} id={item.href.split("#")[1]} accent={item.accent} className="py-24 md:py-32">
        <Container className="flex flex-wrap items-baseline justify-between gap-6">
          <SectionLabel index={formatIndex(index + CHAPTERS_BEFORE)} accent={item.accent}>
            {item.label}
          </SectionLabel>
          <p className="text-heading-md text-fg-subtle">In progress</p>
        </Container>
      </Section>
    ));
}
