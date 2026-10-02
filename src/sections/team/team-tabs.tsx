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
        className="flex flex-wrap items-center justify-center gap-1 rounded-full border-2 border-ink bg-ink p-1.5"
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
                "relative isolate rounded-full px-5 py-2.5 font-mono text-label font-semibold uppercase transition-colors duration-(--duration-base)",
                isActive ? "text-ink" : "text-canvas/70 hover:text-canvas",
              )}
            >
              {isActive && (
                <m.span
                  layoutId="active-team-tab"
                  transition={pillTransition}
                  className="absolute inset-0 -z-10 rounded-full bg-(--accent)"
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
