# Home page redesign — build plan

Owner: design agent · For: development agent · Scope: `/` from the header bar to the last line of
the footer. The new header and footer replace the shared ones on every `(site)` page.

Read with: `CLAUDE.md`, `docs/BRIEF.md`, `docs/TOKENS.md`, `docs/DESIGN-SYSTEM.md`,
`docs/PHOTOGRAPHY.md`. Where this plan and those files disagree on a brand rule, those files win
and the dev agent flags it to the manager.

Build exactly what is written. Anything not specified here: use the existing component or token,
never invent a value. Every class named below exists today unless it is listed in
[§2.6 New tokens and utilities](#26-new-tokens-and-utilities).

---

## Contents

1. [Concept](#1-concept)
1B. [Structure blueprint](#1b-structure-blueprint) — **read this first**: the page skeleton and every section's structure
2. [Design-system decisions](#2-design-system-decisions)
3. [Page map](#3-page-map)
4. [Sections](#4-sections) — header, S1–S8, footer
5. [Header scroll, mobile menu, inner pages](#5-header-scroll-mobile-menu-inner-pages)
6. [Performance and rendering](#6-performance-and-rendering)
7. [Photo register](#7-photo-register)
8. [Self-review](#8-self-review)
9. [Acceptance checklist](#9-acceptance-checklist)
10. [Open questions](#10-open-questions)

---

## 1. Concept

**One line.** *Groceries for home. Proof for you.* The page sells the receipt as much as the
groceries: the sender sees what was bought, what it cost, and that it reached the door.

| | |
|---|---|
| Audience | Jamaicans abroad (New York, Toronto, London…) buying for family in St. Thomas and Kingston. Three moods: the monthly supporter, the occasion sender, the emergency. Mostly on a phone, often in the evening their time. |
| Primary job | Get a first-time sender to start a basket (`/shop`) with enough trust to pay a company they have never used. |
| Secondary jobs | Returning sender: search, track an order. Occasion sender: ready-made basket. Doubter: coverage, cut-off, FAQ. |
| The ONE bold element | **The printed receipt in the hero.** A drawn till receipt for a real basket from our catalogue (Family Food Basket lines, priced in J$ at the live rate) sits over the edge of a large crimson hero and a warm photo of an older woman laughing on the phone at home. On load it *prints*: it slides out of an invisible slot and unrolls top to bottom, once. Everything else on the page is quiet. |
| Tone | Warm, homely, plain. Real people at home, a Jamaican country road, Kingston's hills. Big solid crimson, heavy Figtree, no decoration. |

### How we beat each competitor (what the page must make obvious)

| Competitor | What they offer | Our answer on this page | Where |
|---|---|---|---|
| grocerylistjamaica.com | PriceSmart resale for overseas buyers, plus a service fee | Proof: the till receipt photo and the door photo, on every order. Same-day in St. Thomas and Kingston with a stated cut-off. Your substitution rule. | Hero receipt, S1 step 3, S4, S6 |
| revvcouriers.com | St. Thomas courier, new site, generic delivery | We shop *and* deliver; you choose the items, pay in USD; the family installs nothing. | Hero lead, S1, S4 |
| PriceSmart Jamaica | Membership store; you need to be in Jamaica or have a member there | No membership for you or your family; we go to the store for you. (Never name PriceSmart on this page; FAQ answer may.) | S1 step 2, S6 |
| Remittances / gift sites | Send cash or vouchers; you don't know what it is spent on, family must collect | You choose exactly what arrives, at the door, with photos. Nothing for anyone to collect. | S6 title and lead |

We never name a competitor on the page and never claim a price comparison we cannot prove.

---

## 1B. Structure blueprint

Structure comes first; styling (§2 onwards) dresses it. Each section entry in §4 opens with a
**Structure** block using the same six points as the table below.

### 1B.1 Whole-page skeleton

Heights are approximate, from the token paddings and the stated aspect ratios. `▓` = red
(crimson/oxblood), `▒` = photo as background, `░` = neutral (`page`/`surface`). "Full" =
full-bleed background; "wide"/"page" = content capped at `max-w-wide` (1280) / `max-w-page`
(1152).

```
1440 × ~8,100px                                               375 × ~12,600px
                                                              
┌▓▓▓ HEADER  sticky bar, full, content wide        72 ┐       ┌▓ HEADER bar 64 + search row 56   120┐
├▓▓▓ S1 HERO  split 6/6: text | framed photo        │       ├▓ S1 HERO  single column: text,      │
│▓▓▓        + receipt object over the seam      ~780 │       │▓  then photo, receipt overlapping  │
│▓▓▓        full crimson band, content wide         │       │▓  the photo foot                ~1050│
├░░░ S2 STEPS  four-up row, photo on top        ~700 │ photo │░ S2 STEPS  4 rows: thumb | text ~830│
├░░░ S3 DEPARTMENTS  four-up tile row            ~750 │ photo │░ S3 DEPTS  2×2 tiles            ~740│
├░░░ S4 BASKETS  three-card row                  ~820 │ photo │░ S4 BASKETS  3 stacked cards   ~1700│
├▓▓▓ S5 PROOF  full oxblood band; split 6/5:          │ text  │▓ S5 PROOF  stacked: list, SMS  ~1100│
│▓▓▓        timeline list | SMS panel           ~780 │       │                                     │
├░░░ S6 WHY  split 5/6: framed tall photo | ruled     │ photo │░ S6 WHY  photo, then list       ~1300│
│░░░        list of 4 promises                 ~800 │       │                                     │
├▒▒▒ S7 COVERAGE  full-bleed photo + flat oxblood     │ photo │▒ S7 COVERAGE  photo bg, title,      │
│▒▒▒        70% overlay; 2 white zone cards on top~720│ (bg)  │▒  2 stacked cards             ~1000│
├░░░ S8 QUESTIONS  split 4/8: intro | accordion ~560 │ text  │░ S8 QUESTIONS  intro, then list ~800│
├░░░ S9 CLOSING  contained crimson panel        ~410 │ text  │░ S9 CLOSING  stacked panel      ~480│
├▓▓▓ FOOTER  full oxblood, 4 columns (4/2/2/3)   ~520 ┘       └▓ FOOTER  brand, 2-col links    ~1000┘
```

Rhythm, top to bottom: **red mass → three light photo-led rows → red text-led band → light
photo-led split → photo band → light text-led split → contained red panel → red footer.**
Full-bleed blocks (hero, S5, S7, footer) alternate with contained light sections so the page
never has two dark bands touching, and photo-led (S2–S4, S6, S7) alternates with text-led (S5,
S8, S9) so the eye gets a rest after every image run.

### 1B.2 Section structures at a glance

| Section | 1. Pattern | 2. Background | 3. Container / height | 4. Columns 375 → 768 → 1024 → 1440 (what comes first on phones) | 5. Building blocks (counts) | 6. Why this structure, for the sender |
|---|---|---|---|---|---|---|
| Header | Single sticky bar; phone search row below | Solid `crimson` | Full-bleed, content `max-w-wide`; 64 / 72px | 1 row (logo, icons) + search row → 1 row with search → 1 row + nav (3) → 1 row + nav (4) + search | logo, 3–4 nav links, search, account, basket, menu | Search and basket always one tap away; a shop-like bar says "you can buy here", unlike courier sites that open with a contact form. |
| S1 Hero | **Split two-column, 6/6**: text left, framed photo right, receipt object straddling the photo's left edge | Solid `crimson` (photo in a frame, not a background) | Full-bleed band, content `max-w-wide`; auto height, ≈ one viewport at 1440 (~780px) | 1 (text, photo, receipt) → 1 → 2 → 2 | h1, lead, 2 CTAs (primary + text link), cut-off line, 1 photo, 1 receipt | Text first on phones = the promise and the button before any scrolling; the receipt shows the proof before it's explained. Competitors open with a generic banner or a product grid and no proof. |
| S2 Steps | **Four-up row** (sequence) | none (`page`) | Contained `max-w-page`; auto | 1 (4 rows: thumb left, text right) → 2×2 → 4 → 4 | header (h2, lead, link) + 4 steps, each = photo + number dot + h3 + 2-line body | Answers "how does this work from abroad?" in one glance; the four photos show real people at each step. |
| S3 Departments | **Four-up tile row** | Solid `surface` | Contained `max-w-page`; auto | 2×2 → 4 → 4 → 4 | header + 4 tiles, each = photo + name + item count | One tap into a department; real counts show a real shop. |
| S4 Baskets | **Three-card row** | none (`page`) | Contained `max-w-page`; auto | 1 → 2 (3rd card spans 2, side-by-side inside) → 3 → 3 | header + 3 cards, each = photo 16:9 + h3 + 1-line body + item count + price + saving tag + Add button | Fastest path to checkout for occasion senders; prices and real savings visible without opening anything. |
| S5 Proof | **Full-width band, split 6/5**: timeline list left, SMS panel right | Solid `oxblood` | Full-bleed band, content `max-w-page`; auto | 1 (list, then panel) → 1 → 2 → 2 | h2, lead, 4-step email timeline, 1 SMS panel with 2 bubbles, footnote, link | Our edge, stated as what lands in *your* inbox and *their* phone. Text-led on purpose: a break after three photo rows. |
| S6 Why | **Split two-column, 5/6** (1 column gap): framed tall photo left (sticky), title + ruled list right | none (`page`) | Contained `max-w-page`; auto | 1 (title, photo, list) → 1 (title, photo 16:9, list 2-col) → 2 → 2 | 1 photo 4:5, h2, lead, 4 promises (icon + h3 + body), 1 link | Puts us against barrels and cash, the senders' real alternatives, with a warm family photo beside the reasons. |
| S7 Coverage | **Full-bleed background photo with a flat overlay**, two cards on top | Photo `jmKingstonHills` + **`photo-scrim` (oxblood at 70%)**, flat | Full-bleed; `min-h-[640px]` at lg, auto below | 1 (title, cards stacked) → 2 cards → 2 → 2 (3+ zones: 3) | h2, lead, 1 card per active zone (pill + h3 + 3 data rows), cut-off note, 2 links | A place, not a table: Kingston's hills behind the live fees and cut-offs. Answers "do you deliver to my family?" with real data. |
| S8 Questions | **Split two-column, 4/8**: intro + links left (sticky), accordion right | Solid `surface` | Contained `max-w-page`; auto | 1 (intro, then list) → 1 → 2 → 2 | h2, lead, 2–3 links, 5 accordion items | Clears doubts without leaving the page; contact is right there. |
| S9 Closing | **Single contained panel**, text left / buttons right inside | `page` band + solid `crimson` panel | Contained `max-w-page`; auto | 1 → 1 → 2 (text / buttons) → 2 | h2, 1 line, 2 CTAs (primary + text link) | One last, calm ask after the doubts are answered; contained so it never touches the red footer. |
| Footer | **Four-column footer**: brand/contact + 3 link columns, legal row | Solid `oxblood` | Full-bleed, content `max-w-wide`; auto | 1 (brand, then 2-col links) → brand + 3 cols → 4/2/2/3 of 12 → same | brand + contact (2–3 rows), 3 link columns, payments line, legal line with flag | Everything findable; company name and contact up front read as an established local business. |

### 1B.3 Overlay rule (owner decision, November 6, 2026)

A photo may be a section background **with a flat overlay** (one colour role at one opacity, no
gradient) when that is the best structure. This overrides the "no overlays" line in
`docs/PHOTOGRAPHY.md`; update that file in the same PR. On this page it is used **once**, in
S7. The hero stays a split because the receipt needs a solid crimson ground to read, text over
a photo on a 375px phone would cover the face, and a split keeps the `h1` (not a darkened
photo) as the phone LCP.

Contrast check for S7 (`photo-scrim` = oxblood `#4A0B1C` at 70%), worst case = a pure white
pixel underneath: blended colour `#805460`, relative luminance 0.118 →
**`on-dark` (#FFFFFF) = 6.2:1** (passes AA for all text). At 65% it would be 5.3:1; we use
70%. `blush` would be 4.1:1 and `on-oxblood-muted` 2.7:1, so **only `on-dark` text sits on the
overlay**; everything else is inside the white cards.

---

## 2. Design-system decisions

### 2.1 Skill recommendations accepted and rejected

`ui-ux-pro-max --design-system "diaspora grocery delivery service premium warm"` returned:

| Recommendation | Verdict | Why |
|---|---|---|
| Style: Liquid Glass (translucency, blur, refraction) | **Rejected** | Brand rule: flat colour, no gloss, no gradients. Blur is only for dismissing a background. |
| Colours: black `#1C1917` + gold `#A16207` accent, `#FAFAF9` background | **Rejected** | Not the client's palette. Gold is reserved for savings tags (`jm-gold`). Off-white page is the "cream" AI tell. |
| Type: Cormorant + Montserrat | **Rejected** | Figtree only (client PDFs). A serif display would be the cream+serif tell. |
| Pattern: scroll-triggered storytelling, chapter CTAs | **Partly accepted** | The page reads as one order's story (hero → steps → proof → coverage), but with **no** scroll-scrub, no parallax, no per-section reveal. |
| Landing: Trust & Authority + Conversion (proof before CTA) | **Accepted, adapted** | Our proof is the receipt and door photo, not logos, badges or testimonials (we have none and won't invent them). |
| UX: sticky nav must not cover content; reserve image space; lazy-load below fold; `priority`/`preload` only on the LCP image; Suspense for runtime data | **Accepted** | Applied in §5 and §6. |
| UX: one primary CTA per view; 44px targets; visible focus; reduced motion; 4.5:1 text | **Accepted** | Applied throughout; see §8 checklist. |
| GSAP stagger presets | **Rejected** | No GSAP. One CSS animation (the receipt) and existing `motion` only for user feedback. |

### 2.2 Colour roles and page rhythm

One new colour role (`photo-scrim`, §2.6). Red stands out as **three solid blocks** — the
header+hero mass at the top, the oxblood proof band in the middle, the crimson closing panel at
the end — plus the oxblood-tinted Kingston photo band (S7), with neutral bands between. Never two
dark bands touching (S5 and S7 are separated by S6).

```
 ┌───────────────────────────────┐
 │ demo bar (ink, demo mode only)│
 ├───────────────────────────────┤
 │ header bar        crimson     │ ┐
 │ S1 hero           crimson     │ ┘ one red mass: the bar and hero read as one block
 │ S2 how it works   page        │
 │ S3 departments    surface     │
 │ S4 baskets        page        │
 │ S5 what you get   oxblood     │ ← middle red block
 │ S6 why ShipEast   page        │
 │ S7 coverage       photo + oxblood 70% overlay, full-bleed │ ← photo band (not a solid red band)
 │ S8 questions      surface     │
 │ S9 closing        page band + crimson panel (rounded-2xl, contained) │
 │ footer            oxblood     │ ← separated from the crimson panel by the page band's bottom padding
 └───────────────────────────────┘
```

| Where | Background | Headings | Body | Secondary text | Lines | Links | Focus ring |
|---|---|---|---|---|---|---|---|
| Header, S1, S9 panel | `crimson` | `on-dark` | `on-dark` | `on-crimson-muted` | `crimson-deep` | `on-dark`, underline on hover | **`blush`** (see 2.6) |
| S5, footer | `oxblood` | `on-dark` | `on-dark` | `on-oxblood-muted` | `line-on-dark` | `on-oxblood-muted` → `on-dark` | **`blush`** |
| S7 band (on the overlay) | photo + `photo-scrim` | `on-dark` | `on-dark` | `on-dark` only (see 1B.3) | — | `on-dark`, underline | **`blush`** (ring is non-text: blush on the darkest overlay ≥ 3:1) |
| S7 zone cards | `surface` | `ink` | `ink-body` | `ink-muted` | `line` | | `signal` |
| S2, S4, S6, S9 band | `page` | `ink` | `ink-body` | `ink-muted` | `line` | `crimson` | `signal` |
| S3, S8 | `surface` | `ink` | `ink-body` | `ink-muted` | `line` | `crimson` | `signal` |
| Cards on page | `surface` + `border-line` | `ink` | `ink-body` | `ink-muted` | `line` | | `signal` |

`signal` on crimson is about 1.6:1 and fails WCAG 1.4.11, hence the blush ring on dark areas.

### 2.3 Type

| Element | Class | Weight (from token) | Notes |
|---|---|---|---|
| Hero headline (only `h1`) | `text-display text-balance` | 900 | Two short lines. Not animated. |
| Section titles (`h2`) | `text-h2 text-balance` | 800 | Every section has one. |
| Card / step / zone titles (`h3`) | `text-h3` | 700 | |
| Leads | `text-lead` | 400 | `max-w-2xl` (~75 characters). |
| Running text | `text-body` | 400 | |
| Meta, captions, receipt lines, footer links | `text-small` | 500 | |
| Pills and counters | `text-xs` | set by pill | Only in pills/badges. |
| Eyebrow | **not used on this page** | | Titles say enough on their own. |
| Numbers | add `tabular-nums` to every price, fee, time and count | | |

Never hand-set `tracking-*`, `leading-*` or a font size. The wordmark is the one exception
(it already is).

### 2.4 Spacing, width, radius, elevation

| Thing | Value |
|---|---|
| Section padding | S1 `section-lg` top + `pb-12` on phones/tablets, `lg:section` (top and bottom) so header + hero fit one screen at 1440; S2–S9 `section`; S7 `section` + `lg:min-h-[640px]` |
| Content width | `max-w-wide` for the header, S1, S5 and footer; `max-w-page` for S2–S4, S6–S9 |
| Sides | `gutter` everywhere |
| Gaps | Inside cards 8 / 12 / 16px (`gap-2/3/4`). Between blocks 24 / 32 / 48px (`gap-6/8/12`). Title-to-content: `mt-8 lg:mt-12`. |
| Radius | Photos `rounded-lg` (12px) in grids; hero photo `rounded-2xl` (24px); basket cards `rounded-xl`; S9 panel `rounded-2xl`; buttons/inputs `rounded-md`; pills `rounded-full`; receipt `rounded-sm` top corners only (torn bottom) |
| Elevation | Cards flat (`border border-line`). `shadow-float` on the hero receipt and the S7 zone cards (they float over a photo). `shadow-lift` on basket-card hover and the scrolled header. `shadow-overlay` on the mobile menu. |
| Layers | Header `z-header`; hero receipt `z-raised`; mobile menu (dialog top layer) needs none; skip link `z-overlay` |

### 2.5 Motion budget

| Motion | Trigger | Spec | Reduced motion |
|---|---|---|---|
| **Receipt prints** (the one orchestrated moment) | Page load, CSS only | `animate-print`: 700ms `ease-out-soft`, 300ms delay; from `clip-path: inset(0 0 100% 0)` + `translateY(-16px)` to `inset(0)` + `translateY(0)`; the rotation (-3deg) is on a wrapper so it does not animate | Shown in final state (global reduce rule) |
| Button press | `:active` | `translate-y-px`, 150ms (existing) | kept (no motion: transition 0.01ms) |
| Card hover | pointer | `hover-lift` 250ms (existing) | no rise |
| Photo zoom in link tiles | pointer | `scale(1.04)` 700ms `ease-out-soft` (existing `zoom`) | none |
| Header shadow on scroll | scroll > 8px | 450ms `duration-slow` box-shadow + border colour | instant |
| Mobile menu | open/close | slide from right `translateX(100%)→0` 450ms `ease-out-soft`; close 250ms | fades 0ms (instant) |
| Accordion icon | open/close | `Plus` rotates 45°, 200ms (existing) | instant |
| Add to basket | click | existing `AddToBasket` feedback | as existing |

Nothing else moves. **No `<Reveal>`, `<Stagger>` or `<Parallax>` on this page.** The hero
headline, lead and buttons are static so the largest paint is never held back.

### 2.6 New tokens and utilities

Add to `src/app/globals.css`, list in `docs/TOKENS.md`, show on `/styleguide`. One new colour
role, built from an existing primitive.

| Name | Kind | Value | Used by |
|---|---|---|---|
| `photo-scrim` | colour role (`@theme inline`: `--color-photo-scrim: rgb(74 11 28 / 0.7)`, i.e. `--crimson-900` at 70%) | oxblood at 70%, flat | S7 overlay only. Add its worst-case pair (`on-dark` over `photo-scrim` on white = 6.2:1) to `design-tokens.test.ts`. Kept separate from `scrim` (60%, dialogs) so either can change alone. |
| `--header-height` | `:root` var | `4rem` (64px); `4.5rem` (72px) at `min-width: 768px` | sticky offset |
| `scroll-mt-header` | `@utility` | `scroll-margin-top: calc(var(--header-height) + 1rem)` | every section with an `id`, the FAQ items (WCAG 2.4.11: focus not hidden under the sticky bar) |
| `animate-print` | `@utility` + `@keyframes print` | `animation: print var(--duration-reveal) var(--ease-out-soft) 300ms both;` `@keyframes print { from { clip-path: inset(0 0 100% 0); transform: translateY(calc(var(--motion-rise) * -1)); } }` | `HeroReceipt` |
| `on-dark-focus` | `@utility` | `& :focus-visible { outline-color: var(--color-blush); }` | header bar, S1, S5, S9 panel, footer, mobile-menu trigger |

Tests: `design-tokens.test.ts` needs no new colour pairs. Add `blush` ring on `crimson`/`oxblood`
to the 3:1 non-text checks if the test has a list for focus rings.

---

## 3. Page map

| # | Section | Background | Purpose | The single action it drives |
|---|---|---|---|---|
| — | Demo bar (demo mode only) | `ink` | Says orders can't be placed yet | none |
| H | Header | `crimson`, sticky | Find, search, basket | Search / open basket |
| S1 | Hero: *Groceries for home. Proof for you.* | `crimson` | Say what we do, show the proof, show today's cut-off | **Start shopping** → `/shop` |
| S2 | From your phone to their door | `page` | The four steps of one order | See the full journey → `/how-it-works` |
| S3 | Shop by department | `surface` | Jump straight into a department | Open a department → `/shop/{slug}` |
| S4 | Ready-made baskets | `page` | One-tap baskets for the usual needs | Add a basket (or open it) |
| S5 | You see it bought. You see it delivered. | `oxblood` | What the sender and the family receive | See the full journey → `/how-it-works#proof` |
| S6 | No barrel. No cash. You choose what arrives. | `page` | Why us over barrels, cash and vouchers | none (reassurance); link to `/about` |
| S7 | Delivering in St. Thomas and Kingston | photo + `photo-scrim` | Live fees, cut-offs, minimums per parish | Delivery areas and fees → `/delivery` |
| S8 | Questions senders ask first | `surface` | Clear the last doubts | All questions → `/faq` |
| S9 | Start a basket for home | `page` + crimson panel | Close | **Start shopping** → `/shop` |
| F | Footer | `oxblood` | Every link, contact, legal | Contact / any link |

> Order change from the first pass: **why (S6) now comes before coverage (S7)** so the page goes
> what → how → shop → proof → why → where → doubts → close. The oxblood band (S5) sits between two
> page bands, never touching another red block.

`h1` = S1 only. `h2` = one per section. `h3` = cards/steps/zones/promises.

---

## 4. Sections

Breakpoints: phone 375, tablet 768 (`md`), laptop 1024 (`lg`), desktop 1440 (`xl` and up; the
column caps at `max-w-wide`/`max-w-page`). All wireframes show content inside `gutter`.

### 4.0 Data used by the page

`src/app/(site)/page.tsx` (server, no `'use client'`) loads in parallel:

```ts
const [settings, zones, categories, baskets, products, faqs] = await Promise.all([
  getSettings(), getActiveZones(), getCategories(), getBaskets({ featured: true }),
  getProducts(), getFaqs(),
])
```

All six loaders are `'use cache'` with `cacheLife('hours')` in `src/lib/data/source.ts`, so the
page body prerenders; nothing here reads cookies, headers or `searchParams`. Runtime pieces
(basket count, the visitor's clock) are isolated as listed in §6.

Derived values (compute in `page.tsx`, pass down as props):

| Name | How | Fallback |
|---|---|---|
| `earliestCutoff` | `min(zones.map(z => z.cutoffTime))` (string compare `HH:MM`) | no zones → hide every cut-off line |
| `parishList` | `zones.map(z => z.parish)` joined `"A and B"` / `"A, B and C"` | no zones → "Jamaica" in titles, S7 empty state |
| `receiptBasket` | the basket with slug `family-food-basket` from `getBaskets()`; else the first featured basket | none → `HeroReceipt` hidden, photo stands alone |
| `receiptLines` | its `items` → `{ qty, name, jmd: usdCentsToJmd(product.priceCents * qty, settings.jmdPerUsd) }`, max 7 lines | |
| `faqItems` | `faqs` with ids `faq-1, faq-8, faq-9, faq-6, faq-4` in that order; any missing → fill from the lowest `sort` | fewer than 3 → hide S8 |

---

### 4.H Header (shared, all `(site)` pages)

Replaces `src/components/site/site-header.tsx`, `header-shell.tsx`; `basket-link.tsx` and
`search-box.tsx` are reused.

#### Structure

| | |
|---|---|
| 1. Pattern | One sticky horizontal bar (logo · nav · search · account · basket), plus on phones a second, non-sticky search row under it. No announcement strip, no mega menu. |
| 2. Background | Solid `crimson`, flat. |
| 3. Container / height | Full-bleed bar, content `max-w-wide gutter`. Bar 64px (< md), 72px (md+). Phone search row 56px. |
| 4. Columns | 375: one row [logo ··· account, basket, menu] + search row. 768: one row [logo, search (flex), account, basket, menu]. 1024: [logo, 3 nav links ··· search icon, account, basket]. 1440: [logo, 4 nav links, search field ··· account, basket]. |
| 5. Blocks | 1 wordmark, 3–4 nav links, 1 search, 1 account icon, 1 basket pill, 1 menu button (< lg). |
| 6. Why | A shop's header (search + basket) tells a first-time sender this is a store they can buy from now, not a courier asking them to call. Search on the first screen of a phone serves the returning monthly sender who knows what they want. |

#### Structure and copy

| Item | Copy / content | Data |
|---|---|---|
| Wordmark | existing `<Wordmark onDark />`, link to `/`, `aria-label="ShipEast Shop & Send, home"` | — |
| Nav (lg+) | **Shop** `/shop` · **Baskets** `/baskets` · **How it works** `/how-it-works` · **Track an order** `/track` (xl+ only; below xl it lives in the menu and footer) | static |
| Search | existing `SearchBox`, placeholder "Rice, diapers, detergent…", label "Search the shop" | — |
| Search icon (lg only, < xl) | `IconButton` link to `/search`, label "Search the shop" | — |
| Account | `User` icon link to `/account`, sr-only "Your account" | — |
| Basket | existing `BasketLink` (white pill, "Basket" text from `sm`, count badge) in `<Suspense fallback={<BasketLinkFallback/>}>` | basket cookie |
| Menu (< lg) | `Menu` icon button, sr-only "Menu", opens `MobileMenu` | categories (counts), settings |

(The "·" separators above are documentation only; nothing on the page uses middle dots.)

#### Layout

```
375 ─ sticky bar h-16 (64px)                      then NOT sticky: search row
┌───────────────────────────────────────────┐
│ ShipEast            [👤] [🧺 3] [≡]        │  bar: crimson
│ Shop & Send                                │
├───────────────────────────────────────────┤
│ [🔍 Rice, diapers, detergent…          ]   │  search row: crimson, pb-3, scrolls away
└───────────────────────────────────────────┘

768 ─ sticky bar h-18 (72px), no second row
┌──────────────────────────────────────────────────────────────┐
│ ShipEast   [🔍 Rice, diapers, detergent…        ] [👤][🧺 Basket 3][≡] │
└──────────────────────────────────────────────────────────────┘

1024 ─ h-18
┌────────────────────────────────────────────────────────────────────────┐
│ ShipEast   Shop  Baskets  How it works              [🔍] [👤] [🧺 Basket 3] │
└────────────────────────────────────────────────────────────────────────┘

1440 ─ h-18, inside max-w-wide (1280)
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ ShipEast  Shop  Baskets  How it works  Track an order  [🔍 Rice, diapers…   ] [👤] [🧺 Basket 3] │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

| Breakpoint | Bar | Order (left → right) | Gaps |
|---|---|---|---|
| < md | `h-16` | wordmark `mr-auto`, account, basket, menu | `gap-1` |
| md – < lg | `h-18` | wordmark, search `flex-1 max-w-md mx-4`, account `ml-auto`, basket, menu | `gap-2` |
| lg – < xl | `h-18` | wordmark `mr-6`, nav, search icon `ml-auto`, account, basket | `gap-2`, nav items `gap-1` |
| xl + | `h-18` | wordmark `mr-6`, nav (4), search `flex-1 max-w-sm ml-auto`, account, basket | `gap-3` |

Container: `mx-auto flex max-w-wide items-center gutter`. Mobile search row:
`mx-auto max-w-wide gutter pb-3 md:hidden`.

#### Colours and type

| Element | Rest | Hover | Current page | Focus |
|---|---|---|---|---|
| Bar | `bg-crimson`, `border-b border-transparent` | — | — | — |
| Bar, scrolled | `border-crimson-deep shadow-lift` | | | |
| Nav link | `text-on-dark font-semibold text-body min-h-control px-3 rounded-md inline-flex items-center` | `bg-crimson-deep`, 150ms | `aria-current="page"`, `bg-crimson-deep` + 3px `blush` bar under the label (`after:` pseudo, `inset-x-3 bottom-1.5 h-[3px] rounded-full bg-blush`) | blush ring (`on-dark-focus`) |
| Icon buttons | `size-control rounded-full text-on-dark` | `bg-crimson-deep` | | blush ring |
| Basket pill | existing (`bg-surface text-crimson-deep`) | `bg-surface-muted` | | signal ring (on white pill) — keep |
| Search field | existing compact white pill | | | existing |

#### Components

| Component | File | Props | Server / client |
|---|---|---|---|
| `SiteHeader` | `src/components/site/site-header.tsx` (rewrite) | none; loads `getCategories()`, `getSettings()` | server; returns a **fragment**: `<HeaderShell>…</HeaderShell><HeaderSearchRow/>` so the bar is sticky against the page, not against a short wrapper |
| `HeaderShell` | `header-shell.tsx` (keep, small edit) | `children` | client: scroll shadow. Change `duration-300` → `duration-slow`; add `on-dark-focus`. |
| `NavLink` | `src/components/site/nav-link.tsx` (new) | `href`, `children`, `exact?: boolean` | client: `usePathname()` → `aria-current`. Why client: needs the current path. |
| `HeaderSearchRow` | `src/components/site/header-search-row.tsx` (new) | none | client wrapper: `usePathname()`, renders nothing on `/search`, `/basket`, `/checkout*` (they have their own box or must stay focused). Children = server `SearchBox id="header-q-sm"`. |
| `MobileMenu` | `src/components/site/mobile-menu.tsx` (new) | `departments: {href,label,slug,count}[]`, `links: {href,label}[]`, `email`, `whatsapp`, `phone` | client: native `<dialog>` + `showModal()`. See §5. |
| `BasketLink`, `SearchBox`, `Wordmark`, `IconButton` | existing | | |

#### States

| State | Treatment |
|---|---|
| Basket loading | `BasketLinkFallback` (pill with empty badge, same size, no layout shift) |
| Basket empty | badge shows `0` (existing) |
| No categories | menu hides the department list |
| Demo mode | existing `DemoBanner` above the header, not sticky |

#### Accessibility

`<header>` landmark (from `HeaderShell`). Nav is `<nav aria-label="Main">`. Tab order:
skip link → wordmark → nav → search → account → basket → menu. Search form has
`role="search"` (existing). Sticky bar height is reserved by its own box (it's `sticky`, not
`fixed`), so nothing hides beneath it on load; anchors use `scroll-mt-header`.

---

### 4.1 S1 Hero — the receipt

#### Structure

| | |
|---|---|
| 1. Pattern | **Split two-column, 6/6**: text block left, framed photo right; a receipt object straddles the photo's left edge (the seam between the two columns). Not a background-photo hero (reasons in 1B.3). |
| 2. Background | Solid `crimson`, flat. Photo sits in a `rounded-2xl` frame, no overlay. |
| 3. Container / height | Full-bleed band, content `max-w-wide`. Auto height; at 1440 ≈ 780px (96 + 584px square photo + 96), so header + hero fit one 900px-tall screen. At 375 ≈ 1,050px. |
| 4. Columns | 375: 1 column — h1, lead, CTAs, cut-off, then photo, receipt overlapping the photo's foot. 768: 1 column, text `max-w-2xl`, photo 16:9. 1024 and 1440: 2 columns (text col 1–6, photo col 7–12), vertically centred. |
| 5. Blocks | 1 h1 (2 lines), 1 lead (3–4 lines), 2 CTAs (primary button + secondary text link), 1 cut-off line, 1 photo, 1 receipt (head + ≤ 7 lines + total) with 1 caption. |
| 6. Why | Phone senders read the promise and see the button before any image. The receipt shows the proof in the first screen, before we explain it; competitors open with a promo banner or a product grid and never show what you get back. |

#### Copy

| Element | Copy |
|---|---|
| `h1` | **Groceries for home. Proof for you.** |
| Lead | Fill a basket for your family in {parishList} and pay in US dollars. Our driver buys everything in Jamaica, delivers it the same day, and sends you a photo of the till receipt and a photo at the door. |
| Primary button | **Start shopping** → `/shop` |
| Secondary link | See ready-made baskets → `/baskets` |
| Cut-off line (server text) | Order by **1:00 PM** Jamaica time for delivery today. *(time = `formatClockTime(earliestCutoff)`)* |
| Cut-off line (client addition, after mount) | before cut-off: ` That's 2:00 PM where you are, 3h 12m from now.` · after cut-off: ` Today's orders have closed; orders placed now go out on the next delivery day.` (uses `cutoffInLocalTime`, `minutesToCutoff`, `formatDuration` from `src/lib/cutoff.ts`; local part omitted when the visitor is on Jamaica time) |
| Receipt pill | Example receipt |
| Receipt head | Family Food Basket *(basket name)* / Kingston, Jamaica |
| Receipt lines | `2 x Corned Beef ……… J$1,490` (qty prefix only when > 1); from `receiptLines` |
| Receipt total | Total ……… J$X *(sum of the lines)* |
| Caption under receipt | `Camera` icon + "You get a photo of the real one" |

#### Layout

```
375
┌──────────────────────────────┐ crimson
│ Groceries for                │ text-display on-dark
│ home. Proof                  │
│ for you.                     │
│                              │
│ Fill a basket for your fam…  │ text-lead on-crimson-muted
│                              │
│ [ Start shopping          ]  │ onDark lg, block (full width)
│   See ready-made baskets     │ text link, h-control
│                              │
│ ⏱ Order by 1:00 PM Jamaica…  │ text-small
│                              │
│ ┌──────────────────────────┐ │ photo 4:3 rounded-xl
│ │      (woman on phone)    │ │
│ │                ┌───────┐ │ │
│ │                │RECEIPT│ │ │ receipt w-60, -mt-28, ml-auto mr-3, -rotate-3
│ └────────────────│       │─┘ │
│                  │       │   │
│                  └╲╱╲╱╲╱─┘   │
│        📷 You get a photo…   │
└──────────────────────────────┘ band ends 48px below caption (pb-12)

768  same stack; text block max-w-2xl; photo 16:9; receipt w-64, -mt-36, mr-8

1024 / 1440   grid-cols-12 gap-8 (lg) / gap-12 (xl), items-center, max-w-wide
┌──────────────────────────────────────────────────────────────────────────────┐
│ col 1–6                                 │ col 7–12                           │
│ Groceries for home.                     │ ┌───────────────────────────────┐  │
│ Proof for you.                          │ │                               │  │
│                                         │ │   photo 1:1 rounded-2xl       │  │
│ Fill a basket for your family in…       │ │                               │  │
│                                         │┌┴──────┐                        │  │
│ [ Start shopping ]  See ready-made…     ││RECEIPT│  receipt w-72, absolute │  │
│                                         ││       │  -left-16 bottom-12     │  │
│ ⏱ Order by 1:00 PM Jamaica time…        │└╲╱╲╱╲╱┘  -rotate-3              │  │
│                                         │ └───────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
`lg:section` top and bottom (96px at 1440)
```

| | 375 | 768 | 1024 | 1440 |
|---|---|---|---|---|
| Band | `bg-crimson section-lg pb-12` (top 80px) | same | `lg:section` both (≈ 80px) | same (96px) |
| Container | `max-w-wide gutter` | | `grid grid-cols-12 gap-8 items-center` | `xl:gap-12` |
| Text block | full | `max-w-2xl` | `col-span-6` | `col-span-6`, `pr-8` |
| Lead | `mt-5` | | `mt-6` | |
| Buttons | `mt-8 flex flex-col gap-2`; primary `block` | `sm:flex-row sm:items-center sm:gap-6`, primary not block | | |
| Cut-off | `mt-6` | | `mt-8` | |
| Photo | `mt-10 aspect-4/3 rounded-xl` | `aspect-16/9` | `col-span-6 mt-0 aspect-square rounded-2xl` | same; width caps at ~584px, so ~584px tall |
| Receipt | `relative z-raised -mt-28 ml-auto mr-3 w-60` | `-mt-36 mr-8 w-64` | `absolute -left-16 bottom-12 w-72` (photo wrapper `relative`) | `-left-20 w-80` |

Photo `sizes`: `"(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 100vw"`.

#### Colours

Band `crimson`; `h1` `text-on-dark`; lead `text-on-crimson-muted`; primary `ButtonLink
variant="onDark" size="lg"`; secondary link `text-on-dark font-semibold underline
decoration-blush decoration-2 underline-offset-4 hover:decoration-on-dark`; cut-off icon
`Clock` `size-icon text-blush`, text `text-small text-on-dark`, the time `font-bold
tabular-nums`. Receipt paper `bg-surface text-ink`, rules `border-dashed border-line-strong`,
pill `bg-surface-muted text-ink-muted text-xs rounded-full px-2 py-0.5`; caption `text-small
text-on-crimson-muted`, icon `text-blush`. Container gets `on-dark-focus`.

#### Components

| Component | File | Props | Notes |
|---|---|---|---|
| `HomeHero` | `src/components/pages/home/hero.tsx` (new file; delete the old home components once the page no longer imports them) | `parishList`, `earliestCutoff: string \| null`, `receipt: { basketName, lines: {qty,name,jmd}[] } \| null` | server |
| `HeroReceipt` | `src/components/pages/home/hero-receipt.tsx` | `basketName`, `lines`, `className` | server. Paper: `bg-surface px-4 pt-4 pb-7 shadow-float receipt-edge rounded-t-sm`. Outer wrapper carries `-rotate-3`; inner carries `animate-print`. Lines `text-small tabular-nums`, name `truncate`, `flex justify-between gap-3`. Head centred (`text-center`, name `font-bold`). Total row `mt-2 pt-2 border-t border-dashed border-line-strong font-bold`. Wrapper is a `<figure>` with the caption as `<figcaption>`; `aria-label="Example receipt for the Family Food Basket, total J$X"` on the paper `div role="img"`, and the line list `aria-hidden` (the label carries the total). |
| `CutoffNote` | `src/components/site/cutoff-note.tsx` (new, reused by S7 and S9) | `cutoff: string` (`HH:MM`), `tone: 'onDark' \| 'light'` | **Server part** renders the sentence. **Client child** `CutoffCountdown` (`'use client'`) renders `null` until mounted, then the local-time sentence; refreshes every 60s with `setInterval`, cleared on unmount; `aria-live="off"` (it ticks; no announcements). |
| `ButtonLink`, `StockPhoto` | existing | `StockPhoto name="familyPhone" preload sizes=… className="aspect-… rounded-…"` | `preload` here only |

#### States

| State | Treatment |
|---|---|
| No active zones | lead says "for your family in Jamaica"; cut-off line hidden |
| No receipt basket / no products | receipt hidden; photo alone (no empty frame) |
| Receipt with > 7 items | first 7 lines + a line "and 3 more items" `text-ink-muted` |
| Long product name | `truncate`, full name stays in the `aria-label` total sentence? No: names are decorative in the image; the label gives basket and total |
| Button hover / press / focus | existing `onDark` styles; press `translate-y-px`; blush focus ring |
| Countdown before mount | server sentence only (no blank flash, no layout shift: the client sentence is inline text appended after) |

#### Motion

`HeroReceipt` inner → `animate-print`. Nothing else in the hero animates.

#### Accessibility

`<section aria-labelledby="hero-title">`; `h1#hero-title`. The photo has its registry alt.
The receipt is one `role="img"` with a label; its caption is real text. Focus order: primary
button → secondary link. Receipt is not focusable.

#### Photo

`familyPhone` (registry, `src/lib/photos/core.ts`) — see §7 row P1. Crop 4:3 phone, 16:9
tablet, 1:1 desktop; `object-position: 40% 35%` (add `position: '40% 35%'` to the registry
entry; her face sits left of centre).

---

### 4.2 S2 From your phone to their door (steps)

#### Structure

| | |
|---|---|
| 1. Pattern | **Four-up row** of steps (a true sequence), section header above with the link at its right. |
| 2. Background | None: `page`, flat. |
| 3. Container / height | Contained `max-w-page`. Auto; ≈ 700px at 1440, ≈ 830px at 375. |
| 4. Columns | 375: 1 column of 4 rows, each row = 96px square thumb left + text right (header first, link last). 768: 2×2 grid, photo on top. 1024 / 1440: 4 columns, photo on top. |
| 5. Blocks | Header (h2 + 1-line lead + 1 text link) + 4 steps, each = photo 4:3 (thumb 1:1 on phones) + number dot + h3 + 2-line body. |
| 6. Why | Answers the first question from abroad ("how can you buy for me over there?") in one glance, in order. Rows with thumbs keep four steps under one phone-and-a-half of scroll instead of four full-width photos. Competitors bury this on a separate page. |

#### Copy

| | |
|---|---|
| `h2` | **From your phone to their door** |
| Lead | Four steps, and you see each one happen. |
| Link (right of title on lg, under steps on phones) | See the full journey → `/how-it-works` |

| # | `h3` | Body | Photo |
|---|---|---|---|
| 1 | You fill the basket | Choose groceries, household, pharmacy or baby items, or a ready-made basket. Pay in US dollars by PayPal or card. | P2 `homeSenderPhone` |
| 2 | We shop in Jamaica | A ShipEast driver buys your list at a store in Jamaica. If something is out of stock, we follow the rule you chose. | P3 `stepShop` |
| 3 | You get the receipt | The driver photographs the till receipt and we email it to you, so you see what was bought and what it cost. | P4 `shopCheckout` |
| 4 | They get it at the door | Your family gets a text when the driver is on the way. At the door we take a photo and email it to you. | P5 `homeStepToDoor` (new) |

"by PayPal or card": if `settings.bankTransfer.bankName` is set, append "or bank transfer".

#### Layout

```
375 — ordered list, rows
┌──────────────────────────────┐ page
│ From your phone to their door│ h2
│ Four steps, and you see…     │ lead
│                              │
│ ┌──────┐ ① You fill the basket│ thumb 96×96 (aspect-square) rounded-md
│ │photo │   Choose groceries…  │ text-small ink-body
│ └──────┘                      │
│ ┌──────┐ ② We shop in Jamaica │  gap-6 between rows
│ ...                           │
│ See the full journey          │ link
└──────────────────────────────┘

768 — grid-cols-2 gap-x-6 gap-y-10, photo on top 4:3

1024 / 1440 — grid-cols-4 gap-6 (lg) / gap-8 (xl), photo on top 4:3
┌──────────────────────────────────────────────────────────────┐
│ From your phone to their door              See the full journey│
│ Four steps, and you see each one happen.                       │
│ ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐                │
│ │ photo  │  │ photo  │  │ photo  │  │ photo  │  4:3 rounded-lg │
│ └────────┘  └────────┘  └────────┘  └────────┘                │
│ ① You fill… ② We shop…  ③ You get…  ④ They get…               │
│ body        body        body        body                       │
└──────────────────────────────────────────────────────────────┘
```

Section `section bg-page`, container `max-w-page gutter`. Header via `SectionHeader`
(`title`, `lead`, `action` = link; `id="steps-title"`). List: `<ol>` `mt-8 lg:mt-12`.
Phone row: `grid grid-cols-[6rem_1fr] gap-4 items-start`. md+: `flex flex-col gap-4`.

Step marker: `span` `grid size-8 place-items-center rounded-full bg-crimson text-small
font-bold text-on-dark tabular-nums` before the `h3`, `inline-flex gap-3 items-center`.
Small and quiet on purpose — this *is* a sequence, so numbers are honest, but they are not
the page's loud element.

Photo `sizes`: `"(min-width: 1024px) 270px, (min-width: 768px) 45vw, 96px"`.

#### Colours / type

`h3` `text-h3 text-ink`; body `text-body text-ink-body` (phone `text-small`); link
`text-crimson font-semibold underline-offset-4 hover:underline`, `min-h-control inline-flex
items-center`.

#### Components

`HomeSteps` (`src/components/pages/home/steps.tsx`, server; props `payLine: string`).
Reuse `Section`, `SectionHeader`, `StockPhoto`.

#### States

Static content; no empty state. Not links (the whole card is not clickable), so no hover.

#### Motion

None.

#### Accessibility

`<ol>` (it's a sequence); the number span is `aria-hidden` (the list gives the order). Photo alt
from registry.

---

### 4.3 S3 Shop by department

#### Structure

| | |
|---|---|
| 1. Pattern | **Four-up tile row** (photo tile + caption), header above. |
| 2. Background | Solid `surface`, flat. |
| 3. Container / height | Contained `max-w-page`. Auto; ≈ 750px at 1440, ≈ 740px at 375. |
| 4. Columns | 375: 2×2 grid (square photos). 768 / 1024 / 1440: 4 columns (4:5 photos). Header first. |
| 5. Blocks | Header (h2 + 1-line lead + 1 text link) + 4 tiles, each = photo + name + item count. Tile count follows the data (4 today). |
| 6. Why | One tap into the right aisle; 2×2 on a phone keeps all four departments on one screen. Real item counts make it read as a stocked shop, not a brochure. |

#### Copy

| | |
|---|---|
| `h2` | **Shop by department** |
| Lead | Prices are in US dollars, with the Jamaican dollar amount alongside. |
| Action | All departments → `/shop` |
| Tile | `{category.name}` + `{count} items` (`1 item` singular) |

#### Data

`getCategories()` (sorted). Photo by `categoryPhotos[slug]`; no entry → tile shows a
`bg-crimson` block with the `CategoryIcon` (`src/components/site/category-icon.tsx`) in
`text-blush size-12`.

#### Layout

```
375  grid-cols-2 gap-4          768+  grid-cols-4 gap-6
┌────────────┐┌────────────┐    ┌──────┐┌──────┐┌──────┐┌──────┐
│ photo 1:1  ││ photo 1:1  │    │ 4:5  ││ 4:5  ││ 4:5  ││ 4:5  │
└────────────┘└────────────┘    └──────┘└──────┘└──────┘└──────┘
Groceries     Household          Groceries Household Pharmacy Baby & Child
24 items      18 items           24 items  …
┌────────────┐┌────────────┐
│            ││            │
```

Section `section bg-surface`; `max-w-page gutter`; grid `mt-8 lg:mt-12`.
Tile: `<a class="group flex flex-col gap-3 rounded-lg">`; photo `aspect-square md:aspect-4/5
rounded-lg` with `zoom`; name `text-h3 text-ink group-hover:underline decoration-2
underline-offset-4`; count `text-small text-ink-muted tabular-nums`.
Photo `sizes`: `"(min-width: 1024px) 270px, (min-width: 768px) 23vw, 45vw"`.

#### States

| State | Treatment |
|---|---|
| Hover | photo zooms to 104% over 700ms `ease-out-soft`; name underlines. No lift, no shadow. |
| Focus | signal ring around the whole tile (`rounded-lg`, offset 2) |
| Press | none beyond the browser's (it navigates) |
| Count 0 | hide the count line; tile still links |
| No categories | hide S3 entirely |

#### Components

`HomeDepartments` (`src/components/pages/home/departments.tsx`, server, props
`categories`).

#### Accessibility

`<ul>` of links; each link's name = category name + count (both visible text). Photo alt is
replaced with `""` (decorative: the visible name says it) — pass `alt=""` via `StockImage`.

---

### 4.4 S4 Ready-made baskets

#### Structure

| | |
|---|---|
| 1. Pattern | **Three-card row** (product cards with an action), header above. |
| 2. Background | None: `page`, flat. Cards are `surface` with a `line` border. |
| 3. Container / height | Contained `max-w-page`. Auto; ≈ 820px at 1440, ≈ 1,700px at 375 (three stacked cards). |
| 4. Columns | 375: 1 column, cards stacked. 768: 2 columns, third card spans both columns as a horizontal card (photo left, body right). 1024 / 1440: 3 columns. |
| 5. Blocks | Header (h2 + 2-line lead + 1 text link) + 3 cards, each = photo 16:9 + h3 + 1-line description + item count + price (USD + J$) + saving tag (when real) + Add to basket button. |
| 6. Why | The fastest route to checkout for the occasion sender: price, saving and Add are on the card, no page to open. Grocery-list sites show long product grids; three finished baskets are easier to choose from on a phone. |

#### Copy

| | |
|---|---|
| `h2` | **Ready-made baskets** |
| Lead | Put together for the usual needs: the weekly shop, a new baby, Christmas. Add one in a tap. |
| Action | All baskets → `/baskets` |
| Card | name (`h3`), description, `{itemCount} items`, price, saving tag, button |
| Saving tag | `Save USD$X` — only when `separateCents > basket.priceCents`, X = difference via `formatUsd` |
| Button | existing `AddToBasket kind="basket" variant="compact"` (its own label) |

The lead names the three featured occasions; if the featured set changes, the lead is built
from occasions present: everyday → "the weekly shop", baby → "a new baby", christmas →
"Christmas", pharmacy → "the medicine cabinet", school → "back to school".

#### Data

`getBaskets({ featured: true })` → `BasketSummary[]`; photo `basketPhotos[slug]`.

#### Layout

```
375 stacked, gap-6            768 grid-cols-2 gap-6 (3rd card spans 2? no: 3rd card on row 2, left)
┌──────────────────────────┐  1024+ grid-cols-3 gap-6 xl:gap-8
│ photo 16:9               │  ┌────────┐┌────────┐┌────────┐
├──────────────────────────┤  │ photo  ││ photo  ││ photo  │
│ Family Food Basket   h3  │  ├────────┤├────────┤├────────┤
│ A week of pantry…        │  │ name   ││ name   ││ name   │
│ 7 items                  │  │ desc   ││ desc   ││ desc   │
│ USD$69   [Save USD$8]    │  │ price  ││ price  ││ price  │
│ about J$10,830           │  │ [Add]  ││ [Add]  ││ [Add]  │
│ [ + Add to basket ]      │  └────────┘└────────┘└────────┘
└──────────────────────────┘
```

At 768 with 3 cards: `md:grid-cols-2`, and the 3rd card `md:col-span-2 md:grid
md:grid-cols-2` (photo left, body right) so no orphan half-row. At 1024 back to 3 equal.
With 2 cards: `lg:grid-cols-2`. With 4: `lg:grid-cols-4` is too narrow → `lg:grid-cols-2
xl:grid-cols-4`.

Card: `group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface
hover-lift`. The name is a link to `/baskets/{slug}` with `after:absolute after:inset-0`
(whole card clickable); `AddToBasket` sits `relative z-raised`. Body `p-card flex flex-col
gap-2 flex-1`; price row `mt-auto pt-4 flex items-end justify-between gap-3`.
Photo `aspect-16/9`, `zoom`, `sizes="(min-width: 1024px) 370px, (min-width: 768px) 45vw,
100vw"`.

Price: existing `<Price cents={basket.priceCents} jmdPerUsd={settings.jmdPerUsd} size="lg">`.
Saving tag: `rounded-sm bg-jm-gold px-2 py-0.5 text-xs font-bold text-ink` (gold's one job).

#### States

| State | Treatment |
|---|---|
| Hover card | rises 2px, `shadow-lift`, border `line-hover`, 250ms; photo zooms 104% |
| Focus | name link shows signal ring (the overlay `after:` follows the link; ring on the card via `has-[:focus-visible]:outline …` — use `focus-within` styling: `has-[a:focus-visible]:ring-3 ring-signal ring-offset-2`) |
| Add pressed / added | existing `AddToBasket` states (pending spinner, "Added" with check, disabled while pending) |
| No saving | no tag |
| No photo | `bg-crimson` 16:9 block with `ShoppingBasket` icon `text-blush size-12` |
| No featured baskets | hide S4 |
| Demo mode | `AddToBasket` behaves as it does elsewhere in demo |

#### Components

`HomeBaskets` (`src/components/pages/home/baskets.tsx`, server; props `baskets`,
`jmdPerUsd`). `HomeBasketCard` (same folder, server). Reuse `Price`, `AddToBasket` (client),
`StockPhoto`.

#### Accessibility

`<ul>`; card name is the link (`h3 > a`). Saving tag text is visible ("Save USD$8"), not
colour-only. Add button keeps its own accessible name from `AddToBasket` (`name` prop =
basket name).

---

### 4.5 S5 You see it bought. You see it delivered. (oxblood)

#### Structure

| | |
|---|---|
| 1. Pattern | **Full-width band, split two-column 6/5** (one empty column between): vertical timeline list left, SMS panel right; title block full width above. |
| 2. Background | Solid `oxblood`, flat. No photo (text-led by design). |
| 3. Container / height | Full-bleed band, content `max-w-page`. Auto; ≈ 780px at 1440, ≈ 1,100px at 375. |
| 4. Columns | 375 / 768: 1 column — title, lead, email timeline, then SMS panel, footnote, link. 1024 / 1440: title row, then 2 columns (timeline col 1–6, SMS panel col 8–12). |
| 5. Blocks | h2, lead, 1 timeline of 4 steps (icon disc + title + 1-line text, connected by a line), 1 SMS panel with 2 bubbles, 1 footnote, 1 text link. |
| 6. Why | Splits what *you* get (email, photos) from what *they* get (a text on any phone), which is exactly the sender's worry. A dark text-led band after three photo rows changes pace and marks the most important message. No competitor shows its notifications. |

#### Copy

| | |
|---|---|
| `h2` | **You see it bought. You see it delivered.** |
| Lead | Every order sends you two photos, and your family a text. Nobody in Jamaica needs an app, an account or a smartphone. |
| Left column title (`h3`) | What you get by email |
| Right column title (`h3`) | What your family gets by text |
| Footnote | Examples. Your messages show your own order, names and times. |
| Link | See the full journey → `/how-it-works#proof` |

Left list (a true sequence, `<ol>`), each: icon + `font-bold` title + `text-small` line:

| Icon (lucide) | Title | Line |
|---|---|---|
| `ReceiptText` | Order confirmed | Your receipt for what you paid, in US dollars. |
| `Camera` | Shopped | A photo of the till receipt from the store. |
| `Truck` | On the way | The driver has left the store. |
| `DoorOpen` | Delivered | A photo at the door, and who received it. |

Right: an SMS panel with two bubbles (sender label "ShipEast"):

1. "ShipEast: Your groceries from Marcia are on the way. The driver will deliver today."
2. "ShipEast: Delivered. Your groceries from Marcia were dropped off at 2:41 PM."

(Names and time are illustrative and the panel is labelled "Examples"; the wording must be
updated to match the real SMS templates once they exist — see §10.)

#### Layout

```
375
┌──────────────────────────────┐ oxblood
│ You see it bought. You see   │ h2 on-dark
│ it delivered.                │
│ Every order sends you two…   │ lead on-oxblood-muted
│                              │
│ What you get by email        │ h3
│ (🧾) Order confirmed          │ icon disc 40px crimson-deep, blush icon
│      Your receipt for what…  │
│ (📷) Shopped                  │   connector: 2px line-on-dark between discs
│ (🚚) On the way               │
│ (🚪) Delivered                │
│                              │
│ What your family gets by text│ h3
│ ┌──────────────────────────┐ │ panel: surface rounded-xl p-card
│ │ ShipEast                 │ │ text-small ink-muted
│ │ ┌──────────────────────┐ │ │ bubble surface-muted rounded-lg rounded-bl-sm
│ │ │ ShipEast: Your groc… │ │ │
│ │ └──────────────────────┘ │ │
│ │ ┌──────────────────────┐ │ │
│ │ │ ShipEast: Delivered… │ │ │
│ │ └──────────────────────┘ │ │
│ └──────────────────────────┘ │
│ Examples. Your messages…     │ text-small on-oxblood-muted
│ See the full journey         │
└──────────────────────────────┘

768   same stack, panel max-w-md
1024+ title block full width; below: grid-cols-12 gap-8
      col 1–6: email list     col 8–12: "What your family gets" + SMS panel
```

Section `section bg-oxblood text-on-dark on-dark-focus`, `max-w-wide gutter` with inner
`max-w-page mx-auto`. Lists start `mt-10 lg:mt-14`.
Icon disc: `grid size-10 place-items-center rounded-full bg-crimson-deep`, icon `size-icon
text-blush`. Connector: each `li` except last has `before:` 2px `bg-line-on-dark` from disc
bottom to next disc (`absolute left-5 top-10 bottom-0 w-0.5`). Row `relative grid
grid-cols-[2.5rem_1fr] gap-4 pb-6`.

#### States

Static. No hover (nothing is clickable except the link: `text-on-dark underline
decoration-blush hover:decoration-on-dark`).

#### Components

`HomeProof` (`src/components/pages/home/proof.tsx`, server). `SmsPreview`
(`src/components/order/sms-preview.tsx`, server, props `messages: string[]`, `label`) — reusable
on `/how-it-works`.

#### Accessibility

`<section aria-labelledby="proof-title" id="proof" class="scroll-mt-header">`. Email list is
`<ol>`; icons `aria-hidden`. SMS panel is a `<figure>` with `<figcaption>` "Examples of the
text messages your family gets"; bubbles are `<p>`s.

#### Photo

None. The hero carries the receipt; here the messages carry the proof. (Adding the door
photo again would repeat the bold element.)

---

### 4.6 S6 No barrel. No cash. You choose what arrives.

#### Structure

| | |
|---|---|
| 1. Pattern | **Split two-column, 5/6** (one empty column between): framed tall photo left (sticky while the list scrolls), title + ruled list right. |
| 2. Background | None: `page`, flat. Photo in a `rounded-xl` frame, no overlay. |
| 3. Container / height | Contained `max-w-page`. Auto; ≈ 800px at 1440, ≈ 1,300px at 375. |
| 4. Columns | 375: 1 column — title, lead, photo 4:5, list. 768: 1 column — title, lead, photo 16:9, list in 2 columns. 1024 / 1440: photo col 1–5, text col 7–12. |
| 5. Blocks | 1 photo, h2, lead, 4 promises (icon + h3 + 1–2-line body, separated by top rules), 1 text link. |
| 6. Why | Compares us with what senders actually do today (barrels, cash, vouchers) without naming anyone. A ruled list reads faster than four cards, and the family photo keeps it human. |

#### Copy

| | |
|---|---|
| `h2` | **No barrel. No cash. You choose what arrives.** |
| Lead | A barrel means packing, shipping and customs. Cash can be spent on anything. With ShipEast you pick each item and see it reach the door. |

Four promises (ruled list, not cards). Icon inline before the `h3`:

| Icon | `h3` | Body |
|---|---|---|
| `ReceiptText` | Proof on every order | A photo of the till receipt and a photo at the door, emailed to you and kept with your order. |
| `Replace` | You decide on swaps | If an item is out of stock we use the rule you chose: a similar item, ask you first, or leave it out and refund it. |
| `MessageSquareText` | Nothing for them to install | Your family gets a text on any phone. No app, no account, no password. |
| `DollarSign` | Pay in US dollars | PayPal, or a debit or credit card through PayPal{, or bank transfer}. You see the Jamaican dollar amount too. |

Small link under the list: About ShipEast Couriers & Bearer Service Ltd → `/about`.

#### Layout

```
375
┌──────────────────────────────┐ page
│ No barrel. No cash. You      │
│ choose what arrives.         │
│ A barrel means packing…      │
│ ┌──────────────────────────┐ │ photo 4:5 rounded-xl (P7)
│ │                          │ │
│ └──────────────────────────┘ │
│ ─────────────────────────────│ border-t line
│ 🧾 Proof on every order       │
│    A photo of the till…      │
│ ─────────────────────────────│
│ ⇄ You decide on swaps        │
│ …                            │
└──────────────────────────────┘

768  photo 16:9 above the list; list grid-cols-2 gap-x-8 (rules on each item top)

1024 / 1440   grid-cols-12 gap-8 lg / gap-12 xl, items-start
┌────────────────────────┬──────────────────────────────────────┐
│ col 1–5                │ col 7–12                             │
│ ┌────────────────────┐ │ No barrel. No cash. You choose what  │
│ │                    │ │ arrives.                             │
│ │  photo 4:5         │ │ A barrel means packing…              │
│ │  rounded-xl        │ │ ──────────────────────────────────── │
│ │  sticky top-24     │ │ 🧾 Proof on every order              │
│ │                    │ │ ──────────────────────────────────── │
│ └────────────────────┘ │ ⇄ You decide on swaps                │
│                        │ … (4 rows)                           │
└────────────────────────┴──────────────────────────────────────┘
```

On lg+ the photo column is `lg:sticky lg:top-[calc(var(--header-height)+2rem)]` so it stays
beside the list (pure CSS; no motion token involved). Title block sits in the right column on
lg+, above the photo on phones.

Rows: `border-t border-line py-6`; `h3` `text-h3 text-ink flex items-center gap-3`, icon
`size-icon text-crimson`; body `mt-2 text-body text-ink-body max-w-prose`.
Photo `sizes`: `"(min-width: 1024px) 460px, 100vw"`.

#### States / motion

Static. No hover. No motion.

#### Components

`HomeWhy` (`src/components/pages/home/why.tsx`, server; prop `bankTransfer: boolean`).

#### Accessibility

`<ul>` of promises; icons `aria-hidden`.

#### Photo

P7 `whyFamily`: crop 4:5 desktop/phone, 16:9 tablet; `object-position: 45% 40%` (both faces).

---

### 4.7 S7 Delivering in St. Thomas and Kingston (coverage)

#### Structure

| | |
|---|---|
| 1. Pattern | **Full-bleed background photo with a flat overlay**; title block on the overlay, a row of white zone cards on top, links under them. The only overlay on the site. |
| 2. Background | Photo P8 `jmKingstonHills` (Kingston and its hills) as a `fill` image, `object-cover`, `object-position: center 60%`; on top a flat `bg-photo-scrim` layer (oxblood at **70%**). No gradient, no blur. Text on the overlay: `on-dark` only, **6.2:1 worst case** (see 1B.3). |
| 3. Container / height | Full-bleed band; content `max-w-page`. `section` padding; `lg:min-h-[640px]` with content vertically centred; auto below lg. ≈ 720px at 1440, ≈ 1,000px at 375. |
| 4. Columns | 375: 1 column — h2, lead, cards stacked, cut-off note, links. 768: title block, then 2 cards side by side. 1024 / 1440: title block left-aligned (`max-w-2xl`), then 2 cards in a 2-column grid capped at `max-w-4xl` (3+ zones: 3 columns, full `max-w-page`). |
| 5. Blocks | h2, 1-line lead, 1 card per active zone (2 today), each = speed pill + h3 + 3 data rows (fee, cut-off, minimum); 1 cut-off note; 2 text links. |
| 6. Why | Senders buy for a *place*. Kingston's hills behind real fees and cut-offs answer "do you deliver to Mum, and when?" with a sense of home, and the full-bleed photo breaks the run of contained sections. Couriers bury fees in a PDF or a call; ours are live from admin. |

#### Copy

| | |
|---|---|
| `h2` | **Delivering in {parishList}** |
| Lead | Same-day delivery when you order before the cut-off. More parishes are coming. |
| Zone card `h3` | `{zone.parish}` |
| Zone rows (`<dl>`) | Delivery fee: `formatUsd(feeCents)`; Same-day cut-off: `formatClockTime(cutoffTime)` Jamaica time; Minimum order: `formatUsd(minOrderCents)` |
| Speed pill (top of card body) | `same_day` → "Same day"; `next_day` → "Next day"; `scheduled` → "Scheduled" |
| Under the cards (on the overlay) | `CutoffNote tone="onDark" cutoff={earliestCutoff}` |
| Links (on the overlay) | Delivery areas and fees → `/delivery`; Family somewhere else in Jamaica? Tell us where → `/contact` |

#### Data

`getActiveZones()`. The background photo is fixed (P8); zone cards carry no photos.

#### Layout

```
375                                   1024 / 1440   full-bleed photo, oxblood 70% overlay
┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐      ┌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┐
│▒ Delivering in St. Thomas   ▒│      │▒   Delivering in St. Thomas and Kingston   (h2)    ▒│
│▒ and Kingston         (h2)  ▒│      │▒   Same-day delivery when you order before…        ▒│
│▒ Same-day delivery when…    ▒│      │▒                                                   ▒│
│▒ ┌────────────────────────┐ ▒│      │▒   ┌──────────────────────┐ ┌──────────────────────┐▒│
│▒ │ (Same day)             │ ▒│      │▒   │ (Same day)           │ │ (Same day)           │▒│
│▒ │ St. Thomas        h3   │ ▒│      │▒   │ St. Thomas      h3   │ │ Kingston        h3   │▒│
│▒ │ Delivery fee   USD$8   │ ▒│      │▒   │ Delivery fee  USD$8  │ │ Delivery fee USD$10  │▒│
│▒ │ Same-day cut-off 1:00PM│ ▒│      │▒   │ Cut-off     1:00 PM  │ │ Cut-off     1:00 PM  │▒│
│▒ │ Minimum order  USD$25  │ ▒│      │▒   │ Minimum      USD$25  │ │ Minimum      USD$25  │▒│
│▒ └────────────────────────┘ ▒│      │▒   └──────────────────────┘ └──────────────────────┘▒│
│▒ ┌────────────────────────┐ ▒│      │▒   ⏱ Order by 1:00 PM Jamaica time for delivery today▒│
│▒ │ Kingston …             │ ▒│      │▒   Delivery areas and fees    Family somewhere else… ▒│
│▒ └────────────────────────┘ ▒│      └▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘
│▒ ⏱ Order by 1:00 PM…        ▒│
│▒ Delivery areas and fees    ▒│
└▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┘
```

| Layer | Classes |
|---|---|
| `<section>` | `relative isolate overflow-hidden section lg:min-h-[640px] lg:flex lg:items-center text-on-dark on-dark-focus` |
| Photo | `StockPhoto name="jmKingstonHills" className="absolute inset-0 -z-10 rounded-none" sizes="100vw"` (lazy; not preloaded). Pass `alt=""`: decorative, the title names the place. |
| Overlay | `div aria-hidden className="absolute inset-0 -z-10 bg-photo-scrim"` placed after the photo |
| Content | `relative mx-auto w-full max-w-page gutter` |
| Title block | `max-w-2xl`; `h2` `text-h2 text-balance text-on-dark`; lead `mt-4 text-lead text-on-dark` (not muted: muted fails on the overlay) |
| Cards grid | `mt-8 lg:mt-12 grid gap-4 md:grid-cols-2 md:gap-6 lg:max-w-4xl` (3+ zones: `lg:grid-cols-3 lg:max-w-none`; 1 zone: `max-w-md`) |
| Card | `rounded-xl bg-surface p-card text-ink shadow-float` (it floats over a photo, so it gets the float shadow) |
| `<dl>` rows | `flex justify-between gap-4 py-2 border-b border-line last:border-0`; `dt` `text-small text-ink-muted`; `dd` `text-body font-semibold text-ink tabular-nums` |
| Pill | `inline-flex items-center gap-1 rounded-full bg-ok-tint text-ok text-xs font-bold px-2 py-0.5` + `Zap` `size-icon-sm` (same day); `bg-surface-muted text-ink-muted` otherwise |
| Under cards | `mt-8 flex flex-col gap-2 md:flex-row md:items-center md:gap-8`; cut-off note `text-small text-on-dark`, icon `text-on-dark` (not blush: blush is 4.1:1 on the overlay); links `min-h-control inline-flex items-center font-semibold text-on-dark underline underline-offset-4 decoration-on-dark hover:decoration-2` |

#### States

| State | Treatment |
|---|---|
| No active zones | the cards are replaced by one white card: `MapPin` (crimson), "We're not taking orders right now", "Leave your email on the contact page and we'll tell you when we deliver to your family's parish." + link "Contact us". Title becomes "Delivering in Jamaica". |
| Photo fails to load | the overlay sits on the `page` fallback of `StockImage` → band reads as a lighter oxblood; text still ≥ 6.2:1 (worst case is white) |
| Hover | none on cards (not links); links thicken their underline |
| Focus | blush ring on the overlay links (non-text, ≥ 3:1 on the darkest blend); signal ring inside cards (none focusable today) |

#### Motion

None. No parallax on the background photo.

#### Components

`HomeCoverage` (`src/components/pages/home/coverage.tsx`, server; props `zones`,
`earliestCutoff`). Reuse `CutoffNote`, `StockPhoto`.

#### Accessibility

`<section aria-labelledby="coverage-title" id="coverage" class="scroll-mt-header">`. Each zone
is an `<article aria-labelledby>`; the `<dl>` reads "Delivery fee, USD$8". Status pill text is
visible (not colour only). Background photo and overlay are decorative (`alt=""`,
`aria-hidden`).

#### Photo

P8 `jmKingstonHills` as the background; full-bleed, `object-position: center 60%` (keeps the
hills and the city in the band at 375, where the band is tall and narrow). Backups: `companyCountryRoad`, `kingston` (see §7).

---

### 4.8 S8 Questions senders ask first

#### Structure

| | |
|---|---|
| 1. Pattern | **Split two-column, 4/8**: intro and contact links left (sticky), accordion right. |
| 2. Background | Solid `surface`, flat. |
| 3. Container / height | Contained `max-w-page`. Auto; ≈ 560px at 1440 (items closed), ≈ 800px at 375. |
| 4. Columns | 375 / 768: 1 column — h2, lead, links, then accordion. 1024 / 1440: intro col 1–4, accordion col 5–12. |
| 5. Blocks | h2, 1-line lead, 2–3 links (all FAQs, email, WhatsApp if set), 5 accordion items. |
| 6. Why | Doubts answered in place, with a human contact right beside them; one tap to open, nothing to load. |

#### Copy

| | |
|---|---|
| `h2` | **Questions senders ask first** |
| Lead | Can't find yours? Read every answer, or write to us. |
| Links (left column, stacked) | All questions and answers → `/faq` · Email `info@shipeastja.com` (mailto, from `settings.email`) · WhatsApp us (only if `settings.whatsapp`) |
| Items | `faqItems` (5): question = summary, answer = body |

#### Layout

```
375 / 768                         1024 / 1440   grid-cols-12 gap-8
┌──────────────────────────┐      ┌──────────────┬─────────────────────────────┐
│ Questions senders ask    │      │ col 1–4      │ col 5–12                    │
│ first                    │      │ Questions    │ ┌─────────────────────────┐ │
│ Can't find yours?…       │      │ senders ask  │ │ Does anything get       │ │
│ All questions and answers│      │ first        │ │ shipped from overseas? +│ │
│ info@shipeastja.com      │      │ Can't find…  │ ├─────────────────────────┤ │
│ ┌──────────────────────┐ │      │ All questions│ │ How will I know it…   + │ │
│ │ Does anything get… + │ │      │ info@…       │ │ …                       │ │
│ ├──────────────────────┤ │      │ (sticky)     │ └─────────────────────────┘ │
│ │ …                    │ │      └──────────────┴─────────────────────────────┘
└──────────────────────────┘
```

Section `section bg-surface`, `max-w-page gutter`. Left column `lg:sticky
lg:top-[calc(var(--header-height)+2rem)]`. Links `flex flex-col gap-1 mt-6`, each
`min-h-control inline-flex items-center gap-2 text-crimson font-semibold hover:underline`
(`Mail`, `MessageCircle` icons `size-icon`). Accordion `mt-8 lg:mt-0`.

#### States

| State | Treatment |
|---|---|
| Summary hover | `bg-surface-muted` (add to existing `Accordion` summary: `transition-colors duration-150 hover:bg-surface-muted`) |
| Open | `Plus` rotated 45°; answer `text-body text-ink-body` (change existing `text-ink-muted` → `text-ink-body` for reading contrast) |
| Focus | signal ring on summary |
| < 3 FAQs | hide S8 |
| No WhatsApp | hide that link |

#### Components

`HomeQuestions` (`src/components/pages/home/questions.tsx`, server). Reuse `Accordion`
(native `<details>`, no JS). Each `<details>` gets `id="faq-{id}"` + `scroll-mt-header`.

#### Accessibility

`<details>/<summary>` gives expand/collapse semantics natively. Questions are in reading
order; no heading inside summary (summary text is the question).

---

### 4.9 S9 Start a basket for home (closing panel)

#### Structure

| | |
|---|---|
| 1. Pattern | **Single contained panel**: text left, buttons right inside (stacked on phones). |
| 2. Background | `page` band; panel solid `crimson`, `rounded-2xl`, flat. |
| 3. Container / height | Contained `max-w-page`. Auto; ≈ 410px at 1440 including band padding, ≈ 480px at 375. |
| 4. Columns | 375 / 768: 1 column — h2, line, primary button (full width on 375), link. 1024 / 1440: 2 columns inside the panel (text left, buttons right, vertically centred). |
| 5. Blocks | h2, 1 line (parishes + cut-off), 2 CTAs (primary + text link). |
| 6. Why | A calm last ask after the doubts are cleared; contained so it never touches the red footer and still reads as a final, separate moment. |

#### Copy

| | |
|---|---|
| `h2` | **Start a basket for home** |
| Line | Same-day delivery in {parishList} when you order by {cutoff} Jamaica time. |
| Primary | **Start shopping** → `/shop` |
| Secondary | Track an order → `/track` |

#### Layout

```
375                                   1024 / 1440
┌──────────────────────────────┐      ┌────────────────────────────────────────────────┐
│ page band                    │      │ ┌────────────────────────────────────────────┐ │
│ ┌──────────────────────────┐ │      │ │ Start a basket for home     [Start shopping]│ │
│ │ crimson rounded-2xl      │ │      │ │ Same-day delivery in …      Track an order  │ │
│ │ Start a basket for home  │ │      │ └────────────────────────────────────────────┘ │
│ │ Same-day delivery in…    │ │      └────────────────────────────────────────────────┘
│ │ [ Start shopping       ] │ │
│ │   Track an order         │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

Section `section bg-page`, `max-w-page gutter`. Panel `rounded-2xl bg-crimson p-card-lg
md:p-12 lg:px-16 lg:py-14 text-on-dark on-dark-focus`; inside `flex flex-col gap-6
lg:flex-row lg:items-center lg:justify-between`. Text left-aligned. Buttons column `flex
flex-col gap-2 sm:flex-row sm:items-center sm:gap-6`. Primary `ButtonLink variant="onDark"
size="lg"` (block on phones). Secondary link styled like the hero's.

#### States

Buttons: existing onDark hover/press; blush focus. No zones → line reads "Delivery in
Jamaica, with a photo of the receipt and a photo at the door."

#### Components

Reuse `CtaBand` only if its markup matches this panel; otherwise new `HomeClosing`
(`src/components/pages/home/closing.tsx`, server). Do **not** make it a full-bleed band: it
would touch the oxblood footer.

#### Accessibility

`<section aria-labelledby="closing-title">`.

---

### 4.F Footer (shared, all `(site)` pages)

#### Structure

| | |
|---|---|
| 1. Pattern | **Four-column footer**: brand + contact column, then three link columns; payments line and legal line below a rule. |
| 2. Background | Solid `oxblood`, flat. |
| 3. Container / height | Full-bleed, content `max-w-wide`. Auto; ≈ 520px at 1440, ≈ 1,000px at 375. |
| 4. Columns | 375: brand + contact first, then links in a 2-column grid (Shop, Help; Company spans both), then payments, then legal. 768: brand full width, then 3 link columns. 1024 / 1440: 12-col grid — brand col 1–4, Shop col 6–7, Help col 8–9, Company col 10–12; bottom row payments left, legal right. |
| 5. Blocks | 1 wordmark + 1 sentence, 1–3 contact rows (email, phone, WhatsApp when set), 3 link columns (8, 6 and 8 links), 1 payments line, 1 legal line with flag. |
| 6. Why | The company name, a Jamaican address line and real contact up front read as an established local business; every page is two taps from anywhere. |

Replaces `src/components/site/site-footer.tsx`. Props change from `{ whatsapp }` to
`{ settings: SiteSettings, categories: {slug,name}[] }` (layout passes them; both are cached).

#### Copy and data

| Block | Content |
|---|---|
| Brand | `<Wordmark onDark />` (scale: wrap in `text-[1.25em]`? No — keep the logo as is.) Then: "Groceries and everyday essentials, bought in Jamaica and delivered to your family's door in {parishList}." |
| Contact | `Mail` + `settings.email` (mailto) · `Phone` + `formatJamaicanPhone(settings.phone)` (tel:, only if set) · `ButtonLink` "WhatsApp us" (`MessageCircle`, only if `settings.whatsapp`; `variant="onDark" size="sm"`) |
| Column "Shop" | All departments `/shop`; one link per category `/shop/{slug}`; Ready-made baskets `/baskets`; Gifts and occasions `/gifts`; Monthly orders `/monthly` |
| Column "Help" | How it works `/how-it-works`; Delivery areas and fees `/delivery`; Track an order `/track`; Questions and answers `/faq`; Contact us `/contact`; Your account `/account` |
| Column "Company" | About ShipEast `/about`; Terms of service `/legal/terms`; Privacy `/legal/privacy`; Refunds and cancellations `/legal/refunds`; Substitutions `/legal/substitutions`; Delivery policy `/legal/delivery`; Cookies `/legal/cookies`; Photo credits `/photo-credits` |
| Payments line | "Prices in US dollars. Pay with PayPal or a debit or credit card through PayPal{, or by bank transfer}." (bank clause only if `settings.bankTransfer.bankName`) — text only, no payment logos |
| Legal line | `JamaicaFlag` (`w-6`, decorative) + "© {year} ShipEast Couriers & Bearer Service Ltd. St. Thomas, Jamaica." + TRN ("TRN 000-000-000") **only** once a `trn` setting exists — hidden today |

`{year}`: `CopyrightYear` server component with `'use cache'` + `cacheLife('days')` returning
the Jamaica-time year (Cache Components forbids an uncached `new Date()` here).

#### Layout

```
375
┌──────────────────────────────┐ oxblood, pt-16 pb-8
│ ShipEast                     │
│ Shop & Send                  │
│ Groceries and everyday…      │ text-small on-oxblood-muted, max-w-sm
│ ✉ info@shipeastja.com        │ min-h-control rows
│ [ WhatsApp us ]  (if set)    │
│ ──────────────────────────── │ line-on-dark
│ Shop            Help         │ grid-cols-2 gap-x-6 gap-y-10
│ All departments How it works │
│ Groceries       Delivery…    │
│ …               …            │
│ Company (spans 2)            │
│ About ShipEast  Terms …      │ grid-cols-2 inside
│ ──────────────────────────── │
│ Prices in US dollars. Pay…   │ text-small on-oxblood-muted
│ ▣ © 2026 ShipEast Couriers & │ text-small
│   Bearer Service Ltd. St.…   │
└──────────────────────────────┘

768   brand block full width; columns grid-cols-3
1024 / 1440   max-w-wide, grid-cols-12 gap-8
┌────────────────────────────────────────────────────────────────────────────┐
│ col 1–4 brand + contact │ col 6–7 Shop │ col 8–9 Help │ col 10–12 Company   │
├────────────────────────────────────────────────────────────────────────────┤ line-on-dark
│ Prices in US dollars. Pay with…              ▣ © 2026 ShipEast Couriers & … │
└────────────────────────────────────────────────────────────────────────────┘
```

| Element | Classes |
|---|---|
| `<footer>` | `bg-oxblood text-on-dark on-dark-focus print:hidden` |
| Container | `mx-auto max-w-wide gutter pt-16 pb-8 lg:pt-20` |
| Column title | `h2` `text-small font-bold text-on-dark` (sentence case, no eyebrow styling) |
| Links | `text-small text-on-oxblood-muted hover:text-on-dark hover:underline underline-offset-4 transition-colors duration-150`; each `li > a` `inline-flex min-h-control items-center lg:min-h-9` (36px on fine pointers still ≥ 24px WCAG 2.5.8; 44px on touch) |
| Dividers | `border-t border-line-on-dark` with `mt-12 pt-8` |
| Bottom row | `flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-small text-on-oxblood-muted` |

#### States

| State | Treatment |
|---|---|
| Link hover | colour to `on-dark` + underline, 150ms |
| Focus | blush ring |
| No phone / WhatsApp | hide those rows |
| No categories | Shop column shows only the fixed links |
| Monthly flag off | keep the `/monthly` link (that page explains one-tap reorder when the add-on is off) |

#### Accessibility

`<footer>` landmark; each column is `<nav aria-label="Shop" | "Help" | "Company">` with an
`h2` (footer headings are `h2` so the outline stays valid after the page's last `h2`).
Email/phone/WhatsApp links have visible text.

---

## 5. Header scroll, mobile menu, inner pages

### 5.1 Sticky and scroll

| | |
|---|---|
| What sticks | only the bar (`sticky top-0 z-header`). The phone search row, the demo bar and the cookie banner do not. |
| At rest (top) | `bg-crimson`, `border-transparent`, no shadow — merges into the crimson hero on `/` |
| Scrolled > 8px | `border-crimson-deep shadow-lift`, transition 450ms `ease-out-soft` (`HeaderShell`) |
| Hide on scroll down? | **No.** The basket must stay one tap away; the bar is only 64/72px. |
| Anchor offset | `scroll-mt-header` on every `id` target |
| Print | `print:hidden` (existing) |

### 5.2 Mobile menu (< lg)

| Aspect | Spec |
|---|---|
| Element | `<dialog class="m-0 ml-auto h-dvh max-h-dvh w-[min(22.5rem,calc(100vw-3rem))] bg-surface text-ink shadow-overlay backdrop:bg-scrim">` opened with `showModal()` (gives focus trap, `Esc`, inert page) |
| Open motion | `translateX(100%) → 0`, 450ms `ease-out-soft` via `[&[open]]:animate-…` or `@starting-style`; close 250ms; reduced motion: instant |
| Scroll lock | `document.documentElement.style.overflow = 'hidden'` while open; restore on close |
| Header row | `<Wordmark />` (light) + close `IconButton` label "Close menu" (`X`); `h-16 px-4 border-b border-line` |
| Body (`overflow-y-auto p-4`) | 1. `SearchBox id="menu-q"` · 2. `h2` "Shop by department" (`text-small font-bold text-ink-muted`) + list: `CategoryIcon` + name + count (`text-small text-ink-muted tabular-nums`, right) · 3. `h2` "More" + Ready-made baskets, Gifts and occasions, Monthly orders, How it works, Delivery areas and fees, Track an order, Questions and answers · 4. bottom block `border-t border-line pt-4`: Your account; email; WhatsApp (if set) |
| Rows | `flex min-h-12 items-center gap-3 rounded-md px-3 font-semibold text-ink hover:bg-surface-muted`; current page `bg-surface-selected text-crimson-deep` + `aria-current="page"` |
| Focus | first focus = close button; on close focus returns to the menu button; menu closes on route change (`usePathname` effect) and on backdrop click |
| Trigger | `aria-haspopup="dialog"`, `aria-expanded` mirrors state, `aria-controls="site-menu"` |
| No JS | the trigger does nothing; every destination is still in the footer and the phone search row is visible. Acceptable. |

### 5.3 Inner pages

| Page type | Header | Footer |
|---|---|---|
| Marketing / shop / legal | Same bar. Under it the page's own `PageIntro` on `page` (not crimson), so the bar's scrolled border and shadow separate it. | Same |
| `/search` | Phone search row hidden (`HeaderSearchRow`); page has its own box | Same |
| `/basket`, `/checkout/*` | Phone search row hidden. Nav stays (lets people continue shopping). | Same |
| `/track`, `/order/*` | Same | Same |
| `/driver`, `/admin` | Not affected (own layouts) | Not affected |

Current-page state: `NavLink` sets `aria-current="page"` for `/shop*`, `/baskets*`,
`/how-it-works`, `/track*` (prefix match except `/`).

---

## 6. Performance and rendering

| Topic | Decision |
|---|---|
| LCP element | Desktop: the hero photo (`familyPhone`). Phone: the `h1` text (photo sits below the fold at 375×667). |
| Hero photo loading | `StockPhoto preload` → `next/image` `preload` (only image on the site with it). `sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 100vw"`. Not animated (no opacity start). |
| Other images | default lazy (including the S7 full-bleed background, `sizes="100vw"`); every one has a real `sizes` (listed per section) and a fixed aspect box (no CLS). Unsplash loader serves AVIF/WebP at the requested width. |
| Font | Figtree via `next/font` (existing, `display: swap`). |
| Hero text | Static, server-rendered, not animated, so LCP is not held by `animate-rise`. |
| Cache Components | All page data comes from `'use cache'` loaders → the page body is prerendered. Runtime reads are isolated: `BasketLink` (cookie) in `<Suspense>` with `BasketLinkFallback`; the countdown is client-only after mount; `CopyrightYear` is `'use cache'` + `cacheLife('days')`. No `searchParams`, `cookies()` or `headers()` in `page.tsx`. |
| Revalidation | Existing cache tags (`settings`, `zones`, `catalogue`, `faqs`) refresh the page when admin edits fees, cut-offs, baskets or FAQs. |
| Client components (and why) | `HeaderShell` (scroll listener) · `NavLink` (`usePathname` for `aria-current`) · `HeaderSearchRow` (`usePathname` to hide on 3 routes) · `MobileMenu` (dialog open/close, focus return) · `CutoffCountdown` (visitor's clock, ticks each minute) · `AddToBasket` (existing; form action state) · `CookieBanner` (existing). Everything else is a server component. |
| JS removed | No `motion` components used on `/` (no `Reveal`/`Stagger`/`Parallax`), so `MotionProvider`'s lazy features are never requested by this page. |
| Budget | Lighthouse mobile: LCP < 2.5s, CLS < 0.05, TBT < 200ms on the Vercel preview. |

---

## 7. Photo register

All free Unsplash License (none are Unsplash+; `premium: false` in the API). URLs checked
with `curl ?w=200` → `200` on November 6, 2026. Hotlink `images.unsplash.com`; the existing
loader adds `?w=&auto=format`. **New entries must be registered as a download through the
Unsplash API (`/photos/:id/download`) before going live, as `docs/PHOTOGRAPHY.md` asks.**

| # | Slot | Registry key | Unsplash id | URL (no query) | W × H | Photographer (username) | Alt text | Crop / position |
|---|---|---|---|---|---|---|---|---|
| P1 | S1 hero | `familyPhone` (existing, `core.ts`) | `FVd0tfV6NDk` | `https://images.unsplash.com/photo-1702648156997-eaa417d98b9e` | 5591 × 3721 | Centre for Ageing Better (`ageing_better`) | An older woman smiling on the phone at home | 4:3 / 16:9 / 1:1; **add** `position: '40% 35%'` |
| P2 | S2 step 1 | `homeSenderPhone` (existing, `home.ts`) | `o-iM0avkgNo` | `https://images.unsplash.com/photo-1610473068893-7a63129207d2` | 3936 × 2624 | Brandy Kennedy (`thebrandyk`) | A woman holding her phone beside an open laptop | 1:1 thumb / 4:3; `center` |
| P3 | S2 step 2 | `stepShop` (existing, `core.ts`) | `mybgdVT2vkw` | `https://images.unsplash.com/photo-1739300293398-468ba82fd418` | 3080 × 2053 | Ninthgrid (`ninthgrid_`) | A shopper pushing a trolley down a supermarket aisle | 1:1 / 4:3; `55% center` (shopper) |
| P4 | S2 step 3 | `shopCheckout` (existing, `shop.ts`) | `m1c3tRvDjbo` | `https://images.unsplash.com/photo-1774978613949-c29cbfe9f862` | 4000 × 6000 | Adhitya Sibikumar (`adhitya_2505`) | A cashier weighing groceries at a supermarket checkout | 1:1 / 4:3 from portrait; `center 60%` |
| P5 | S2 step 4 | **`homeStepToDoor` (new, add to `home.ts`)** | `czTuLlcSAus` | `https://images.unsplash.com/photo-1643960988237-a9c07e084aed` | 6240 × 4160 | Mathias Reding (`matreding`) | A man carrying a paper bag of shopping up the steps to a front door | 1:1 / 4:3; `60% center` (bag and hand) |
| P6 | S3 tiles | `categoryPhotos` map: `pantry`, `catHousehold`, `catPharmacy`, `catBaby` (existing) | `yLor6GEU2yw`, `DJcVOQUZxF0`, `HTttz00wkzU`, `QCVrp1uxCXs` | see `core.ts` | — | see registry | `alt=""` (decorative; tile text names it) | 1:1 / 4:5; existing positions |
| P6b | S4 cards | `basketPhotos` map: `basketFood`, `basketBaby`, `basketChristmas` (+ `basketPharmacy`) (existing) | `-9TeWHMASzs`, `Jqhwp4mcuUM`, `SrnCpsp9sGY`, `FDvArkoGyvI` | see `core.ts` | — | see registry | registry alt | 16:9; `basketBaby` keeps `center 40%`; `basketChristmas` add `center 55%` |
| P7 | S6 | `whyFamily` (existing, `core.ts`) | `khLLtGplL8I` | `https://images.unsplash.com/photo-1640117743090-93ce4f4450dd` | 6000 × 4000 | Imani Manyara (`imanimanyara`) | A grandmother congratulating her granddaughter | 4:5 / 16:9; `45% 40%` |
| P8 | S7 background (full-bleed, under `photo-scrim`) | `jmKingstonHills` (existing, `jamaica.ts`) | `0uBGE5y9RZ8` | `https://images.unsplash.com/photo-1584238556966-2c407cc4fd56` | 6000 × 4000 | andrzj brown (`andrzjbrown`) | `alt=""` on this page (decorative background; the h2 names the place). Registry alt stays: Kingston from above, with the hills behind the city | full-bleed `object-cover`; `center 60%`; `sizes="100vw"`, lazy |
| P9 | (spare) St. Thomas | `companyCountryRoad` (existing, `company.ts`) — **not used now** that S7 is one photo band; first backup for P8 and for a future St. Thomas zone image on `/delivery` | `cqE9f81PSY8` | `https://images.unsplash.com/photo-1780332534975-6318b3d734d7` | 5194 × 3456 | Kern Morris (`kernsway`) | A two-lane country road in Jamaica, lined with palms and trees | 16:9; `center` |

**Backups (1–2 per slot)**

| Slot | Backup 1 | Backup 2 |
|---|---|---|
| P1 hero | `whyFamily` `khLLtGplL8I` | `contactPhone` `aWY55S07SZg` (Vitaly Gariev, `silverkblack`; "A woman smiling on a phone call at home") |
| P2 | `stepOrder` `Gzk7Pf9uSJg` | `homeSenderPhone` stays if `stepOrder` used elsewhere |
| P3 | `guideProduce` `pbtBb5Y1C_Y` | `shopProduce` `pGOkewTZy78` |
| P4 | `shopReceipt` `recgFWxDO1Y` (weak: a work slip, not a till receipt) | — |
| P5 | **new** `Rmb8xyYHr68` — `https://images.unsplash.com/photo-1734416561439-ca0f663344f9`, 2252 × 4000, Nico Smit (`nicosmit99`), "A man walking along a pavement carrying two bags of shopping", 1:1/4:3 `center 45%` | `stepDoor` `Kd27X69pYyo` |
| P7 | `companyFamilyMeal` `gorbBYbo6KM` | `jmAckee` `W4vDQETfroY` (only if the copy turns to food) |
| P8 | `companyCountryRoad` `cqE9f81PSY8` (country road, then the title stays "Delivering in …") | `kingston` `xoGK4R6bp4I` (portrait; crop `center 70%`) |
| P9 | `companyCoast` `lzecv_xfTgo` | **new** `VJ6dY5R6b5E` — `https://images.unsplash.com/photo-1691955448236-e62d76e2753f`, 3024 × 4032, Shanika Willis (`shanika4241`), "A papaya tree against a blue sky in Jamaica", 16:9 `center 30%` |

Considered and rejected: `xBUDLmcyrVQ` (courier company logo on jacket), `eOUYC6UNl2k`
(Colombian doorway, reads Moroccan), `stepDoor`/`homeDoorWelcome` as first choice (not
Caribbean), any receipt close-up (none found that is a real till receipt without a store name;
the drawn receipt is more honest).

New registry entries to add (`src/lib/photos/home.ts`): `homeStepToDoor` (P5) — `usedOn:
'Home: how it works, step 4'`. Backups are not added unless used.

---

## 8. Self-review

### 8.1 First pass vs revised

| First pass (what I drew first) | Why it read as generic / wrong | Revised |
|---|---|---|
| Oxblood announcement strip above a crimson header ("Same-day in St. Thomas and Kingston") | Template chrome; three red bars stacked at the top; repeats the hero line | **Removed.** Coverage lives in the hero lead and the cut-off line. One accessory fewer. |
| Hero: proof pair (receipt card + door-photo card) fanned on crimson | The fanned two-card collage is the existing, card-kit look; two objects split attention | **One object:** the printed receipt over a single warm human photo. The door photo is explained in S5 in words. |
| Big `text-numeral` signal "01 02 03 04" over the steps | 01/02/03 chrome; two loud elements on one page | Small 32px crimson step dots. Numbers kept only because the steps really are a sequence. |
| Eyebrow above every `h2` ("How it works", "Shop", "Why us"…) | Labels that repeat the title | **No eyebrows on the page.** |
| `<Reveal>` fade-up on every section, `Parallax` on the coverage photo | The commonest AI tell; also costs JS | **No scroll motion at all.** One CSS moment: the receipt prints. |
| "Why ShipEast" as four identical cards with icon discs | SaaS card kit | Ruled list (top borders), inline icons, one tall human photo. |
| Full-bleed crimson CTA band directly above the oxblood footer | Two red bands touching (breaks DESIGN-SYSTEM) | Contained crimson panel inside a page band. |
| "→" after every text link; "A · B · C" meta lines | Template chrome | Plain underlined text links; no middle dots anywhere in the UI. |
| Headline "Send groceries, not money" | Says what we're not; "send" implies shipping | "Groceries for home. Proof for you." — what you get, in five words. |
| A testimonial strip "What senders say" | We have none; would be invented | Not built. |
| Coverage before "why" | Ends the story on logistics before the reason to choose us | Why (S6) before where (S7). |
| (owner update) Styling-first plan | The owner asked for structure first | Added §1B: a whole-page skeleton and a six-point structure block leading every section. S7 changed from "two photo cards on surface" to a full-bleed Kingston photo band with a flat 70% oxblood overlay, giving the page one place-led full-bleed moment between contained sections. Hero kept as a split (reasons in 1B.3) but its photo is now square at desktop so header + hero fit one screen. |

The boldness is spent in one place: the receipt. Every other section is neutral and flat; the
S7 photo band is a change of pace, not a second loud element (no motion, no type tricks).

### 8.2 Against ui-ux-pro-max pre-delivery checklist

| Check | Status in this plan |
|---|---|
| No emoji icons; one icon set | lucide-react only; icon names listed per section |
| `cursor-pointer` on clickables | links/buttons/summary (Tailwind v4 preflight leaves buttons `default` — add `cursor-pointer` to `summary` and icon buttons) |
| Hover transitions 150–300ms | 150 (colour), 250 (lift); photo zoom 700 by system choice |
| Text contrast ≥ 4.5:1 | only allowed pairs from TOKENS.md used; `ok` on `ok-tint` for the pill |
| Focus visible everywhere | signal on light, **blush on crimson/oxblood** (new `on-dark-focus`) |
| `prefers-reduced-motion` | global rule + receipt shows final state + menu instant |
| Responsive 375/768/1024/1440 | wireframes per section; no horizontal scroll (receipt offsets stay inside the gutter) |
| Touch targets ≥ 44px, ≥ 8px apart | `h-control` / `size-control` on all controls; footer links 44px on touch |
| Images reserve space | every image in an aspect box |
| Lazy below fold, preload LCP only | yes |
| One primary CTA per view | hero and closing panel only (different views) |
| Headings sequential | h1 (S1) → h2 per section → h3 inside; footer column titles h2 |
| Skip link, landmarks | existing skip link; header/nav/main/footer; sections `aria-labelledby` |
| Focus not obscured by sticky header | `scroll-mt-header` |

### 8.3 Risks

| Risk | Mitigation |
|---|---|
| The receipt overlaps the hero photo's edge | Allowed by the owner's overlay decision (1B.3). It covers ≤ 15% of the photo, at an edge, never the face. Fallback if it crowds at 768: receipt fully on the crimson beside the photo. |
| A drawn "example receipt" could look like a fake real receipt | Always labelled "Example receipt"; lines come from the real catalogue at the live rate; no store name, no date, no fake time on it. |
| SMS bubbles show copy that may not match the real templates | Labelled "Examples"; §10 asks for the template wording; update when Twilio templates land. |
| Same-day promise near cut-off / Sundays | Countdown copy after cut-off says "next delivery day", not "tomorrow"; awaiting Derion's delivery days (§10). |
| `familyPhone` is from a UK charity's library (not Jamaica) | Alt text doesn't claim Jamaica; the copy beside it doesn't either. Replace with a ShipEast photo of a real customer (with consent) when available. |
| Featured baskets change in admin (count, occasion) | Grid rules cover 2/3/4 cards; lead is built from occasions. |
| `clip-path` animation is not transform/opacity | Small element, runs once, 700ms; acceptable. Fallback: replace with `translateY` + opacity if Lighthouse flags it. |
| `HeaderSearchRow` hides on routes via `usePathname` → tiny client boundary in the header | Server `SearchBox` is passed as `children`, so the client part is only the wrapper. |

---

## 9. Acceptance checklist

Verify at **375, 768, 1024, 1440** in light mode, with Playwright screenshots, plus
`npm run typecheck && npm run lint && npm test && npm run build`.

### Global

- [ ] Only role colour classes; `design-tokens.test.ts` passes; no gradient, raw hex, `tracking-*`, hand-set font size, text < 12px.
- [ ] Figtree only; type classes exactly as in §2.3; no eyebrows on `/`.
- [ ] No horizontal scroll at any width (check 375 with the receipt offset).
- [ ] Every interactive element ≥ 44×44 on touch; focus ring visible on every one (signal on light, blush on crimson/oxblood).
- [ ] `prefers-reduced-motion: reduce` → receipt appears in place, menu opens instantly, nothing else moves.
- [ ] One `h1`; `h2` per section in order; landmarks: header, nav (Main), main, footer.
- [ ] All money via `formatUsd`/`formatJmd`; times via `formatClockTime`; phone via `formatJamaicanPhone`; company name exactly "ShipEast Couriers & Bearer Service Ltd".
- [ ] No invented numbers, testimonials, ratings, logos; no "PriceSmart" on `/`; no emoji; no `→` in link text; no middle-dot strings.
- [ ] Lighthouse mobile on the preview: LCP < 2.5s, CLS < 0.05, a11y 100.

### Header

- [ ] 375: bar 64px (wordmark, account, basket, menu); search row below scrolls away; bar stays.
- [ ] 768: bar 72px with inline search; no second row.
- [ ] 1024: nav Shop / Baskets / How it works; search icon; no menu button.
- [ ] 1440: nav includes Track an order; inline search.
- [ ] At top of `/` the bar and hero read as one crimson block; after 8px scroll the bar gains the deep border and lift shadow.
- [ ] `aria-current` on the current nav item (check `/shop`, `/baskets`).
- [ ] Mobile menu: opens as a right sheet, focus on Close, `Esc` and backdrop close it, focus returns to the trigger, page does not scroll behind it, closes on navigation.
- [ ] Basket count streams without layout shift.

### S1 Hero

- [ ] Headline "Groceries for home. Proof for you." in `text-display`, on-dark; lead lists live parishes.
- [ ] Start shopping (onDark, lg) → `/shop`; See ready-made baskets → `/baskets`.
- [ ] Cut-off shows the earliest active zone's cut-off; after mount, the local time and countdown appear without layout shift; hidden with no zones.
- [ ] Receipt: "Example receipt" pill, basket name, ≤ 7 real lines in J$ at the live rate, total = sum; rotated -3°; prints once on load.
- [ ] Photo is `familyPhone`, preloaded, correct crop per breakpoint, face not covered by the receipt.

### S2–S9

- [ ] S2: four steps in an `<ol>`; rows with 96px thumbs at 375; 2×2 at 768; 4 across at 1024+.
- [ ] S3: tiles from `getCategories()` with real counts; photo zoom on hover only; 2×2 at 375, 4 across at 768+.
- [ ] S4: featured baskets; saving tag only when real; card hover lift; Add to basket works and shows its added state; no orphan half-row at 768.
- [ ] S5: oxblood band; email sequence with connector; SMS panel labelled as examples.
- [ ] S6: ruled promise list; photo sticky beside it at 1024+; bank-transfer wording only when configured.
- [ ] S7: full-bleed Kingston photo with a flat oxblood 70% overlay (no gradient); all text on the overlay is `on-dark`; white zone cards with fee, cut-off and minimum from data; empty state when no zones; photo lazy-loaded.
- [ ] S8: 5 FAQs in native `<details>`; email link uses `settings.email`; WhatsApp link only if set.
- [ ] S9: contained crimson panel, not touching the footer.

### Footer

- [ ] Oxblood; brand + contact; Shop / Help / Company columns; payments line; flag + © year + company name; no TRN until configured.
- [ ] 375: two-column link grid, Company spans; 1440: 12-column layout as drawn.
- [ ] Same header and footer on `/shop`, `/how-it-works`, `/faq`, `/basket` (phone search row hidden on `/basket`, `/checkout`, `/search`).

---

## 10. Open questions

1. **SMS wording.** What exactly do the two Twilio texts say (sender name, delivery time)? S5 shows labelled examples until then.
2. **Delivery days.** Does ShipEast deliver on Sundays and public holidays? Affects the after-cut-off line ("next delivery day").
3. **Hero photo.** Can Derion supply a real photo (with consent) of a customer's family at home or at the door? It would replace `familyPhone` and strengthen the "real" feel more than any stock.
4. **TRN and registered address** for the footer legal line (hidden until provided).
5. **Overlay in S7.** Confirm oxblood at 70% (computed 6.2:1 worst case) reads well on the real photo; if the photo looks muddy, the fallback is 65% (5.3:1) — never lower.
6. **Store name on the example receipt.** Kept off deliberately. Confirm ShipEast doesn't want a store named there.
