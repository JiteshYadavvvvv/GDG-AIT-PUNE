import type { Accent } from "@/config/brand";

export interface NavItem {
  label: string;
  href: string;
  accent: Accent;
}

export const mainNav: NavItem[] = [
  { label: "About", href: "/#about", accent: "blue" },
  { label: "Events", href: "/#events", accent: "red" },
  { label: "Team", href: "/#team", accent: "green" },
  { label: "Projects", href: "/#projects", accent: "yellow" },
  { label: "Community", href: "/#community", accent: "blue" },
];

export const joinLink = { label: "Collaborate", href: "https://forms.gle/Ctrntqzq9KQZy9EL9" };

export const collaborateLink = {
  label: "Collaborate with us",
  href: "https://forms.gle/Ctrntqzq9KQZy9EL9",
};

export const socialLinks = [
  { label: "Email", href: "mailto:gdsc.ait.26@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/gdsc_aitpune/" },
  { label: "Github", href: "https://github.com/GDG-AIT-PUNE"},
  { label: "LinkedIn", href: "https://www.linkedin.com/company/gdsc-aitpune/" },
];

export const address = ["Army Institute of Technology", "Pune, Maharashtra 411015"];
