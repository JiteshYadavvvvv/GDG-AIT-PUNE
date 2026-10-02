"use client";

import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { FOLLOW, SPRING } from "@/lib/animations/tokens";
import { cn } from "@/lib/utils/cn";
import { MEDIA } from "@/lib/utils/media";

type CursorState = "default" | "link" | "button" | "view" | "interactive" | "text";

const CURSOR_STATES: CursorState[] = ["default", "link", "button", "view", "interactive", "text"];

const DEFAULT_LABELS: Partial<Record<CursorState, string>> = { view: "View" };

const RING = {
  default: { size: 30, fill: "rgba(21, 20, 17, 0)", border: "rgba(21, 20, 17, 0.28)" },
  link: { size: 52, fill: "rgba(66, 133, 244, 0.14)", border: "rgba(66, 133, 244, 0)" },
  button: { size: 18, fill: "rgba(21, 20, 17, 0.1)", border: "rgba(21, 20, 17, 0)" },
  view: { size: 92, fill: "rgba(21, 20, 17, 0.92)", border: "rgba(21, 20, 17, 0)" },
  interactive: { size: 72, fill: "rgba(255, 255, 255, 0.5)", border: "rgba(21, 20, 17, 0.35)" },
  text: { size: 0, fill: "rgba(21, 20, 17, 0)", border: "rgba(21, 20, 17, 0)" },
} satisfies Record<CursorState, { size: number; fill: string; border: string }>;

const DOT_RADIUS: Record<CursorState, number> = {
  default: 15,
  link: 30,
  button: 13,
  view: 38,
  interactive: 44,
  text: 0,
};

const DOTS = [
  { color: "var(--color-blue)", x: 0, y: -1 },
  { color: "var(--color-red)", x: 1, y: 0 },
  { color: "var(--color-yellow)", x: 0, y: 1 },
  { color: "var(--color-green)", x: -1, y: 0 },
];

export function CustomCursor() {
  const hasMouse = useMediaQuery(MEDIA.finePointer);
  const reducedMotion = usePrefersReducedMotion();

  if (!hasMouse || reducedMotion) return null;
  return <CursorFollower />;
}

function CursorFollower() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, FOLLOW.cursor);
  const y = useSpring(pointerY, FOLLOW.cursor);
  const hasMoved = useRef(false);

  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        setIsVisible(false);
        return;
      }
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      if (!hasMoved.current) {
        x.jump(event.clientX);
        y.jump(event.clientY);
        hasMoved.current = true;
      }
      setIsVisible(true);
    }

    function handlePointerOver(event: PointerEvent) {
      const target = readTarget(event.target);
      setState(target.state);
      setLabel(target.label);
    }

    const hide = () => setIsVisible(false);
    const press = () => setIsPressed(true);
    const release = () => setIsPressed(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver);
    root.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      root.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [pointerX, pointerY, x, y]);

  const ring = RING[state];
  const radius = DOT_RADIUS[state];

  return (
    <m.div
      aria-hidden
      style={{ x, y }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="pointer-events-none fixed top-0 left-0 z-(--z-cursor)"
    >
      <m.div
        animate={{
          width: ring.size,
          height: ring.size,
          backgroundColor: ring.fill,
          borderColor: ring.border,
          scale: isPressed ? 0.85 : 1,
        }}
        transition={SPRING.snappy}
        className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border"
      >
        <AnimatePresence>
          {label && (
            <m.span
              key={label}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              className={cn("font-mono text-label", state === "view" ? "text-canvas" : "text-ink")}
            >
              {label}
            </m.span>
          )}
        </AnimatePresence>
      </m.div>

      <m.div
        animate={{ rotate: state === "link" || state === "interactive" ? 45 : 0 }}
        transition={SPRING.soft}
        className="absolute"
      >
        {DOTS.map((dot) => (
          <m.span
            key={dot.color}
            animate={{ x: dot.x * radius, y: dot.y * radius, scale: state === "text" ? 0 : 1 }}
            transition={SPRING.snappy}
            style={{ backgroundColor: dot.color }}
            className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
        ))}
      </m.div>
    </m.div>
  );
}

function readTarget(target: EventTarget | null): { state: CursorState; label: string } {
  if (!(target instanceof Element)) return { state: "default", label: "" };

  const marked = target.closest<HTMLElement>("[data-cursor]");
  if (marked) {
    const value = marked.dataset.cursor as CursorState;
    const state = CURSOR_STATES.includes(value) ? value : "default";
    return { state, label: marked.dataset.cursorLabel ?? DEFAULT_LABELS[state] ?? "" };
  }

  if (target.closest("input, textarea, select, [contenteditable='true']")) return { state: "text", label: "" };
  if (target.closest("button, [role='button'], summary, label")) return { state: "button", label: "" };
  if (target.closest("a[href]")) return { state: "link", label: "" };
  return { state: "default", label: "" };
}
