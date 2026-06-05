# Editorial Archetype — Template Brain

This is the **Editorial archetype** for the Axamo productized website system. It is a *template*, not a live client site. It is the generalized descendant of Le Passage Saint-Honoré, adapted to spawn new winery, bakery, and premium-restaurant sites.

If you arrive here thinking this is PSH: it isn't. The live PSH project still lives at `vibe-coding/projects/passage-saint-honore/` and ships independently. Changes here do not affect PSH.

## When this archetype is used

- A new lead site is cloned from `vibe-coding/projects/archetypes/editorial/` into `vibe-coding/mockups/[lead-slug]/` (mockup) or `vibe-coding/projects/[client-slug]/` (signed client).
- The cloning happens via the `/new-mockup` slash command (to be built in Phase 4) or manually.
- After cloning, the new project edits `lib/brand.ts` and swaps `public/images/` to make the site lead-specific.

## What must stay generic in this archetype

- `lib/brand.ts` — placeholders only, no real business data
- All section component `FALLBACK` constants — English, generic, neutral
- `public/images/` — placeholder paths only; the actual placeholder JPGs are added per-lead

## The Axamo archetype lineup

This is template 01 (Editorial). It ships with two theme variants out of the box and a Blue palette preset. The full lineup:

1. **Editorial · Warm** (this, default theme) — dark, atmospheric, serif-led, photography-led, dark olive + cream palette descended from Le Passage Saint-Honoré. Best for premium restaurants, established wineries, heritage brands.
2. **Editorial · Light** — same skeleton + tokens, opt in via `brand.theme = 'light'` in `lib/brand.ts`. Flips the dark body surfaces to white via a CSS overlay; red becomes the only accent (gold is suppressed). Photo sections stay photographic. Best for bakeries, juice bars, brunch, brighter modern restaurants. Ported from the petite-bretagne-light mockup (May 2026).
3. **Editorial · Blue** — Warm skeleton with a Günay Vienna palette preset (peacock blue + cream + gold) swapped into `figma-tokens.css`. Structurally identical. Can also be combined with `theme = 'light'` for a peacock-on-white look.
4. **Fresh** — white surface + lime accent, modular bento, sidebar nav, GSAP testimonial slider, parallax lime footer (`vibe-coding/projects/archetypes/fresh/`). Structurally different template.
5. **Atelier** — monochrome + 1 accent, austere typography-led grid (planned). Structurally different template.

Editorial Warm + Light + Blue all share the same skeleton (token + theme-overlay swap only). Fresh + Atelier are structurally different templates. All five surfaces share the `lib/brand.ts` interface as the single per-lead swap surface.

### How light/dark is wired

- `lib/brand.ts` exposes `theme: 'dark' | 'light'` (defaults `'dark'`)
- `app/layout.tsx` reads `brand.theme` and applies `data-theme="light"` to the `<html>` element when light
- `styles/claude-design.css` has a `[data-theme="light"] { … }` block that flips: page background, `.section.warm` + `.section.cream`, `.testi-card`, `.btn`, `.footer`, navbar scrolled state, photographic-overlay gradients (kills the maroon wash), and the slide-out menu surface. Red replaces gold as the only accent (`--mustard` is remapped to `--red`).
- Photo sections keep dark gradient overlays so white display text stays readable.
- No component code changes — adding a new section automatically gets the right theme as long as it uses the standard `.section.warm` / `.section.cream` / `--bg` / `--fg` tokens.

## Stack

- Next.js 16.2.4, TypeScript, Tailwind CSS v4
- GSAP + Lenis for motion
- yet-another-react-lightbox for the Philosophy gallery
- **No CMS by default.** All content lives in `lib/brand.ts` + per-component `FALLBACK` constants. Sanity is available as an opt-in add-on at `vibe-coding/projects/archetypes/_addons/sanity-cms-editorial/` — restore only when a client explicitly wants self-serve content editing. See that folder's README before deciding.
- Vercel deploy
- **Scope: lead-gen homepage only.** No /privatisation, no /recrutement, no forms, no Resend. The productized service sells the homepage as the entire deliverable.

## Files of structural importance

```
lib/brand.ts                      ← the SINGLE source of business data — components read from this
lib/utils.ts                      ← cn() helper
components/sections/              ← one section per file, content lives in inline FALLBACK constants
components/sections/HeroSection.tsx           ← hero with EST/coords stamps from brand.identity
components/sections/AboutSection.tsx          ← about/origin story
components/sections/PhilosophySection.tsx     ← philosophy/approach gallery
components/sections/FeaturedOfferingSection.tsx ← brunch / wines / pastries — business-agnostic
components/sections/LocationShowcaseSection.tsx ← terrace / tasting room / café
components/sections/ContactSection.tsx
components/sections/FinalCTA.tsx
components/sections/InstagramSection.tsx
components/sections/TestimonialsSection.tsx
components/sections/PlaylistSection.tsx       ← off by default for wineries/bakeries (brand.sections.playlist)
components/sections/MenuShowcaseSection.tsx   ← 3-panel horizontal scroll
components/sections/InfiniteScrollBanner.tsx  ← word marquee
components/sections/GallerySection.tsx        ← Flip lightbox grid (not on homepage by default)
app/page.tsx                      ← homepage composition
app/layout.tsx                    ← root layout — reads brand.identity.locale for `lang` + OG
styles/figma-tokens.css           ← CSS variables — swap per-project for re-skinning
```

## When spawning a new mockup or client site from this archetype

1. Clone the entire archetype directory.
2. Edit `lib/brand.ts`:
   - Set `identity.name`, `identity.tagline`, `identity.description`
   - Set `businessType` (`restaurant` / `winery` / `bakery`)
   - Keep `archetype: 'editorial'` (or change if cloning Maison/Atelier)
   - Set `contact.*`, `hours.*`, `booking.*`, `social.*`
   - Toggle `sections.*` flags for which homepage sections to render
3. Swap `public/images/` — drop in lead's photos using the existing directory structure:
   - `public/images/hero/placeholder.jpg`
   - `public/images/about/placeholder.jpg`
   - `public/images/philosophy/01.jpg` … `09.jpg`
   - `public/images/location/placeholder.jpg`
   - `public/images/featured/card-01.jpg` … `04.jpg`
   - `public/images/cta/placeholder.jpg`
   - `public/images/team/placeholder.jpg`
   - `public/images/private-hire/placeholder.jpg`
   - `public/images/instagram/post-01.jpg` … `04.jpg`
   - `public/images/showcase/panel-01.jpg` … `03.jpg`
   - `public/images/InstagramLogo.png` (keep)
4. Swap `styles/figma-tokens.css` palette (run HUE skill on the lead's brand if no palette is known).
5. Optional: install the Sanity CMS add-on if the client wants self-serve editing. Source lives at `../_addons/sanity-cms-editorial/`. Don't install for one-shot $5k mockups; Eldar + Axamo manage edits in that flow.

## Critical pitfalls (carried over from PSH — still apply)

- **Lenis**: must use dynamic `import('lenis')` inside useEffect — ESM-only
- **Vercel build**: `tailwindcss` + `@tailwindcss/postcss` must be in `dependencies` (already)
- **SSR/hydration**: no `new Date()` / `Math.random()` in render body — defer to useEffect
- **TheFork widget (when used)**: wrap `<script>` in useEffect — SSR breaks otherwise
- **Em dashes in user-facing copy**: never use `—` in website copy spawned from this archetype. This is a hard project rule (see workspace CLAUDE.md).
- **Sanity OOM trap**: do NOT reinstall Sanity into the archetype without the env-gating safety pattern documented at `../_addons/sanity-cms-editorial/README.md`. The Sanity Studio module graph (~73MB of code) is the reason the archetype was stripped to CMS-free.

## Known remaining cleanup

- `mentions-legales` page still contains French legal copy. Translate to English (or per-locale) during the polish pass for the first non-French lead.
- `Navbar` has French strings ("Suivez-nous", "Adresse") in the menu bottom. Translate during the polish pass.
- Placeholder images in `public/images/` are not yet bundled — running dev without project-specific images will 404 on hero/feature/etc. Per-lead workflow swaps these.

## Git rules

This archetype lives inside the workspace repo but is not deployed on its own — it's a template seed. Don't create a separate remote for it. When this archetype is meaningfully updated, commit changes to the workspace repo with a clear `archetype/editorial: …` prefix.
