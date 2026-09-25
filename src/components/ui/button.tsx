import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { accentVars, type Accent } from "@/config/brand";
import { cn } from "@/lib/utils/cn";
import { externalLinkProps } from "@/lib/utils/links";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

interface ButtonStyleProps {
  variant?: Variant;
  size?: Size;
  accent?: Accent;
}

const variantClasses: Record<Variant, { root: string; flood: string; icon: string }> = {
  primary: {
    root: "bg-ink text-canvas hover:text-ink focus-visible:text-ink",
    flood: "bg-(--accent)",
    icon: "bg-(--accent)",
  },
  secondary: {
    root: "bg-surface text-ink shadow-hairline hover:shadow-raised",
    flood: "bg-(--accent-soft)",
    icon: "bg-sunken group-hover:bg-(--accent) group-focus-visible:bg-(--accent)",
  },
};

const sizeClasses: Record<Size, { root: string; icon: string }> = {
  md: { root: "h-11 gap-3 pr-1.5 pl-5 text-small", icon: "size-8" },
  lg: { root: "h-14 gap-4 pr-2 pl-7 text-body", icon: "size-10" },
};

function buttonClassName(variant: Variant, size: Size, className?: string) {
  return cn(
    "group relative isolate inline-flex shrink-0 items-center overflow-hidden rounded-full font-medium whitespace-nowrap",
    "transition-[color,box-shadow,scale] duration-(--duration-base) ease-out active:scale-[0.97]",
    variantClasses[variant].root,
    sizeClasses[size].root,
    className,
  );
}

function ButtonContent({ variant, size, children }: { variant: Variant; size: Size; children: ReactNode }) {
  const iconSize = sizeClasses[size].icon;

  return (
    <>
      {/* Grows out of the icon to fill the button. */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 -z-10 -translate-y-1/2 scale-0 rounded-full",
          "transition-transform duration-(--duration-slow) ease-out group-hover:scale-[16] group-focus-visible:scale-[16]",
          size === "md" ? "right-1.5" : "right-2",
          iconSize,
          variantClasses[variant].flood,
        )}
      />
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden rounded-full text-ink transition-colors",
          iconSize,
          variantClasses[variant].icon,
        )}
      >
        <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) ease-out group-hover:translate-x-5 group-hover:-translate-y-5" />
        <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-(--duration-base) ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </>
  );
}

type ButtonLinkProps = ComponentProps<"a"> & ButtonStyleProps;

export function ButtonLink({
  variant = "primary",
  size = "md",
  accent = "blue",
  className,
  style,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      data-cursor="button"
      className={buttonClassName(variant, size, className)}
      style={{ ...accentVars(accent), ...style }}
      {...externalLinkProps(props.href)}
      {...props}
    >
      <ButtonContent variant={variant} size={size}>
        {children}
      </ButtonContent>
    </a>
  );
}

type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

export function Button({
  variant = "primary",
  size = "md",
  accent = "blue",
  className,
  style,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-cursor="button"
      className={buttonClassName(variant, size, className)}
      style={{ ...accentVars(accent), ...style }}
      {...props}
    >
      <ButtonContent variant={variant} size={size}>
        {children}
      </ButtonContent>
    </button>
  );
}
