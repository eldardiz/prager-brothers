import Image from 'next/image'
import { brand } from '@/lib/brand'

export default function HeroSection() {
  const eyebrow = 'artisan bread, slow fermented…'
  const businessName: string = brand.identity.name
  const established: string = brand.identity.established
  const { lat, lng } = brand.identity.coordinates
  const cityShort: string = brand.contact.cityShort
  const hoursFull: string = brand.hours.full
  const orderUrl: string = brand.booking.url
  const imgSrc = '/images/hero/placeholder.jpg'

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-image" data-parallax-trigger>
          <div data-parallax="0.18" style={{ position: 'absolute', inset: 0 }}>
            <Image src={imgSrc} alt={`${businessName} — fresh sourdough`} fill className="object-cover" priority sizes="100vw" />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,18,20,0.42)', zIndex: 1 }} />
        </div>
        <svg className="noise" preserveAspectRatio="none">
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        <div className="hero-content">
          <div className="hero-top">
            <div className="stack">
              {established ? <span>EST. {established}</span> : null}
              {lat ? <span>{lat}</span> : null}
              {lng ? <span>{lng}</span> : null}
            </div>
            <div className="stack right">
              <span>ARTISAN BREAD</span>
              {cityShort ? <span>{cityShort.toUpperCase()}</span> : null}
            </div>
          </div>

          <div className="hero-headline">
            <div className="above">{eyebrow}</div>
            <h1 className="display">
              Made by Hand with&nbsp;<span className="ital">Love</span><br />in Carlsbad, CA
            </h1>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 'clamp(28px, 4vw, 44px)', flexWrap: 'wrap' }}>
              <a className="btn red" href={orderUrl} target="_blank" rel="noopener noreferrer">
                {brand.booking.ctaLabel} <span className="arrow">↗</span>
              </a>
              <a className="btn ghost" href="#offerings">See what we bake</a>
            </div>
          </div>

          <div className="hero-bottom">
            <div className="stack">
              {hoursFull ? <span>{hoursFull.toUpperCase()}</span> : null}
            </div>
            <div className="scroll-prompt">
              <span>Scroll</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
