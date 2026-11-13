# Home v3.2 audit: layout, spacing, proportion, type hierarchy

Lens: structure and measure, header to footer, at 1440 / 1024 / 768 / 375. Measured with Playwright
(`page.evaluate`, cookie banner dismissed, DPR 1) on http://localhost:3100/. Screenshots:
`scratchpad/layout/full-{1440,1024,768,375}.png`, section crops `s1440-*.png`, `s375-*.png`.
Skills used: frontend-design (spend boldness in ONE place, structure carries information),
ui-ux-pro-max (`ux` domain: consistent modular type scale, clear heading/body contrast, 8px+
between touch targets, no text clipped in fixed boxes).

## 0. Diagnosis in one paragraph

The gaps BETWEEN sections are already even (40px at 375, 48px from 768 up, every section). The
cramped feeling comes from INSIDE the boxes: 0px vertical padding on the aisle row, 10px around
the header controls, boxes nested two and three deep (gift banner = gutter 16 + panel 20 + banner
24 = 60px from the screen edge at 375), and seven corner radii in use (8, 12, 16, 24, 32, 40px,
full) with 32px on almost every block, so the page reads soft and inflated. Type is flat: the
biggest section heading anywhere below the hero is 27px, the same as every other section title,
so nothing on the page is BIG. Fix the inner padding, cut the radius to a 3-step scale, flatten
the nesting, and give the proof band the one big headline.

## 1. Measured current values (1440 unless noted)

| Item | 1440 | 1024 | 768 | 375 |
|---|---|---|---|---|
| Ticker strip height | 40 | 40 | 40 | 40 |
| Header main row height / control height | 64 / 44 (10px above+below) | 64 / 44 | 64 / 44 | 64 / 44 |
| Search field width | 672 | 486 | **276 (placeholder cut: "Search rice, c")** | own row, 0px top gap |
| Aisle row height / link height | **45 / 44 (0px padding)** | 45 / 44 | hidden | hidden |
| Hero panel h / inner padding / radius | 414 / 40×48 / 32 | 435 | **740** | **826** / 24 |
| Hero photo frame | 397×327, cream 8px frame, 2.5° tilt | 343×283 | 397×327 | 305×252 |
| Hero small cards h / pad / radius | 217 / 20 / 32 (3-up) | 160 (2+1) | 170/166 (2+1) | 160/168/215 stacked |
| Dept tile h / photo | 250 / 166×166 arch, 20px top pad | 206 / 124 | 286 / 205 | **164 vs 192 (uneven)** / **88px arch** |
| Shelf card / image well / name / price / button | 189×330 r24 p12 / 165×132 (5:4) r16 / 14px 600 / **20px** / 44 pill | 147 / 123×98 | 201 / 177×141 | 144 / 120×96 / 18px |
| Product pack shots | 640×640 JPG on white, shown `object-contain p-2` in a 5:4 white well: product ~110px wide on a 189px card | | | |
| Baskets panel pad / card / photo | 32 / 371 r32 p12 / 347×217 r24 | 32 / 285 | 28 / **207 (3-up), photo 114 tall** | 20 / 242 rail |
| Gift banner (nested in baskets panel) | 1152×125, pad 24, r32 | 896×124 | 661×145 | **303×280, text column 255** |
| Proof band pad / h2 | 48 / **27px** in a 5/12 column | 48 / 26 | 48 / 25 | 40 / 23 |
| Jamaica band pad / h2 | 48 / 27 | 48 / 26 | 48 / 25 | 40 / 23 |
| Section titles (`text-title`) | 27 | 26 | 25 | 23 |
| Page height | 5,591 | 5,655 | 7,961 | 9,793 |

Radii in use: 4, 8, 12, 16, 24, 32 (`rounded-3xl`, 20+ blocks), 40 (`rounded-t-4xl`), full (every
button, search, basket). CLAUDE.md's scale is 4 / 8 / 12 / 16 / 24.

## 2. Page-wide systems (apply first; every section below refers to these)

**R1. Radius scale (P0).** Three steps plus pills, concentric (inner = outer − padding):
- Blocks and bands: `rounded-2xl` 24px (hero panel, baskets panel, gift block, closing panel,
  proof band top corners). Retire `rounded-3xl` (32) and `rounded-4xl` (40) on the home page.
- Cards: `rounded-xl` 16px (hero small cards, department tiles, basket cards, zone cards, step
  lanes); small product cards `rounded-lg` 12px.
- Images inside a card: `rounded-md` 8px (basket photo inset by `p-2` in a 16px card; product
  well in a 12px card with `p-3` → 8px). Images that fill a card edge to edge take no radius of
  their own; the card's `overflow-hidden` clips them. Standalone photos (Jamaica, closing): 16px.
- Actions and inputs: `rounded-md` 8px (Add, Add basket, Start shopping, search field, search
  submit, header basket). Pills `rounded-full` only for information: stickers, price tags, the
  "Save USD$…" chip, lane labels, the hero location badge, the ticker.
- Note: `BasketLink` and `ProductImage` are shared; add an optional `className`/`imgClassName`
  prop and pass the home values, so other pages do not change.

**R2. Vertical rhythm (P1).** Keep the owner's 40/48px between plain sections (already uniform:
`pt-10 md:pt-12`). Add:
- Header to hero: `pt-4 md:pt-6` (16 / 24; now 16 / 20).
- Title block to content: `mt-6` (24) everywhere (steps uses `mt-8`; change it).
- Card gaps: `gap-3` (12) below `sm`, `gap-4` (16) from `sm` (baskets uses `gap-5`; change it).
- Coloured full-bleed bands get real inner air: proof `section` (64 → 96px), Jamaica and
  closing `section-sm` (48 → 64px). Plain cream sections stay 40/48.

**R3. Type hierarchy (P0).** One scale, five tiers, one BIG moment:
| Tier | Role | Where | px 375 → 1440 |
|---|---|---|---|
| Big | `text-display` + `font-semibold` | proof band headline ONLY | 48 → 77 |
| Page | `text-h1` | hero h1 (owner: size is fine) | 33 → 46 |
| Band | `text-h2` | Jamaica, closing headlines | 28 → 35 |
| Section | `text-title` | department, shelf, baskets, gift, steps, FAQ titles | 23 → 27 |
| Card | `text-lead` 600 | hero small cards, dept names (16px at 375 via `text-body sm:text-lead`), basket names | 18 → 20 |
New role (built from nothing but a size, no colour): `--text-price: 1.125rem;
--text-price--line-height: 1.25;` = 18px, the owner's upercart price, used for shelf prices and
basket price stickers (now `text-lead`, 20px at 1440).

**R4. Section header row (P1).** At 375 "All departments" / "All groceries" wraps to its own 44px
line under the title (+52px per section, three times). Make the row `flex items-center
justify-between gap-4 flex-nowrap`; title left, link right with a short label ("See all" +
`sr-only` context) on phones; subtitle moves to its own line under the row.

## 3. Section by section

### 3.1 Header (owner point 1)
- **Main row cramped (P0).** 64px row around 44px controls = 10px air. Fix: row `h-16 md:h-[72px]
  lg:h-20` (64 / 72 / 80); search input `lg:min-h-12` (48) with the submit inset `top-1 right-1
  bottom-1`; header basket `min-h-12 rounded-md px-4` on lg. Result: 16px above/below on desktop,
  14 on tablet, 10 on phone (the phone keeps 64 because its search row sits right under it).
- **Tablet search squashed (P0).** At 768 the field is 276px and the placeholder cuts off. Show the
  inline search from `lg` only (`hidden lg:block`); the second search row shows `lg:hidden`.
- **Phone/tablet search row has no top air (P1).** It sits at 0px under the bar. Fix: `pt-1 pb-4`
  (4 / 16) so the row reads as part of the header with a clean 16px base.
- **Aisle row has 0px padding (P0).** 45px row, 44px links. Fix: `nav` gets `py-2` → 61px row;
  links `min-h-11 px-3 rounded-md` (8px, not pill), `gap-1`; divider `h-6`. Keep `border-b
  border-cream-deep`. Total header at 1440: 40 + 80 + 61 = 181px (now 150), sticky part 80px.
- **Logo (P2).** 39px tall in an 80px row is right; give the wordmark link `py-2` so its focus
  ring has room.

### 3.2 Hero: one panel + three small cards as one composition (owner point 2)
**Structure (P0).** Replace "panel, then a row of three" with a retail banner grid, the pattern
grocery sites use (main banner + side banners):
- **xl (≥1280):** `grid grid-cols-12 gap-4`. Panel `col-span-9 row-span-3 min-h-[480px]`; the
  three cards `col-span-3`, stacked in the right column, rows stretch to the panel height
  (`grid-rows-3`) → each about 908×480 panel, 292×149 cards. All four share top and bottom edges.
- **lg (1024–1279):** panel full width `min-h-[440px]`; cards `grid-cols-3` below, each 309 wide,
  `min-h-32` (128).
- **md (768):** panel full width `min-h-[400px]` with the split kept (text 7 / photo 5); cards
  `grid-cols-3`, 228 wide, visual hidden (`md:hidden lg:block`), about 128 tall.
- **<md (375):** panel stacked (photo on top), cards stacked as compact rows, `gap-3`.

**The crimson panel (P0).** It looks cheap because the photo is a small tilted polaroid (397×327,
cream frame, rotation) floating in a big flat red field with a sticker and a note hanging off it:
scrapbook clutter, not a premium banner. Fix:
- Panel `rounded-2xl overflow-hidden bg-crimson grid md:grid-cols-12`. Text cell `md:col-span-7
  px-6 py-8 md:px-10 md:py-10 xl:px-12 xl:py-12`, content vertically centred.
- Photo cell `md:col-span-5`: the photo FILLS it edge to edge, full panel height, no frame, no
  tilt, no radius of its own (`h-full w-full object-cover object-[center_60%]`). At 375 it sits on
  top, `aspect-[16/10]`, flush to the panel's top and sides. Red and photo meet on one clean
  vertical seam: that seam is what makes it look like a real shop banner.
- Sticker ("Bought in Jamaica. Nothing is shipped."): inside the photo, `absolute top-5 right-5`,
  `size-24` (96; `size-20` at 375), keeps its 10° tilt and bob. No longer hangs off the panel.
- Gift note: `hidden lg:block`, `absolute bottom-6 -left-8` of the photo cell so it crosses the
  red/photo seam, `w-44`, −4° tilt, `px-4 py-3`. Below lg it is dropped (the gift block in 3.5
  carries the idea).
- Remove the three ticks from the panel: the three cards say the same, and this frees ~50px.
- Primary action `min-h-12 rounded-md bg-cream px-6 text-small font-semibold`; at 375 `w-full`,
  with "See ready-made baskets" under it.
- Expected panel height at 375: about 620px (now 826). At 1440: 480 (now 414 + 217 + 16 = 647
  for panel plus row; the new composition is 480 total, a fold that shows the whole offer).

**Three small cards (P0): smaller, one anatomy, real padding.** Now 217px tall with photos and a
receipt cropped off the bottom edge and one card holding three list lines. Make all three the
same anatomy: `rounded-xl p-5 grid grid-cols-[1fr_auto] items-center gap-4`. Left: title
`text-lead font-semibold leading-tight`, one `text-small` line, then a `text-small font-semibold`
link or sticker (`mt-2`). Right: one 80×80 visual (`size-20 rounded-md`, `size-16` at 375) that
sits INSIDE the padding, never cropped by the edge: basket photo (mango card), a mini receipt
(leaf card, `w-16 h-20` paper, 4 lines), a `MapPin` in a `bg-surface-selected` disc (white card).
White card copy shrinks to the parish line + "Delivery from USD$8" (the same-day aim already runs
in the ticker). Keep `card-rise`. At 375 each row is about 112px tall (now 160–215).

### 3.3 Departments (owner point 3)
- **Arch frame (P0).** The photo is a 166px arch (88px at 375) floating in a tinted tile, with the
  tile's padding around it; Baby's white-background photo reads as a hole. Fix: the photo FILLS
  the top of the tile edge to edge. Tile `rounded-xl overflow-hidden flex flex-col` (no padding);
  photo first, `aspect-[4/3] w-full object-cover`, no own radius; label strip under it on the tint
  `px-4 py-3 sm:px-5 sm:py-4`: name `text-body sm:text-lead font-semibold truncate`, count
  `text-xs text-ink-body`. Object positions: groceries `object-center`, household
  `object-[center_35%]`, pharmacy `object-center`, baby `object-top`.
- **Arrow disc (P1).** Moves onto the photo, `absolute top-3 right-3 size-9 bg-surface`, crimson
  fill on hover. This frees the label strip so "Baby & Child" stays one line.
- **Uneven heights at 375 (P0).** 164 vs 192px because "Baby & Child" wraps. Fixed by the
  truncate + arrow move; tiles are then 166 wide → photo 125 + strip 64 = 189 each, all equal.
- Sizes after: 1440 tile 292 → photo 219 + strip 72 = 291; 1024 228 → 171 + 68.

### 3.4 Shelf: "Staples for the kitchen" (owner point 4)
- **Roundness (P0).** Card 24, well 16, pill buttons. Fix per R1: card `rounded-lg` (12)
  `border border-line bg-surface p-3 hover:border-line-hover`; well `rounded-md` (8).
- **Image well (P0).** Square 640px pack shots squeezed into a 5:4 white well with `p-2` → the
  product floats small and undefined on white. Fix: well `aspect-square bg-surface-muted
  rounded-md`, image `object-contain p-3 mix-blend-multiply` (the JPG's white background drops
  into the grey tile, so every product sits on the same defined grey square, as on upercart).
  Needs an `imgClassName` prop on `ProductImage` (shared).
- **Row alignment (P1).** Prices sit at different heights (Grace Baked Beans 5px higher) because
  the name block is `min-h-[3.25rem]` (52) but name + size need 57. Fix: name `line-clamp-2
  h-[2lh]` (reserves two lines), size `mt-0.5 text-xs truncate`, so price, J$ line and button
  align across the row.
- **Price (P1).** `text-lead` = 20px at 1440; owner asked 18. Use the new `text-price` (18).
- **Button (P0).** Five solid crimson pills + a crimson end card = a wall of red that drowns the
  products. Fix: `min-h-control w-full rounded-md border-2 border-crimson bg-surface text-crimson
  text-small font-semibold`, hover slides crimson in with `text-on-dark` (`btn-slide`,
  `--slide: var(--color-crimson)`); "Added" stays solid leaf. Solid crimson stays for the basket
  cards' single "Add basket" and the end card.
- Card padding: text block `px-1` inside `p-3` so text lines up with the product, not the card
  edge. End card `rounded-lg` to match.

### 3.5 Ready-made baskets + gift block (owner points 5, 6)
- **Baskets (P1, tune only).** Panel `rounded-2xl p-5 md:p-6 lg:p-8` (was p-8, r32). Card
  `rounded-xl p-2 bg-cream`; photo `rounded-md` (concentric with p-2); text `px-3 pt-7 pb-3`.
  Price sticker `text-price`. Buttons `rounded-md`, "Not available today" `rounded-md`.
- **768 basket cards are 207px wide with 114px photos (P1).** Keep the rail through md
  (`w-[46%]`), grid `lg:grid-cols-3`.
- **Gift banner (P0).** It is a box inside the white panel inside the gutter: 60px of stacked
  padding from the screen edge at 375 leaves a 255px text column and a 280px-tall block; at 1440 it
  is a thin 125px strip whose note, text and link float with no grid. Fix: take it OUT of the
  baskets panel and make it its own block after it (`pt-10 md:pt-12`, `max-w-wide gutter`):
  `rounded-2xl bg-surface-selected grid items-center gap-6 px-6 py-8 md:grid-cols-12 md:px-10
  md:py-10 lg:px-14 lg:py-12`. Note `md:col-span-4 justify-self-center`, bigger paper
  (`px-6 py-5 font-hand text-[2rem] leading-none -rotate-3 shadow-lift`); text `md:col-span-5`:
  title `text-title` "Add a note.", body `text-small max-w-md`; action `md:col-span-3
  md:justify-self-end` as an outline button (`rounded-md border-2 border-crimson min-h-control
  px-5`), "Gifts and occasions". At 375: note, title, body, full-width button; block about 300px
  tall with a 295px text column.

### 3.6 Proof band, "Send groceries, not money." (owner point 7): the BIG moment
- **Headline (P0).** 27px in a 5/12 column: the same size as every section title. Fix: this is the
  one place on the page that goes big: `text-display font-semibold` (48px at 375, 77px at 1440;
  weight 600 per the owner, line-height 0.95 from the role), `text-balance max-w-[12ch]`,
  `text-on-dark`. No word accented in another colour.
- **Structure (P0).** A 77px headline does not fit a 5/12 column. New structure, `section`
  padding (64 → 96): row 1 `grid lg:grid-cols-12 items-end gap-6`: headline `lg:col-span-7` (two
  lines: "Send groceries, / not money."), body `lg:col-span-5 text-body text-on-oxblood-muted
  max-w-md`. Row 2 `mt-12 lg:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start`: the
  three pieces of evidence side by side, each with its caption: 1. the till receipt, 2. the photo
  at the door, 3. the two texts. Drop the 3-line checklist (the captions say the same). Link
  "See the full journey of an order" `mt-10` under row 2.
- Corners: `rounded-t-2xl` (24, was 40). Door photo frame `rounded-xl p-2`, photo `rounded-md`.
- 375: headline 3 lines at 48px, body, then receipt, door photo, texts stacked, `gap-8`.

### 3.7 Steps (not raised by the owner, rhythm only, P2)
Lanes `rounded-xl` (was 32), step cards `rounded-lg` (was 24), title-to-content `mt-6`.

### 3.8 Jamaica band (owner point 8: almost fine, P2)
`section-sm` (48 → 64); headline `text-h2` (band tier); zone cards `rounded-xl`; photo
`rounded-xl` (was 32). Nothing else.

### 3.9 FAQ and closing (P2, rhythm only)
Closing panel `rounded-2xl`, headline `text-h2`, text cell `p-6 sm:p-10 lg:p-12`, button
`rounded-md min-h-12`. FAQ unchanged by this lens (motion is another auditor's lens).

## 4. Owner point 10 (decisions are ours)
Every value above is a decision, not an option. Photos stay; only their framing changes (hero
photo full-bleed in its cell, department photos edge to edge, product shots on a grey well).

## 5. Acceptance checks for this lens
- [ ] Header: main row 80 / 72 / 64 at 1440 / 768 / 375; aisle row 61 with 8px above and below links.
- [ ] Tablet search on its own row; no placeholder cut-off at 768.
- [ ] Hero at 1440: panel and three cards share top and bottom edges; cards ≤ 160px tall at all
      widths; nothing cropped by a card edge; 375 panel ≤ 640px.
- [ ] Department photos touch the tile's top, left and right edges; four tiles equal height at 375.
- [ ] Shelf: square grey wells, 12px card / 8px well / 8px button; prices 18px and on one baseline.
- [ ] Gift block is not nested; text column ≥ 290px at 375.
- [ ] Proof headline renders 77px at 1440 and 48px at 375; it is the largest text on the page.
- [ ] No radius above 24px anywhere on the home page; buttons 8px; pills only for information.
- [ ] Title-to-content 24px in every section; plain sections 40/48 apart; bands 64–96 inside.
