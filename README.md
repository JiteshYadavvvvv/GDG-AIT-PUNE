# GDG AIT Pune — website

Google Developer Groups on Campus, Army Institute of Technology, Pune.

A fresh Next.js application. The previous React + Vite site is kept outside
this project (`../legacy-site/`) as a **read-only source of content and assets**.
None of its components, layout or styling architecture are reused.

> **Status: Stage 0 (foundation).** `/` is a temporary environment-check page.
> Stage 1 deletes `src/app/_environment-check/` and builds the real homepage.

## Stack

| Concern | Library |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4, tokens in `src/styles/theme.css` |
| Scroll choreography | GSAP + ScrollTrigger (`@gsap/react` → `useGSAP`) |
| Component motion | Motion (`motion/react`, formerly Framer Motion) |
| Smooth scroll | Lenis |
| 3D | three, @react-three/fiber, @react-three/drei |
| Icons / utils | lucide-react, clsx + tailwind-merge (`cn`) |

## Scripts

```bash
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run start      # serve the production build
npm run lint       # ESLint (Next + architecture guard-rails)
npm run typecheck  # tsc --noEmit
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) for canonical/OG URLs.
On Vercel it falls back to the production domain automatically.

## Structure

```
src/
  app/                  routes, root layout, metadata files (icon, OG image, robots, sitemap)
    providers.tsx       Motion + Lenis providers (client)
    _environment-check/ Stage 0 only — delete in Stage 1
  components/
    motion/             MotionProvider, SmoothScroll (+ useLenis)
    three/              LazyScene (public API), SceneCanvas (lazy-loaded)
  config/site.ts        name, description, URL, theme colour
  hooks/                useMediaQuery, usePrefersReducedMotion
  lib/
    animations/         gsap.ts (only GSAP entry point), tokens.ts, motion-features.ts
    three/quality.ts    device quality tiers for 3D
    utils/              cn, media queries / breakpoints
  styles/               theme.css (tokens), base.css (element defaults)
```

Folders are created when they get their first real file. Planned homes:

- `src/sections/<name>/` — one folder per page section (hero, manifesto,
  ecosystem, technologies, events, projects, memories, team, community,
  footer). Section-only components, scenes and animations live inside it.
- `src/components/{ui,layout,navigation,common}/` — shared, section-agnostic
  components.
- `src/data/` — content as typed data (events, team, links), separate from
  presentation. `src/types/` for shared types. Static images → `public/` or
  imported from `src/assets/` for `next/image` optimisation.

## Animation ownership

One owner per element property — never animate the same property of the same
element with GSAP and Motion.

- **GSAP + ScrollTrigger** — scroll-driven timelines, pinning, horizontal
  scroll, large spatial moves. Always import from `@/lib/animations/gsap`
  and animate inside `useGSAP(() => …, { scope })`; it wraps `gsap.context()`
  so tweens and ScrollTriggers are reverted on unmount.
- **Motion** — hover/tap, presence, layout, UI state. Use `m.*` components
  (LazyMotion is strict). Shared easing/duration/spring values live in
  `lib/animations/tokens.ts` and mirror the CSS `--ease-*` tokens.
- **Lenis** — owns scrolling; stepped by GSAP's ticker and synced with
  ScrollTrigger in `SmoothScroll`. Use `useLenis()?.scrollTo(target)` for
  programmatic scrolls; add `data-lenis-prevent` to nested scroll areas.
- **R3F / three** — only for genuine 3D. Always through `LazyScene`.

ESLint enforces the import rules (direct `gsap`, `gsap/*`, `framer-motion`
and Motion's `motion` export are errors outside `lib/animations`).

## 3D

```tsx
const NetworkField = lazy(() => import("./network-field"));

<LazyScene className="h-dvh" fallback={<StaticPoster />} label="…optional">
  <NetworkField />
</LazyScene>
```

`LazyScene` fetches three/R3F only when the scene nears the viewport, stops
the render loop offscreen, renders still frames under reduced motion, and
shows `fallback` until WebGL is ready (or if it fails). Inside a scene,
scale work with `useSceneQuality().density`; DPR adapts to measured FPS.

## Design tokens

`src/styles/theme.css` is the source of truth. Tailwind's default palette and
scales are reset, so only system tokens exist:

- Colour: `gdg-{blue,red,yellow,green}` (accents), `neutral-50…1000`, and
  semantic roles — `canvas`, `surface`, `surface-raised`, `fg`, `fg-muted`,
  `fg-subtle`, `line`, `line-strong`, `on-accent`, `focus`. Components use the
  semantic roles. `data-theme="light"` re-scopes them for a subtree.
- Text on filled GDG colours must use `text-on-accent` (white fails contrast).
- Type: `text-display`, `text-heading-{xl,lg,md,sm}`, `text-body`,
  `text-small`, `text-caption`, `text-label` — fluid 320→1920px, each sets
  size, line-height, tracking and weight. Fonts: Google Sans Flex (`font-sans`,
  `font-display`), Google Sans Code (`font-mono`).
- Layout: `max-w-{prose,content,wide}`, fluid `px-gutter`, `py-section`.
- Depth: `rounded-{xs…2xl}`, `shadow-{raised,overlay,glow-*}`.
- Motion: `ease-{out,in,in-out,standard}`, `duration-(--duration-fast)`.
- Layers: `z-(--z-header)` etc.

When adding a token, update the JS mirrors listed at the top of `theme.css`.

## Responsive

Mobile-first; base styles target 320px. Breakpoints: `xs` 375, `sm` 430,
`md` 768, `lg` 1024, `xl` 1280, `2xl` 1440, `3xl` 1920. Mobile layouts are
designed, not scaled — use container queries (`@container`) for components and
`MEDIA`/`useMediaQuery` when behaviour (not just layout) differs by device.
QA widths: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920.

## Reduced motion

Honoured at every layer: Lenis (1:1 scrolling), Motion (`reducedMotion="user"`),
GSAP (`gsap.matchMedia()` with `MEDIA.motionOK` / `MEDIA.reducedMotion` —
provide a static end state), R3F (still frames), CSS (global safety net).
Content must never depend on an animation running.

## Performance rules

- Heavy client code (3D, large interactive pieces) is loaded with `lazy` /
  `next/dynamic` and mounted near the viewport.
- Images via `next/image` (AVIF/WebP; qualities 60/75/90).
- All animation and listeners are created in `useGSAP` / effects with cleanup.
- Fonts: weight axis only (~50 KB). Adding `opsz` or `wdth` costs ~67 KB each.
