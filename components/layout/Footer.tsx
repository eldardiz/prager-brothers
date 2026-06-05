import Link from 'next/link'
import { brand } from '@/lib/brand'

export default function Footer() {
  const name = brand.identity.name
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-mark" style={{ fontFamily: 'var(--font-display, serif)', fontSize: 28, fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
          {name}
        </div>
        <div style={{ display: 'flex', gap: 28, fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.85, flexWrap: 'wrap' }}>
          <a href="#about">About</a>
          <a href="#offerings">Breads</a>
          <a href="#music">Music</a>
          <a href="#instagram">Instagram</a>
          <a href="#contact">Visit</a>
          <a href={brand.booking.url} target="_blank" rel="noopener noreferrer">Order</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© MMXXVI · {brand.identity.legalName}</span>
        <span>Carlsbad · Encinitas · San Diego</span>
        <Link href="/mentions-legales">Legal</Link>
        <span>Site by Softbird</span>
      </div>
    </footer>
  )
}
