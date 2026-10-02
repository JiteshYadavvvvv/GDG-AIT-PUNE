import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { RevealFade } from "@/components/motion/reveal-fade";
import { accentVars } from "@/config/brand";
import { externalLinkProps } from "@/lib/utils/links";

import type { Project } from "./data";

interface ProjectCardProps {
  project: Project;
  delay?: number;
  rotation?: number;
  className?: string;
}

export function ProjectCard({ project, delay = 0, rotation = 0, className }: ProjectCardProps) {
  const style = { ...accentVars(project.accent), "--rotate": `${rotation}deg` } as CSSProperties;

  return (
    <RevealFade delay={delay} className={className}>
      <div style={style} className="group relative h-full">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-2 translate-y-2 rotate-(--rotate) rounded-lg border-2 border-ink bg-ink transition-[background-color,translate,rotate] duration-(--duration-slow) ease-out group-hover:translate-x-3 group-hover:translate-y-3.5 group-hover:rotate-0 group-hover:bg-(--accent) max-sm:rotate-0"
        />

        <a
          href={project.url}
          {...externalLinkProps(project.url)}
          data-cursor="view"
          className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-ink bg-surface rotate-(--rotate) transition-[translate,scale,rotate] duration-(--duration-slow) ease-out group-hover:-translate-y-2 group-hover:scale-[1.015] group-hover:rotate-0 active:scale-[0.985] max-sm:rotate-0"
        >
          <div className="relative aspect-[36/25] overflow-hidden border-b-2 border-ink bg-sunken">
            <Image
              src={project.image}
              alt={`${project.name} website screenshot`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-(--duration-slower) ease-out group-hover:scale-[1.04]"
            />
          </div>

          <div className="flex flex-1 items-start justify-between gap-4 px-5 py-4">
            <div>
              <h3 className="text-heading-sm font-bold text-ink transition-colors duration-(--duration-base) group-hover:text-(--accent-strong)">
                {project.name}
              </h3>
              <p className="mt-1.5 text-small text-fg-muted">{project.description}</p>
            </div>

            <span
              aria-hidden
              className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-sunken transition-colors duration-(--duration-base) group-hover:bg-(--accent)"
            >
              <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) ease-out group-hover:rotate-45" />
            </span>
          </div>
        </a>
      </div>
    </RevealFade>
  );
}
