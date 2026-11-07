// Full-page Playwright screenshots for design QA (see docs/HANDOFF.md).
//
// Usage (with a production server running, e.g. `npm run build && npx next start -p 3100`):
//   node scripts/screenshots.mjs <out-dir> [paths] [widths] [base-url]
//   node scripts/screenshots.mjs /tmp/shots "/,/shop,/baskets" "375,768,1024,1440"
//
// - Sets the consent cookie so the cookie banner never covers the page.
// - Scrolls through each page first, so lazy images and scroll-triggered content load.
// - Files are named <path>-<width>.png ("/" becomes "home").
import { chromium } from 'playwright'

const [out, pathsArg, widthsArg, baseArg] = process.argv.slice(2)
if (!out) {
  console.error('Usage: node scripts/screenshots.mjs <out-dir> [paths] [widths] [base-url]')
  process.exit(1)
}
const base = baseArg ?? 'http://localhost:3100'
const paths = (pathsArg ?? '/,/shop,/shop/groceries,/baskets,/how-it-works,/about').split(',')
const widths = (widthsArg ?? '375,768,1024,1440').split(',').map(Number)

const browser = await chromium.launch()
for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 } })
  await context.addCookies([{ name: 'se_consent', value: 'essential', url: base }])
  const page = await context.newPage()
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 300) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 100))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1200)
    const name = path === '/' ? 'home' : path.slice(1).replace(/[/?=&]/g, '_')
    await page.screenshot({ path: `${out}/${name}-${width}.png`, fullPage: true })
    console.log(`${name}-${width}.png`)
  }
  await context.close()
}
await browser.close()
