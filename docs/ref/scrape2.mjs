import pw from '/Users/eldardizdarevic/Desktop/eldar-design-development-cc/vibe-coding/projects/archetypes/fresh/node_modules/playwright-core/index.js'
const { chromium } = pw
import fs from 'node:fs'
import path from 'node:path'

const PHOTOS = '/Users/eldardizdarevic/Desktop/eldar-design-development-cc/vibe-coding/mockups/prager-brothers/docs/ref/prager-photos'
fs.mkdirSync(PHOTOS, { recursive: true })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const PAGES = [
  'https://www.pragerbrothers.com/',
  'https://www.pragerbrothers.com/products',
  'https://www.pragerbrothers.com/the-prager-brothers',
  'https://www.pragerbrothers.com/breaducation',
  'https://www.pragerbrothers.com/music-calendar',
]

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
const seen = new Set()
let idx = 3 // continue numbering after prager-00..02

for (const url of PAGES) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await sleep(1500)
    // scroll to trigger lazy images
    await page.evaluate(async () => {
      await new Promise((res) => { let t=0; const i=setInterval(()=>{window.scrollBy(0,800);t+=800;if(t>=document.body.scrollHeight){clearInterval(i);res()}},150) })
    })
    await sleep(1200)
    const urls = await page.evaluate(() => {
      const set = new Set()
      document.querySelectorAll('img').forEach((im) => {
        // prefer largest from srcset
        let best = im.currentSrc || im.src
        if (im.srcset) {
          const parts = im.srcset.split(',').map(s => s.trim().split(' '))
          const sized = parts.filter(p => p[1]).map(p => [p[0], parseInt(p[1])])
          if (sized.length) best = sized.sort((a,b)=>b[1]-a[1])[0][0]
        }
        if (best && best.startsWith('http')) set.add(best)
        if (im.dataset && im.dataset.src && im.dataset.src.startsWith('http')) set.add(im.dataset.src)
      })
      return Array.from(set)
    })
    for (const u of urls) {
      const key = u.split('?')[0]
      if (seen.has(key)) continue
      seen.add(key)
      try {
        // request a large rendition for squarespace cdn
        const big = u.includes('squarespace-cdn.com') ? u.split('?')[0] + '?format=1500w' : u
        const resp = await page.context().request.get(big)
        if (!resp.ok()) continue
        const buf = await resp.body()
        if (buf.length < 25000) continue // skip small/icons
        const ext = (key.split('.').pop() || 'jpg').slice(0,4).replace(/[^a-z0-9]/gi,'') || 'jpg'
        fs.writeFileSync(path.join(PHOTOS, `prager-${String(idx).padStart(2,'0')}.${ext}`), buf)
        idx++
      } catch {}
    }
    console.log(url, '-> total saved so far:', idx-3)
  } catch (e) { console.log('ERR', url, String(e).slice(0,80)) }
}
await browser.close()
console.log('DONE. new images:', idx-3)
