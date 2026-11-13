// Renders the brand images from HTML with the real fonts and photos (docs/BRAND.md):
// the logo PNGs, the app icons, and one 1200×630 share card per main page.
//
// Usage: node scripts/brand-assets.mjs            (needs Playwright and network for fonts/photos)
// Writes into public/brand/ and src/app/**/opengraph-image.png. Re-run after changing a title.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const root = new URL('..', import.meta.url).pathname
const mark = readFileSync(root + 'public/brand/shipeast-mark.svg', 'utf8')
const markUri = 'data:image/svg+xml;base64,' + Buffer.from(mark).toString('base64')
const product = (slug) =>
  'data:image/jpeg;base64,' + readFileSync(`${root}public/products/${slug}.jpg`).toString('base64')
const photo = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const c = {
  crimson: '#AE0E31',
  deep: '#7A0A23',
  oxblood: '#4A0B1C',
  blush: '#FFC6D3',
  cream: '#FFF8EE',
  creamDeep: '#F5E8D3',
  leaf: '#16603D',
  mango: '#FFC83D',
  ink: '#2B2326',
  body: '#474747',
}

const head = `<meta charset="utf-8"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=Caveat:wght@700&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0}body{font-family:Figtree,sans-serif;-webkit-font-smoothing:antialiased}
.d{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em}</style>`

/** The logo lock-up: the door mark and the name. */
const logo = (
  onDark,
  size = 44,
) => `<div style="display:flex;align-items:center;gap:${size * 0.28}px">
  <img src="${markUri}" width="${size}" height="${size}" style="${onDark ? `border-radius:${size * 0.23}px;box-shadow:0 0 0 ${Math.max(2, size * 0.05)}px ${c.cream}` : ''}">
  <span class="d" style="font-weight:700;font-size:${size * 0.8}px;line-height:1;color:${onDark ? '#fff' : c.ink}">Ship<span style="color:${onDark ? c.blush : c.crimson}">East</span></span></div>`

const sticker = `<div class="d" style="position:absolute;top:-26px;right:-26px;width:132px;height:132px;border-radius:50%;background:${c.mango};color:${c.ink};display:grid;place-items:center;text-align:center;font-weight:600;font-size:17px;line-height:1.1;transform:rotate(10deg);padding:14px">Bought in Jamaica.<span style="display:block;font-family:Figtree;font-size:12px;font-weight:600;margin-top:4px">Nothing is shipped.</span></div>`

const visuals = {
  photo: (
    v,
  ) => `<div style="position:relative;width:440px;height:440px;background:${c.cream};padding:10px;border-radius:36px;transform:rotate(2.5deg)">
      <img src="${photo(v.photo)}" style="width:100%;height:100%;object-fit:cover;object-position:${v.pos ?? 'center'};border-radius:28px">
      ${v.sticker ? sticker : ''}
      ${v.note ? `<div style="position:absolute;left:-40px;bottom:-22px;background:#fff;border-radius:12px;padding:14px 20px;transform:rotate(-5deg);font-family:Caveat;font-size:32px;line-height:1.05;color:${c.deep};width:270px">${v.note}</div>` : ''}</div>`,
  products: (v) =>
    `<div style="display:grid;grid-template-columns:repeat(2,205px);gap:16px;transform:rotate(2deg)">${v.products
      .map(
        (s) =>
          `<div style="background:#fff;border-radius:26px;height:205px;padding:18px"><img src="${product(s)}" style="width:100%;height:100%;object-fit:contain"></div>`,
      )
      .join('')}</div>`,
  receipt:
    () => `<div style="width:340px;background:#fff;border-radius:12px 12px 0 0;padding:26px 26px 44px;transform:rotate(-3deg);color:${c.ink};clip-path:polygon(0 0,100% 0,100% calc(100% - 12px),90% 100%,80% calc(100% - 12px),70% 100%,60% calc(100% - 12px),50% 100%,40% calc(100% - 12px),30% 100%,20% calc(100% - 12px),10% 100%,0 calc(100% - 12px))">
      <div style="font-weight:600;font-size:19px">Till receipt</div>
      <div style="border-top:2px dashed #ddd;margin:16px 0;"></div>
      ${[
        ['Long Grain Rice', 'J$2,280'],
        ['Cooking Oil', 'J$2,080'],
        ['Mackerel, 2', 'J$2,170'],
        ['Evaporated Milk', 'J$2,500'],
      ]
        .map(
          ([a, b]) =>
            `<div style="display:flex;justify-content:space-between;font-size:18px;color:${c.body};margin:9px 0"><span>${a}</span><span>${b}</span></div>`,
        )
        .join('')}
      <div style="border-top:2px dashed #ddd;margin:16px 0;"></div>
      <div style="display:inline-flex;align-items:center;gap:8px;background:#DDF0E1;color:#0F4A2F;font-weight:600;font-size:16px;border-radius:99px;padding:7px 14px">Photo sent to you</div></div>`,
  mark: (v) =>
    `<img src="${markUri}" width="280" height="280" style="border-radius:66px;transform:rotate(4deg);${v.bg === c.cream ? '' : `box-shadow:0 0 0 12px ${c.cream}`}">`,
}

/** One share card: words on the left, one picture on the right, on a flat brand colour. */
const card = (v) => {
  const dark = v.bg !== c.cream && v.bg !== c.mango
  const fg = dark ? '#fff' : c.ink
  const sub =
    v.bg === c.crimson
      ? '#F3DBE0'
      : v.bg === c.oxblood
        ? '#C3BABD'
        : v.bg === c.leaf
          ? '#CFE6D6'
          : c.body
  return `<!doctype html><html><head>${head}</head><body style="width:1200px;height:630px;background:${v.bg};overflow:hidden">
  <div style="display:flex;height:630px;padding:64px 72px;gap:48px;align-items:center">
    <div style="flex:1;display:flex;flex-direction:column;height:100%;justify-content:space-between">
      ${logo(dark)}
      <div><h1 class="d" style="font-weight:600;font-size:${v.size ?? 66}px;line-height:1.02;color:${fg};max-width:600px">${v.title}</h1>
      <p style="margin-top:22px;font-size:25px;line-height:1.4;color:${sub};max-width:540px">${v.sub}</p></div>
      <div style="font-size:21px;font-weight:600;color:${fg}">shipeastja.com</div>
    </div>
    <div style="width:470px;display:grid;place-items:center">${visuals[v.kind](v)}</div>
  </div></body></html>`
}

const cards = {
  'src/app/opengraph-image.png': {
    bg: c.crimson,
    kind: 'photo',
    photo: '1652262968340-b735524f9ae4',
    sticker: true,
    note: 'For Mummy. Cook something nice. Love, Marcia',
    title: 'Shop for your family in Jamaica.',
    sub: 'Order from overseas. We shop in Jamaica and deliver to their door.',
  },
  'src/app/(site)/shop/opengraph-image.png': {
    bg: c.cream,
    kind: 'products',
    products: [
      'member-s-selection-thai-jasmine-long-grain-rice-9-07-kg-20-l',
      'grace-baked-beans-6-units-300-g',
      'grace-mackerel-in-tomato-sauce-10-units-155-g',
      'walkerswood-jerk-seasoning',
    ],
    title: 'The shop, priced in US dollars.',
    sub: 'Groceries, household, pharmacy and baby items, bought in Jamaica for your family.',
  },
  'src/app/(site)/baskets/opengraph-image.png': {
    bg: c.mango,
    kind: 'photo',
    photo: '1792736945966-d0c23e426648',
    title: 'Ready-made baskets.',
    sub: 'One tap, one price. Put together for the usual needs.',
  },
  'src/app/(site)/how-it-works/opengraph-image.png': {
    bg: c.oxblood,
    kind: 'receipt',
    title: 'See the receipt. See the door.',
    sub: 'A photo of the till receipt and a photo at the door, with every order.',
  },
  'src/app/(site)/delivery/opengraph-image.png': {
    bg: c.leaf,
    kind: 'photo',
    photo: '1595220524884-95d1df1857a9',
    title: 'Delivering in St. Thomas and Kingston.',
    size: 58,
    sub: 'Delivery areas, fees and order times.',
  },
  'src/app/(site)/gifts/opengraph-image.png': {
    bg: c.crimson,
    kind: 'photo',
    photo: '1549116917-bccf55924737',
    note: 'Happy birthday, Grandma!',
    title: 'Send a gift, with a note in the bag.',
    size: 60,
    sub: 'Hampers for Christmas, birthdays, a new baby and back to school.',
  },
  'src/app/(site)/about/opengraph-image.png': {
    bg: c.cream,
    kind: 'photo',
    photo: '1761839258568-fd466a93f68b',
    pos: '35% 30%',
    title: 'We shop. We deliver. We care.',
    sub: 'ShipEast Couriers & Bearer Service Ltd, St. Thomas, Jamaica.',
  },
  'src/app/(site)/track/opengraph-image.png': {
    bg: c.oxblood,
    kind: 'photo',
    photo: '1643960988237-a9c07e084aed',
    pos: '60% center',
    title: 'Track an order, from the till to the door.',
    size: 58,
    sub: 'No account needed. Share the link with your family.',
  },
  'src/app/(site)/faq/opengraph-image.png': {
    bg: c.cream,
    kind: 'mark',
    title: 'Questions senders ask first.',
    sub: 'Paying, substitutions, delivery and refunds, answered plainly.',
  },
  'src/app/(site)/contact/opengraph-image.png': {
    bg: c.crimson,
    kind: 'mark',
    title: 'Talk to a person at ShipEast.',
    sub: 'Message us on WhatsApp or by email.',
  },
}

const browser = await chromium.launch()
const shoot = async (html, file, w, h, opts = {}) => {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: opts.scale ?? 1,
  })
  const page = await ctx.newPage()
  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
  writeFileSync(root + file, await page.screenshot({ omitBackground: Boolean(opts.transparent) }))
  await ctx.close()
  console.log(file)
}

for (const [file, v] of Object.entries(cards)) await shoot(card(v), file, 1200, 630)

mkdirSync(root + 'public/brand', { recursive: true })
const lockup = (onDark) =>
  `<!doctype html><html><head>${head}</head><body style="width:520px;height:140px;display:grid;place-items:center;background:transparent">${logo(onDark, 88)}</body></html>`
await shoot(lockup(false), 'public/brand/shipeast-logo.png', 520, 140, {
  scale: 2,
  transparent: true,
})
await shoot(lockup(true), 'public/brand/shipeast-logo-on-dark.png', 520, 140, {
  scale: 2,
  transparent: true,
})
const icon = (size, pad) =>
  `<!doctype html><html><body style="margin:0;width:${size}px;height:${size}px;background:${c.crimson};display:grid;place-items:center"><img src="${markUri}" width="${size - pad * 2}" height="${size - pad * 2}"></body></html>`
await shoot(
  `<!doctype html><html><body style="margin:0;background:transparent"><img src="${markUri}" width="512" height="512" style="display:block"></body></html>`,
  'public/brand/icon-512.png',
  512,
  512,
  { transparent: true },
)
await shoot(
  `<!doctype html><html><body style="margin:0;background:transparent"><img src="${markUri}" width="192" height="192" style="display:block"></body></html>`,
  'public/brand/icon-192.png',
  192,
  192,
  { transparent: true },
)
await shoot(icon(512, 64), 'public/brand/icon-maskable-512.png', 512, 512)
await shoot(icon(180, 0), 'src/app/apple-icon.png', 180, 180)
await browser.close()
