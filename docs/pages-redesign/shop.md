# `/shop` redesign — build plan

Owner: design agent · For: development agent · Scope: `src/app/(site)/shop/page.tsx` from the
first band under the header to the last band above the footer. The header and footer are the
shared ones from the home redesign and are not touched (one optional header question in §7).

Read with: `CLAUDE.md`, `docs/BRAIN.md`, `docs/BRIEF.md`, `docs/TOKENS.md`,
`docs/DESIGN-SYSTEM.md`, `docs/PHOTOGRAPHY.md`, `docs/home-redesign/PLAN.md`. Where this plan and
those files disagree on a brand rule, those files win and the dev agent flags it to the manager.

Build exactly what is written. Every class named here exists today unless it is listed in
[§3.7 New tokens](#37-new-tokens-and-utilities) (there are none). Icons are `lucide-react` only;
the boxes and arrows in the wireframes are drawings, not glyphs to copy.

Skills used: `frontend-design` (two-pass plan, §5) and `ui-ux-pro-max` (`--design-system` run
plus `landing`, `ux` and `style` searches, §5.3).

---

## 1. Concept

**One line.** _The front door of a well-run Jamaican store: type what you need, or walk into an
aisle._

|                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The page's one job   | Get the sender from "I need to send something" to an item in the basket in as few taps as possible, with no doubt about price, timing or proof.                                                                                                                                                                                                                                                                                                                                                                     |
| Audience             | Jamaicans abroad buying for family in St. Thomas and Kingston. Arrives from the home page "Start shopping", the header "Shop" link, or a returning bookmark. Monthly supporter (knows what they want: search, shelves), occasion sender (wants a basket), emergency (wants one item today and needs the cut-off). Mostly on a phone, in the evening their time.                                                                                                                                                     |
| The ONE bold element | **The aisle board.** Inside the crimson front-door band, the departments hang as four big solid **oxblood aisle signs**: department name in heavy `text-h2`, a crimson disc with the department icon, the real item count, and the first three real product names on that shelf ("Long Grain Rice, Vegetable Cooking Oil, All-Purpose Flour and more"). It reads like the signs over the aisles of a Jamaican supermarket. Everything else on the page is quiet: white shelves, plain type, one oxblood proof band. |
| Tone                 | A store, not a brochure. Typographic signs, then real product photos on white shelves. Warm copy from the sender's side ("What do they need this week?").                                                                                                                                                                                                                                                                                                                                                           |

### How the page beats the competition

| Competitor             | Their shop                                                          | Our answer on this page                                                                                                                                      | Where        |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| grocerylistjamaica.com | A long category list and product pages; fees and timing found later | Search and the four aisles in the first screen; the exchange rate, the date prices were checked and the cut-off stated on the page before anything is added. | S1           |
| PriceSmart Jamaica     | Members only, in Jamaica                                            | No membership; the shelves add to a basket in one tap from anywhere.                                                                                         | S3           |
| revvcouriers.com       | Courier errands, no catalogue                                       | A real catalogue with prices in USD and J$, plus ready-made baskets as a shortcut.                                                                           | S2, S3       |
| Remittance/gift sites  | Cash or vouchers; no idea what it buys                              | You choose the exact items; a till receipt photo and a door photo prove it.                                                                                  | S1 notes, S4 |

We never name a competitor and never compare prices.

---

## 1B. Structure blueprint (read this first)

### 1B.1 Whole-page skeleton

Heights are approximate, from the token paddings. `▓` = red (crimson / oxblood), `░` = neutral
(`page` / `surface`), `▒` = photos inside the block. "wide" = content capped at `max-w-wide`
(1280px), "page" = `max-w-page` (1152px).

```
1440 × ~4,300px (header/footer excluded)                 375 × ~5,900px

┌▓▓ S1 FRONT DOOR  full crimson band, content wide  ┐     ┌▓ S1 FRONT DOOR  one column       ┐
│▓▓  row 1 split 7/5:                               │     │▓  h1, lead, search            ~330│
│▓▓   h1 + lead + search | "Good to know" card      │     │▓  aisle signs 2×2             ~330│
│▓▓  row 2: four oxblood aisle signs (4-up)    ~780 │     │▓  "Good to know" card     ~330 ~1050│
├░░ S2 BASKETS  page; header + 3 row-cards     ~420 │ ▒   │░ S2 BASKETS  3 stacked row-cards ~690│
├░░ S3 SHELVES  surface; 1 staples shelf +          │ ▒   │░ S3 SHELVES  5 shelves, each a     │
│░░  4 department shelves, 5 cards across    ~1,950 │     │░  sideways rail (2.3 cards)  ~2,450│
├▓▓ S4 HOW WE SHOP  full oxblood band, split 7/5:   │ ▒   │▓ S4 HOW WE SHOP  stacked text,     │
│▓▓  title + 3 promises | 2 tall photos        ~720 │     │▓  photos hidden               ~900│
├░░ S5 CAN'T FIND IT  page; one contained panel ~330 │     │░ S5 CAN'T FIND IT  stacked panel ~480│
└───────────────────────────── (footer, oxblood) ───┘     └──────────────── (footer) ──────────┘
```

**Rhythm:** red mass (with darker signs inside) → light basket shortcut → long white run of
shelves (the store itself, photo-led) → one oxblood text-led band with two photos → quiet light
panel → oxblood footer. No two dark bands touch (S5 sits between S4 and the footer). The page
is short on purpose: a shop's front door is for getting to products, not for selling the idea
again (the home page does that).

**Removed from the current page:** the `CtaBand` closing panel (it repeated "send a basket",
which S2 already offers at the top; its two links, `/baskets` and `/how-it-works`, still live in
S2 and S4), the hero photo (`shopProduce`), the separate "Shop by category" photo-card section
(folded into the aisle board), all eyebrows, and all scroll-triggered `Stagger` reveals.

### 1B.2 Section structures at a glance

| Section          | 1. Pattern                                                                                                                | 2. Background                                                                | 3. Container / height                                                                                      | 4. Columns 375 → 768 → 1024 → 1440 (phone order)                                                                                                               | 5. Blocks (counts)                                                                                                                                                            | 6. Why this structure, for the sender                                                                                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| S1 Front door    | **Split two-column 7/5** (row 1) over a **four-up sign row** (row 2), all in one band                                     | Solid `crimson`; signs solid `oxblood`; notes card solid `surface`. No photo | Full-bleed, content `max-w-wide`; `section` padding; ~780px at 1440                                        | Row 1: 1 → 1 → 7/5 → 7/5. Signs: 2×2 → 2×2 → 4 → 4. Notes: after signs on phones (1 col of rows) → 3 rows side by side at 768 → right column of row 1 at 1024+ | h1, lead, 1 search form, 4 aisle signs (disc icon + name + count + sample line + arrow), 1 notes card (h2 + 3 rows)                                                           | The two ways people shop (type it / walk the aisle) are both in the first screen, and the three doubts that stop a first order (what does it cost in J$, are these prices current, will it arrive today) are answered before the first tap. Competitors open with a banner or a long list. |
| S2 Baskets       | **Three-card row** of horizontal "row cards"                                                                              | `page`                                                                       | Contained `max-w-wide`; `section-sm`; ~420px at 1440                                                       | 1 → 1 → 1 → 3 (3-up from 1280)                                                                                                                                 | header (h2, lead, 1 link) + 3 cards = square photo + h3 + item count + price + saving tag + Add                                                                               | The occasion sender's fastest path: a whole basket in one tap, priced, before any scrolling through shelves. Compact so it does not push the shelves far down.                                                                                                                             |
| S3 Shelves       | **Stacked store shelves**: each a title row + a **five-up product row** that becomes a **sideways scroll rail** on phones | Solid `surface`                                                              | Contained `max-w-wide`; `section-sm` for the first shelf, ruled dividers between; ~390px per shelf at 1440 | Rail 2.3 cards → 3.2 cards (sm) → 4-up grid (md) → 5-up grid (lg)                                                                                              | 1 staples shelf (featured products, department label on each card) + 1 shelf per department; each = h2 + lead + price-check note + "See all" link + ≤5 product cards with Add | This is the store. One shelf per aisle mirrors the signs above; one-tap Add on every card; "See all" goes to the full department.                                                                                                                                                          |
| S4 How we shop   | **Full-width band, split 7/5**: title + three promises left, two offset tall photos right                                 | Solid `oxblood`                                                              | Full-bleed, content `max-w-page`; `section`; ~720px                                                        | 1 → 1 (photos 2-up under text at 768) → 7/5 → 7/5. Photos hidden below 768                                                                                     | h2, lead, 3 promises (icon disc + h3 + body), 1 link, 2 photos 3:4                                                                                                            | After browsing, the hesitant sender gets the three promises every order carries (bought fresh, receipt photo, your swap rule) in one calm text-led break from the photos.                                                                                                                  |
| S5 Can't find it | **Single contained panel**: icon, text, button in a row                                                                   | `page` band, `surface` panel with `line` border                              | Contained `max-w-page`; `section-sm`; ~330px                                                               | stacked → row (sm+) → row → row                                                                                                                                | icon disc, h2, 1 paragraph, 1 button                                                                                                                                          | Ends on a way forward instead of a dead end for anyone whose item isn't listed.                                                                                                                                                                                                            |

---

## 2. Page map and data

```
ShopPage (server, all loaders cached; no runtime reads → whole page prerenders)
├─ ShopFrontDoor           S1  src/components/pages/shop/front-door.tsx        (server)
│   ├─ SearchBox tone="onDark" id="shop-q"                                     (server form)
│   ├─ AisleSign ×N        src/components/pages/shop/aisle-sign.tsx            (server)
│   └─ ShopNotes           src/components/pages/shop/shop-notes.tsx            (server)
│        └─ CutoffCountdown (existing client child, renders nothing on the server)
├─ ShopBaskets             S2  src/components/pages/shop/shop-baskets.tsx      (server)
│   └─ BasketRowCard ×3    src/components/pages/shop/basket-row-card.tsx       (server)
│        └─ AddToBasket kind="basket" (existing client)
├─ ProductShelf ×(1+N)     S3  src/components/shop/product-shelf.tsx (extended) (server)
│   └─ ProductCard + AddToBasket kind="product" (existing)
├─ HowWeShop               S4  src/components/pages/shop/shop-promises.tsx (restyled) (server)
└─ CantFindBanner          S5  src/components/pages/shop/shop-promises.tsx (restyled) (server)
```

### Data (all real, all existing loaders)

| Need                                                  | Source                                                                                                   |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Departments, real counts                              | `getCategories()` (`count` excludes hidden products)                                                     |
| Products for shelves, sign samples, price-check dates | `getProducts()` (`priceCheckedAt`, `status`, `featured`, `categoryId`)                                   |
| Featured baskets with item count and separate price   | `getBaskets({ featured: true })`                                                                         |
| Exchange rate, item-request flag                      | `getSettings()` → `jmdPerUsd`, `features.item_requests`                                                  |
| Parishes and cut-off                                  | `getActiveZones()` → `joinParishes()` and `earliestCutoff()` from `src/lib/home.ts` (reuse; do not copy) |
| Basket section lead                                   | `basketsLead()` from `src/lib/home.ts` (reuse)                                                           |

### New pure helpers — `src/lib/shop-front.ts` (+ `src/lib/shop-front.test.ts`)

```ts
/** Names of the first `n` visible products on a department's shelf, in shelf order. */
export function aisleSample(products: Product[], categoryId: string, n = 3): string[]
// uses shelfProducts() order, filters status === 'visible'

/** Earliest and latest price-check dates of the products a sender can see (not hidden). */
export function priceCheckRange(
  products: Pick<Product, 'priceCheckedAt' | 'status'>[],
): { from: string; to: string } | null
// ignores hidden products and empty/invalid dates; compares by formatDate() (Jamaica day)

/** "Prices checked in store on October 20, 2026." or
 *  "Prices checked in store between October 14, 2026 and October 20, 2026." */
export function priceCheckLine(range: { from: string; to: string }): string
// always formats with formatDate() from src/lib/format.ts
```

Tests: one day → "on"; two days → "between … and …"; hidden products ignored; empty list →
`null`; `aisleSample` skips out-of-stock and keeps shelf order.

`shelfProducts` currently lives in `product-shelf.tsx` (a component file). Leave it there and
import it into `shop-front.ts`; do not move it in this change.

---

## 3. Sections

### 3.0 Shared values

- Links on light: the home page's `lightLink` from `src/components/pages/home/steps.tsx`
  (import it; do not copy the string).
- Links on dark (S4): `inline-flex min-h-control items-center gap-2 font-semibold text-on-dark underline decoration-blush decoration-2 underline-offset-4 hover:decoration-on-dark` — this is the home `onCrimsonLink` from `src/components/pages/home/hero.tsx`; import it.
- Every dark band carries `on-dark-focus` (blush focus ring).
- Section titles `text-h2 text-ink` (on light). No `eyebrow` anywhere on this page: pass no
  `eyebrow` to `SectionHeader`.

### 3.1 S1 Front door

**Structure**

1. Pattern: split two-column 7/5 (row 1: text + search | notes card) above a four-up row of
   aisle signs (row 2), inside one crimson band.
2. Background: solid `crimson`; signs solid `oxblood`; notes card solid `surface`. No photo, no
   overlay.
3. Container: `<section aria-labelledby="shop-title" class="bg-crimson text-on-dark on-dark-focus section">`, inner `mx-auto max-w-wide gutter`. Height ~780px at 1440, ~1,050px at 375.
4. Columns and order (one CSS grid, DOM order = phone order: text → signs → notes):
   - 375: 1 column. Text, then signs as 2×2, then notes card.
   - 768: 1 column. Text (max-w-2xl), signs 2×2, notes card with its 3 rows in 3 columns.
   - 1024 / 1440: `lg:grid-cols-12`; text `lg:col-span-7 lg:row-start-1`; notes `lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end`; signs `lg:col-span-12 lg:row-start-2`, 4-up.
5. Blocks: h1, lead, 1 search form; 4 aisle signs (one per category, any count works: 2-up
   wraps); 1 notes card (h2 + 3 rows).
6. Why: both ways in (type / browse) and the three doubts answered in the first screen.

**Wireframes**

```
1440                                                              (content 1280, 12 col, gap 32)
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ crimson                                                                                  │
│  What do they need this week?                     ┌───────────── surface card ─────────┐ │
│  (text-h1, 2 lines max at 7 cols)                 │ Good to know            (text-h3)  │ │
│                                                   │ [clock] Same-day delivery in St.   │ │
│  Search or pick a department. You pay in US       │   Thomas and Kingston when you     │ │
│  dollars; our driver buys everything in Jamaica   │   order by 1:00 PM Jamaica time.   │ │
│  on the day we deliver.            (text-lead)    │   (+ countdown after mount)        │ │
│                                                   │ ───────────────────────────────── │ │
│  ┌──────────────────────────────────────┬──────┐  │ [$] You pay in US dollars. J$ is  │ │
│  │ [search] Rice, diapers, detergent…    │Search│  │   shown at J$157 to USD$1.00.     │ │
│  └──────────────────────────────────────┴──────┘  │ ───────────────────────────────── │ │
│   (52px, surface, max-w-xl)                       │ [receipt] Prices checked in store │ │
│                                                   │   on October 20, 2026. You get a  │ │
│                                                   │   photo of the till receipt.      │ │
│                                                   └────────────────────────────────────┘ │
│                                                                                          │
│ ┌ oxblood ────────────┐┌ oxblood ────────────┐┌ oxblood ────────────┐┌ oxblood ────────────┐│
│ │ (o) icon       ->   ││ (o)            ->   ││ (o)            ->   ││ (o)            ->   ││
│ │                     ││                     ││                     ││                     ││
│ │ Groceries   text-h2 ││ Household           ││ Pharmacy            ││ Baby & Child        ││
│ │ 9 items             ││ 5 items             ││ 4 items             ││ 4 items             ││
│ │ Long Grain Rice,    ││ Laundry Detergent,  ││ Pain Relief Tablets,││ Baby Diapers, Size  ││
│ │ Vegetable Cooking   ││ Dish Soap, Toilet   ││ Adult Multivitamin, ││ 3, Baby Wipes,      ││
│ │ Oil… and more       ││ Paper and more      ││ First Aid Kit…      ││ Infant Formula…     ││
│ └─────────────────────┘└─────────────────────┘└─────────────────────┘└─────────────────────┘│
└──────────────────────────────────────────────────────────────────────────────────────────┘

768                                         375
┌─────────────────────────────────────┐     ┌────────────────────────────┐
│ What do they need this week?        │     │ What do they need          │
│ lead (max-w-2xl)                    │     │ this week?        (h1 33px)│
│ [search ......................][Go] │     │ Search or pick a           │
│ ┌ Groceries ─────┐┌ Household ─────┐│     │ department…   (lead 18px)  │
│ │ (o)        ->  ││ (o)        ->  ││     │ [search ..........][ (Q) ] │
│ │ 9 items        ││ 5 items        ││     │ ┌ Groceries ┐┌ Household ┐ │
│ │ sample, 2 lines││ sample         ││     │ │(o)     -> ││(o)     -> │ │
│ └────────────────┘└────────────────┘│     │ │Groceries  ││Household  │ │
│ ┌ Pharmacy ──────┐┌ Baby & Child ──┐│     │ │9 items    ││5 items    │ │
│ └────────────────┘└────────────────┘│     │ └───────────┘└───────────┘ │
│ ┌ Good to know ──────────────────── ┐│     │ ┌ Pharmacy ┐┌ Baby & Ch. ┐ │
│ │ [clock] ...  │ [$] ...  │ [rcpt] ..││     │ └───────────┘└───────────┘ │
│ └───────────────────────────────────┘│     │ ┌ Good to know ──────────┐ │
└─────────────────────────────────────┘     │ │ 3 rows, stacked, ruled  │ │
                                            │ └────────────────────────┘ │
                                            └────────────────────────────┘
```

**Copy (final)**

- h1 (`id="shop-title"`): **What do they need this week?**
- Lead: **Search or pick a department. You pay in US dollars, and our driver buys everything in
  Jamaica on the day we deliver.**
- Search: existing placeholder "Rice, diapers, detergent…", sr-only label "Search the shop",
  button "Search".
- Signs: `{category.name}`; `{count} item(s)` (hidden when 0, replaced by "Being stocked");
  sample: `aisleSample()` names joined as "A, B, C and more" (only "and more" when `count > n`;
  1 name → "A"; 2 → "A and B"). Hidden when the department has no visible products.
- Notes card h2: **Good to know**
  - Row 1 (`Clock`): "Same-day delivery in **{parishList}** when you order by **{1:00 PM}**
    Jamaica time." followed by `<CutoffCountdown cutoff={cutoff} />`. No zones → "Delivery is
    paused for now. Check back soon."
  - Row 2 (`CircleDollarSign`): "You pay in US dollars. We show the J$ amount too, at
    **{formatJmd(jmdPerUsd)}** to **{formatUsd(100)}**." (renders "J$157 to USD$1.00").
  - Row 3 (`ReceiptText`): "{priceCheckLine(range)} You get a photo of the till receipt for your
    order." When `range` is `null`: "You get a photo of the till receipt for your order."

**Tokens and classes**

- Text column: `flex flex-col gap-5 lg:gap-6 max-w-2xl lg:max-w-none lg:pr-8`.
  h1 `text-h1 text-balance`. Lead `text-lead text-on-crimson-muted max-w-xl`.
- Search wrapper: `mt-2 max-w-xl` (all widths; the header's phone search row is already hidden
  on `/shop`).
- Grid: `grid gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12 xl:gap-x-12`.
- Signs list: `<nav aria-label="Departments"><ul class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">`. With 3 categories: `lg:grid-cols-3`; with 5+: `lg:grid-cols-4` and wrap.
- **AisleSign** (`<li class="flex">` > `<Link href="/shop/{slug}">`):
  `group flex w-full min-h-40 flex-col gap-3 rounded-xl bg-oxblood p-4 text-on-dark transition-colors duration-150 hover:bg-crimson-deep active:bg-oxblood sm:p-card lg:min-h-56 lg:p-card-lg`
  - Top row `flex items-start justify-between`: disc `grid size-control place-items-center rounded-full bg-crimson text-blush [&_svg]:size-icon` with `<CategoryIcon slug>`; arrow `ArrowRight size-icon text-blush transition-transform duration-200 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none` (`aria-hidden`).
  - Name: `mt-auto text-title text-balance sm:text-h2` (`text-title` 23px at 375 so "Baby &
    Child" fits a 163px sign on two lines; `text-h2` from 640px). Underline on hover:
    `decoration-2 underline-offset-4 group-hover:underline`.
  - Count: `text-small font-semibold text-blush tabular-nums`.
  - Sample: `hidden text-small text-on-oxblood-muted line-clamp-2 md:block`.
- **ShopNotes** (`<aside aria-labelledby="shop-notes-title">`):
  `rounded-xl bg-surface p-card text-ink lg:p-card-lg` (flat, no shadow).
  h2 `text-h3 text-ink` `id="shop-notes-title"`. Rows `<ul class="mt-4 divide-y divide-line md:grid md:grid-cols-3 md:gap-6 md:divide-y-0 lg:block lg:divide-y">`, each `<li class="flex gap-3 py-4 first:pt-0 last:pb-0 md:py-0 lg:py-4">`; icon `size-icon shrink-0 text-crimson mt-0.5` (`aria-hidden`); text `text-small text-ink-body`, emphasis `font-bold text-ink tabular-nums`.

**SearchBox change** (`src/components/shop/search-box.tsx`): add `tone?: 'light' | 'onDark'`
(default `light`, current behaviour unchanged). `onDark` input: `min-h-control-lg rounded-md
border-0 bg-surface shadow-none focus:ring-3 focus:ring-blush` (the crimson ring used by `light`
is invisible on crimson). The submit button stays crimson inside the white field. `compact`
keeps priority if both are passed. Keep `id="shop-q"`, `action="/search"`, GET, works without JS.

**States**

- Sign hover: fill `oxblood` → `crimson-deep`, name underlines, arrow moves 4px. Focus: blush
  outline from `on-dark-focus` on the link, `rounded-xl` follows. Pressed: back to `oxblood`.
- Search focus: 3px blush ring. Submit hover `crimson-deep` (existing).
- Empty: no categories → the signs list is replaced by one line in `text-on-crimson-muted`:
  "The shop is being stocked. Check back soon." (S3 renders nothing then.)
- Loading: none (static).

**Motion — the page's one orchestrated moment.** On first paint the four signs rise in
sequence: `animate-rise` with `[animation-delay:0ms|60ms|120ms|180ms]` by index (cap at 180ms
for index ≥ 3). Text, search and notes do not animate (they are the LCP and must paint first).
Reduced motion: the global rule shows them in place.

**Accessibility**

- One `h1`. Notes card is an `aside` with its own `h2`. Signs live in `<nav aria-label="Departments">`; each link's text is name + count + sample, which reads naturally ("Groceries, 9 items, Long Grain Rice, … and more").
- Contrast: `on-dark` on `oxblood` ≈ 15:1; `blush` on `oxblood` ≈ 10:1; `on-oxblood-muted` on `oxblood` ≥ 7:1; `on-crimson-muted` on `crimson` ≥ 4.5:1 (lead at 18px+).
- Signs are ≥ 160px tall, far above 44px. Search field 52px, button ≥ 44px.

**Photos:** none in S1 (decided: see §5.2).

### 3.2 S2 Ready-made baskets

**Structure**

1. Pattern: three-card row of horizontal row cards (photo left, details right).
2. Background: `page`; cards `surface` with `line` border.
3. Container: `<section aria-labelledby="shop-baskets-title" class="section-sm">`, inner `mx-auto max-w-wide gutter`. ~420px at 1440, ~690px at 375.
4. Columns: 375 → 1 column (3 rows); 768 → 1 column; 1024 → 1 column; 1280/1440 → 3 columns (`xl:grid-cols-3`). 1 or 2 featured baskets: `xl:grid-cols-2` / single card `max-w-2xl`.
5. Blocks: `SectionHeader` (h2, lead, action link) + up to 3 `BasketRowCard`.
6. Why: the shortcut sits above the shelves without eating a screen.

**Wireframes**

```
1440
Short on time? Send a ready-made basket (h2)                              All baskets
lead (basketsLead)
┌──────────────────────────────┐┌──────────────────────────────┐┌──────────────────────────────┐
│┌────────┐ Family Food Basket ││┌────────┐ Baby Care Pack     ││┌────────┐ Christmas Hamper   │
││ photo  │ 12 items           │││ photo  │ 6 items            │││ photo  │ 9 items            │
││ 1:1    │ USD$69.00 [Save $] │││ 1:1    │ USD$109.00 [Save]  │││ 1:1    │ USD$49.00          │
││ 128px  │ about J$10,833     │││        │ about J$…          │││        │ about J$…          │
│└────────┘           [+ Add]  ││└────────┘           [+ Add]  ││└────────┘           [+ Add]  │
└──────────────────────────────┘└──────────────────────────────┘└──────────────────────────────┘

768 / 1024: the same cards stacked, full width (photo 144px, Add at the right of the price row)

375
Short on time? Send a ready-made basket
lead
┌──────────────────────────────┐
│┌──────┐ Family Food Basket   │
││ 96px │ 12 items             │
│└──────┘ USD$69.00 [Save …]   │
│         about J$10,833       │
│         [ + Add ] (full w.)  │
└──────────────────────────────┘  ×3
All baskets   (the header action wraps under the lead)
```

**Copy:** h2 **Short on time? Send a ready-made basket**. Lead: `basketsLead(occasions)`.
Action: "All baskets" → `/baskets`. Card: `{basket.name}` (links to `/baskets/{slug}`),
"`{itemCount}` items", `Price`, saving tag "Save `{formatUsd(saving)}`" (same wording as home),
Add.

**BasketRowCard** (`src/components/pages/shop/basket-row-card.tsx`, server; props
`{ summary: BasketSummary; jmdPerUsd: number }`):

- `<article class="group relative grid grid-cols-[6rem_1fr] gap-4 rounded-lg border border-line bg-surface p-3 hover-lift has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-signal has-[a:focus-visible]:ring-offset-2 sm:grid-cols-[9rem_1fr] sm:p-4 xl:grid-cols-[8rem_1fr]">`
- Photo: `StockPhoto name={basketPhotos[slug]} alt="" zoom sizes="(min-width: 640px) 144px, 96px" className="aspect-square rounded-md"`; no photo → `grid aspect-square place-items-center rounded-md bg-crimson text-blush` with `ShoppingBasket size-8`.
- Details `flex min-w-0 flex-col gap-1`: h3 `text-h3 text-ink` with the stretched link (`after:absolute after:inset-0 focus-visible:outline-none`); count `text-small text-ink-muted tabular-nums`; price row `mt-auto flex flex-wrap items-end justify-between gap-3 pt-2`: left `flex flex-wrap items-start gap-x-2 gap-y-1` = `Price size="md"` + saving tag `rounded-sm bg-jm-gold px-2 py-0.5 text-xs font-bold text-ink tabular-nums` (gold = saving, the site-wide convention in `docs/TOKENS.md`); right `relative z-raised w-full sm:w-auto [&_button]:w-full sm:[&_button]:w-auto` with `AddToBasket kind="basket"`.
- Hover: `hover-lift` (2px, `shadow-lift`, `line-hover`), photo zoom. Focus: signal ring on the card via `has-[a:focus-visible]`. Add states are the existing ones (outline → filled "Added", spinner while pending, sr-only live message).
- Empty: no featured baskets → the whole section is not rendered.

Reuse note: `HomeBasketCard` (vertical, 16:9 showcase) stays the home and `/baskets` card. This
row card is the compact shortcut; the basket photo is the basket's own identity photo (like a
product photo), so showing it here is consistent, not a duplicate role.

### 3.3 S3 Shelves

**Structure**

1. Pattern: stacked shelves, each a title row and a five-up product row (sideways rail below
   768).
2. Background: solid `surface` (one continuous white run; the existing `ProductShelf` already
   sets `tone="surface"` and `divided`).
3. Container: `max-w-wide`, `section-sm`, shelves after the first get `pt-0!` and a top
   `border-t border-line pt-8 sm:pt-12` (existing). ~390px per shelf at 1440, ~490px at 375.
4. Columns: 375 rail `auto-cols-[43%]` (2.3 cards); 640 `auto-cols-[31%]`; 768 4-up grid; 1024+
   5-up grid. Existing classes; unchanged.
5. Blocks: shelf 1 **Everyday staples** (featured products across departments, up to 5, each
   card shows its department name); then one shelf per category in `sort` order. Each shelf =
   h2 (`text-title`) + lead (sm+) + price-check note + "See all" link + ≤ 5 `ProductCard` with
   Add. Shelves with fewer than 5 products end with the existing dashed "See all" tile.
6. Why: the shelves are the store; the staples shelf gives the monthly supporter the usual
   basics in one row.

**Wireframe (one shelf)**

```
1440
Groceries (text-title)                                              See all groceries ->
Rice, flour, oil and the staples they cook with every day.
Prices checked in store on October 20, 2026.                 (text-xs ink-muted)
┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐
│ photo  ││ photo  ││ photo  ││ photo  ││ photo  │   ProductCard ×5, Add on each
│ name   ││ name   ││ name   ││ name   ││ name   │
│ size   ││ size   ││ size   ││ size   ││ size   │
│USD$ [+]││USD$ [+]││USD$ [+]││USD$ [+]││USD$ [+]│
└────────┘└────────┘└────────┘└────────┘└────────┘

375
Groceries                    See all ->
Prices checked … 2026.
┌──────┐┌──────┐┌───   (rail, snaps, 2.3 cards visible; page itself never scrolls sideways)
```

**Copy:** staples h2 **Everyday staples**, lead **A few basics from each department, picked by
our team.** (true: `featured` is set by the admin; never "most popular" or "best sellers", which
are not tracked). Department shelves: `shelfLeads[slug] ?? category.description` (existing).
Note on each shelf: `priceCheckLine(priceCheckRange(shelf products))`, hidden when `null`.

**ProductShelf changes** (`src/components/shop/product-shelf.tsx`, additive, the only caller is
this page):

- `href` becomes optional; without it there is no "See all" link and no dashed tile.
- New `categoryNames?: Record<string, string>` → passes `category={categoryNames[p.categoryId]}`
  to `ProductCard` (staples shelf only).
- Keep ids: staples `id="aisle-staples"`, departments `id="aisle-{slug}"` (existing anchors).
  Add `scroll-mt-header` to each shelf `h2` so an anchor never lands under the sticky bar.
- Staples shelf renders only when there are ≥ 3 featured visible products (sorted with
  `shelfProducts`-style ordering: in stock, photographed, then the rest).
- A product can appear on the staples shelf and on its department shelf; that is expected in a
  store. Both Add buttons work independently.

**States:** card hover (existing border + `shadow-lift`), out-of-stock badge and no Add
(existing), Add pending/added (existing). Empty department → shelf not rendered (existing).
**Motion:** none (existing rule: "in a store the products should simply be there").
**Accessibility:** each shelf is a `section` labelled by its h2; the rail is a `ul` and is
reachable by Tab through its links and buttons; the "See all" link is the single-pointer
alternative to swiping (ui-ux-pro-max marketplace rule).

### 3.4 S4 How we shop for you

**Structure**

1. Pattern: full-width band, split 7/5: title, three promises and a link left; two offset tall
   photos right.
2. Background: solid `oxblood`, `on-dark-focus`. Photos framed (no overlay).
3. Container: `Section tone="oxblood"` (`max-w-page`, `section`). ~720px at 1440, ~900px at 375.
4. Columns: 375 → text stacked, photos hidden; 768 → text, then the two photos side by side
   (existing `md:grid`); 1024/1440 → 7/5.
5. Blocks: h2, lead, 3 promises (disc + h3 + body), link, 2 photos 3:4.
6. Why: a calm, text-led reassurance after the photo-heavy shelves.

Restyle of the existing `HowWeShop` in `shop-promises.tsx`:

- Remove the eyebrow. Title **Bought in Jamaica, the way you would**. Lead **Nothing is shipped
  from overseas. Only your payment crosses the border.**
- Promises from `shopPoints('')` (empty `sameDay`: the cut-off is already in S1, so it is not
  repeated). Replace `Stagger`/`StaggerItem` with a plain `<ul class="grid gap-6 sm:grid-cols-3 lg:gap-8">` and `<li class="flex flex-col gap-3">` (no scroll reveal).
- Disc `grid size-12 place-items-center rounded-full bg-crimson text-on-dark` (existing), h3
  `text-h3`, body `text-small text-on-oxblood-muted`.
- Link: "See how an order works" → `/how-it-works`, using the shared on-dark link style.
- Photos: left slot **`shopChoosing`** (new, see §3.6) replaces `shopCheckout`, which the home
  page already uses for "we shop"; right slot `shopReceipt` (existing). Both `rounded-2xl
aspect-3/4`, right one `mt-10`, `sizes="(min-width: 1024px) 240px, (min-width: 768px) 50vw, 0px"`
  (existing). `shopChoosing` gets `position="60% center"` so the shopper and the produce sit in
  the 3:4 crop.

`TrustRow` (product page) keeps its current behaviour; don't change `shopPoints`.

### 3.5 S5 Can't find it?

Keep `CantFindBanner` (copy and `requestLink` logic unchanged) with two changes: band
`tone="page"` instead of `muted` (so the panel's white card reads against the page grey and the
band doesn't look like a third shade before the footer), and `h2` gets `text-balance`. Panel
stays `rounded-2xl border border-line bg-surface p-card-lg sm:p-10`, flat. Stacked below 640px,
row from 640px (existing). Button `ButtonLink size="lg"` "Ask us about it" → `/contact` (or
"Request an item" → `/request` when the add-on is on).

### 3.6 Photos

Existing registry photos used: `basketFood`, `basketBaby`, `basketPharmacy`,
`basketChristmas` (S2, the baskets' identity photos), product photos from
`src/lib/photos/products.ts` (S3, by slug), `shopReceipt` (S4).

Retired from this page: `shopProduce` (still used by `/baskets`), `shopCheckout` (still used by
the home steps). Department tile photos (`categoryPhotos`) are no longer shown on `/shop`; the
home page keeps them.

**One new photo — `shopChoosing`** in `src/lib/photos/shop.ts`:

| Field        | Value                                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| Unsplash id  | `2mhqft65NIo`                                                                                               |
| URL          | `https://images.unsplash.com/photo-1527493324787-47372b893452` (verified 200 at `?w=200`, November 6, 2026) |
| Size         | 5926 × 3956                                                                                                 |
| Photographer | kevin laminto (`kxvn_lx`)                                                                                   |
| Alt          | "A shopper choosing fresh vegetables from a market display"                                                 |
| Crop         | 3:4 in the S4 left slot, `position="60% center"`                                                            |
| usedOn       | "Shop"                                                                                                      |
| Licence      | Free Unsplash licence (not Unsplash+)                                                                       |

Record the download with the Unsplash MCP `download_asset` tool (or `/photos/2mhqft65NIo/download`)
before adding it, as `docs/PHOTOGRAPHY.md` requires; `/photo-credits` then lists it. It is not
Caribbean; it is an honest, everyday "chosen fresh" shot with no logo or brand. Swap for a
Jamaican market or store photo if Derion supplies one.

### 3.7 New tokens and utilities

**None.** Everything uses existing roles (`crimson`, `crimson-deep`, `oxblood`, `blush`,
`surface`, `page`, `line`, `ink*`, `on-dark`, `on-crimson-muted`, `on-oxblood-muted`,
`jm-gold`, `signal` for the light-surface focus ring) and existing utilities (`section*`,
`p-card*`, `gutter`, `size-control`, `size-icon`, `min-h-control-lg`, `hover-lift`,
`animate-rise`, `on-dark-focus`, `scroll-mt-header`, `z-raised`, `text-balance`).

---

## 4. Performance and rendering

- **LCP:** the h1 text in S1 at every width (no hero image). Nothing above the fold waits on an
  image; the first images are basket photos (S2) at ~800px down on desktop.
- **No runtime reads.** All loaders are cached; the page reads no `searchParams`, `cookies()` or
  `headers()`, so it prerenders fully and needs no `<Suspense>`. The search form is a plain GET
  to `/search` (the results page handles `searchParams` in its own Suspense).
- **Client JS** on this page: `AddToBasket` (existing, one per card), `CutoffCountdown`
  (existing, renders nothing on the server, so no hydration mismatch). Delete the `Stagger`
  imports from the page and `HowWeShop`.
- Images: every `StockPhoto` and `ProductImage` keeps a real `sizes`; nothing on this page uses
  `preload`. Fixed aspect ratios reserve space (CLS ≈ 0).
- `animate-rise` on four signs is transform + opacity only.

---

## 5. Self-review

### 5.1 First pass vs revised (frontend-design two-pass)

| First pass                                                                                                         | Problem found in review                                                                                                                                                                                                                               | Revised                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Crimson hero with a big photo on the right and a row of department photo cards below it (the current page, tidied) | The same split as the home hero and the same department tiles as home S3: the shop would read as a second home page. Photo tiles also duplicate the home's department photos in the same role, and the Baby department has no product photos to show. | Typographic **oxblood aisle signs** with real contents; no hero photo. Photos are kept for the shelves, where they show the actual items. |
| Big item counts as numerals on each sign (`text-numeral`)                                                          | Shouting "4 items" makes a small launch catalogue look thin, the opposite of "well-stocked".                                                                                                                                                          | Count in small blush text; the sample product names do the "stocked" work.                                                                |
| "Popular right now" chips under the search                                                                         | Popularity isn't tracked: a fake claim.                                                                                                                                                                                                               | Dropped. The **Everyday staples** shelf uses the admin's `featured` flag and says "picked by our team".                                   |
| A sticky department jump bar over the shelves                                                                      | Five short shelves don't need it; it eats 56px on a phone under the sticky header; the signs already lead to each department.                                                                                                                         | Dropped. Anchors `aisle-{slug}` stay for deep links.                                                                                      |
| Signs straddling the crimson/page seam (echo of the home receipt)                                                  | Second use of the home's signature move; negative margins complicate S2 spacing.                                                                                                                                                                      | Signs sit fully inside the crimson band. One bold element, one place.                                                                     |
| Closing crimson CTA panel "Send a whole basket today"                                                              | Repeats S2; adds a third red block before the oxblood footer.                                                                                                                                                                                         | Removed. The page ends on "Can't find it?", a real next step.                                                                             |
| Stagger reveals on cards and promises                                                                              | Generic scroll choreography; store items should simply be there.                                                                                                                                                                                      | One load-time sequence on the four signs only.                                                                                            |

### 5.2 Generic defaults removed

No eyebrows; no "01/02/03" markers (the signs are not a sequence, so they are unnumbered); no
meta strings with middle dots (sign samples use plain "A, B and more"); no "→" in link text
(icons only, `aria-hidden`); no gradients, glass or gloss; flat cards, shadow only on hover lift;
Figtree type scale only; no hand-set tracking. No hero photo is a deliberate choice for a task
page: speed and a text LCP, with the real product photos one scroll away.

### 5.3 ui-ux-pro-max

- `--design-system "grocery delivery ecommerce store catalogue diaspora"` returned "Feature-Rich
  Showcase", "Vibrant & Block-based", a green/orange palette and Rubik + Nunito Sans.
  **Rejected:** palette (brand roles only), fonts (Figtree only), "animated patterns" and
  neon (brand and no-gradient rules). **Kept:** large solid blocks with high contrast (matches
  the crimson/oxblood brand), large type, 200–300ms hover, checklist below.
- `--domain landing "ecommerce category browse search"` → Marketplace/Directory: "Hero (search
  focused) > Categories > Featured listings > Trust > CTA" and "search is the primary CTA;
  give carousels a single-pointer alternative". The page follows this order (S1 search + signs →
  S2/S3 → S4 → S5) and every rail has "See all".
- `--domain ux "horizontal scroll carousel mobile"` → avoid page-level horizontal scroll. The
  page never scrolls sideways; only the contained shelf rails do, with a visible card peek.
- `--domain ux "product grid add to cart feedback"` → confirm success, no silent actions:
  existing `AddToBasket` shows "Added" plus an `aria-live` message.
- Pre-delivery checklist: no emoji; pointer on all links/buttons; hover 150–250ms; light text
  contrast ≥ 4.5:1; visible focus (signal on light, blush on dark); `prefers-reduced-motion`;
  checked at 375 / 768 / 1024 / 1440.

### 5.4 Risks

- **Sign sample names wrap long** ("Baby Diapers, Size 3"): `line-clamp-2` and hidden below 768.
- **Many departments later** (admin adds a fifth): the sign grid wraps 4 + 1 at lg; acceptable,
  or `lg:grid-cols-5` for exactly 5 (dev agent: implement `cols = min(count, 4)`, and 5 → 5).
- **Two search boxes at 768+** (header inline search and S1 search). See §7 Q1.
- **Demo dates**: in demo mode every product shares `2026-10-20`, so the note reads "on October
  20, 2026". In live mode the date is real admin data.
- **`jm-gold` saving tag**: it is the documented site-wide saving colour, not a new accent.

---

## 6. Acceptance checklist

All widths:

- [ ] `npm run check` green; `src/lib/shop-front.test.ts` covers the helpers; `design-tokens.test.ts` passes (no raw colours).
- [ ] No eyebrows, no gradients, no emoji, no hand-set tracking, money/dates only via `format.ts`.
- [ ] Every sign links to `/shop/{slug}`; the search form submits GET to `/search?q=`; every product and basket Add works before and after JS loads; anchors `#aisle-staples` and `#aisle-{slug}` land below the sticky header.
- [ ] Notes card shows the live parishes, cut-off (countdown appears after mount only, no hydration warning), the admin exchange rate and the real price-check date.
- [ ] No "popular", "best seller" or invented number anywhere; the staples lead says "picked by our team".
- [ ] `shopChoosing` is in the registry with full credit fields, appears on `/photo-credits`, and its download was recorded.
- [ ] Focus visible on every interactive element (blush on crimson/oxblood, signal on light). Reduced motion: signs appear without rising.

375:

- [ ] Order: h1, lead, search, signs 2×2, notes card, baskets (3 stacked row cards, full-width Add), shelves (rails, 2.3 cards), promises (no photos), can't-find panel. No horizontal page scroll.
- [ ] "Baby & Child" fits its sign on ≤ 2 lines; search button ≥ 44px; Add buttons 44px.

768:

- [ ] Signs 2×2 with sample lines; notes rows in 3 columns; baskets 1 column; shelves 4-up grid; S4 photos side by side under the text.

1024:

- [ ] S1 row 1 split 7/5 with the notes card bottom-aligned; signs 4-up; baskets still 1 column (row cards full width); shelves 5-up.

1440:

- [ ] S1 fits in ~780px so the signs are in the first viewport at 1440 × 900; baskets 3-up; shelves 5-up inside `max-w-wide`; S4 7/5 with offset photos; screenshots compared with the "before" shots.

---

## 7. Open questions

1. **Header search on `/shop` at 768px+.** The header shows its own search box from 768px, so
   the shop has two. Option: hide the header's inline search on `/shop` too (one-line change in
   the header). Manager's call; the plan works either way.
2. **Till price differs from the shelf price** (needs Derion). What happens when the store
   charges more or less than our listed price: refund the difference, absorb it, or ask? Once
   answered, add one sentence to notes row 3. Hidden until then.
3. **Exchange rate policy** (needs Derion, already an open item in `docs/BRIEF.md`): how often
   the J$ rate is updated. If it is set daily, row 2 could say so; until then it states only the
   rate.
4. **Sunday and holiday delivery** (needs Derion): row 1 says "same-day when you order by …"
   without days; add the days once confirmed.
5. **A real Jamaican store or market photo** to replace `shopChoosing` (needs Derion or a later
   photo search).

### Fit for `/shop/[category]` later (out of scope)

- `AisleSign` suits the category page's "Keep shopping" row (the other departments as smaller
  signs on `surface`, replacing `CategoryChips`), and the category hero could reuse the sign's
  disc + name treatment.
- `ShopNotes` can sit under the category page's filter bar as-is.
- `BasketRowCard` suits a "Make it a basket" upsell under the category grid.
- `ProductShelf`/`ProductCard` are unchanged, so the category grid stays consistent.
