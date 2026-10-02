import type { Metadata } from "next";

import { Hero } from "@/sections/hero/hero";
import { About } from "@/sections/about/about";
import { Mission } from "@/sections/about/mission";
import { PanelStage } from "@/sections/about/panel-stage";
import { Vision } from "@/sections/about/vision";
import { Events } from "@/sections/events/events";
import { Team } from "@/sections/team/team";

import { PlaceholderSections } from "./_preview/placeholder-sections";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <>
      <Hero />
      <PanelStage panels={[<About key="about" />, <Vision key="vision" />, <Mission key="mission" />]} />
      <Events />
      <Team />
      <PlaceholderSections />
    </>
  );
}
