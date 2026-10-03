import { ArrowUpRight, Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { RevealFade } from "@/components/motion/reveal-fade";
import { ButtonLink } from "@/components/ui/button";
import { GdgMark } from "@/components/ui/gdg-mark";
import { accentVars, accents, type Accent } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { address, collaborateLink, mainNav, socialLinks } from "@/data/navigation";
import { externalLinkProps } from "@/lib/utils/links";

import { BackToTop } from "./back-to-top";
import { Container } from "./container";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./footer-icons";

const year = new Date().getFullYear();

const instagram = socialLinks.find((link) => link.label === "Instagram");
const linkedin = socialLinks.find((link) => link.label === "LinkedIn");

const GITHUB_ORG_URL = "https://github.com/GDG-AIT-PUNE";
const GITHUB_STAR_URL = "https://github.com/JiteshYadavvvvv";

interface ContactLink {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:gdsc.ait.26@gmail.com", icon: Mail },
  ...(linkedin ? [{ label: "LinkedIn", href: linkedin.href, icon: LinkedinIcon }] : []),
  ...(instagram ? [{ label: "Instagram", href: instagram.href, icon: InstagramIcon }] : []),
  { label: "GitHub", href: GITHUB_ORG_URL, icon: GithubIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080808] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <RevealFade>
        <Container className="relative grid gap-14 pt-20 pb-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <div className="relative inline-block shrink-0">
                <div aria-hidden className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-lg bg-blue" />
                <div className="relative flex size-14 items-center justify-center rounded-lg border-2 border-white/15 bg-white">
                  <GdgMark label="GDG AIT Pune" className="h-7 w-auto" />
                </div>
              </div>

              <div>
                <p className="text-heading-sm font-black tracking-tight text-white uppercase">GDG AIT Pune</p>
                <p className="mt-1 font-mono text-caption tracking-wide text-white/35 uppercase">{address[0]}</p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-small text-white/50">{siteConfig.description}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {contactLinks.map((link, index) => (
                <FooterIconButton key={link.label} link={link} accent={accents[index % accents.length]!} />
              ))}
            </div>

            <a
              href={GITHUB_STAR_URL}
              {...externalLinkProps(GITHUB_STAR_URL)}
              className="group mt-6 inline-flex items-center gap-1.5 font-mono text-caption text-white/40 transition-colors duration-(--duration-base) hover:text-white"
            >
              Star us on GitHub
              <ArrowUpRight className="size-3 transition-transform duration-(--duration-base) ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="hidden lg:col-span-3 lg:col-start-7 lg:block">
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="h-px w-5 bg-white/20" />
              <p className="font-mono text-label tracking-[0.2em] text-white/35 uppercase">Navigation</p>
            </div>

            <ul className="mt-6 space-y-3.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    style={accentVars(item.accent)}
                    className="group inline-flex items-center gap-2 text-lead font-semibold text-white/80 transition-colors duration-(--duration-base) hover:text-white"
                  >
                    <span
                      aria-hidden
                      className="size-1 scale-0 rounded-full bg-(--accent) transition-transform duration-(--duration-base) ease-out group-hover:scale-100"
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-5 lg:col-span-3 lg:col-start-10 lg:items-end">
            <BackToTop />

            <div className="flex max-w-xl flex-col items-center rounded-xl border border-white/10 bg-white/3 p-5 text-center">
              <p className="font-mono text-small text-white/55">
                Wanna collaborate with us?
                <br />
                Just fill out the form.
              </p>
              <ButtonLink href={collaborateLink.href} variant="secondary" size="md" className="mt-4">
                {collaborateLink.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </RevealFade>

      <Container className="relative">
        <div aria-hidden className="border-t border-white/10" />
      </Container>

      <Container className="relative py-6">
        <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-caption tracking-wide text-white/35 uppercase">
          <span>
            © {year} GDG AIT Pune
          </span>
          <span aria-hidden className="size-1 rounded-full bg-white/20" />
          <span>Made with ♡ by the GDG AIT Pune</span>
        </p>
      </Container>

      <div aria-hidden className="bg-spectrum h-1" />
    </footer>
  );
}

function FooterIconButton({ link, accent }: { link: ContactLink; accent: Accent }) {
  const Icon = link.icon;

  return (
    <div style={accentVars(accent)} className="group relative">
      <div
        aria-hidden
        className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-white/15 transition-[background-color,translate] duration-(--duration-base) ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:bg-(--accent)"
      />
      <a
        href={link.href}
        {...externalLinkProps(link.href)}
        aria-label={link.label}
        className="relative grid size-10 place-items-center rounded-md border-2 border-white/15 bg-white text-ink transition-transform duration-(--duration-base) ease-out group-hover:-translate-y-1"
      >
        <Icon className="size-4.5" />
      </a>
    </div>
  );
}
