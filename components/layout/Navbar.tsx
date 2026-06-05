'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { brand } from '@/lib/brand'

export default function Navbar() {
  const toggleRef = useRef<HTMLButtonElement>(null)
  const bookingUrl: string = brand.booking.url
  const instagramUrl: string = brand.social.instagramUrl

  useEffect(() => {
    let mounted = true

    // Make navbar visible immediately (no longer coupled to Preloader)
    document.querySelector('.underlay-nav__header')?.classList.add('is-visible')

    // Scroll-based background
    const header = document.querySelector<HTMLElement>('.underlay-nav__header')
    function onScroll() {
      header?.classList.toggle('is-scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    async function init() {
      const { default: gsap } = await import('gsap')
      const { CustomEase } = await import('gsap/CustomEase')
      gsap.registerPlugin(CustomEase)
      CustomEase.create('energy', 'M0,0 C0.32,0.72 0,1 1,1')

      if (!mounted) return

      const toggleBtn = document.querySelector<HTMLElement>('[data-underlay-nav-toggle]')
      const toggleLabels = document.querySelectorAll<HTMLElement>('.underlay-nav__toggle-label')
      const toggleBars = document.querySelectorAll<HTMLElement>('.underlay-nav__toggle-bar')
      const menuEl = document.querySelector<HTMLElement>('[data-underlay-nav-menu]')
      const mainEl = document.querySelector<HTMLElement>('[data-main]')
      const overlayEl = document.querySelector<HTMLElement>('[data-underlay-nav-overlay]')
      const darkEl = document.querySelector<HTMLElement>('.underlay-nav__dark')
      if (!toggleBtn || !menuEl || !mainEl || !overlayEl || !darkEl) return

      const largeItems = document.querySelectorAll<HTMLElement>('[data-reveal-l]')
      const smallItems = document.querySelectorAll<HTMLElement>('[data-reveal-s]')

      let isOpen = false
      let tl: gsap.core.Timeline
      let enterEndTime = 0

      const getMenuOffset = () => -menuEl.offsetWidth

      gsap.set(overlayEl, { visibility: 'hidden', pointerEvents: 'none' })
      gsap.set(darkEl, { autoAlpha: 0 })
      gsap.set(mainEl, { x: 0 })
      gsap.set(toggleLabels, { yPercent: 0 })
      gsap.set(toggleBars, { y: 0, rotation: 0 })

      function buildTL() {
        tl = gsap.timeline({ paused: true, defaults: { ease: 'energy', easeReverse: 'power2.inOut' } })
        tl.set(overlayEl!, { visibility: 'visible', pointerEvents: 'auto' }, 0)
        tl.to([mainEl!, overlayEl!], { x: getMenuOffset, duration: 0.7 }, 0)
        tl.to(darkEl!, { autoAlpha: 1, duration: 0.5 }, 0)
        tl.to(toggleLabels, { yPercent: -100, duration: 0.4 }, 0)
        tl.to(toggleBars[0], { y: '0.2em', rotation: 45, duration: 0.35, ease: 'back.out(1.4)', easeReverse: 'power3.out' }, 0.05)
        tl.to(toggleBars[1], { y: '-0.2em', rotation: -45, duration: 0.35, ease: 'back.out(1.4)', easeReverse: 'power3.out' }, 0.05)
        tl.fromTo(largeItems, { autoAlpha: 0, xPercent: 25 }, { autoAlpha: 1, xPercent: 0, duration: 0.7, stagger: 0.05 }, 0)
        tl.fromTo(smallItems, { autoAlpha: 0, yPercent: 100 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, stagger: 0.03, ease: 'power3.out' }, 0.3)
        enterEndTime = tl.duration()
        tl.addPause()
        tl.to([largeItems, smallItems], { autoAlpha: 0, duration: 0.3 }, '<')
        tl.to([mainEl!, overlayEl!], { x: 0, duration: 0.6 }, '<')
        tl.to(darkEl!, { autoAlpha: 0, duration: 0.35, ease: 'power2.inOut' }, '<')
        tl.to(toggleLabels, { yPercent: 0, duration: 0.25, ease: 'power3.in' }, '<+=0.1')
        tl.to(toggleBars, { y: 0, rotation: 0, duration: 0.25, ease: 'power3.in' }, '<')
        tl.set(overlayEl!, { visibility: 'hidden', pointerEvents: 'none' })
      }

      function toggle() {
        isOpen = !isOpen
        toggleBtn!.setAttribute('aria-expanded', String(isOpen))
        toggleBtn!.setAttribute('aria-label', isOpen ? 'close menu' : 'open menu')
        document.body.setAttribute('data-menu-status', isOpen ? 'open' : '')
        if (isOpen) {
          tl.invalidate()
          if (tl.time() >= enterEndTime) tl.timeScale(1).restart()
          else tl.timeScale(1).play()
          window.__lenis?.stop()
        } else {
          if (tl.time() < enterEndTime) tl.timeScale(1).reverse()
          else tl.timeScale(1).play()
          setTimeout(() => window.__lenis?.start(), 600)
        }
      }

      buildTL()
      toggleBtn.addEventListener('click', toggle)
      overlayEl.addEventListener('click', () => { if (isOpen) toggle() })
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) { toggle(); toggleBtn.focus() }
      })

      // Close menu before navigating when a nav link inside the open menu is clicked
      menuEl.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
        link.addEventListener('click', (e) => {
          if (!isOpen) return
          const href = link.getAttribute('href') ?? ''
          const isAnchor = href.startsWith('#')
          const isExternal = link.target === '_blank'
          e.preventDefault()
          toggle()
          // Wait for close animation (~600ms) before navigating
          setTimeout(() => {
            if (isAnchor) {
              const target = document.querySelector(href)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const lenis = (window as any).__lenis
              if (target && lenis?.scrollTo) {
                lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.0 })
              } else if (target) {
                target.scrollIntoView({ behavior: 'smooth' })
              }
            } else if (isExternal) {
              window.open(href, '_blank', 'noopener,noreferrer')
            } else {
              window.location.href = href
            }
          }, 650)
        })
      })

      let resizeTimer: ReturnType<typeof setTimeout>
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          if (isOpen) gsap.set([mainEl!, overlayEl!], { x: getMenuOffset() })
          else tl.invalidate()
        }, 150)
      })
    }

    init()
    return () => {
      mounted = false
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="underlay-nav">
      <header className="underlay-nav__header">
        <div className="underlay-nav__bar">
          <div className="underlay-nav__container">
            <Link href="/" className="underlay-nav__logo" aria-label={brand.identity.name}>
              <span style={{ fontFamily: 'var(--font-display, serif)', fontSize: 18, fontWeight: 600, color: 'currentColor', letterSpacing: '-0.01em' }}>
                {brand.identity.name}
              </span>
            </Link>
            <button
              data-underlay-nav-toggle
              ref={toggleRef}
              aria-expanded="false"
              aria-label="open menu"
              className="underlay-nav__toggle"
            >
              <span className="underlay-nav__toggle-text">
                <span className="underlay-nav__toggle-label">Menu</span>
                <span className="underlay-nav__toggle-label">Close</span>
              </span>
              <span className="underlay-nav__toggle-icon">
                <span className="underlay-nav__toggle-bar"></span>
                <span className="underlay-nav__toggle-bar"></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <nav data-underlay-nav-menu className="underlay-nav__menu" aria-label="Main navigation">
        <div className="underlay-nav__inner">
          <ul className="underlay-nav__list">
            <li data-reveal-l>
              <a href="#about" className="underlay-nav__link-large">
                <span className="num">— 01</span>
                <span className="underlay-nav__link-label">Our&nbsp;<span className="accent">story</span></span>
              </a>
            </li>
            <li data-reveal-l>
              <a href="#offerings" className="underlay-nav__link-large">
                <span className="num">— 02</span>
                <span className="underlay-nav__link-label">Breads</span>
              </a>
            </li>
            <li data-reveal-l>
              <a href="#craft" className="underlay-nav__link-large">
                <span className="num">— 03</span>
                <span className="underlay-nav__link-label">The&nbsp;<span className="accent">craft</span></span>
              </a>
            </li>
            <li data-reveal-l>
              <a href="#music" className="underlay-nav__link-large">
                <span className="num">— 04</span>
                <span className="underlay-nav__link-label">Music</span>
              </a>
            </li>
            <li data-reveal-l>
              <a href="#contact" className="underlay-nav__link-large">
                <span className="num">— 05</span>
                <span className="underlay-nav__link-label">Visit</span>
              </a>
            </li>
            <li data-reveal-l>
              <a href={bookingUrl} className="underlay-nav__link-large" target="_blank" rel="noopener noreferrer">
                <span className="num">— 06</span>
                <span className="underlay-nav__link-label">Order&nbsp;<span className="accent">online</span></span>
              </a>
            </li>
          </ul>

          <div className="underlay-nav__bottom">
            <div className="underlay-nav__bottom-col">
              <div data-reveal-s>
                <span className="underlay-nav__link-small is--faded">Follow us</span>
              </div>
              <ul className="underlay-nav__list is--small" style={{ listStyle: 'none' }}>
                <li data-reveal-s>
                  <a href={instagramUrl} className="underlay-nav__link-small" target="_blank" rel="noopener noreferrer">
                    Instagram&nbsp;↗
                  </a>
                </li>
                <li data-reveal-s>
                  <a href={brand.social.facebook} className="underlay-nav__link-small" target="_blank" rel="noopener noreferrer">Facebook&nbsp;↗</a>
                </li>
                <li data-reveal-s>
                  <a href="https://www.pragerbrothers.com/music-calendar" className="underlay-nav__link-small" target="_blank" rel="noopener noreferrer">Music&nbsp;Calendar&nbsp;↗</a>
                </li>
              </ul>
            </div>
            <div className="underlay-nav__bottom-col">
              <div data-reveal-s>
                <span className="underlay-nav__link-small is--faded">Bakeries</span>
              </div>
              <ul className="underlay-nav__list is--small" style={{ listStyle: 'none' }}>
                <li data-reveal-s>
                  <span className="underlay-nav__link-small">Carlsbad · 3411 Palmer Way</span>
                </li>
                <li data-reveal-s>
                  <span className="underlay-nav__link-small">Encinitas · 545 S Coast Hwy</span>
                </li>
                <li data-reveal-s>
                  <span className="underlay-nav__link-small">San Diego · 1233 University Ave</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div data-underlay-nav-overlay className="underlay-nav__overlay">
        <div className="underlay-nav__dark"></div>
      </div>
    </div>
  )
}
