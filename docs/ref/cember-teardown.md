# cemberstudio.com teardown (Phase 0 ground truth)

Captured via Playwright (`docs/ref/capture.mjs`). Screenshots: `cember-desktop-full.png`, `cember-desktop-fold.png`, `cember-mobile-fold.png`. Raw data: `capture-data.json`.

## Platform
Showit site (custom fonts via Adobe Typekit + Showit-generated CSS — NOT cleanly copyable, must rebuild).

## Typography (the important correction)
cember is **serif-display + sans-labels**, not all-sans:
- **Display H1/H2:** `Cember Serif Thin` — thin serif, weight 400, ~70px, line-height ~1.05, color espresso brown `#422B1C`. → free analog: **Cormorant Garamond weight 300** (already in archetype).
- **Eyebrows / small labels:** `Inter Tight`, 12px, weight 500, UPPERCASE. → **Inter Tight** (on Google Fonts).
- **Expanded sans accents:** `tt-commons-pro-expanded`. **Mono labels:** `PT-Mono`. → keep JetBrains Mono as mono analog.
- Also uses `DentonCondensed-Thin` (condensed thin serif) for some big words.

## Palette (cember original → Prager remap)
| Role | cember | Prager remap |
|---|---|---|
| Page cream bg | `#F9F1E8` / `#F7F0E8` | cream `#F7F0E6` |
| Alt cream | `#EDDECF` | `#EFE7DA` |
| Display/ink | espresso `#422B1C` / `#441B0E` | deep teal-ink `#143038` |
| Accent | gold `#C49033` | **Prager peacock blue `#007FA3`** |
| Muted slate | `#616F76` | keep muted `#5B6B70` |
| Dark band | dark brown `#441B0E` | deep teal `#0E2A33` |

## Section flow (top → bottom, from screenshots + outline)
1. **Hero** — big thin-serif headline left ("A Modern Design Studio Creating Brands and Websites With Art-Worthy Allure."), portfolio card peeks on the right. Cream bg. Serif "CEMBER STUDIO" wordmark top-left.
2. **Secondary headline band** — "Refreshingly Remarkable Brands Built on Storytelling Strategy." (thin serif, centered-ish).
3. **Portfolio tiles row** — row of colored project cards (tan / green / maroon / gold).
4. **Giant marquee** — "Our Work" in huge thin serif, scrolling horizontally.
5. **Industries row** — eyebrow "industries we've served" + comma-separated list (photographers, florists, …) beside small images.
6. **Our Signature Design Services** — big serif heading + left intro paragraph + right vertical **Specialities** list (~10 services: Color Functionality, Website Design, Logo design, Visual Identity, Artistic Textures + Patterns, Photoshoot Guidance, Packaging design, Collateral Design, Art + creative direction, Social media templates).
7. **3-column image cards** — Brand Design / Website Design / Passion Projects.
8. **Testimonial / quote** band.
9. **Newsletter** — "Join The Spark" (email capture).
10. **Footer** — dark image bg, "CEMBER STUDIO" wordmark + footer nav columns.

## Animations observed
- Hero: parallax/scale on imagery, headline reveal.
- Big "Our Work" horizontal marquee.
- Scroll reveals on cards (fade/blur up), staggered.
- Hover states on portfolio tiles + service rows.

## Prager → cember section map (build target)
1. Hero: "Made by Hand with Love in Carlsbad, CA" + sourdough photo (parallax). Wordmark "PRAGER BROTHERS".
2. Secondary headline: Prager manifesto line (slow fermentation / craft).
3. Portfolio tiles → **product/bread showcase** (3-panel).
4. Giant marquee → "Freshly Baked" / "Sourdough" scrolling words.
5. Industries → **"What we bake"** comma list / marquee (Sourdough, Baguettes, Country loaves, Pastries, Wood-fired pizza, Coffee).
6. Signature Services → **"Our Daily Offerings"** 9-item grid.
7. 3-column → **Bread · Pizza · Coffee** pillars.
8. Testimonial band → customer quotes.
9. ★ **Music Vinyl** section (ties to Prager's real "Music Calendar"!).
10. Team/About → "The Prager Brothers".
11. Newsletter + Footer.
