import Image from 'next/image'
import { brand } from '@/lib/brand'

export default function FinalCTA() {
  const eyebrow = 'still warm…'
  const businessName: string = brand.identity.name
  const orderUrl: string = brand.booking.url
  const imgSrc = '/images/cta/placeholder.jpg'
  return (
    <section className="final-cta">
      <div className="final-cta-bg">
        <Image src={imgSrc} alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <svg className="noise" preserveAspectRatio="none">
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="final-cta-headline">
        <div className="above">{eyebrow}</div>
        <h2 className="display">
          Come get&nbsp;<span className="ital">bread.</span>
        </h2>
      </div>
      <div className="final-cta-content">
        <div className="hero-top" style={{ color: 'var(--cream)' }}>
          <div className="stack">
            <span className="mono">— {businessName.toUpperCase()}</span>
          </div>
          <div className="stack right">
            <span className="mono">CARLSBAD · ENCINITAS · SAN DIEGO</span>
            <span className="mono">FRESH DAILY</span>
          </div>
        </div>
        <div className="actions">
          <a className="btn" href={orderUrl} target="_blank" rel="noopener noreferrer">{brand.booking.ctaLabel} <span className="arrow">↗</span></a>
          <a className="btn ghost" href="#contact">Find a bakery</a>
        </div>
      </div>
    </section>
  )
}
