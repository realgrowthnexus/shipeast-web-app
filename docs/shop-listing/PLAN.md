# `/shop` big-mart listing: build plan

Owner: design agent. For: the manager, then the development agent.
Scope: `/shop` and `/shop/[category]`, from the first pixel under the shared header to the last
pixel above the shared footer, plus the data and URL work behind them (aisles, filters, unit
price, basket quantity on cards). Plan date: November 7, 2026.

Read with: `CLAUDE.md`, `docs/BRAIN.md`, `docs/TOKENS.md`, `docs/DESIGN-SYSTEM.md`,
`docs/PHOTOGRAPHY.md`. If this plan and those files disagree on a brand rule, those files win
and the dev agent flags it to the manager.

**What the owner asked for (translated):** "Do the shop page where the products are actually
visible: grid layouts, a filter sidebar, a very big mart type. Right now it feels like a
corporate business site, but our main focus is products." This plan replaces the current
`/shop` front door (aisle signs, basket rows, shelves, promise bands) with one dense product
listing used by both routes.

**Owner update folded in (November 7, 2026):**

1. The shared header is being redesigned to a **light** bar (surface or page, crimson
   actions) by another agent (`docs/heroes/PLAN.md`). This plan does not design the header. It
   assumes a light sticky header whose height is `--header-height`, and it gives the area under
   it a clear edge (a solid crimson band; see R1), so there is never light-on-light without a
   line.
2. `/shop` must **not** open with the two-column hero the other pages use. It opens with a
   single-column, products-first department band about 170px tall: no photo, no lead
   paragraph, no second column. Products start in the first screen at every width.

Skills used: `frontend-design` (two-pass plan, self-review in §7) and `ui-ux-pro-max`
(`--design-system` with density 8, plus `ux`, `landing`, `style` and `nextjs` stack searches;
see §1.4 and §7.2).

Icons are `lucide-react` only. Boxes and arrows in the wireframes are drawings, not glyphs to
copy into the UI.

---

## Contents

1. Research
2. Concept
3. Structure blueprint (whole page, then every region)
4. Region detail: copy, data, wireframes, classes, components, states, motion, accessibility
5. URL and data model (filters, aisles, unit price, basket quantity)
6. Performance
7. Self-review and the ui-ux-pro-max checklist
8. Acceptance checklist
9. Open questions
10. File list for the dev agent

---

## 1. Research

### 1.1 How the research was done

- WebSearch worked. **WebFetch could not reach `baymard.com`** (the host is outside this
  session's allowed network). Baymard findings below come from search-result summaries of their
  articles, not from reading the full pages. If the manager wants the full articles read,
  `baymard.com` has to be allowed in the `shipeast-web-app` environment's network settings.
- Several Baymard guidelines are paywalled. Where a claim rests on a third-party summary, it
  says so.

### 1.2 Sources

| #   | Source                                                                                                                        | Used for                                                                    |
| --- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| S1  | Baymard, Online grocery UX research: https://baymard.com/research/online-grocery                                              | Grocery sites rate "poor" or "mediocre"; product lists and filtering matter |
| S2  | Baymard, Grocery add-to-cart buttons: https://baymard.com/blog/grocery-add-to-cart-buttons                                    | Add button turns into a quantity picker once added                          |
| S3  | Baymard, Price per unit: https://baymard.com/blog/price-per-unit                                                              | 86% of sites miss unit price; show it next to the pack price                |
| S4  | Baymard, Ecommerce filter UI: https://baymard.com/blog/ecommerce-filter-ui                                                    | Sidebar on desktop; drawer with a "Show X results" button on mobile         |
| S5  | Baymard, Horizontal filtering toolbar: https://baymard.com/blog/horizontal-filtering-sorting-design                           | Toolbar only works with 6 to 8 filter types or fewer; 2024 guidance: sidebar |
| S6  | Baymard, Product finding 2024 update: https://baymard.com/blog/product-finding-2024-launch                                    | "Be cautious with horizontal toolbars, consider sidebar filtering"          |
| S7  | Baymard, How to design applied filters: https://baymard.com/blog/how-to-design-applied-filters                                | An overview of applied filters above results; removable                     |
| S8  | Baymard, Apply buttons in mobile filtering: https://baymard.com/guidelines/1125-apply-buttons-in-mobile-filtering-interfaces | Deliberate apply step on mobile                                             |
| S9  | Baymard, Load more vs pagination vs infinite scroll: https://baymard.com/blog/external-load-more-vs-pagination-vs-infinite-scrolling | "Load more" performs best; pagination makes people browse less       |
| S10 | Smashing Magazine (Baymard study): https://smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons        | Detail of S9: show 10–30, then "Load more"                                  |
| S11 | Smart Interface Design Patterns, Filtering UX: https://smart-interface-design-patterns.com/articles/filtering-ux/             | Apply button plus live count works best; count in the button; sticky       |
| S12 | NN/g, Mobile faceted search: https://www.nngroup.com/articles/mobile-faceted-search/                                          | Overlay filters on the same screen as results (Amazon, eBay)               |
| S13 | Algolia, Faceted search overview (cites NN/g): https://www.algolia.com/de/blog/ux/faceted-search-an-overview                  | Batch facet choices on mobile; most general filter at the top               |
| S14 | NN/g, Filter categories vs values: https://www.nngroup.com/articles/filter-categories-values/                                 | Group naming and order                                                       |
| S15 | Which?, Supermarket unit pricing: https://www.which.co.uk/news/article/can-you-spot-the-cheapest-supermarket-prices-asvVe1C5iZMO | Tesco, Sainsbury's, Ocado all show unit prices; default sort "favourites"  |
| S16 | Econsultancy, Ocado vs Sainsbury's: https://www.econsultancy.com/ocado-vs-sainsbury-s-customer-journey-comparison/            | Ocado filters: brand, dietary; Sainsbury's filters across the top           |
| S17 | Baymard, Ocado filtering example: https://baymard.com/ecommerce-design-examples/filtering-options/7557-ocado                  | Grocery sidebar filter example                                              |
| S18 | Baymard, Walmart search results and mobile filtering: https://baymard.com/ecommerce-design-examples/filtering-options/17788-walmart | Mobile filter overlay, sticky Filters button                          |
| S19 | Baymard, Kroger product list (desktop and mobile): https://baymard.com/ecommerce-design-examples/37-product-list-category/15979-kroger | Grocery product list with add-to-cart in the list                   |
| S20 | Pratt IxD critiques of Instacart: https://ixd.prattsi.org/2023/09/design-critique-instacart-ios-app/ and https://ixd.prattsi.org/2024/09/design-critique-instacart-mobile-app/ | "+" on tiles, cart count always visible, aisles mapped to store sections |
| S21 | Instacart storefront item tile docs: https://docs.instacart.com/storefront/learn_about_your_storefront/shopping/catalog/item_tile | Tile anatomy: image, price, add button; image opens details           |
| S22 | eBay Playbook, Filtering patterns: https://playbook.ebay.com/design-system/patterns/filtering-patterns                        | Filter trigger with count badge; fixed Clear and Apply in the sheet         |
| S23 | GroceryList Jamaica coverage: https://caribbeantoday.com/sections/food/grocerylist-connecting-the-diaspora-with-shopping-in-jamaica and App Store listing https://apps.apple.com/app/id1632973482 | The main competitor: 150 stores, 14 parishes, rated 2.7 of 5 |

Stores whose listing patterns are summarised from the sources above and from the shared
conventions of big grocery sites: Walmart Grocery (S18), Kroger (S19), Instacart (S20, S21),
Tesco, Sainsbury's and Ocado (S15, S16, S17), Amazon and eBay (S12, S22).

### 1.3 What big grocery listings do, and what we take

| Pattern                         | What the big sites do                                                                                                   | Our call                                                                                                                                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header and search               | Global search in the header; listing pages add filters, not a second big search bar                                     | **Adopt.** Header search stays global (`/search`). The listing has a small, labelled "Find in Groceries" field that filters this list only (§4 R4). No second big bar.                                    |
| Department navigation           | A department row or tree; Instacart maps aisles to real store sections (S20)                                             | **Adopt, our way.** A crimson department band with tabs (R1). Aisles under the department in the sidebar (R4).                                                                                              |
| Filter placement (desktop)      | Left sidebar. Baymard's 2024 guidance favours a sidebar over a horizontal toolbar unless there are very few filter types (S5, S6) | **Adopt** the sidebar. We have 4 to 5 filter groups today and will grow (aisles), so a sidebar scales; a toolbar would not.                                                                       |
| Filter order                    | Most general first (S13): category, then sub-category, then price, then attributes                                       | **Adopt:** Find in list, Department, Aisle, Price, Availability.                                                                                                                                             |
| Apply behaviour                 | Desktop: instant. Mobile: batch choices, then a "Show N results" button (S4, S8, S11, S13)                              | **Adopt both.** Desktop applies on change. Phone sheet batches and shows a live count in the button.                                                                                                        |
| Mobile filter pattern           | Sticky "Filters" button with a count badge opens an overlay or bottom sheet (S12, S18, S22)                             | **Adopt:** sticky toolbar with "Filters (2)" and Sort; bottom sheet built on the existing native `<dialog>`.                                                                                                |
| Applied filters                 | Removable chips above results, plus "Clear all" (S7)                                                                    | **Adopt.** Chips are links, so they work without JavaScript.                                                                                                                                                 |
| Facet counts                    | Option counts next to each value                                                                                        | **Adopt.** Counts are computed from real data; options with 0 are shown disabled (unless checked) so the list does not jump.                                                                               |
| Card anatomy                    | Photo, **price first**, name, size, unit price, Add (S19, S21)                                                         | **Adopt** price above name (the grocery convention: people scan price, then name). USD with J$ under it (our edge).                                                                                         |
| Unit price                      | UK grocers show it on every tile (S15); Baymard: 86% of sites miss it (S3)                                             | **Adopt, honestly.** Computed only when `size` parses cleanly (§5.4); otherwise omitted. Never guessed.                                                                                                      |
| Add button                      | Turns into a quantity stepper once added (S2); Instacart "+" (S20)                                                     | **Adopt.** Outline "Add" becomes a solid crimson stepper showing how many are in the basket. Red then marks what is already in your basket.                                                                  |
| Badges                          | Deals, "new", brand badges, dietary icons                                                                               | **Reject** all of these: no such data. Only "Out of stock". (Why we also reject "In a basket": §2.4.)                                                                                                       |
| Brand, rating, dietary filters  | Common on Tesco, Ocado (S16)                                                                                            | **Reject.** We have no brand, rating or dietary data and never fake it.                                                                                                                                     |
| Sort                            | Relevance or "favourites" default (S15), price, name; some sort by unit price                                           | **Adopt** our four. **Rename** the default from "Popular first" to "Our picks first": we do not track popularity, the sort is the team's `featured` flag. Unit-price sort rejected while many items have no unit price. |
| Grid density                    | 2 columns on phones, 3 to 5 on desktop with a sidebar                                                                   | **Adopt** 2 / 3 / 3 + sidebar / 4 + sidebar (§3.2).                                                                                                                                                        |
| Paging                          | Baymard: "Load more" beats pagination; show 10 to 30, then load more (S9, S10)                                          | **Adopt** "Show 24 more" (a real link to `?page=2`, so it is shareable and works without JS). Pagination numbers removed.                                                                                    |
| In-grid promo tiles             | Supermarkets drop offer tiles into the grid                                                                             | **Adopt once, honestly:** one ready-made-basket tile, only on an unfiltered first batch, with real basket data. No ads.                                                                                     |
| Sticky elements                 | Header, plus a sticky filter/sort bar on mobile; sticky sidebar on desktop                                              | **Adopt.** Phone/tablet toolbar sticks under the header; the desktop sidebar sticks with its own scroll.                                                                                                     |
| Empty states                    | "No results" with suggestions                                                                                           | **Adopt** with the active chips, "Clear all", "Search the whole shop" and "Request an item".                                                                                                                 |
| Infinite scroll, carousels, hover-only quick view | Common                                                                                                | **Reject.** Infinite scroll breaks the footer and Back; carousels hide products; hover-only actions fail on touch.                                                                                          |

### 1.4 ui-ux-pro-max output, and what was rejected

`--design-system "grocery ecommerce product listing marketplace" --density 8` returned the
"Marketplace / Directory" pattern, Flat Design, Rubik/Nunito Sans, a blue/green palette and
"Avoid: no trust cues, text-heavy pages, hidden filters".

- **Kept:** flat design (no gradients, no shadows on cards), simple colour hovers at 150 to
  250ms, dense spacing, filters visible (not hidden behind a menu on desktop), trust cues kept
  short.
- **Rejected:** the blue/green palette (brand is crimson/oxblood), Rubik/Nunito (Figtree only),
  the "Hero search bar" marketplace section order (the owner wants products first, not a hero),
  and the "Data-dense dashboard" style's 12px text (our smallest text is `text-xs` for pills
  and counts only).
- `ux` searches applied: chip collections wrap (never a clipped single row), one atomic live
  message per event ("3 items in your basket", not many competing live regions), focus not
  obscured by sticky UI (scroll padding), reserve space for async content (no layout shift),
  visible focus on every control including the sheet.
- `nextjs` stack: static shell with Suspense holes (Partial Prerendering under Cache
  Components), stream the slow part.

---

## 2. Concept

### 2.1 The page's job

Get a sender from "they need rice and diapers" to both in the basket in the fewest taps, with
the price in USD and J$ and the same-day cut-off in sight, on a phone.

### 2.2 Audience

| Who                          | Arrives from                                   | Wants                                                                       | What the page gives them                                                       |
| ---------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Sender abroad on a phone     | Home "Start shopping", header Shop, a WhatsApp link from family | See products now, add a few, check out before the cut-off              | Products in the first screen, one-tap Add, cut-off line under the band         |
| Monthly supporter            | Bookmark of `/shop/groceries?aisle=…`          | The same items as last month, fast                                          | Shareable URLs for every filter, steppers that show what is already in the basket |
| Occasion sender              | Home baskets, Christmas                        | A ready-made basket instead of picking                                      | One basket tile in the grid, linking to the basket                             |
| Family member in Jamaica     | A link from the sender                         | To point at what they need                                                  | J$ under every price, plain names, shareable filtered links                    |

Mostly phones, in the evening their time, often on mobile data.

### 2.3 The ONE bold element: the department band with aisle tabs

A solid **crimson** band, full-bleed, about 170px tall, directly under the light header. It
holds the page title in heavy white type with the real item count, and a row of **folder
tabs**, one per department. The current department's tab is cut out of the band in the colour
of the strip below it, so the band visibly opens into "this aisle" of the store. Inactive tabs
are white text on crimson, turning `crimson-deep` on hover.

Why this and nothing else:

- It gives the light header a hard, unmistakable edge (owner update 1).
- Red stands out as one large solid block, the brand rule, without a hero, a photo or a
  second column (owner update 2).
- It is the store's signage: you are standing in Groceries. Everything under it is quiet:
  white cards on the neutral page, crimson only for actions, selection and what is in your
  basket.

### 2.4 Decisions that are ours to make

- **Price first on the card**, then name. Grocery convention (S19, S21); people scan price.
- **"In a basket" badge: rejected.** On a page where the stepper shows "2 in your basket", a
  badge saying "In a basket" (meaning "part of a ready-made basket") will be read as "in your
  basket". It would confuse exactly the people we most need to trust us. The ready-made
  baskets get their own tile instead.
- **"In a ready-made basket" filter: rejected for now.** 15 of 22 products are in a basket,
  so it barely narrows anything. Revisit when the catalogue has hundreds of items (open
  question 2).
- **"Popular first" renamed "Our picks first"**: we do not track popularity, so "popular"
  would be an invented claim.
- **Out-of-stock items go last in every sort**, not only the default: a sender cannot buy them.
- **Department is the route, not a filter param.** `/shop/groceries` is the department; there
  is no `dept=` param. One source of truth, the old URLs keep working, and SEO stays on the
  department path.

### 2.5 How this beats grocerylistjamaica.com's listing

GroceryList Jamaica sells from about 150 stores across 14 parishes (S23); its App Store rating
is 2.7 of 5. We do not name them on the site and never compare prices.

| Their listing (as reported)                       | Ours                                                                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Store first, then products; many stores to pick   | One shop, products in the first screen, departments as tabs                                                |
| Prices in one currency                            | USD on every card with J$ underneath, at the admin-set rate                                                 |
| Timing and proof explained elsewhere              | Same-day cut-off with a live countdown and "a photo of the till receipt with every order" right under the band |
| Add, then check the cart                          | Add becomes a stepper on the card showing how many are already in the basket                               |
| Filters lists                                     | Aisles, price, stock and "find in this list", all in the URL so family can share a link                    |

---

## 3. Structure blueprint (read this first)

Legend: `▓` red (crimson / oxblood), `░` neutral (`page` / `surface`), `▒` photos. "wide" =
content capped at `max-w-wide` (1280px) with `gutter` sides. Heights are approximate.

### 3.1 Whole-page skeleton

```
1440 × ~1,900px for 22 items (header and footer excluded)

┌──────────────────────── light sticky header (not ours), --header-height = 72px ─────────────┐
├▓▓ R1 DEPARTMENT BAND  full-bleed crimson, content wide, single column ~170px ▓▓▓▓▓▓▓▓▓▓▓▓▓▓┤
│▓  Shop / Groceries                                                                          ▓│
│▓  Groceries  9 items                                                                        ▓│
│▓  [All]  [▒Groceries▒]  [Household]  [Pharmacy]  [Baby & Child]   ← tabs; active cut out    ▓│
├░░ R2 EDGE STRIP  surface, border-b line, wide, one row ~48px ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░┤
│  (clock) Same-day … by 1:00 PM …   (receipt) A photo of the till receipt …  (check) Prices… │
├░░ R3 LISTING  page bg, wide, two columns: sidebar 256 | grid ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░┤
│ R4 SIDEBAR (sticky)  │ R5 TOOLBAR  9 items                         Sort by [Our picks ▾]   │
│ Find in Groceries    │ R6 CHIPS    [Baking ×] [Under USD$10 ×]  Clear all                  │
│ [___________][Q]     │ R7 GRID  4 columns × n rows                                          │
│ Department           │ ┌────┐┌────┐┌────┐┌────┐                                            │
│  All items      22   │ │card││card││card││card│                                            │
│ ▌Groceries       9   │ └────┘└────┘└────┘└────┘                                            │
│  Household       5   │ ┌────┐┌────┐┌────┐┌▓▓▓▓┐ ← R8 BASKET TILE (8th cell, oxblood)       │
│  …                   │ │card││card││card││tile│                                            │
│ Aisle                │ └────┘└────┘└────┘└▓▓▓▓┘                                            │
│  [ ] Rice & grains 1 │ ┌────┐                                                              │
│  [x] Baking        2 │ │card│                                                              │
│ Price  ( ) …         │ └────┘                                                              │
│ Availability [ ] …   │ R9 LOAD MORE  (only when more than 24 match)                        │
│                      │ R10 HELP ROW  Can't find something? Request an item.                │
└──────────────────────┴──────────────────────────────────────────────────────────────────────┘
```

```
375 × ~3,300px for 22 items

┌── light sticky header, 64px ───┐
├▓ R1 BAND ~150px ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┤
│▓ Shop / Groceries              ▓│
│▓ Groceries  9 items            ▓│
│▓ [All][▒Groceries▒][Househ… →  ▓│  ← tab rail scrolls sideways inside the band
├░ R2 STRIP ~64px ░░░░░░░░░░░░░░░░┤  cut-off line only
├░ R4a FIND FIELD ~68px ░░░░░░░░░░┤  "Find in Groceries"
├░ R5 TOOLBAR sticky ~60px ░░░░░░░┤  [Filters 2] [Sort ▾]   ← sticks under the header
├░ count + R6 chips ░░░░░░░░░░░░░░┤  9 items · chips wrap
├░ R7 GRID 2 columns ░░░░░░░░░░░░░┤
│ ┌─────┐┌─────┐                  │
│ │card ││card │  ×3 rows         │
│ └─────┘└─────┘                  │
│ ┌─────┐┌▓▓▓▓▓┐ ← basket tile     │
│ │card ││tile │   (8th cell)     │
│ └─────┘└▓▓▓▓▓┘                  │
│ …                               │
├░ R9 LOAD MORE (when > 24) ░░░░░░┤
├░ R10 HELP ROW ░░░░░░░░░░░░░░░░░░┤
└─────────────────────────────────┘
R11 FILTER SHEET: native <dialog>, bottom sheet, opened by "Filters".
```

768 and 1024 in one line each:

- **768:** like 375, but the find field, Filters and Sort sit in one sticky toolbar row; the
  grid has 3 columns; the strip shows two items.
- **1024:** like 1440, but the sidebar is 240px and the grid has 3 columns; the strip wraps to
  two lines if needed.

### 3.2 Grid density and card size

| Width               | Sidebar | Grid columns | Gap (x / y) | Approx. card width | Cards in the first screen (header + band + strip + toolbar) |
| ------------------- | ------- | ------------ | ----------- | ------------------ | ------------------------------------------------------------ |
| 375                 | none    | 2            | 12 / 12     | 165px              | 2 full + tops of 2 more (cards start at ~400px of 812)       |
| 768                 | none    | 3            | 16 / 16     | 224px              | 3 full + tops of 3 more (cards start at ~360px of 1024)      |
| 1024                | 240px   | 3            | 16 / 24     | 218px              | 3 full (cards start at ~330px of 768)                        |
| 1280 to 1440        | 256px   | 4            | 16 / 24     | 220px              | 4 full + tops of 4 more (cards start at ~330px of 900)       |

- `PAGE_SIZE = 24` (divides by 2, 3 and 4, so full rows). With 22 products everything shows
  at once and no "load more" appears. With hundreds, 24 show, then "Show 24 more".
- **Why 22 items will not look empty:** 4 columns of 220px cards on a 1216px row fill the
  width; 6 rows plus the basket tile fill about 2.5 screens. Cards are product-sized, not
  giant marketing tiles. No department has fewer than 4 items today; a department with fewer
  items than columns simply shows a short row, left-aligned (the grid never stretches cards).

### 3.3 Region by region

Every region below: pattern, background, container, columns at 375 / 768 / 1024 / 1440, inner
blocks with counts, and why.

**R1 Department band** (`DepartmentBand`)

- Pattern: single-column title band with a folder-tab rail at its bottom edge. Not a hero: no
  photo, no lead paragraph, no second column, no call-to-action button.
- Background: solid `crimson`, full-bleed. Focus ring blush (`on-dark-focus`).
- Container: content `max-w-wide`, `gutter`. Height ~150px (375) to ~170px (1440).
- Columns: one at every width.
- Blocks: breadcrumb (department pages only, 2 links), title row (h1 + item count), tab rail
  (1 "All" tab + 1 per department = 5 today).
- Why: hard edge under the light header; red as one large block; the tabs are the store's aisle
  signs. A sender switches department in one tap without opening a menu.

**R2 Edge strip** (`EdgeStrip`)

- Pattern: one-row inline strip of short facts with icons (a "four-up strip" collapsed into a
  single line).
- Background: `surface`, `border-b border-line`. The active tab in R1 is `surface` too, so the
  tab opens into this strip.
- Container: `max-w-wide`, `gutter`, `py-3`.
- Columns: 375 = 1 item (cut-off); 768 = 2 items (cut-off, receipt); 1024 / 1440 = 4 items in
  one wrapping row.
- Blocks: cut-off note (live countdown), receipt proof, pay in USD, prices checked date.
- Why: our edge (same-day, proof, USD) stays visible but costs one line, not a band.

**R3 Listing frame** (`ShopListing` → `ListingResults`)

- Pattern: split two-column (sidebar + grid) from 1024; single column below.
- Background: `page`.
- Container: `max-w-wide`, `gutter`, `pt-6 pb-16` (375) / `pt-8 pb-20` (1024+).
- Columns: 375 / 768 = one; 1024 = `grid-cols-[15rem_1fr]` (240px), gap 32px; 1440 =
  `grid-cols-[16rem_1fr]` (256px), gap 32px.
- Blocks: R4 sidebar, then a results column holding R5, R6, R7, R9, R10.
- Why: the sidebar keeps every filter visible while you browse (S5, S6).

**R4 Filter sidebar** (`FilterPanel` inside `<aside>`)

- Pattern: vertical stack of filter groups, sticky with its own scroll.
- Background: none (sits on `page`); groups divided by `border-t border-line`.
- Container: 240 / 256px column.
- Columns: hidden below 1024 (lives in R11 instead; without JavaScript it shows in-flow, §4
  R11). Visible 1024 / 1440.
- Blocks, in order: find field (1), Department (1 link per department + "All items"), Aisle
  (1 checkbox per aisle with items; hidden on `/shop` and when no aisle has items), Price (4
  radios), Availability (1 checkbox). No-JS "Apply filters" button at the end.
- Why: most general first (S13); department as links because it is navigation; aisles as
  checkboxes because people pick several ("rice and canned goods").

**R4a Find field (375 / 768)**

- Pattern: one full-width field above the sticky toolbar (375) or inside it (768).
- Background: `page`.
- Why: on phones the header's search row is hidden on listing routes (header contract, §9 Q1),
  so this is the only search box on the page.

**R5 Toolbar** (`ListingToolbar`)

- Pattern: 375 / 768: sticky bar under the header; 1024 / 1440: a plain row at the top of the
  results column.
- Background: 375 / 768 `surface` with `border-b border-line`, full-bleed, plus `shadow-lift`
  only while stuck; 1024+ none.
- Columns: 375 = [Filters button 1fr] [Sort select 1fr]; 768 = [find field 1fr] [Filters
  auto] [Sort 13rem]; 1024 / 1440 = [count, left] [Sort by + select, right].
- Blocks: Filters button with count badge (below 1024), sort select, result count (1024+ in
  the bar; below 1024 in the row under it).
- Why: sort and filters stay one tap away while scrolling a long grid (S18, S22).

**R6 Active filters** (`ActiveFilters`)

- Pattern: wrapping chip row (never one clipped row).
- Background: none.
- Columns: wraps at every width; below 1024 it shares a row with the count.
- Blocks: one chip per active value (find text, each aisle, price band, in stock) + "Clear
  all" link when 2 or more chips. Hidden when no filter is active.
- Why: an overview of what is applied, each removable in one tap (S7).

**R7 Product grid** (`ProductGrid` new listing version, `ProductTile`)

- Pattern: uniform card grid.
- Background: cards `surface` with `border-line` on `page`.
- Columns: 2 / 3 / 3 / 4 (§3.2).
- Blocks: up to 24 product tiles per batch (photo or placeholder 1:1, price block, aisle or
  department label, name, size, unit price, basket control) + at most 1 basket tile.
- Why: products are the hero; one card type, equal heights, control pinned to the bottom so
  rows line up.

**R8 Basket tile** (`BasketShortcutTile`)

- Pattern: one grid cell styled as a solid `oxblood` card.
- Shown only on the first batch with no filters other than the department, inserted as the
  8th cell (or last, when there are fewer than 8 products).
- Blocks: photo 1:1 (or icon block), eyebrow, basket name, "7 items for USD$69", link label.
- Why: the "ready-made basket" shortcut without a corporate band, and the only other red block
  on the page.

**R9 Load more** (`LoadMore`)

- Pattern: centred progress line + one outline button. Only when more items match than are
  shown.
- Blocks: "Showing 24 of 120 items", a 4px progress track, "Show 24 more" button.
- Why: "Load more" makes people browse more than pagination (S9, S10); it is a real link, so
  shareable and no-JS safe.

**R10 Help row** (`ListingHelpRow`)

- Pattern: one bordered row, two short columns at 768+ (stacked on 375). No band.
- Background: `surface`, `border border-line rounded-lg`.
- Blocks: "Can't find something?" + request link; "How we shop" one line + link to
  `/how-it-works`.
- Why: a quiet exit for missing items; proof restated once on phones (where the strip only
  shows the cut-off).

**R11 Phone filter sheet** (`FilterSheet`)

- Pattern: bottom sheet on the existing `Dialog` (`variant="sheet"`), below 1024 only.
- Background: `surface`; backdrop `scrim`.
- Blocks: header ("Filters" + close), body (Department, Aisle, Price, Availability groups;
  the same `FilterFields` as R4), footer ("Clear all" + "Show 9 items").
- Why: filters on the same screen as results, deliberate apply with a live count (S4, S8, S11,
  S12).

**Empty state** (`ListingEmpty`), replaces R7 to R9 when nothing matches. Centred block in the
results column. Detail in §4.

**Loading skeleton** (`ListingSkeleton`), the Suspense fallback for R3: sidebar bars at
1024+, toolbar bar, 8 card skeletons of the real card size. Detail in §4.

---

## 4. Region detail

Token classes are the project's roles and utilities. Every class here exists today unless
listed in §4.13 (new utilities).

### 4.1 R1 Department band

**Copy and data**

| Route                 | Breadcrumb                  | h1                        | Count (static)                       |
| --------------------- | --------------------------- | ------------------------- | ------------------------------------ |
| `/shop`               | none                        | `Everything in the shop`  | `22 items` (sum of department counts) |
| `/shop/groceries`     | `Shop` / `Groceries`        | `Groceries`               | `9 items` (`getCategories()` count)  |

Count text: `{n} item` / `{n} items`. Tabs: `All`, then each category name in `sort` order
(`Groceries`, `Household`, `Pharmacy`, `Baby & Child`). Tab icons: `CategoryIcon` for
departments, `LayoutGrid` for All.

The band is static (cached loaders only). Tabs are plain links to `/shop` and
`/shop/{slug}`; they do not carry the current filters (they are prerendered; the sidebar's
department links do carry them, §4.4).

**Wireframes**

```
1440 (content 1216 wide)
┌▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┐
│ pt-8                                                                           │
│ Shop  /  Groceries                                text-small on-crimson-muted   │
│ Groceries   9 items                               h1 text-on-dark + blush count │
│ mt-6                                                                           │
│ ┌──────┐ ┌░░░░░░░░░░░░┐ ┌───────────┐ ┌──────────┐ ┌──────────────┐            │
│ │▦ All │ │🌾 Groceries │ │ Household │ │ Pharmacy │ │ Baby & Child │  h-12 tabs  │
└─┴──────┴─┴░░░░░░░░░░░░┴─┴───────────┴─┴──────────┴─┴──────────────┴────────────┘
             ↑ active tab: bg-surface, text-crimson, joins the strip below

375
┌▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┐
│ pt-5                               │
│ Shop / Groceries                   │
│ Groceries  9 items                 │  h1 33px; count wraps under on narrow names
│ mt-4                               │
│ ┌─────┐┌░░░░░░░░░░┐┌──────────┐┌── │  rail scrolls sideways; the cut-off last tab
│ │ All ││Groceries ││Household ││Ph │  signals more
└─┴─────┴┴░░░░░░░░░░┴┴──────────┴┴── ┘
```

**Classes**

- `<section aria-labelledby="listing-title" class="bg-crimson text-on-dark on-dark-focus">`
- Inner: `mx-auto max-w-wide gutter pt-5 md:pt-8`.
- Breadcrumb: reuse `src/components/shop/breadcrumb.tsx` if it supports an on-dark tone;
  otherwise the current category page markup: `<nav aria-label="Breadcrumb"
  class="text-small">`, links `text-on-crimson-muted hover:text-on-dark hover:underline
  underline-offset-2`, current `font-semibold text-on-dark aria-current="page"`, separator
  `ChevronRight size-icon-sm` `aria-hidden`.
- Title row: `mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1`. h1
  `id="listing-title" class="text-h1 text-balance"`. Count `text-small font-semibold
  text-blush tabular-nums` (blush on crimson 4.9:1, passes AA).
- Tab rail: `<nav aria-label="Departments" class="mt-4 md:mt-6 -mx-[gutter]">` →
  `<ul class="flex gap-1 overflow-x-auto px-[gutter] [scrollbar-width:none]">`. (Use the
  gutter values through a wrapper with `gutter` and negative margins, or put the rail in its
  own `gutter` container; the dev picks one, the result must align the first tab with the h1.)
- Tab link: `flex h-12 shrink-0 items-center gap-2 rounded-t-lg px-4 text-small font-semibold
  whitespace-nowrap transition-colors duration-150`. Icon `size-icon`.
  - Inactive: `text-on-dark hover:bg-crimson-deep`.
  - Active (`aria-current="page"`): `bg-surface text-crimson font-bold` and the icon
    `text-crimson`.
  - Focus: global ring, blush inside `on-dark-focus`; `focus-visible:outline-offset-[-3px]` so
    the ring is not clipped by the rail's overflow.
- When the active tab is off-screen in the rail at 375 (for example Baby & Child), a 10-line
  client component `TabRailScroller` scrolls it into view once on mount
  (`el.scrollIntoView({ inline: 'nearest', block: 'nearest' })`, instant, no animation). Tab
  order always stays the category order. Without JS the rail still scrolls by hand.

**States:** hover (inactive) `bg-crimson-deep`; pressed `active:translate-y-px` is not used on
tabs (navigation, not buttons); current tab never hovers. No disabled state. No loading state
(static).

**Motion:** none on load (the listing must feel instant). Colour transitions 150ms; reduced
motion makes them instant (global rule).

**Accessibility:** one h1. The tab rail is a `nav` of links with `aria-current="page"`, not an
ARIA tablist (these are page links, not panels). Tabs are 48px tall. Contrast: white on
crimson 7.2:1; crimson on surface 7.2:1.

### 4.2 R2 Edge strip

**Copy and data**

| Item                | Icon        | Text                                                                                                              | Source                                   | Shown        |
| ------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------ |
| Cut-off             | (CutoffNote's Clock) | `Same-day delivery when you order by 1:00 PM Jamaica time.` + live countdown                              | `earliestCutoff(getActiveZones())`       | all widths (hidden if no active zone) |
| Proof               | `Receipt`   | `A photo of the till receipt with every order`                                                                    | fixed copy                               | 768+         |
| USD                 | `DollarSign`| `Pay in US dollars. J$ shown for your family.`                                                                    | fixed copy                               | 1024+        |
| Price check         | `CalendarCheck` | `Prices checked in store on October 20, 2026.`                                                                | `priceCheckLine(priceCheckRange(products in scope))` | 1024+, only when a date exists |

**Wireframe (1440)**

```
┌░ surface ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░┐
│ ⏱ Same-day delivery when you order by 1:00 PM Jamaica time. That's 2:00 PM where │
│   you are, 3 hours from now.   ▣ A photo of the till receipt…   $ Pay in US…  ✓ … │
└──────────────────────────────────────────── border-b line ──────────────────────────┘
```

**Classes:** `<div class="border-b border-line bg-surface">` → `mx-auto max-w-wide gutter
flex flex-wrap items-start gap-x-8 gap-y-2 py-3`. Items `flex items-start gap-2 text-small
text-ink-body`; icons `mt-0.5 size-icon shrink-0 text-crimson`. Use `CutoffNote` with
`tone="light"`. Proof `hidden md:flex`; USD and price check `hidden lg:flex`.

**Component:** `EdgeStrip` server; props `{ cutoff: string | null; priceCheck: string | null }`.
`CutoffCountdown` (existing client child) appends local time after mount.

**States:** none interactive. If no active zone, the cut-off item is omitted; if the strip has
no item at the current width it renders nothing (no empty bar).

**Accessibility:** plain text; icons `aria-hidden`. The countdown is `aria-live="off"`
(existing).

### 4.3 R3 Listing frame

```
<div data-listing class="mx-auto max-w-wide gutter pt-6 pb-16 lg:pt-8 lg:pb-20
            lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[16rem_minmax(0,1fr)]">
  <aside id="filters" …>R4</aside>
  <div class="min-w-0">R4a, R5, R6, R7/empty, R9, R10</div>
</div>
```

`data-listing` drives the scroll-padding rule (§4.13). The results column is `<section
aria-labelledby="results-heading">` with a visually hidden `h2 id="results-heading"`:
`Products in Groceries` / `All products`.

### 4.4 R4 Filter sidebar (desktop) and the shared filter fields

The fields are one server component, `FilterFields`, rendered twice: in the sidebar
(`idPrefix="side"`) and inside the phone sheet (`idPrefix="sheet"`). Only one copy is ever
visible (the other is `display: none` or inside a closed dialog), so screen readers never meet
both.

**Group order and copy**

| #   | Group        | Control                                   | Options and copy                                                                                         | Param       | Shown when                                    |
| --- | ------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------- |
| 1   | Find         | text input + submit icon button           | Label `Find in Groceries` / `Find in the shop`; placeholder `Rice, oats, bleach…`; button label `Find`    | `q`         | sidebar only (phones: R4a)                    |
| 2   | Department   | list of links (not inputs)                | `All items`, then each department with its count                                                         | path        | always                                        |
| 3   | Aisle        | checkboxes                                 | Each aisle in `sort` order with its facet count                                                          | `aisle` (repeated) | department routes, when at least one aisle in scope has a listed product |
| 4   | Price        | radios                                     | `Any price`, `Under USD$10`, `USD$10 to USD$25`, `Over USD$25` with counts (none on Any)                 | `price`     | always                                        |
| 5   | Availability | one checkbox                               | `In stock only` with count                                                                               | `stock=1`   | when at least one product in scope is out of stock |

Rule for 5: **hide the Availability group when no product in scope is out of stock** (an
option that cannot change anything is noise). Today Groceries has one out-of-stock item, so
it shows there and on `/shop`; it is hidden on Household, Pharmacy and Baby & Child.

Department links carry the current `q`, `price`, `stock` and `sort` (not `aisle`, not
`page`), built with `shopHref` (§5.2). Counts on department links are the static department
totals (they describe the department, not the filtered list).

When an aisle group has more than 8 options, show the first 8 and put the rest in a
`<details>` with summary `Show all {n} aisles` (`text-small font-semibold text-crimson`), open
by default if any hidden aisle is checked. Works without JS.

**Facet counts:** for each option, the number of products that would match if that option
were chosen, with every **other** active filter applied (disjunctive counts, §5.2
`facetCounts`). Options with 0 are `disabled` and `text-ink-muted` unless already checked.

**Wireframe (1440, 256px column)**

```
┌──────────────────────────────┐
│ Find in Groceries            │ text-small font-semibold ink
│ ┌────────────────────┬─────┐ │
│ │ ⌕ Rice, oats, ble… │  ⌕  │ │ 44px field, 44px crimson button
│ └────────────────────┴─────┘ │
│──────────────────────────────│ border-t line, pt-5 mt-5
│ Department                   │ text-small font-bold ink (h3)
│   All items              22  │ 36px rows from 1024
│ ▌ Groceries               9  │ selected: surface-selected + 3px crimson bar
│   Household               5  │
│   Pharmacy                4  │
│   Baby & Child            4  │
│──────────────────────────────│
│ Aisle                        │ legend
│ ☐ Rice & grains           1  │
│ ☑ Baking                  2  │ checked: crimson box (accent)
│ ☐ Cooking oils            1  │
│ ☐ Canned goods            2  │
│ ☐ Breakfast & drinks      3  │
│──────────────────────────────│
│ Price                        │
│ ◉ Any price                  │
│ ○ Under USD$10            5  │
│ ○ USD$10 to USD$25        4  │
│ ○ Over USD$25             0  │ disabled, muted
│──────────────────────────────│
│ Availability                 │
│ ☐ In stock only           8  │
│                              │
│ [ Apply filters ]            │ only without JavaScript
└──────────────────────────────┘
```

**Classes**

- `<aside id="filters" aria-label="Filters" class="hidden target:block lg:block">`. Inner
  wrapper: `lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]
  lg:max-h-[calc(100dvh-var(--header-height)-3rem)] lg:overflow-y-auto lg:pr-2
  lg:[scrollbar-gutter:stable]`. Below 1024, when shown by `:target` (no JS), it is an in-flow
  panel: `rounded-lg border border-line bg-surface p-card mb-6` (applied with
  `max-lg:` variants).
- Group: `flex flex-col gap-1 border-t border-line pt-5 mt-5 first:border-t-0 first:pt-0
  first:mt-0`.
- Group heading: `<h3 class="text-small font-bold text-ink mb-1">` for Department; for input
  groups a `<fieldset>` with `<legend class="text-small font-bold text-ink mb-1">`.
- Department link row: `flex min-h-control lg:min-h-9 items-center justify-between gap-3
  rounded-md px-3 text-small text-ink-body transition-colors duration-150
  hover:bg-surface-muted`. Count `text-xs text-ink-muted tabular-nums`.
  - Current (`aria-current="page"`): `bg-surface-selected font-bold text-crimson-deep
    shadow-[inset_3px_0_0_var(--color-crimson)]`. (An inset box-shadow used as a flat 3px bar,
    not a shadow effect; if the reviewer prefers, use `border-l-3 border-crimson` with `pl-[9px]`.)
- Checkbox / radio row: `<label class="flex min-h-control lg:min-h-9 cursor-pointer
  items-center gap-3 rounded-md px-3 text-small text-ink-body hover:bg-surface-muted
  has-checked:font-semibold has-checked:text-ink has-disabled:cursor-default
  has-disabled:text-ink-muted has-disabled:hover:bg-transparent
  has-focus-visible:outline-3 has-focus-visible:outline-offset-1
  has-focus-visible:outline-signal">`. Input `size-5 shrink-0 accent-crimson
  focus-visible:outline-none`. Label text `flex-1`. Count `text-xs text-ink-muted
  tabular-nums`.
- 44px rows on touch widths, 36px from 1024 (the footer's existing precedent: "44px tall on
  touch, 36px from 1024px"). Touch tablets in landscape ≥1024 get 36px rows; WCAG 2.2 AA
  target size (24px) is still met.
- Find field: reuse the visual of `SearchBox` (light tone) at `min-h-control` with a 44px
  square submit button (`Search` icon, sr-only "Find"). New small component `FindInList`
  (server): `<form method="get" action={basePath} role="search">` with hidden inputs for the
  other active params (aisles, price, stock, sort), `<label for="{prefix}-q">` **visible**
  (above the input, `text-small font-semibold text-ink`), input `name="q" maxLength={80}
  enterKeyHint="search"`. Not the header's `SearchBox` (that one posts to `/search`).
- No-JS apply button: `<Button type="submit" variant="secondary" block
  class="mt-6 group-data-[enhanced]/filters:hidden">Apply filters</Button>`. The form has
  `class="group/filters"`; `FilterForm` sets `data-enhanced` after mount.

**Component tree**

```
<aside id="filters">                                 server
  <FindInList basePath query idPrefix="side" />     server (plain GET form)
  <FilterForm basePath query>                       client wrapper: instant apply
    <FilterFields idPrefix="side" … />              server children (departments, fieldsets)
    <Button>Apply filters</Button>                  hidden once enhanced
  </FilterForm>
</aside>
```

`FilterFields` props: `{ idPrefix: 'side' | 'sheet'; scope: Scope; departments: { slug; name;
count }[]; aisles: { slug; name; count }[]; query: ShopQuery; facets: Facets; hasOutOfStock:
boolean; departmentHref: (slug | null) => string }` (pass hrefs precomputed as strings; no
functions cross into client components).

`FilterForm` (client) props: `{ action: string; children: ReactNode; className?: string }`.
Renders `<form method="get" action={action} data-enhanced={mounted || undefined}
onChange={…} onSubmit={…} key={queryString}>`.

- `onChange` (desktop instant apply): build `URLSearchParams` from `new FormData(form)`,
  drop defaults (`price=any`, empty `q`), keep `sort`, drop `page`, then
  `listing.navigate(action + '?' + params)` (§4.12). Text inputs do not trigger on change;
  only checkboxes and radios (`e.target.type`).
- `onSubmit`: `preventDefault`, same navigation.
- `key={queryString}`: the form remounts when the URL changes (for example after a chip is
  removed), so unchecked state always matches the URL. Needed because Cache Components keeps
  pages alive in React `<Activity>` and preserves DOM state across navigations.

**States**

| State                  | Look                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| Hover row              | `bg-surface-muted`                                                                            |
| Checked                | crimson checkbox/radio (`accent-crimson`), label `font-semibold text-ink`                     |
| Focus                  | 3px `signal` outline around the whole row (`has-focus-visible`)                               |
| Disabled (count 0)     | `text-ink-muted`, native disabled input, no hover                                             |
| Current department     | `bg-surface-selected text-crimson-deep font-bold` + 3px crimson bar                           |
| Pending (after change) | inputs stay enabled; the results column dims (§4.12); `aria-busy` on the results region       |

**Motion:** colour transitions 150ms only.

**Accessibility:** each input group is a `fieldset` + `legend`; departments are a `nav
aria-label="Departments in the shop"` with a list of links. Instant apply moves no focus;
the result count is announced by the page announcer (§4.12): "9 items". Keyboard: Tab through
rows, Space toggles a checkbox, arrows move within a radio group (native). The sidebar's own
scroll keeps focused rows visible (browser default).

### 4.5 R4a Find field on phones and tablets

- 375: `FindInList idPrefix="top"` in its own row, `mb-3`, full width. The label `Find in
  Groceries` sits visibly above the field (`text-small font-semibold text-ink`). Field 44px.
  Row height ~72px.
- 768: the same field moves into the sticky toolbar (R5) as its first column with an
  `sr-only` label **plus** a visible placeholder `Find in Groceries`. Exception justified: the
  toolbar has room for one line only, and the same pattern is used by the header search today
  (`SearchBox` has an sr-only label). The button carries the visible `Search` icon and sr-only
  text "Find".
- 1024+: hidden (it lives at the top of the sidebar).

Render it once per breakpoint with classes (`lg:hidden`, `max-md:hidden`, etc.), each with a
unique id prefix (`top`, `bar`, `side`).

### 4.6 R5 Toolbar

**Copy**

- Count: `9 items` / `1 item`; with a find query: `9 items for “rice”`. When more exist than
  are shown, the count still says the total (`120 items`); R9 says how many are visible.
- Filters button: `Filters` + badge with the number of active filter **values** (each aisle,
  price band, in stock; `q` excluded since it is visible in the field). Badge hidden at 0.
- Sort: label `Sort by` (visible at 1024+, sr-only below), options from `SORTS`:
  `Our picks first`, `Price, low to high`, `Price, high to low`, `Name, A to Z`.

**Wireframes**

```
375 (sticky, full-bleed surface)            768 (sticky)
┌────────────────────────────────┐          ┌──────────────────────────────────────────────┐
│ [⚙ Filters  ②] [Our picks ▾ ]  │ 60px     │ [⌕ Find in Groceries     ][⚙ Filters ②][Sort▾]│
└──────────── border-b line ─────┘          └──────────────────── border-b line ───────────┘
9 items          (row under, not sticky)    9 items   [Baking ×] [Under USD$10 ×] Clear all
[Baking ×] [Under USD$10 ×] Clear all

1440 (not sticky, top of results column)
9 items                                              Sort by [ Our picks first      ▾]
[Baking ×] [Under USD$10 ×]  Clear all
```

**Classes**

- Sticky wrapper (below 1024): `sticky top-(--header-height) z-sticky -mx-[gutter]
  border-b border-line bg-surface px-[gutter] py-2 lg:static lg:mx-0 lg:border-0
  lg:bg-transparent lg:p-0 data-[stuck]:shadow-lift lg:data-[stuck]:shadow-none`.
  (Gutter breakout: wrap the toolbar in a full-bleed element instead if the dev prefers; it
  must touch both screen edges below 1024 so it reads as a bar, not a floating card.)
- The light header is `surface` too, so the toolbar has its own `border-b border-line` and,
  while stuck, `shadow-lift` (a floating layer). Its top edge sits exactly at
  `--header-height`; it relies on the header's own bottom edge (the header agent's job) for
  the line between them. If the light header has no bottom border, the toolbar adds
  `border-t border-line` while stuck (`data-[stuck]:border-t`).
- `data-stuck` comes from `StickyToolbar` (client): a 1px sentinel just above the toolbar and
  an `IntersectionObserver` with `rootMargin: calc(-1 * headerHeight)` (read
  `getComputedStyle(document.documentElement).getPropertyValue('--header-height')`).
- Filters button: `Button variant="outline" size="md" block` with `SlidersHorizontal` icon,
  label `Filters`, badge `grid min-w-6 place-items-center rounded-full bg-crimson px-1.5
  text-xs font-bold text-on-dark tabular-nums` (`aria-hidden`; the button's accessible name
  is "Filters, 2 applied").
- Sort: the existing `Select` (`min-h-12`, override to `min-h-control` here) inside
  `SortSelect` (client).
- Count: `text-small font-semibold text-ink tabular-nums`; with `q`, the query in
  `text-ink-body` quotes.

**`SortSelect` (client)** props `{ action: string; query: string /* current params without sort and page */; value: Sort }`.

- Renders `<form method="get" action={action} class="group/sort">`, hidden inputs for the
  other params, the `<select name="sort">` and a submit button `Sort` that is
  `group-data-[enhanced]/sort:hidden` (no-JS). On change: `listing.navigate(...)` with the new
  sort and page reset.

**States:** Filters button hover `bg-surface-selected`; pressed `translate-y-px`; focus ring;
badge updates with the URL. Sort select hover `border-ink-muted`, focus `border-crimson
ring-1 ring-crimson` (existing `Select`).

**Accessibility:** the Filters button has `aria-haspopup="dialog"` and `aria-controls` the
sheet id once enhanced. Before enhancement it is a link (§4.11). The toolbar is not a landmark;
sort has a programmatic label at every width.

### 4.7 R6 Active filters

**Copy:** chips read `“rice”` (find text, with quotes), the aisle name (`Baking`), the price
band label (`Under USD$10`), `In stock only`. Each chip's accessible name: `Remove filter:
Baking`. "Clear all" appears when 2+ chips: `Clear all`.

**Classes:** `<ul class="flex flex-wrap gap-2" aria-label="Filters applied">`. Chip:
`ListingLink` with `inline-flex min-h-control lg:min-h-9 items-center gap-1.5 rounded-full
border border-crimson bg-surface-selected pl-3.5 pr-2.5 text-small font-semibold
text-crimson-deep transition-colors duration-150 hover:bg-surface-strong` + `X size-icon-sm`.
"Clear all": `min-h-control lg:min-h-9 px-2 text-small font-semibold text-crimson
underline-offset-2 hover:underline` linking to the base path with only `sort` kept.

Chips and Clear all are links (work without JS). Focus after removing a chip (JS): the
`FilterForm` remounts; focus moves to the next chip, or to the count text (made
`tabIndex={-1}`) if none remain. Without JS a normal page load happens.

### 4.8 R7 Product grid and the product tile

**Grid classes:** `<ul class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-x-4 md:gap-y-4
lg:gap-y-6 xl:grid-cols-4" role="list">`. Each `<li class="flex">`.

**Tile anatomy (top to bottom)**

| #   | Part           | Content and data                                                                                             | Classes                                                                                       |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| 1   | Photo          | `ProductImage` 1:1: upload → stock photo by slug → branded placeholder (§4.9)                                 | `aspect-square rounded-md`; out of stock: `opacity-60`                                        |
| 1a  | Badge          | Only `Out of stock` (real status)                                                                            | `Badge` neutral, `absolute top-2 left-2`                                                      |
| 2   | Price          | `Price` component, `size="md"`, `tone="ink"`: `USD$14.50` then `about J$2,280`                                | `mt-3`                                                                                        |
| 3   | Label          | Aisle name on department pages (`Rice & grains`); department name on `/shop` (`Groceries`); omitted if null | `mt-2 text-xs font-medium text-ink-muted`                                                     |
| 4   | Name           | Product name, link to `/product/{slug}`, full-card click area                                                | `text-small sm:text-body font-semibold leading-snug text-ink line-clamp-2`                    |
| 5   | Size           | `10 lb bag`                                                                                                   | `text-xs text-ink-muted`                                                                      |
| 6   | Unit price     | `USD$1.45 per lb` only when computable (§5.4)                                                                 | `text-xs font-medium text-ink-body tabular-nums`                                              |
| 7   | Basket control | Add, or the stepper when in the basket, or "Out of stock"                                                     | `mt-auto pt-3 relative z-raised`                                                              |

Card: `<article class="group relative flex w-full flex-col rounded-lg border border-line
bg-surface p-2.5 sm:p-3 transition-colors duration-250 ease-out-soft hover:border-line-hover
has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2
has-[a:focus-visible]:outline-signal">`. Name link: `after:absolute after:inset-0
focus-visible:outline-none` (the ring is drawn on the article). Photo zoom on hover: existing
`zoom` prop of `StockImage` (`group-hover:scale-[1.04]`, 250ms; none under reduced motion).
No lift, no shadow (cards are flat; only floating layers get shadows).

Why price first: the eye lands on the number after the photo, the way people scan a shelf
label. The name is still the link and the accessible name of the card.

**Wireframe (375, one card ~165 × ~330)**

```
┌───────────────────┐
│┌─────────────────┐│
││ Out of stock    ││ ← badge only when real
││                 ││
││     photo 1:1   ││
││                 ││
│└─────────────────┘│
│ USD$14.50         │ text-lead extrabold ink
│ about J$2,280     │ text-xs muted
│ Rice & grains     │ text-xs muted
│ Long Grain Rice   │ text-small semibold, 2 lines max
│ 10 lb bag         │ text-xs muted
│ USD$1.45 per lb   │ text-xs ink-body
│┌─────────────────┐│
││    + Add        ││ 44px, outline crimson, full width
│└─────────────────┘│
└───────────────────┘
In the basket:
│┌─────────────────┐│
││ −  │  2  │  +   ││ 44px, solid crimson, white glyphs
│└─────────────────┘│
```

**Real example values (demo data, J$157 per USD):**

| Product              | Price      | J$ line         | Unit price          |
| -------------------- | ---------- | --------------- | ------------------- |
| Long Grain Rice      | USD$14.50  | about J$2,280   | USD$1.45 per lb     |
| Mackerel in Tomato Sauce | USD$6.90 | about J$1,080 | USD$2.30 each       |
| Laundry Detergent    | USD$19.75  | about J$3,100   | USD$0.13 per fl oz  |
| First Aid Kit        | USD$22     | about J$3,450   | (none)              |

(J$ values come from `usdCentsToJmd`, rounded to J$10; the dev checks them in tests, not by
hand.)

**Image sizes:** `sizes="(min-width: 1280px) 232px, (min-width: 1024px) 25vw, (min-width:
768px) 33vw, 50vw"`. First 4 tiles of the first batch: `loading="eager"` and
`fetchPriority="high"` on the first two (largest paint on phones). Add an `eager` prop to
`ProductImage`/`StockImage` (not `preload`: these images are in the dynamic Suspense part,
not the static shell).

**Component:** `ProductTile` (server), `src/components/shop/listing/product-tile.tsx`. Props
`{ product: Product; label: string | null; unitPrice: string | null; jmdPerUsd: number;
inBasket: number; eager?: boolean; priority?: boolean }`. The existing `ProductCard` stays for
gifts, basket detail, product page and styleguide (open question 3).

### 4.9 The branded placeholder (no photo)

Many demo products have no photo (detergent, paper towels, corned beef, mackerel, evaporated
milk, diapers, wipes, formula, lotion). The placeholder must look like a deliberate shelf tag,
not a missing image.

```
┌─────────────────┐
│ 🧴              │  department icon, size-icon-lg, text-crimson, top-left (p-3)
│                 │
│   Laundry       │  product name, text-h3 font-extrabold text-ink, centred, balance,
│   Detergent     │  3 lines max
│   150 fl oz     │  size, text-small font-semibold text-ink-muted
│                 │
└─────────────────┘   bg-surface-muted, rounded-md, inner 1px ring line (ring-1 ring-line ring-inset)
```

- Classes: `relative grid aspect-square place-items-center rounded-md bg-surface-muted p-4
  text-center ring-1 ring-inset ring-line`. Icon `absolute top-3 left-3 size-icon-lg
  text-crimson`. Name `text-h3 font-extrabold text-ink text-balance line-clamp-3`; at 375 use
  `text-body font-extrabold` (the tile is 141px inside). Size `mt-1 text-small font-semibold
  text-ink-muted`.
- The placeholder is decorative (the name is the card's link text right below):
  `aria-hidden="true"`, no `role="img"`.
- Implement as a `placeholder="label"` variant of `ProductImage` (new prop
  `placeholder?: 'icon' | 'label'`, default `'icon'` so other pages are unchanged), taking
  `name` and `size`.
- No "photo coming soon" text: never point at what is missing.

### 4.10 The basket control on the tile

**Behaviour**

| Basket quantity | Product status  | Control                                                                                                              |
| --------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| 0               | visible         | `+ Add` (outline crimson, full width, 44px)                                                                          |
| 1 to 19         | visible         | Stepper (solid crimson): `−` (or `Trash2` at 1) · quantity · `+`                                                     |
| 20              | visible         | Stepper with `+` disabled, `title="20 is the most per item"`                                                         |
| 0               | out_of_stock    | Static `Out of stock` row (no button)                                                                                |
| ≥1              | out_of_stock    | Stepper with `+` disabled and the quantity; under it `text-xs text-ink-muted`: `Out of stock now. We follow your swap choice.` (truthful: checkout already asks for a swap rule) |

**Data:** `inBasket` comes from the basket cookie, read on the server inside the dynamic
results part (`readBasket()`), as a map `productId → quantity`. No client store.

**Actions:** one new server action in `src/lib/basket/actions.ts`:

```ts
export type QuantityState =
  | { status: 'idle' }
  | { status: 'saved'; quantity: number; count: number; name: string; at: number }
  | { status: 'error'; message: string }

/** Sets one product's quantity on the basket (0 removes it). Increases need the product visible. */
export async function setProductQuantity(prev: QuantityState, form: FormData): Promise<QuantityState>
```

- zod: `{ id: string 1..64, quantity: int 0..MAX_QUANTITY }`.
- Looks the product up in `getCatalogue()`. If the requested quantity is above the current
  line and the product is not `visible`, return `error: 'That item is out of stock right
  now.'`.
- If the line is missing and quantity > 0: `addLine`; else `setQuantity` (0 removes).
- Returns the new quantity, basket count and product name. Writing the cookie in a server
  action refreshes the route, so the header basket count and every tile re-render with server
  truth.
- Unit tests in `src/lib/basket/basket.test.ts` cover the state transitions; the action
  wraps them.

**`TileBasketControl` (client)**, `src/components/shop/listing/tile-basket-control.tsx`.
Props `{ productId: string; name: string; quantity: number; inStock: boolean }`.

- `useActionState(setProductQuantity)` and `useOptimistic(quantity)`.
- Each button is a submit button in one `<form action={formAction}>` with
  `name="quantity" value={target}` on the button itself (`−` → q−1, `+` → q+1, Add → 1). With
  absolute targets, quick double taps never double-count.
- Without JS: server actions passed to `<form action>` post as normal forms; the page reloads
  with the new cookie, and since quantities are read on the server, the stepper shows
  correctly.
- Pending: the optimistic number shows at once; no spinner inside the stepper (it would jump).
  The Add button shows the spinner (`loading`) on the first add only.
- Error: below the control, `text-xs font-medium text-danger`, e.g. "That item is out of stock
  right now."; the optimistic value rolls back automatically.
- Focus: when Add becomes the stepper, focus moves to the stepper's `+` button. When the
  stepper returns to Add (quantity 0), focus moves to Add. Use a ref and an effect keyed on the
  zero/non-zero transition.
- Announcements: through the page announcer (§4.12), one message per change:
  `Long Grain Rice: 2 in your basket. 5 items in total.` and `Long Grain Rice removed from your
  basket.`

**Stepper classes:** container `@container flex h-control w-full items-stretch overflow-hidden
rounded-md bg-crimson text-on-dark` with `role="group" aria-label="Long Grain Rice in your
basket"`. Buttons `grid w-11 shrink-0 place-items-center transition-colors duration-150
hover:bg-crimson-deep active:bg-oxblood disabled:text-on-crimson-muted
disabled:hover:bg-transparent` (focus ring blush: add `on-dark-focus` on the container).
Middle `<output class="flex flex-1 items-center justify-center gap-1 font-bold tabular-nums">`
`2` + `<span class="hidden @[10rem]:inline font-medium text-on-crimson-muted">in basket</span>`.
Button labels: `Remove one Long Grain Rice` / `Remove Long Grain Rice from basket` (at 1, with
`Trash2`) / `Add one more Long Grain Rice`.

**Add button:** `Button variant="outline" size="sm" block` (44px) with `Plus` and `Add`, plus
sr-only ` Long Grain Rice to basket`. Hover `bg-surface-selected`.

**Out-of-stock row:** `flex h-control items-center justify-center rounded-md bg-surface-muted
text-small font-semibold text-ink-muted` reading `Out of stock`.

Why solid crimson for "in the basket": across a grid of white cards, red now marks exactly
what the sender has picked, so a monthly supporter sees their list at a glance.

### 4.11 R11 Phone and tablet filter sheet, and the no-JS fallback

**With JavaScript (below 1024):**

- `FilterSheet` (client), `src/components/shop/listing/filter-sheet.tsx`. Props `{ action:
  string; activeCount: number; total: number; index: FacetRow[]; query: ShopQuery; children:
  ReactNode /* <FilterFields idPrefix="sheet"> */ }`.
- Trigger: rendered as `<a href="#filters" …>` styled as the Filters button. After hydration
  its `onClick` calls `preventDefault()` and opens the dialog. The same element works
  without JS (§ below).
- Dialog: the existing `Dialog` with `variant="sheet"` and `title="Filters"`, plus a footer.
  Raise its body height for this use: `max-h-[min(70dvh,40rem)]` (add a `bodyClassName` prop
  to `Dialog`).
- Inside: `<form id="sheet-filters" method="get" action={action}>` containing the
  `FilterFields`, uncontrolled. `onChange` recomputes the live count from `index` with
  `countFacetIndex(index, draftFromForm(form))` (client-safe pure function from
  `shop-filters.ts`). Department links inside navigate straight away (they are navigation; the
  sheet closes on route change).
- Footer: `flex gap-3`: `Button variant="ghost"` `Clear all` (unchecks every input in the form,
  sets price to Any, recomputes; does not navigate) and `Button type="submit" form="sheet-filters"
  block` reading `Show 9 items` / `Show 1 item`; at 0 it is disabled and reads `No items match`.
- Apply: `onSubmit` → `preventDefault`, `listing.navigate(url)`, close the dialog, then scroll
  the results heading to just under the sticky toolbar (`scrollIntoView` with the
  `scroll-margin` from §4.13; `behavior: 'smooth'` unless reduced motion).
- Close: X button, Escape, backdrop (existing `Dialog`), and route change. Focus returns to the
  Filters button (native dialog behaviour). Because pages are kept in React `<Activity>`
  across navigations, reset `open` to false in a `useLayoutEffect` cleanup so the sheet is
  never open when the sender comes Back.
- The page behind does not scroll while open (`overflow: hidden` on `html` while open, as the
  mobile menu does today; reuse its approach).

**Sheet wireframe (375)**

```
┌──────────────────────────────────┐ ← top of sheet, rounded-t-lg, shadow-float
│ Filters                      [X] │ h3, border-b line
├──────────────────────────────────┤
│ Department                       │
│   All items                  22  │ 44px rows
│ ▌ Groceries                   9  │
│   Household                   5  │
│   …                              │
│ Aisle                            │
│ ☐ Rice & grains               1  │
│ ☑ Baking                      2  │
│   …                              │ scrolls
│ Price                            │
│ ○ Under USD$10                5  │
│   …                              │
│ Availability                     │
│ ☐ In stock only               8  │
├──────────────────────────────────┤
│ [ Clear all ]  [ Show 2 items  ] │ footer, border-t line, always visible
└──────────────────────────────────┘
```

**Without JavaScript (below 1024):** the trigger is a real link to `#filters`. The sidebar
`<aside id="filters">` carries `hidden target:block lg:block`, so following the link reveals
the full filter form in the page flow above the grid, with its visible `Apply filters` button
and a `Close filters` link (`href="#"`, `lg:hidden`). Each control posts a normal GET.

**Motion:** sheet slides up over `duration-slow` (450ms) and down over `duration-base`, using
a new `sheet-bottom` utility (§4.13), mirroring the existing `sheet-end`. Backdrop fades.
Reduced motion: instant (global rule).

**Accessibility:** native `<dialog>` with `showModal()`: focus trap, Escape and inert
background come from the browser. Title is the dialog's label. Focus lands on the close button
(first focusable) on open. The live count in the button is not a live region (the button's
text changes; screen readers read it when focused). After apply, the announcer says "2 items".

### 4.12 Navigation, pending state and the announcer (`listing-nav.tsx`, client)

One small client module so every enhanced control behaves the same:

```tsx
'use client'
export function ListingNavProvider({ children }: { children: ReactNode }) // useTransition + router
export function useListingNav(): { navigate(url: string): void; pending: boolean; announce(message: string): void }
export function ListingLink(props: ComponentProps<typeof Link>)            // Link whose click runs navigate() in the transition
export function ResultsRegion({ total, children }: { total: number; children: ReactNode })
export function Announcer()                                                // the one role="status" region
```

- `navigate(url)`: `startTransition(() => router.push(url, { scroll: false }))`. `push`, not
  `replace`, so Back undoes a filter (S7).
- If the results heading is above the sticky offset when navigation starts (the sender has
  scrolled down), scroll it to the top of the viewport below the toolbar after the transition.
- `ResultsRegion` wraps R5 to R10: `aria-busy={pending}`, and the grid inside gets
  `transition-opacity duration-150 data-[pending]:opacity-60`. No skeleton swap on filter
  changes (no layout shift). When `total` changes after a navigation, it calls
  `announce('9 items')` (or `'No items match these filters'`).
- `Announcer`: one visually hidden `<p role="status" aria-live="polite" aria-atomic="true">`
  for both result counts and basket changes (ui-ux-pro-max: one atomic message per event, no
  competing live regions). The provider and announcer live in `ListingResults`.
- Chips, Clear all, department links in the sidebar and Load more use `ListingLink`, so their
  `href` works without JS.

### 4.13 New utilities and global rules (globals.css)

No new colour tokens. Three additions:

1. `sheet-bottom` utility, the bottom-edge twin of `sheet-end`:

   ```css
   @utility sheet-bottom {
     translate: 0 100%;
     transition: translate var(--duration-base) var(--ease-out-soft),
       overlay var(--duration-base) allow-discrete, display var(--duration-base) allow-discrete;
     &[open] { translate: 0 0; transition-duration: var(--duration-slow); }
     @starting-style { &[open] { translate: 0 100%; } }
   }
   ```

2. Focus not obscured under two sticky bars (WCAG 2.4.11): while a listing is on the page,
   below 1024 the root scroll padding includes the toolbar.

   ```css
   :root:has([data-listing]) { scroll-padding-top: calc(var(--header-height) + 4.5rem); }
   @media (min-width: 64rem) { :root:has([data-listing]) { scroll-padding-top: calc(var(--header-height) + 1rem); } }
   ```

3. The results heading and first chip use `scroll-mt-[calc(var(--header-height)+4.5rem)]
   lg:scroll-mt-header` for programmatic scrolls.

`--header-height` is owned by the header (light redesign). This plan reads it and never
hard-codes 64/72px.

### 4.14 R8 Basket shortcut tile

**When:** first batch (`page` 1), no `q`, no aisle, price `any`, `stock` off, and at least
one basket to show. Inserted at index `min(7, items.length)`.

**Which basket (real data only):**

- Department route: the featured basket where this department supplies the largest share of
  item quantity, if that share is at least half (Groceries → Family Food Basket 9 of 9 units;
  Baby & Child → Baby Care Pack 4 of 4; Pharmacy → Pharmacy Pack 4 of 4, which is not
  featured, so: prefer featured, fall back to any visible basket meeting the rule). Household
  has no matching basket: no tile.
- `/shop`: a general tile: `Ready-made baskets`, `{n} baskets from {lowest price}` (today
  `4 baskets from USD$49`), linking to `/baskets`.

**Copy (department):** eyebrow `Ready-made basket`; name `Family Food Basket`; line `9 items
for USD$69`; link label `See what’s inside`. Item count = sum of quantities
(`BasketSummary.itemCount`). Prices through `formatUsd`.

**Wireframe (one cell)**

```
┌▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┐ oxblood card, rounded-lg, p-2.5 sm:p-3
│┌─────────────────┐│
││  basket photo   ││ StockPhoto 1:1 rounded-md (basketPhotos[slug]); none →
││      1:1        ││ crimson-deep block with ShoppingBasket size-8 text-blush
│└─────────────────┘│
│ Ready-made basket │ text-xs font-semibold text-blush
│ Family Food       │ text-body font-bold text-on-dark, 2 lines
│ Basket            │
│ 9 items for       │ text-small text-on-oxblood-muted
│ USD$69            │
│ See what’s inside›│ mt-auto, h-control, text-small font-semibold text-on-dark
└▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┘
```

**Classes:** `<li class="flex"><article class="group relative flex w-full flex-col rounded-lg
bg-oxblood p-2.5 text-on-dark on-dark-focus sm:p-3 has-[a:focus-visible]:outline-3
has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-blush">`. The link label
row is the card's link with `after:absolute after:inset-0`; `ChevronRight size-icon`. Hover:
photo zoom (existing) and the link label underlines. Contrast: blush on oxblood 10.5:1;
on-oxblood-muted 8.2:1.

**Component:** `BasketShortcutTile` (server). Props `{ kind: 'basket'; summary: BasketSummary
} | { kind: 'all'; count: number; fromCents: number }`. Selection logic is a pure helper
`pickShortcutBasket(scope, summaries, products)` in `src/lib/shop-listing.ts` with tests.

### 4.15 R9 Load more

**Copy:** `Showing 24 of 120 items`; button `Show 24 more` (or `Show 12 more` when fewer
remain).

```
              Showing 24 of 120 items
          ┌────────────────────────────┐   track 240px: bg-surface-strong h-1 rounded-full
          │████████                    │   fill bg-crimson, width = shown/total
          └────────────────────────────┘
               [ Show 24 more ]            Button outline, size md
```

**Classes:** `mt-10 flex flex-col items-center gap-3`. Text `text-small text-ink-muted
tabular-nums`. Track `h-1 w-60 overflow-hidden rounded-full bg-surface-strong` with
`role="presentation"`; fill `h-full bg-crimson`, width as an inline style percentage (a data
value, not a colour). Button: `ListingLink` with `buttonStyles({ variant: 'outline' })`,
`href` = current URL with `page = page + 1`.

**Behaviour:** the server renders `page × 24` items for `?page=n` (cumulative), so a shared
link shows the same list. With JS, the new items appear under the old ones without scroll
jumps (`scroll: false`), and focus moves to the first new tile's name link (the tile at index
`page × 24` gets `data-first-new`, focused in an effect). Announce `Showing 48 of 120 items`.

**Rules:** hidden when everything is shown. `page` is clamped to the last batch.

### 4.16 R10 Help row

**Copy**

- Left: title `Can’t find something?` (`text-body font-bold text-ink`), line `Tell us what
  they need and we’ll look for it in store.`, link from `requestLink(itemRequests)`: `Request
  an item` → `/request` or `Ask us about it` → `/contact`.
- Right: title `How we shop for you` , line `A driver buys your items in Jamaica on the day we
  deliver. You get a photo of the till receipt, then a photo at the door.`, link `How it works`
  → `/how-it-works`.

**Classes:** `mt-12 grid gap-6 rounded-lg border border-line bg-surface p-card md:grid-cols-2
md:gap-10`. Links `text-small font-semibold text-crimson underline underline-offset-2
hover:text-crimson-deep`. Icons: `PackagePlus` and `Receipt`, `size-icon text-crimson`,
beside each title.

### 4.17 Empty states

Rendered inside the results column instead of R7 to R9. Uses the existing `EmptyState`.

| Case                                                        | Icon            | Title                                   | Body                                                                                                       | Actions                                                                                                  |
| ----------------------------------------------------------- | --------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Filters or `q` match nothing                                 | `PackageSearch` | `No items match these filters`          | `Remove a filter, or search the whole shop.`                                                               | the chips row again (removable), `Clear all filters` (primary), `Search the whole shop for “rice”` (link to `/search?q=rice`, only with `q`; it also finds baskets) |
| Department has no listed products                            | `PackageOpen`   | `We’re stocking this department`        | `Nothing here yet. Have a look at the other departments in the meantime.`                                  | department links (chips style, from `departments`)                                                       |
| Every product in scope is out of stock (and stock filter off) | (inline note, not empty) | —                              | Above the grid: `Everything here is out of stock right now. We restock often, so check back soon.` in `rounded-md bg-warn-tint p-4 text-small text-ink` | —                                                                                                     |

The request link (`requestLink`) also appears under the first case.

### 4.18 Loading skeleton (Suspense fallback)

Matches final layout so nothing shifts when results stream in.

- 1024+: sidebar column with 5 bars (`h-11` find field, then 4 groups of `h-4 w-24` title +
  three `h-8` rows).
- Toolbar: 375/768 a `h-[60px]` sticky-looking bar (`bg-surface border-b border-line`), 1024+
  a `h-12` row.
- Grid: 8 skeleton tiles (`rounded-lg border border-line bg-surface p-2.5 sm:p-3`), each with
  `aspect-square` `Skeleton`, then `h-6 w-20`, `h-3 w-16`, `h-4 w-full`, `h-4 w-2/3`, `h-3
  w-12`, and an `h-11` bar at the bottom.
- `Skeleton` already pulses with a flat fill (no shimmer gradient) and stops under reduced
  motion.

---

## 5. URL and data model

### 5.1 URL params

| Param   | Values                                   | Default     | Notes                                                                                   |
| ------- | ---------------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| path    | `/shop` or `/shop/{department-slug}`     | `/shop`     | Department scope. Unknown slug → 404 (unchanged)                                         |
| `q`     | text, trimmed, max 80 chars, max 8 words | empty       | Every word must match name, size, description, aisle name or department name            |
| `aisle` | aisle slug, repeated (`aisle=a&aisle=b`) | none        | Only on department routes; unknown slugs dropped; ignored on `/shop`                     |
| `price` | `any`, `under-10`, `10-25`, `over-25`    | `any`       | Existing                                                                                |
| `stock` | `1`                                      | off         | Existing                                                                                |
| `sort`  | `popular`, `price-asc`, `price-desc`, `name` | `popular` | Key `popular` kept for old links; label changes to "Our picks first"                    |
| `page`  | integer ≥ 1                              | 1           | Number of 24-item batches shown (cumulative); clamped to the last batch                 |

Serialised order: `q`, `aisle`…, `price`, `stock`, `sort`, `page`; defaults omitted. Any
filter change resets `page`. Changing department keeps `q`, `price`, `stock`, `sort`.

Examples:

- `/shop` → everything, our picks first.
- `/shop/groceries?aisle=baking&aisle=canned-goods&price=under-10` → two aisles under USD$10.
- `/shop?q=milk&stock=1&sort=price-asc` → in-stock items matching "milk", cheapest first.
- `/shop/baby-and-child?page=2` → the first 48 items (today all 4).

Canonical: `/shop` and `/shop/{slug}` (unchanged `alternates.canonical`), so filtered URLs do
not compete in search.

### 5.2 `src/lib/shop-filters.ts` changes (no `server-only`; imported by client components)

```ts
export const SORTS = {
  popular: 'Our picks first',
  'price-asc': 'Price, low to high',
  'price-desc': 'Price, high to low',
  name: 'Name, A to Z',
} as const
export const PRICE_BANDS = { … } as const            // unchanged
export const PAGE_SIZE = 24                          // was 12
export const MAX_QUERY = 80

export interface ShopQuery {
  q: string
  aisles: string[]       // slugs, in aisle sort order
  price: PriceBand
  inStock: boolean
  sort: Sort
  page: number
}

/** What the filters need to know about the scope. */
export interface ListingContext {
  aisles: { id: string; slug: string; name: string }[]   // aisles of the scoped department, [] on /shop
  departments: Record<string, string>                    // categoryId → name, for q matching
}

export function parseShopQuery(params: Record<string, string | string[] | undefined>, ctx?: Pick<ListingContext, 'aisles'>): ShopQuery
export function shopQueryString(q: ShopQuery, patch?: Partial<ShopQuery>): string   // '?…' or ''
export function shopHref(basePath: string, q: ShopQuery, patch?: Partial<ShopQuery>): string
export function activeFilters(q: ShopQuery, ctx: ListingContext): { key: string; label: string; patch: Partial<ShopQuery> }[]
export function matchesQuery(p: Product, q: ShopQuery, ctx: ListingContext, skip?: 'aisles' | 'price' | 'stock'): boolean
export function applyShopQuery(products: Product[], q: ShopQuery, ctx: ListingContext): {
  total: number; shown: number; page: number; pages: number; hasMore: boolean; items: Product[]
}
export interface Facets { aisles: Record<string, number>; price: Record<PriceBand, number>; inStock: number }
export function facetCounts(products: Product[], q: ShopQuery, ctx: ListingContext): Facets

/** Compact rows for the phone sheet's live count; products already narrowed by scope and q. */
export type FacetRow = [aisleSlug: string | null, priceCents: number, inStock: 0 | 1]
export function toFacetIndex(products: Product[], ctx: ListingContext): FacetRow[]
export function countFacetIndex(rows: FacetRow[], draft: Pick<ShopQuery, 'aisles' | 'price' | 'inStock'>): number
```

Rules:

- `parseShopQuery`: unknown values fall back to defaults; `aisle` accepts a string or array,
  keeps only slugs in `ctx.aisles`, dedupes, orders by aisle order; `q` trimmed, collapsed
  whitespace, cut to 80 chars; `page` positive integer else 1.
- `matchesQuery`: `q` words (lower-cased, max 8) must all appear in
  `${name} ${size} ${description} ${aisleName} ${departmentName}`. Share the word logic with
  `searchCatalogue` by exporting `queryWords(text)` and `matchesWords(text, words)` from
  `shop-filters.ts` and using them in `src/lib/data/catalogue.ts`.
- Sorting: out-of-stock always after in-stock in **every** sort; then the sort; ties by name.
  `popular` = featured first.
- `applyShopQuery`: `items = sorted.slice(0, page * PAGE_SIZE)`, `page` clamped to `pages`,
  `hasMore = shown < total`.
- `facetCounts`: aisle counts use every filter except aisles; price counts use every filter
  except price; `inStock` count uses every filter except stock and counts visible products.

**Tests to add or change (`src/lib/shop-filters.test.ts`)**, using the demo catalogue:

1. Unknown `sort`, `price`, `page`, and an unknown `aisle` slug fall back / are dropped.
2. `aisle` given as a repeated array and as a single string both parse; duplicates removed;
   order follows aisle `sort`.
3. `aisle` is ignored when `ctx` has no aisles (the `/shop` scope).
4. `shopQueryString` round-trips `q`, two aisles, price, stock, sort, page in the fixed order;
   empty for defaults; `patch` with a filter change drops `page`.
5. `q` "milk" on all products returns Evaporated Milk only; "rice grains" matches by aisle
   name; a query of 9 words uses the first 8; 81 chars are cut to 80.
6. Groceries + aisle `baking` returns Flour and Sugar only.
7. Out-of-stock Ground Coffee is last under `price-asc`, `price-desc`, `name` and `popular`.
8. `page` is cumulative: with 30 fake products, page 2 returns 30 items, `hasMore` false; page
   1 returns 24, `hasMore` true; page 99 clamps to 2.
9. `facetCounts` on Groceries with `price=under-10`: aisle counts reflect the price filter;
   price counts ignore it (Any shows all 9 split across bands correctly).
10. `countFacetIndex(toFacetIndex(groceries), draft)` equals `applyShopQuery(...).total` for
    a table of 6 drafts.
11. `activeFilters` labels: `“milk”`, `Baking`, `Under USD$10`, `In stock only`, each with a
    patch that removes only itself.
12. SORTS label for `popular` is "Our picks first" (guards the honesty rename).

### 5.3 Aisles: data model

**Decision: an `aisles` table plus a nullable `products.aisle_id`**, not a free-text column.

Why:

- **Order:** a store's aisles have an order (Rice & grains before Baking); a table has `sort`.
- **Stable URLs:** the slug in `?aisle=baking` survives renaming "Baking" to "Baking &
  sugar"; with free text every rename breaks shared links and splits products across two
  spellings.
- **Scoped to a department:** `unique (category_id, slug)` plus a check that a product's aisle
  belongs to its own department; free text cannot stop "Canned goods" from appearing under
  Pharmacy by mistake.
- **Admin-ready:** the coming admin panel edits aisles once and assigns them by picking from a
  list.

**Migration `supabase/migrations/0013_product_aisles.sql`** (safe to run again):

```sql
-- 0013 Aisles: sub-groups inside each department, for the shop's aisle filter.
-- Safe to run again: creates only what is missing and never overwrites edits.

create table if not exists public.aisles (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete cascade,
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  sort int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, slug)
);

create index if not exists aisles_category_idx on public.aisles (category_id, sort);

alter table public.products
  add column if not exists aisle_id uuid references public.aisles (id) on delete set null;

create index if not exists products_aisle_idx on public.products (aisle_id) where status <> 'hidden';

-- A product's aisle must belong to the product's own department.
create or replace function public.check_product_aisle()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.aisle_id is not null and not exists (
    select 1 from public.aisles a where a.id = new.aisle_id and a.category_id = new.category_id
  ) then
    raise exception 'Aisle % is not in this product''s department', new.aisle_id;
  end if;
  return new;
end $$;

drop trigger if exists products_aisle_check on public.products;
create trigger products_aisle_check before insert or update of aisle_id, category_id
  on public.products for each row execute function public.check_product_aisle();

drop trigger if exists aisles_touch on public.aisles;
create trigger aisles_touch before update on public.aisles
  for each row execute function public.touch_updated_at();

alter table public.aisles enable row level security;

drop policy if exists "aisles: public read" on public.aisles;
create policy "aisles: public read" on public.aisles for select to anon, authenticated
  using (visible or public.is_staff());

drop policy if exists "aisles: admin write" on public.aisles;
create policy "aisles: admin write" on public.aisles for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Starting aisles for the four launch departments. Edits made later are never overwritten.
insert into public.aisles (category_id, slug, name, sort)
select c.id, v.slug, v.name, v.sort
from public.categories c
join (values
  ('groceries', 'rice-and-grains', 'Rice & grains', 1),
  ('groceries', 'baking', 'Baking', 2),
  ('groceries', 'cooking-oils', 'Cooking oils', 3),
  ('groceries', 'canned-goods', 'Canned goods', 4),
  ('groceries', 'breakfast-and-drinks', 'Breakfast & drinks', 5),
  ('household', 'laundry-and-cleaning', 'Laundry & cleaning', 1),
  ('household', 'dishwashing', 'Dishwashing', 2),
  ('household', 'paper-goods', 'Paper goods', 3),
  ('pharmacy', 'pain-relief', 'Pain relief', 1),
  ('pharmacy', 'vitamins', 'Vitamins', 2),
  ('pharmacy', 'first-aid-and-hygiene', 'First aid & hygiene', 3),
  ('baby-and-child', 'diapers-and-wipes', 'Diapers & wipes', 1),
  ('baby-and-child', 'feeding', 'Feeding', 2),
  ('baby-and-child', 'bath-and-skin-care', 'Bath & skin care', 3)
) as v (category_slug, slug, name, sort) on v.category_slug = c.slug
on conflict (category_id, slug) do nothing;
```

(The dev confirms `public.touch_updated_at`, `public.is_staff` and `public.is_admin` exist
under those names; they do in `0001`/`0002` and are used by `0003`/`0008`. Run the file twice
on Postgres 16 before hand-over, as the runbook promises.)

Real products are added through admin later, so the migration assigns no product to an aisle.
Until they are assigned, aisles have no listed products and the aisle filter hides itself.

**`docs/SQL-RUNBOOK.md`:** add row 13 to the table:

`| 13  | supabase/migrations/0013_product_aisles.sql | Aisles inside each department, for the shop's aisle filter |`

and one line under "Placeholders to replace later": "The starting aisle names (for example
Rice & grains, Canned goods) are a first draft; rename or add aisles in the admin panel once
ShipEast's real product list is in. Renaming keeps shared shop links working."

**Types (`src/lib/types.ts`):**

```ts
export interface Aisle {
  id: string
  slug: string
  name: string
  categoryId: string
  sort: number
}

export interface Product {
  …
  /** Aisle inside the product's department; null until one is assigned. */
  aisleId: string | null
}
```

**Loader (`src/lib/data/source.ts`):** `CatalogueData` gains `aisles: Aisle[]`. Demo mode
returns `demo.aisles`. Supabase: add
`rows(db.from('aisles').select('id, slug, name, category_id, sort, visible').order('sort'))`
to the `Promise.all`, keep `visible` ones, map `category_id → categoryId`; map products'
`aisle_id → aisleId` (the `select('*')` already returns it). Same `catalogue` cache tag.

**Data helpers (`src/lib/data/catalogue.ts`):**

```ts
/** Aisles of one department in sort order, each with its count of listed products. Empty aisles are left out. */
export async function getAisles(categoryId: string): Promise<(Aisle & { count: number })[]>
```

**Demo seed (`src/lib/demo/catalogue.ts`):** export `aisles: Aisle[]` with ids
`ais-{slug}` and the same 14 names as the migration, and add `aisleId` to every seed (a
seventh tuple field or inside `extra`):

| Product                  | Department   | Aisle                |
| ------------------------ | ------------ | -------------------- |
| Long Grain Rice          | Groceries    | Rice & grains        |
| All-Purpose Flour        | Groceries    | Baking               |
| Granulated Sugar         | Groceries    | Baking               |
| Vegetable Cooking Oil    | Groceries    | Cooking oils         |
| Rolled Oats              | Groceries    | Breakfast & drinks   |
| Corned Beef              | Groceries    | Canned goods         |
| Mackerel in Tomato Sauce | Groceries    | Canned goods         |
| Evaporated Milk          | Groceries    | Breakfast & drinks   |
| Ground Coffee            | Groceries    | Breakfast & drinks   |
| Laundry Detergent        | Household    | Laundry & cleaning   |
| Dish Soap                | Household    | Dishwashing          |
| Toilet Paper             | Household    | Paper goods          |
| Paper Towels             | Household    | Paper goods          |
| Household Bleach         | Household    | Laundry & cleaning   |
| Pain Relief Tablets      | Pharmacy     | Pain relief          |
| Adult Multivitamin       | Pharmacy     | Vitamins             |
| First Aid Kit            | Pharmacy     | First aid & hygiene  |
| Hand Sanitiser           | Pharmacy     | First aid & hygiene  |
| Baby Diapers, Size 3     | Baby & Child | Diapers & wipes      |
| Baby Wipes               | Baby & Child | Diapers & wipes      |
| Infant Formula           | Baby & Child | Feeding              |
| Baby Lotion              | Baby & Child | Bath & skin care     |

`src/lib/demo/demo.test.ts`: add "every demo product has an aisle in its own department" and
"aisle slugs are unique per department".

**Null behaviour:** a product with `aisleId: null` still shows in the grid with the department
as its label on `/shop` and no label on its department page; it never matches an aisle filter;
facet counts skip it for aisles. If no product in the scope has an aisle, the Aisle group is
not rendered at all, and any `aisle` param is dropped by `parseShopQuery` (no aisles in
context), so old links never show an empty list.

### 5.4 Unit price, honestly

New pure module `src/lib/unit-price.ts` (client-safe), formatted through `formatUsd` from
`src/lib/format.ts` (no inline money formatting):

```ts
/** "USD$1.45 per lb", "USD$2.30 each", "USD$0.82 per roll", "USD$6.40 per 100", or null when the size can't be read reliably. */
export function unitPriceLabel(size: string, priceCents: number): string | null
```

Rules, first match wins (case-insensitive):

1. `, N pack` or `N pack` with N > 1 → per item: `{formatUsd(cents / N)} each`.
2. `N count` / `N tablets` / `N capsules` → per item; if that is under 10 cents, per 100:
   `{formatUsd(cents * 100 / N)} per 100`; else `… each`.
3. `N rolls` / `N double rolls` → `… per roll`.
4. `N lb` with N > 1 → `… per lb`.
5. `N fl oz` → `… per fl oz`.
6. `N oz` (weight) → converted to pounds (N / 16) → `… per lb`, so dry goods compare on one
   unit.
7. Anything else (`1 gallon`, `160 pieces`, `500 mg` alone, unknown) → `null`. Never guess.

Rounding: `Math.round` to the cent before `formatUsd`.

**Test table (`src/lib/unit-price.test.ts`), every demo product:**

| Size                 | Price      | Expected            |
| -------------------- | ---------- | ------------------- |
| 10 lb bag            | USD$14.50  | USD$1.45 per lb     |
| 5 lb bag             | USD$6.50   | USD$1.30 per lb     |
| 4 lb bag             | USD$5.75   | USD$1.44 per lb     |
| 1 gallon             | USD$13.25  | null                |
| 42 oz canister       | USD$8.25   | USD$3.14 per lb     |
| 12 oz can            | USD$4.75   | USD$6.33 per lb     |
| 15 oz can, 3 pack    | USD$6.90   | USD$2.30 each       |
| 12 oz can, 12 pack   | USD$15.90  | USD$1.33 each       |
| 24 oz bag            | USD$18.90  | USD$12.60 per lb    |
| 150 fl oz            | USD$19.75  | USD$0.13 per fl oz  |
| 28 fl oz, 3 pack     | USD$9.90   | USD$3.30 each       |
| 30 double rolls      | USD$24.50  | USD$0.82 per roll   |
| 12 rolls             | USD$21.90  | USD$1.83 per roll   |
| 121 fl oz, 2 pack    | USD$11.50  | USD$5.75 each       |
| 500 mg, 200 count    | USD$12.80  | USD$6.40 per 100    |
| 300 tablets          | USD$18.90  | USD$6.30 per 100    |
| 160 pieces           | USD$22     | null                |
| 33.8 fl oz, 2 pack   | USD$10.50  | USD$5.25 each       |
| 168 count            | USD$42.90  | USD$0.26 each       |
| 900 count            | USD$23.90  | USD$2.66 per 100    |
| 48 oz tub            | USD$45.90  | USD$15.30 per lb    |
| 27 fl oz, 2 pack     | USD$14.90  | USD$7.45 each       |

Plus: `''` → null, `pack of 1` → null, `0 lb` → null (no division by zero).

### 5.5 Server and client split

| Piece                                   | Kind                | Why                                                                                         |
| --------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| `shop/page.tsx`, `shop/[category]/page.tsx` | server          | Thin: metadata, `notFound`, render `ShopListing`                                             |
| `ShopListing`                           | server              | Band + strip (static, cached loaders) + `<Suspense>` around results                          |
| `DepartmentBand`, `EdgeStrip`           | server              | Static; prerendered in the shell                                                             |
| `TabRailScroller`                       | client (tiny)       | Scrolls the active tab into view on phones                                                   |
| `CutoffCountdown`                       | client (existing)   | Visitor's local time                                                                         |
| `ListingResults`                        | server (async)      | Awaits `searchParams`, reads the basket cookie, filters, renders everything below the strip |
| `FilterFields`, `FindInList`, `ActiveFilters`, `ProductTile`, `BasketShortcutTile`, `ListingHelpRow`, `ListingEmpty`, `ListingSkeleton` | server | Markup only; no state                                   |
| `ListingNavProvider`, `ListingLink`, `ResultsRegion`, `Announcer` | client | Transition, pending state, one live region                                                |
| `FilterForm`                            | client              | Instant apply on change; remount on URL change                                              |
| `FilterSheet`                           | client              | Dialog, draft state, live count                                                              |
| `SortSelect`                            | client              | Navigate on change                                                                           |
| `StickyToolbar`                         | client              | Sentinel → `data-stuck` shadow                                                               |
| `TileBasketControl`                     | client              | Optimistic stepper with the server action                                                    |
| `LoadMore`                              | client              | Focus the first new tile after loading                                                       |

Server components pass only serialisable props to client components (strings, numbers,
arrays, server-rendered `children`); no functions.

### 5.6 `/search` later

Yes, `/search` can reuse the listing later: `ShopListing` with scope "all", `q` prefilled from
the URL, and a small "Ready-made baskets that match" row above the grid (search also finds
baskets). Out of scope now; the components are built scope-driven so this is a page-level
change only.

---

## 6. Performance

- **Static shell, dynamic hole.** With Cache Components, `ShopListing` renders the band and
  strip from cached loaders (`loadCatalogue`, `loadZones`, `loadSettings` are `'use cache'`),
  so they prerender for `/shop` and each `generateStaticParams` department. The only runtime
  reads (`await searchParams`, `cookies()` through `readBasket()`) sit inside **one**
  `<Suspense fallback={<ListingSkeleton />}>` around `ListingResults`. Per Next 16
  docs (`node_modules/next/dist/docs/01-app/02-guides/keeping-pages-static.md`), the shell
  ships at once and results stream in.
- **No layout shift on filter changes.** Filters navigate in a transition: the old results
  stay on screen, dimmed to 60%, until the new ones arrive; no skeleton swap. Tiles have fixed
  photo aspect (1:1) and a fixed 44px control row; the price block and text have fixed
  line-heights. Chips wrap above the grid; when a chip row appears or disappears the grid moves
  once, in response to the sender's own action (allowed by CLS, which ignores shifts within
  500ms of input).
- **Skeleton = final geometry** (§4.18), so first stream-in does not shift.
- **Images:** `sizes` per §4.8; first row eager, first two `fetchPriority="high"`; the rest
  lazy. Unsplash images are served through `next/image` as today. Placeholders are pure CSS
  and text (zero bytes).
- **Client JS kept small:** the grid, tiles and filters render on the server; client parts
  are the controls listed in §5.5. No client-side filtering library. The facet index for the
  sheet is a compact tuple array (about 20 bytes per product; 500 products ≈ 10 KB, sent only
  inside the sheet's props).
- **Basket action refresh:** a server action that writes the cookie refreshes the route; only
  the dynamic results part re-renders (the shell is cached).
- **Prefetch:** department tabs and sidebar department links are `next/link` (prefetched in
  the viewport). Chips and Load more are links too.

---

## 7. Self-review

### 7.1 Against generic defaults (frontend-design, two passes)

First-pass plan, then what changed:

| First pass                                                                                   | Why it read generic                                                     | Changed to                                                                                                  |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| A photo hero "Fresh groceries for your family" with a search bar and four category cards     | The two-column hero the owner no longer wants; the old corporate shop   | Single-column crimson band with folder tabs; products in the first screen                                   |
| Trust band with three icon cards (same-day, proof, USD) under the hero                      | The SaaS "three feature cards" kit                                       | One-line edge strip; proof repeated once in the help row                                                    |
| Cards with a soft shadow and lift on hover                                                   | The SaaS card kit                                                        | Flat cards, border colour change, photo zoom only                                                           |
| Grey icon in a box as the placeholder                                                        | Looks like a broken image                                                | Type-led shelf tag: department icon, product name in heavy type, size                                       |
| "Popular first", "Bestseller" badges                                                         | Invented claims                                                          | "Our picks first"; only real badges                                                                         |
| Horizontal filter chips toolbar on desktop                                                   | Fashionable, but Baymard 2024 says sidebar for more than a few filters   | Sidebar on desktop, sheet on phones                                                                         |
| Pagination numbers                                                                           | Browsing drops off (S9)                                                  | "Show 24 more" with a progress line                                                                         |
| Red Add buttons on every card                                                                | A wall of red that means nothing                                         | Outline Add; solid red only for items already in the basket                                                 |

Generic tells checked and absent: no gradient, no cream background, no all-caps labels, no
`A · B · C` meta strings (unit price and size are separate lines), no `→` appended to link
text (a lucide `ChevronRight` icon is used on the one tile link), no numbered markers, no
staggered fade-ins on cards (the old `StaggerProductGrid` is not used here), no monospace
labels. Boldness spent in one place: the crimson band with the cut-out tab. The oxblood basket
tile is the only other dark block, and only on unfiltered first batches.

"Remove one accessory": the first draft also had a crimson "Pay in USD" pill on every card;
removed (the strip says it once).

### 7.2 ui-ux-pro-max checklist

| Check                                                                 | How this plan meets it                                                                                         |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| No emoji icons; one icon family                                       | lucide only; outline style throughout                                                                          |
| `cursor-pointer` on clickable elements                                | Links/buttons by default; checkbox and radio rows set `cursor-pointer`                                        |
| Hover transitions 150–300ms                                           | 150ms colour, 250ms card border and photo zoom                                                                 |
| Text contrast ≥ 4.5:1                                                 | All pairs are existing role pairs (ink on surface, white on crimson, blush on crimson for 14px bold count, blush on oxblood) |
| Visible focus on every control (incl. sheet)                          | Signal ring on light; blush on crimson and oxblood (`on-dark-focus`); row-level ring on filter labels          |
| Focus not obscured by sticky UI                                       | Root `scroll-padding-top` includes header + toolbar on listing pages (§4.13)                                   |
| Reduced motion                                                        | Global rule; zoom, sheet slide, colour transitions become instant                                              |
| 375 / 768 / 1024 / 1440                                               | Specified per region; tab rail scrolls inside the band, never the page                                        |
| Touch targets ≥ 44px                                                  | All controls 44px below 1024; filter rows 36px from 1024 (pointer), matching the footer precedent               |
| Chips wrap, never clipped                                             | `flex-wrap`                                                                                                    |
| One atomic live message per event                                     | One `Announcer` for counts and basket changes                                                                  |
| Visible labels, not placeholder-only                                  | Find field labelled visibly except in the 768 toolbar (sr-only label, same as the header search), filter groups use legends |
| Reserve space for async content                                       | Skeleton matches final geometry; no swap on filter changes                                                    |
| Deep linking, predictable Back                                        | Every state in the URL; `router.push` so Back undoes a filter                                                  |
| Static shell with Suspense holes                                      | §6                                                                                                             |

---

## 8. Acceptance checklist

The manager checks each item with Playwright screenshots at 375, 768, 1024 and 1440 (demo
mode, Unsplash photos loading), with filters off and on. "Filters on" =
`/shop/groceries?aisle=baking&aisle=canned-goods&price=under-10&stock=1`.

**Structure and brand**

- [ ] `/shop` and `/shop/groceries` render the same layout; old links (`/shop/household`,
      `/shop/pharmacy`, `/shop/baby-and-child`) work; unknown slug is a 404.
- [ ] Under the light header: one crimson band, single column, no photo, no second column, no
      lead paragraph, about 150 to 170px tall. It does not read as a hero.
- [ ] The active department tab is `surface`-coloured and joins the strip; `aria-current` set.
- [ ] At 375 the tab rail scrolls inside the band; the page itself never scrolls sideways.
- [ ] Products are visible in the first screen at all four widths (at least the top of the
      first row at 375 and 768; a full row at 1024 and 1440).
- [ ] No gradients anywhere; colours are role classes only (`design-tokens.test.ts` passes).
- [ ] Red appears only in: band, active tab text, primary/outline actions, checked inputs,
      selected department, chips, filter count badge, in-basket steppers, load-more fill,
      basket tile (oxblood). The grid area reads mostly white and neutral.

**Cards**

- [ ] Every card: photo or shelf-tag placeholder (1:1), USD price, `about J$…`, label, name (2
      lines max), size, unit price only where §5.4 gives one, control at the bottom; cards in a
      row are equal height.
- [ ] Unit prices match the §5.4 table exactly; First Aid Kit and Vegetable Cooking Oil show
      none.
- [ ] Placeholders (e.g. Laundry Detergent, Corned Beef, Infant Formula) show the department
      icon, the name in heavy type and the size; no "coming soon" text.
- [ ] Ground Coffee shows "Out of stock" badge, dimmed photo, the static "Out of stock" row,
      and appears last in every sort.
- [ ] Add → stepper with quantity 1; `+` to 2; `−`/trash back to Add; the header basket count
      updates; focus moves correctly; the announcer speaks each change.
- [ ] Refreshing the page keeps the steppers (quantities come from the cookie).
- [ ] With JavaScript disabled, Add and the stepper still work (full page post).

**Filters**

- [ ] 1024 and 1440: sidebar sticky below the header with its own scroll; groups in order Find,
      Department, Aisle, Price, Availability.
- [ ] Ticking a checkbox or radio applies instantly; results dim while loading; no layout jump;
      the URL updates; Back undoes it.
- [ ] Facet counts are right (spot-check Groceries with `price=under-10`); zero options are
      disabled unless checked.
- [ ] Aisle group hidden on `/shop`; Availability hidden on Household, Pharmacy, Baby & Child.
- [ ] Chips show each active value, each removes only itself; "Clear all" keeps sort.
- [ ] Find field filters within the department (`q=milk` on `/shop` → Evaporated Milk);
      the header search still goes to `/search`.
- [ ] 375 and 768: toolbar sticks exactly under the header (uses `--header-height`), gains a
      shadow only when stuck, never overlaps or leaves a gap; light header and toolbar are
      separated by a visible line.
- [ ] Filters button shows the right count; opens a bottom sheet; focus goes into it; Escape,
      X and backdrop close it; focus returns to the button.
- [ ] In the sheet, ticking options updates "Show N items" live without navigating; "Show"
      applies, closes and scrolls to the results; "Clear all" resets the draft; at 0 the button
      is disabled and says "No items match".
- [ ] Going Back to the page never shows the sheet already open.
- [ ] With JavaScript disabled: the Filters link reveals the in-page filter form with an
      "Apply filters" button; sort has its own "Sort" button; chips work.
- [ ] Keyboard only: every filter, chip, sort, card link, Add and stepper is reachable with a
      visible focus ring; nothing focused is hidden under the sticky header or toolbar.

**Paging, empty, loading**

- [ ] With 22 products no "Show more" appears. With a test fixture of 30 products (or by
      temporarily lowering `PAGE_SIZE` in a unit test, not in the build), "Showing 24 of 30
      items" and "Show 6 more" appear; `?page=2` shows all 30; focus lands on the first new
      tile.
- [ ] `q=zzz` shows the "No items match these filters" state with chips, "Clear all filters"
      and "Search the whole shop for “zzz”".
- [ ] Basket tile shows on unfiltered `/shop` ("4 baskets from USD$49"), `/shop/groceries`
      (Family Food Basket), `/shop/baby-and-child` (Baby Care Pack); not on Household; not
      when any filter is on.
- [ ] Throttled network: skeleton geometry matches the final layout (compare screenshots).
- [ ] Reduced motion: no zoom, no sheet slide.

**Data and checks**

- [ ] `0013_product_aisles.sql` runs twice without error; listed as row 13 in
      `docs/SQL-RUNBOOK.md`.
- [ ] Demo catalogue: every product has an aisle in its own department (test).
- [ ] `npm run check` green (typecheck, lint, tests, build).

---

## 9. Open questions

1. **Header contract (for the light-header agent, `docs/heroes/PLAN.md`).** This page needs:
   (a) `--header-height` to stay the true height of the sticky header at every width; (b) the
   phone search row hidden on `/shop/*` as well as `/shop` (today `HeaderSearchRow` hides it
   on `/shop` only), so the listing's own "Find in …" field is the only search box on phones;
   (c) a visible bottom edge (line or shadow) on the light header when scrolled. Header search
   on desktop stays global (`/search`). Manager: please pass this to the header agent.
2. **"In a ready-made basket" filter and badge.** Rejected for now (§2.4). Owner may want it
   back when the catalogue is large.
3. **One product card site-wide?** The new `ProductTile` is only used on the listing. Should
   the product page's "more like this", gifts and basket detail switch to it in a follow-up
   for consistency?
4. **Aisle names.** The 14 starting aisles are realistic for today's items; ShipEast (Derion)
   should confirm or rename them once the real PriceSmart list arrives. There is no admin
   panel yet, so until then aisles are edited in Supabase.
5. **Unit price units.** We show dry goods per lb and liquids per fl oz (US units the senders
   use). Does Derion prefer metric (per kg, per litre) to match Jamaican shelf labels?
6. **Research gap.** Baymard's full articles could not be fetched (network). If the manager
   allows `baymard.com`, the research section can be checked against the full texts; no plan
   decision is expected to change.

---

## 10. File list for the dev agent

Build order: data first (types, demo, migration, loader, filters, unit price, tests), then
components, then pages, then delete what is unused. `npm run check` after each step.

**Data and logic**

- `supabase/migrations/0013_product_aisles.sql` (new)
- `docs/SQL-RUNBOOK.md` (row 13 + placeholder line)
- `src/lib/types.ts` (`Aisle`, `Product.aisleId`)
- `src/lib/demo/catalogue.ts`, `src/lib/demo/index.ts` (export `aisles`), `src/lib/demo/demo.test.ts`
- `src/lib/data/source.ts` (load aisles, map `aisle_id`)
- `src/lib/data/catalogue.ts` (`getAisles`, shared word matching)
- `src/lib/shop-filters.ts` and `.test.ts` (§5.2)
- `src/lib/unit-price.ts` and `.test.ts` (§5.4)
- `src/lib/shop-listing.ts` and `.test.ts` (`pickShortcutBasket`, label helper, scope type)
- `src/lib/basket/actions.ts` (`setProductQuantity`), `src/lib/basket/basket.test.ts`

**Components (new, `src/components/shop/listing/`)**

`shop-listing.tsx`, `department-band.tsx`, `tab-rail-scroller.tsx`, `edge-strip.tsx`,
`listing-results.tsx`, `filter-fields.tsx`, `find-in-list.tsx`, `filter-form.tsx`,
`filter-sheet.tsx`, `sort-select.tsx`, `listing-toolbar.tsx`, `sticky-toolbar.tsx`,
`active-filters.tsx`, `product-tile.tsx`, `tile-basket-control.tsx`, `basket-shortcut-tile.tsx`,
`load-more.tsx`, `listing-help-row.tsx`, `listing-empty.tsx`, `listing-skeleton.tsx`,
`listing-nav.tsx`.

**Components (changed)**

- `src/components/shop/product-image.tsx`: `placeholder?: 'icon' | 'label'`, `name`, `size`,
  `eager`, `priority` props (defaults keep other pages unchanged).
- `src/components/site/stock-photo.tsx`: pass `loading`/`fetchPriority` through `StockImage`.
- `src/components/ui/dialog.tsx`: optional `bodyClassName` and a `sheet-bottom` animation on
  `variant="sheet"`.
- `src/app/globals.css`: `sheet-bottom` utility and the listing scroll-padding rule (§4.13).

**Pages**

- `src/app/(site)/shop/page.tsx`: metadata (`title: 'Shop'`, canonical `/shop`), render
  `<ShopListing scope={{ kind: 'all' }} searchParams={searchParams} />`.
- `src/app/(site)/shop/[category]/page.tsx`: keep `generateStaticParams`,
  `generateMetadata`, `notFound`; render `<ShopListing scope={{ kind: 'department',
  category }} searchParams={searchParams} />`.

**Delete when unused (check with grep first)**

`src/components/pages/shop/front-door.tsx`, `aisle-sign.tsx`, `shop-baskets.tsx`,
`shop-basket-card.tsx`, `shop-notes.tsx`, `src/components/shop/product-shelf.tsx`, and
`aisleSample` / `aisleSampleLine` (with their tests) in `src/lib/shop-front.ts` (keep
`priceCheckRange` and `priceCheckLine`, used by the strip). Keep `stagger-product-grid.tsx`
(product page), `category-card.tsx` and `shop-promises.tsx` (search, product pages).

**Not touched:** the header and footer (light header belongs to `docs/heroes/PLAN.md`; see
§9 Q1), the product page, `/search`, `/basket`.
