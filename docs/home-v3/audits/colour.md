# Home v3.3 colour audit (November 13, 2026)

Scope: `/` only. Method: Playwright (chromium, cookie banner "Essential only", page scrolled
before full-page shots) at 1440 and 375; computed `background-color`, `color` and border colours
for every rendered element; effective background found by compositing ancestors; screen-area
share measured by classifying every pixel of the full-page shot against the tokens (±6 RGB).
Skills: `frontend-design` (two-pass, generic-default check) and `ui-ux-pro-max`
(`--domain color` "grocery ecommerce warm", "red brand food delivery"; `--domain ux` "text
contrast ratio"). Rejected from the search: green-primary grocery palettes (#059669), orange
food-delivery primaries, "warm gold" accents and pink-tint backgrounds (#FEF2F2): each would
replace or soften the client's crimson. Kept from it: one appetising warm accent next to the
primary, and 4.5:1 for all body text.

Shots: `scratchpad/colour/home-1440.png`, `home-375.png` (page 6,140px / 9,962px tall).

## 1. Inventory (what actually renders)

Area = share of the full-page pixels at 1440 (375 in brackets). Count = elements using it.

| Role             | Hex       | Where used                                                                 | Count (bg / text / border) | Area           |
| ---------------- | --------- | -------------------------------------------------------------------------- | -------------------------- | -------------- |
| cream            | `#FFF8EE` | page, search field, hero + closing CTA, basket cards, proof door frame     | 9 / 0 / 0                  | 26.6% (17.3%)  |
| oxblood          | `#4A0B1C` | ticker strip, proof band, footer                                           | 3 / 0 / 0                  | 20.7% (21.8%)  |
| surface          | `#FFFFFF` | header, shelf cards, baskets panel, hero card 3, steps cards, FAQ, text    | 31 / 56 / 0                | 14.7% (19.1%)  |
| leaf             | `#16603D` | Jamaica band, hero proof card, steps pill, numerals 3–4, WhatsApp link     | 3 / 3 / 0                  | 6.9% (6.3%)    |
| crimson          | `#AE0E31` | hero banner, closing, "All groceries" tile, Add/Search buttons, links      | 9 / 21 / 9                 | 6.2% (6.8%)    |
| surface-selected | `#FFE8EE` | gift block, "You, overseas" lane, Baby tile, location disc, wordmark pill  | 5 / 0 / 0                  | 3.0% (3.3%)    |
| leaf-soft        | `#DDF0E1` | Jamaica lane, Household tile, SMS bubbles, "Save" pills                    | 7 / 0 / 0                  | 1.5% (2.5%)    |
| surface-muted    | `#F0F0F0` | shelf product wells                                                        | 5 / 0 / 0                  | 1.1% (0.6%)    |
| leaf-deep        | `#0F4A2F` | zone cards in the Jamaica band; "Save" pill text                           | 2 / 3 / 0                  | 1.0% (3.0%)    |
| ink              | `#2B2326` | headings, prices, "from USD$59" pill, demo bar                             | 2 / 72 / 0                 | 0.8% (0.8%)    |
| mango            | `#FFC83D` | hero baskets card, stickers, ticker dots, Kingston label, fees on leaf     | 14 / 3 / 0                 | 0.7% (1.2%)    |
| page             | `#F7F7F7` | StockPhoto well under every photo (`bg-page` in `stock-photo.tsx`)         | 12 / 0 / 0                 | 0.3% (0.3%)    |
| mango-soft       | `#FFF0C4` | Groceries tile                                                             | 1 / 0 / 0                  | 0.2%           |
| sky-soft         | `#DDEBF8` | Pharmacy tile                                                              | 1 / 0 / 0                  | 0.2%           |
| crimson-deep     | `#7A0A23` | CTA text on cream, hand note, hero pill, basket count                      | 2 / 7 / 0                  | 0.1%           |
| cream-deep       | `#F5E8D3` | header borders, aisle divider, basket image well, photo pulse, skeleton    | 1 / 0 / 2                  | <0.1%          |
| ink-body         | `#474747` | paragraphs                                                                 | – / 41 / –                 | –              |
| ink-muted        | `#666666` | sizes, J$ guides, help text                                                | – / 16 / –                 | –              |
| on-oxblood-muted | `#C3BABD` | proof captions, footer links                                               | – / 34 / –                 | –              |
| on-leaf-muted    | `#CFE6D6` | Jamaica band help text, zone labels                                        | – / 8 / –                  | –              |
| on-crimson-muted | `#F3DBE0` | hero and closing body                                                      | – / 2 / –                  | –              |
| line             | `#E5E5E5` | shelf cards, receipt rules, FAQ dividers (7 of 13 sit on cream)            | – / – / 13                 | –              |
| line-strong / line-on-dark / blush | `#858585` / `#6E3848` / `#FFC6D3` | search border / footer rule / "East"       | 1 border / 1 / 1 text      | –              |

Hues competing on one page: crimson family, green, yellow, pink, blue, peach-cream, and two
temperatures of neutral (warm cream vs cool `#F0F0F0`/`#F7F7F7`/`#E5E5E5`). That is seven.

## 2. Contrast (every text/background pair rendered, plus focus and the pairs proposed below)

| Pair (text on background)                     | Ratio | AA            |
| --------------------------------------------- | ----- | ------------- |
| ink on surface / cream / page                 | 15.32 / 14.52 / 14.30 | pass |
| ink-body on surface / cream / page            | 9.29 / 8.81 / 8.67 | pass |
| ink-muted on surface / cream / page (12px min) | 5.74 / 5.44 / 5.36 | pass |
| on-dark on crimson (14px/600 min)             | 7.22  | pass          |
| crimson on surface / cream / page             | 7.22 / 6.85 / 6.74 | pass |
| crimson-deep on surface / cream / mango       | 11.08 / 10.51 / 7.17 | pass |
| on-crimson-muted on crimson                   | 5.51  | pass          |
| on-dark / on-oxblood-muted on oxblood         | 15.49 / 8.17 | pass   |
| blush on oxblood ("East", 24px)               | 10.53 | pass          |
| on-dark / on-leaf-muted on leaf               | 7.57 / 5.75 | pass    |
| on-dark / on-leaf-muted / mango on leaf-deep  | 10.29 / 7.81 / 6.65 | pass |
| mango on leaf (hero "How proof works", 14px)  | 4.89  | pass, 0.39 spare |
| ink on mango / ink-body on mango              | 9.91 / 6.01 | pass    |
| ink on leaf-soft / leaf-deep on leaf-soft     | 12.85 / 8.64 | pass   |
| ink on mango-soft / sky-soft / surface-selected | 13.50 / 12.63 / 13.15 | pass |
| leaf on surface / cream (numerals, WhatsApp)  | 7.57 / 7.18 | pass    |
| mango on oxblood (proposed hero card link)    | 10.02 | pass          |
| **Focus: mango outline on cream (hero proof card)** | **1.47** | **fail (3:1, WCAG 1.4.11)** |
| Focus: signal on page / surface               | 4.47 / 4.79 | pass (3:1) |
| Focus: blush on crimson / oxblood             | 4.91 / 10.53 | pass   |
| Edge: crimson vs leaf (hero cards side by side) | 1.05 | same luminance: the edge vibrates |
| Edge: surface vs cream / page (card on page)  | 1.05 / 1.07 | cards need a line or a fill change |

All text passes. One focus ring fails. The problems are balance and shade, not legibility.

## 3. Findings and decisions

**F1. The ruling brand red is out-weighed by green. P0.** Measured: crimson covers 6.2% of the
page at 1440; leaf + leaf-deep + leaf-soft cover 9.4%. In the middle 3,500px (shelf to FAQ)
crimson appears only as buttons and links. The owner's rule is that red stands out as large
solid blocks. **Decision:** the gift block becomes a solid crimson block (F4) and the hero proof
card leaves green (F2). Result: crimson ≈ 9.3%, green ≈ 8.4%, oxblood unchanged. No new hex.
**Why:** red becomes the most-used chromatic colour on the page again, at both ends and in the
middle, without adding a hue.

**F2. Hero: red, gold and green as equal blocks; crimson and leaf at equal luminance. P0.**
Measured: crimson banner beside a mango card and a leaf card; crimson vs leaf luminance ratio
1.05, so the shared 16px gap shimmers (complementary hues, same lightness). Red-gold-green in
equal blocks also reads as the Rasta tricolour, a tourist cliché for a family shop. And the leaf
card's `focus-visible:outline-mango` ring is 1.47:1 on the page (fails 1.4.11).
**Decision (`src/components/home/hero.tsx`):** baskets card `bg-mango text-ink` → `bg-surface
text-ink`; its price pill `bg-ink text-on-dark` → `bg-mango text-ink` (a sticker, mango's job).
Proof card `bg-leaf` → `bg-oxblood`, `text-on-leaf-muted` → `text-on-oxblood-muted`,
delete `focus-visible:outline-mango` (default signal ring, 4.47 on page). `text-mango` link stays
(10.02 on oxblood). **Why:** the first screen becomes crimson + oxblood + white with one yellow
sticker: all brand, one food accent, and "oxblood = proof" now matches the proof band below.

**F3. Cream page: retire it, go back to the neutral page. P1.** Measured: cream is the largest
colour on the page (26.6%), yet every neutral inside it is cool grey: photo wells `#F7F7F7`
(12), product wells `#F0F0F0` (5), lines `#E5E5E5` (7 of 13 sit on cream). Two temperatures of
neutral read as slightly dirty grey patches on peach. A warm yellow surround also shifts the
eye's read of crimson toward blue-pink (simultaneous contrast), which works against "never
pinkish". The client's pack shots are on white; upercart, the client's reference, sits on white
and light grey. Cream + crimson is also the closest this page comes to the generic "warm cream
page" default. Warmth now comes from the food photos, crimson, oxblood and mango, where it is
earned. **Decision:** page background `bg-cream` → `bg-page` (`#F7F7F7`, grey-50). Delete roles
`cream`, `cream-deep` and primitives `--cream-50`, `--cream-200`. Class changes:
`(home)/layout.tsx` `bg-cream` → `bg-page`; `header.tsx` search `bg-cream` → `bg-surface`,
`hover:bg-cream` (aisles, account) → `hover:bg-surface-muted`, `border-cream-deep` ×2 →
`border-line`, divider `bg-cream-deep` → `bg-line`; `hero.tsx` and `closing.tsx` CTA `bg-cream`
→ `bg-surface` (crimson-deep text 11.08); `shelf.tsx` arrow disc `bg-cream` → `bg-surface`;
`proof.tsx` door frame `bg-cream` → `bg-surface`; `departments.tsx` fallback `bg-cream-deep` →
`bg-surface`; `(home)/loading.tsx` `bg-cream-deep` ×4 → `bg-surface-strong`; `globals.css`
`photo-loading` `var(--color-cream-deep)` → `var(--color-surface-muted)`.
**Why:** one neutral family from page to well to line; the crimson reads redder; the home page
and the rest of the site share one page colour, so the roll-out to other pages costs nothing.

**F4. Pink fills used as blocks. P0.** Measured: `surface-selected` `#FFE8EE` fills 3.0% of the
page in three large places: the full-width gift block (1216×225), the "You, overseas" steps lane
(600×330) and the Baby & Child tile. At that size it is pink, not red. **Decision:** the crimson-100
tint is kept only for marks of 80px or less (wordmark pill, hero location disc, selected states).
`gift-note.tsx`: block `bg-surface-selected` → `bg-crimson text-on-dark on-dark-focus`; h2
`text-ink` → `text-on-dark` (7.22); body `text-ink-body` → `text-on-crimson-muted` (5.51); button
`border-2 border-crimson bg-surface text-crimson [--slide:var(--color-crimson)] hover:text-on-dark`
→ `bg-surface text-crimson-deep [--slide:var(--color-mango)]` (the hero CTA's recipe, 7.17 on the
mango fill). The note card stays white with crimson-deep handwriting (11.08). Steps and Baby tile:
see F5 and F6. **Why:** the gift moment becomes a red block with a white paper tag on it, which
is warmer and more "brand" than a pink panel.

**F5. Steps: two tinted lanes boxed around white cards. P1.** Measured: pink lane + leaf-soft
lane, each 3 levels deep (page → lane → card). **Decision (`steps.tsx`):** lane fills
`bg-surface-selected` / `bg-leaf-soft` → none (drop the fill and the `p-5 sm:p-6` padding); the
crimson and leaf pills and the numeral colours carry the two lanes. Step cards stay `bg-surface`
on the page. **Why:** removes two tints and one level of nesting; colour coding stays in the
pill, where it carries information.

**F6. Departments: four pastels, one of them a fifth hue. P1.** Measured: mango-soft, leaf-soft,
sky-soft and pink strips, 0.2% each; sky is the only blue on the page and the four together read
as an Easter-egg chart rather than a shop. **Decision (`departments.tsx`):** every `tint` →
`bg-surface`; delete `mango-soft`, `sky-soft` roles and `--mango-100`, `--sky-100` primitives.
**Why:** the photos already tell the departments apart; white name strips match the shelf cards.

**F7. Baskets: cream cards inside a white panel, title indented 16px. P1.** Measured: the panel's
padding pushes "Ready-made baskets" to x=72 while every other title starts at x=56; cards are
cream on white (1.05 edge). **Decision (`baskets.tsx`):** panel `rounded-2xl bg-surface p-5
md:p-6 lg:p-8` → no fill, no padding; cards `bg-cream` → `bg-surface border border-line`; image
well `bg-cream-deep` → `bg-surface-muted`. **Why:** same card language as the shelf; titles align.

**F8. Leaf shade. P2.** `leaf` `#16603D` (hue 152°, 7.57:1 with white) is right: dark enough to
hold white text, far enough from the bright flag green `#009B3A` (3.6:1, fails) to read as
produce, not flag. With F2 it no longer touches crimson. But `leaf-soft` `#DDF0E1` sits at hue
133°, a yellower green than the solid it pairs with. **Decision:** `--leaf-100` `#DDF0E1` →
`#DBF0E6` (hue 150°); role `leaf-soft` unchanged. Move `--color-on-leaf-muted: #cfe6d6` to a
primitive `--leaf-50: #cfe6d6` and point the role at it (it is the only raw hex among the produce
roles). **Why:** one green family on one hue axis.

**F9. Mango shade. P2.** `#FFC83D` (hue 43°) is a warm egg-yolk, not lemon; as a 400×150 card it
shouted "fast food" next to crimson; as a 64–80px sticker it is exactly right (ink 9.91).
**Decision:** keep the hex; mango is never a card or band fill (stickers, price tags, ticker dots,
the photo label, fees on leaf, CTA hover fill, link underline on leaf). **Why:** a highlight works
only while it stays rare: 0.7% of the page is the right dose.

**F10. Muted text tints. Pass, no change.** on-crimson-muted 5.51, on-oxblood-muted 8.17,
on-leaf-muted 5.75: each is a tint of its own band, none chalky. Keep.

**F11. Tests. P0 (follows F3–F8).** `src/lib/design-tokens.test.ts` lines 100–114 pair `cream`,
`cream-deep`, `mango-soft`, `sky-soft`: remove those pairs; add `['ink','page',4.5]`,
`['signal','page',3]`, `['line-strong','page',3]`,
`['on-oxblood-muted','oxblood',4.5]`, `['crimson-deep','mango',4.5]`, `['leaf-deep','leaf-soft',4.5]`
(new `#DBF0E6`). Update `docs/TOKENS.md` and `docs/home-v3/PLAN.md` §2 table.

## 4. The final palette

| Name         | Hex       | One job                                                              |
| ------------ | --------- | -------------------------------------------------------------------- |
| Crimson      | `#AE0E31` | the brand: hero, gift and closing blocks, every primary action       |
| Crimson-deep | `#7A0A23` | pressed/hover red; red text on white CTAs and the hand-written note  |
| Oxblood      | `#4A0B1C` | depth and proof: ticker, hero proof card, proof band, footer         |
| Leaf         | `#16603D` | Jamaica: the delivery band, "in Jamaica" lane, delivered and added   |
| Mango        | `#FFC83D` | prices and one highlight per block, stickers only, never a fill      |
| Ink          | `#2B2326` | headings, prices and labels                                          |
| Page         | `#F7F7F7` | the counter: the page behind everything                              |
| Surface      | `#FFFFFF` | cards, header, fields, the paper of the receipt and the note         |

Support only: blush (focus on dark, "East"), signal (focus on light), leaf-deep and leaf-soft
(inside the Jamaica band, SMS bubbles, "Save" pills), crimson-100 (marks ≤ 80px). Gone: cream,
cream-deep, mango-soft, sky-soft.

Section sequence, top to bottom:

1. Ticker strip: oxblood
2. Header and aisles: white, `line` border
3. Hero: page; crimson banner + white baskets card (mango sticker) + oxblood proof card + white delivery card
4. Departments: page; photo tiles with white name strips
5. Staples shelf: page; white cards, one crimson "All groceries" tile
6. Ready-made baskets: page; white cards, mango price stickers, crimson Add buttons
7. Gift note: **crimson block**, white paper note
8. Proof: **oxblood band**, full bleed
9. Steps: page; crimson and leaf pills, white step cards
10. Jamaica: **leaf band**, leaf-deep zone cards, mango fees
11. Questions: page; white accordion
12. Closing: **crimson block**
13. Footer: **oxblood**

Rhythm: light, red, light ×3, red → deep red, light, green, light, red → deep red. The two
"crimson then oxblood" pairs (gift → proof, closing → footer) rhyme on purpose; green appears
once, as Jamaica.

## 5. Acceptance checklist

- [ ] Pixel share at 1440: crimson ≥ 8.5% and above leaf + leaf-deep + leaf-soft combined.
- [ ] No element on `/` renders `#FFF8EE`, `#F5E8D3`, `#FFF0C4` or `#DDEBF8`; roles and primitives deleted.
- [ ] `#FFE8EE` renders on nothing larger than 80×80px.
- [ ] Mango is never the background of an element wider than 160px.
- [ ] No leaf block touches a crimson block in the first viewport at 375, 768, 1024, 1440.
- [ ] Page background `#F7F7F7`; every neutral on the page is from the grey ramp (no warm neutral).
- [ ] Every text pair ≥ 4.5:1 (≥ 3:1 for 24px+); every focus ring ≥ 3:1 against its surroundings
      (the hero proof card is the link itself: its ring is signal on the page, 4.47).
- [ ] "Ready-made baskets" title starts at the same x as the other section titles.
- [ ] `src/lib/design-tokens.test.ts` updated as F11; `npm run check` green.
- [ ] Before/after shots at 375 / 768 / 1024 / 1440 compared; photos loaded.
