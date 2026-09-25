// Single GSAP entry point so plugins register once. Direct imports are blocked by ESLint.
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { DURATION, EASE } from "./tokens";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ duration: DURATION.base, ease: EASE.out.gsap });

// Mobile URL bar resizes shouldn't re-measure pinned sections.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };
