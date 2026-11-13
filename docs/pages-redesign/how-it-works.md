# How it works redesign: build plan

Owner: design agent · For: the manager, then the development agent · Scope: `/how-it-works`
between the shared header and footer (both already built, untouched).

Read with `CLAUDE.md`, `docs/BRAIN.md`, `docs/TOKENS.md`, `docs/DESIGN-SYSTEM.md`,
`docs/PHOTOGRAPHY.md` and `docs/home-redesign/PLAN.md`. Where this plan and those files
disagree on a brand rule, those files win, and the developer flags it to the manager.

Build exactly what is written. Every class named below exists today unless it is listed in
[§2.4 New tokens](#24-new-tokens). Every number on the page comes from a loader or is
labelled as an example.

---

## Contents

1. [Concept](#1-concept)
   1B. [Structure blueprint](#1b-structure-blueprint): read this first
2. [Decisions shared by every section](#2-decisions-shared-by-every-section)
3. [Data and helpers](#3-data-and-helpers)
4. [Sections S1 to S8](#4-sections)
5. [Performance and rendering](#5-performance-and-rendering)
6. [Photo register](#6-photo-register)
7. [Self-review](#7-self-review)
8. [Acceptance checklist](#8-acceptance-checklist)
9. [Open questions and content that needs Derion](#9-open-questions)
10. [Files to create, change and delete](#10-files)

---

## 1. Concept

**One line.** _Follow one order from your laptop to their door._ The page is one real-shaped
order told in time order, with every proof and every choice placed at the moment it happens.

|                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Audience             | A careful first-time sender abroad (New York, Toronto, London), usually on a phone, about to pay a company they have never used, for a mother or grandmother in St. Thomas or Kingston. They read every word before paying.                                                                                                                                                                                                                                                                                                 |
| The page's one job   | Remove every "but what if…" before they pay: what happens, when, what they will see, what their family will get, what happens if something is missing or nobody is home.                                                                                                                                                                                                                                                                                                                                                    |
| The ONE bold element | **The two-lane order day (S2).** One example order runs down the page as the seven real tracker stages (`TRACKER_STAGES`), each with a Jamaica clock time. Beside each stage, two lanes: **"On your screen"** (white cards on the grey page: the email receipt, the receipt photo, the door photo, the refund) and **"In Jamaica"** (one continuous solid **oxblood** column: the driver in the aisle, the texts to the family, the handover). The sender sees, row by row, that what happens over there arrives over here. |
| Tone                 | Plain, warm, exact. Clock times, item names, real fees. No adjectives doing the work of proof.                                                                                                                                                                                                                                                                                                                                                                                                                              |

### How it beats each competitor's explanation

| Competitor                | Their "how it works"                                                            | Our answer here                                                                                                                                           | Where        |
| ------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| grocerylistjamaica.com    | Three generic icon steps: order, we shop, we deliver                            | The seven stages the tracker really shows, with times, and what lands in your inbox at each one. The receipt photo explained: what it shows, when, where. | S2, S3       |
| revvcouriers.com          | Courier booking, no shopping detail                                             | We shop to your list and follow your out-of-stock rule, shown with a real item from our catalogue and its refund.                                         | S2 row 3, S4 |
| PriceSmart Jamaica        | Membership store; you or your family must be there                              | Nobody in Jamaica needs a membership, an app or an account: two texts and a knock at the door.                                                            | S5           |
| Remittance and gift sites | Money is collected; you never see what it bought, nobody tells you if it failed | You see the receipt, the door, and exactly what happens if nobody is home.                                                                                | S3, S6       |

We never name a competitor on the page.

---

## 1B. Structure blueprint

### 1B.1 Whole-page skeleton

`▓` red (crimson / oxblood), `░` neutral (`page` / `surface`), `▒` photo. Heights are
approximate. Header (72 / 120px) and footer are shared and not part of this plan.

```
1440 × ~6,900px                                                     375 × ~10,400px

┌▓ HEADER (shared)                                          72 ┐     ┌▓ HEADER (shared) bar + search  120 ┐
├▓ S1 HERO  split 7/5: text | framed photo + tracker card      │     ├▓ S1 HERO  text, photo + card,      │
│▓          + "On this page" strip across the foot     ~760 ▒ │     │▓  jump strip (2-col links)    ~1150 ▒│
├░ S2 ORDER DAY  header, then 7 rows × 3 columns:              │     ├░ S2 ORDER DAY  header, then 7 rows: │
│░   spine (time + stage) | "On your screen" (white cards)     │     │░  spine on the left, each row =      │
│░   | "In Jamaica" (one continuous oxblood column)  ~2,000 ▓  │     │░  stage, white card, oxblood card ~3,600▓│
├░ S3 PROOF  surface; split 6/6: proof pair | 2 explanations   │     ├░ S3 PROOF  title, proof pair,       │
│░                                                    ~720     │     │░  2 explanation blocks       ~1,350 │
├░ S4 SUBSTITUTIONS  page; header + item strip + 3-card row    │     ├░ S4 SUBS  header, item strip,       │
│░                                                    ~760     │     │░  3 stacked cards            ~1,450 │
├░ S5 FAMILY  surface; split 5/7: tall framed photo | texts    │     ├░ S5 FAMILY  title, photo 4:3,       │
│░          + 3 tips                                  ~780 ▒   │     │░  SMS panel, 3 tips          ~1,350 ▒│
├▓ S6 TIMING  full oxblood band; split 7/5: cut-off ruler +    │     ├▓ S6 TIMING  ruler, zones, then      │
│▓   zone rows | "If nobody is home" bordered panel   ~640     │     │▓  nobody-home panel          ~1,250 │
├░ S7 QUESTIONS  surface; split 4/8: intro | accordion ~520    │     ├░ S7 QUESTIONS  intro, list    ~800 │
├░ S8 CLOSING  page band + contained crimson panel    ~380     │     ├░ S8 CLOSING  stacked panel    ~460 │
└▓ FOOTER (shared, oxblood)                                    ┘     └▓ FOOTER (shared)                   ┘
```

**Rhythm.** Red mass (hero) → light page carrying the one oxblood lane (the bold element) →
two calm light bands (proof, substitutions) → light band with a photo (family) → full oxblood
band (timing) → light (questions) → contained crimson panel → oxblood footer. No two
full-width red bands touch: the S2 lane starts below S2's own header, inside the page band;
S8's crimson is a contained panel on `page`, so it never touches the footer.

**Photo rhythm.** Only two photos on the page (hero, family), a text-led explainer must load
fast on a phone. The rest is drawn proof (receipt, door card, texts, tags), which is the
point of the page.

### 1B.2 Section structures at a glance

| Section          | 1. Pattern                                                                                                                                                 | 2. Background                                                                                      | 3. Container / height                                      | 4. Columns 375 → 768 → 1024 → 1440 (phone order first)                          | 5. Blocks (counts)                                                                                                                                   | 6. Why this structure serves the sender                                                                                                                                                                                                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1 Hero          | **Split two-column 7/5**: text left, framed photo right with a tracker card straddling its bottom-left edge; a full-width "On this page" strip at the foot | Solid `crimson`                                                                                    | Full-bleed band, content `max-w-wide`; auto (~760 at 1440) | 1 (text, photo + card, strip) → 1 → 2 (7/5) → 2 (7/5)                           | h1, lead, 1 button + 1 text link, cut-off note, 1 photo, 1 tracker card, 7 jump links                                                                | The promise and the start button first; the tracker card shows the product's proof object before it is explained (the home page used the receipt; this page uses the tracker, so the two heroes differ but speak the same language). The jump strip lets a returning reader go straight to "nobody home" or "out of stock". |
| S2 Order day     | **Three-column timeline table** (spine + two lanes), 7 rows                                                                                                | `page`; the "In Jamaica" lane is a continuous solid `oxblood` column (rounded 24px top and bottom) | Contained `max-w-page`; auto (~2,000 at 1440)              | 1 (stage, screen card, Jamaica card, per row) → 1 → 3 (3/4/5 of 12) → 3 (3/4/5) | h2, lead, lane header row, 7 rows = time + stage label + 1 screen cell + 1 Jamaica cell, 1 footnote                                                  | Answers "what will I see, and when?" with the real tracker stages. The two lanes make the cross-border promise visible: what happens there arrives here. No competitor shows time-stamped proof per step.                                                                                                                   |
| S3 Proof         | **Split two-column 6/6**: proof pair left, two definition blocks right                                                                                     | Solid `surface`                                                                                    | Contained `max-w-page`; auto (~720)                        | 1 (title, pair, blocks) → 1 (pair centred max 560px) → 2 → 2                    | h2, lead, 1 `ProofPair` (light, tilted), 2 blocks = icon disc + h3 + 3 facts (`dl`)                                                                  | The two photos are the product. Each gets a plain "what it shows / when / where" so the sender knows exactly what to expect, not a slogan.                                                                                                                                                                                  |
| S4 Substitutions | **Header + item strip + three-card row**                                                                                                                   | `page`                                                                                             | Contained `max-w-page`; auto (~760)                        | 1 (strip, 3 stacked cards) → 1 (strip, 3 horizontal cards: icon left) → 3 → 3   | h2, lead, 1 "out of stock" item strip (real product), 3 cards = icon + h3 + rule text + "what you see" outcome tag                                   | One item, three outcomes, side by side: the sender compares the rules on the same example and picks theirs with confidence. Competitors say "we may substitute".                                                                                                                                                            |
| S5 Family        | **Split two-column 5/7**: framed tall photo left, texts right                                                                                              | Solid `surface`                                                                                    | Contained `max-w-page`; auto (~780)                        | 1 (title, photo 4:3, SMS, tips) → 1 (photo 16:9) → 2 → 2                        | 1 photo 4:5, h2, lead, 1 `SmsPreview` (2 messages), 1 caption, 3 tips (icon + text)                                                                  | The sender worries about the person at the other end. A real-looking face at a real-looking door, then exactly what lands on her phone.                                                                                                                                                                                     |
| S6 Timing        | **Full-width band, split 7/5**: cut-off ruler + zone rows left, bordered "nobody home" panel right                                                         | Solid `oxblood`                                                                                    | Full-bleed band, content `max-w-page`; auto (~640)         | 1 (ruler, zones, notes, panel) → 1 → 2 (7/5) → 2 (7/5)                          | h2, lead, 1 two-segment ruler, 1 row per active zone (parish + speed + cut-off + fee), 1–2 notes, 1 panel = h3 + 3-step `ol` + status line + 2 links | Timing and failure are the two fears left. Real cut-offs and fees from the zones table; the failure path stated plainly in three steps. Dark band = the serious, operational part of the page.                                                                                                                              |
| S7 Questions     | **Split two-column 4/8** (reuse `HomeQuestions`)                                                                                                           | Solid `surface`                                                                                    | Contained `max-w-page`; auto (~520)                        | 1 → 1 → 2 → 2                                                                   | h2, lead, 2–3 contact links, 5 accordion items                                                                                                       | The doubts not answered above (cancelling, paying, stores, gift message) without leaving the page.                                                                                                                                                                                                                          |
| S8 Closing       | **Single contained panel** (reuse `HomeClosing`)                                                                                                           | `page` band + solid `crimson` panel                                                                | Contained `max-w-page`; auto (~380)                        | 1 → 1 → 2 (text / buttons) → 2                                                  | h2, 1 line, 1 button + 1 text link                                                                                                                   | One calm ask after every doubt is answered.                                                                                                                                                                                                                                                                                 |

---

## 2. Decisions shared by every section

### 2.1 Design language (same brand as the new home page)

- Large solid `crimson` and `oxblood` blocks; `page` and `surface` bands; flat cards with a
  `line` border; only floating objects get `shadow-float` (the hero tracker card).
- **No eyebrows anywhere on this page.** The old page had one above every heading; they are
  removed. Section titles are `text-h2`, card titles `text-h3`, the page title `text-h1`
  (`text-display` is the home hero only).
- Text left-aligned. Paragraphs `max-w-2xl`.
- Icons: `lucide-react` only, `size-icon` (20px) in lists, `size-icon-lg` (24px) in discs,
  decorative ones `aria-hidden`.
- Numbered markers appear only where the content is a real sequence: the seven stages (S2)
  and the three "nobody home" steps (S6). The three substitution rules are **not** numbered
  (they are alternatives, not steps).
- Links on light bands use the home's `lightLink` (`src/components/pages/home/steps.tsx`);
  on crimson the home's `onCrimsonLink` (`hero.tsx`); on oxblood the `overlay`-style link
  defined in S6.

### 2.2 Motion

One orchestrated moment only: the **hero entrance** (h1, lead and actions use the existing
CSS `animate-rise`, photo and tracker card too; no JavaScript). Nothing animates on scroll:
no `Reveal`, `Stagger` or `Parallax` on this page (the old page used all three, they are
removed). The old scroll-linked `StageTimeline` line fill is removed: the spine is drawn
complete because the example order is complete.

Motion that answers an action stays: accordion open (existing), button press (existing),
link underline on hover (150ms). `prefers-reduced-motion`: `animate-rise` is already off
under reduced motion (globals.css); nothing else moves.

### 2.3 Example content rule

Everything that is not live data is labelled **"Example"** on screen, once per block, and in
the accessible name: the order, its times, the names, the texts. Names used: sender
**Andre**, recipient **Paulette Brown** in **Yallahs, St. Thomas** (already used by the
current page; Title Case). The order ref `SE-10428` is the client's own example format
from `CLAUDE.md`.

### 2.4 New tokens

**None.** Every class below exists today. (`photo-scrim` is not used on this page: no text
sits on a photo.)

---

## 3. Data and helpers

### 3.1 Loaders (all cached; the page body prerenders like the home page)

```ts
const [settings, zones, allBaskets, products, faqs] = await Promise.all([
  getSettings(), // jmdPerUsd, bankTransfer, bankTransferHoursToPay, email, whatsapp
  getActiveZones(), // parish, feeCents, speed, cutoffTime (St. Thomas, Kingston today)
  getBaskets(), // the example order's basket
  getProducts(), // names + prices for the example receipt and the out-of-stock item
  getFaqs(),
])
```

Derived with existing helpers from `src/lib/home.ts`: `earliestCutoff(zones)`,
`joinParishes(...)`, `buildReceipt(basket, products, settings.jmdPerUsd)`,
`pickHomeFaqs(faqs, ids)` (it already takes an `ids` argument).

`bankTransfer = Boolean(settings.bankTransfer.bankName)` (same test as the home page; the old
page used `availablePaymentMethods`, either is fine, use the home's for consistency).

### 3.2 New pure helper file: `src/lib/how-it-works.ts` (+ `how-it-works.test.ts`)

```ts
/** The basket the example order is built from; the first featured basket if it is gone. */
export const EXAMPLE_BASKET = 'family-food-basket'

/** Example clock times (Jamaica time, HH:MM) for each tracker stage. `closed` has none:
 *  refund timing is not promised (needs Derion). Paid is before any sane cut-off. */
export const EXAMPLE_TIMES: Record<TrackerStage, string | null> = {
  paid: '09:12',
  confirmed: '09:20',
  shopping: '10:35',
  shopped: '11:48',
  out_for_delivery: '12:05',
  delivered: '12:52',
  closed: null,
}

/** The example order: basket, the zone it goes to (St. Thomas if active, else the first
 *  active zone), the out-of-stock item (the basket's first item that has a product),
 *  and totals. Null when there is no basket, no zone or no product to show. */
export function buildExampleOrder(
  basket: Pick<Basket, 'name' | 'priceCents' | 'items'>,
  products: Pick<Product, 'id' | 'name' | 'priceCents'>[],
  zones: Pick<DeliveryZone, 'parish' | 'feeCents'>[],
): {
  basketName: string
  basketCents: number
  parish: string
  feeCents: number
  totalCents: number // basketCents + feeCents
  missing: { name: string; cents: number } | null // price × 1, the refund in the example
} | null

/** The questions this page answers, in order: cancelling, paying, bank transfer,
 *  stores, gift message. faq-5 is dropped by the page when bank transfer is off. */
export const HOW_IT_WORKS_FAQ_IDS = ['faq-10', 'faq-4', 'faq-5', 'faq-2', 'faq-3']
```

Tests: St. Thomas chosen when present; falls back to first zone; `missing` skips items whose
product is gone; null with no zones; total = basket + fee.

The example order is shown with **one item missing and refunded** (the substitution rule
"Leave it out" in S2 row 3 and the refund in row 7), so S2 and S4 tell one story.

### 3.3 Server-side example arrays (in the section components, not in the DB)

- `exampleTexts`: the two family texts (S2 rows 5 and 6, S5). One array, imported by both,
  so the wording never drifts:
  1. `ShipEast: Hi Paulette, groceries from Andre are on the way. Your driver will call when they are close.`
  2. `ShipEast: Delivered. Your groceries from Andre were handed over at 12:52 PM.`
     (12:52 PM comes from `formatClockTime(EXAMPLE_TIMES.delivered)`.)
     Marked "needs Derion": replace with the real Twilio templates once written (same note as
     the home page's `texts`).

---

## 4. Sections

Page file: `src/app/(site)/how-it-works/page.tsx` (server). Section components live in
`src/components/pages/how-it-works/` (new folder), one file per section, all **server
components** unless stated.

Metadata (keep the route, rewrite the copy):

```ts
title: 'How it works'
description: 'Follow one order from your laptop to a door in St. Thomas or Kingston: the seven steps you can track, the receipt and door photos, what happens if something is out of stock, and what your family gets by text.'
```

The parish names in the description are static text; if coverage changes, update it (noted
in open questions).

---

### S1 Hero — `hiw-hero.tsx`

#### Structure

|                    |                                                                                                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pattern            | Split two-column 7/5: text left, framed photo right with a floating tracker card over the photo's bottom-left corner; "On this page" strip across the foot of the band                                                         |
| Background         | Solid `crimson`, `text-on-dark on-dark-focus`                                                                                                                                                                                  |
| Container / height | `<section>` full-bleed; inner `mx-auto max-w-wide gutter`; padding `section pb-10 lg:pb-12`; ~760px at 1440                                                                                                                    |
| Columns            | 375: text → photo + card → strip (2-col links). 768: same, photo 16:9, strip 3-col. 1024: grid 12, text `col-span-7`, photo `col-span-5`; strip full width below, 7 links in one wrapping row. 1440: same as 1024, larger gaps |
| Blocks             | h1, lead, 1 primary button, 1 text link, `CutoffNote`, 1 photo, 1 tracker card, 1 nav with 7 links                                                                                                                             |
| Why                | The promise and the action first; the tracker object says "you will see every step" before a word of explanation. The jump nav serves the careful reader who came for one answer                                               |

#### Copy

- h1 (`id="hiw-title"`): **Follow one order from your laptop to their door**
- Lead: `You pay online in US dollars. Our driver buys everything at a store in Jamaica and delivers it in {parishList}. You see every step, with a photo of the till receipt and a photo at the door.` (`parishList` from `joinParishes(zones.map(z => z.parish))`; fallback `Jamaica`.)
- Button: **Start shopping** → `/shop` (`ButtonLink variant="onDark" size="lg"`, full width below `sm`)
- Text link: **Track an order** → `/track` (`onCrimsonLink`)
- `CutoffNote cutoff={earliestCutoff} tone="onDark"` when a cut-off exists.
- Tracker card (example):
  - pill: `Example order SE-10428`
  - line 1: `Out for delivery` (bold) with a static `signal` dot (no ping, no loop)
  - three past steps, each a row `Check` icon + label + time: `Paid 9:12 AM`, `Shopped 11:48 AM` and a receipt line `Receipt photo sent` with `Camera` icon.
  - Times via `formatClockTime(EXAMPLE_TIMES.x)`.
- Jump nav (`<nav aria-label="On this page">`), visible label `On this page` (`text-small text-on-crimson-muted`), links:
  1. `The seven steps` → `#journey-h`
  2. `The two photos` → `#proof-h`
  3. `Out of stock` → `#subs-h`
  4. `What your family gets` → `#family-h`
  5. `When it arrives` → `#timing-h`
  6. `If nobody is home` → `#nobody-home-h`
  7. `Questions` → `#questions-title`

#### Wireframes

```
1440 (content 1280)
┌──────────────────────────────────────────────────────────────────────────────┐
│ ▓ crimson                                                                    │
│  Follow one order from your             ┌──────────────────────────────┐     │
│  laptop to their door        (h1)       │                              │     │
│                                         │   photo 4:5  (hiwSender)     │     │
│  You pay online in US dollars. Our      │   rounded-2xl                │     │
│  driver buys everything… (lead)         │                              │     │
│                                         │                              │     │
│  [ Start shopping ]   Track an order    │                              │     │
│                                     ┌───┴──────────────┐               │     │
│  ⏱ Same-day delivery when you order │ Example order    │               │     │
│    by 1:00 PM Jamaica time.          │ ● Out for deliv. │───────────────┘     │
│                                      │ ✓ Paid   9:12 AM │                     │
│                                      │ ✓ Shopped 11:48  │                     │
│                                      │ 📷 Receipt photo │ (lucide Camera)     │
│                                      └──────────────────┘                     │
│ ┌ crimson-deep strip ───────────────────────────────────────────────────────┐ │
│ │ On this page  The seven steps · The two photos · Out of stock · …         │ │
│ └───────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
(the "·" above is wireframe only: links are separated by gap, not dots)

768                                         375
┌────────────────────────────────┐          ┌──────────────────────┐
│ h1 (2 lines)                   │          │ h1 (4 lines)         │
│ lead                           │          │ lead                 │
│ [Start shopping] Track an order│          │ [  Start shopping  ] │
│ ⏱ cut-off note                 │          │ Track an order       │
│ ┌────────────────────────────┐ │          │ ⏱ cut-off note       │
│ │ photo 16:9                 │ │          │ ┌──────────────────┐ │
│ │                  ┌───────┐ │ │          │ │ photo 4:3        │ │
│ └──────────────────┤ card  ├─┘ │          │ └──────┬─────────┬─┘ │
│                    └───────┘   │          │        │ card    │   │
│ ┌ On this page ──────────────┐ │          │        └─────────┘   │
│ │ 3 cols × 3 rows of links   │ │          │ ┌ On this page ─────┐│
│ └────────────────────────────┘ │          │ │ 2 cols × 4 rows   ││
└────────────────────────────────┘          │ └───────────────────┘│
                                            └──────────────────────┘
```

#### Classes

- Section: `bg-crimson section pb-10 text-on-dark on-dark-focus lg:pb-12`
- Grid: `mx-auto max-w-wide gutter lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-12`
- Text column: `max-w-2xl lg:col-span-7 lg:max-w-none xl:pr-12 animate-rise`
- h1: `text-h1 text-balance`; lead `mt-5 text-lead text-on-crimson-muted lg:mt-6`
- Actions: `mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6`
- `CutoffNote className="mt-6 lg:mt-8"`
- Photo column: `relative mt-10 lg:col-span-5 lg:mt-0 animate-rise` (the rise is CSS, so the photo never waits for JS)
- `StockPhoto name="hiwSender" preload sizes="(min-width: 1280px) 500px, (min-width: 1024px) 38vw, 100vw" position="40% center" className="aspect-4/3 rounded-xl md:aspect-16/9 lg:aspect-4/5 lg:rounded-2xl"`
- Tracker card: `relative z-raised -mt-16 ml-auto mr-3 w-64 md:-mt-20 md:mr-8 lg:absolute lg:-bottom-6 lg:-left-10 lg:m-0 xl:-left-16 xl:w-72` → inner `rounded-lg bg-surface p-4 text-ink shadow-float`
  - pill `inline-block rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-ink-muted`
  - status row `mt-3 flex items-center gap-2 font-bold` with dot `size-2.5 rounded-full bg-signal` (`aria-hidden`)
  - step list `mt-3 flex flex-col gap-1.5 border-t border-line pt-3 text-small text-ink-body tabular-nums`; icons `size-icon-sm text-ok` (Check) and `text-crimson` (Camera)
  - The whole card: `role="img"` with `aria-label="Example tracking page: out for delivery. Paid at 9:12 AM, shopped at 11:48 AM, receipt photo sent."`; inner content `aria-hidden`.
- Jump strip: `mt-12 rounded-xl bg-crimson-deep p-4 lg:mt-16 lg:flex lg:items-center lg:gap-6 lg:px-6`
  - label `text-small text-on-crimson-muted lg:shrink-0`
  - list `mt-2 grid grid-cols-2 gap-x-4 md:grid-cols-3 lg:mt-0 lg:flex lg:flex-wrap lg:gap-x-6`
  - link `inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-blush decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-on-dark`

#### States

Button: existing `onDark` states. Links: blush underline → on-dark on hover, `blush` focus ring
via `on-dark-focus`. No empty state except: no zones → lead says "in Jamaica" and the cut-off
note is not rendered.

#### Accessibility

One `h1`. The tracker card is one image-role figure with a full label (its text is example
data, not page content). Jump links go to heading ids that carry `scroll-mt-header`. Contrast:
on-dark / on-crimson-muted / blush on crimson and crimson-deep are all in the AA table.

---

### S2 The order day (the bold element) — `hiw-journey.tsx`

#### Structure

|                    |                                                                                                                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pattern            | Three-column timeline table, 7 rows: **spine** (dot + time + stage) · **On your screen** lane · **In Jamaica** lane                                                                                                                                          |
| Background         | Band `page`. The In Jamaica lane is a continuous solid `oxblood` column: each row's Jamaica cell is `bg-oxblood`; cells touch (row gap 0) so the column reads as one block; first cell `rounded-t-2xl`, last `rounded-b-2xl`                                 |
| Container / height | `section` padding, `max-w-page`; ~2,000px at 1440                                                                                                                                                                                                            |
| Columns            | 375 / 768: one column per row: stage line, then the screen card, then the Jamaica card (`rounded-xl`, separate blocks), all indented right of a continuous spine. 1024 / 1440: `grid-cols-12`: spine `col-span-3`, screen `col-span-4`, Jamaica `col-span-5` |
| Blocks             | Header (h2, lead, "Example" note), lane header row (2 labels, lg only), 7 rows, 1 footnote                                                                                                                                                                   |
| Why                | The tracker's seven stages are what the sender will actually watch. Pairing each with the artefact they receive, and what happened in Jamaica to cause it, turns "trust us" into a schedule they can check                                                   |

#### Copy

- h2 (`id="journey-h"`): **Seven steps you can follow, from your laptop to their door**
- Lead: `Here is one example order, a {basketName} for Paulette in Yallahs, St. Thomas. Every order moves through the same seven steps, and your tracking page shows each one with the time it happened. Share the link and your family can follow too.`
  (If the example order is null, drop the first sentence.)
- Small note under the lead: `Example order SE-10428. Times are Jamaica time.` (`text-small text-ink-muted`, `Clock` icon)
- Lane header labels (lg): `On your screen` (`Laptop` icon, crimson) and `In Jamaica` (`MapPin` icon, blush, sitting on the oxblood lane's top cell).

Rows. Stage labels come from `TRACKER_STAGES` (never re-typed). Times from `EXAMPLE_TIMES`.
Money via `formatUsd`. `{x}` = live data.

| #   | Stage (time)                                     | On your screen (white card)                                                                                                                                                                                                                                                                                                                                                        | In Jamaica (oxblood cell)                                                                                                                                                                                                                                                                                                                   |
| --- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Paid** · 9:12 AM                               | Card titled `Email: your receipt` (Mail icon). Body: rows `{basketName} {formatUsd(basketCents)}`, `Delivery to {parish} {formatUsd(feeCents)}`, divider, **`Paid {formatUsd(totalCents)}`**. Under it, `text-small text-ink-muted`: `By {payLine}. You also get a tracking link to share.` (`payLine` = `PayPal or card` or `PayPal, card or bank transfer` when `bankTransfer`). | `The order reaches our team in Jamaica. Nobody there handles cash: you have already paid.`                                                                                                                                                                                                                                                  |
| 2   | **Confirmed** · 9:20 AM                          | `Your tracking page shows Confirmed.`                                                                                                                                                                                                                                                                                                                                              | `We check the list and give it to a driver who knows the area.`                                                                                                                                                                                                                                                                             |
| 3   | **Shopping** · 10:35 AM                          | `Your tracking page shows Shopping.`                                                                                                                                                                                                                                                                                                                                               | `The driver is in the store, ticking off your list item by item. The {missing.name} is out of stock, so they follow your rule: leave it out.` + link `What the three rules do` → `#subs-h` (on-dark link style). If `missing` is null: `…ticking off your list item by item. If something is out of stock, they follow the rule you chose.` |
| 4   | **Shopped** · 11:48 AM                           | Card `Email: the receipt photo` (Camera icon) containing a **mini drawn receipt**: the first 3 lines of `buildReceipt(...)` in J$ + `and {n} more items` + total, under a pill `Example receipt`. Caption: `A photo of the store's own till receipt.`                                                                                                                              | `The driver pays at the till and photographs the receipt before leaving the store.`                                                                                                                                                                                                                                                         |
| 5   | **Out for delivery** · 12:05 PM                  | `Your tracking page shows Out for delivery.`                                                                                                                                                                                                                                                                                                                                       | `Your family gets a text:` + text bubble 1 (see §3.3)                                                                                                                                                                                                                                                                                       |
| 6   | **Delivered** · 12:52 PM                         | Card `Email: the door photo` (DoorOpen icon) containing a **mini door card**: `crimson` 3:2 tile, DoorOpen icon `text-blush`, `Delivered to` / **`Paulette Brown`** / `Yallahs, St. Thomas` (the ProofPair door placeholder, landscape).                                                                                                                                           | `The driver hands the order over at the door, takes the photo and notes who received it. Your family gets a second text:` + text bubble 2                                                                                                                                                                                                   |
| 7   | **Closed** · no time; the time slot reads `Then` | Card `Email: order closed` (ReceiptText icon): `{missing.name} not in stock: {formatUsd(missing.cents)} back to you.` If `missing` is null: `Any refund for missing items is sent, and the order is finished.`                                                                                                                                                                     | `Nothing more for your family to do.`                                                                                                                                                                                                                                                                                                       |

Footnote under the table (`text-small text-ink-muted max-w-2xl`): `Every order sends you the same emails. Paying by bank transfer? Step 1 waits until the money arrives.` (second sentence only when `bankTransfer`).

#### Wireframes

```
1440 (max-w-page 1152)
  Seven steps you can follow, from your laptop to their door        (h2)
  Here is one example order… (lead, max-w-2xl)
  ⏱ Example order SE-10428. Times are Jamaica time.

  col 1-3 (spine)          col 4-7                       col 8-12
                           💻 On your screen             ┌▓ 📍 In Jamaica ──────────┐
  ●  9:12 AM               ┌───────────────────────┐     │▓ The order reaches our    │
  │  Paid           (h3)   │ ✉ Email: your receipt │     │▓ team in Jamaica…         │
  │                        │ Family Food Basket $69│     │▓                          │
  │                        │ Delivery St. Thomas $8│     │▓                          │
  │                        │ Paid USD$77.00        │     │▓                          │
  │                        └───────────────────────┘     │▓                          │
  ●  9:20 AM               Your tracking page shows      │▓ We check the list and…   │
  │  Confirmed             Confirmed.  (plain text)      │▓                          │
  ●  10:35 AM              Your tracking page shows      │▓ The driver is in the     │
  │  Shopping              Shopping.                     │▓ store… Long Grain Rice…  │
  │                                                      │▓ What the three rules do  │
  ●  11:48 AM              ┌ 📷 Email: receipt photo ┐   │▓ The driver pays at the   │
  │  Shopped               │  ┌ mini receipt J$ ┐    │   │▓ till and photographs…    │
  │                        │  └─────────────────┘    │   │▓                          │
  │                        └─────────────────────────┘   │▓                          │
  ●  12:05 PM              Your tracking page shows      │▓ Your family gets a text: │
  │  Out for delivery      Out for delivery.             │▓ ┌ bubble 1 (white) ────┐ │
  │                                                      │▓ └─────────────────────┘ │
  ●  12:52 PM              ┌ 🚪 Email: door photo ──┐    │▓ The driver hands it over…│
  │  Delivered             │ ▓ Delivered to Paulette│    │▓ ┌ bubble 2 ───────────┐ │
  │                        └────────────────────────┘    │▓ └─────────────────────┘ │
  ●  Then                  ┌ Email: order closed ───┐    │▓ Nothing more for your    │
     Closed                │ Rice not in stock:     │    │▓ family to do.            │
                           │ USD$14.50 back to you  │    └▓──────────────────────────┘
                           └────────────────────────┘
  footnote
(✉ 📷 🚪 💻 📍 ⏱ are wireframe shorthand for lucide Mail, Camera, DoorOpen, Laptop, MapPin, Clock)

768                                          375
┌───────────────────────────────────┐        ┌────────────────────────┐
│ h2, lead, note                    │        │ h2 (4 lines), lead,    │
│ ● 9:12 AM  Paid                   │        │ note                   │
│ │  ┌ On your screen ─────────────┐│        │ ● 9:12 AM              │
│ │  │ ✉ Email: your receipt …     ││        │ │ Paid                 │
│ │  └─────────────────────────────┘│        │ │ ┌ On your screen ──┐ │
│ │  ┌▓ In Jamaica ────────────────┐│        │ │ │ receipt email    │ │
│ │  │▓ The order reaches our team…││        │ │ └──────────────────┘ │
│ │  └▓────────────────────────────┘│        │ │ ┌▓ In Jamaica ─────┐ │
│ ● 9:20 AM  Confirmed              │        │ │ │▓ text            │ │
│ │  …                              │        │ │ └▓─────────────────┘ │
└───────────────────────────────────┘        │ ● 9:20 AM …          │
                                             └────────────────────────┘
```

At 375 / 768 rows that only say "Your tracking page shows X" render that line as plain
`text-small text-ink-muted` under the stage label instead of a card, so the phone column
stays short (~3,600px; the cards that remain carry real proof).

#### Classes

- Section: `section scroll-mt-header` (`page` band, no fill)
- Header: `max-w-2xl`; h2 `text-h2 text-balance text-ink scroll-mt-header`; lead `mt-3 text-lead text-ink-body`; note `mt-4 flex items-center gap-2 text-small text-ink-muted`
- Lane header (lg only): `mt-10 hidden lg:grid lg:grid-cols-12 lg:gap-x-8` → screen label `lg:col-start-4 lg:col-span-4 flex items-center gap-2 pb-4 font-bold text-ink`; the Jamaica label sits **inside** row 1's oxblood cell as its first line, so the column starts with its own title (`flex items-center gap-2 font-bold text-on-dark`, icon `text-blush`)
- List: `<ol className="mt-8 lg:mt-0">`
- Row `<li>`: `relative grid grid-cols-[2rem_1fr] gap-x-4 pb-8 last:pb-0 lg:grid-cols-12 lg:gap-x-8 lg:pb-0`
- Spine (per row, absolute line): `absolute top-8 bottom-0 left-[15px] w-0.5 bg-crimson lg:left-[15px]` (omit on the last row). Dot: `relative grid size-8 place-items-center rounded-full bg-crimson text-small font-bold text-on-dark tabular-nums` containing the stage number (1–7), `aria-hidden`.
- Spine text block (`lg:col-span-3 lg:flex lg:gap-4 lg:py-8`): time `<time>` `text-title text-ink tabular-nums` (the clock is the loudest thing in the row), stage `<h3 class="text-h3 text-ink">`.
- Screen cell (`col-start-2 mt-4 lg:col-span-4 lg:col-start-4 lg:mt-0 lg:py-8`): card `rounded-lg border border-line bg-surface p-card`; card title `flex items-center gap-2 font-bold text-ink` with icon `size-icon text-crimson`; body `mt-3 text-small text-ink-body`; money rows `flex justify-between gap-3 tabular-nums`; total row `mt-2 border-t border-line pt-2 font-bold text-ink`. Plain-line variant: `text-ink-muted` (no card).
- Per-cell lane label for phones and screen readers: `<p class="mb-2 flex items-center gap-2 text-small font-semibold text-ink-muted lg:sr-only">` "On your screen" / (Jamaica) `text-on-oxblood-muted` "In Jamaica".
- Jamaica cell (`col-start-2 mt-3 lg:col-span-5 lg:col-start-8 lg:mt-0`): `rounded-xl bg-oxblood p-card text-on-dark on-dark-focus lg:rounded-none lg:px-8 lg:py-8`; first row `lg:rounded-t-2xl`, last row `lg:rounded-b-2xl`. Body `text-body`. Text bubble inside: `mt-3 max-w-[90%] rounded-lg rounded-bl-sm bg-surface px-4 py-3 text-small text-ink` with `<span class="sr-only">Example text message: </span>`. Link `inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-blush underline-offset-4 hover:decoration-on-dark`.
- Mini receipt (row 4): new `MiniReceipt` (see below). Mini door card (row 6): `mt-3 flex aspect-3/2 max-w-xs flex-col justify-between rounded-md bg-crimson p-4 text-on-dark` → DoorOpen `size-10 text-blush strokeWidth={1.5}`, `text-xs text-blush` "Delivered to", `font-bold` name, `text-xs text-on-crimson-muted` place; `role="img"` `aria-label="Example door photo card: delivered to Paulette Brown, Yallahs, St. Thomas"`.

**New component** `src/components/pages/how-it-works/mini-receipt.tsx` (server):
props `{ receipt: Receipt; lines?: number }` (default 3). Same paper look as `HeroReceipt`
(`bg-surface px-4 pt-4 pb-6 text-ink receipt-edge`, but `border border-line` instead of a
shadow because it sits in a flat card; no rotation, no `animate-print`). `role="img"` with
`aria-label="Example receipt for the {basketName}, total {J$ total}"`, content `aria-hidden`.

#### States

No hover on cards (they are not links). Focus only on the two links. Empty: if
`buildExampleOrder` returns null, row 1's card shows `Email: your receipt` with the line
`What you paid, in US dollars, and a tracking link to share.` (no amounts); if `buildReceipt`
returns null, row 4's card shows the caption only.

#### Accessibility

`<ol aria-labelledby="journey-h">`, one `<h3>` per stage, `<time>` without a `dateTime`
(clock time only, example). Lane labels are real text in every cell (`lg:sr-only` on wide
screens), so a screen reader hears "Paid, 9:12 AM, On your screen: Email: your receipt…, In
Jamaica: The order reaches our team…". Oxblood cells: `on-dark` / `on-oxblood-muted` / blush
link underline, all AA.

---

### S3 The two photos — `hiw-proof.tsx`

#### Structure

|                    |                                                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pattern            | Split two-column 6/6: proof pair left, two definition blocks right                                                                                                                                            |
| Background         | Solid `surface`                                                                                                                                                                                               |
| Container / height | `section`, `max-w-page`; ~720                                                                                                                                                                                 |
| Columns            | 375: title + lead → pair → block 1 → block 2. 768: same, pair `max-w-xl mx-auto`, blocks side by side (2 cols). 1024/1440: `grid-cols-12`, pair `col-span-6`, text `col-span-6` (title, lead, blocks stacked) |
| Blocks             | h2, lead, 1 `ProofPair` (light, `tilt`), 2 blocks = icon disc + h3 + `dl` with 3 rows                                                                                                                         |
| Why                | Plain answers to "what exactly will I get?", kept beside the object itself                                                                                                                                    |

#### Copy

- h2 (`id="proof-h"`, **keep this id**, the home page links to `/how-it-works#proof-h`): **Two photos on every order**
- Lead: `The store's receipt and the order at the door. Both arrive by email and on your tracking page, so you never have to take our word for it.`
- Block 1, `ReceiptText` icon, h3 **The receipt photo**
  - What it shows: `The store's own till receipt: every item, its price, the total and the time.`
  - When: `As soon as the driver has paid, at the Shopped step.`
  - Where: `In your email and on your tracking page.`
- Block 2, `DoorOpen` icon, h3 **The door photo**
  - What it shows: `Your order at the door, and the name of the person who received it.`
  - When: `At the Delivered step.`
  - Where: `In your email and on your tracking page.`
- Under the blocks (`text-small text-ink-muted`): `The receipt is in Jamaican dollars, as the store charges. You paid in US dollars at checkout.`
- `ProofPair` props: `receipt={{ store: 'Example receipt', lines: first 3 basket lines as {name, cents}, totalCents, jmdPerUsd: settings.jmdPerUsd }}` (no `at`: no fake timestamp), `door={{ recipient: 'Paulette Brown', place: 'Yallahs, St. Thomas' }}`, `tilt`. The old page's `store: 'PRICESMART'` is removed (no store names on drawn proof, as on the home hero). Build the lines in the page from the example basket's products (cents, quantity applied) so the receipt and S2's mini receipt agree.

#### Wireframes

```
1440                                              768                       375
┌─────────────────────┬─────────────────────┐    ┌───────────────────┐    ┌──────────────┐
│  ┌──────┐  ┌──────┐ │ Two photos on every │    │ h2, lead          │    │ h2, lead     │
│  │receipt│ │▓door │ │ order         (h2)  │    │   ┌────┐ ┌────┐   │    │ ┌────┐┌────┐ │
│  │ J$   │  │▓card │ │ lead                │    │   │rcpt│ │door│   │    │ │rcpt││door│ │
│  │      │  │▓     │ │ ┌─────────┐┌───────┐│    │   └────┘ └────┘   │    │ └────┘└────┘ │
│  └──────┘  └──────┘ │ │◉ Receipt││◉ Door ││    │ ┌──────┐┌──────┐  │    │ ◉ Receipt    │
│  📷 Receipt 📷 Door  │ │ dl ×3   ││ dl ×3 ││    │ │block1││block2│  │    │   dl ×3      │
│                     │ └─────────┘└───────┘│    │ └──────┘└──────┘  │    │ ◉ Door       │
│                     │ note                │    │ note              │    │   dl ×3      │
└─────────────────────┴─────────────────────┘    └───────────────────┘    │ note         │
                                                                          └──────────────┘
```

At 1440 the two blocks sit side by side under the lead (`sm:grid-cols-2` inside the text
column), so the text column is about as tall as the pair.

#### Classes

- Section `bg-surface section`; inner `mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:items-center lg:gap-12`
- Pair column `mt-8 lg:col-span-6 lg:mt-0 lg:order-first`; `ProofPair className="mx-auto max-w-xl"`
- Text column `lg:col-span-6`; h2 `text-h2 text-balance text-ink scroll-mt-header`; lead `mt-3 text-lead text-ink-body`
- Blocks `mt-8 grid gap-6 sm:grid-cols-2`; each `rounded-lg border border-line bg-page p-card`
  - disc `grid size-12 place-items-center rounded-full bg-surface-muted` + icon `size-icon-lg text-crimson`
  - h3 `mt-4 text-h3 text-ink`
  - `dl mt-3 flex flex-col gap-3` → `dt text-small font-bold text-ink`, `dd text-small text-ink-body`
- Note `mt-6 text-small text-ink-muted`

On phones the title comes first (DOM order: text column first, `lg:order-first` moves the
pair left on wide screens). Wait: the title must precede the pair on phones, and the blocks
must follow the pair. So the DOM is: header (h2 + lead) → pair → blocks + note, and at `lg`
a 12-col grid with `grid-template-areas`:
`lg:grid-cols-12 lg:[grid-template-areas:'pair_head''pair_body']` is not a token pattern;
use explicit placement instead: header `lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end`, pair `lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center`, blocks `lg:col-span-6 lg:col-start-7 lg:row-start-2`.

#### States / motion

Static. `ProofPair` unchanged (it is a signature block: no per-page restyle).

#### Accessibility

`aria-labelledby="proof-h"`. The drawn receipt in `ProofPair` is real text (store, lines,
total) and reads fine; the door placeholder too. Figcaptions "Receipt" / "At the door" stay.

---

### S4 Out of stock — `hiw-substitutions.tsx`

#### Structure

|                    |                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pattern            | Header, one "out of stock" item strip, then a three-card row                                                                                        |
| Background         | `page`                                                                                                                                              |
| Container / height | `section`, `max-w-page`; ~760                                                                                                                       |
| Columns            | 375: strip, 3 stacked cards. 768: strip, 3 stacked cards laid out horizontally inside (icon disc left, text right). 1024/1440: strip, `grid-cols-3` |
| Blocks             | h2, lead, 1 strip, 3 cards = icon disc + h3 + rule body + divider + "What you see" + outcome tag + 1 line                                           |
| Why                | One real item, three outcomes, side by side: the clearest possible way to choose a rule                                                             |

#### Copy

- h2 (`id="subs-h"`, keep): **Shelves run out. You decide what happens.**
- Lead: `At checkout you pick one rule for the whole order. Here is what each rule does when the same item is missing.`
- Strip (when `missing` exists): `PackageX` icon (`text-warn`), `Out of stock at the store` (`text-small font-semibold text-ink-muted`), then **`{missing.name}`** and `{formatUsd(missing.cents)}` right-aligned. `Example` pill. When `missing` is null, the strip is not rendered and the lead's second sentence becomes `Here is what each rule does.`
- Cards, in `SUBSTITUTION_RULES` order (title and body **from `src/lib/substitution.ts`, never re-typed**), icons kept from the current page (`Replace`, `MessageCircleQuestion`, `Ban`):

| Rule          | "What you see" tag (reuse the outcome tag, §components)                        | Line under the tag                                                                                                        |
| ------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Allow similar | `Swapped` (info)                                                               | `The driver picks the closest match at the same price or less. Your tracking page names what was bought instead.`         |
| Ask me first  | `Swapped` (info) **or** `Not in stock, {formatUsd(missing.cents)} back` (warn) | `We message you first. Say yes and it is swapped; say no, or if we don't hear back in time, it is left out and refunded.` |
| Leave it out  | `Not in stock, {formatUsd(missing.cents)} back` (warn)                         | `Nothing is swapped. You get back exactly what you paid for it.`                                                          |

Under the row (`text-small text-ink-muted`): `You choose the rule at checkout, in the delivery step. It applies to every item in the order.`

Wording note: "in time" stays vague because the wait is not configured anywhere (needs
Derion, §9).

#### Wireframes

```
1440
  Shelves run out. You decide what happens.  (h2)
  lead
  ┌──────────────────────────────────────────────────────────────────┐
  │ ⊠ Out of stock at the store   Long Grain Rice      USD$14.50 [Ex]│
  └──────────────────────────────────────────────────────────────────┘
  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
  │ ◉ Allow similar   │ │ ◉ Ask me first    │ │ ◉ Leave it out    │
  │ rule body         │ │ rule body         │ │ rule body         │
  │ ───────────────── │ │ ───────────────── │ │ ───────────────── │
  │ What you see      │ │ What you see      │ │ What you see      │
  │ ⇄ Swapped         │ │ ⇄ Swapped  or     │ │ ✕ Not in stock,   │
  │ line              │ │ ✕ Not in stock…   │ │   USD$14.50 back  │
  │                   │ │ line              │ │ line              │
  └───────────────────┘ └───────────────────┘ └───────────────────┘
  footnote

768: strip; then each card full width: ◉ left (48px), text right.
375: strip wraps (name on its own line, price under); cards stacked, disc on top.
```

#### Classes

- Section `section`; inner `mx-auto max-w-page gutter`
- Header `max-w-2xl`; h2 `text-h2 text-balance text-ink scroll-mt-header`; lead `mt-3 text-lead text-ink-body`
- Strip `mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-line bg-surface px-card py-4` → name `font-bold text-ink`, price `ml-auto font-bold text-ink tabular-nums`, pill `rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-ink-muted`
- Cards `mt-4 grid gap-4 lg:grid-cols-3`; card `flex flex-col gap-4 rounded-lg border border-line bg-surface p-card-lg md:grid md:grid-cols-[3rem_1fr] md:gap-x-5 lg:flex`
  - disc `grid size-12 place-items-center rounded-full bg-surface-muted`, icon `size-icon-lg text-crimson`
  - h3 `text-h3 text-ink`; body `text-ink-body`
  - "What you see" block `border-t border-line pt-4` → label `text-small font-semibold text-ink-muted`, tags `mt-2 flex flex-wrap items-center gap-x-3 gap-y-1` (the word `or` between tags is `text-small text-ink-muted`), line `mt-2 text-small text-ink-body`
- Footnote `mt-6 text-small text-ink-muted`

#### Components

Refactor (small): in `src/components/order/item-outcome.tsx`, extract and export
`OutcomeTag({ outcome: 'found' | 'substituted' | 'missing', refundCents?: number })` holding
the existing markup; `ItemOutcome` becomes a one-line wrapper. The tracking page renders
exactly as before; this page shows the same tags the sender will later see on their tracker.

#### Accessibility

Cards are `<article aria-labelledby>`; tags are text with `aria-hidden` icons. No colour-only
meaning: each tag has its word.

---

### S5 What your family gets — `hiw-family.tsx`

#### Structure

|                    |                                                                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pattern            | Split two-column 5/7: framed tall photo left, text right                                                                                                    |
| Background         | Solid `surface`                                                                                                                                             |
| Container / height | `section`, `max-w-page`; ~780                                                                                                                               |
| Columns            | 375: h2 + lead → photo 4:3 → SMS panel → caption → 3 tips. 768: same, photo 16:9. 1024/1440: photo `col-span-5` (4:5, sticky not needed), text `col-span-7` |
| Blocks             | 1 photo, h2, lead, `SmsPreview` (2 messages), caption, 3 tips (icon + text)                                                                                 |
| Why                | Puts a face to the person at the other end, then shows exactly what reaches her phone. "Nothing to install" is the claim no competitor can make as plainly  |

#### Copy

- h2 (`id="family-h"`, keep): **Your family installs nothing**
- Lead: `No app, no account and no smartphone needed. They get a text when the driver sets off and another when the order is delivered.`
- `SmsPreview messages={exampleTexts} label="Examples of the two text messages your family gets"` (sender label `ShipEast`, unchanged component)
- Caption (`text-small text-ink-muted`): `Examples. The real texts use your names and times.`
- Tips (`ul`, each `flex gap-3`, icon `size-icon text-crimson mt-0.5`):
  1. `Phone` — `The driver calls the number you give when they are close. Write it like 1-876-123-1234.` (the format example is the client's own)
  2. `MapPin` — `Add a landmark, like "blue gate opposite the church", so the driver finds the house first time.`
  3. `Gift` — `Add a gift message at checkout and we hand it over with the order.`

#### Wireframes

```
1440                                               768                    375
┌──────────────────┬────────────────────────────┐ ┌──────────────────┐   ┌────────────┐
│ ┌──────────────┐ │ Your family installs       │ │ h2, lead         │   │ h2, lead   │
│ │ photo 4:5    │ │ nothing            (h2)    │ │ ┌──────────────┐ │   │ ┌────────┐ │
│ │ hiwFamilyDoor│ │ lead                       │ │ │ photo 16:9   │ │   │ │photo4:3│ │
│ │              │ │ ┌ ShipEast ─────────────┐  │ │ └──────────────┘ │   │ └────────┘ │
│ │              │ │ │ ( bubble 1 )          │  │ │ SMS panel        │   │ SMS panel  │
│ │              │ │ │ ( bubble 2 )          │  │ │ caption          │   │ caption    │
│ │              │ │ └───────────────────────┘  │ │ 3 tips           │   │ 3 tips     │
│ └──────────────┘ │ caption                    │ └──────────────────┘   └────────────┘
│                  │ ☎ tip  📍 tip  🎁 tip       │
└──────────────────┴────────────────────────────┘
```

#### Classes

- Section `bg-surface section`; inner `mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:items-center lg:gap-12`
- Header block first in DOM; at lg place it `lg:col-span-7 lg:col-start-6 lg:row-start-1`; photo `mt-8 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0`; body (SMS, caption, tips) `lg:col-span-7 lg:col-start-6 lg:row-start-2`
- h2 `text-h2 text-balance text-ink scroll-mt-header`; lead `mt-3 max-w-2xl text-lead text-ink-body`
- `StockPhoto name="hiwFamilyDoor" sizes="(min-width: 1024px) 460px, 100vw" position="center 35%" className="aspect-4/3 rounded-xl md:aspect-16/9 lg:aspect-4/5 lg:rounded-2xl"`
- `SmsPreview className="mt-8 max-w-md border border-line bg-page"` (on a `surface` band the panel needs `page` fill and a line to separate; the component's `bg-surface` is overridden by `cn` order, check `cn` merges, else wrap)
- Caption `mt-3 text-small text-ink-muted`; tips `mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3`, text `text-small text-ink-body`

#### Accessibility

Photo alt from the registry (it is not named by the heading, so it keeps a real alt). SMS
panel already has a figcaption (`sr-only`).

---

### S6 When it arrives, and if nobody is home — `hiw-timing.tsx`

#### Structure

|                    |                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Pattern            | Full-width band, split 7/5: cut-off ruler + zone rows left, bordered panel right                                                           |
| Background         | Solid `oxblood`, `text-on-dark on-dark-focus`                                                                                              |
| Container / height | `section`, `max-w-page`; ~640                                                                                                              |
| Columns            | 375: h2, lead, ruler, zone rows, notes, panel. 768: same, zone rows 2-up. 1024/1440: `grid-cols-12`, left `col-span-7`, panel `col-span-5` |
| Blocks             | h2, lead, 1 ruler (2 segments), N zone rows (live), 1–2 notes, 1 link; panel = h3 + 3-step `ol` + 1 status line + 1 link                   |
| Why                | The two remaining fears, "will it come today?" and "what if she's out?", answered with live data and a plain procedure                     |

#### Copy

Let `cut = earliestCutoff(zones)`; `same = zones.every(z => z.cutoffTime === cut)`.

- h2 (`id="timing-h"`): `same && cut` → **Pay by {formatClockTime(cut)}, at their door the same day**; otherwise **Pay before the cut-off, at their door the same day**.
- Lead: `Jamaica time. Orders paid after the cut-off are delivered the next day. You choose the delivery day at checkout.`
- Ruler (two flat segments, not to scale, labelled so): left segment `bg-crimson`: `Paid before {cut}` / **`Delivered today`**; right segment `bg-crimson-deep` with a `border border-line-on-dark`: `Paid after {cut}` / **`Delivered the next day`**. A 2px `bg-on-dark` tick between them with the label `{cut}` above it (`text-small font-bold tabular-nums`). When cut-offs differ, labels read `before the cut-off` / `after the cut-off`.
- Zone rows (one per active zone, `ul`): parish (bold), speed label (`Same day` / `Next day` / `Scheduled`, reuse the home coverage `speedLabel` map; move it to `src/lib/home.ts` as `SPEED_LABEL` and import in both), `Cut-off {formatClockTime(z.cutoffTime)}`, `Delivery {formatUsd(z.feeCents)}`.
- Notes (`text-small text-on-oxblood-muted`):
  - When `bankTransfer`: `Paying by bank transfer? Send it within {settings.bankTransferHoursToPay} hours. We schedule the shopping once the money arrives.`
  - Link: `See delivery areas and fees` → `/delivery`
- Panel, h3 (`id="nobody-home-h"`): **If nobody is home**
  - `ol` (numbered, real sequence):
    1. `The driver calls the number you gave.`
    2. `They wait a reasonable time at the gate.`
    3. `If they still can't hand it over, we contact you to arrange another try.`
  - Status line (`text-small text-on-oxblood-muted`): `Your tracking page then shows "{ORDER_STATUS.failed_delivery.label}": {ORDER_STATUS.failed_delivery.senderText}` (live from `order-status.ts`, so it always matches the tracker).
  - Link: `Read the delivery policy` → `/legal/delivery`

Wording is taken from the existing delivery policy draft (`src/lib/demo/legal.ts`) and the
delivery page tips. No wait time, no redelivery fee: both need Derion (§9).

#### Wireframes

```
1440 (oxblood band)
┌───────────────────────────────────────────────┬───────────────────────────┐
│ Pay by 1:00 PM, at their door the same day    │ ┌ border line-on-dark ──┐ │
│ (h2)                                          │ │ If nobody is home (h3)│ │
│ lead                                          │ │ 1 The driver calls…   │ │
│                1:00 PM                        │ │ 2 They wait…          │ │
│ ┌▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐       │ │ 3 If they still can't │ │
│ │ Paid before 1:00 │ Paid after 1:00 PM  │       │ │ status line           │ │
│ │ Delivered today  │ Delivered next day  │       │ │ Read the delivery pol.│ │
│ └──────────────────┴─────────────────────┘       │ └───────────────────────┘ │
│ ┌ St. Thomas  Same day  Cut-off 1:00 PM  USD$8 ┐ │                           │
│ ┌ Kingston    Same day  Cut-off 1:00 PM  USD$10┐ │                           │
│ notes · link                                  │                           │
└───────────────────────────────────────────────┴───────────────────────────┘

375: h2 (3 lines), lead, ruler stacked (segment 1 above segment 2, tick label above),
zone rows stacked (parish + pill on line 1, cut-off and fee on line 2), notes, link, panel.
```

#### Classes

- Section `bg-oxblood section text-on-dark on-dark-focus`; inner `mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:gap-12`
- Left `lg:col-span-7`; h2 `text-h2 text-balance scroll-mt-header`; lead `mt-3 text-lead text-on-oxblood-muted`
- Ruler `mt-8 grid gap-1 sm:grid-cols-2 sm:gap-0` with `role="img"` and `aria-label="Paid before 1:00 PM: delivered today. Paid after: delivered the next day."`; segments `p-4` (`rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none` / `rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none`), label `text-small text-on-crimson-muted`, value `font-bold text-on-dark`; tick `hidden sm:block` absolutely placed at the seam, label above `text-small font-bold`
- Zone list `mt-6 grid gap-3 md:grid-cols-2`; row `rounded-lg border border-line-on-dark p-4` → parish `font-bold`, pill `rounded-full bg-crimson-deep px-2 py-0.5 text-xs font-bold text-on-dark`, meta `mt-1 text-small text-on-oxblood-muted tabular-nums`
- Notes `mt-6 text-small text-on-oxblood-muted`; link class (oxblood): `inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-blush underline-offset-4 transition-colors duration-150 hover:decoration-on-dark`
- Panel `mt-10 rounded-2xl border border-line-on-dark p-card-lg lg:col-span-5 lg:mt-0 lg:self-start`; h3 `text-h3 scroll-mt-header`; `ol mt-4 flex flex-col gap-4`; item `grid grid-cols-[2rem_1fr] gap-3`; number dot `grid size-8 place-items-center rounded-full bg-crimson-deep text-small font-bold tabular-nums` (`aria-hidden`; the `ol` gives the numbers to screen readers)

#### States

No zones: the ruler and zone list are not rendered, h2 reads **When it arrives**, lead reads
`We are setting up delivery areas. Write to us and we will tell you when we reach your family.`

---

### S7 Questions — reuse `HomeQuestions`

- Data: `pickHomeFaqs(faqs.filter(f => bankTransfer || f.id !== 'faq-5'), HOW_IT_WORKS_FAQ_IDS)`; render only when 3 or more.
- Props as on the home page (`email`, `whatsapp` digits). The component's title "Questions senders ask first" fits this page too; no change. Its heading id `questions-title` is the jump target.
- Remove `src/components/pages/guide/faq-list.tsx` from this page only (it is still used by `/delivery` and `/faq`).

### S8 Closing — reuse `HomeClosing`

`<HomeClosing parishList={parishList} earliestCutoff={cut} />` unchanged: "Start a basket
for home", Start shopping + Track an order. `page` band, contained crimson panel.

(The old `CtaBand` with the `stepFamily` photo is removed from this page.)

---

## 5. Performance and rendering

- **Server components only**, except the existing client pieces they include
  (`CutoffCountdown` inside `CutoffNote`, `StockPhoto`). No `motion` import on this page any
  more (the old page shipped `Reveal`, `Stagger`, `Parallax`, the scroll-linked
  `StageTimeline`): less JavaScript.
- **Data:** every loader is cached (as on the home page); no `cookies()`, `headers()` or
  `searchParams`, so the page prerenders and needs no `<Suspense>`. The cut-off countdown is
  the only runtime part and already renders nothing on the server.
- **LCP:** at 375 the hero `h1` (text, painted with `animate-rise` CSS). At 1024+ likely the
  hero photo: pass `preload` on `hiwSender` (this page's top photo; see §9 for the doc
  note) and a tight `sizes`. Every other photo lazy-loads (default).
- **CLS:** every photo has an aspect class; the tracker card overlap uses negative margins,
  not JS measurement; the countdown appends text inline after mount (existing behaviour).
- No layout animation; no scroll listeners.

---

## 6. Photo register

Existing registry photos considered and rejected for this page: `familyPhone` (home hero,
same role), `stepDoor` (cardboard box, reads as parcel shipping, the opposite of our story),
`stepFamily` (video call on a laptop, wrong message: our family needs no smartphone),
`contactPhone` (owned by Contact), `guideProduce` (old hero, generic market hands).

Two new photos. Both checked: free (not Unsplash+), no logos, `curl` → **200** on
`?w=200`.

| Key          | `hiwSender`                                                                                                       | `hiwFamilyDoor`                                                                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| File         | `src/lib/photos/guide.ts`                                                                                         | `src/lib/photos/guide.ts`                                                                                                                                      |
| Unsplash id  | `NP6aeffzH2E`                                                                                                     | `FkNCfc7MaHc`                                                                                                                                                  |
| src          | `https://images.unsplash.com/photo-1758521541103-d29cbd5fb2e5`                                                    | `https://images.unsplash.com/flagged/photo-1562925218-82b07bb9a50d` (the `flagged/` path is Unsplash's own; keep it)                                           |
| Size         | 3840 × 2160                                                                                                       | 5000 × 3333                                                                                                                                                    |
| Photographer | Vitaly Gariev (`silverkblack`)                                                                                    | Patricia Prudente (`apsprudente`)                                                                                                                              |
| Alt          | `A young woman at home with her laptop and a cup of tea`                                                          | `An older woman standing in the blue doorway of her home`                                                                                                      |
| Shows        | The sender abroad, at home, in the evening, ordering on a laptop: the first line of the h1                        | A grandmother at her own door, warm, unposed, Caribbean-looking painted doorway: the person the order is for                                                   |
| Crop         | `aspect-4/5` at lg, `16/9` md, `4/3` phone; `position="40% center"` keeps her face and the laptop in the 4:5 crop | `aspect-4/5` at lg, `16/9` md, `4/3` phone; `position="center 35%"` keeps her face in every crop (she stands right of centre: at 4:5 use `position="62% 35%"`) |
| usedOn       | `How it works (hero)`                                                                                             | `How it works (your family)`                                                                                                                                   |

Before adding them: record each download through the Unsplash API (`download_asset`), as
`docs/PHOTOGRAPHY.md` step 2 asks, and the credits page lists them automatically.
`guideProduce` is no longer used here; change its `usedOn` or delete it if nothing else
imports it (grep first).

---

## 7. Self-review

### First pass vs revised

| First pass                                                                                         | Problem                                                                                                                                  | Revised                                                                                                                              |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Keep the old structure (photo chapters 01/02/03, then a stage list, then proof, subs, family, pay) | Reads as a template: three photo-text zig-zags plus a numbered list say the same thing twice; eyebrows everywhere; parallax and staggers | One spine (S2) carries the journey **and** the seven stages; every other section explains one thing it points to                     |
| Hero = crimson + photo + the home's printed receipt                                                | Copies the home hero's bold element                                                                                                      | Hero carries a **tracker card** instead (a different proof object), static; the bold element moves to S2                             |
| S2 lane on the right as a full-bleed oxblood half of the band                                      | Hard to align a background half to grid column 8 at every width; risky on 1024                                                           | The lane is built from the row cells themselves (touching oxblood cells, rounded ends): exact at every width, no absolute background |
| Big signal numerals (text-numeral) for the seven times                                             | Seven 59px red numbers shout and fight the oxblood lane                                                                                  | Times in `text-title` ink; the red mass is the lane, the dots are crimson                                                            |
| Scroll-filled spine                                                                                | Scroll-linked motion with no meaning (the example is finished)                                                                           | Static, complete spine                                                                                                               |
| Substitution rules in tabs                                                                         | Hides two of the three; needs JS                                                                                                         | All three side by side on the same item                                                                                              |
| Proof band in crimson (as before)                                                                  | Crimson right after S2's oxblood lane: too much red in a row                                                                             | `surface` band, light `ProofPair` (its door card is crimson already)                                                                 |
| Payment section kept                                                                               | Extra section; payment is already answered in S2 row 1 and the FAQ                                                                       | Removed; `pay-h` anchor dropped (nothing links to it)                                                                                |
| Times as ISO dates rendered by `formatTime`                                                        | Time-zone and DST traps for fake dates                                                                                                   | Clock strings `HH:MM` through `formatClockTime`                                                                                      |

### Generic defaults removed

No eyebrows; no 01/02/03 on non-sequences; no identical icon-card grid as the main idea; no
scroll reveals or parallax; no gradient, glass or tilted shadows beyond the existing
`ProofPair` tilt; no "→" in link text; no middle-dot meta strings in the UI; one bold element.

### ui-ux-pro-max

- `--design-system` ("delivery service trust process explainer timeline") returned _Trust &
  Authority_ with an _Accessible & Ethical_ style: **adopted** the pattern (proof before ask,
  clear CTA path) and the accessibility focus. **Rejected** its palette (blue #0369A1 /
  green accent), IBM Plex Sans and "logo carousel / security badges / case studies": they
  break the brand (roles only, Figtree) and the honesty rule (no logos, no invented proof).
- `--domain ux`: progress indicators (step N of 7 shown by the spine and numbered dots,
  adopted); sticky nav must not cover content (`scroll-mt-header` on every target, adopted);
  active state for in-page nav (not adopted: a scroll-spy needs JS for little gain; the
  strip sits in the hero only).
- Pre-delivery checklist: lucide icons only; `cursor-pointer` on links and summaries
  (default); hover 150ms; AA contrast per the TOKENS pairs table; visible focus (`signal` on
  light, `blush` via `on-dark-focus` on crimson / oxblood); reduced motion respected;
  checked at 375 / 768 / 1024 / 1440 (below).

### Risks

1. **S2 length on phones (~3,600px).** Mitigated by plain-line rows for the three "tracking
   page shows X" stages; if QA still finds it long, collapse rows 2, 3 and 5's screen lines
   entirely (the spine already says it).
2. **Example cut-off clash:** example Paid time 9:12 AM assumes the cut-off is later. If an
   admin sets a cut-off before 9:12 AM the example would contradict S6. `buildExampleOrder`
   tests can't catch this; add a guard: if `cut < '09:12'`, hide the "same day" wording in the
   S2 lead (rare; flag in QA).
3. **`SmsPreview` fill override:** confirm `cn` (tailwind-merge) lets `bg-page` replace
   `bg-surface`; otherwise wrap in a bordered `bg-page` div and leave the panel white.
4. **Second `preload` photo** goes against the PHOTOGRAPHY note "only the home hero uses
   preload". Needs the manager's OK (§9).

---

## 8. Acceptance checklist

All widths: no horizontal scroll; every target ≥ 44px; one `h1`; focus ring visible on every
link and button (blush on crimson / oxblood, signal on light); no eyebrow; lucide icons only;
all money via `format.ts`; no text on a photo; no `motion` import on the page.

**375**

- [ ] Hero order: h1, lead, full-width "Start shopping", "Track an order", cut-off note, photo 4:3, tracker card overlapping the photo foot on the right, jump strip in 2 columns.
- [ ] Each S2 row: dot + time + stage, then screen card (or plain line), then oxblood card; spine continuous from row 1 to row 6.
- [ ] S2 rows 5 and 6 show the two family texts as white bubbles inside oxblood cards, labelled as examples for screen readers.
- [ ] S3: title above the proof pair; two blocks stacked below.
- [ ] S4: strip shows the real first basket item and price; cards stacked, tags readable.
- [ ] S5: title, photo, SMS panel, caption, tips in that order.
- [ ] S6: ruler stacked; zone rows show St. Thomas and Kingston with live fee and cut-off; panel last.
- [ ] Every jump link lands with its heading below the sticky header.

**768**

- [ ] Hero still single column, photo 16:9, jump strip 3 columns.
- [ ] S2 still stacked rows; S3 blocks side by side; S4 cards horizontal (disc left); S6 zone rows 2-up.

**1024**

- [ ] Hero 7/5; tracker card straddles the photo's left edge without covering the text column.
- [ ] S2 three columns; the oxblood lane reads as one continuous column with rounded top and bottom; lane titles: "On your screen" above column 2, "In Jamaica" inside the lane's first cell.
- [ ] S3 pair left, text right, vertically centred.
- [ ] S6 7/5 with the bordered panel top-aligned.

**1440**

- [ ] Content capped at `max-w-wide` (hero) / `max-w-page` (others); photos sharp (correct `sizes`).
- [ ] Rhythm matches §1B.1: no two full-width red bands touching.
- [ ] Compare with the "before" screenshots: fewer sections, no repeated photo chapters, the S2 lane is the memorable element.

**Data and honesty**

- [ ] Every number is live (fees, cut-offs, basket and item prices, J$ at the live rate) or labelled "Example".
- [ ] No store name on any drawn receipt; no competitor named; no counts, ratings or testimonials.
- [ ] Bank-transfer lines (S2 row 1, S2 footnote, S6 note, FAQ faq-5) appear only when bank transfer is configured.
- [ ] `#proof-h` still resolves (home S5 link).
- [ ] `/photo-credits` lists `hiwSender` and `hiwFamilyDoor`.
- [ ] `npm run check` green; `how-it-works.test.ts` and the `OutcomeTag` change covered.

---

## 9. Open questions

**For the manager**

1. Allow `preload` on `hiwSender` (this page's LCP at desktop)? If yes, update the
   "Only the home hero uses preload" line in `docs/PHOTOGRAPHY.md` to "the top photo of a page".
2. OK to move `speedLabel` from `home/coverage.tsx` into `src/lib/home.ts` as `SPEED_LABEL`?
3. OK to reuse `HomeQuestions` and `HomeClosing` across pages as they are (no props added)? A
   later tidy-up could move them to `components/site/`.

**Needs Derion (hidden or worded vaguely until provided)** 4. The real SMS wording (Twilio templates). Today: labelled examples. 5. How long "Ask me first" waits for an answer, and by which channel we message (email,
SMS, WhatsApp). Today: "we message you", "in time". 6. How long the driver waits when nobody is home, whether there is a redelivery fee, and how
many tries. Today: "a reasonable time", "another try", no fee mentioned. 7. When refunds are sent and how (back to PayPal / card?). Today: row 7 has no time. 8. Sunday and public-holiday delivery. Not mentioned. 9. FAQ `faq-4` ("How do I pay?") mentions bank transfer even when it isn't configured.
Content fix in the FAQ data, not on this page. 10. Whether the driver records the recipient's name on every delivery (the copy says
"notes who received it", as the current page and delivery policy already do). Confirm.

---

## 10. Files

**Create**

- `src/components/pages/how-it-works/hiw-hero.tsx`
- `src/components/pages/how-it-works/hiw-journey.tsx`
- `src/components/pages/how-it-works/mini-receipt.tsx`
- `src/components/pages/how-it-works/hiw-proof.tsx`
- `src/components/pages/how-it-works/hiw-substitutions.tsx`
- `src/components/pages/how-it-works/hiw-family.tsx`
- `src/components/pages/how-it-works/hiw-timing.tsx`
- `src/components/pages/how-it-works/example-texts.ts` (the two texts, §3.3)
- `src/lib/how-it-works.ts` + `src/lib/how-it-works.test.ts`

**Change**

- `src/app/(site)/how-it-works/page.tsx`: rewritten to compose S1–S8.
- `src/components/order/item-outcome.tsx`: export `OutcomeTag`.
- `src/lib/home.ts` (+ test): add `SPEED_LABEL`; `home/coverage.tsx` imports it.
- `src/lib/photos/guide.ts`: add `hiwSender`, `hiwFamilyDoor`; update `guideProduce.usedOn`.
- `docs/PHOTOGRAPHY.md` (if §9 Q1 is approved), `docs/DESIGN-DECISIONS.md` (dated entry).

**Delete** (after grepping for other importers)

- `src/components/pages/guide/stage-timeline.tsx` (only this page uses it).
- `GuideHero` and `FaqList` stay: `/delivery` and `/faq` use them.

**Anchors**

- Kept: `proof-h` (linked from home S5), `subs-h`, `family-h`.
- New: `journey-h`, `timing-h`, `nobody-home-h`; jump target `questions-title` (from `HomeQuestions`).
- Dropped: `chapters-h`, `stages-h`, `pay-h`, `hiw-faq-h`. A repo grep for `how-it-works#`
  finds only `#proof-h` (`src/components/pages/home/proof.tsx`), so no other links need
  updating.
