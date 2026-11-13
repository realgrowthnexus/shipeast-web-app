# Home page v3: "the shop, sent home"

Planned from zero on November 13, 2026, for the owner's Phase 1 review. Only `/` changes. The
page gets its own route group, header, footer, fonts and palette, so every other page stays
exactly as it was.

## 1. Brief

- **Who:** a Jamaican overseas, mostly on a phone, buying for a mother or grandmother in
  St. Thomas or Kingston. First visit, has never heard of ShipEast.
- **Job of the page:** make it feel like a real grocery shop within one screen, show that
  the order is provable, and get a basket started.
- **What was wrong before (owner):** it looked corporate. Stock photos of people on phones and
  laptops, one quiet layout repeated, very little food, no prices above the fold.
- **What the client pointed at:** upercart.com (a storefront: banners, category tiles with
  product pictures, product rails with prices). His brand is red and must stand out.
- **Edge to show:** proof (photo of the till receipt, photo at the door), pay in US dollars,
  nothing is shipped, the family installs nothing.

## 2. Direction

A grocery storefront with the energy of a supermarket flyer: big solid colour blocks, price
stickers, food in every screen, and one handwritten note because the order is a gift. Red is
still the owner of the page. Green and mango yellow come in as the colours of produce and of
Jamaica, each with one job.

### Tokens (new roles, added to `globals.css`)

| Role                                                                              | Hex       | Job                                                                     |
| --------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| `cream`                                                                           | `#FFF8EE` | the home page background: warm, so food photos sit on it like a counter |
| `cream-deep`                                                                      | `#F5E8D3` | photo wells, quiet tiles, borders on cream                              |
| `leaf`                                                                            | `#16603D` | the Jamaica band, "added" and "delivered" ticks                         |
| `leaf-deep`                                                                       | `#0F4A2F` | hover on leaf, panels inside the leaf band                              |
| `leaf-soft`                                                                       | `#DDF0E1` | tile tint (Household), the Jamaica-side lane in the steps               |
| `mango`                                                                           | `#FFC83D` | price stickers and one highlight per block                              |
| `mango-soft`                                                                      | `#FFF0C4` | tile tint (Groceries), sticker shadow blocks                            |
| `sky-soft`                                                                        | `#DDEBF8` | tile tint (Pharmacy)                                                    |
| existing `crimson`, `crimson-deep`, `oxblood`, `blush`, `surface-selected`, `ink` |           | brand blocks, actions, the proof band, tile tint (Baby & Child)         |

### Type

- **Display: Bricolage Grotesque** 700/800. Chunky, slightly irregular, reads like painted
  shop signage. Used for every heading on the page.
- **Body: Figtree** (unchanged) 400–700.
- **Hand: Caveat** 700, only for the gift note (hero and the baskets note). The client asked
  for a script accent in his first brief.
- New sizes: `text-mega` (44 → 84px, the hero line), `text-shout` (34 → 58px, section
  headlines in colour bands). Section headings use the existing `text-h2` in the display face.

### Principles

1. Food or a price is visible in every screenful.
2. One bold place: the hero bento. Everything after it is calmer.
3. Colour blocks are flat and large. No gradients, no glass.
4. Every number is real data (prices, counts, fees, cut-offs). Examples are labelled as examples.
5. Corners are generous (24–32px) on blocks, round on stickers and pills.

## 3. Structure blueprint

Container: `max-w-wide` (1280px) with the page gutter. Page background `cream`.

```
1440px                                           375px
┌ strip: oxblood, 40px ────────────────────┐    ┌ strip (one line) ┐
├ header: white, 76px + aisle row 48px ────┤    ├ header 64px      ┤
│ ┌──────────────────────────────────────┐ │    ├ search row       ┤
│ │ HERO A crimson                       │ │    │ HERO A (text,    │
│ │ words · CTA · photo + note + sticker │ │    │   then photo)    │
│ └──────────────────────────────────────┘ │    │ B mango          │
│ ┌ B mango ───┐ ┌ C leaf ────┐ ┌ D white ┐ │    │ C leaf           │
│ └────────────┘ └────────────┘ └─────────┘ │    │ D white          │
│                                          │    │ departments 2×2  │
│ DEPARTMENTS 4 colour tiles               │    │ shelf (rail →)   │
│ SHELF 5 product cards + "see all"        │    │ baskets (rail →) │
│ BASKETS 3 hamper cards + gift note strip │    │ proof (stacked)  │
├ PROOF band: oxblood, full bleed ─────────┤    │ steps (vertical) │
│ STEPS 4, two lanes                       │    │ Jamaica band     │
├ JAMAICA band: leaf, full bleed ──────────┤    │ questions        │
│ QUESTIONS 5/7 split                      │    │ closing block    │
│ CLOSING crimson block with photo         │    │ footer           │
├ FOOTER oxblood, giant wordmark ──────────┤    └──────────────────┘
```

| #   | Section     | Pattern                                    | Background                                                             | Columns 375 / 768 / 1024 / 1440                                                               | Blocks                                                                                                                                                                                                      |
| --- | ----------- | ------------------------------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | Strip       | one-line bar                               | `oxblood`, full bleed, 40px                                            | coverage only / + cut-off / + links / same                                                    | flag + "Delivering to St. Thomas and Kingston"; cut-off note; Track an order, Questions                                                                                                                     |
| 1   | Header      | two-row store header, sticky row 1         | `surface`                                                              | logo, account, basket, menu + search row / logo, search, account, basket / + aisle row / same | wordmark; pill search 48px with crimson button; account; basket pill with count; aisle row: 4 departments with icons, then Baskets, Gifts, How it works                                                     |
| 2   | Hero        | bento: one large block + two stacked tiles | `cream` page; A `crimson`, B `mango`, C `leaf`; radius 32px            | A, then B and C side by side / same / A 8 cols + B,C 4 cols / same, min-height 560px          | A: coverage pill, h1, lead, 2 actions, 3 ticks, photo card with gift note and "delivered" chip. B: "Ready-made baskets", from-price sticker, photo. C: "See the receipt. See the door.", mini receipt, link |
| 3   | Facts       | 4-cell bar                                 | `surface` card on cream, radius 24px                                   | 2×2 / 4 / 4 / 4                                                                               | icon disc + two lines each: pay in US dollars; bought in Jamaica, nothing shipped; photo of the receipt; photo at the door                                                                                  |
| 4   | Departments | 4 colour tiles                             | cream; tiles `mango-soft`, `leaf-soft`, `sky-soft`, `surface-selected` | 2×2 / 4 / 4 / 4, tile 1:1.15                                                                  | name, real item count, round arrow, photo filling the lower half                                                                                                                                            |
| 5   | Shelf       | product rail / grid                        | cream                                                                  | rail 2.3 cards / 3.3 / 5 + tile / 5 + tile                                                    | card: photo 1:1 on `cream-deep`, name, size, USD$ price, about J$, Add button. Last cell: crimson "All groceries" tile                                                                                      |
| 6   | Baskets     | 3 hamper cards + note strip                | `surface` panel, radius 32px, inside cream                             | rail / 2 + rail / 3 / 3                                                                       | card: photo 4:3 with mango price sticker, name, first 4 items with quantities + "and N more", saving, Add. Strip: handwritten note sample + one line on the printed gift note                               |
| 7   | Proof       | split 5/7 in a dark band                   | `oxblood`, full bleed, radius 40px top                                 | stacked / stacked / 5 + 7 / same                                                              | left: headline "Send groceries, not money.", two sentences, link. Right: receipt card (real basket, J$), door photo card, two example family texts                                                          |
| 8   | Steps       | 4 steps on a route line, two lanes         | cream                                                                  | vertical list / 2×2 / 4 across / same                                                         | lane labels "You, overseas" (1–2) and "ShipEast, in Jamaica" (3–4); numbered disc, icon, title, one sentence                                                                                                |
| 9   | Jamaica     | split 6/6 in a colour band                 | `leaf`, full bleed                                                     | stacked / stacked / 6 + 6 / same                                                              | left: headline, zone cards (fee, cut-off, minimum from data), link. Right: Kingston street photo, radius 32px, with a mango "pin" label                                                                     |
| 10  | Questions   | split 4/8                                  | cream                                                                  | stacked / stacked / 4 + 8 / same                                                              | heading, WhatsApp or email; accordion of 5 real FAQs                                                                                                                                                        |
| 11  | Closing     | one block, words + photo                   | `crimson` block, radius 32px, inside cream                             | stacked / 7 + 5 / same / same                                                                 | headline, cut-off line, action; family-in-kitchen photo                                                                                                                                                     |
| 12  | Footer      | dark footer with oversized wordmark        | `oxblood`, full bleed                                                  | 1 col / 2 / 4 / 4                                                                             | tagline "We shop. We deliver. We care."; Shop, Help, Company columns; contact; payment line; legal line; giant "ShipEast" set in display, cropped by the bottom edge                                        |

**Why this beats the competitors:** GroceryList opens on an empty green box and asks for a
parish before showing any food. Upercart shows products but never says how the order is proven.
ReVv is a courier page. This page shows food and prices at once like Upercart, and it is the
only one that shows the receipt and the door.

## 4. Copy (final)

- **H1:** Shop for your family in Jamaica.
- **Lead:** Order from overseas. We shop at a store in Jamaica and deliver to their door,
  with a photo of the till receipt and a photo at the door.
- **Actions:** Start shopping · See ready-made baskets
- **Ticks:** Pay in US dollars · Receipt and door photos · They install nothing
- **Sticker:** Bought in Jamaica. Nothing is shipped.
- **Tile D:** Delivered to their door (parishes, cut-off, lowest delivery fee, all live)
- **Gift note (hand):** "For Mummy. Cook something nice. Love, Marcia" (label: Example gift note)
- **Tile B:** Ready-made baskets. One tap, one price. Sticker: "from USD$49" (lowest featured price, live)
- **Tile C:** See the receipt. See the door. Link: How proof works
- **Departments:** Shop by department. Prices in US dollars, with the Jamaican dollar amount beside them.
- **Shelf:** Staples for the kitchen. Link: All groceries
- **Baskets:** Ready-made baskets. Put together for the usual needs. Add one in a tap.
- **Note strip:** Add a note. We print it and put it in the bag.
- **Proof:** Send groceries, not money. Cash can be spent on anything. A basket arrives as
  food, and you see it happen twice: the till receipt when we finish shopping, and the bags
  at the door.
- **Steps:** From your phone to their door. 1 Fill a basket · 2 Pay in US dollars · 3 We shop
  in Jamaica · 4 Delivered, with proof.
- **Jamaica:** Delivering in St. Thomas and Kingston. More parishes are coming.
- **Questions:** Questions senders ask first.
- **Closing:** Start a basket for home.
- **Footer tagline:** We shop. We deliver. We care.

## 5. Photos (Unsplash, registered through the API)

| Slot                      | Photo                                                                       | Why                           |
| ------------------------- | --------------------------------------------------------------------------- | ----------------------------- |
| Hero A                    | paper bags of bread, tomatoes and bananas on a pale counter (`wjoIBMRjQ7s`) | food first, bright, no brands |
| Tile B, Groceries tile    | box of fresh vegetables from above (`Ss1u-roUcuM`)                          | colour, reads at small sizes  |
| Basket cards, departments | existing registry photos (baskets, household, pharmacy, baby)               | already true to each item     |
| Proof door card           | existing `homeStepToDoor` (a bag carried up the steps to a door)            | the moment of delivery        |
| Jamaica band              | existing `kingstonStreet` (vendors on a Kingston market street)             | real Jamaica, not a postcard  |
| Closing                   | family cooking together in a bright kitchen (`m9cBmbOQCmQ`)                 | what the groceries become     |

No photos of laptops, phone calls or offices anywhere on the page.

## 6. States and motion

- Buttons: crimson → `crimson-deep` on hover, 1px press. Add button turns leaf with a tick for
  the "Added" state. Cream button on crimson → white on hover.
- Tiles and cards: photo scales 1.04 over 450ms on hover; arrow disc fills crimson.
- Focus: the existing 3px signal ring; blush ring on dark bands.
- One load moment: in the hero the photo card settles, then the note and the chip drop in
  (CSS, 700ms, staggered 120ms). Nothing else animates on scroll.
- Reduced motion: all of the above are off (the global rule already zeroes durations).

## 7. Accessibility

One h1; sections are labelled by their h2. Stickers and the note are text, not images. Every
new colour pair is added to the contrast test (ink on mango and the soft tints, white and
mango-soft on leaf, ink-muted on cream). Rails are plain scroll containers with real links,
usable by keyboard. Touch targets stay 44px. Works at 375px with no sideways page scroll.

## 8. Review against generic defaults (pass 2)

- First draft put four facts in a row of "feature cards with icons" under the hero. That is
  the stock SaaS row. Removed: three ticks sit in the hero, and the three tiles under it each
  answer one real question (is there a quick way, how do I know it arrived, where and when).
- First draft set the hero in two thirds of the width with two tiles beside it. The headline
  had no room at that width, so the hero takes the full row and the tiles sit under it.
- First draft had a cream page with a serif display, which is the commonest generated look.
  Kept cream because food needs a warm counter, but the display face is a chunky grotesque and
  the page is carried by red, green and mango blocks, not by cream.
- First draft used photo cards for the four steps, as the old page did. That was the corporate
  feeling. Steps are now type and icons on two coloured lanes.
- Removed eyebrow labels above headings everywhere except the two lane labels in the steps,
  which carry information.
- Numbered markers are used only on the steps, which are a real sequence.

## 9. Acceptance checklist

- [ ] `/` renders from `src/app/(home)`; every other route is visually unchanged.
- [ ] Food or a price in every screenful at 375 and 1440.
- [ ] Hero shows h1, both actions and part of the photo above the fold at 1440×900 and 375×812.
- [ ] All prices, counts, fees and cut-offs come from the loaders; formats from `src/lib/format.ts`.
- [ ] Examples (note, texts, receipt) are labelled as examples.
- [ ] No gradients, no emoji, lucide icons only, no raw hex in components.
- [ ] Add to basket works from the shelf and the basket cards; the header count updates.
- [ ] No horizontal page scroll at 375, 768, 1024, 1440.
- [ ] `npm run check` is green.

## 10. v3.1: the owner's review (November 13, 2026)

The owner approved the direction and asked for a calmer, more compact and more alive page.

- **Compact.** `text-mega` 40 → 68px (was 44 → 84), `text-shout` 30 → 48px (was 34 → 58).
  Sections sit 48px apart on phones and 64px on wide screens, everywhere. Prices on the shelf
  drop to `text-lead`, basket stickers and names to `text-h3`, step numerals to `text-h1`.
  Product photos are 5:4, basket photos 16:10, department arches square. The page is about
  1,000px shorter at 1440.
- **Ticker.** The top strip is a news ticker: five short lines slide left without stopping
  (`ticker`), pausing under the pointer. The duplicate copy is hidden from screen readers;
  with reduced motion it stands still.
- **Hover.** `btn-slide`: the hover colour slides in from the left and the arrow nudges
  forward (cream buttons fill with mango, crimson ones with oxblood, "Added" with deep leaf).
  `card-rise`: tiles, product cards and basket cards lift 4px with a shadow. Price stickers
  straighten and grow slightly on their card's hover.
- **Scroll.** Section headings and blocks fade up once as they enter (`Reveal`), card rows
  arrive one after another (`Stagger`), and the Kingston and closing photos drift a little
  against the scroll (`Parallax`). The hero sticker bobs slowly.
- **Loading.** Photo wells pulse (`photo-loading`) until the picture covers them, and
  `(home)/loading.tsx` shows a skeleton of the hero, tiles and tiles row while the page streams.
- **Footer.** The oversized wordmark is gone.
