import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { RevealFade } from "@/components/motion/reveal-fade";
import { ButtonLink } from "@/components/ui/button";
import { GdgMark } from "@/components/ui/gdg-mark";
import { accentVars, accents, type Accent } from "@/config/brand";
import { socialLinks } from "@/data/navigation";
import { externalLinkProps } from "@/lib/utils/links";

import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";

const instagram = socialLinks.find((link) => link.label === "Instagram")!;
const linkedin = socialLinks.find((link) => link.label === "LinkedIn")!;

const GITHUB_ORG_URL = "https://github.com/GDG-AIT-PUNE";
const GITHUB_STAR_URL = "https://github.com/JiteshYadavvvvv/GDG-AIT-PUNE";

interface ContactLink {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:gdsc.ait.26@gmail.com", icon: Mail },
  { label: "LinkedIn", href: linkedin.href, icon: LinkedinIcon },
  { label: "Instagram", href: instagram.href, icon: InstagramIcon },
  { label: "GitHub", href: GITHUB_ORG_URL, icon: GithubIcon },
];

export function CommunityPanel() {
  return (
    <RevealFade delay={0.2} className="relative mx-auto mt-14 max-w-5xl rotate-[-0.5deg]">
      <div aria-hidden className="bg-spectrum absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border-2 border-ink" />

      <div className="relative grid gap-8 rounded-2xl border-2 border-ink bg-surface px-8 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-[auto_auto_auto] lg:gap-x-12 lg:gap-y-8 lg:px-14 lg:py-14">
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:self-center">
          <p className="font-mono text-label text-fg-subtle uppercase">Keep building with the</p>
          <h3 className="mt-2 text-heading-lg leading-[0.95] font-black uppercase">
            <span className="text-blue-strong [text-shadow:0.04em_0.04em_0.09em_var(--color-blue)]">
              GDG AIT Pune
            </span>
            <br />
            Community
          </h3>
          <p className="mt-5 max-w-sm text-body text-fg-muted">Learn together. Build together. Grow together.</p>
        </div>

        <RevealFade
          delay={0.3}
          className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:self-center flex justify-center"
        >
          <GdgMark label="GDG AIT Pune" className="h-10 w-auto" />
        </RevealFade>

        <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 lg:self-center flex items-center justify-center gap-3">
          {contactLinks.map((link, index) => (
            <ContactButton key={link.label} link={link} accent={accents[index % accents.length]!} />
          ))}
        </div>

        <div className="order-4 lg:order-none lg:col-start-2 lg:row-start-3 flex justify-center">
          <ButtonLink href={GITHUB_STAR_URL} variant="secondary" size="md" accent="yellow">
            Star us on GitHub
          </ButtonLink>
        </div>
      </div>
    </RevealFade>
  );
}

function ContactButton({ link, accent }: { link: ContactLink; accent: Accent }) {
  const Icon = link.icon;

  return (
    <div style={accentVars(accent)} className="group relative">
      <div
        aria-hidden
        className="absolute inset-0 translate-x-1 translate-y-1 rounded-md border-2 border-ink bg-ink transition-[background-color,translate] duration-(--duration-base) ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:bg-(--accent)"
      />
      <a
        href={link.href}
        {...externalLinkProps(link.href)}
        aria-label={link.label}
        data-cursor="button"
        className="relative grid size-11 place-items-center rounded-md border-2 border-ink bg-surface text-ink transition-transform duration-(--duration-base) ease-out group-hover:-translate-y-1"
      >
        <Icon className="size-5" />
      </a>
    </div>
  );
}
