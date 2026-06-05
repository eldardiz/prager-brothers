"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLenis } from "@/components/providers/LenisProvider"
import WordsPullUp from "@/components/ui/WordsPullUp"

const FALLBACK_IMAGES = [
  { _id: "1", src: "/images/gallery/01.jpg", alt: "Gallery image 1" },
  { _id: "2", src: "/images/gallery/02.jpg", alt: "Gallery image 2" },
  { _id: "3", src: "/images/gallery/03.jpg", alt: "Gallery image 3" },
  { _id: "4", src: "/images/gallery/04.jpg", alt: "Gallery image 4" },
  { _id: "5", src: "/images/gallery/05.jpg", alt: "Gallery image 5" },
  { _id: "6", src: "/images/gallery/06.jpg", alt: "Gallery image 6" },
  { _id: "7", src: "/images/gallery/07.jpg", alt: "Gallery image 7" },
  { _id: "8", src: "/images/gallery/08.jpg", alt: "Gallery image 8" },
  { _id: "9", src: "/images/gallery/09.jpg", alt: "Gallery image 9" },
]

export default function GallerySection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const lenis = useLenis()
  const thumbRefs = useRef<(HTMLImageElement | null)[]>([])
  const lightboxImgRefs = useRef<(HTMLImageElement | null)[]>([])

  const images = FALLBACK_IMAGES

  const openLightbox = useCallback(async (idx: number) => {
    const { default: gsap } = await import("gsap")
    const { Flip } = await import("gsap/Flip")
    gsap.registerPlugin(Flip)
    lenis?.stop()
    const thumb = thumbRefs.current[idx]
    const lightImg = lightboxImgRefs.current[idx]
    if (!thumb || !lightImg) { setActiveIdx(idx); return }
    const state = Flip.getState(thumb)
    setActiveIdx(idx)
    requestAnimationFrame(() => { Flip.from(state, { targets: lightImg, duration: 0.7, ease: "expo.out", absolute: true }) })
  }, [lenis])

  const closeLightbox = useCallback(async () => {
    const idx = activeIdx
    if (idx === null) return
    const { default: gsap } = await import("gsap")
    const { Flip } = await import("gsap/Flip")
    gsap.registerPlugin(Flip)
    const thumb = thumbRefs.current[idx]
    const lightImg = lightboxImgRefs.current[idx]
    if (!thumb || !lightImg) { setActiveIdx(null); lenis?.start(); return }
    const state = Flip.getState(lightImg)
    setActiveIdx(null)
    requestAnimationFrame(() => { Flip.from(state, { targets: thumb, duration: 0.5, ease: "expo.inOut", absolute: true, onComplete: () => lenis?.start() }) })
  }, [activeIdx, lenis])

  const navigate = useCallback((dir: 1 | -1) => {
    setActiveIdx((prev) => prev === null ? null : (prev + dir + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (activeIdx === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") navigate(1)
      if (e.key === "ArrowLeft") navigate(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeIdx, closeLightbox, navigate])

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[var(--color-bg-alt)]" data-anim-section data-nav-theme="light">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <p className="font-eyebrow text-[var(--color-primary)] mb-4" data-anim-item>Gallery</p>
          <WordsPullUp
            as="h2"
            text="Our world in pictures"
            style={{ fontFamily: "var(--font-cormorant, Cormorant, Georgia, serif)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--color-text)" }}
          />
        </div>

        {/* Gallery grid — do NOT add overflow:hidden here (breaks Flip) */}
        <div className="gallery-grid" data-anim-card-grid>
          {images.map((img, i) => (
            <div key={img._id} className="gallery-grid__item">
              <button className="gallery-item__button" onClick={() => openLightbox(i)} aria-label={`Open ${img.alt}`}>
                <div className="relative aspect-[4/3] rounded-[0.375em] overflow-hidden">
                  <Image
                    ref={(el) => { thumbRefs.current[i] = el as unknown as HTMLImageElement }}
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 479px) calc(50vw - 1.5em), (max-width: 767px) calc(50vw - 1em), calc(33vw - 2em)"
                    className="gallery-item__img object-cover"
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div className={`lightbox-wrap ${activeIdx !== null ? "is-active" : ""}`} style={{ background: "rgba(26,32,53,0.96)" }} role="dialog" aria-modal="true" aria-label="Gallery lightbox">
        <div className="lightbox-img__wrap">
          <div className="lightbox-img__list">
            {images.map((img, i) => (
              <div key={img._id} className={`lightbox-img__item ${activeIdx === i ? "is-active" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={(el) => { lightboxImgRefs.current[i] = el }} src={img.src} alt={img.alt} className="lightbox-img" />
              </div>
            ))}
          </div>
        </div>
        <div className="lightbox-nav">
          <div className="lightbox-nav__col start">
            <button className="lightbox-nav__button" onClick={closeLightbox} aria-label="Close gallery">
              <span className="lightbox-nav__dot" />
              <span className="lightbox-nav__text">Close</span>
            </button>
          </div>
          <div className="lightbox-nav__col center">
            <button className="lightbox-nav__button" onClick={() => navigate(-1)} aria-label="Previous image">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span className="lightbox-nav__text">{activeIdx !== null ? `${activeIdx + 1} / ${images.length}` : ""}</span>
            <button className="lightbox-nav__button" onClick={() => navigate(1)} aria-label="Next image">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="lightbox-nav__col end">
            <span className="lightbox-nav__text opacity-60">{activeIdx !== null ? images[activeIdx].alt : ""}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
