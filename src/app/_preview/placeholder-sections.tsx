import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";
import { mainNav } from "@/data/navigation";
import { formatIndex } from "@/lib/utils/format";

// About now has a real implementation (Stage 3: About/Vision/Mission), so it's dropped here.
// The other three chapters (About/Vision/Mission) come first in the page, hence the offset.
const CHAPTERS_BEFORE = 3;

// Anchor targets for the navigation until the remaining sections exist.
export function PlaceholderSections() {
  return mainNav
    .filter((item) => item.href !== "/#about")
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
