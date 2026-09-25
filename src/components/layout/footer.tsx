import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";
import { GdgMark } from "@/components/ui/gdg-mark";
import { address, collaborateLink, mainNav, socialLinks } from "@/data/navigation";
import { cn } from "@/lib/utils/cn";
import { formatIndex } from "@/lib/utils/format";
import { externalLinkProps } from "@/lib/utils/links";

import { BackToTop } from "./back-to-top";
import { Container } from "./container";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <Container className="grid gap-x-8 gap-y-16 pt-16 pb-14 md:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <GdgMark label="Google Developer Groups" className="h-9 w-auto md:h-11" />
          <p className="mt-8 max-w-[14ch] text-heading-lg">Google Developer Groups on Campus</p>
          <p className="mt-4 text-lead text-fg-muted">Army Institute of Technology, Pune</p>
          <ButtonLink href={collaborateLink.href} variant="secondary" accent="green" className="mt-10">
            {collaborateLink.label}
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-6">
          <FooterColumn title="Explore">
            {mainNav.map((item, index) => (
              <li key={item.href}>
                <a href={item.href} className="group flex items-baseline gap-2.5">
                  <span className="font-mono text-caption text-fg-subtle">{formatIndex(index)}</span>
                  <span className="link-underline">{item.label}</span>
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Connect">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-underline" {...externalLinkProps(link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Visit" className="col-span-2 sm:col-span-1">
            {address.map((line) => (
              <li key={line} className="text-fg-muted">
                {line}
              </li>
            ))}
          </FooterColumn>
        </div>
      </Container>

      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 font-mono text-label text-fg-subtle">
          <p>© {year} GDG on Campus AIT Pune</p>
          <BackToTop />
        </div>
      </Container>

      <div aria-hidden className="bg-spectrum h-1.5" />
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("text-small", className)}>
      <h2 className="font-mono text-label text-fg-subtle">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}
