// Phase 0 deep-capture: cemberstudio.com (design ref) + pragerbrothers.com (brand + photos)
// Run with playwright from the fresh archetype's node_modules.
import pw from '/Users/eldardizdarevic/Desktop/eldar-design-development-cc/vibe-coding/projects/archetypes/fresh/node_modules/playwright-core/index.js'
const { chromium } = pw
import fs from 'node:fs'
import path from 'node:path'

const OUT = '/Users/eldardizdarevic/Desktop/eldar-design-development-cc/vibe-coding/mockups/prager-brothers/docs/ref'
const PHOTOS = '/Users/eldardizdarevic/Desktop/eldar-design-development-cc/vibe-coding/mockups/prager-brothers/docs/ref/prager-photos'
fs.mkdirSync(PHOTOS, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0
      const step = 600
      const timer = setInterval(() => {
        window.scrollBy(0, step)
        total += step
        if (total >= document.body.scrollHeight) { clearInterval(timer); resolve() }
      }, 120)
    })
  })
  await sleep(800)
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(500)
}

function styleProbe() {
  // Runs in page context. Sample fonts/colors from representative elements.
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const cs = getComputedStyle(el)
    return {
      sel,
      text: (el.textContent || '').trim().slice(0, 50),
      fontFamily: cs.fontFamily,
      fontWeight: cs.fontWeight,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
    }
  }
  const bodyCS = getComputedStyle(document.body)
  // Collect color frequency across many elements
  const colorCount = {}
  const bgCount = {}
  document.querySelectorAll('body *').forEach((el) => {
    const cs = getComputedStyle(el)
    const c = cs.color, b = cs.backgroundColor
    if (c && c !== 'rgba(0, 0, 0, 0)') colorCount[c] = (colorCount[c] || 0) + 1
    if (b && b !== 'rgba(0, 0, 0, 0)') bgCount[b] = (bgCount[b] || 0) + 1
  })
  const top = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 12)
  // font family frequency
  const fontCount = {}
  document.querySelectorAll('body *').forEach((el) => {
    const f = getComputedStyle(el).fontFamily
    if (f) fontCount[f] = (fontCount[f] || 0) + 1
  })
  return {
    bodyFont: bodyCS.fontFamily,
    bodyColor: bodyCS.color,
    bodyBg: bodyCS.backgroundColor,
    probes: ['h1', 'h2', 'h3', 'p', 'a', 'button', 'nav a', 'li'].map(pick).filter(Boolean),
    topColors: top(colorCount),
    topBackgrounds: top(bgCount),
    topFonts: top(fontCount),
  }
}

async function capture(browser, url, slug, { downloadImages = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const result = { url, slug }
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }))
    await sleep(2500)
    await autoScroll(page)

    // Section text outline (headings + button labels in DOM order)
    const outline = await page.evaluate(() => {
      const out = []
      document.querySelectorAll('h1,h2,h3,h4,nav a,button,a.button,[class*=btn]').forEach((el) => {
        const t = (el.textContent || '').trim().replace(/\s+/g, ' ')
        if (t && t.length < 120) out.push(el.tagName.toLowerCase() + ': ' + t)
      })
      return out.slice(0, 120)
    })
    result.outline = outline

    // Style probe
    result.styles = await page.evaluate(styleProbe)

    // Full-page screenshot
    await page.screenshot({ path: path.join(OUT, `${slug}-desktop-full.png`), fullPage: true }).catch((e) => result.shotErr = String(e))
    // Above-the-fold
    await page.evaluate(() => window.scrollTo(0, 0))
    await sleep(300)
    await page.screenshot({ path: path.join(OUT, `${slug}-desktop-fold.png`) }).catch(() => {})

    // Mobile
    await page.setViewportSize({ width: 390, height: 844 })
    await sleep(800)
    await page.screenshot({ path: path.join(OUT, `${slug}-mobile-fold.png`) }).catch(() => {})

    if (downloadImages) {
      const imgs = await page.evaluate(() => {
        const set = new Set()
        document.querySelectorAll('img').forEach((im) => { if (im.currentSrc || im.src) set.add(im.currentSrc || im.src) })
        // background images
        document.querySelectorAll('body *').forEach((el) => {
          const bg = getComputedStyle(el).backgroundImage
          const m = bg && bg.match(/url\(["']?(.*?)["']?\)/)
          if (m && m[1] && m[1].startsWith('http')) set.add(m[1])
        })
        return Array.from(set)
      })
      result.imageUrls = imgs
      let i = 0
      for (const u of imgs) {
        try {
          const resp = await page.context().request.get(u)
          if (!resp.ok()) continue
          const buf = await resp.body()
          if (buf.length < 8000) continue // skip tiny icons
          const ext = (u.split('?')[0].split('.').pop() || 'jpg').slice(0, 4).replace(/[^a-z0-9]/gi, '') || 'jpg'
          fs.writeFileSync(path.join(PHOTOS, `prager-${String(i).padStart(2, '0')}.${ext}`), buf)
          i++
        } catch {}
      }
      result.downloadedCount = i
    }
  } catch (e) {
    result.error = String(e)
  } finally {
    await ctx.close()
  }
  return result
}

const browser = await chromium.launch({ headless: true })
const cember = await capture(browser, 'https://cemberstudio.com/', 'cember', {})
const prager = await capture(browser, 'https://www.pragerbrothers.com/', 'prager', { downloadImages: true })
await browser.close()

fs.writeFileSync(path.join(OUT, 'capture-data.json'), JSON.stringify({ cember, prager }, null, 2))
console.log('=== CEMBER STYLES ===')
console.log(JSON.stringify(cember.styles, null, 2))
console.log('=== CEMBER OUTLINE (first 40) ===')
console.log((cember.outline || []).slice(0, 40).join('\n'))
console.log('\n=== PRAGER STYLES ===')
console.log(JSON.stringify(prager.styles, null, 2))
console.log('=== PRAGER OUTLINE (first 40) ===')
console.log((prager.outline || []).slice(0, 40).join('\n'))
console.log('\n=== PRAGER images downloaded:', prager.downloadedCount)
console.log('cember error:', cember.error || 'none', '| prager error:', prager.error || 'none')
