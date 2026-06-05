# Prager Brothers — Mockup Receipt

**Live:** https://prager-brothers.vercel.app
**Repo:** https://github.com/eldardiz/prager-brothers (public)
**Spawned:** 2026-06-05 · Axamo speculative mockup

## Brief
Replicate cemberstudio.com's look / feel / typography / section-flow, recolored to Prager Brothers' branding (cream + peacock blue), with bakery copy and real Prager photography, plus a Music Vinyl section ported from the Le Passage Saint-Honoré template.

## What was built
- **Base:** Editorial archetype (Next.js 16, Tailwind v4, GSAP + Lenis). `theme: 'light'`, `businessType: 'bakery'`.
- **Design language (from a Playwright teardown of cemberstudio):** thin-serif display (Cormorant Garamond, cember uses "Cember Serif Thin") + Inter Tight labels/body (cember's exact label font) + JetBrains Mono. Cream surfaces, deep-teal editorial bands (marquee / vinyl / footer), peacock-blue accents.
- **Palette:** cream `#F6F0E6` · peacock blue `#007FA3` (Prager's real brand blue, pulled from their live site) · deep teal ink `#0E2A30` / `#15323A` · lighter sky `#2E9BBF`.
- **Section flow (mirrors cember):** Hero → Our Story (manifesto) → 3-pillar showcase (Bread/Pizza/Café, horizontal scroll) → "what we bake" marquee → Daily Offerings (4 cards) → The Craft gallery (9 process shots) → Testimonials → ★ Music Vinyl ("Live at Prager") → Instagram → Three Bakeries + "Join the Rise" newsletter → Come Get Bread CTA → footer.
- **★ Music Vinyl section:** ported from PSH `PlaylistSection`, recolored (peacock-blue CSS vinyl, 14s GSAP spin retained), rebranded "Live at Prager" — ties to Prager's real **Music Calendar** (live music). House-playlist track list + link to their Music Calendar.
- **Photography:** 23 images, all Prager's own (scraped from pragerbrothers.com, `sips`-compressed). See `docs/image-manifest.md`.
- **Animations preserved:** hero parallax + word-pullup, horizontal-scroll pillars, velocity-skew marquee, scroll reveals (fade/blur/stagger), char-reveal paragraphs, vinyl spin, infinite testimonial ticker, Osmo underlay slide-out nav + cursor marquee + progressive blur.

## Design note (transparency)
This is a faithful **adaptation** of cember's look/feel/typography/section-flow on the proven Editorial system, not a literal DOM copy — cember is a Showit site (custom Typekit fonts + generated CSS) that cannot be cleanly lifted. The result matches cember's *language* (cream, thin serif, marquee, editorial reveals, dark footer) recolored to Prager blue.

## Skipped / placeholder fields — fix before sending to the lead
- **Phone** — not found; `brand.contact.phone` is empty (FinalCTA "call" + contact phone omitted).
- **Email** — not found; empty.
- **Founding year** — set to MMXII (2012) as a best guess; **verify** (`brand.identity.established` + About meta "Carlsbad, 2012").
- **Location addresses** — three addresses taken from their homepage body copy (Carlsbad 3411 Palmer Way · Encinitas 545 S Coast Hwy 101 · San Diego 1233 University Ave); confirm exact suite numbers / zips.
- **Hours** — generic ("Fresh every morning, until we sell out" / "Sourdough drops at 8am"); replace with real hours.
- **Social** — Instagram/Facebook handles assumed (`pragerbrothers`); confirm URLs.
- **Newsletter + order** — "Sign up" form posts nowhere (mockup); "Order online" links to pragerbrothers.com/online-orders.
- **Inherited:** `/mentions-legales` still carries generic legal copy; footer "Site by Softbird".

## Pre-send polish ideas
1. Write 2 real testimonials from their actual Google/Yelp reviews (current ones are representative).
2. Swap the café showcase panel for a real coffee/café shot if they have one (currently a bakery interior).
3. Request original-resolution photos (current set is web-scraped ≤2200px).
