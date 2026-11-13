# Light header and four new heroes: plan

## Manager approval (November 7, 2026)

**APPROVED for build**, with these decisions on §7. They override the plan where they differ.

1. **`text-poster`:** approved, for the About "bearer" headword only. Add it to `TOKENS.md`
   and `/styleguide`.
2. **Baskets hero photo:** do NOT use the fruit-stall photo `SZGeQlFWEIY`. A roadside stall
   suggests we shop at markets, when our driver buys at stores. Use the existing registry
   photo `shopChoosing` with the same layout. If the shop listing no longer uses
   `shopChoosing`, update its `usedOn` field.
3. **`photo-scrim-ink`:** start at **75%** (`rgb(43 35 38 / 0.75)`, 6.74:1 for white text).
   Update the contrast tests to match.
4. **Phone header rule:** keep the rule that joins the bar and the search row into one white
   block.
5. **Build:** the header and heroes are built together with the shop listing
   (`docs/shop-listing/PLAN.md`) by one development agent, and the header is built first.

**Date:** November 7, 2026. **Author:** design agent. **Status:** draft for the manager's review.
**Scope:** the shared site header, and the heroes of home, `/baskets`, `/how-it-works` and `/about`.
`/shop` is being rebuilt separately as a products-first listing with no hero, so it is out of scope.
This plan only covers the header bar and each page's first band. Every section below the hero stays
as built in PR #23 and PR #24.

**Owner's request (translated):**

1. "The header needs to be a different colour, maybe a light shade would suit better."
2. "On all the pages we did, the hero section would be better with different types of structure. I
   don't think two columns looks good. Maybe a background picture with an overlay on some pages, and
   be creative: I mean different structures."

**Skills used:** `frontend-design` (two-pass: plan, review against the brief, revise) and
`ui-ux-pro-max` v2.15.0.

- `--design-system "diaspora grocery delivery e-commerce trust photo"` returned "Feature-Rich
  Showcase / Vibrant & Block-based". Kept: block layout, large type, strong contrast, 375–1440 checks,
  reduced motion. Rejected: its green and orange palette and the Rubik and Nunito Sans fonts (brand
  rules: crimson roles and Figtree only).
- `--domain landing "hero full-bleed photo overlay"` returned Hero-Centric, Video-First and
  Immersive. Kept: "overlay strong enough for text contrast, light text only when the measured
  contrast passes", "one primary CTA", "a static hero under reduced motion", and "don't hide the
  next-content cue". Rejected: video and carousels.
- `--domain style "editorial bold typography photo"` returned Exaggerated Minimalism and Editorial
  Grid. Kept: oversized type as the visual on one page (About) and asymmetric alignment. Rejected:
  pure black and white, serif body text, hairline newspaper columns and drop caps.

**Web references** (pattern research only; nothing copied):

- [Omniconvert, hero section examples](https://www.omniconvert.com/blog/hero-section-examples/) and
  [LogRocket, hero section best practices](https://blog.logrocket.com/ux-design/hero-section-examples-best-practices/):
  one value proposition, one focused CTA, no carousel.
- [GemPages, above-the-fold examples](https://gempages.net/blogs/shopify/inspired-above-the-fold) and
  [Muffin Group, e-commerce homepages](https://muffingroup.com/blog/ecommerce-homepage-design/): many
  of these stores open on generic banners and rotating carousels. This is the trap we avoid by making
  each hero carry its page's own proof object.

---

## 1. Concept

**One idea per hero, built from what that page proves.** Every hero opens with the most
characteristic object of its page and gets a structure that suits that object. A template is not
repeated four times.

| Page            | The page's proof object | Structure that serves it                                                                                  |
| --------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Home            | the till receipt        | The receipt **travels**: it prints in the crimson band and lands on a photo of home                       |
| `/baskets`      | the price board         | A shop window: photo under oxblood, with the board as a big crimson panel overlapping its edge            |
| `/how-it-works` | the tracker card        | A scene: the sender at home, with the live order card on the photo and a "jump to" rail docked underneath |
| `/about`        | the word "bearer"       | A dictionary page: type only, the word as large as a poster, our meaning set as sense 2 (the h1)          |

**The light header** becomes the calm, constant frame above four very different first bands. All four
heroes open on a dark band (crimson, oxblood photo, ink photo, solid oxblood), so a white bar sits
against them with a crisp edge, and red reads as the brand rather than as chrome.

### 1.1 Side-by-side comparison

|                     | Header                                   | Home                                                                     | `/baskets`                                                                      | `/how-it-works`                                                                    | `/about`                                                       |
| ------------------- | ---------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Pattern             | Light sticky bar, crimson accents        | **Centred statement over a full-bleed photo stage; receipt on the seam** | **Photo band under a flat overlay + a solid panel overlapping its bottom edge** | **Full-bleed photo scene, text bottom-left, card on the photo, docked jump rail**  | **Type only: poster word + dictionary senses, hanging indent** |
| Background          | `surface`, 1px `line` edge               | `crimson` band, then a photo (no overlay)                                | Photo + `photo-scrim` (oxblood 80%)                                             | Photo + **new `photo-scrim-ink`** (ink 70%); solid `ink` continuation below 1024px | Solid `oxblood`                                                |
| Alignment           | logo left, actions right                 | Centre                                                                   | Left, top-down                                                                  | Left, bottom-anchored                                                              | Left, on one hanging-indent axis                               |
| Photo               | none                                     | `familyPhone` (existing)                                                 | **new** `basketsStall`                                                          | `hiwSender` (existing)                                                             | none                                                           |
| Bold element        | crimson basket pill and current-page tab | Receipt printing out of the red onto the home                            | The crimson 2×2 price board                                                     | The white tracker card on the photo                                                | "bearer" at poster size                                        |
| Phone LCP           | n/a                                      | **h1 or lead (text)**: the photo starts below the fold                   | Photo (preloaded, under overlay)                                                | Photo (preloaded, under overlay)                                                   | **"bearer" (text)**                                            |
| Motion (one moment) | shadow on scroll                         | Receipt prints (existing `animate-print`)                                | Board panel rises once                                                          | Tracker card rises once                                                            | Senses 1 then 2 rise                                           |

**Neighbours check:**

- Home vs `/baskets` (linked from the home CTA): text first then a photo, against a photo first then
  a red panel. Centred against left-aligned. They read as inversions of each other.
- `/baskets` vs `/how-it-works` (next to each other in the nav): oxblood vs ink overlay; a short
  band plus an overlapping panel vs a tall scene plus a docked rail; text top-down vs text
  bottom-anchored.
- `/about` (footer link) is the only hero with no photo.

No two heroes share a pattern.

---

## 2. Structure blueprint (structure first)

### 2.0 Whole-page skeletons (first screen)

```
1440 HOME                                    375 HOME
┌──────────────────────────────────────┐     ┌──────────────────┐
│ ░ white bar: logo · nav · search · ● │     │ ░ logo   👤 ● ≡  │
├──────────────────────────────────────┤     │ ░ [ search     ] │
│▓▓▓▓▓▓▓ crimson, centred ▓▓▓▓▓▓▓▓▓▓▓▓▓│     ├──────────────────┤
│▓   Groceries for home.             ▓│     │▓ Groceries for  ▓│
│▓      Proof for you.               ▓│     │▓ home. Proof    ▓│
│▓   lead (centred, 2–3 lines)       ▓│     │▓ for you.       ▓│
│▓ [Start shopping]  See baskets     ▓│     │▓ lead ...       ▓│
│▓   ⏱ cut-off note                  ▓│     │▓ [Start shopping]│
│▓  ┌receipt┐                        ▓│     │▓ See baskets    ▓│
├───┤ ..... ├──────────────────────────┤     │▓ ⏱ cut-off      ▓│
│ ▒ │ ..... │  photo stage 21:9      ▒ │     │▓┌rcpt┐         ▓│
│ ▒ └───────┘  (family at home)      ▒ │     ├─┤....├──────────┤
│ ▒  (pill) You get a photo...       ▒ │     │▒│....│  photo  ▒│
└──────────────────────────────────────┘     │▒└────┘  4:5    ▒│
                                             └──────────────────┘
```

### 2.1 Header (site-wide)

| Item                | Decision                                                                                                                                                                                                                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pattern             | Light sticky bar (unchanged skeleton): logo · nav · inline search · account · basket pill · menu. The phone search row stays under it, not sticky.                                                                                                                                                              |
| Background          | `bg-surface` (white). Edge: `border-b border-line` (1px `#E5E5E5`). Scrolled (>8px): the same line plus `shadow-lift`. On phones, while the search row is directly below and the page is not scrolled, the bar's line is hidden so the bar and the row read as one white header. The row then carries the line. |
| Why not `page` grey | `page` (`#F7F7F7`) against `page` bands (Shop, Basket, Checkout, legal) would leave the header with no fill edge. White plus a line separates from every first band.                                                                                                                                            |
| Container, height   | Full-bleed bar; content `max-w-wide gutter`. 64px phones, 72px from 768px (unchanged, so `--header-height` and `scroll-mt-header` stay right). Phone search row: 12px bottom padding plus a 52px field (was 48), so 64px tall.                                                                                  |
| Columns, stacking   | **375:** logo · (auto) · account · basket · menu; search row below. **768:** logo · search (flex-1) · account · basket · menu. **1024:** logo · nav (3) · search icon · account · basket. **1440:** logo · nav (4, "Track an order" from 1280) · search box (max 384px) · account · basket. All unchanged.      |
| Blocks              | 1 wordmark, 3–4 nav links, 1 search (box or icon), 1 account icon, 1 basket pill, 1 menu trigger (below 1024px).                                                                                                                                                                                                |
| Why this structure  | It already works: a sticky 64px bar, search always one tap away on phones, and a native dialog menu. The owner asked for a colour change, not a new structure. Only the colour logic and the search control's height change.                                                                                    |

### 2.2 Home hero: "The receipt lands at home"

| Item              | Decision                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pattern           | **Centred large statement on a solid band, with a full-bleed photo stage below it; the proof object straddles the seam.** Two stacked full-bleed bands, never columns.                                                                                                                                                                                                                                                                   |
| Background        | Band A: solid `crimson`. Band B: photo `familyPhone`, no overlay (no text sits on it; the receipt and its caption pill carry their own fills).                                                                                                                                                                                                                                                                                           |
| Container         | Band A text: `max-w-page`, centred, with the h1 capped at `max-w-4xl` and the lead at `max-w-2xl`. Band B: full-bleed, no radius. Receipt layer: `max-w-wide gutter`, left.                                                                                                                                                                                                                                                              |
| Height            | Band A: auto, `pt-12 pb-24` (375), `md:pt-16 md:pb-32`, `lg:pt-20`. About 600px at 1440. Band B: `aspect-4/5` (375 → 469px), `md:aspect-video` (768 → 432px), `lg:aspect-[21/9]` (1024 → 439px; 1440 → 617px), `2xl:aspect-[3/1]` (caps the height on wide screens).                                                                                                                                                                     |
| Stacking          | Same at all widths: h1 → lead → CTAs → cut-off note (band A) → photo with the receipt over its top-left (band B). At 375 the CTAs stack (full-width button, link under it); from 640 they sit in one centred row.                                                                                                                                                                                                                        |
| Blocks            | 1 h1, 1 lead, 1 button + 1 text link, 1 cut-off note, 1 photo, 1 receipt (with its caption pill).                                                                                                                                                                                                                                                                                                                                        |
| Receipt placement | Left edge of the `max-w-wide` container. It is lifted into band A by **64px (375) / 96px (768+)**. Band A's bottom padding (96/128px) keeps 32px of clear crimson between the cut-off note and the receipt top. Width `w-52` (375), `md:w-64`, `lg:w-72`, `xl:w-80`. Tilt −3° (unchanged).                                                                                                                                               |
| Why               | The receipt is the brand's proof, and here it tells the story in one glance: it is printed in Jamaica (the red band) and lands with the family (the photo). A centred headline is the calmest way to state the promise, and the asymmetric receipt keeps the centring from feeling templated. Competitors open on a banner or a product grid with no proof. On a phone the headline is painted first, with no photo in the first screen. |

### 2.3 `/baskets` hero: "Shop window and price board"

| Item       | Decision                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pattern    | **Photo band under a flat overlay, with a solid crimson panel (the price board) overlapping its bottom edge** and sitting half on the page grey below.                                                                                                                                                                                          |
| Background | Photo band: new `basketsStall` photo + `bg-photo-scrim` (oxblood 80%, existing role). Panel: solid `crimson`, `rounded-2xl`. Below the panel: `page`.                                                                                                                                                                                           |
| Contrast   | On-dark text on oxblood 80% over a pure white pixel: **8.73:1** (black pixel 16.97:1). `on-crimson-muted` lead: **6.66:1**. Blush focus ring: **5.93:1** (over black 11.53:1). The panel is solid crimson, so its existing ratios stand (on-dark 7.22:1, blush ring 4.91:1).                                                                    |
| Container  | Photo band: full-bleed. Text: `max-w-page gutter`, left-aligned, text column `max-w-2xl`. Panel: `max-w-page gutter` (the same left edge as the text, so the text and the board share one axis).                                                                                                                                                |
| Height     | Photo band: auto, `pt-28 pb-28` (375), `md:pt-20 md:pb-32`, `lg:pt-24 lg:pb-40`. About 300px of text, so ≈ 520px at 375 and ≈ 460px at 1440. The panel overlaps by **64px (375) / 80px (768) / 112px (1024+)** (`-mt-16 md:-mt-20 lg:-mt-28`).                                                                                                  |
| Columns    | Text: one column at every width. Board inside the panel: **1 column of rows at 375 and 768**, **2 columns (2×2 for 4 baskets) from 1024**. Grid, not a split: the rows are equal cells of one board.                                                                                                                                            |
| Stacking   | h1 → lead → cut-off note (on the photo) → panel with N board rows. Empty state (no baskets): no panel; the "Shop single items" button sits on the photo and the band uses `pb-16`.                                                                                                                                                              |
| Blocks     | 1 h1, 1 lead, 1 cut-off note, 1 panel holding N board rows (each row: occasion disc + occasion line + name + item count + USD price + J$ line + saving tag or "Not available today" + ↓ arrow from 1024).                                                                                                                                       |
| Why        | The board **is** the product list, so it should be the biggest solid block on the page. The photo puts it in a place: a sunny stall hung with pineapples, Caribbean light and real hands. The overlap ties the warm scene to the hard prices. Competitors list baskets as identical cards with no saving shown; we open on every price at once. |

### 2.4 `/how-it-works` hero: "One scene, one live order"

| Item       | Decision                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pattern    | **Full-bleed photo scene under a flat ink overlay, with the text anchored bottom-left, the white tracker card floating on the photo at the right, and a solid crimson "On this page" rail docked to the bottom edge.** Below 1024px it becomes a **photo stage (only the h1 on the photo), then a solid ink continuation**, so the sender's face is never behind text on a phone.                                                                            |
| Background | Photo `hiwSender` + **new role `photo-scrim-ink`** = ink `#2B2326` at **70%**. Below 1024px the continuation is solid `ink`. Rail: solid `crimson`.                                                                                                                                                                                                                                                                                                          |
| Contrast   | On-dark on ink 70% over a pure white pixel (the white bedsheet in this photo is close to that): **5.71:1** (black pixel 17.42:1). Blush on it is only 3.88:1, so **no blush or `on-crimson-muted` text** on the overlay. The lead is `on-dark`. The blush focus ring passes 3:1 (3.88 worst case). On solid ink: on-dark 15.3:1, `on-oxblood-muted` 8.08:1, blush ring 10.4:1. Rail (crimson): on-dark 7.22:1, `on-crimson-muted` 5.51:1, blush ring 4.91:1. |
| Container  | Full-bleed scene; content `max-w-wide gutter`. Text column `max-w-2xl` (lg: `col-span-7`); tracker card `w-72 xl:w-80` (lg: `col-span-4 col-start-9`, aligned to the bottom). Rail: full-bleed crimson, content `max-w-wide gutter`.                                                                                                                                                                                                                         |
| Height     | **375:** stage `aspect-4/5` (469px), h1 anchored 24px from its bottom; continuation auto (≈ 520px); rail ≈ 96px. **768:** stage `md:aspect-video` (432px), same mechanic. **1024:** the scene is one block, `lg:min-h-[640px]`, everything on the photo, `pt-32 pb-12`. **1440:** `xl:min-h-[720px]`. Rail at 1024+ ≈ 72px.                                                                                                                                  |
| Columns    | **375/768:** one column: stage (h1) → lead → CTAs → cut-off → tracker card (`max-w-sm`) → rail. **1024/1440:** a 12-column grid with `items-end`: text block cols 1–7 (h1, lead, CTAs, cut-off), tracker card cols 9–12 at the same baseline; the rail runs across under both. This is a scene with a floating card, not a 50/50 or 7/5 split of text vs framed photo: both blocks sit on one full-bleed photo.                                              |
| Blocks     | 1 h1, 1 lead, 1 button + 1 text link, 1 cut-off note, 1 tracker card (status, 3 rows), 1 rail ("On this page" label + 7 jump links).                                                                                                                                                                                                                                                                                                                         |
| Why        | This page answers "what will I actually see?". The scene shows the sender at home on her laptop, and the card is literally what her screen shows: a live order. The rail, docked like a toolbar, serves the reader who came for one answer. Competitors explain delivery with three generic icons; we show the moment.                                                                                                                                       |

### 2.5 `/about` hero: "The dictionary entry"

| Item       | Decision                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pattern    | **Type only on solid oxblood, set as a dictionary page:** the word "bearer" at poster size; its part of speech; two numbered senses on a hanging indent. Sense 1 is the general meaning; **sense 2 is our h1**. Then the lead, the origin note and the CTAs on the same indent. One column, one alignment axis.                                                          |
| Background | Solid `oxblood` (on-dark 15.5:1, `on-oxblood-muted` 8.17:1, blush 10.5:1, blush ring 10.5:1).                                                                                                                                                                                                                                                                            |
| Container  | `max-w-wide gutter`, left. Senses `max-w-4xl`; lead and origin `max-w-2xl`.                                                                                                                                                                                                                                                                                              |
| Height     | Auto, `section-lg` (80 → 128px top and bottom). About 860px at 1440 (fits one screen with the header) and ≈ 900px at 375.                                                                                                                                                                                                                                                |
| Columns    | Hanging indent: a numeral column `w-10` (375) / `md:w-16` / `lg:w-24` and the text column. At 375 the lead, origin and CTAs drop the indent (full width); from 768 they sit on the indent.                                                                                                                                                                               |
| Blocks     | 1 poster word, 1 "noun" tag, 2 senses (numeral + text; the second holds the h1), 1 lead, 1 origin note, 1 button + 1 text link.                                                                                                                                                                                                                                          |
| Why        | Our registered name is our story: we are a bearer service. Setting the page as a dictionary entry makes the name self-explaining, with no invented history, numbers or photos of staff we don't have. It is the quietest hero and the fastest one (no photo), and it contrasts with the two photo pages. The numerals are honest: dictionary senses really are numbered. |

### 2.6 ASCII wireframes

**Header**

```
375                                   768
┌───────────────────────────────┐    ┌─────────────────────────────────────────────┐
│ ShipEast        👤 (🧺 Basket 2) ≡│    │ ShipEast  [🔍 Rice, diapers…   (Search)]  👤 (🧺 Basket 2) ≡ │
│ Shop & Send                   │    │ Shop & Send                                 │
│ [🔍 Rice, diapers…      (🔍)] │    └─────────────── 1px line ────────────────────┘
└────────── 1px line ───────────┘

1440
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ ShipEast   Shop  Baskets  How it works  Track an order   [🔍 Rice…  (Search)]  👤 (🧺 Basket 2) │
│ Shop & Send             ▔▔▔▔▔▔▔ ← 3px crimson tab on the current page, on the line     │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

**Home**

```
375                               768                                   1440
┌────────────────────┐            ┌──────────────────────────────┐      ┌──────────────────────────────────────────────┐
│▓  Groceries for   ▓│            │▓      Groceries for home.   ▓│      │▓▓▓▓▓▓▓▓      Groceries for home.      ▓▓▓▓▓▓▓│
│▓  home. Proof for ▓│            │▓        Proof for you.      ▓│      │▓▓▓▓▓▓▓▓         Proof for you.        ▓▓▓▓▓▓▓│
│▓  you.            ▓│            │▓   lead centred 3 lines     ▓│      │▓      lead centred, max 672px, 3 lines       ▓│
│▓  lead 6–7 lines  ▓│            │▓ [Start shopping] See bask. ▓│      │▓      [Start shopping]   See ready-made…     ▓│
│▓ [Start shopping ]▓│            │▓     ⏱ cut-off note         ▓│      │▓          ⏱ Same-day delivery …              ▓│
│▓ See baskets      ▓│            │▓┌────────┐                  ▓│      │▓ ┌──────────┐                                 ▓│
│▓ ⏱ cut-off        ▓│            ├─┤receipt │──────────────────┤      ├──┤ receipt  ├─────────────────────────────────┤
│▓┌──────┐          ▓│            │▒│ lines  │   face           ▒│      │▒ │ 4–5 lines│          face, phone         ▒│
├─┤rcpt  ├──────────┤            │▒│ total  │                  ▒│      │▒ │ total    │                              ▒│
│▒│lines │   face  ▒│            │▒└────────┘ (pill)            ▒│      │▒ └──────────┘ (pill)   photo 21:9           ▒│
│▒│total │  phone  ▒│            │▒        photo 16:9           ▒│      └──────────────────────────────────────────────┘
│▒└──────┘(pill)   ▒│            └──────────────────────────────┘
│▒  photo 4:5      ▒│
└────────────────────┘
```

**`/baskets`**

```
375                               768                                   1440
┌────────────────────┐            ┌──────────────────────────────┐      ┌──────────────────────────────────────────────┐
│▒ (pineapples top) ▒│            │▒ Ready-made baskets for home▒│      │▒ Ready-made baskets for home      (woman,    ▒│
│▒ Ready-made       ▒│            │▒ lead 3 lines               ▒│      │▒ lead 2–3 lines                    stall)    ▒│
│▒ baskets for home ▒│            │▒ ⏱ cut-off                  ▒│      │▒ ⏱ cut-off                                   ▒│
│▒ lead 5 lines     ▒│            │▒                            ▒│      │▒                                             ▒│
│▒ ⏱ cut-off        ▒│            │▒ ┌────────────────────────┐ ▒│      │▒  ┌──────────────────────────────────────┐   ▒│
│▒ ┌───────────────┐▒│            ├──┤ ◉ Family Food  USD$95 │─┤      ├───┤ ◉ Family Food USD$95 │ ◉ Baby Care USD$60 ├───┤
├──┤◉ Family  $95  ├─┤            │  │ ◉ Baby Care    USD$60 │ │      │   │ ◉ Pharmacy    USD$40 │ ◉ Christmas USD$120│   │
│  │◉ Baby    $60  │ │            │  │ ◉ Pharmacy     USD$40 │ │      │   └──────────────────────────────────────┘   │
│  │◉ Pharmacy $40 │ │            │  │ ◉ Christmas   USD$120 │ │      │  What's inside each basket (page grey)       │
│  │◉ Xmas   $120  │ │            │  └────────────────────────┘ │      └──────────────────────────────────────────────┘
│  └───────────────┘ │            │  What's inside …            │      (prices shown are illustrative positions only;
│ What's inside …    │            └──────────────────────────────┘       the build reads them from the data)
└────────────────────┘
```

**`/how-it-works`**

```
375                               768                                   1440
┌────────────────────┐            ┌──────────────────────────────┐      ┌──────────────────────────────────────────────┐
│▒  (face, laptop)  ▒│            │▒      (sender at laptop)    ▒│      │▒                        (sender at laptop)   ▒│
│▒   photo 4:5      ▒│            │▒        photo 16:9          ▒│      │▒                                             ▒│
│▒                  ▒│            │▒ Follow one order from your ▒│      │▒ Follow one order from                       ▒│
│▒ Follow one order ▒│            │▒ laptop to their door       ▒│      │▒ your laptop to their door     ┌──────────┐  ▒│
│▒ from your laptop ▒│            ├──────────────────────────────┤      │▒ lead (on-dark) 3 lines        │SE-10428  │  ▒│
│▒ to their door    ▒│            │█ lead (solid ink)           █│      │▒ [Start shopping] Track an order│● Out for │  ▒│
├────────────────────┤            │█ [Start shopping] Track …   █│      │▒ ⏱ cut-off                     │ delivery │  ▒│
│█ lead (solid ink) █│            │█ ⏱ cut-off                  █│      │▒                               │✓ Paid 9:12│ ▒│
│█ [Start shopping ]█│            │█ ┌tracker card┐             █│      │▒                               └──────────┘  ▒│
│█ Track an order   █│            │█ └────────────┘             █│      ├──────────────────────────────────────────────┤
│█ ⏱ cut-off        █│            ├──────────────────────────────┤      │▓ On this page  The seven steps · The two …   ▓│
│█ ┌tracker card──┐ █│            │▓ On this page                ▓│      └──────────────────────────────────────────────┘
│█ └──────────────┘ █│            │▓ (chip)(chip)(chip)(chip)…   ▓│
├────────────────────┤            └──────────────────────────────┘
│▓ On this page      │
│▓ (chip)(chip)(chi→ │  ← one-row scroll rail of chips
└────────────────────┘
```

**`/about`**

```
375                               768                                   1440
┌────────────────────┐            ┌──────────────────────────────┐      ┌──────────────────────────────────────────────┐
│█                  █│            │█                            █│      │█                                             █│
│█ bearer           █│ 72px       │█ bearer                     █│ 98px │█ bearer                                130px █│
│█ [noun]           █│            │█ [noun]                     █│      │█ [noun]                                      █│
│█ 1  Someone who   █│            │█ 1   Someone who carries    █│      │█ 1    Someone who carries something to       █│
│█    carries …     █│            │█     something to another … █│      │█      another person, on your behalf.        █│
│█ 2  A St. Thomas  █│            │█ 2   A St. Thomas courier,  █│      │█ 2    A St. Thomas courier, shopping for     █│
│█    courier, …    █│            │█     shopping for your …    █│      │█      your family.            (h1)           █│
│█ lead (full width)█│            │█     lead                   █│      │█      lead, max 672px                        █│
│█ origin note      █│            │█     origin note            █│      │█      From our registered name: …            █│
│█ [Start shopping ]█│            │█     [Start shopping] Co. … █│      │█      [Start shopping]  Company details…     █│
└────────────────────┘            └──────────────────────────────┘      └──────────────────────────────────────────────┘
```

---

## 3. Per-item detail

### 3.1 Header

**Copy:** unchanged.

**Files and changes**

| File                                        | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/components/site/header-shell.tsx`      | `className`: `sticky top-0 z-header border-b border-line bg-surface transition-[box-shadow] duration-(--duration-slow) ease-out-soft print:hidden`, plus `shadow-lift` when scrolled. **Remove `on-dark-focus`** (the default `signal` ring returns: 4.79:1 on white). Phones: hide the line while the search row follows and the page is at the top: `max-md:[&:not([data-scrolled]):has(+[data-header-row])]:border-transparent`. Update the doc comment ("light bar… gains the lift shadow").                                                                                                                                                                                                                                                                   |
| `src/components/site/header-search-row.tsx` | `HeaderSearchRowFrame`: `data-header-row` attribute; `className="border-b border-line bg-surface md:hidden print:hidden"`. **Remove `on-dark-focus`.** Inner wrapper unchanged (`mx-auto max-w-wide gutter pb-3`). The row is the bar's next DOM sibling (Suspense renders no element), so the `:has(+…)` rule works. When the row is hidden (`/search`, `/shop`, `/basket`, `/checkout`) the bar keeps its own line.                                                                                                                                                                                                                                                                                                                                              |
| `src/components/site/site-header.tsx`       | `<Wordmark />` (light variant: ink "Ship", crimson "East", `ink-muted` "Shop & Send"). `iconLink`: `grid size-control shrink-0 place-items-center rounded-full text-ink transition-colors duration-150 hover:bg-surface-muted hover:text-crimson active:bg-surface-strong`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `src/components/site/nav-link.tsx`          | `navLinkClass`: `relative inline-flex min-h-control items-center rounded-md px-3 text-body font-semibold text-ink transition-colors duration-150 hover:bg-surface-muted hover:text-crimson active:bg-surface-strong`. Current page: `aria-[current=page]:text-crimson` plus a tab marker `aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:-bottom-[15px] aria-[current=page]:after:h-[3px] aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-crimson`. The nav only shows from 1024px, where the bar is 72px: a 44px link leaves 14px below it plus the 1px line, so −15px lands the 3px marker on the bar's bottom line. No fill on the current link. Update the comment ("on the light bar"). |
| `src/components/site/mobile-menu.tsx`       | `triggerClass`: `text-ink hover:bg-surface-muted hover:text-crimson` (was `text-on-dark hover:bg-crimson-deep`). The sheet is already light; no other change.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `src/components/site/basket-link.tsx`       | Pill: `relative flex min-h-control items-center gap-2 rounded-full bg-crimson px-4 font-bold text-on-dark transition-colors duration-150 hover:bg-crimson-deep active:translate-y-px`. Count: `bg-surface text-crimson-deep` (11.1:1). This is the one solid red block in the bar.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `src/components/shop/search-box.tsx`        | `compact` branch: `min-h-control-lg rounded-full border-control border-line-strong bg-surface hover:border-ink-muted focus:border-crimson focus:ring-1 focus:ring-crimson` (no `shadow-lift`: the field is flat on white; `line-strong` gives the 3.69:1 control boundary). Submit button: one inset for both modes, `top-1 right-1 bottom-1`, so it is **44px tall** in the 52px field. **This closes the BRAIN follow-up "compact header search button is 36px".** Update the prop comments ("the pill in the light header"). `tone="onDark"` is unchanged.                                                                                                                                                                                                      |

**States**

- Top of page: white, 1px line. On phones the bar and the search row are one white block with the
  line under the row.
- Scrolled: the line shows on the bar, plus `shadow-lift`. The 450ms `ease-out-soft` transition
  stays.
- Hover: nav link and icon buttons get a `surface-muted` fill and crimson text or icon. The basket
  pill goes to `crimson-deep`.
- Pressed: `surface-strong` fill. The pill moves down 1px.
- Focus: a 3px `signal` ring with a 2px offset (global `:focus-visible`), 4.79:1 on white. The
  search field shows a crimson border plus a 1px crimson ring.
- Current page: crimson text plus the 3px crimson tab marker on the line. The menu rows keep
  `surface-selected` and `crimson-deep`.

**Demo banner:** `bg-ink` above a white bar gives a clear two-tone strip. No change.

**First band under the header:**

- crimson (home band A, guide and company pages)
- photo under oxblood (`/baskets`)
- photo under ink (`/how-it-works`)
- oxblood (`/about`, the footer-like band)
- `page` (shop, basket, checkout, legal, request), where the 1px line is the edge

All are checked in QA.

**Motion:** only the scroll shadow. Reduced motion makes it instant (global rule).

**Accessibility:**

- 44px targets everywhere. The search submit button goes from 36px to 44px.
- Text contrast on white: ink 15.3:1 (nav), crimson 7.22:1 (current), `ink-muted` 5.74:1 (wordmark
  line).
- The skip link is unchanged.

### 3.2 Home hero

**Copy:** unchanged: the h1 "Groceries for home. Proof for you.", the lead with `parishList`,
"Start shopping" → `/shop`, "See ready-made baskets" → `/baskets`, the cut-off note, the receipt and
"You get a photo of the real one".

**Structure in JSX** (`src/components/pages/home/hero.tsx`, rewritten):

```tsx
<section aria-labelledby="hero-title" className="text-on-dark on-dark-focus">
  {/* Band A */}
  <div className="bg-crimson pt-12 pb-24 md:pt-16 md:pb-32 lg:pt-20">
    <div className="mx-auto max-w-page gutter text-center">
      <h1 id="hero-title" className="mx-auto max-w-4xl text-display text-balance">
        <span className="block">Groceries for home.</span>{' '}
        <span className="block">Proof for you.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lead text-on-crimson-muted lg:mt-6">…</p>
      <div className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
        <ButtonLink href="/shop" variant="onDark" size="lg" className="w-full sm:w-auto">
          Start shopping
        </ButtonLink>
        <Link href="/baskets" className={`${onDarkLink} self-center`}>
          See ready-made baskets
        </Link>
      </div>
      {earliestCutoff && (
        <CutoffNote
          cutoff={earliestCutoff}
          tone="onDark"
          className="mt-6 justify-center text-left lg:mt-8"
        />
      )}
    </div>
  </div>
  {/* Band B */}
  <div className="relative">
    <StockPhoto
      name="familyPhone"
      preload
      sizes="100vw"
      imgClassName="object-[25%_30%] md:object-[50%_30%]"
      className="aspect-4/5 rounded-none md:aspect-video lg:aspect-[21/9] 2xl:aspect-[3/1]"
    />
    {receipt && (
      <div className="absolute inset-x-0 top-0 mx-auto max-w-wide gutter">
        <HeroReceipt
          receipt={receipt}
          className="relative z-raised -mt-16 w-52 md:-mt-24 md:w-64 lg:w-72 xl:w-80"
        />
      </div>
    )}
  </div>
</section>
```

**Notes**

- On phones, the two-span h1 wraps naturally ("Groceries for / home. Proof for / you."). Keep the
  space between the spans for screen readers.
- `CutoffNote` must accept `justify-center` (it is `flex`). It already takes a `className`.
- `HeroReceipt`: no change to its markup. Only its placement changes. Its caption pill
  (`bg-crimson-deep`, `on-crimson-muted` 8.45:1) now sits on the photo; it is self-contained, so its
  contrast doesn't depend on the photo.

**Photo positions** (`familyPhone`, 5591×3721; the woman's face is at about 52% x, 35% y, with the
phone in her right hand at about 62% x):

| Width | Box             | Object position | What shows                                                                              |
| ----- | --------------- | --------------- | --------------------------------------------------------------------------------------- |
| 375   | 375×469 (4:5)   | `25% 30%`       | Face at about x 284, clear of the receipt (x 16–224); the phone is visible on the right |
| 768   | 768×432 (16:9)  | `50% 30%`       | Almost the whole frame; the receipt covers the red armchair on the left                 |
| 1024  | 1024×439 (21:9) | `50% 30%`       | Face to the shoulders; the receipt covers the armchair                                  |
| 1440  | 1440×617 (21:9) | `50% 30%`       | Head, beads, phone and doorway; the receipt (x 32–352) covers the armchair              |

**Component change** (`src/components/site/stock-photo.tsx`):

- Add `imgClassName?: string` to `StockPhoto` and `StockImage`, appended to the `<Image>` classes.
- When `imgClassName` is set, don't apply the inline `objectPosition` style, because inline would
  beat the responsive classes.
- No other caller changes.

**Motion:** the receipt prints once (`animate-print`, 300ms delay, 700ms). It now unrolls downward
across the seam from red onto the home, which is the page's one moment. The h1 and lead are not
animated. Reduced motion shows the receipt in place.

**Accessibility:**

- One h1.
- The receipt keeps its `role="img"` and `aria-label`, and its lines stay `aria-hidden`.
- The photo alt stays as in the registry ("An older woman smiling on the phone at home").
- Reading order: h1 → lead → CTAs → cut-off → photo → receipt.
- Centred text is limited to a 3-line lead, which is acceptable. Body copy elsewhere stays
  left-aligned.

**LCP and preload:**

- At 375 and 768, band A is taller than the first screen (≈ 820px with the header and search row),
  so the LCP is the h1 or lead text. The text is not animated, so it paints at first paint.
- At 1024 and up, about 200–300px of the photo is in the first screen and is the LCP, so keep
  `preload` (the only preloaded image on the page).
- `sizes="100vw"`. Add `<link rel="preconnect" href="https://images.unsplash.com">` once in
  `src/app/(site)/layout.tsx` (none exists today); it helps all four heroes.

### 3.3 `/baskets` hero

**Copy:** unchanged: the h1 "Ready-made baskets for home", the lead (with the `allSave` clause), the
cut-off note, and the empty state with "Shop single items".

**Structure in JSX** (`src/components/pages/baskets/baskets-hero.tsx`, rewritten):

```tsx
<section aria-labelledby="baskets-title" className="on-dark-focus">
  <div
    className={cn(
      'relative isolate overflow-hidden bg-oxblood text-on-dark',
      rows.length ? 'pt-28 pb-28 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40' : 'pt-28 pb-16 lg:pt-24',
    )}
  >
    <StockPhoto
      name="basketsStall"
      alt=""
      preload
      sizes="100vw"
      imgClassName="object-[8%_top] md:object-[60%_35%]"
      className="absolute inset-0 -z-10 rounded-none"
    />
    <div aria-hidden className="absolute inset-0 -z-10 bg-photo-scrim" />
    <div className="mx-auto max-w-page gutter">
      <div className="max-w-2xl">
        <h1 id="baskets-title" className="text-h1 text-balance">
          Ready-made baskets for home
        </h1>
        <p className="mt-4 text-lead text-on-crimson-muted">…</p>
        {cutoff && <CutoffNote cutoff={cutoff} tone="onPhoto" className="mt-6" />}
        {!rows.length && (
          <ButtonLink href="/shop" variant="onDark" size="lg" className="mt-8">
            Shop single items
          </ButtonLink>
        )}
      </div>
    </div>
  </div>
  {rows.length > 0 && (
    <div className="relative z-raised mx-auto -mt-16 max-w-page gutter md:-mt-20 lg:-mt-28">
      <div className="animate-rise rounded-2xl bg-crimson p-2 text-on-dark shadow-float [animation-delay:120ms] sm:p-4 lg:px-8 lg:py-4">
        <PriceBoard rows={rows} jmdPerUsd={jmdPerUsd} />
      </div>
    </div>
  )}
</section>
```

**Notes**

- `on-crimson-muted` lead on oxblood 80%: 6.66:1 worst case, so it may stay muted.
- The cut-off uses `tone="onPhoto"` (on-dark icon) for consistency with the other photo bands. On
  this overlay blush would also pass (5.93:1).
- Photo `alt=""`: decorative behind text; the h1 names the page.
- `shadow-float` on the panel: it is a floating layer over the photo edge, so the shadow is
  allowed.
- The panel sits on `page` below the photo. The "What's inside" section that follows keeps its
  `section` top padding (64–96px), which is enough space below the panel.

**`PriceBoard` change** (`price-board.tsx`), for a 2-column board from 1024px:

- `<ol>`: `grid lg:grid-cols-2 lg:gap-x-10`.
- Each `<li>`: `border-b border-crimson-deep`. Drop `divide-y`, and drop `border-y` on the `<ol>`.
- First row(s): no top border. The panel's padding is the top edge.
- Remove the bottom border on the last row, and from 1024px on the last two:
  `last:border-0 lg:[&:nth-last-child(2):nth-child(odd)]:border-0`.
- Row grid unchanged. Rows keep `min-h-control`, the hover `bg-crimson-deep`, the pressed `oxblood`
  and the inset blush focus ring, and add `rounded-lg` so the hover fill sits nicely inside the
  panel.
- The ↓ arrow stays visible from 1024px.
- With an odd count the last cell is alone on its row, which is fine.

**Photo positions** (`basketsStall`, 5466×3649; pineapples hang top-left at 0–45% x, 0–35% y; the
woman stands right at about 78% x with her face at about 30% y; there is sun flare at about 57% x,
20% y):

| Width | Box (photo band) | Object position | What shows                                                                                                          |
| ----- | ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| 375   | 375×≈520         | `8% top`        | The two hanging pineapples fill the 112px gap above the h1 (the photo's subject on phones: a Caribbean fruit stall) |
| 768   | 768×≈470         | `60% 35%`       | Pineapples left, the woman and her bag right; text on the left                                                      |
| 1024  | 1024×≈470        | `60% 35%`       | Same; the text column (max 672px) leaves the woman visible at the right                                             |
| 1440  | 1440×≈460        | `60% 35%`       | The full stall; the woman at about x 1100, clear of the text column (x 144–816)                                     |

**Motion:** the board panel rises once (`animate-rise`, 120ms delay, 700ms). Nothing else. Reduced
motion shows it in place.

**Accessibility:**

- The board stays a `<nav aria-label="Baskets on this page">` of anchor links to `#<slug>`, with
  `scroll-mt-header` targets (unchanged).
- Each row is a 44px+ target.
- The text-on-overlay contrast is above. The board's contrast is unchanged (solid crimson).

**LCP and preload:**

- The photo is the LCP at every width, so `preload` it with `sizes="100vw"`. At 375 and DPR 2 that
  is a 750px-wide AVIF, about 60KB.
- The h1 is not animated, so it paints at first paint over the photo's slot.
- The photo band carries `bg-oxblood`, so the text has full contrast before the image arrives.

### 3.4 `/how-it-works` hero

**Copy:** unchanged: the h1 "Follow one order from your laptop to their door", the lead with
`parishList`, "Start shopping" → `/shop`, "Track an order" → `/track`, the cut-off note, the tracker
card (example SE-10428, Out for delivery, Paid at the example time, Shopped at the example time,
Receipt photo sent), "On this page" and the 7 jump links. All anchors are unchanged; `#proof-h` must
stay.

**Structure in JSX** (`src/components/pages/how-it-works/hiw-hero.tsx`, rewritten). The section
has two children: the **scene** (photo layer + content) and the **rail**. The rail sits outside the
photo layer.

```tsx
<section aria-labelledby="hiw-title" className="bg-ink text-on-dark on-dark-focus">
  {/* Scene */}
  <div className="relative isolate">
    {/* Photo layer: a 4:5 / 16:9 stage below 1024px, the whole scene from 1024px */}
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 -z-10 h-[125vw] md:h-[56.25vw] lg:inset-y-0 lg:h-auto"
    >
      <StockPhoto
        name="hiwSender"
        alt=""
        preload
        sizes="100vw"
        imgClassName="object-[72%_center] md:object-[62%_center] lg:object-[60%_40%]"
        className="absolute inset-0 rounded-none"
      />
      <div className="absolute inset-0 bg-photo-scrim-ink" />
    </div>

    <div className="mx-auto max-w-wide gutter pb-10 lg:grid lg:min-h-[640px] lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-32 lg:pb-12 xl:min-h-[720px]">
      <div className="lg:col-span-7">
        {/* Same height as the stage below 1024px, so the h1 always sits on the photo's bottom edge */}
        <div className="flex h-[125vw] flex-col justify-end pb-6 md:h-[56.25vw] md:pb-8 lg:block lg:h-auto lg:pb-0">
          <h1 id="hiw-title" className="max-w-2xl text-h1 text-balance">
            Follow one order from your laptop to their door
          </h1>
        </div>
        <p className="mt-6 max-w-2xl text-lead text-on-dark lg:mt-5">…unchanged lead…</p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <ButtonLink href="/shop" variant="onDark" size="lg" className="w-full sm:w-auto">
            Start shopping
          </ButtonLink>
          <Link href="/track" className={`${overlayLink} self-start sm:self-auto`}>
            Track an order
          </Link>
        </div>
        {earliestCutoff && (
          <CutoffNote cutoff={earliestCutoff} tone="onPhoto" className="mt-6 lg:mt-8" />
        )}
      </div>
      <div className="mt-8 w-full max-w-sm animate-rise [animation-delay:200ms] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:max-w-none lg:justify-self-end xl:w-80">
        {/* the existing tracker card markup, unchanged */}
      </div>
    </div>
  </div>

  {/* Rail */}
  <nav aria-label="On this page" className="bg-crimson">
    …
  </nav>
</section>
```

**Notes**

- **Stage alignment.** The photo layer and the h1 wrapper both use the same viewport height values
  (`h-[125vw]` = 4:5 of the full-bleed width; `md:h-[56.25vw]` = 16:9). Both start at the scene's
  top, so the h1's bottom always lands 24px (32px from 768) above the photo's bottom edge, whatever
  the gutter or line count. From 1024px both become `auto`, and the photo layer covers the whole
  scene (`lg:inset-y-0`).
- **Below 1024px** the area under the stage is solid `ink` (the section background). The hard edge
  between the photo stage and the solid ink sits **between the h1 and the lead**, never behind a
  line of text.
- **Lead colour.** The lead is `text-on-dark`, not `on-crimson-muted`: that would be 4.36:1 on the
  overlay, which fails.
- **Secondary link.** "Track an order" uses `overlayLink` (white underline) at all widths, so the
  link has one look on this page (on the photo at ≥1024px, on solid ink below).
- **Tracker card.** It keeps its markup, classes (`rounded-lg bg-surface p-4 text-ink
shadow-float`), `role="img"` and `aria-label`.
- **Dark bands.** The section's `bg-ink` meets the crimson rail inside the hero, which is fine. The
  rail meets the `page` journey section, so two dark bands never touch.

**Rail** (the "On this page" strip, docked):

```tsx
<nav aria-label="On this page" className="bg-crimson">
  <div className="mx-auto flex max-w-wide flex-col items-start gap-2 gutter py-3 md:flex-row md:items-center md:gap-4 lg:gap-6 lg:py-4">
    <p className="shrink-0 text-small text-on-crimson-muted">On this page</p>
    <ul className="-my-1 flex w-full snap-x gap-2 overflow-x-auto py-1 [scrollbar-width:thin] md:w-auto md:flex-wrap md:overflow-visible lg:gap-x-6 lg:gap-y-0">
      {jumpLinks.map((l) => (
        <li key={l.href} className="shrink-0 snap-start">
          <a
            href={l.href}
            className="inline-flex min-h-control items-center rounded-full bg-crimson-deep px-4 text-small font-semibold text-on-dark transition-colors duration-150 hover:bg-oxblood lg:bg-transparent lg:px-0 lg:text-body lg:underline lg:decoration-blush lg:decoration-2 lg:underline-offset-4 lg:hover:bg-transparent lg:hover:decoration-on-dark"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>
```

**Rail notes**

- 375: one row of chips that scrolls sideways, with the last chip cut off as a cue that there are
  more. The scrollbar is kept thin, not hidden. Keyboard Tab scrolls each chip into view.
- 768: the chips wrap onto two rows.
- 1024+: inline underlined links on one or two lines (the existing `onDarkLink` look, written out).
- Below 768 the "On this page" label sits above the chips (`flex-col items-start`), and beside them
  from 768. Use `flex-col items-start md:flex-row md:items-center`.
- The rail is crimson, the journey section after it is `page`, and there is no dark-on-dark
  contact.

**Photo positions** (`hiwSender`, 3840×2160; her face is at about 62% x, 35% y, and the laptop is
bottom-left):

| Width | Photo box               | Object position | What shows                                                                                                                                         |
| ----- | ----------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 375   | 375×469 (`h-[125vw]`)   | `72% center`    | Her face centred in the top half (head ≈ y 33–258); the h1 (≈ 3 lines, ≈ 104px) sits at y ≈ 340–445, below her chin                                |
| 768   | 768×432 (`h-[56.25vw]`) | `62% center`    | The full frame; the h1 (2 lines) at the bottom-left over the laptop and bed                                                                        |
| 1024  | 1024×≥640 (scene)       | `60% 40%`       | Her face and shoulders right of centre; the text block bottom-left over the bed and laptop; the tracker card bottom-right over her arm and the mug |
| 1440  | 1440×720                | `60% 40%`       | Same composition, more of the room                                                                                                                 |

**Motion:** the tracker card rises once (`animate-rise`, 200ms delay). Text is static. Reduced
motion shows it in place.

**Accessibility:**

- One h1.
- The decorative photo layer is `aria-hidden` with `alt=""`.
- The rail is a labelled `<nav>`, and every chip is 44px tall.
- The horizontal scroll region contains only focusable links, so keyboard users reach every item.
- The contrast numbers are above. The tracker card text is unchanged (ink on white).

**LCP and preload:**

- The photo is the LCP at every width, so `preload` it with `sizes="100vw"`. On phones the stage is
  only 375×469, so the file is small (750px wide at DPR 2).
- The section background `bg-ink` gives the h1 full contrast before the photo arrives.

### 3.5 `/about` hero

**Copy:**

- The word "bearer" and the "noun" tag.
- Sense 1: "Someone who carries something to another person, on your behalf." (unchanged).
- Sense 2 (h1): "A St. Thomas courier, shopping for your family." (unchanged; the full stop is added
  because it is now a dictionary sense).
- Lead: unchanged (`{site.company} is a courier and errand business…`).
- Origin note: "From our registered name, {site.company}. We run errands and deliver for people who
  can't be there themselves." This is a reworded version of the old figure's footnote ("It's the
  job in our name…"), so it reads as a dictionary origin line.
- CTAs: "Start shopping" → `/shop`, and "Company details and contact" → `#company-details`
  (unchanged).

**Structure in JSX** (`src/components/pages/about/hero.tsx`, rewritten):

```tsx
<section aria-labelledby="about-title" className="bg-oxblood section-lg text-on-dark on-dark-focus">
  <div className="mx-auto max-w-wide gutter">
    <p lang="en" className="text-poster text-blush">
      bearer
    </p>
    <span className="mt-4 inline-flex rounded-sm bg-crimson px-2 py-0.5 text-xs font-bold text-on-dark md:ml-16 lg:ml-24">
      noun
    </span>

    <div className="mt-8 max-w-5xl lg:mt-10">
      <div className="flex animate-rise gap-0 [animation-delay:80ms]">
        <span aria-hidden className="w-10 shrink-0 text-h1 text-blush tabular-nums md:w-16 lg:w-24">
          1
        </span>
        <p className="text-h1 text-balance text-on-oxblood-muted">
          Someone who carries something to another person, on your behalf.
        </p>
      </div>
      <div className="mt-6 flex animate-rise [animation-delay:160ms] lg:mt-8">
        <span aria-hidden className="w-10 shrink-0 text-h1 text-blush tabular-nums md:w-16 lg:w-24">
          2
        </span>
        <h1 id="about-title" className="text-h1 text-balance text-on-dark">
          A St. Thomas courier, shopping for your family.
        </h1>
      </div>
    </div>

    <div className="mt-8 max-w-2xl md:ml-16 lg:mt-10 lg:ml-24">
      <p className="text-lead text-on-dark">{lead}</p>
      <p className="mt-4 border-t border-line-on-dark pt-4 text-body text-on-oxblood-muted">
        From our registered name, {site.company}. …
      </p>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <ButtonLink href="/shop" variant="onDark" size="lg" className="w-full sm:w-auto">
          Start shopping
        </ButtonLink>
        <Link href="#company-details" className={`${onDarkLink} self-start sm:self-auto`}>
          Company details and contact
        </Link>
      </div>
    </div>
  </div>
</section>
```

**Notes**

- Both senses use `text-h1`. Sense 1 is in `on-oxblood-muted` (the general meaning, quiet) and
  sense 2 in `on-dark` (ours, loud). The weight of meaning comes from colour, not size, which keeps
  the dictionary conceit honest.
- Numerals: `text-h1 text-blush` (10.5:1). They are not `signal`, which is only 3.24:1 on oxblood.
- "noun" tag: crimson fill on oxblood with `on-dark` text (7.22:1).
- **The `text-poster` token is new** (see §4). Fallback if it is rejected: `text-display` (48 → 77px).
- The old "bearer" figure (a crimson-deep card beside the text) is **dropped**: the entry is now the
  whole hero, which is stronger.
- **Remove the existing `<figure aria-label>`**, because the h1 now sits inside the entry.

**States:** the button and link use the existing on-dark styles. The focus ring is blush (10.5:1 on
oxblood).

**Motion:** the senses rise once, 1 then 2 (80ms, 160ms). The poster word is static (it is the LCP),
and so are the lead and CTAs. Reduced motion shows everything at once.

**Accessibility:**

- Reading order: "bearer", "noun", sense 1, h1 (sense 2), lead, origin, CTAs. The numerals are
  `aria-hidden`.
- `lang="en"` on the word, as now.
- The poster word is a `<p>`, not a heading, so the h1 stays the page's only level-1 heading.
- At 375 "bearer" at 72px / 900 weight measures about 260px, which fits 343px without breaking.
  Test at 320px: 72px is about 260px, which still fits within 288px.

**LCP:** the "bearer" text (static, no image). There is no preload. This is the fastest hero.

**Next band:** `AboutStory` is on `page`, so oxblood never touches oxblood. `AboutWhere` (photo +
oxblood scrim) is two sections further down.

---

## 4. Knock-on effects

### 4.1 Tokens (`src/app/globals.css`, `docs/TOKENS.md`)

| Token                     | Change                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-photo-scrim-ink` | **New role:** `rgb(43 35 38 / 0.7)` (ink-900 at 70%), with the comment "Flat ink at 70% over a full-bleed photo (How it works hero). Only on-dark text: 5.7:1 over a pure white pixel. No blush or muted text on it." Built from an existing primitive, as BRAIN §6 allows.                                                                                                            |
| `--text-poster`           | **New type step (proposed; manager's call):** `clamp(4.5rem, 3.2rem + 5.5vw, 8.125rem)` (72 → 130px), `--text-poster--line-height: 0.85`, `--text-poster--letter-spacing: -0.045em`, `--text-poster--font-weight: 900`. It sits two modular steps above display (77 × 1.3² ≈ 130), so it stays on the scale. Rule: "one word per page, the About hero only". Fallback: `text-display`. |
| `on-dark-focus`           | **Still needed** for the heroes, closing panels, oxblood bands and footer. It is **removed from the header bar and the phone search row** (light now). Update its comment in `globals.css`: "the header" no longer applies.                                                                                                                                                            |
| `photo-scrim`             | Unchanged; now also used by the `/baskets` hero. Update its comment ("home S7, about S4, baskets hero").                                                                                                                                                                                                                                                                               |
| `text-display`            | Unchanged; still "the home hero headline only".                                                                                                                                                                                                                                                                                                                                        |

### 4.2 Tests (`src/lib/design-tokens.test.ts`)

- Add `'photo-scrim-ink'` to the list of translucent roles excluded from the hex check.
- Add `on-dark on photo-scrim-ink over white ≥ 4.5`.
- Add `blush focus ring on photo-scrim-ink over white ≥ 3` (the worst case here is the white pixel:
  3.88).
- Add `blush on photo-scrim-ink over black ≥ 3`.
- If a test lists roles to keep `signal` off small text, no change is needed.

### 4.3 Photos (`src/lib/photos/*.ts`)

**New: `basketsStall`** (add to `src/lib/photos/shop.ts`, next to the other basket photos):

| Field        | Value                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| unsplashId   | `SZGeQlFWEIY`                                                                                                  |
| src          | `https://images.unsplash.com/photo-1556137063-79f1ed788b08`                                                    |
| width/height | 5466 × 3649                                                                                                    |
| photographer | Giorgia Doglioni                                                                                               |
| username     | `gio_aroundtheworld`                                                                                           |
| alt          | "A woman buying from a fruit stall hung with pineapples" (the hero uses `alt=""`; the credits page uses this)  |
| position     | none (the hero sets responsive classes)                                                                        |
| usedOn       | "Baskets (hero)"                                                                                               |
| Licence      | Unsplash License (free, not Unsplash+; `premium: false`)                                                       |
| Load check   | `curl` status **200** (640px test file, November 7, 2026)                                                      |
| Before build | Record the download with `mcp__Unsplash__download_asset` (`asset_id: "SZGeQlFWEIY"`), per approval amendment 4 |

Honesty note: the photo shows a roadside stall, not the store our driver uses. It carries no claim
or caption, the page copy says "Our driver buys every item in Jamaica", and the photo is not
labelled as Jamaica. See open question 2 for a safer swap.

**Reused photos:**

- `familyPhone` (home hero, as now).
- `hiwSender` (`/how-it-works` hero, as now).
- Update `usedOn` text where the slot changes (`hiwSender`: "How it works (hero background)").

**Removed:** none. Every existing photo keeps a page.

**Credits:** `/photo-credits` picks up `basketsStall` from the registry automatically.

### 4.4 Components

- `StockPhoto` / `StockImage`: add the `imgClassName` prop (§3.2).
- `CutoffNote`: no change. Callers pass `justify-center`.
- `PriceBoard`: the 2-column grid and per-row borders (§3.3).
- `Wordmark`: no change; the header uses the light variant.
- `onDarkLink`, `overlayLink`: no change.

### 4.5 Styleguide (`src/app/styleguide/page.tsx`)

- Add a `photo-scrim-ink` swatch next to `photo-scrim` in the roles table, with "ink 70%, How it
  works hero".
- Add a second overlay demo tile.
- Add a `text-poster` line to the type scale table (if approved).
- Update the focus intro text: "On crimson and oxblood (not the header, which is light) the focus
  ring turns blush."

### 4.6 Docs to update in the same change

- `docs/TOKENS.md`: the two new tokens, the `on-dark-focus` note (header removed), and the overlay
  contrast table rows for `photo-scrim-ink`.
- `docs/DESIGN-SYSTEM.md`: header section (light bar, crimson basket pill, tab marker, signal
  focus), `StockPhoto imgClassName`, and the overlay rule now listing two roles.
- `docs/PHOTOGRAPHY.md`:
  - The overlay rule lists `photo-scrim` (oxblood 80%) **and** `photo-scrim-ink` (ink 70%).
  - Add the phone rule "keep the subject's face out from behind text on phones: use a stage plus a
    solid continuation".
  - Add `basketsStall`.
- `docs/DESIGN-DECISIONS.md`: a dated entry (November 7, 2026): light header, four hero patterns
  and why.
- `docs/home-redesign/PLAN.md` and `docs/pages-redesign/*.md`: add one line at the top of each S1
  pointing to this plan as superseding the hero (don't rewrite them).
- `docs/BRAIN.md §7`: mark the follow-up "compact header search button 36px" as done once built.

---

## 5. Self-review against generic defaults

**Pass 1 to pass 2 changes**

1. **Home.** My first idea was a full-bleed photo with white centred text and the receipt in a
   corner, which is the cliché the brief warns about. Revised: the photo carries **no text**. The
   statement lives on solid crimson, and the receipt bridges the two bands, so the structure itself
   tells "printed in Jamaica, lands at home".
2. **`/how-it-works`.** First idea: text over the photo at every width. On a 375px phone the
   sender's face would sit behind the h1 at any overlay strength. Revised: below 1024px a photo
   stage carries only the h1, below her chin, and the rest continues on solid ink.
3. **`/baskets`.** First idea: a centred title over the photo. That mirrored home's centring for the
   page home links to. Revised: left-aligned, sharing one edge with the board panel, and a 2×2 board
   from 1024px so the prices read as a shop board, not a long table.
4. **`/about`.** First idea: keep the dictionary card beside the h1, which is a two-column split
   again. Revised: the entry is the hero, and the h1 becomes sense 2. The only numbering on the four
   heroes is the dictionary's own sense numbers, a real sequence.
5. **Header.** I considered a crimson top rule above the white bar as a "brand stripe". It was cut
   (Chanel's accessory): red comes from the basket pill, the current-page tab and the crimson
   "East".

**Generic-AI tells checked:**

- No gradients or gradient overlays; every overlay is one flat role.
- No eyebrow labels above titles.
- No ALL CAPS.
- No single highlighted word in a headline.
- No "→" in link text.
- No middle-dot meta strings in the UI. The wireframes use "·" only as a drawing shorthand; the rail
  is a list.
- No identical card kit: each hero's object is different (receipt, board, tracker, dictionary).
- One motion moment per page.
- Shadows only on floating layers (receipt, board panel, tracker card, scrolled header).

**Where boldness is spent:** one place per page (the receipt's crossing, the red board, the card on
the scene, the poster word). The header is deliberately quiet.

**ui-ux-pro-max pre-delivery checklist**

- [x] No emoji icons; lucide only (Search, User, ShoppingBasket, Menu, Clock, Camera, Check,
      ArrowDown).
- [x] `cursor-pointer` on clickable elements: links and buttons (the existing menu trigger already
      has it).
- [x] Hover transitions of 150–300ms (150ms colour, 250–450ms layout).
- [x] Light-mode text contrast is 4.5:1 or more everywhere (numbers in §2–§3).
- [x] Focus visible: `signal` on the light header, `blush` on dark bands (≥3:1 on all overlays).
- [x] `prefers-reduced-motion` respected (global rule; every animation has a static end state).
- [x] Responsive at 375 / 768 / 1024 / 1440, with crops stated per width.
- [x] 44px touch targets, including the header search submit button (fixed from 36px).
- [x] Reserved space, no CLS: photos sit in aspect or `vw`-sized boxes, and the receipt and board
      are positioned inside reserved bands.
- [x] Photos as AVIF/WebP via the Unsplash `auto=format` loader, with `sizes` set; one preload per
      page.

---

## 6. Acceptance checklist

**Header**

- [ ] White bar with a 1px `line` edge on every page. The scrolled state adds `shadow-lift`.
- [ ] On phones at the top of a page, the bar and the search row read as one white block, with the
      line under the row. On `/shop`, `/search`, `/basket` and `/checkout` the bar shows its own
      line.
- [ ] Wordmark light variant: ink "Ship", crimson "East", `ink-muted` "Shop & Send".
- [ ] Nav: ink text, `surface-muted` hover. The current page is crimson, with a 3px crimson tab on
      the bar's line, at 1024 and 1440.
- [ ] Basket pill solid crimson with a white count pill. Hover `crimson-deep`.
- [ ] The focus ring is `signal` on the bar, the search row and the menu trigger. No blush ring on
      the header.
- [ ] Search field 52px with a `line-strong` border. The submit button is 44px tall (measure it) in
      the bar (768, 1440) and the phone row.
- [ ] The demo banner (ink) above the bar looks deliberate.
- [ ] No `on-dark-focus` left in `header-shell.tsx` or `header-search-row.tsx`.

**Home**

- [ ] Centred h1, lead, CTAs and cut-off on crimson; nothing in two columns.
- [ ] The full-bleed photo has no overlay and no text on it; it uses `aspect-4/5`, `16/9`, `21/9`
      and `3/1` by width.
- [ ] The receipt straddles the seam at the left: 64px or 96px into crimson, with at least 24px
      clear below the cut-off note at every width. It never covers the woman's face (check at 375,
      768, 1024 and 1440).
- [ ] The receipt prints once. With reduced motion it is static.
- [ ] Phone LCP is text (Lighthouse mobile shows the LCP element is the h1 or lead).

**`/baskets`**

- [ ] Photo under a flat `photo-scrim` with no gradient. The h1, lead and cut-off are left-aligned
      on it.
- [ ] Pineapples visible above the h1 at 375. The woman is visible to the right of the text at 1024
      and 1440.
- [ ] Crimson board panel overlapping the photo's bottom edge by 64, 80 or 112px; 1 column below
      1024px, 2 columns from 1024px. Row borders are right, with no stray line at the bottom.
- [ ] Every row jumps to its basket (anchors unchanged), and the board panel rises once.
- [ ] Empty state: no panel, and the "Shop single items" button is on the photo.
- [ ] `basketsStall` is in the registry with full credit, its download is recorded, and it appears
      on `/photo-credits`.

**`/how-it-works`**

- [ ] New `photo-scrim-ink` role, with tests for 4.5:1 text and 3:1 ring passing.
- [ ] Below 1024px: the 4:5 or 16:9 photo stage shows her face clear of the h1, and the h1 bottom
      sits 24–32px above the stage edge. The lead, CTAs, cut-off and tracker are on solid ink.
- [ ] From 1024px: one scene, text bottom-left, tracker card bottom-right at the same baseline.
      `min-h` 640px or 720px.
- [ ] No blush or `on-crimson-muted` text on the overlay. The lead is `on-dark`.
- [ ] Crimson rail docked under the scene, with 7 links that keep their anchors (`#proof-h` works
      from home). Phone: one scrollable row of 44px chips. 768: chips wrap. 1024+: underlined
      inline links.
- [ ] The tracker card rises once.

**`/about`**

- [ ] Solid oxblood, type only, no photo, one alignment axis (the hanging indent).
- [ ] "bearer" at `text-poster` (or the `text-display` fallback), blush, on one line at 320px and
      375px.
- [ ] Sense 1 is muted, sense 2 is the h1 in `on-dark`; the numerals are blush and `aria-hidden`.
- [ ] The origin note names ShipEast Couriers & Bearer Service Ltd. The CTAs work, and
      `#company-details` scrolls below the header.
- [ ] The senses rise in order. With reduced motion everything is static.

**All**

- [ ] Each of the four heroes has a different pattern, and none is a 50/50 or 7/5 text and
      framed-photo split.
- [ ] Contrast numbers as stated. No raw hex in components. `design-tokens.test.ts` is green.
- [ ] `<link rel="preconnect" href="https://images.unsplash.com">` is in the site layout. One
      preloaded image per photo hero.
- [ ] Playwright screenshots at 375, 768, 1024 and 1440 of all four pages and of `/shop` (header on
      `page`), with real photos loading, compared with the "before" set.
- [ ] No horizontal overflow at 320 and 375 (watch the rail and the poster word), no console errors
      and no hydration warnings.
- [ ] Docs updated (§4.6). `npm run check` is green.

---

## 7. Open questions for the manager

1. **`text-poster` token.** Approve the new 72 → 130px step (About only), or use `text-display`
   (48 → 77px)? Recommendation: approve. The word only works as the hero if it is clearly bigger
   than the home headline.
2. **`/baskets` photo honesty.** `basketsStall` is a warm, sunlit fruit stall, but it is not
   confirmed Jamaica and our driver shops at stores. It carries no caption and no claim. If you
   prefer zero ambiguity, swap to the existing `shopChoosing` (a shopper choosing vegetables, used
   on Shop) with object positions `60% center` / `55% 40%`. The structure is unchanged.
3. **Ink overlay strength.** I chose 70% (5.71:1 worst case). If QA shows the bright bedsheet making
   text feel thin, go to 75% (6.74:1) by changing only the role's alpha. No layout change.
4. **Header line on phones.** The `:has(+[data-header-row])` rule hides the bar's line at the top on
   phones so the bar and the search row read as one. If you'd rather keep it simple, drop that one
   class and accept a hairline between the bar and the search row.
