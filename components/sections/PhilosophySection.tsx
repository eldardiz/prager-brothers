'use client'

import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
// Per-project: replace these 9 placeholders with project-specific gallery shots.
// Naming convention: public/images/philosophy/01.jpg ... 09.jpg
const GALLERY = [
  { src: '/images/philosophy/01.jpg', alt: 'Kneading dough by hand' },
  { src: '/images/philosophy/02.jpg', alt: 'Loaves proofing in bannetons' },
  { src: '/images/philosophy/03.jpg', alt: 'Shaping dough at the bench' },
  { src: '/images/philosophy/04.jpg', alt: 'Freshly milled grain' },
  { src: '/images/philosophy/05.jpg', alt: 'Dusting a loaf before the bake' },
  { src: '/images/philosophy/06.jpg', alt: 'Scored boules on the peel' },
  { src: '/images/philosophy/07.jpg', alt: 'A baker at the bench before dawn' },
  { src: '/images/philosophy/08.jpg', alt: 'Bread baking in the hearth oven' },
  { src: '/images/philosophy/09.jpg', alt: 'The stone mill at work' },
]

export default function PhilosophySection() {
  const [index, setIndex] = useState(-1)
  const eyebrow = 'milled, mixed, shaped, baked'
  const body = 'We mill grain on site, build long sourdough fermentations, and shape every loaf by hand before the sun is up. This is breaducation: the craft, shown plainly, with nothing to hide.'

  return (
    <section className="section" id="craft" data-parallax-trigger>
      <div className="max">
        <div className="section-head">
          <div>
            <div className="section-num">— 04 / The Craft</div>
            <span className="eyebrow" style={{ marginTop: 18 }}>{eyebrow}</span>
            <h2 className="display" data-words-pullup style={{ marginTop: 24 }}>
              From grain&nbsp;<span className="ital">to crust.</span>
            </h2>
          </div>
          <div className="body-lg" data-anim-para>
            {body}
          </div>
        </div>

        <div className="env-grid" data-card-stagger>
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={`cell c${i + 1}`}
              data-card
              data-cursor-marquee-text="View"
              style={{ cursor: 'none' }}
              onClick={() => setIndex(i)}
            >
              <div data-parallax={i % 2 === 0 ? '0.1' : '-0.1'} style={{ position: 'absolute', inset: 0 }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes={i === 0 ? '(max-width:768px) 100vw, 60vw' : '(max-width:768px) 50vw, 30vw'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={GALLERY.map(g => ({ src: g.src, alt: g.alt }))}
      />
    </section>
  )
}
