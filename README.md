# GDG AIT Pune — website

Website of Google Developer Groups on Campus, Army Institute of Technology, Pune.

`/` currently shows a design system preview (`src/app/_preview/`). It is removed once the homepage
sections are in place.

## Stack

| Concern | Library |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4, tokens in `src/styles/theme.css` |
| Scroll choreography | GSAP, ScrollTrigger, SplitText (`useGSAP`) |
| UI motion | Motion (`motion/react`, formerly Framer Motion) |
| Smooth scroll | Lenis |
| 3D | three, @react-three/fiber, @react-three/drei |
| Icons / utils | lucide-react, clsx + tailwind-merge (`cn`) |

## Scripts

```bash
npm run dev        # http://localhost:3000
npm run build      # production build (type-checks too)
npm run start      # serve the production build
npm run lint
npm run typecheck
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) for canonical and Open Graph URLs. On Vercel it falls
back to the production domain.

## Structure

```
src/
  app/                  layout, page, metadata files (icon, apple-icon, OG image, robots, sitemap)
  components/
    common/             custom cursor
    layout/             Container, Section, SiteBackground, Footer
    navigation/         Navbar, MobileMenu
    motion/             providers (Motion, Lenis), RevealText, RevealMedia, Parallax, Magnetic
    three/              LazyScene, SceneCanvas, StudioLighting
    ui/                 Button, TextLink, Card, SectionLabel, Logo, GdgMark
  config/               site identity, brand colours
  data/                 navigation, links, contact
  hooks/                useMediaQuery, useActiveSection
  lib/
    animations/         gsap.ts (only GSAP entry point), tokens.ts
    three/              quality tiers, material presets
    utils/              cn, media queries, formatting, link helpers
  styles/               theme.css (tokens), base.css, utilities.css, scrollbar.css
```

Page sections go in `src/sections/<name>/`, one folder each, with their own components, scenes and
animations. Content lives in `src/data/`, separate from presentation.

## Visual system

- **Paper and ink.** Warm off-white canvas (`#FAF9F6`), near-black ink (`#151411`), white raised
  surfaces, hairline borders, soft layered shadows. No hard offset shadows.
- **Four colours with restraint.** `blue`, `red`, `yellow`, `green` are fills and graphics; the
  `-strong` shades are text-safe on paper; the `-soft` tints are for surfaces. Ink text passes AA on
  all four brand fills. `accentVars(accent)` exposes one accent as `--accent` / `--accent-strong` /
  `--accent-soft` for `bg-(--accent)` and friends.
- **Structure you can see.** Fixed guide lines mark the content edges; every `Section` opens with a
  hairline seam and a coloured node where it meets the guides. Labels are Google Sans Code.
- **Type.** Google Sans Flex, fluid from 320 to 1920px: `text-display`, `text-heading-{xl,lg,md,sm}`,
  `text-lead`, `text-body`, `text-small`, `text-caption`, `text-label`. Each sets size, leading,
  tracking and weight.
- **Four-colour rule.** `bg-spectrum` is used by the scrollbar thumb, the nav scroll progress and the
  footer edge.

Tailwind's default palette and scales are reset, so only these tokens exist. When adding one, update
the JS mirrors listed at the top of `theme.css`.

## Interaction

- **Buttons** (`Button`, `ButtonLink`): the accent floods out of the icon on hover; press scales down
  slightly. Wrap in `Magnetic` where the pointer should pull the element.
- **Links** (`TextLink`, or the `link-underline` utility): the underline draws in from the left and
  leaves to the right.
- **Cursor**: a ring with four colour dots follows the native pointer on a spring. It never hides the
  native cursor except over `data-cursor="view"`. Set `data-cursor="link" | "button" | "view" |
  "interactive"` and `data-cursor-label` on elements; links, buttons and inputs are detected
  automatically. It is not rendered for touch input or reduced motion.

## Motion

One owner per element property. Never animate the same property of the same element with GSAP and
Motion.

- **GSAP**: scroll-driven work (reveals, parallax, pinning, timelines). Import from
  `@/lib/animations/gsap`, animate inside `useGSAP(() => …, { scope })`, and gate with
  `gsap.matchMedia()` + `MEDIA.motionOK`.
- **Motion**: hover, press, presence, layout. Use `m.*` components (LazyMotion is strict).
- **Lenis**: owns scrolling and same-page anchor links. Use `useLenis()?.scrollTo(target,
  SCROLL_TO_OPTIONS)`; add `data-lenis-prevent` to nested scroll areas.

ESLint blocks direct `gsap`, `gsap/*`, `framer-motion` imports and Motion's `motion` export.

Reveal targets (`data-reveal`) are hidden with CSS only when scripting is on and motion is allowed, so
the page reads fully without JavaScript or with reduced motion.

## 3D

```tsx
const NetworkField = lazy(() => import("./network-field"));

<LazyScene className="h-dvh" fallback={<StaticPoster />}>
  <NetworkField />
</LazyScene>
```

`LazyScene` loads three.js when the scene nears the viewport, stops rendering offscreen, renders still
frames under reduced motion, and shows the fallback if WebGL fails. Scale work with
`useSceneQuality().density`.

Scenes sit on the light canvas: `StudioLighting` (soft Lightformers, contact shadows), glossy coloured
materials (`lib/three/materials.ts`), white and stone objects alongside the four colours. Glass only
where transparency means something. No dark space backgrounds or neon lighting.

## Responsive and accessibility

Mobile-first from 320px. Breakpoints: `xs` 375, `sm` 430, `md` 768, `lg` 1024, `xl` 1280, `2xl`
1440, `3xl` 1920. Reduced motion is honoured by Lenis, Motion, GSAP, R3F and a global CSS rule. Focus
rings use `--color-focus`; there is a skip link to `#main`.
