import { HeroCopy } from "./hero-copy";
import { HeroStage } from "./hero-stage";
import { NetworkFallback } from "./network-fallback";

export function Hero() {
  return (
    <HeroStage fallback={<NetworkFallback />}>
      <HeroCopy />
    </HeroStage>
  );
}
