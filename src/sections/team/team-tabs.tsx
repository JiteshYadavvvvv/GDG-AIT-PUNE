"use client";

import { m } from "motion/react";

import { accentVars, type Accent } from "@/config/brand";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SPRING } from "@/lib/animations/tokens";
import { cn } from "@/lib/utils/cn";

import type { TeamGroupName } from "./data";

interface TeamTabsProps {
  groups: TeamGroupName[];
  selected: TeamGroupName;
  onSelect: (group: TeamGroupName) => void;
  accent: Accent;
}

export function TeamTabs({ groups, selected, onSelect, accent }: TeamTabsProps) {
  const reducedMotion = usePrefersReducedMotion();
  const pillTransition = reducedMotion ? { duration: 0 } : SPRING.snappy;

  return (
    <div className="flex justify-center">
      <div
        role="tablist"
        aria-label="Team groups"
        style={accentVars(accent)}
        className="flex w-full max-w-full items-center justify-around gap-1 rounded-full border-2 border-ink bg-ink p-1.5 sm:w-auto lg:min-w-[55vw]"
      >
        {groups.map((group) => {
          const isActive = group === selected;

          return (
            <button
              key={group}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(group)}
              className={cn(
                "relative isolate shrink-0 rounded-full px-2 py-2.5 font-mono text-[0.6rem] font-semibold whitespace-nowrap uppercase transition-colors duration-(--duration-base) sm:px-5 sm:text-label",
                isActive ? "text-canvas underline sm:text-ink sm:no-underline" : "text-canvas/70 hover:text-canvas",
              )}
            >
              {isActive && (
                <m.span
                  layoutId="active-team-tab"
                  transition={pillTransition}
                  className="absolute inset-0 -z-10 hidden rounded-full bg-(--accent) sm:block"
                />
              )}
              {group}
            </button>
          );
        })}
      </div>
    </div>
  );
}
