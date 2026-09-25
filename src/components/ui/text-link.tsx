import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";
import { externalLinkProps, isExternal } from "@/lib/utils/links";

export function TextLink({ href, className, children, ...props }: ComponentProps<"a">) {
  return (
    <a
      href={href}
      data-cursor="link"
      className={cn(
        "group font-medium text-ink transition-colors duration-(--duration-base) hover:text-blue-strong",
        className,
      )}
      {...externalLinkProps(href)}
      {...props}
    >
      <span className="link-underline pb-0.5 [--link-baseline:var(--color-line-strong)]">{children}</span>
      {isExternal(href) && (
        <ArrowUpRight
          aria-hidden
          className="ml-0.5 inline size-[0.9em] align-[-0.05em] transition-transform duration-(--duration-base) ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </a>
  );
}
