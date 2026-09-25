"use client";

import { m, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/motion/magnetic";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { accentVars } from "@/config/brand";
import { joinLink, mainNav } from "@/data/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils/cn";
import { formatIndex } from "@/lib/utils/format";
import { MEDIA } from "@/lib/utils/media";

import { MobileMenu } from "./mobile-menu";

const sectionIds = mainNav.map((item) => item.href.split("#")[1] ?? "");

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery(MEDIA.up("lg"));
  const activeId = useActiveSection(sectionIds);

  const { scrollY, scrollYProgress } = useScroll();
  const progressClip = useTransform(scrollYProgress, (value) => `inset(0 ${100 - value * 100}% 0 0)`);

  useMotionValueEvent(scrollY, "change", (y) => setIsScrolled(y > 24));

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const showMenu = isMenuOpen && !isDesktop;

  return (
    <header
      data-scrolled={isScrolled || undefined}
      className="group/header fixed inset-x-0 top-0 z-(--z-header)"
    >
      <div
        className={cn(
          "relative z-10 border-b border-transparent transition-[background-color,border-color] duration-(--duration-slow) ease-out",
          "group-data-scrolled/header:border-line group-data-scrolled/header:bg-canvas/92 group-data-scrolled/header:backdrop-blur-md",
        )}
      >
        <Container className="flex h-22 items-center justify-between gap-6 transition-[height] duration-(--duration-slow) ease-out group-data-scrolled/header:h-16">
          <Link href="/" aria-label="GDG AIT Pune, home" className="-m-2 rounded-sm p-2">
            <Logo />
          </Link>

          <DesktopLinks activeId={activeId} />

          <div className="flex items-center gap-2">
            <Magnetic className="hidden lg:inline-flex">
              <ButtonLink href={joinLink.href} accent="green">
                {joinLink.label}
              </ButtonLink>
            </Magnetic>
            <MenuButton isOpen={showMenu} onToggle={() => setIsMenuOpen((open) => !open)} />
          </div>
        </Container>

        <m.div
          aria-hidden
          style={{ clipPath: progressClip }}
          className="bg-spectrum absolute inset-x-0 -bottom-px h-0.5"
        />
      </div>

      <MobileMenu isOpen={showMenu} onClose={closeMenu} activeId={activeId} />
    </header>
  );
}

function DesktopLinks({ activeId }: { activeId: string | null }) {
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center">
        {mainNav.map((item, index) => {
          const isActive = item.href.endsWith(`#${activeId}`);

          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                style={accentVars(item.accent)}
                className="group flex items-center gap-2 px-3.5 py-2 text-small text-fg-muted transition-colors duration-(--duration-base) hover:text-ink aria-[current]:text-ink"
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 bg-(--accent) transition-transform duration-(--duration-base) ease-out group-hover:scale-100",
                    isActive ? "scale-100" : "scale-0",
                  )}
                />
                <span className="font-mono text-caption text-fg-subtle tabular-nums">{formatIndex(index)}</span>
                <span className="link-underline">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MenuButton({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className="flex h-11 items-center gap-3 rounded-full bg-ink pr-4 pl-5 text-small font-medium text-canvas transition-transform active:scale-[0.97] lg:hidden"
    >
      <span className="w-10 text-left">{isOpen ? "Close" : "Menu"}</span>
      <span aria-hidden className="relative h-2.5 w-4">
        <span
          className={cn(
            "absolute top-0 left-0 h-px w-full bg-current transition-transform duration-(--duration-base) ease-out",
            isOpen && "translate-y-[4.5px] rotate-45",
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-(--duration-base) ease-out",
            isOpen && "-translate-y-[4.5px] -rotate-45",
          )}
        />
      </span>
    </button>
  );
}
