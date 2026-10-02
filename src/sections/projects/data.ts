import type { StaticImageData } from "next/image";

import type { Accent } from "@/config/brand";

import aitNexus from "./assets/ait-nexus.webp";
import nagrikEye from "./assets/nagrik-eye.webp";
import xChat from "./assets/x-chat.webp";

export interface Project {
  slug: string;
  name: string;
  description: string;
  url: string;
  image: StaticImageData;
  accent: Accent;
}

export const projects: Project[] = [
  {
    slug: "ait-nexus",
    name: "AIT NEXUS",
    description:
      "A unified platform that syncs every club at AIT Pune — discover events, join communities, and manage campus life from one place.",
    url: "https://aitnexus.in",
    image: aitNexus,
    accent: "blue",
  },
  {
    slug: "nagrik-eye",
    name: "Nagrik Eye",
    description:
      "An AI-driven civic action platform for Pimpri-Chinchwad — citizens report hazards and municipal issues, and authorities track them on a live impact map.",
    url: "https://nagrik-eye.vercel.app/",
    image: nagrikEye,
    accent: "green",
  },
  {
    slug: "x-chat",
    name: "X Chat",
    description: "A room-based real-time chat app with a secure-channel, terminal-inspired interface.",
    url: "https://xchat-pi.vercel.app/",
    image: xChat,
    accent: "red",
  },
];
