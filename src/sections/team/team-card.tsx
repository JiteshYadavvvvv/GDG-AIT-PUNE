import Image from "next/image";
import type { CSSProperties } from "react";

import { RevealFade } from "@/components/motion/reveal-fade";
import { accentVars, type Accent } from "@/config/brand";
import { externalLinkProps } from "@/lib/utils/links";

import type { TeamMember } from "./data";

interface TeamCardProps {
  member: TeamMember;
  accent: Accent;
  delay?: number;
  rotation?: number;
  className?: string;
}

export function TeamCard({ member, accent, delay = 0, rotation = 0, className }: TeamCardProps) {
  const style = { ...accentVars(accent), "--rotate": `${rotation}deg` } as CSSProperties;

  return (
    <RevealFade delay={delay} className={className}>
      <div style={style} className="group relative h-full">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-2 translate-y-2 rotate-(--rotate) rounded-lg border-2 border-ink bg-ink transition-[background-color,translate,rotate] duration-(--duration-slow) ease-out group-hover:translate-x-3 group-hover:translate-y-3.5 group-hover:rotate-0 group-hover:bg-(--accent) max-sm:rotate-0"
        />

        <div className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-ink bg-surface rotate-(--rotate) transition-[translate,scale,rotate] duration-(--duration-slow) ease-out group-hover:-translate-y-2 group-hover:scale-[1.015] group-hover:rotate-0 max-sm:rotate-0">
          <div className="flex items-center gap-1.5 border-b-2 border-ink bg-sunken px-3 py-2">
            <span className="flex gap-1">
              <span className="size-2 rounded-full bg-blue" />
              <span className="size-2 rounded-full bg-red" />
              <span className="size-2 rounded-full bg-yellow" />
              <span className="size-2 rounded-full bg-green" />
            </span>

            {member.instagram && (
              <a
                href={`https://instagram.com/${member.instagram}`}
                {...externalLinkProps(`https://instagram.com/${member.instagram}`)}
                className="link-underline ml-auto truncate font-mono text-caption text-fg-muted transition-colors duration-(--duration-base) hover:text-ink"
              >
                @{member.instagram}
              </a>
            )}
          </div>

          <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink bg-sunken">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-top transition-transform duration-(--duration-slower) ease-out group-hover:scale-[1.04]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-0.5 px-4 py-4">
            <h3 className="text-heading-sm font-bold text-ink transition-colors duration-(--duration-base) group-hover:text-(--accent-strong)">
              {member.name}
            </h3>
            <p className="font-mono text-caption text-fg-subtle uppercase">{member.role}</p>
          </div>
        </div>
      </div>
    </RevealFade>
  );
}
