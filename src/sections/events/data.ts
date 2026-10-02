import type { StaticImageData } from "next/image";

import type { Accent } from "@/config/brand";

import enlivenHackathon from "./assets/enliven-hackathon.webp";
import flutterWorkshop from "./assets/flutter-workshop.webp";
import syntax from "./assets/syntax.png";
import googleSolutions from "./assets/google-solutions.webp";
import hacktoberfest from "./assets/hacktoberfest.jpg";
import mlStudyJam from "./assets/ml-study-jam.jpg";

export type EventCategory = "Hackathon" | "Workshop" | "Study Jam" | "Community Event";

export interface Event {
  slug: string;
  name: string;
  category: EventCategory;
  date: string;
  monthYear: string;
  description: string;
  eligibility: string;
  image: StaticImageData;
  venue?: string;
  registrationUrl?: string;
}

export const categoryAccent: Record<EventCategory, Accent> = {
  Hackathon: "red",
  Workshop: "blue",
  "Study Jam": "yellow",
  "Community Event": "green",
};

export const events: Event[] = [
  {
    slug: "enliven-hackathon",
    name: "Enliven Hackathon",
    category: "Hackathon",
    date: "15 July 2025",
    monthYear: "Jul 2025",
    description:
      "An intensive 48-hour coding marathon where innovative minds collaborated to solve real-world challenges using cutting-edge technologies. Teams built solutions guided by industry mentors and Google technology experts.",
    eligibility: "Open to all",
    image: enlivenHackathon,
  },
  {
    slug: "google-solutions",
    name: "Google Solutions",
    category: "Workshop",
    date: "20 August 2025",
    monthYear: "Aug 2025",
    description:
      "A deep dive into Google's AI and cloud technologies through hands-on workshops, expert-led sessions, and networking opportunities — practical experience with Gemini AI, Google Cloud Platform, and Android development.",
    eligibility: "Open to all",
    image: googleSolutions,
  },
  
  {
    slug: "syntax",
    name: "SYNTAX",
    category: "Community Event",
    date: "Aug 2025",
    monthYear: "Oct 2025",
    description:
      "A celebration of open source software — contributing to meaningful projects while learning industry-standard tools like Git and GitHub, and building a professional portfolio along the way.",
    eligibility: "Open to all",
    image: syntax,
    venue: "Manekshaw Hall",
  },

  {
    slug: "flutter-workshop",
    name: "Flutter Workshop",
    category: "Workshop",
    date: "10 September 2025",
    monthYear: "Sep 2025",
    description:
      "A hands-on workshop on mobile development with Google's Flutter framework, taking participants from the basics to building a complete app for iOS and Android from a single codebase.",
    eligibility: "Open to all",
    image: flutterWorkshop,
  },
  
  {
    slug: "ml-study-jam",
    name: "ML Study Jam",
    category: "Study Jam",
    date: "30 November 2025",
    monthYear: "Nov 2025",
    description:
      "A collaborative, hands-on study jam building real machine learning models with industry-standard tools like TensorFlow and Kaggle — from first principles to a working portfolio project.",
    eligibility: "Open to all",
    image: mlStudyJam,
  },
  {
    slug: "hacktoberfest",
    name: "Hacktober Fest",
    category: "Community Event",
    date: "5 October 2025",
    monthYear: "Oct 2025",
    description:
      "A celebration of open source software — contributing to meaningful projects while learning industry-standard tools like Git and GitHub, and building a professional portfolio along the way.",
    eligibility: "Open to all",
    image: hacktoberfest,
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}

export function isPastEvent(event: Event): boolean {
  const parsed = new Date(event.monthYear);
  if (Number.isNaN(parsed.getTime())) return true;

  const endOfMonth = new Date(parsed.getFullYear(), parsed.getMonth() + 1, 0);
  return endOfMonth.getTime() < Date.now();
}

export function getRelatedEvents(slug: string, count = 3): Event[] {
  const current = getEventBySlug(slug);
  if (!current) return [];

  const others = events.filter((event) => event.slug !== slug);
  const sameCategory = others.filter((event) => event.category === current.category);
  const rest = others.filter((event) => event.category !== current.category);

  return [...sameCategory, ...rest].slice(0, count);
}
