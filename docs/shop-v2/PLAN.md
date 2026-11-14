# Shop v2: `/shop` and `/shop/[category]`: plan

Design agent, November 14, 2026. Status: **approved by the manager, November 14, 2026**, with
the amendments below. These amendments override the body of the plan where they clash.

## Manager approval and amendments

1. **Department group (§8 Q1): accepted as planned.** The band switches departments and stays
   static. Switching department goes to the plain department path, so price, stock and find
   reset. The Department group is removed from the sidebar and from the sheet.
2. **"Our pick" sticker (§8 Q2): dropped.** The `featured` flag in the demo data is ours, not a
   pick from Derion, so no sticker shows on any card for now. Remove it from §2.C3, §6 and the
   checklist. The "Our picks first" sort stays, because it is only an order.
3. **In-basket stepper (§8 Q3): leaf, as planned,** matching the home's "Added".
4. **Plan length:** fine as written.
5. **Home must not change visibly.** After the `ShelfCard` swap, screenshot the home shelf at
   375 and 1440 and compare it with the screenshot taken before the swap.

Scope: everything between the site header (HomeHeader: ticker, white bar, aisle row) and the
oxblood HomeFooter, on `/shop` and `/shop/[category]` (one template). The filter logic and
URL state from `docs/shop-listing/PLAN.md` stay: `src/lib/shop-filters.ts`,
`src/lib/shop-listing.ts`, `filter-form`, `filter-fields`, `filter-sheet`, `sort-select`,
`active-filters`, `load-more`, `listing-nav`, `find-in-list`. This plan changes what they sit in
and how they look, not how they filter.

Skills used: `frontend-design` (two passes, §6) and `ui-ux-pro-max` (`--design-system` for
"grocery e-commerce storefront product listing", `--domain ux` for filter chips, sticky
toolbar, touch spacing, loading, animation, horizontal scroll). Its design system came back as
green and orange, Rubik and Nunito Sans, "vibrant block-based": rejected (brand colours and
fonts are fixed). Kept from it: one key message per card, strong repeated Add, 200–300ms
colour-shift hovers, and the UX rules: wrap filter chips rather than clip them, never let the
sticky bar cover content, 8px between touch targets, lazy-load below the fold, keep the
skeleton in the final geometry, motion off under reduced motion.

## Real data this page shows (demo catalogue)

| Department   | Items | Pack shots                                  | Aisles with items                                   |
| ------------ | ----- | ------------------------------------------- | --------------------------------------------------- |
| Groceries    | 67    | 58 (Derion's, `public/products/`)           | Seasonings & spices 25, Rice & grains 11, Canned 12, Pantry, Cooking oils, Baking, Breakfast & drinks, Fresh produce, Dairy |
| Household    | 5     | none (branded placeholder)                  | Laundry & cleaning, Dishwashing, Paper goods        |
| Pharmacy     | 4     | none                                        | Pain relief, Vitamins, First aid & hygiene          |
| Baby & Child | 4     | none                                        | Diapers & wipes, Feeding, Bath & skin care          |

80 items, `PAGE_SIZE` 24, 6 featured (the team's own flag), no sale prices, no ratings, no
sales counts. Counts come from `getCategories()` (`count`) and `facetCounts()`; never typed in.
The two thin departments drive the "few items" state (§3.5).

---

## 1. Structure blueprint

### 1.1 Whole page at 1440 (max-w-wide 1280, gutter 32)

```
┌ HomeHeader (not in scope) ─────────────────────────────────────────────── ~178px ┐
╞══ A. DEPARTMENT BAND: full-bleed crimson ════════════════════════════════ ~268px ═╡
│  Shop › Groceries                                                                 │
│  Groceries  67 items                                   Find in Groceries          │
│  Pantry staples, breakfast, drinks and snacks.         [ Q  rice, ackee…    ] [→] │
│  (clock) Order by 1:00 PM…  (receipt) A photo of the till…  ($) J$ guide…         │
│  ┌──────────┐┌──────────┐┌──────────┐┌──────────┐┌──────────┐                     │
│  │▦ All     ││[ph] Groc.││[ph] Hous.││[ph] Phar.││[ph] Baby │  5 switch tiles      │
│  │  80 items││ 67 items ││ 5 items  ││ 4 items  ││ 4 items  │  current = white     │
│  └──────────┘└──────────┘└──────────┘└──────────┘└──────────┘                     │
╞═══════════════════════════════════════════════════════════════════════════════════╡
│ page bg #F7F7F7                                                                    │
│ ┌ C1 sidebar 256 ┐  ┌ C2 results ──────────────────────────────────────────────┐  │
│ │ Aisle  ☐ …  25 │  │ 67 items   J$ is a guide at J$157 to USD$1.   [Sort ▾]   │  │
│ │ Price  ○ …     │  │ [chip ×] [chip ×] Clear all                               │  │
│ │ Stock  ☐ …     │  │ ┌card┐┌card┐┌card┐┌card┐   4 columns, 236px cards         │  │
│ │ (sticky)       │  │ └────┘└────┘└────┘└────┘                                  │  │
│ └────────────────┘  │ … 24 per batch, oxblood basket cell at index 7 …         │  │
│                     │        Showing 24 of 67   [ Show 24 more ]               │  │
│                     │ Prices checked in store … Delivery times are estimates.  │  │
│                     └──────────────────────────────────────────────────────────┘  │
│ D. HELP STRIP: white 16px card, split 1/1: Can't find it? │ Ask us on WhatsApp     │
├ HomeFooter (not in scope) ─────────────────────────────────────────────────────────┤
```

### 1.2 Whole page at 375 (gutter 16)

```
┌ HomeHeader + its search row ─ ~164px ┐
╞ A. BAND crimson ─────────── ~196px ══╡
│ Shop › Groceries                     │
│ Groceries  67 items                  │
│ (clock) Order by 1:00 PM Jamaica…    │
│ ┌────────┐┌────────┐┌───            │  rail, tiles 176px wide, 5th peeks
│ │▦ All   ││[ph]Groc││[ph            │
│ └────────┘└────────┘└───            │
╞══════════════════════════════════════╡
│ B. AISLE ROW (department pages)      │  rail of 44px chips
│ [All 67][Seasonings 25][Rice 11][Ca… │
│ ┌ sticky toolbar (white) ──────────┐ │
│ │ [ Filters (1) ]   [ Sort ▾     ] │ │
│ └──────────────────────────────────┘ │
│ 67 items · chips wrap                │
│ ┌card┐┌card┐  2 columns, ~165px      │  first pack shots at ~y 540
│ └────┘└────┘                         │
│ …                                    │
│ [ Show 24 more ]                     │
│ D. help strip, stacked               │
└──────────────────────────────────────┘
```

### 1.3 Section by section

**A. Department band (the hero).**

- Pattern: a compact full-bleed colour band in two rows: a split title row (title block
  left, find field right at 1024+) over a row of five photo-thumbnail switch tiles. Not the
  home's rounded crimson banner with a photo half and side cards; no big photo, no lead copy,
  no buttons.
- Background: solid `bg-crimson`, full-bleed, square edges (it joins the header and the page
  like a shop awning). Current tile is cut out in `bg-surface`.
- Container: inner `mx-auto max-w-wide gutter`. Height content-led: ~268px at 1440, ~250 at
  1024, ~230 at 768, ~196 at 375 (department page; `/shop` has no breadcrumb, 28px less).
- Columns: 375/768: one column; the find field is not in the band (the header's own search row
  sits right above it below 1024). 1024/1440: `grid-cols-12`, title block `col-span-7`, find
  field `col-span-5` aligned to the bottom of the title block.
- Tiles: 375 and 768: a `rail` (horizontal scroll, snap, tiles `w-44`, the next one peeks).
  1024/1440: `grid grid-cols-5 gap-3`.
- Inner blocks: breadcrumb (department pages only), h1 + count, description (768+), promise
  line with 1 / 2 / 3 items at 375 / 768 / 1024+, find field (1024+), 5 tiles = thumbnail
  (icon well for "All", department photo for the four) + name + real count.
- Why it wins: grocerylistjamaica.com opens on a generic banner and a long category list;
  PriceSmart Jamaica opens with promotions before products. upercart puts category tiles
  with pictures right above the products. This band does that in under 270px, keeps the brand's
  red as a big solid block, and states the three things a sender abroad needs before buying:
  when it can arrive, the receipt proof, and that J$ is only a guide.

**B. Aisle quick row** (department pages, below 1024 only, when the department has items in
2 or more aisles).

- Pattern: one-line scroll rail of filter chips, left aligned, on the page background.
- Container: `mx-auto max-w-wide`, rail with `gutter` padding, `pt-3`. Height 44px.
- At 1024+ it does not render: the sidebar's aisle group is on screen.
- Blocks: "All {department}" + one chip per aisle that has products, each with its facet count.
- Why: on a phone, the sender gets one-tap aisles without opening a sheet; PriceSmart's app
  hides aisles two levels deep.

**C. Results.** `C1` sidebar + `C2` toolbar, chips, grid, load more, price note.

- Pattern: two columns at 1024+: a sticky filter sidebar (`15rem`, `16rem` at 1280+) and the
  results column; one column below 1024 with a sticky toolbar and a filter sheet.
- Background: `bg-page`; cards `bg-surface`.
- Container: `mx-auto max-w-wide gutter pt-4 lg:pt-8`.
- Grid columns: 2 at 375, 3 at 768, 3 at 1024 (with sidebar), 4 at 1280/1440. Gaps 12px,
  16px from 768.
- Blocks: count + J$ guide + sort; active chips (wrap, never clipped); 24 product cards; one
  oxblood basket cell at index 7 on an unfiltered first batch; Load more; one line of price
  honesty.
- Why: products are the page. A sender sees pack shots and USD prices in the first screen at
  1440 and the top of the first pack shots at 375×812.

**D. Help strip.** Split 1/1 white card (`rounded-xl`, 16px), stacked below 768. Two blocks:
"Can't find something?" (request link) and "Ask us on WhatsApp" (settings WhatsApp,
876-797-4301 formatted `1-876-797-4301`). `mt-12` (48px) under the results, `pb-12 lg:pb-16`
to the footer. Why: a family list always has one item we don't stock; a real person on
WhatsApp is what a sender abroad trusts.

**E. Few items rail** (only on a department page, unfiltered, fewer than 8 results): "More from
the shop", a row of up to 6 featured visible products from other departments, same card,
`rail` below 1024, `grid-cols-6` at 1280+ (`grid-cols-4` at 1024, first 4). Sits between C and
D, `pt-10 lg:pt-12`.

---

## 2. Styling, section by section

### 2.A Department band

Copy and data:

- Breadcrumb: "Shop" link → `/shop`, chevron, department name (`aria-current="page"`).
- h1: `/shop` "Shop for family in Jamaica" (Derion's banner words, sentence case); department
  page: the department name ("Groceries").
- Count beside h1: `{n} items` from the scope (`inScope.length`).
- Description (768+): `/shop` "Bought in Jamaica on the day we deliver. You pay in US
  dollars."; department: `category.description`.
- Promise line: `CutoffNote tone="onDark"` (all widths, only when a cut-off exists: "Order by
  1:00 PM Jamaica time and we aim to deliver the same day."); `Receipt` "A photo of the till
  receipt with every order" (768+); `DollarSign` "J$ is a guide at J$157 to USD$1" (1024+,
  `formatJmd(settings.jmdPerUsd)`).
- Find field (1024+): label "Find in the shop" / "Find in Groceries", placeholder "Rice, ackee,
  diapers…".
- Tiles: "All" with `count` = sum of departments; then each department, `count` from
  `getCategories()`. Item word singular at 1.

Wireframes:

```
375                                768                                   1440
┌───────────────────────────┐      ┌─────────────────────────────────┐    see 1.1
│Shop › Groceries      xs   │      │Shop › Groceries                 │
│Groceries 67 items         │      │Groceries  67 items              │
│(clk) Order by 1:00 PM…    │      │Pantry staples, breakfast…       │
│┌───────┐┌───────┐┌──      │      │(clk) Order by…  (rcpt) A photo… │
││▦ All  ││▣ Groc ││▣       │      │┌──────┐┌──────┐┌──────┐┌──────┐┌│
││80 itms││67 itms││        │      ││▦ All ││▣ Groc││▣ Hous││▣ Phar││ │
│└───────┘└───────┘└──      │      │└──────┘└──────┘└──────┘└──────┘└│
└───────────────────────────┘      └─────────────────────────────────┘
```

Classes and tokens:

- Section: `bg-crimson text-on-dark on-dark-focus`, `aria-labelledby="listing-title"`.
  Inner: `mx-auto max-w-wide gutter pt-5 pb-5 md:pt-7 md:pb-6`.
- Breadcrumb: `text-xs md:text-small text-on-crimson-muted`, links
  `hover:text-on-dark hover:underline underline-offset-2`, current `font-medium text-on-dark`.
  Target 24px min height (inline text link, WCAG 2.5.8 spacing exception).
- h1: `font-display text-h2 font-semibold text-balance` (28 → 35px, Bricolage 600). Count:
  `text-small font-medium text-blush tabular-nums`, baseline-aligned, `gap-x-3`.
- Description: `hidden md:block mt-1.5 text-small text-on-crimson-muted max-w-[60ch]`.
- Promise line: `mt-3 flex flex-wrap gap-x-6 gap-y-1.5`; each item `text-small text-on-dark`,
  icon `size-icon text-blush` (blush on crimson 4.9:1; icons are decorative, `aria-hidden`).
- Find field block (lg): `self-end`; label `text-small font-medium text-on-crimson-muted`;
  `FindInList` with a new `tone="onCrimson"`: input `h-12 rounded-md bg-surface text-ink
  border-0 pl-11` (Search icon `text-ink-muted` inside), submit button `h-12 rounded-md
  bg-oxblood text-on-dark btn-slide [--slide:var(--color-ink)]`, label "Find".
- Tile row: `mt-5 md:mt-6`. Rail at <lg: `rail -mx-4 px-4 gap-3 snap-x` (existing `rail`
  utility); `lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible`.
- Tile (a `Link`): `group btn-slide flex h-16 md:h-[4.5rem] w-44 lg:w-auto shrink-0 snap-start
  items-center gap-3 rounded-lg p-2 pr-4 text-left`.
  - Not current: `bg-crimson-deep text-on-dark [--slide:var(--color-oxblood)]`; count
    `text-on-crimson-muted`.
  - Current: `bg-surface text-ink [--slide:var(--color-surface)]`, `aria-current="page"`,
    name `text-crimson-deep`, count `text-ink-muted`.
  - Thumbnail: `relative size-12 md:size-14 shrink-0 overflow-hidden rounded-md
    photo-loading`, `StockPhoto` (`homeVegBox` Ss1u-roUcuM, `catHousehold` DJcVOQUZxF0,
    `catPharmacy` HTttz00wkzU, `catBaby` QCVrp1uxCXs; the same crops as
    `components/home/departments.tsx`, lift that `looks` map into `src/lib/departments.ts`
    and use it in both), `sizes="56px"`. "All": `grid place-items-center bg-oxblood
    text-blush` well with `LayoutGrid size-icon-lg` (on the current white tile:
    `bg-surface-selected text-crimson`).
  - Text: name `block truncate text-small font-semibold`, count `block text-xs font-medium
    tabular-nums`.
- Hover: not-current tile fills oxblood from the left (btn-slide, 300ms in, 200ms out) and its
  thumbnail scales 1.06 (`group-hover:scale-[1.06]`, 400ms `ease-hover`). Current tile: no
  hover change, `cursor-default`. Focus: `on-dark-focus` gives the blush ring, offset 2px.
  Pressed: `active:translate-y-px`.
- Motion (the page's one orchestrated moment): on first paint the five tiles rise in with
  `animate-rise`, `style={{ animationDelay: i * 60ms }}` (CSS, before JavaScript, lets go
  after playing, as the home hero cards do). The band itself does not animate (it is the
  LCP area). Reduced motion: no rise, the slide becomes an instant colour swap.

### 2.B Aisle quick row

- Data: department aisles (`getAisles`) filtered to those with ≥1 product in the department;
  counts from `facets.aisles` (so they respect price, stock and the find text). Links:
  `shopHref(basePath, query, { aisles: [slug], page: 1 })`; "All" clears aisles. Current =
  `query.aisles` has exactly that one slug (or none, for "All"). With 2+ aisles picked in
  the sheet, no chip is current. A chip whose facet count is 0 renders as a `span` with
  `aria-disabled="true"`, not a link.
- Classes: `lg:hidden mx-auto max-w-wide pt-3`; list `rail gap-2 gutter`; chip `inline-flex
  h-control shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface px-3.5
  text-small font-medium text-ink whitespace-nowrap transition-colors duration-200
  hover:border-line-hover hover:bg-surface-muted`; count `text-xs text-ink-muted
  tabular-nums`; current `border-crimson bg-surface-selected text-crimson-deep`, count
  `text-crimson-deep`; disabled (facet count 0): `border-dashed text-ink-muted`, count "0",
  not a link (`ink-disabled` is never used for text).
- Uses `ListingLink` so the results region shows the pending state and focus moves to the
  count, exactly as the sidebar does. Scroll: the current chip is scrolled into view on load
  (`scrollIntoView({ inline: 'nearest' })` in a tiny client effect, skipped under reduced
  motion's smooth behaviour).

### 2.C Results

**C1 Sidebar (1024+).** Keep `FilterForm` + `FilterFields` and the sticky container
(`lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]`). Changes: the "Department" group is
removed (the band is the department switch; see §4 note); the sidebar `FindInList` is removed
(the band has it at 1024+). Group headings `font-display text-small font-semibold text-ink`
(was 700), rows `text-small text-ink-body`, counts `text-xs text-ink-muted tabular-nums`,
checkboxes and radios keep `border-control` and `accent-crimson`. Groups separated by
`border-t border-line pt-5 mt-5`. The no-JavaScript "Apply filters" button stays.

**C2 Toolbar.**

- 1024+: `flex items-center justify-between gap-4`, static. Left: count `text-small
  font-semibold text-ink` ("67 items", plus ` for "rice"` in `font-medium text-ink-body`),
  no J$ line here (the band's promise line carries it at 1024+). Right: `SortSelect` `w-64`, label
  "Sort" visible `text-small font-medium`.
- Below 1024: the `StickyToolbar` stays (`sticky top-(--header-height) z-sticky bleed-gutter
  border-b border-line bg-surface py-2 data-[stuck]:shadow-lift`) with
  `grid grid-cols-2 gap-2`: `FilterSheet` trigger (outline, `h-control rounded-md border
  border-line-strong text-small font-semibold`, `SlidersHorizontal` icon, count badge
  `bg-crimson text-on-dark text-xs rounded-sm px-1.5`) and `SortSelect` (label sr-only).
  768–1023 adds the toolbar `FindInList` as today (`md:grid-cols-[minmax(0,1fr)_auto_13rem]`).
  Below 768 the find field moves to the top of the filter sheet (§4), so nothing sits between
  the band and the products except the aisle row and this bar.
- Under the bar (below 1024): count + J$ guide on one wrapping line, `mt-3`.
- Chips: `ActiveFilters` unchanged in logic; chip style `h-9 rounded-md bg-surface-selected
  text-crimson-deep text-small font-medium pl-3 pr-1` with an `X` 28px hit inside a 36px row
  (gap 8px to the next), "Clear all" `text-small font-semibold text-crimson underline`.
  Wraps (`flex flex-wrap gap-2`). `mt-3`.

**C3 Product card: `ShelfCard`** (new `src/components/shop/shelf-card.tsx`, the home shelf's
anatomy lifted out; the home shelf and this grid both render it).

```
┌───────────────── 12px radius, p-3 ─┐
│ ┌──── surface-muted square 8px ──┐ │  pack shot whole: object-contain p-3
│ │ [Our pick]  mango sticker      │ │  mix-blend-multiply; no photo → branded
│ │          (pack shot)           │ │  placeholder (ProductImage placeholder="label")
│ └────────────────────────────────┘ │
│ Member's Selection Thai Jasmine    │  14/600 ink, 2 lines reserved (h-[2lh])
│ 9.07 kg / 20 lb                    │  12 ink-muted, 1 line
│ USD$28.19                          │  text-price (18) 600 ink tabular
│ about J$4,426                      │  12/500 ink-muted
│ USD$1.41 per lb (when parseable)   │  12/500 ink-body, its own line, optional
│ [ +  Add                        ]  │  outline crimson, 44px, btn-slide
└────────────────────────────────────┘
```

- Props: `product: Product`, `jmdPerUsd: number`, `action: ReactNode` (the control slot),
  `unitPrice?: string | null`, `eager?: boolean`, `priority?: boolean`, `sizes: string`,
  `firstNew?: boolean`, `className?: string`.
- Classes: the shelf's article as is: `group relative flex h-full w-full card-rise flex-col
  rounded-lg border border-line bg-surface p-3 hover:border-line-hover
  has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2
  has-[a:focus-visible]:outline-signal`. Image well `aspect-square rounded-md
  bg-surface-muted photo-loading`; img `object-contain p-3 mix-blend-multiply
  transition-[opacity,scale] duration-500 ease-hover group-hover:scale-[1.04]`. Name link
  stretches over the card (`after:absolute after:inset-0`). Control wrapper `relative
  z-raised mt-auto pt-3`.
- "Our pick" sticker: only when `product.featured` (the team's real flag; the sort is
  already called "Our picks first"). `absolute top-2 left-2 rounded-sm bg-mango px-2 py-0.5
  text-xs font-semibold text-ink` (ink on mango ≥ 11:1). Straightens on hover is not used:
  the sticker sits flat. Never "Bestseller", "Popular" or "Hot".
- Out of stock: image `opacity-60`, `Badge` "Out of stock" top-left (replaces the sticker),
  control shows the grey "Out of stock" bar from `TileBasketControl`.
- Listing control: `TileBasketControl` (keeps absolute-quantity posts, focus handling and the
  single live region). Restyle: resting "Add" matches `HomeAddButton variant="outline"`
  exactly (`btn-slide border-2 border-crimson bg-surface text-crimson rounded-md h-control
  text-small font-semibold [--slide:var(--color-crimson)] hover:text-on-dark`). In basket:
  the stepper turns **leaf** (`bg-leaf text-on-dark`, step buttons `hover:bg-leaf-deep
  active:bg-leaf-deep`, disabled `text-on-leaf-muted`), the same green as the home's
  "Added", so "it's in the basket" reads the same on every page. Count `font-semibold`
  (was bold), "in basket" `text-on-leaf-muted` when the stepper is ≥10rem wide. Focus ring:
  `on-dark-focus` is wrong on leaf; use the default signal ring with 2px offset.
- Home control: `HomeAddButton variant="outline"`, unchanged.

**C4 Basket cell** (`BasketShortcutTile`, kept, restyled to the card's geometry):
`rounded-lg bg-oxblood p-3 card-rise`; photo `aspect-square rounded-md photo-loading`; label
"Ready-made basket" `text-xs font-semibold text-blush`; name `font-display text-small
font-semibold` 2 lines; meta `text-xs text-on-oxblood-muted` ("12 items for USD$69.00"); link
row 44px `text-small font-semibold`, `ArrowRight` nudges 3px on hover. Real basket data only.

**C5 Grid motion.** First batch: each card `animate-rise` with delay `min(i, 7) * 40ms`
(CSS, runs once on paint). Load more: the new batch rises the same way, starting at
`firstNew`. While a filter link is pending, the grid fades to 60% (`group-data-[pending]`,
kept). Hover `card-rise` (4px, `shadow-lift`, 400ms `ease-hover`) and pack shot 1.04 zoom;
pressed lifts back to 1px. Reduced motion: no rise, no lift, no zoom.

**C6 Load more.** Centred, `mt-8`: `text-small text-ink-muted tabular-nums` "Showing 24 of 67"
above an outline button `btn-slide h-control rounded-md border-2 border-crimson px-6
text-small font-semibold text-crimson [--slide:var(--color-crimson)] hover:text-on-dark`
"Show 24 more" (or "Show the last 19"). Plain link without JavaScript (kept).

**C7 Price honesty line.** Under the grid, `mt-6 text-xs text-ink-muted`:
`priceCheckLine(range)` + " Delivery times are estimates." (moves here from the old edge
strip).

### 2.D Help strip

```
375                               1440
┌────────────────────────────┐    ┌───────────────────────────┬───────────────────────────┐
│ (pkg+) Can't find something?│   │ (pkg+) Can't find something?│ (msg) Ask us on WhatsApp │
│ Tell us what they need …    │   │ Tell us what they need and │ A real person at ShipEast │
│ Request an item             │   │ we'll look for it in store.│ answers. 1-876-797-4301   │
│ ─────────────────────────── │   │ Request an item            │ Message us                │
│ (msg) Ask us on WhatsApp …  │   └───────────────────────────┴───────────────────────────┘
└────────────────────────────┘
```

- `mt-12 grid rounded-xl border border-line bg-surface md:grid-cols-2`; cells `p-card`
  (`md:p-card-lg`), divider `border-t md:border-t-0 md:border-l border-line`.
- Heading `font-display text-body font-semibold text-ink` with icon `size-icon text-crimson`
  (`PackagePlus`, `MessageCircle`); body `text-small text-ink-body`; links `min-h-control
  text-small font-semibold text-crimson underline underline-offset-2
  hover:text-crimson-deep`. WhatsApp link `https://wa.me/1876…` from `settings.whatsapp`,
  number shown with `formatJamaicanPhone`; hidden if settings have no WhatsApp. Request link
  from `requestLink(settings.features.item_requests)` (kept).
- Static, no reveal (keeps it visible without JavaScript; the shell's failsafe covers
  `Reveal` anyway, but nothing here needs it).

### 2.E Empty and thin states

- **No matches** (`NoMatches`): white `rounded-xl border border-line p-card-lg text-center`,
  `PackageSearch` in a `size-12 rounded-md bg-surface-muted text-crimson` well, title
  `font-display text-title font-semibold` "Nothing matches these filters", body "Remove a
  filter, or search the whole shop.", chips, primary "Clear all filters" (crimson solid,
  `btn-slide [--slide:var(--color-oxblood)]`), "Search the whole shop for “x”" when there is
  find text, request link. Logic unchanged.
- **Empty department** (`EmptyDepartment`, 0 products): same card, `PackageOpen`, "Nothing in
  {department} yet", "We're stocking this department. Tell us what they need and we'll look
  for it in store.", links to the other departments as 44px outline chips (§2.B chip style).
- **Thin department** (department page, unfiltered, < 8 results, e.g. Pharmacy 4 + Pharmacy
  Pack cell): the grid shows what exists, then section E "More from the shop"
  (`font-display text-title font-semibold`, "Shop everything" link → `/shop`), 6 `ShelfCard`s
  from other departments (featured first, then name order, visible only) with the same
  `TileBasketControl`. No invented "coming soon" counts.
- **All out of stock** banner: kept (`rounded-md bg-warn-tint p-4 text-small text-ink`).

### 2.F Loading skeleton

The band is static (cached loaders, prerendered), so it never skeletons. The Suspense
fallback `ListingSkeleton` is rebuilt in the new geometry so nothing shifts:

- below 1024: aisle-row skeleton (department pages; 4 `h-11 w-24 rounded-md`) only when
  `scope.kind === 'department'` (pass `scope` to the skeleton), the 60px toolbar bar, a
  `h-5 w-32` count line;
- 1024+: sidebar groups (3 groups, heading `h-4 w-20` + 3 rows `h-6`), the toolbar row
  (`h-5 w-28` left, `h-11 w-64` right);
- 8 cards in the grid's columns, each: `rounded-lg border border-line bg-surface p-3`,
  `aspect-square rounded-md` well, two `h-4` name lines, `h-3 w-16` size, `h-5 w-20` price,
  `h-3 w-24` J$, `h-11 rounded-md` button. All use the existing `Skeleton` (pulse off under
  reduced motion). `role="status"` sr-only "Loading products". The noscript note stays.

---

## 3. Accessibility

- One h1 in the band; the results keep their sr-only h2 (`RESULTS_HEADING`) and scroll-margin
  under the sticky header and toolbar (`scroll-mt-[calc(var(--header-height)+4.5rem)]`).
- Department tiles: `nav aria-label="Departments in the shop"` (the header's aisle row is
  "Departments"; two navs need different names), `aria-current="page"` on the current one;
  each link's name reads "Groceries, 67 items".
- Aisle row: `nav aria-label="Aisles in Groceries"`, current chip `aria-current="true"`.
- Filters by keyboard: native checkboxes, radios and selects (kept); the sheet traps focus
  and returns it to the trigger (kept); Load more moves focus to the first new card (kept).
- Contrast pairs to add to the contrast test: on-dark on crimson-deep, ink and crimson-deep on
  surface (current tile), blush on crimson (icons), on-leaf-muted on leaf, ink on mango,
  crimson-deep on surface-selected (current chip).
- Targets: tiles 64/72px tall, chips and every control 44px, 8px gaps (12px between tiles).
- No sideways page scroll at 375/768/1024/1440; rails scroll inside themselves and their
  last item is fully reachable (gutter padding at the rail's end).

---

## 4. Component map

| File                                                 | Action  | Notes |
| ---------------------------------------------------- | ------- | ----- |
| `src/app/(site)/shop/page.tsx`                       | change  | metadata description: "…and we aim to deliver the same day." |
| `src/app/(site)/shop/[category]/page.tsx`            | change  | same softer description |
| `components/shop/listing/shop-listing.tsx`           | change  | renders `ShopBand` (static) + `<Suspense fallback={<ListingSkeleton scope={…}/>}>`; no `EdgeStrip`; passes `cutoff`, `jmdPerUsd` to the band |
| `components/shop/listing/shop-band.tsx`              | **new** | props `{ title: string; description: string; count: number; current: string \| null; departments: { slug; name; count }[]; allCount: number; cutoff: string \| null; jmdPerUsd: number; findSlot: ReactNode }` |
| `components/shop/listing/department-tile.tsx`        | **new** | props `{ href; name; count; current: boolean; slug: string \| null; index: number }`, server component |
| `components/shop/listing/band-find.tsx`              | **new** | async, reads `searchParams`, renders `FindInList tone="onCrimson"`; band wraps it in `<Suspense>` with a static `FindInList` (default query) of the same size as fallback |
| `components/shop/listing/aisle-row.tsx`              | **new** | props `{ basePath; query: ShopQuery; aisles: ListingAisle[]; counts: Record<string, number>; departmentName: string; total: number }`; server, uses `ListingLink`; plus a 10-line client child for scroll-into-view |
| `components/shop/listing/more-from-shop.tsx`         | **new** | props `{ products: Product[]; jmdPerUsd; basket quantities: Record<string, number> }` |
| `components/shop/shelf-card.tsx`                     | **new** | the one product card (§2.C3) |
| `src/lib/departments.ts`                             | **new** | department slug → `{ photo: StockPhotoKey; crop: string }`, used by home departments and the band |
| `components/home/shelf.tsx`                          | change  | renders `ShelfCard` with `action={<HomeAddButton variant="outline" …/>}`; visually identical |
| `components/home/departments.tsx`                    | change  | imports the `looks` map from `lib/departments.ts`; visually identical |
| `components/shop/listing/listing-results.tsx`        | change  | `ShelfCard` + `TileBasketControl`; aisle row; toolbar layout (§2.C2); price line; thin-department rail; no department options |
| `components/shop/listing/filter-fields.tsx`          | change  | drop the Department group and its props; heading weights |
| `components/shop/listing/filter-sheet.tsx`           | change  | accepts a `top` slot: the phone `FindInList` (its own form, above the filter form) |
| `components/shop/listing/find-in-list.tsx`           | change  | `tone?: 'light' \| 'onCrimson'` |
| `components/shop/listing/tile-basket-control.tsx`    | change  | outline Add = HomeAddButton look; leaf stepper |
| `components/shop/listing/basket-shortcut-tile.tsx`   | change  | §2.C4 |
| `components/shop/listing/load-more.tsx`              | change  | §2.C6 copy and style |
| `components/shop/listing/active-filters.tsx`         | change  | chip style only |
| `components/shop/listing/listing-empty.tsx`          | change  | §2.E copy and style |
| `components/shop/listing/listing-help-row.tsx`       | change  | becomes the help strip (§2.D); needs `whatsapp` |
| `components/shop/listing/listing-skeleton.tsx`       | change  | §2.F, takes `scope` |
| `components/shop/listing/department-band.tsx`        | delete  | replaced by `shop-band.tsx` |
| `components/shop/listing/tab-rail-scroller.tsx`      | delete  | folder tabs are gone |
| `components/shop/listing/edge-strip.tsx`             | delete  | content moved to the band and the price line |
| `components/shop/listing/product-tile.tsx`           | delete  | replaced by `ShelfCard` |
| `components/shop/product-card.tsx`                   | keep    | still used by the product page, gifts and basket pages; folded into `ShelfCard` when those pages are redone. Not lifted now, so no other page changes. |
| `lib/shop-filters.ts`, `lib/shop-listing.ts`         | keep    | no logic change. Tests stay green. |

Note on the Department group: the band now switches departments. Switching department from a
tile goes to the plain department path (the band is static), so price, stock and find reset.
Aisles never carried over anyway. This trades one convenience for a static, fast band.

Order of build: `ShelfCard` + home shelf swap (screenshot the home shelf unchanged) → band and
tiles → aisle row → results restyle → empty/thin states → skeleton → delete old files → tests.

---

## 5. Motion summary

| Element             | Motion                                             | Reduced motion |
| ------------------- | -------------------------------------------------- | -------------- |
| Department tiles    | `animate-rise`, 60ms stagger, once on paint        | none           |
| Tile hover          | btn-slide oxblood fill, thumbnail 1.06, 300/200ms  | colour swap    |
| Product cards       | `animate-rise`, 40ms stagger capped at 8           | none           |
| Card hover          | `card-rise` 4px + `shadow-lift`, pack shot 1.04    | border only    |
| Add / Load more     | btn-slide crimson fill, icon nudge 3px             | colour swap    |
| Photo wells         | `photo-loading` pulse until loaded, lazy fade-in   | no pulse       |
| Filter pending      | grid to 60% opacity, 150ms                         | kept (no move) |
| Sticky toolbar      | `shadow-lift` once stuck, 150ms                    | kept           |

No parallax on this page: there is no large photo, and parallax on a working list is noise.

---

## 6. Self-review against generic defaults (pass 2)

- **First draft repeated the home's departments section**: four big 4:3 photo tiles under the
  band. That is the home page again and pushes products below the fold. Replaced by 72px
  thumbnail tiles inside the band that act as tabs.
- **First draft had a wide search field under the band at every width.** At <1024 the header
  already shows a search row, so two fields would stack. The find field is in the band only
  at 1024+, in the toolbar at 768–1023, in the sheet below 768.
- **First draft had an eyebrow "Shop" above the h1 and a "Showing results" label.** Removed;
  the breadcrumb already says where you are.
- **First draft used crimson for the in-basket stepper.** A grid of 24 cards with several
  crimson steppers turns into a wall of red and blurs "action" with "done". Leaf is the
  brand's "added" colour since v3.4, so the stepper uses it.
- **First draft put a mango price tag on every card.** Mango is for stickers only and there is
  no sale data; a tag on every price is decoration. Kept one honest sticker, "Our pick", on
  the 6 featured items.
- **Stock SaaS kit check**: no identical icon-feature cards, no tracked all-caps labels, no
  middle-dot meta strings (the J$ guide and unit price sit on separate lines), no "→" in copy,
  no gradient, radius by hierarchy (12px tiles and product cards, 16px help and empty cards,
  8px images, buttons and chips; band square).
- **One bold thing**: the solid crimson band with the white cut-out tile. Everything under it
  is quiet: white cards, grey page, one green state, one yellow sticker.
- **Copy**: plain and from the sender's side ("Can't find something?", "Ask us on WhatsApp",
  "Order by 1:00 PM Jamaica time and we aim to deliver the same day").

---

## 7. Acceptance checklist

- [ ] `/shop` and `/shop/groceries` render the band, results and help strip between the shell
      header and footer; no other route changes visually (home shelf and departments
      pixel-identical before/after).
- [ ] At 1440×900 the first row of pack shots and prices is visible without scrolling; at
      375×812 the top of the first two pack shots is visible on `/shop/groceries`.
- [ ] h1 is Bricolage 600 at `text-h2`; no 700/800/900 weights on the page except shared
      components outside scope; body and card text 14px, prices 18px, buttons 14px at 44px.
- [ ] Radii: band 0, tiles and product cards 12px, help and empty cards 16px, images,
      buttons and chips 8px; nothing above 24px (`home-guard` style check passes).
- [ ] Every count on the page (tiles, aisle chips, sidebar, results) matches the data
      (Groceries 67, Household 5, Pharmacy 4, Baby & Child 4, All 80 in demo mode).
- [ ] All money via `format.ts`: `USD$28.19`, `about J$4,426`, J$ guide rate from settings.
- [ ] "Our pick" appears only on `featured` products; no rating, review, bestseller or
      popularity text anywhere.
- [ ] Same-day copy reads "we aim to deliver the same day" (band and metadata); the price
      line ends "Delivery times are estimates."
- [ ] Department tiles: current one is white with `aria-current="page"`; others fill oxblood
      on hover; rail scrolls at 375/768, five columns at 1024/1440.
- [ ] Aisle row shows below 1024 on department pages only, with facet counts; tapping a chip
      updates the URL (`?aisle=`), the grid, the count and focus, exactly like the sidebar.
- [ ] Sidebar (1024+) has aisle, price and availability groups, no department group, and stays
      sticky; the phone sheet has the find field on top and counts results live.
- [ ] Sort, chips, Clear all, Load more and back/forward all work as before; a shared URL
      restores the same view; everything works as plain links/forms without JavaScript.
- [ ] Add posts once per tap; the control turns into a leaf stepper; − at 1 shows a bin and
      removes; the header basket count updates; screen readers hear one message per change.
- [ ] Out-of-stock card: dimmed image, badge, grey bar instead of Add.
- [ ] `/shop/pharmacy` (4 items) shows the grid, the Pharmacy Pack cell and "More from the
      shop" with 6 real products from other departments; filters that match nothing show the
      no-matches card with a working "Clear all filters".
- [ ] Skeleton matches the final geometry: no layout shift when results stream in (CLS < 0.1).
- [ ] Keyboard: tab order band → aisle row → toolbar/sidebar → grid → load more → help;
      visible 3px focus ring everywhere (blush on crimson).
- [ ] Reduced motion: no rise, lift, zoom or slide; pulses off.
- [ ] No horizontal page scroll at 375, 768, 1024, 1440; photos load from Unsplash in
      screenshots.
- [ ] Old `department-band`, `tab-rail-scroller`, `edge-strip`, `product-tile` deleted with no
      dangling imports; `npm run check` green; screenshots at 375/768/1024/1440 reviewed
      against this plan.

## 8. Open questions for the manager

1. Department switching now resets price, stock and find filters (static band). Accept, or
   keep a Department group in the sheet only?
2. "Our pick" sticker on the 6 featured items: keep, or show no sticker at all until Derion
   marks real picks?
3. Leaf stepper for "in basket": confirm (the alternative is the old crimson stepper).
