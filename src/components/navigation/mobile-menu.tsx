"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { useLenis } from "@/components/motion/smooth-scroll";
import { ButtonLink } from "@/components/ui/button";
import { accentVars } from "@/config/brand";
import { joinLink, mainNav, socialLinks } from "@/data/navigation";
import { EASE } from "@/lib/animations/tokens";
import { cn } from "@/lib/utils/cn";
import { formatIndex } from "@/lib/utils/format";
import { externalLinkProps } from "@/lib/utils/links";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeId: string | null;
}

export function MobileMenu({ isOpen, onClose, activeId }: MobileMenuProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, lenis, onClose]);

  function handleLinkClick() {
    lenis?.start();
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          id="mobile-menu"
          data-lenis-prevent
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.45, ease: EASE.inOut.bezier } }}
          transition={{ duration: 0.7, ease: EASE.inOut.bezier }}
          className="fixed inset-0 overflow-y-auto bg-canvas pt-22 lg:hidden"
        >
          <Container className="flex min-h-full flex-col pb-8">
            <nav aria-label="Main">
              <ul className="border-t border-line">
                {mainNav.map((item, index) => {
                  const isActive = item.href.endsWith(`#${activeId}`);

                  return (
                    <li key={item.href} className="overflow-hidden border-b border-line">
                      <m.a
                        href={item.href}
                        onClick={handleLinkClick}
                        aria-current={isActive ? "location" : undefined}
                        style={accentVars(item.accent)}
                        initial={{ y: "105%" }}
                        animate={{ y: "0%" }}
                        transition={{ delay: 0.2 + index * 0.05, duration: 0.8, ease: EASE.out.bezier }}
                        className="flex items-center gap-4 py-4 text-heading-lg"
                      >
                        <span className="w-6 font-mono text-label text-fg-subtle">{formatIndex(index)}</span>
                        <span>{item.label}</span>
                        <span
                          aria-hidden
                          className={cn("ml-auto size-2 bg-(--accent)", !isActive && "opacity-0")}
                        />
                      </m.a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <m.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6, ease: EASE.out.bezier }}
              className="mt-auto pt-12"
            >
              <ButtonLink href={joinLink.href} onClick={handleLinkClick} accent="green" size="lg" className="w-full justify-between">
                {joinLink.label}
              </ButtonLink>
              <ul className="mt-8 flex items-center justify-center gap-6 font-mono text-label text-fg-muted">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="link-underline" {...externalLinkProps(link.href)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          </Container>
        </m.div>
      )}
    </AnimatePresence>
  );
}
