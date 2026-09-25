/**
 * The only module that imports GSAP directly (enforced by ESLint).
 * Importing from here guarantees plugins are registered exactly once.
 *
 * Usage in a client component:
 *
 *   const scope = useRef<HTMLDivElement>(null);
 *   useGSAP(() => {
 *     const mm = gsap.matchMedia();
 *     mm.add({ motion: MEDIA.motionOK, lg: MEDIA.up("lg") }, (ctx) => {
 *       gsap.to(".item", { y: 0, scrollTrigger: { trigger: scope.current, scrub: true } });
 *     });
 *   }, { scope });
 *
 * useGSAP wraps gsap.context(): every tween, ScrollTrigger and matchMedia
 * created inside is reverted on unmount, so nothing leaks or duplicates
 * under React Strict Mode. Wrap event-handler animations in `contextSafe`.
 */
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DURATION, EASE } from "./tokens";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({ duration: DURATION.base, ease: EASE.out.gsap });

// Mobile browsers resize the viewport when the URL bar shows/hides; skipping
// those refreshes avoids pinned sections jumping mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, useGSAP };
