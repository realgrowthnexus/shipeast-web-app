# Home page audit: what the page is missing (gaps lens)

Auditor lens: brand owner who must beat grocerylistjamaica.com, revvcouriers.com, PriceSmart
Jamaica and diaspora gift sites. Spacing/type per section and motion are left to the other
auditors; this file is about missing content, trust, honesty, mobile, accessibility, images,
footer. Home page only.

Method: Playwright (chromium, DPR 1) at 375×812 and 1440×900 against http://localhost:3100/,
cookie banner dismissed with "Essential only", page scrolled through before measuring. Contrast
computed from the hex values in `src/app/globals.css`. Skills loaded: `frontend-design`,
`ui-ux-pro-max` (searches run: `landing` "ecommerce grocery trust signals", `ux` "sticky cookie
banner obscures content", `ux` "focus not obscured", `ux` "live ticker pause control",
`product` "product card add to cart grocery"). Working files:
`/tmp/claude-0/-home-user-shipeast-web-app/3726e011-a553-5fc4-a6e0-d81ec1f92f75/scratchpad/gaps/`.

**upercart.com could not be reached** (`net::ERR_TUNNEL_CONNECTION_FAILED` through the session
proxy). The comparison below relies on the measurements already recorded in
`docs/home-v3/PLAN.md` §11 and on general knowledge of the site; nothing below claims a value
newly measured there.

---

## P0: fix before the owner sees it again

### 1. No way to reach a person except email (trust, the #1 gap)
- **Measured:** page text contains "WhatsApp" 0 times, "876" 0 times. FAQ block and footer show
  only `info@shipeastja.com`. Cause: `src/lib/demo/site.ts` has `whatsapp: ''` and `phone: ''`,
  so every WhatsApp/phone link hides. Derion gave **WhatsApp and phone 876-797-4301**
  (`docs/CLIENT-NOTES.md`, "Contact details he gave"). For a Jamaican sender, WhatsApp is the
  trust channel; grocerylistjamaica and every courier competitor lead with it.
- **Fix:** set `whatsapp: '18767974301'`, `phone: '18767974301'` in `src/lib/demo/site.ts`
  (formatted by `formatJamaicanPhone` → `1-876-797-4301`). Then:
  - Top strip help nav (`header.tsx`, the `lg:flex` nav): add a third link first,
    `<MessageCircle className="size-icon" />` + "WhatsApp us", `href="https://wa.me/18767974301"`,
    same `stripLink` class.
  - FAQ block and footer already render WhatsApp/phone when set: no further change.
- **Priority:** P0.

### 2. A featured basket on the home page says "Not available today"
- **Measured:** 1440 shelf of baskets: "Christmas Hamper" card shows a disabled "Not available
  today" pill instead of "Add basket" (1 of 3 featured baskets dead). On November 13, with the
  Christmas season starting, the one seasonal product reads as a broken shop.
- **Fix:** in `src/app/(home)/page.tsx`, drop baskets in `unavailableIds` from `featured`
  before passing them to `HomeBaskets`; fill to three from the next available non-featured
  baskets; hide the section if none are left. The basket page still shows the hamper's state.
  (Making the hamper available is Derion's call: flag it to the owner.)
- **Priority:** P0.

### 3. "About J$…" is shown 20 times but the rate is never stated
- **Measured:** "J$" appears 20 times; "exchange"/"rate" never explains the conversion. A
  sender comparing with PriceSmart's J$ shelf prices cannot see how USD maps to J$, which is
  exactly the doubt grocerylistjamaica's markup model creates.
- **Fix:** one line under the "Staples for the kitchen" title (and reused under "Ready-made
  baskets"): `<p className="mt-1 text-small text-ink-muted">You pay in US dollars. J$ amounts
  are a guide at {formatJmd(jmdPerUsd)} to USD$1.</p>` (`formatJmd(157)` → `J$157`; rate comes
  from settings, never hard-coded).
- **Priority:** P0.

---

## P1: worth doing in this round

### 4. Out-of-stock answer contradicts the client's default
- **Measured:** FAQ "What happens if an item is out of stock?" answers "You choose at checkout:
  allow a similar item, have us ask you first, or leave it out…". Derion's default is **"Ask me
  first"** (CLIENT-NOTES). "Ask me first" appears 0 times on the page.
- **Fix:** answer in `src/lib/demo/site.ts` faq-6: "We ask you first. If the store is out of
  something, we text or email you before we swap it. You can also choose to allow a similar item
  or leave it out and be refunded for it." Add the same promise as a fourth item in the proof
  band's check list: "If something is out of stock, we ask you first".
- **Priority:** P1.

### 5. Nothing says who ShipEast is
- **Measured:** the legal name appears once (footer bottom line). No sentence anywhere says this
  is a Jamaican company with its own drivers. Diaspora gift sites win on "who is behind this".
  We cannot show a driver photo yet (consent pending) and must not invent numbers.
- **Fix:** under the Jamaica band headline ("Delivering in St. Thomas and Kingston."), add one
  `text-body` paragraph before the estimates line: "ShipEast Couriers & Bearer Service Ltd is a
  courier company based in St. Thomas. Our own drivers do the shopping and the delivery." plus a
  text link "About ShipEast" (`/about`) beside "Delivery areas and fees".
- **Priority:** P1.

### 6. Department tiles advertise thin aisles ("4 items")
- **Measured:** tiles read Groceries 67 items, Household 5, Pharmacy 4, Baby & Child 4. Three of
  four departments announce an almost empty shelf to a first-time visitor.
- **Fix:** remove the count line from the home tiles (`departments.tsx` line ~62). Keep counts
  on `/shop`.
- **Priority:** P1.

### 7. News ticker has no pause control (WCAG 2.2.2)
- **Measured:** `.ticker` runs `38s linear infinite`; it pauses on `:hover` and `:focus-within`,
  but the list items are not focusable and touch has no hover, so keyboard and phone users can't
  stop it. Reduced motion is handled.
- **Fix:** a small client button at the strip's right edge (before the help nav, visible at all
  widths): `size-control grid place-items-center rounded-full text-on-dark hover:bg-crimson-deep`,
  lucide `Pause`/`Play` at `size-icon-sm`, `aria-pressed`, `aria-label="Pause the news"`;
  toggles `data-paused` on the ticker; CSS `&[data-paused] { animation-play-state: paused; }`.
- **Priority:** P1.

### 8. Cookie banner covers a fifth of a phone screen
- **Measured (375×812):** fixed banner `bottom-3`, 351×153px = 19% of the viewport, sitting over
  the hero's tick list and the photo. Its "Essential only" button is also overlapped by the Next
  dev "Issues" pill (dev only).
- **Fix:** in `src/components/site/cookie-banner.tsx`, below `sm`: `p-3`, text stays
  `text-small`, buttons in `mt-2 grid grid-cols-2 gap-2` at `h-control`, target height ≤ 120px.
  Add `scroll-padding-bottom: 8rem` on `html` while the banner is open so focused controls are not
  hidden under it (WCAG 2.4.11).
- **Priority:** P1.

### 9. Search field border fails non-text contrast
- **Measured:** search input `border-2 border-cream-deep` on `bg-cream`: `#F5E8D3` vs `#FFF8EE` =
  **1.15:1** (WCAG 1.4.11 needs 3:1). On phones the cream field sits on a white row, also below
  3:1. This is the most important control on a grocery storefront.
- **Fix:** `border-line-strong` (`#858585`, the existing form-control role), `hover:border-ink-muted`,
  keep `focus:border-crimson`. Keep `bg-cream` fill.
- **Priority:** P1.

### 10. Phones see no food on the first screen
- **Measured (375×812):** the first viewport is the preview strip, ticker, header (65px), search
  row and the crimson hero text; the hero photo starts below 812px. The page claims "grocery
  shop, not corporation", but the first phone screen is a red text block.
- **Fix:** below `lg`, render the hero photo collage first inside the crimson panel at
  `aspect-[16/9]` (max 200px tall, the sticker and the note kept, note scaled to `w-40`), then
  the pill, headline and CTA. Desktop order unchanged.
- **Priority:** P1.

### 11. Footer is missing what a real shop's footer has
- **Measured:** footer contact = email only; no social links; footer links are `min-h-10` (40px),
  below the project's 44px rule (34 targets under 44px on the page, most of them footer links).
- **Fix:** (a) phone and WhatsApp appear once item 1 lands; (b) add a "Follow us" row under the
  contact list with text links (no brand logos, lucide only): "Instagram @shipeast_couriers",
  "TikTok @ShipeastJA", "Facebook: Shipeast Couriers" (handles from CLIENT-NOTES); (c) `linkClass`
  `min-h-10` → `min-h-11`; (d) hours, TRN and registered address stay hidden until Derion sends
  them, with no placeholders.
- **Priority:** P1.

---

## P2: polish, if credits allow

### 12. Duplicate and repeated wording
- "St. Thomas" appears 9 times on the page (ticker, hero pill, tile D, Jamaica band ×3, closing,
  footer ×2). Drop it from the hero pill (make the pill "Bought and delivered in Jamaica") and
  from the closing paragraph ("Groceries on the table at home, paid for from wherever you are.").
- Two identical H2s "Ready-made baskets" (hero tile + section). Rename the hero tile to
  "Baskets ready to go" so the heading list makes sense to a screen reader.
- Headline punctuation is mixed: "Shop for your family in Jamaica.", "Delivering in St. Thomas
  and Kingston.", "Add a note." have full stops; "Staples for the kitchen", "From your phone to
  their door" don't. Rule: no full stop on section titles; keep it only on the H1 and the two
  band statements ("Send groceries, not money.").
- "One tap, one price." (tile B) is generic template copy. Use "Put together for you, one price."

### 13. Payment reassurance is buried
- PayPal is named only in step 2 and the footer bottom line. Under the hero ticks (or replacing
  "They install nothing", which the proof band already says), use "Pay with PayPal or a card".
  Text only; no PayPal logo (lucide-only icon rule).

### 14. Images
- Basket photos are portrait sources (345×517 at 375, 380×570 at 1440) cropped into landscape
  wells (218×136 / 347×217): about 26% of the frame survives. The baby-care crop shows only
  hands. Set `position` on the baby photo to the face/product area or swap to a landscape
  source in `src/lib/photos/home.ts`.
- Hero tile B (vegetable box) is rotated 6° and pushed `-right-6 -bottom-6`, so about a third of
  the photo is cut by the tile edge at 1440 and it reads as an accident. Keep the rotation and
  move it to `-right-3 -bottom-3`.
- Resolution is fine at DPR 1 (rendered/natural ratio 1.0–1.9). Retest at DPR 2 before shipping.

### 15. Dev "2 Issues" overlay (opened and read)
Both are one server console error on route `/`, logged on every render in
`scratchpad/dev.log`:
1. `Route "/": Could not validate 'instant' because the target segment was prevented from
   rendering, likely due to the following error.`
2. `An error occurred while attempting to validate instant UI… [cause] InvariantError:
   Invariant: Cannot access "moduleLoading" without a work store. This is a bug in Next.js.`

These come from Next's dev-only validation of instant navigation (Next 16.4.3 installed), and
Next itself says it is a framework bug. Users never see them and the page renders. They appear
only for `/`. The likely triggers are the `(home)` group's own `loading.tsx` or the
`preconnect()` call in `(home)/layout.tsx`.
**Action:** confirm `npm run build` prerenders `/` cleanly. If it does, leave this for a Next
upgrade and do not spend credits on it. P2.

### 16. Accessibility checks that passed (no action)
- Contrast, all ≥ AA for their sizes: mango on crimson 4.67, blush on crimson 4.91,
  on-crimson-muted on crimson 5.51, mango on leaf 4.89, on-leaf-muted on leaf 5.75,
  on-oxblood-muted on oxblood 8.17, ink-muted on cream 5.44, crimson on cream 6.85.
- Focus is visible on every stop tabbed through (3px signal / blush / mango / ink outlines).
  Product cards use a card-level `has-[a:focus-visible]` outline.
- No horizontal overflow at 375 (`scrollWidth` 375). The H1 is the first visible heading; the
  two H2s before it sit in the closed mobile-menu `<dialog>` and are not exposed.
- Same-day wording is soft everywhere ("we aim to…", "Same-day aim", "Delivery times are
  estimates"). Nothing reads as a guarantee. No invented reviews or counts. "Save USD$10.20" is
  computed from the same price list, so it is honest as long as it stays computed.

---

## Patterns worth borrowing from upercart.com (from knowledge; site unreachable)
- **Aisle tabs on the product rail:** one rail with 3–4 tabs (e.g. Rice & grains · Canned ·
  Oils) instead of one fixed "Staples" row. More food on the same footprint. Do this only once
  the shelf works (P2, next round).
- **Add turns into a quantity stepper** (− 1 +) on the card after the first tap, instead of
  "Added". This is the single most "real shop" affordance missing from our cards. (P1 for the
  shelf page; on the home page it is P2.)
- **A slim service strip** of 3–4 icon+label promises under the hero. We already have it as the
  hero ticks, so don't add a second one.
