import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { DURATION, EASE } from "./tokens";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ duration: DURATION.base, ease: EASE.out.gsap });

ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };
