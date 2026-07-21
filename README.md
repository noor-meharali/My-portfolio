# Noor Ali — Portfolio

Premium, interactive one-page developer portfolio. Built with Vite + React 19 +
TypeScript + Tailwind CSS v4, Framer Motion, GSAP, and React Three Fiber.

## Status: Day 1

Built so far:
- Global "alive" layer: custom animated cursor, animated mesh-gradient
  background, canvas particle field, GSAP preloader, smooth scroll, magnetic
  buttons.
- Hero section: GSAP line-reveal headline, typewriter role text, glass
  availability badge, CTA buttons (View Projects / Download Resume /
  Contact Me), a React Three Fiber wireframe core, and six floating tech
  chips connected by animated "signal lines" with mouse parallax.

Not built yet (folders are already scaffolded and ready): About, Skills,
Tech Stack, Experience, Projects, Services, Achievements, Testimonials,
Contact, and the `app/api/contact` route.

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build      # type-check + production build
npm run preview    # preview the production build locally
```

## Design system — "Living Signal"

- **Background:** near-black indigo void (`#08090f`)
- **Accent gradient:** violet `#7c5cfc` → cyan `#22d3ee`
- **Warm accent (sparing):** amber `#ffb454` — used only for the
  availability pulse
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono
  (labels / data readouts)
- **Signature motif:** thin animated gradient "signal lines" — used as the
  cursor's hover ring, the preloader's draw-in line, and the lines
  connecting the hero's floating tech chips to the 3D core. Reuse this
  motif for future section transitions/dividers to keep the identity
  consistent.

## Before you ship

- Drop your real resume PDF at `public/resume/Noor-Ali-Resume.pdf`
  (the Download Resume button already points here).
- Swap the placeholder social links in `src/data/profile.ts`
  (GitHub / LinkedIn / X / email).
- Replace favicon.svg with your own mark if desired.

## Project structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── cursor/        CustomCursor
│   │   ├── effects/       GradientBackground, ParticlesBackground
│   │   ├── loaders/       Loader (GSAP preloader)
│   │   ├── layout/        Navbar
│   │   ├── hero/          Hero, HeroScene3D, FloatingTechIcons, TypewriterRole
│   │   ├── ui/             MagneticButton, GlassBadge
│   │   ├── about/          (empty — next up)
│   │   ├── skills/         (empty)
│   │   ├── techstack/      (empty)
│   │   ├── experience/     (empty)
│   │   ├── projects/       (empty)
│   │   ├── services/       (empty)
│   │   ├── achievements/   (empty)
│   │   ├── testimonials/   (empty)
│   │   ├── contact/        (empty)
│   │   ├── animations/     (empty — shared motion variants go here)
│   │   ├── common/         (empty)
│   │   └── three/          (empty — extra 3D pieces beyond the hero core)
│   ├── data/               profile.ts (name, role, tech list, socials)
│   ├── hooks/               useMousePosition, useMagnetic
│   ├── lib/                 utils.ts (cn helper)
│   ├── types/                shared TS interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css            design tokens + global styles
├── app/api/contact/         (empty — REST endpoint for the contact form, later)
├── config/                  (empty)
├── context/                 (empty)
├── providers/               (empty)
├── store/                   (empty)
├── styles/                  (empty)
└── public/
    ├── resume/               drop resume PDF here
    ├── images/               profile, projects, certificates, logos, hero
    ├── models/               .glb/.gltf assets for future 3D
    └── videos/
```
