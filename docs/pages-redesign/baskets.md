# `/baskets` redesign: build plan

Owner: design agent. For: manager review, then the development agent. Scope: the body of
`src/app/(site)/baskets/page.tsx`, from under the shared header to above the shared footer. The
header and footer are already built (`src/components/site/*`) and stay as they are.
`/baskets/[slug]` is out of scope and is not changed.

Read with `CLAUDE.md`, `docs/BRAIN.md`, `docs/TOKENS.md`, `docs/DESIGN-SYSTEM.md`,
`docs/PHOTOGRAPHY.md` and `docs/home-redesign/PLAN.md`. If this plan disagrees with a brand rule
in those files, those files win and the dev agent tells the manager.

Every class named here exists today. **This plan adds no new tokens** (§2.4).

Skills used: `frontend-design` (two passes, see §8) and `ui-ux-pro-max`
(`--design-system "grocery gift basket ecommerce diaspora"`, plus `--domain landing`
"product bundle comparison pricing", `--domain ux` "add to cart feedback", and `--domain style`
"flat bold solid color blocks"). What I rejected from it is listed in §8.3.

---

## Contents

1. [Concept](#1-concept)
2. [Structure blueprint](#2-structure-blueprint): **read this first**
3. [Data](#3-data)
4. [Sections](#4-sections): S1 to S5
5. [Components and files](#5-components-and-files)
6. [Performance and rendering](#6-performance-and-rendering)
7. [Photos](#7-photos)
8. [Self-review](#8-self-review)
9. [Acceptance checklist](#9-acceptance-checklist)
10. [Open questions](#10-open-questions)

---

## 1. Concept

**One job.** Help a sender choose the right ready-made basket and add it in one tap, knowing
exactly what is inside, what it costs in US dollars (with J$ beside it), and what it saves
against buying the same items one by one.

| | |
| --- | --- |
| Audience | Three senders, all on a phone most of the time. **The occasion sender** (Christmas, a new baby) wants something complete that arrives with a message from them. **The monthly supporter** wants the week's staples without picking 9 items again. **The emergency sender** needs the medicine cabinet stocked today. |
| What they must see at a glance | Who each basket is for, what is inside, the USD price with J$ beside it, the real saving, that a gift message is printed, and the Add button. |
| **The ONE bold element** | **The price board.** The crimson hero is a shop price board, not a banner: one big row per basket, "For the weekly shop" above the name in heavy type, and the price set as large as the name on the right, with J$ and the saving under it. It reads like the board over a Jamaican shop counter. Each row jumps to that basket below. No photo in the hero: the board *is* the picture, and it answers "what do you have and what does it cost" before the sender scrolls. |
| Everything else | Quiet. The basket rows below are flat white cards on the grey page. The only "receipt" idea is functional: each basket lists its items at today's shop price and ends with a dashed rule and three totals (one by one, basket, you save). That proves the saving instead of claiming it. |
| How we beat competitors | grocerylistjamaica.com and diaspora gift sites show bundles as a photo and a price, with a vague "includes". We show every item, its quantity and today's price, and do the maths in the open. Gift sites hide the delivery; we say who buys it, that you get the till receipt photo and a door photo, and what happens if an item has run out. Remittance sites send cash; a basket sends exactly the items, with a printed message from you. We never name a competitor and never claim a price comparison with them. |

The page keeps every real function of the current one: add to basket, links to
`/baskets/[slug]`, the gift message, the comparison (now inside each basket, §4 S2), the link to
build your own basket, and the empty state. `grep -rn "/baskets#" src docs` finds no anchors
that other pages link to today. This plan **adds** one anchor per basket (`#<slug>`, e.g.
`/baskets#christmas-hamper`) and `#how-baskets-work`, so the home page, `/gifts` and `/monthly`
can deep-link later.

---

## 2. Structure blueprint

### 2.1 Whole-page skeleton

Heights are approximate, with the demo data (4 baskets, 9 / 4 / 4 / 5 items). `▓` = solid red
(crimson / oxblood), `░` = neutral (`page` / `surface`). "Wide" / "page" = content capped at
`max-w-wide` (1280) / `max-w-page` (1152).

```
1440 × ~4,700px (body only)                            375 × ~8,300px (body only)

┌▓▓▓ (shared header 72)                            ┐   ┌▓ (shared header 64 + search row 56) ┐
├▓▓▓ S1 PRICE BOARD  full crimson band, wide       │   ├▓ S1 PRICE BOARD  1 column:           │
│▓▓▓   split 4/8: title + lead | board of 4 rows   │   │▓   title, lead, cut-off,             │
│▓▓▓   (each row: icon, who + name, price)   ~620  │   │▓   then 4 board rows           ~860  │
├░░░ S2 THE BASKETS  page band, page width         │   ├░ S2 THE BASKETS  section header,     │
│░░░   header, then 4 stacked row cards:           │   │░   then 4 stacked cards, each:       │
│░░░   photo 5/12 | name, items+prices, buy  ~2,600│   │░   photo, name, buy, items    ~5,000 │
├▓▓▓ S3 AFTER YOU ORDER  full oxblood band         │   ├▓ S3 AFTER YOU ORDER  title, lead,    │
│▓▓▓   split 5/7: title + lead | ruled list of 3   │   │▓   3 ruled rows                ~820  │
│▓▓▓                                         ~520  │   │                                      │
├░░░ S4 OCCASIONS AND REPEAT  surface band         │   ├░ S4 OCCASIONS  photo, gift text,     │
│░░░   split 6/6: framed photo | gift + repeat ~640│   │░   rule, repeat text           ~1,060│
├░░░ S5 CLOSING  page band, contained crimson      │   ├░ S5 CLOSING  stacked panel     ~480  │
│░░░   panel: text | buttons               ~380    │   │                                      │
├▓▓▓ (shared footer, oxblood)                      ┘   └▓ (shared footer)                     ┘
```

**Rhythm:** red text-led mass (the board) → long light photo-led run (the baskets) → red
text-led band (what happens) → light photo-led split (occasions) → contained red panel → red
footer. Two dark full-bleed bands never touch: S3 sits between two light bands, and the S5
panel is contained on the `page` band so it never meets the oxblood footer. Text-led and
photo-led sections alternate, as on the home page.

### 2.2 Section structures at a glance

| Section | 1. Pattern | 2. Background | 3. Container / height | 4. Columns 375 → 768 → 1024 → 1440 (phone order first) | 5. Blocks (counts) | 6. Why this serves the sender |
| --- | --- | --- | --- | --- | --- | --- |
| S1 Price board | **Split two-column 4/8**: title block left, a **price board** (ruled list of full-width link rows) right | Solid `crimson`, no photo | Full-bleed, content `max-w-wide`; `section` padding; ~620 at 1440 | 1 (h1, lead, cut-off, board) → 1 → 2 (4/8) → 2 (4/8) | h1, lead, cut-off note, 1 board = 1 row per basket (4 today), each row = icon disc + "who it's for" + name + item count + USD price + J$ + saving tag | Every basket, who it is for and its price in one look, above the fold on a laptop and in the first two screens on a phone. Competitors open with a banner photo and make you click each bundle to see a price. |
| S2 The baskets | **Stacked row cards** (one full-width card per basket, same layout each time, no zig-zag) | `page` band; cards `surface` | Contained `max-w-page`; `section` padding; ~620 per card at 1440 | 1 (photo, header, buy, items) → 1 (photo 16:9 on top; header, items, buy below) → 2 (photo 5 / body 7) → 2 (5 / 7) | Section header (h2 + lead) + 4 cards. Each card = 1 photo + occasion line + h3 name link + 1-line description + **items table** (one row per item, 4 to 9) with 3 totals + buy bar (price, saving tag, quantity + Add, gift line) | The whole basket is readable without opening anything: items, quantities, line prices and the honest saving. One layout repeated makes four baskets easy to compare by scrolling. |
| S3 After you order | **Split two-column 5/7**: title + lead + link left, **ruled list of 3** right | Solid `oxblood` | Full-bleed, content `max-w-page`; `section` padding; ~520 | 1 → 1 → 2 (5/7) → 2 (5/7) | h2, lead, 1 link; 3 rows = icon disc + h3 + 1–2 line body | Briefly answers the two doubts that matter more for a many-item basket: "will I see what was bought?" and "what if something has run out?". Text-led after a long photo run. |
| S4 Occasions and repeat | **Split two-column 6/6**: framed photo left, two stacked text blocks right (gift, then repeat sending) separated by a rule | Solid `surface`; photo framed, not a background | Contained `max-w-page`; `section` padding; ~640 | 1 (photo, gift, repeat) → 1 (photo 16:9, then text) → 2 (6/6) → 2 (6/6) | 1 photo 4:3, h2 + lead + 1 outline button (gift); rule; h3 + body + 1 link (repeat; wording depends on the `monthly_orders` flag) | Serves the occasion sender (the printed message, the gift ideas page) and the monthly supporter (send it again in one tap, or monthly orders when switched on) in one calm block. |
| S5 Closing | **Single contained panel**: text left, buttons right inside | `page` band + solid `crimson` panel `rounded-2xl` | Contained `max-w-page`; `section` padding; ~380 | 1 → 1 → 2 (text / buttons) → 2 | h2, 1 line, primary button + text link | For the sender who would rather pick each item: one clear way to the shop. Same closing shape as the home page, so the brand feels consistent. |

---

## 3. Data

All loaders are cached (`'use cache'` + `cacheLife('hours')` in `src/lib/data/source.ts`), so
the page prerenders. The page reads no `searchParams`, `cookies()` or `headers()`.

```ts
const [settings, zones, summaries, products] = await Promise.all([
  getSettings(),        // jmdPerUsd, features.monthly_orders
  getActiveZones(),     // parishes + cut-off for the hero note
  getBaskets(),         // BasketSummary[]: basket, itemCount, separateCents
  getProducts(),        // to list each basket's items with today's price and stock
])
const rows = buildBasketRows(summaries, products)        // new, src/lib/baskets.ts
const cutoff = earliestCutoff(zones)                      // src/lib/home.ts
const parishList = joinParishes(zones.map((z) => z.parish))
```

### 3.1 New helper `src/lib/baskets.ts` (pure, unit-tested)

```ts
export interface BasketLine { product: Product; quantity: number; lineCents: number }
export interface BasketRow {
  summary: BasketSummary
  lines: BasketLine[]          // in the basket's own item order
  savingCents: number          // max(0, separateCents - priceCents)
  unavailable: Product[]       // lines whose product.status !== 'visible'
}
/** Rows for the listing: orderable baskets first, then the rest, each group in admin order. */
export function buildBasketRows(summaries: BasketSummary[], products: Product[]): BasketRow[]
```

- `lineCents = product.priceCents * quantity`. The sum of `lineCents` equals
  `summary.separateCents`; the test asserts it for every demo basket.
- A basket item whose product is missing from `products` is skipped (as `getBasket` does).
- Tests (`src/lib/baskets.test.ts`): totals match `separateCents`; `savingCents` is never
  negative; the Christmas Hamper (demo coffee is `out_of_stock`) is unavailable and sorts last;
  order is otherwise kept.

### 3.2 Occasion wording and icons

- Export the existing `occasionPhrases` from `src/lib/home.ts` (today a private `const`). The
  board and rows show `For ${occasionPhrases[occasion]}`: "For the weekly shop", "For a new
  baby", "For the medicine cabinet", "For Christmas", "For back to school".
- New `src/components/pages/baskets/occasion-icon.tsx` (server): `everyday` → `ShoppingBasket`,
  `baby` → `Baby`, `pharmacy` → `Pill`, `christmas` → `TreePine`, `school` → `Backpack`. All
  `lucide-react`, all `aria-hidden`.

### 3.3 Demo values (for checking screenshots, never hard-coded)

Rate 157, J$ rounded to 10 by `usdCentsToJmd`.

| Basket | Items | One by one | Basket | Saving | J$ | Orderable |
| --- | --- | --- | --- | --- | --- | --- |
| Family Food Basket | 9 | USD$79.20 | USD$69.00 | USD$10.20 | J$10,830 | yes |
| Baby Care Pack | 4 | USD$127.60 | USD$109.00 | USD$18.60 | J$17,110 | yes |
| Pharmacy Pack | 4 | USD$64.20 | USD$59.00 | USD$5.20 | J$9,260 | yes |
| Christmas Hamper | 5 | USD$55.30 | USD$49.00 | USD$6.30 | J$7,690 | **no** (Ground Coffee out of stock) |

---

## 4. Sections

Shared conventions:

- Focus on crimson and oxblood: the section carries `on-dark-focus` (3px `blush` ring).
- Links on light: `lightLink` from `src/components/pages/home/steps.tsx`. Links on crimson:
  `onCrimsonLink` from `src/components/pages/home/hero.tsx`.
- Money only through `formatUsd`, `formatJmd`, `usdCentsToJmd` and `<Price>`.
- No eyebrows anywhere on the page. No `Reveal`, `Stagger` or parallax (§4 motion notes).

### S1 Price board (the bold element)

**Structure**

- Pattern: split two-column 4/8. Left: title block. Right: the price board, a `<nav>` holding
  an `<ol>` of full-width link rows separated by 1px rules.
- Background: solid `crimson`, full-bleed. No photo, no overlay.
- Container: `max-w-wide gutter`; `section` padding top and bottom (the header bar above is
  the same crimson, so the two read as one block, as on the home page).
- Columns: 375 = 1 (title, lead, cut-off, board). 768 = 1 (board full width). 1024 and 1440 =
  `lg:grid-cols-12`, title `lg:col-span-4`, board `lg:col-span-8`, `lg:items-start lg:gap-12`.
- Blocks: h1, lead, CutoffNote, board of N rows (N = baskets, 4 today).
- Why: the sender sees everything on offer and the price before choosing, and one tap takes
  them to the full basket.

**Copy**

- h1: **Ready-made baskets for home**
- Lead (`allSave` = every basket has a saving): "Each one is packed around a real need and
  priced as one. Our driver buys every item fresh in Jamaica on the day we deliver, and each
  basket costs less than the same items bought one by one."
  If not every basket saves, drop the last clause.
- Cut-off: `<CutoffNote cutoff={cutoff} tone="onDark" />` when `cutoff` exists.
- Board label (screen readers only): `aria-label="Baskets on this page"`.
- Board row (Family Food Basket): "For the weekly shop" / **Family Food Basket** / "9 items" /
  **USD$69.00** / "about J$10,830" / tag "Save USD$10.20".
- Unavailable row (Christmas Hamper): the tag is replaced by "Not available today" in
  `text-on-crimson-muted`.

**Wireframes**

```
1440 (content 1280 wide)
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ ▓ crimson                                                                                │
│  Ready-made baskets          ┌──────────────────────────────────────────────────────────┐│
│  for home           (h1)     │ (●)  For the weekly shop                    USD$69.00  ↓ ││
│                              │      Family Food Basket   9 items       about J$10,830   ││
│  Each one is packed around   │                                         [Save USD$10.20] ││
│  a real need and priced as   ├──────────────────────────────────────────────────────────┤│
│  one. Our driver buys ...    │ (●)  For a new baby                        USD$109.00  ↓ ││
│                              │      Baby Care Pack       4 items       about J$17,110   ││
│  (clock) Same-day delivery   ├──────────────────────────────────────────────────────────┤│
│  when you order by 1:00 PM   │ (●)  For the medicine cabinet               USD$59.00  ↓ ││
│  Jamaica time.               ├──────────────────────────────────────────────────────────┤│
│                              │ (●)  For Christmas                          USD$49.00  ↓ ││
│   col 1–4                    │      Christmas Hamper     5 items    Not available today ││
│                              └──────────────────────────────────────────────────── 5–12 ┘│
└──────────────────────────────────────────────────────────────────────────────────────────┘

768                                         375
┌────────────────────────────────────────┐  ┌─────────────────────────────┐
│ Ready-made baskets for home            │  │ Ready-made baskets          │
│ Lead (max-w-2xl)                       │  │ for home                    │
│ (clock) cut-off                        │  │ Lead                        │
│ ┌────────────────────────────────────┐ │  │ (clock) cut-off             │
│ │(●) For the weekly shop  USD$69.00 ↓│ │  │ ┌─────────────────────────┐ │
│ │    Family Food Basket   about J$…  │ │  │ │(●) For the weekly shop  │ │
│ │    9 items             [Save …]    │ │  │ │    Family Food    USD$69│ │
│ ├────────────────────────────────────┤ │  │ │    Basket         .00   │ │
│ │ … 3 more rows                      │ │  │ │    9 items  about J$10,8│ │
│ └────────────────────────────────────┘ │  │ │             [Save …]    │ │
└────────────────────────────────────────┘  │ ├─────────────────────────┤ │
                                            │ │ … 3 more rows           │ │
                                            │ └─────────────────────────┘ │
                                            └─────────────────────────────┘
```

At 375 the price column is `text-right` and wraps under itself ("USD$69.00" fits on one line
at `text-title` 23px in ~110px; the name wraps to two lines, which is fine).

**Classes**

- Section: `bg-crimson text-on-dark on-dark-focus section` with `aria-labelledby="baskets-title"`.
- Grid: `mx-auto max-w-wide gutter lg:grid lg:grid-cols-12 lg:items-start lg:gap-12`.
- h1: `text-h1 text-balance animate-rise`. Lead: `mt-4 max-w-2xl text-lead text-on-crimson-muted animate-rise [animation-delay:80ms]`. Cut-off: `mt-6`.
- Board wrapper: `mt-10 lg:col-span-8 lg:mt-0`; `<ol>`: `divide-y divide-crimson-deep border-y border-crimson-deep`.
  (`divide-crimson-deep` / `border-crimson-deep` are role classes: the rule is a darker red
  line on red, quiet but visible.)
- Row link `<a href="#family-food-basket">`: `group grid min-h-control grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 px-2 py-5 transition-colors duration-150 hover:bg-crimson-deep active:bg-oxblood sm:px-4 lg:py-6 lg:grid-cols-[auto_1fr_auto_auto]`.
- Icon disc: `grid size-12 place-items-center rounded-full bg-crimson-deep text-blush [&_svg]:size-6` (on hover the row turns crimson-deep, so the disc gets `group-hover:bg-oxblood` to stay visible).
- Middle: who line `text-small text-on-crimson-muted`; name `text-title text-on-dark`; item count `text-small text-on-crimson-muted tabular-nums`.
- Price column: `text-right`; USD `text-title font-extrabold tabular-nums` (via `formatUsd`, not `<Price>`, because `<Price size="lg">` is `text-h2` and would outweigh the name); "about J$…" `text-small text-on-crimson-muted tabular-nums`; saving tag `mt-1 inline-block rounded-sm bg-jm-gold px-2 py-0.5 text-xs font-bold text-ink tabular-nums` ("Save USD$10.20", the same tag as the home basket cards).
- Arrow column (≥1024 only): `ArrowDown` `size-icon text-blush transition-transform duration-150 group-hover:translate-y-0.5 motion-reduce:transition-none`.

**States**

- Hover: row fill `crimson-deep`, arrow nudges 2px down. Focus-visible: 3px `blush` ring
  (`on-dark-focus`), inset (`focus-visible:ring-inset`) so it is not clipped by the rules.
  Pressed: `oxblood` fill.
- Unavailable basket: row still links to its card (the card explains why); tag replaced by
  "Not available today".
- No baskets: the board is not rendered; the lead becomes "New baskets are on the way. In the
  meantime you can build your own from the shop." with
  `<ButtonLink href="/shop" variant="onDark" size="lg" className="mt-8">Shop single items</ButtonLink>`.
- No active zones: no cut-off note.

**Motion**: h1 and lead use the existing CSS `animate-rise` (page-load, once). The board does
not animate: it is the content, and it must be readable instantly. Reduced motion:
`animate-rise` already respects it.

**Accessibility**

- `<nav aria-label="Baskets on this page"><ol>…</ol></nav>`. Each row's accessible name is
  its visible text in reading order ("For the weekly shop Family Food Basket 9 items USD$69.00
  about J$10,830 Save USD$10.20"). Icons `aria-hidden`.
- Contrast on crimson: `on-dark` 6.9:1, `on-crimson-muted` above 4.5:1 (TOKENS pairs), saving
  tag `ink` on `jm-gold`. On hover (`crimson-deep`) contrast only rises.
- Row target height ≥ 76px (two text lines + padding), full width.

---

### S2 The baskets

**Structure**

- Pattern: stacked row cards, one per basket, identical layout (photo always on the left at
  ≥1024; no zig-zag, so the eye scans the same column for price every time).
- Background: `page` band. Cards: flat `surface` with a `line` border, `rounded-xl`.
- Container: `max-w-page gutter`, `section` padding. Gap between cards `gap-6 lg:gap-8`.
- Columns per card:
  - 375: photo 16:9 → header → buy bar → items table.
  - 768: photo 16:9 on top → header → items table → buy bar (buy bar horizontal: price left,
    Add right).
  - 1024 / 1440: `lg:grid-cols-12`: photo `lg:col-span-5` full card height (`lg:h-full`,
    `object-cover`), body `lg:col-span-7` with header → items table → buy bar.
- Blocks: section header (h2 + lead) + 4 cards. Card = photo, occasion line, h3 link, 1-line
  description, items table (4–9 rows + 3 totals), buy bar (price, saving tag, quantity stepper
  + Add, gift line).
- Why: the whole basket is visible without leaving the page; the totals turn "save money"
  into numbers the sender can check line by line.

**Copy**

- h2 `id="whats-inside"`: **What's inside each basket**
- Lead: "Every item at today's shop price, so you can see exactly what you save."
- Card header: occasion line with icon ("For the weekly shop"), h3 = basket name (link to
  `/baskets/[slug]`), description from data ("A week of pantry staples for a family of four.").
- Items table caption (screen readers only): "What's inside the Family Food Basket, at
  today's shop prices".
- Column heads (visible, small): "Item" / "Shop price".
- Line: "2 ×" / "Corned Beef" + "12 oz can" / "USD$9.50".
- Totals: "Bought one by one" `USD$79.20`; "Basket price" `USD$69.00`; "You save" `USD$10.20`.
- Buy bar: `<Price>` + tag "Save USD$10.20" + `<AddToBasket variant="full">` ("Add to basket",
  then "Added. 3 items in your basket. View basket").
- Gift line: (Gift icon) "Add a gift message at checkout. We print it and hand it over."
- Unavailable box: title "Not available today"; body "Ground Coffee is out of stock, so this
  basket can't be ordered right now. You can add the other items one by one from the shop.";
  button "Go to the shop" → `/shop`. (Same wording as the detail page.)
- Footnote under the last card: "Shop prices are today's prices for the same items and
  quantities. They can change before we shop; you pay the price shown at checkout."
  **Needs manager check**: the second sentence must match how checkout really prices
  baskets. If unsure, keep only the first sentence.

**Wireframes**

```
1440 (card 1152 wide)
┌──────────────────────────────┬─────────────────────────────────────────────────────────┐
│                              │ (🧺) For the weekly shop                                │
│                              │ Family Food Basket                         (h3 title)   │
│        photo 5/12            │ A week of pantry staples for a family of four.          │
│        object-cover          │ ┌─────────────────────────────────────────────────────┐ │
│        full card height      │ │ Item                                     Shop price │ │
│        (~620px)              │ │ 1 ×  Long Grain Rice  10 lb bag           USD$14.50 │ │
│                              │ │ 1 ×  All-Purpose Flour  5 lb bag           USD$6.50 │ │
│                              │ │ …  (9 lines, page fill, rounded-lg)                 │ │
│                              │ │ - - - - - - - - - - - - - - - - - - - - - - - - - - │ │
│                              │ │ Bought one by one                         USD$79.20 │ │
│                              │ │ Basket price                              USD$69.00 │ │
│                              │ │ You save                                  USD$10.20 │ │
│                              │ └─────────────────────────────────────────────────────┘ │
│                              │ ─────────────────────────────────────────────────────── │
│                              │ USD$69.00  [Save USD$10.20]     [−] 1 [+] [Add to basket]│
│                              │ about J$10,830                                          │
│                              │ (gift) Add a gift message at checkout. We print it …    │
└──────────────────────────────┴─────────────────────────────────────────────────────────┘

768                                          375
┌──────────────────────────────────────┐     ┌───────────────────────────┐
│ photo 16:9                           │     │ photo 16:9                │
├──────────────────────────────────────┤     ├───────────────────────────┤
│ For the weekly shop                  │     │ For the weekly shop       │
│ Family Food Basket                   │     │ Family Food Basket        │
│ A week of pantry staples …           │     │ A week of pantry …        │
│ ┌──────────────────────────────────┐ │     │ USD$69.00 [Save USD$10.20]│
│ │ items table + totals             │ │     │ about J$10,830            │
│ └──────────────────────────────────┘ │     │ [−] 1 [+] [Add to basket ]│
│ USD$69.00 [Save]   [−]1[+] [Add …]   │     │ (gift) Add a gift message │
│ about J$10,830                       │     │ ┌───────────────────────┐ │
│ (gift) Add a gift message …          │     │ │ items table + totals  │ │
└──────────────────────────────────────┘     │ └───────────────────────┘ │
                                             └───────────────────────────┘
```

(The basket glyph in the wireframe stands for the `ShoppingBasket` lucide icon.)

**Classes**

- Section: `<section aria-labelledby="whats-inside" className="section">`, inner `mx-auto max-w-page gutter`.
  Header: `SectionHeader` (`src/components/site/section.tsx`) with `id="whats-inside"`, title and lead, no eyebrow; `mb-8 lg:mb-12`.
- List: `<ul className="flex flex-col gap-6 lg:gap-8">`, one `<li>` per card.
- Card `<article id={slug} aria-labelledby={`${slug}-name`}>`:
  `scroll-mt-header overflow-hidden rounded-xl border border-line bg-surface lg:grid lg:grid-cols-12 target:border-crimson target:ring-2 target:ring-crimson`.
- Photo: `<StockPhoto name={basketPhotos[slug]} sizes="(min-width: 1024px) 470px, (min-width: 768px) 720px, 100vw" className="aspect-16/9 rounded-none lg:col-span-5 lg:aspect-auto lg:h-full" />`.
  No photo in the registry: a `bg-crimson` block of the same size with the occasion icon in
  `text-blush size-12` (the home card's fallback).
- Body: `flex flex-col gap-5 p-card lg:col-span-7 lg:p-card-lg`.
- Occasion line: `flex items-center gap-2 text-small font-semibold text-ink-muted` with the icon in `size-icon text-crimson`.
- h3: `text-title text-ink` holding `<Link id={`${slug}-name`} href={`/baskets/${slug}`} className="hover:text-crimson hover:underline underline-offset-4 decoration-2">`.
- Description: `text-body text-ink-body`.
- Buy bar (DOM order: after the header, before the table; visual order at ≥768 after the table
  with `md:order-last`): `flex flex-col gap-4 border-y border-line py-5 md:flex-row md:flex-wrap md:items-end md:justify-between md:border-b-0 md:pb-0`.
  - `<Price cents={priceCents} jmdPerUsd={rate} size="lg" />` beside the saving tag (same tag classes as S1).
  - `<AddToBasket kind="basket" id={id} name={name} variant="full" />`.
  - Gift line: `flex w-full gap-2 text-small text-ink-muted` with `Gift` `mt-0.5 size-icon shrink-0 text-crimson`.
- Items table wrapper: `rounded-lg bg-page p-4 md:p-5`.
  - `<table className="w-full text-left text-small text-ink-body tabular-nums">` with
    `<caption className="sr-only">`.
  - `<thead>`: `text-xs font-bold text-ink-muted`; cells `pb-2`. The quantity column has an
    sr-only head "Quantity".
  - Body rows: `border-t border-line`; cells `py-2.5 align-top`; quantity `w-10 pr-2 font-bold text-ink whitespace-nowrap` ("2 ×"); item = name `font-semibold text-ink` + size on its own line `text-ink-muted`; price `pl-3 text-right whitespace-nowrap`.
  - Out-of-stock line: `<Badge tone="warn">Out of stock</Badge>` after the size.
  - `<tfoot className="border-t border-dashed border-line-strong">`: rows `th scope="row"` left, value right; first two `text-ink-body`, then "You save" `font-extrabold text-crimson`. Top padding `pt-3`.
  - If `savingCents === 0`: drop the "You save" row and the saving tags; show only "Basket price".
- Footnote: `mt-6 max-w-2xl text-small text-ink-muted`.

**States**

- Add: the existing `AddToBasket` states (pending spinner blocks clicks, "Added. N items in
  your basket. View basket" in `text-ok`, error in `text-danger`; all in an `aria-live`
  region). Works as a plain form post before JavaScript.
- Unavailable basket (`unavailable.length > 0`): the stepper and button are replaced by a
  `rounded-md border border-warn-line bg-warn-tint p-4 text-small text-ink` box (use the
  existing `Alert` with `tone="warn"` if its markup fits; otherwise these classes) with the copy
  above and `<ButtonLink href="/shop" variant="outline" size="sm" className="mt-3">`. The price
  stays visible. The card sorts last (§3.1).
- Hash target (`/baskets#baby-care-pack`, or a tap on the board): the card gets a crimson
  border and 2px ring via `target:`, and the sticky header does not cover it
  (`scroll-mt-header`).
- No basket at all: S2 renders `<EmptyState icon={<Gift aria-hidden />} title="New baskets are on the way" action={<ButtonLink href="/shop">Shop single items</ButtonLink>}>In the meantime you can build your own basket from the shop.</EmptyState>` and S3 and S4 are hidden.
- Hover: the card does not lift (it is not one big link). Only the name link, the stepper and
  the button react.

**Motion**: none on scroll. `StockPhoto` without `zoom` (the card is not a link). Reduced
motion: nothing to change.

**Accessibility**

- Each card is an `<article>` named by its h3. Reading order is header → price and Add → items,
  on every width, so screen-reader and keyboard order match the phone layout. At ≥768 the buy
  bar moves below the table visually, but the table holds no focusable element, so focus order
  still follows what is seen (name link, then stepper, then button).
- The items list is a real `<table>` with caption, `scope="col"` heads and `scope="row"` total
  labels; the struck "one by one" style is not used (plain numbers with labels read better).
- The Add button's accessible name includes the basket ("Add to basket" + quantity label
  "Quantity of Family Food Basket").
- Photo alt from the registry (it names the subject); the h3 names the basket.

---

### S3 After you order

**Structure**

- Pattern: split two-column 5/7: title block left, ruled list of 3 right.
- Background: solid `oxblood`, full-bleed.
- Container: `max-w-wide gutter` outer, `max-w-page` inner (as home S5); `section` padding.
- Columns: 375 / 768 = 1 (title, lead, link, list). 1024 / 1440 = `lg:grid-cols-12`,
  title `lg:col-span-5`, list `lg:col-span-7`.
- Blocks: h2, lead, 1 link; list of 3 rows, each = icon disc + h3 + body.
- Why: two doubts are bigger for a 9-item basket than for one product: proof that every item
  was bought, and what happens when something has run out. Three short rows answer them;
  the full story is one link away.

**Copy**

- h2 `id="how-baskets-work"` (section `scroll-mt-header`): **What happens after you add a basket**
- Lead: "We buy the whole basket in Jamaica on the day we deliver. You see the proof; your
  family just opens the door."
- Link: "How it works" → `/how-it-works`.
- Rows:
  1. `ReceiptText` **A photo of the till receipt.** "Our driver buys every item fresh and
     sends you the receipt from the store, so you see what was bought and what it cost."
  2. `Repeat2` **If something has run out, you decide.** "At checkout choose Allow similar,
     Ask me first, or Leave it out. A left-out item is refunded."
     (Rule names exactly as `SUBSTITUTION_RULES` in `src/lib/substitution.ts`; build the
     three names from that array, not hand-typed.)
  3. `DoorOpen` **A photo at the door, a text for them.** "You get a photo when the basket is
     handed over. Your family gets a text and installs nothing."

**Wireframes**

```
1440                                                       375
┌▓ oxblood ──────────────────────────────────────────────┐ ┌▓──────────────────────────┐
│ What happens after you      (◉) A photo of the till    │ │ What happens after you    │
│ add a basket                    receipt.               │ │ add a basket              │
│                                 Our driver buys …      │ │ Lead                      │
│ Lead (on-oxblood-muted)     ─────────────────────────  │ │ How it works              │
│                             (◉) If something has run   │ │ ───────────────────────── │
│ How it works                    out, you decide. …     │ │ (◉) A photo of the till … │
│                             ─────────────────────────  │ │ ───────────────────────── │
│   col 1–5                   (◉) A photo at the door …  │ │ (◉) If something has run… │
│                                 col 6–12               │ │ ───────────────────────── │
└────────────────────────────────────────────────────────┘ │ (◉) A photo at the door … │
                                                           └───────────────────────────┘
768: as 375, list at full width with the lead capped at max-w-2xl.
```

**Classes**

- Section: `id="how-baskets-work" aria-labelledby="how-baskets-work-title" className="scroll-mt-header bg-oxblood section text-on-dark on-dark-focus"`.
- h2: `text-h2 text-balance`. Lead: `mt-3 max-w-2xl text-lead text-on-oxblood-muted`.
- Link: `mt-4 inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-blush decoration-2 underline-offset-4 hover:decoration-on-dark` (the `onCrimsonLink` string works on oxblood too).
- List: `mt-8 divide-y divide-line-on-dark border-y border-line-on-dark lg:mt-0`; rows `grid grid-cols-[3rem_1fr] gap-4 py-6`.
- Icon disc: `grid size-12 place-items-center rounded-full bg-crimson-deep text-on-dark [&_svg]:size-6`.
- h3: `text-h3`. Body: `mt-1 text-body text-on-oxblood-muted`.

**States**: static text. **Motion**: none. **Accessibility**: `on-oxblood-muted` on oxblood
passes AA (TOKENS pairs); icons `aria-hidden`; the list is a `<ul>`.

---

### S4 Occasions and repeat sending

**Structure**

- Pattern: split two-column 6/6: framed photo left, two text blocks stacked right with a
  rule between.
- Background: solid `surface`. Photo framed `rounded-2xl` (not a background, no overlay).
- Container: `max-w-page gutter`, `section` padding.
- Columns: 375 = 1 (photo 4:3, gift block, rule, repeat block). 768 = 1 (photo 16:9, then
  text). 1024 / 1440 = `lg:grid-cols-12 lg:items-center lg:gap-12`, photo `lg:col-span-6`,
  text `lg:col-span-6`.
- Blocks: 1 photo; gift block = h2 + lead + outline button; rule; repeat block = h3 + body +
  1 link.
- Why: the occasion sender learns the message is printed and handed over, and finds more
  ideas; the monthly supporter learns repeating is one tap, without a separate section.

**Copy**

- h2 `id="occasions"`: **Sending for an occasion?**
- Lead: "Add a gift message at checkout. We print it and hand it over with the basket, so it
  arrives from you, not from a courier."
- Button: "See gift ideas" → `/gifts` (`ButtonLink variant="outline" size="lg"`).
- Repeat block, `settings.features.monthly_orders === true`:
  - h3 **Want it every month?** Body: "Set up a monthly order once. We shop and deliver on
    the day you pick, with the receipt photo and the door photo every time." Link: "Set up a
    monthly order" → `/monthly`.
- Repeat block, flag off (today):
  - h3 **Sending the same basket again?** Body: "With a free account, every past order has a
    Send this again button: the same items to the same address, in one tap." Link: "How
    repeat sending works" → `/monthly` (that page already explains both states).

**Wireframes**

```
1440                                                     375
┌░ surface ─────────────────────────────────────────────┐ ┌░─────────────────────────┐
│ ┌──────────────────────────┐  Sending for an occasion?│ │ ┌───────────────────────┐ │
│ │                          │  Lead …                  │ │ │ photo 4:3             │ │
│ │  photo 4:3, rounded-2xl  │  [See gift ideas]        │ │ └───────────────────────┘ │
│ │  (woman wrapping gifts   │  ────────────────────    │ │ Sending for an occasion? │
│ │   by a Christmas tree)   │  Sending the same basket │ │ Lead                      │
│ │                          │  again?                  │ │ [See gift ideas        ]  │
│ └──────────────────────────┘  Body … How repeat …     │ │ ───────────────────────── │
│   col 1–6                       col 7–12              │ │ Sending the same basket … │
└───────────────────────────────────────────────────────┘ │ Body · link               │
768: photo 16:9 full width, text below at max-w-2xl.       └───────────────────────────┘
```

**Classes**

- Section: `aria-labelledby="occasions" className="bg-surface section"`; grid as above.
- Photo: `<StockPhoto name="basketsGiftWrap" sizes="(min-width: 1024px) 552px, 100vw" className="aspect-4/3 rounded-2xl md:aspect-16/9 lg:aspect-4/3" />` (new key, §7).
- h2: `text-h2 text-balance text-ink`; lead `mt-3 text-lead text-ink-body`; button `mt-6 w-full sm:w-auto`.
- Rule: `my-8 border-t border-line`.
- h3: `text-h3 text-ink`; body `mt-2 text-body text-ink-body`; link `lightLink` `mt-2`.

**States**: flag on / off as above. Button hover / focus / pressed come from `Button`.
**Motion**: none. **Accessibility**: photo alt in §7 (decorative is wrong here: the photo shows
the occasion, the heading does not describe it).

---

### S5 Closing

**Structure**

- Pattern: single contained panel, text left and actions right inside (home S9 shape).
- Background: `page` band, solid `crimson` panel `rounded-2xl`.
- Container: `max-w-page gutter`, `section` padding.
- Columns: 375 / 768 = 1 (text, then buttons). 1024 / 1440 = `lg:flex-row lg:items-center lg:justify-between`.
- Blocks: h2, 1 line, primary button + text link.
- Why: the sender who wants to choose every item gets one clear next step, and the page ends
  the same way as the home page.

**Copy**

- h2: **Rather choose every item yourself?**
- Line: "Shop groceries, household goods, pharmacy and baby items one by one and fill the
  basket your way."
- Primary: "Build your own basket" → `/shop` (`variant="onDark" size="lg"`).
- Secondary: "How it works" → `/how-it-works` (`onCrimsonLink`).

**Component**: new shared `src/components/site/closing-panel.tsx` (server) with props
`{ id, title, children, primary: { href, label }, secondary?: { href, label } }`, using exactly
the classes of `HomeClosing` (`flex flex-col gap-6 rounded-2xl bg-crimson p-card-lg text-on-dark on-dark-focus md:p-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-14`).
Refactoring `HomeClosing` onto it is optional and **not** part of this build (avoid touching the
approved home page).

**Wireframe**: as home S9 (`docs/home-redesign/PLAN.md`), with the copy above.

**Motion**: none. **Accessibility**: `on-dark-focus`; button 52px tall; link 44px tall.

---

## 5. Components and files

| File | Kind | Props / notes |
| --- | --- | --- |
| `src/app/(site)/baskets/page.tsx` | server page (rewrite) | Loads §3 data; renders S1–S5; keeps `metadata` (description below). Drops imports of `BasketCard`, `Stagger`, `PhotoFeature`, `CtaBand`, `SectionHeader` eyebrow use and the old table. |
| `src/components/pages/baskets/price-board.tsx` | server | `{ rows: BasketRow[]; jmdPerUsd: number }` → `<nav><ol>` of rows (S1). |
| `src/components/pages/baskets/baskets-hero.tsx` | server | `{ rows, jmdPerUsd, cutoff: string \| null }` → S1 band; renders `PriceBoard` or the empty variant. |
| `src/components/pages/baskets/basket-row.tsx` | server (contains client `AddToBasket`) | `{ row: BasketRow; jmdPerUsd: number }` → one S2 card. |
| `src/components/pages/baskets/basket-items.tsx` | server | `{ row: BasketRow }` → the items table with totals. |
| `src/components/pages/baskets/occasion-icon.tsx` | server | `{ occasion: Basket['occasion']; className?: string }`. |
| `src/components/pages/baskets/after-you-order.tsx` | server | no props (reads `SUBSTITUTION_RULES`) → S3. |
| `src/components/pages/baskets/occasions.tsx` | server | `{ monthly: boolean }` → S4. |
| `src/components/site/closing-panel.tsx` | server, shared | §4 S5. |
| `src/lib/baskets.ts` + `src/lib/baskets.test.ts` | lib + test | §3.1. |
| `src/lib/home.ts` | edit | `export const occasionPhrases`. |
| `src/lib/photos/shop.ts` | edit | add `basketsGiftWrap` (§7). |

Reused as they are: `AddToBasket`, `Price`, `Badge`, `Alert` (if it fits), `ButtonLink`,
`EmptyState`, `StockPhoto`, `CutoffNote`, `SectionHeader`, `lightLink`, `onCrimsonLink`,
`basketPhotos`, `earliestCutoff`, `joinParishes`, `SUBSTITUTION_RULES`.

Not deleted: `BasketCard`, `PhotoFeature`, `CtaBand`, `Stagger` are still used by other pages
(the dev agent checks with `grep` and deletes only what nothing imports).

Metadata description: "Family food baskets, baby care packs, pharmacy packs and Christmas
hampers. See every item and what you save, pay in US dollars, and we deliver in St. Thomas
and Kingston." (Parish names are true at launch; if zones change, the manager may make this
generic.)

---

## 6. Performance and rendering

- **LCP element:** the h1 "Ready-made baskets for home" on crimson (text, painted from the
  server HTML; Figtree is preloaded by `next/font`). There is no photo above the fold at any
  width, so nothing to preload. Every `StockPhoto` on the page is lazy (default).
- **Rendering:** all loaders are cached and the page reads no request data, so the whole body
  prerenders under Cache Components. No `<Suspense>` is needed. `CutoffNote`'s countdown and
  `AddToBasket` are client islands that render stable server HTML (no hydration mismatch). If
  anyone later adds a `searchParams` filter (e.g. `?occasion=`), it must sit in its own
  `<Suspense>` boundary with the static board as fallback.
- **CLS:** every photo has a fixed aspect ratio (`aspect-16/9`, `aspect-4/3`; at ≥1024 the row
  photo fills a grid cell whose height comes from the text). The `AddToBasket` live region
  already reserves `min-h-6`.
- **Weight:** four row photos at ≤ 720px wide and one at 552px, all via the Unsplash CDN
  (`auto=format`). No new client JavaScript beyond the existing `AddToBasket`.

---

## 7. Photos

### 7.1 Reused from the registry

| Slot | Key | Why |
| --- | --- | --- |
| S2 row photos | `basketPhotos[slug]` → `basketFood`, `basketBaby`, `basketPharmacy`, `basketChristmas` | A basket's photo is its identity, like a product photo: the same picture on the home card, this listing and `/baskets/[slug]` tells the sender "this is the same basket". The home page uses them for the same basket cards, so this is a deliberate exception to "don't reuse a home photo for the same role"; **manager to confirm** (§10). Here they are cropped tall (5/12 column) at ≥1024, which the home page never does. |

### 7.2 New photo

| Field | Value |
| --- | --- |
| Key | `basketsGiftWrap` (add to `src/lib/photos/shop.ts`) |
| Unsplash id | `YSdaUaLopLQ` |
| URL | `https://images.unsplash.com/photo-1758521542015-ceb80fb760ce` |
| Size | 3840 × 2160 |
| Photographer | Vitaly Gariev (`silverkblack`) |
| Licence | Unsplash License (free; not Unsplash+) |
| Alt | "A young woman smiling as she ties a ribbon on a gift box beside a Christmas tree" |
| Crop | 4:3 at 375 and ≥1024, 16:9 at 768. `position: '35% 45%'` keeps her face and hands in frame (the tree sits on the right). |
| `usedOn` | "Baskets" |
| Checked | `curl -s -o /dev/null -w "%{http_code}" "https://images.unsplash.com/photo-1758521542015-ceb80fb760ce?w=200"` → **200** (November 6, 2026) |
| Before adding | Record the download through the Unsplash API (MCP `download_asset`), as `docs/PHOTOGRAPHY.md` requires; the credits page then lists it automatically. |

Why this photo: warm, real, a Black woman at home preparing presents in brown paper and
ribbon, the moment the occasion sender is picturing. No logos, no store, no studio stare. It
is a different photo from `giftChristmas` (used on `/gifts`) and from every home photo.

Rejected while searching: an older white couple on a sofa (`1jE0zq_QQLw`, not Caribbean); a
styled oil-and-flour still life (`F5kbceemh8U`, does not show a family basket).

---

## 8. Self-review

### 8.1 First pass vs revised

| First pass | Problem | Revised |
| --- | --- | --- |
| Crimson hero with a photo on the right (like the old page and the home hero) | Reads as a copy of the home hero; the photo says nothing a basket photo below does not; slower LCP | **Price board** hero, text-only. Distinct from the home receipt, from the same shop world. |
| 4-up grid of basket cards (old page, home cards) | Cards cannot show 4–9 items, so "what's inside" needs a click; identical to the home section | **Stacked row cards** with the full items table. |
| Separate comparison table in its own section | Repeats four numbers already shown; says "save" without showing why | Totals **inside each basket**, under its own items, so the saving is checkable line by line. |
| "Why a basket" section with three icon reasons + stagger animation | Generic three-reasons block; scroll stagger is a default | Cut. Its content now lives where it is proved: the board (saving), the rows (items), S3 (proof, substitutions). |
| Zig-zag rows (photo left, then right) | Template habit; makes price jump sides | Photo always left; price always in the same place. |
| Big signal-red saving numeral in every row | Four bold elements compete with the board | Saving as a bold crimson total row and the small gold tag; the board stays the one bold moment. |
| Compact "Add" button on rows | Feedback only for screen readers; no quantity | `AddToBasket variant="full"`: stepper, "Added. View basket" visible. |
| Separate monthly section | Thin content, a full band for one sentence | Folded into S4 under the gift block. |

### 8.2 Generic defaults removed

No eyebrows, no all-caps labels, no "01 / 02 / 03" numbering (S3 is not a sequence), no "→"
in link text, no middle-dot meta strings, no gradients, no soft shadows on cards, no scroll
reveals, no stat strip, no testimonial or "trusted by" row, no invented numbers. The one
dashed rule is functional (it separates items from totals, as on a real receipt).

### 8.3 ui-ux-pro-max

- `--design-system` suggested Feature-Rich Showcase, "Vibrant & Block-based", emerald + orange,
  Rubik / Nunito Sans. **Rejected:** colours and fonts break the brand (crimson roles and
  Figtree only); "animated patterns" and "flat design without depth: avoid" conflict with the
  flat-only rule. **Kept:** block-based layout, large type, one key message per block, CTA
  repeated (board → rows → closing), 200–300ms colour-shift hovers.
- `--domain landing` "Comparison Table + CTA": highlight your product, be factual. Kept the
  factual part, applied per basket instead of a matrix; rejected the light-yellow highlight row
  (`jm-gold` is for small saving tags only).
- `--domain ux`: loading feedback without flicker (AddToBasket's `loading`), visible focus, 44px
  targets.
- Pre-delivery checklist: lucide icons only; `cursor-pointer` on rows and buttons (links and
  `Button` already); hovers 150ms; contrast ≥ 4.5:1 on every pair used; visible focus (signal
  on light, blush on dark); `prefers-reduced-motion` (only `animate-rise` and a 2px arrow
  nudge, both off); checked at 375 / 768 / 1024 / 1440.

### 8.4 Risks

- **Long phone page** (~8,300px). Mitigated by the board's jump links and by putting price and
  Add above each items table on phones. If QA finds it too long, the fallback is to show the
  first 5 lines and wrap the rest in a `<details>` "Show all 9 items" (not built unless asked).
- **Christmas Hamper is not orderable in the demo** (coffee out of stock) right before
  Christmas. The page handles it honestly, but the business should fix the data (§10).
- **Footnote wording on price changes** must match checkout behaviour (§4 S2).
- `target:` ring stays until another hash is set. Acceptable ("you are here"); remove if the
  owner dislikes it.

---

## 9. Acceptance checklist

**All widths (375 / 768 / 1024 / 1440)**

- [ ] No horizontal scroll; header and footer unchanged.
- [ ] One `h1`; section titles `h2`; basket names `h3`.
- [ ] Only role colour classes; no gradients; no eyebrows; lucide icons only; no emoji.
- [ ] Every price via `formatUsd` / `<Price>`; J$ via `formatJmd(usdCentsToJmd())`; demo
      values match §3.3.
- [ ] Board shows every basket with who it is for, item count, USD, J$ and saving; tapping a
      row lands on its card below the sticky header, and the card shows the crimson ring.
- [ ] Each card lists every item with quantity, size and line price; the totals equal the
      board numbers; "You save" equals price minus one-by-one.
- [ ] "Add to basket" adds one basket; the header count updates; "Added. View basket" shows.
- [ ] Christmas Hamper (demo): "Not available today" on the board, warn box with "Go to the
      shop" on the card, Out of stock badge on Ground Coffee, card sorted last, no Add button.
- [ ] Gift line on every card; S4 gift block links to `/gifts`.
- [ ] `monthly_orders` off: "Sending the same basket again?" copy; on (toggle in demo
      settings to test): "Want it every month?" with link to `/monthly`.
- [ ] Empty catalogue (temporarily empty `baskets` in demo): hero shows the empty lead and
      "Shop single items"; S2 shows `EmptyState`; S3 and S4 hidden; closing shown.
- [ ] Keyboard: board rows, name links, steppers, buttons and links all reachable in visual
      order with a visible ring (blush on crimson / oxblood, signal on light).
- [ ] Reduced motion: no movement (no rise, no arrow nudge).
- [ ] Photos load from `images.unsplash.com`; `/photo-credits` lists `basketsGiftWrap`.
- [ ] `npm run check` green; `src/lib/baskets.test.ts` passes.

**375**: hero = h1, lead, cut-off, board rows ≥ 76px tall, prices right-aligned and not
clipped; each card = photo 16:9, header, price + Add (full-width button), gift line, items
table; stepper 44px.
**768**: board full width; cards = photo 16:9 on top; buy bar horizontal under the items
table.
**1024**: hero 4/8 split; cards 5/7 with the photo filling the card height; buy bar fits
without overlap (stepper and button may wrap to a second line inside the bar).
**1440**: content capped at 1280 (hero) / 1152 (rest); board rows show the arrow column;
S3 and S4 splits aligned to the same 12-column grid.

---

## 10. Open questions

1. **Manager:** confirm the basket photos may be reused from the home cards (they are the
   baskets' identity, §7.1).
2. **Manager / Derion:** the Family Food Basket photo (`basketFood`, "cloth bags full of fresh
   vegetables") does not show what is in the basket (rice, flour, sugar, oil, tins, milk).
   `docs/PHOTOGRAPHY.md` says every photo must show the sentence next to it. Option: point
   `basketPhotos['family-food-basket']` to the existing `staples` photo ("Rice, beans and
   other dry goods in bags"). This changes the home card too, so it is the manager's call.
3. **Derion / ops:** the Christmas Hamper contains Ground Coffee, which is out of stock in
   the demo data, so the hamper cannot be ordered. Before December: restock or swap the item.
4. **Manager:** does checkout re-price a basket if shop prices change between adding and
   paying? This decides the second sentence of the S2 footnote.
5. **Needs Derion:** real basket photos (a packed Family Food Basket, a packed hamper) would be
   stronger than stock; keep stock until provided.
6. **Needs Derion:** is the gift message free and is there a length limit? The page says only
   what is true today ("we print it and hand it over"); add a limit to the gift line if one is
   set.
