import { ArrowUpRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import { accentVars, type Accent } from "@/config/brand";
import { cn } from "@/lib/utils/cn";

interface CardProps {
  href: string;
  image: StaticImageData;
  imageAlt: string;
  title: string;
  meta?: string;
  accent?: Accent;
  className?: string;
  mediaClassName?: string;
}

export function Card({
  href,
  image,
  imageAlt,
  title,
  meta,
  accent = "blue",
  className,
  mediaClassName = "aspect-[4/3]",
}: CardProps) {
  return (
    <a
      href={href}
      data-cursor="view"
      style={accentVars(accent)}
      className={cn(
        "group block rounded-lg bg-surface p-2 shadow-raised",
        "transition-[translate,box-shadow] duration-(--duration-slow) ease-out hover:-translate-y-1.5 hover:shadow-floating",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden rounded-md bg-sunken", mediaClassName)}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-(--duration-slower) ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex items-start justify-between gap-4 px-3 pt-4 pb-3">
        <div>
          {meta && <p className="font-mono text-label text-fg-subtle">{meta}</p>}
          <h3 className="mt-1.5 text-heading-sm">{title}</h3>
        </div>
        <span
          aria-hidden
          className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-sunken transition-colors duration-(--duration-base) group-hover:bg-(--accent)"
        >
          <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) ease-out group-hover:rotate-45" />
        </span>
      </div>
    </a>
  );
}
