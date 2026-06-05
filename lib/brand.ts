// Brand config — single source of truth for the Prager Brothers mockup.
// Speculative Axamo mockup: cemberstudio.com look/feel/typography, recolored to
// Prager's cream + peacock-blue branding, bakery copy, + a Music Vinyl section.

export const brand = {
  // ── Identity ────────────────────────────────────────────────────────────────
  identity: {
    name: "Prager Brothers",
    legalName: "Prager Brothers Artisan Breads",
    tagline: "Made by Hand with Love in Carlsbad, CA",
    description:
      "Prager Brothers is an artisan bakery in Carlsbad, California. Slow-fermented sourdough, hand-shaped breads, viennoiserie, wood-fired pizza and coffee, baked fresh every morning across three San Diego County locations.",
    established: "MMXII",                 // verify founding year before client send
    coordinates: {
      lat: "33° 08′ N",
      lng: "117° 19′ W",
    },
    locale: "en" as "en" | "fr" | "de" | "es" | "it",
  },

  // ── Productization metadata ─────────────────────────────────────────────────
  businessType: "bakery" as "restaurant" | "winery" | "bakery",
  archetype: "editorial" as "editorial" | "maison" | "atelier",
  theme: "light" as "dark" | "light",    // bright cream canvas (cember direction)

  // ── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    phone: "",                           // SKIPPED — add real phone before send
    email: "",                           // SKIPPED — add real email before send
    address: "3411 Palmer Way",
    cityShort: "Carlsbad, CA",
    googleMapsUrl: "https://maps.google.com/?q=Prager+Brothers+Carlsbad",
    googleMapsEmbedSrc: "",
  },

  // ── Hours ───────────────────────────────────────────────────────────────────
  hours: {
    full: "Fresh every morning, until we sell out",
    lunch: "",
    dinner: "",
    featured: "Sourdough drops at 8am",
    closedOn: "",
  },

  // ── Booking / online order ──────────────────────────────────────────────────
  booking: {
    system: "url" as "thefork" | "resy" | "opentable" | "tock" | "phone" | "url" | "none",
    widgetId: "",
    url: "https://www.pragerbrothers.com/online-orders",
    ctaLabel: "Order online",
  },

  // ── Social ──────────────────────────────────────────────────────────────────
  social: {
    instagram: "pragerbrothers",
    instagramUrl: "https://www.instagram.com/pragerbrothers",
    facebook: "https://www.facebook.com/pragerbrothers",
    tripadvisor: "",
    yelp: "",
  },

  // ── Section flags ───────────────────────────────────────────────────────────
  sections: {
    featuredOffering: true,
    locationShowcase: false,
    about: true,
    philosophy: true,
    playlist: true,                      // ★ Music Vinyl section ON (ties to Prager's Music Calendar)
    instagram: true,
    testimonials: true,
  },

  // ── Featured offering ────────────────────────────────────────────────────────
  featuredOffering: {
    sectionLabel: "Daily selection",
  },

  // ── Menu / catalog ──────────────────────────────────────────────────────────
  menu: {
    type: "url" as "pdf" | "photo" | "url",
    src: "https://www.pragerbrothers.com/products",
  },

  // ── Instagram feed ──────────────────────────────────────────────────────────
  instagram: {
    handle: "pragerbrothers",
    embedId: "",
  },

  // ── Meta / analytics ────────────────────────────────────────────────────────
  meta: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://prager-brothers.vercel.app",
    gaId: "",
    metaPixelId: "",
  },
} as const

export const FEATURED_OFFERING_LABEL: Record<typeof brand.businessType, string> = {
  restaurant: "Signature",
  winery: "Our wines",
  bakery: "Daily selection",
}

export const LOCATION_SHOWCASE_LABEL: Record<typeof brand.businessType, string> = {
  restaurant: "Terrace",
  winery: "Tasting room",
  bakery: "The café",
}
