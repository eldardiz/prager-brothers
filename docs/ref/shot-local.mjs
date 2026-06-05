import pw from '/Users/eldardizdarevic/Desktop/eldar-design-development-cc/vibe-coding/projects/archetypes/fresh/node_modules/playwright-core/index.js'
const { chromium } = pw
const b = await chromium.launch({ headless: true })
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const p = await ctx.newPage()
await p.goto('http://localhost:3210/', { waitUntil: 'networkidle', timeout: 30000 })
await new Promise(r=>setTimeout(r,1500))
await p.screenshot({ path: 'prager-built-fold.png' })
// scroll through to trigger reveals, then full page
await p.evaluate(async()=>{await new Promise(res=>{let t=0;const i=setInterval(()=>{window.scrollBy(0,700);t+=700;if(t>=document.body.scrollHeight){clearInterval(i);res()}},120)})})
await new Promise(r=>setTimeout(r,1200))
await p.evaluate(()=>window.scrollTo(0,0)); await new Promise(r=>setTimeout(r,500))
await p.screenshot({ path: 'prager-built-full.png', fullPage: true })
await p.setViewportSize({width:390,height:844}); await new Promise(r=>setTimeout(r,600))
await p.screenshot({ path: 'prager-built-mobile.png' })
await b.close(); console.log('shots done')
