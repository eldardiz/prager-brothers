import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/lib/brand'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-mark">
          <Image src="/images/logo.png" alt={brand.identity.name} width={84} height={81} className="brand-logo" style={{ height: 76, width: 'auto' }} />
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
        <span>Site by Axamo.co</span>
      </div>
    </footer>
  )
}
