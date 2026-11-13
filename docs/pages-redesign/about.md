# About ShipEast (`/about`): redesign plan

Owner: design agent · For: the manager, then the development agent · Scope: `/about`, from the
end of the shared header to the start of the shared footer (both already built, not touched here).

Read with: `CLAUDE.md`, `docs/BRAIN.md`, `docs/BRIEF.md`, `docs/TOKENS.md`,
`docs/DESIGN-SYSTEM.md`, `docs/PHOTOGRAPHY.md` and `docs/home-redesign/PLAN.md`. This page uses the
home page's design language: large solid crimson and oxblood blocks, neutral bands, no eyebrows,
flat cards, one bold element, calm motion and `photo-scrim` where it helps. Where this plan and
those files disagree on a brand rule, those files win and the dev agent flags it.

Build exactly what is written. Anything not specified: use the existing component or token, never
invent a value. Every class named below exists today. **No new tokens.**

---

## Contents

0. [Facts this page may use](#0-facts-this-page-may-use)
1. [Concept](#1-concept)
2. [Structure blueprint](#2-structure-blueprint) (read this first)
3. [Sections in detail](#3-sections-in-detail): S1 to S6
4. [Data, rendering and performance](#4-data-rendering-and-performance)
5. [Files to add, change and delete](#5-files-to-add-change-and-delete)
6. [Photo register](#6-photo-register)
7. [Self-review](#7-self-review)
8. [Acceptance checklist](#8-acceptance-checklist)
9. [Open questions and content that needs Derion](#9-open-questions-and-content-that-needs-derion)

---

## 0. Facts this page may use

Every sentence on the page comes from this list or from a data loader. Nothing else.

| Fact                                                                                                 | Source                                            |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Registered name **ShipEast Couriers & Bearer Service Ltd**                                           | `site.company` (`src/lib/site.ts`), `BRIEF.md`    |
| A courier and errand ("bearer") business based in **St. Thomas, Jamaica**, also serving **Kingston** | `BRIEF.md`                                        |
| Its driver already shops at local stores for customers overseas                                      | `BRIEF.md` ("one driver who already shops…")      |
| Proof: a photo of the till receipt and a photo at the door                                           | `BRIEF.md`, `CLAUDE.md`                           |
| Nothing is shipped (no barrels, customs or freight); only the money crosses the border               | `BRIEF.md`                                        |
| Sender pays in US dollars (PayPal, card through PayPal, bank transfer when set up)                   | `BRIEF.md`; bank transfer from `settings`         |
| The family installs nothing; they get a text                                                         | `BRIEF.md`                                        |
| Substitution rule chosen at checkout; full refund until the driver starts shopping                   | current About copy, `docs/PLAN.md` checkout scope |
| Domain `shipeastja.com`, email `info@shipeastja.com`                                                 | `site.url`, `settings.email`                      |
| Phone, WhatsApp                                                                                      | `getSettings()` (shown only when set)             |
| Active delivery parishes, cut-off                                                                    | `getActiveZones()`, `joinParishes()`              |

**Not used, ever:** a founding year, "since…", years in business, staff names or headcount, team
photos presented as our team, quotes, customer or order counts, ratings, partner or store logos,
"PriceSmart". The current page's line "Shop & Send grew out of a request we kept hearing from
Jamaicans in New York, Toronto and London" is a backstory we cannot prove, so it is **removed**.

**Hidden until provided** (render nothing, not a placeholder): TRN, registered address, the
owner block (Derion Scarlett), any team photo.

---

## 1. Concept

**One line.** _The errand-runners in our name._ "Bearer" is the oldest, plainest word in the
company's registered name, and it is exactly the job: carrying something to someone on another
person's behalf. The page explains the business through its own name, then shows what it does and
doesn't do, where it works, and exactly who you are dealing with.

|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One job                  | Answer **"Who are these people, and can I trust them with my family?"** for a Jamaican abroad who has found the shop but never used us.                                                                                                                                                                                                                                                                                                                                                |
| Audience                 | The sender (New York, Toronto, London…), usually on a phone, often reading this page _just before_ paying for the first time. Typically comes from the footer "About ShipEast" or the home page link "About ShipEast Couriers & Bearer Service Ltd".                                                                                                                                                                                                                                   |
| What the sender needs    | (1) a real, named, local business; (2) what it actually does, in plain words; (3) what it will _not_ do with their money or their family; (4) where it works; (5) the company details and every way to reach a person.                                                                                                                                                                                                                                                                 |
| **The ONE bold element** | **The name, defined.** In the crimson hero sits a large crimson-deep panel set like a dictionary entry: the word **bearer** in `text-display` (blush, weight 900, lowercase like a headword), a small "noun" tag, and the definition in `text-lead`: _"Someone who carries something to another person, on your behalf."_ Under it, one line ties it to the registered name. It is pure type on flat colour: no photo, no icon, no illustration. Everything else on the page is quiet. |
| Tone                     | Plain, warm, local, specific. Sentences a courier would say, not a startup. No superlatives.                                                                                                                                                                                                                                                                                                                                                                                           |

### How the page beats the competitors

| Competitor              | Their About / trust story                                                  | Our answer on this page                                                                                                                          | Where  |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| grocerylistjamaica.com  | Reseller with a service fee; little about who physically shops or delivers | A named registered company that is itself the courier: the same business shops _and_ delivers, with photo proof on every order.                  | S1, S3 |
| revvcouriers.com        | A St. Thomas courier, new site, generic delivery                           | Same parish roots, but we shop for you, you choose every item, pay in USD, and your family installs nothing. The "do / don't" list says it flat. | S3, S4 |
| PriceSmart Jamaica      | Membership store; you or a member must be in Jamaica                       | No membership for you or your family; we go to the store. (Never named on the page.)                                                             | S3     |
| Remittance / gift sites | Cash or vouchers; you don't know how it is spent; family must collect      | "We don't send cash." You choose exactly what arrives at the door, with photos.                                                                  | S3     |

We never name a competitor and never claim a comparison we cannot prove.

---

## 2. Structure blueprint

Structure first; styling (§3) dresses it. `▓` = red (crimson / crimson-deep / oxblood), `▒` = photo
as background under a flat overlay, `░` = neutral (`page` / `surface`). "Full" = full-bleed
background; content capped at `max-w-wide` (1280) or `max-w-page` (1152).

### 2.1 Whole-page skeleton

```
1440 × ~4,300px (between header and footer)                375 × ~6,300px

┌▓▓▓ (shared HEADER, crimson, 72)                      ┐  ┌▓ (shared HEADER 64 + search row 56)  ┐
├▓▓▓ S1 HERO  full crimson band, content wide          │  ├▓ S1 HERO  text, then the definition   │
│▓▓▓  split 7/5: h1 + lead + 2 actions | DEFINITION    │  │▓  panel full width              ~820  │
│▓▓▓  panel (crimson-deep, the bold element)    ~620   │  │                                       │
├░░░ S2 WHO WE ARE  page band, max-w-page              │  ├░ S2  h2, photo 4:3, 3 short paras,    │
│░░░  split 5/7: framed tall photo | h2 + story +      │  │░  fact strip (3 rows)          ~1,250 │
│░░░  3-fact strip                              ~760   │  │                                       │
├░░░ S3 DO / DON'T  surface band, max-w-page           │  ├░ S3  h2 + lead, "We do" list (6),     │
│░░░  header row, then split 6/6: two ruled lists      │  │░  then "We don't" list (5)     ~1,500 │
│░░░  "What we do" (6) | "What we don't do" (5) ~820   │  │                                       │
├▒▒▒ S4 WHERE WE WORK  full-bleed photo + photo-scrim  │  ├▒ S4  photo bg, h2, lead, 1 white     │
│▒▒▒  (oxblood 80%); h2 + lead left, one white card    │  │▒  card, link                   ~760  │
│▒▒▒  right (parishes + cut-off + link)         ~560   │  │                                       │
├░░░ S5 COMPANY DETAILS  page band, max-w-page         │  ├░ S5  h2, details card (dl),          │
│░░░  split 7/5: details card (dl) | ways to reach us  │  │░  then contact list + buttons  ~1,150 │
│░░░  (3–4 rows + 2 buttons)                     ~640   │  │                                       │
├░░░ S6 CLOSING  page band + contained crimson panel   │  ├░ S6  stacked crimson panel      ~480  │
│░░░  (reuses HomeClosing)                       ~410   │  │                                       │
├▓▓▓ (shared FOOTER, oxblood)                          ┘  └▓ (shared FOOTER)                      ┘
```

**Rhythm:** red mass (S1) → light, photo-led split (S2) → light, text-led lists (S3) → photo band
under a flat oxblood overlay (S4) → light, text-led ledger (S5) → contained red panel (S6) → red
footer. No two dark bands touch: S4 sits between two light bands, S6 is a contained panel on the
page band so it never meets the oxblood footer (same rule as the home page). Photo-led (S2, S4)
alternates with text-led (S3, S5).

**What is gone from the old page and why:** the photo hero with an eyebrow (reads as the template
used on every company page), the oxblood "values" band and the muted "care" band (both 3- and
4-icon grids that repeated each other and the home page; their content now lives in S3 as a
sharper do / don't list), the flag "Our roots" parallax feature (flag photo is decoration, parallax
is motion without a job), and the closing `CtaBand` photo panel (replaced by the home page's
closing panel for one consistent last ask).

### 2.2 Section structures at a glance

| Section            | 1. Pattern                                                                                               | 2. Background                                                            | 3. Container / height                                               | 4. Columns 375 → 768 → 1024 → 1440 (phone order)                         | 5. Blocks (counts)                                                                                        | 6. Why this structure, for the sender                                                                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1 Hero            | **Split two-column 7/5**: text left, definition panel right                                              | Solid `crimson`; panel solid `crimson-deep` (no photo)                   | Full-bleed band, content `max-w-wide`; auto, ~620px at 1440         | 1 (text, panel) → 1 (panel `max-w-xl`) → 2 (7/5) → 2 (7/5)               | h1, lead, 1 button + 1 text link; panel = headword + "noun" tag + definition + 1 tie-in line              | Text first: who we are in one sentence before any scroll. The panel turns a legal name into a reason to trust: the job is in the name. No competitor explains who they are this plainly.            |
| S2 Who we are      | **Split two-column 5/7**: framed tall photo left, story right; a 3-row fact strip closes the text column | `page`                                                                   | Contained `max-w-page`; auto, ~760px                                | 1 (h2, photo 4:3, paras, facts) → 1 (photo 16:9) → 2 (5/7) → 2 (5/7)     | 1 photo, h2, 3 paragraphs, fact strip = 3 rows (icon + label + value)                                     | A real street in Kingston, real people, beside a short honest story. The fact strip gives the skimmer the three things that matter (based in, serving, how we prove it) without reading paragraphs. |
| S3 Do / don't      | **Header row, then split two-column 6/6** of two ruled lists                                             | Solid `surface`                                                          | Contained `max-w-page`; auto, ~820px                                | 1 (header, "do", "don't") → 1 → 2 (6/6) → 2 (6/6)                        | h2, lead; list A 6 items (check icon + h3 + 1 line); list B 5 items (x icon + h3 + 1 line); 1 link        | Trust is as much what we refuse to do as what we promise. Two plain lists side by side are scannable and quotable; no generic three-card "values" grid.                                             |
| S4 Where we work   | **Full-bleed background photo with a flat overlay**, text left and one white card right                  | Photo `companyCountryRoad` + `bg-photo-scrim` (oxblood at **80%**, flat) | Full-bleed; `lg:min-h-[560px]`, auto below                          | 1 (h2, lead, card) → 1 (card `max-w-md`) → 2 (6/5, card right) → 2 (6/5) | h2, lead (on-dark only), 1 white card = parish rows (1 per active zone) + cut-off note + 2 links          | Roots shown as a place, not a claim. The card pulls live parishes and cut-off from the zones table, so the page can never overstate coverage.                                                       |
| S5 Company details | **Split two-column 7/5**: details card (description list) left, ways to reach us right                   | `page`; card `surface` with `border-line`                                | Contained `max-w-page`; auto, ~640px. Anchor `id="company-details"` | 1 (h2, card, reach) → 1 (dl 2 columns inside card) → 2 (7/5) → 2 (7/5)   | h2, lead; card dl = 4 rows always + up to 2 hidden rows (TRN, address); reach list = 2–4 rows + 2 buttons | "Who you're dealing with" in one bordered card a sender could screenshot. Every contact method sits beside it, so "can I reach a person?" is answered next to the legal name.                       |
| S6 Closing         | **Single contained panel** (reuse `HomeClosing`)                                                         | `page` band + solid `crimson` panel                                      | Contained `max-w-page`; auto                                        | 1 → 1 → 2 (text / buttons) → 2                                           | h2, 1 line, 2 actions                                                                                     | One calm ask after the trust questions are answered; identical to the home page close, so the brand feels like one system.                                                                          |

---

## 3. Sections in detail

General rules for every section:

- Headings: `text-h1` only in S1; `text-h2` for section titles; `text-h3` for list items and card
  titles. **No eyebrows anywhere** (home page rule). Sentence case.
- Body copy `text-body text-ink-body`, leads `text-lead text-ink-body` (light) or
  `text-on-crimson-muted` (crimson) or `text-on-dark` (on the photo scrim).
- Every section has `aria-labelledby` pointing at its h2 (h1 in S1).
- Links on light backgrounds use the home page's `lightLink` class (exported from
  `src/components/pages/home/steps.tsx`); on crimson use `onCrimsonLink` (from `home/hero.tsx`);
  on the photo use the same style as `overlayLink` in `home/coverage.tsx` (move it to a shared
  export, see §5).
- Icons: `lucide-react` only, `size-icon`, `aria-hidden`.
- No `Reveal`, `Stagger` or parallax on this page. The only non-user motion is S1's panel
  (`animate-rise`, CSS, reduced-motion safe via the global rule).

---

### S1. Hero: "The name, defined" (the bold element)

**Structure**

- Pattern: split two-column 7/5. Text left; the definition panel right, vertically centred.
- Background: solid `bg-crimson`, full bleed. Panel solid `bg-crimson-deep`, `rounded-2xl`. No
  photo, no overlay, no shadow (it is not floating).
- Container: `<section>` full bleed; inner `mx-auto max-w-wide gutter`. Height auto, about 620px
  at 1440 from `section-lg` padding.
- Columns: 375 = 1 (text, then panel). 768 = 1, panel `max-w-xl`. 1024 and 1440 =
  `lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-12`; text `lg:col-span-7`, panel
  `lg:col-span-5`.
- Blocks: h1, lead, actions row (1 button + 1 text link). Panel: headword, "noun" tag, definition,
  1 rule, 1 tie-in line.
- Why: the sender learns who we are before scrolling, and the panel answers the unspoken "what is
  a 'bearer service'?" that every overseas reader trips on in our legal name.

**Copy**

- h1 (`id="about-title"`): **A St. Thomas courier, shopping for your family**
- Lead: `{site.company} is a courier and errand business based in St. Thomas, Jamaica, also
serving Kingston. You choose the groceries and essentials and pay in US dollars. Our driver buys
them at a local store and brings them to the door, with a photo of the receipt and a photo at
the door.`
  - "also serving Kingston" is fixed company fact (BRIEF). It is not the delivery list; S4 shows
    live zones.
- Primary button: **Start shopping** → `/shop` (`ButtonLink variant="onDark" size="lg"`,
  `w-full sm:w-auto`).
- Text link: **Company details and contact** → `#company-details` (`onCrimsonLink`).
- Panel:
  - Headword: `bearer` (lowercase, as a dictionary headword; it is a `<p>` with
    `lang="en"`, not a heading).
  - Tag: `noun`
  - Definition: _Someone who carries something to another person, on your behalf._
  - Tie-in (under a rule): `It's the job in our name: {site.company}. We run errands and
deliver for people who can't be there themselves.`

**Wireframes**

```
1440 (content max-w-wide 1280)
┌──────────────────────────────────────────────────────────────────────────────────────────┐ crimson
│                                                                                          │
│  A St. Thomas courier,                          ┌───────────────────────────────────┐    │
│  shopping for your family          (text-h1)    │ bearer               (display,    │    │
│                                                  │                       blush, 900) │    │
│  ShipEast Couriers & Bearer Service Ltd is a     │ [noun]                            │    │
│  courier and errand business based in St.        │                                   │    │
│  Thomas, Jamaica, also serving Kingston. …       │ Someone who carries something to  │    │
│                                   (lead, 7 col)  │ another person, on your behalf.   │    │
│                                                  │ ───────────────────────────────── │    │
│  [ Start shopping ]   Company details and contact│ It's the job in our name: …       │    │
│                                                  └───────────────────────────────────┘    │
│                                                     crimson-deep, rounded-2xl, 5 col      │
└──────────────────────────────────────────────────────────────────────────────────────────┘

768                                         375
┌──────────────────────────────────┐        ┌───────────────────────┐
│ A St. Thomas courier, shopping   │        │ A St. Thomas courier, │
│ for your family                  │        │ shopping for your     │
│ lead…                            │        │ family                │
│ [Start shopping] Company details │        │ lead… (5–6 lines)     │
│ ┌──────────────────────────┐     │        │ [  Start shopping   ] │ full width
│ │ bearer                   │     │        │ Company details and   │
│ │ [noun]                   │     │        │ contact               │
│ │ Someone who carries…     │     │        │ ┌───────────────────┐ │
│ │ ──────────               │     │        │ │ bearer            │ │
│ │ It's the job in our name │     │        │ │ [noun]            │ │
│ └──────────────────────────┘     │        │ │ Someone who…      │ │
│   max-w-xl                       │        │ │ ───               │ │
└──────────────────────────────────┘        │ │ It's the job…     │ │
                                            │ └───────────────────┘ │
                                            └───────────────────────┘
```

**Classes**

- `<section aria-labelledby="about-title" className="bg-crimson section-lg text-on-dark on-dark-focus lg:section">`
  (same rhythm as the home hero: generous on phones, `section` on desktop).
- Text column: `max-w-2xl lg:col-span-7 lg:max-w-none xl:pr-8`.
- h1: `text-h1 text-balance` (not `text-display`: the display size belongs to the headword, the
  page's one bold element).
- Lead: `mt-5 text-lead text-on-crimson-muted lg:mt-6` (5.51:1 on crimson).
- Actions: `mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6`; link
  `self-start sm:self-auto`.
- Panel: `<figure>` (it is a self-contained definition) with
  `mt-10 max-w-xl rounded-2xl bg-crimson-deep p-card-lg md:p-10 lg:col-span-5 lg:mt-0 lg:max-w-none animate-rise [animation-delay:120ms]`.
  - Headword: `<p lang="en" className="text-display text-blush">bearer</p>` (blush on
    crimson-deep 7.53:1).
  - Tag: `mt-3 inline-flex rounded-sm bg-crimson px-2 py-0.5 text-xs font-bold text-on-dark`
    reading `noun` (white on crimson 7.2:1). Sentence case, not uppercase.
  - Definition: `<blockquote>` is wrong (not a quote). Use
    `<figcaption>`-free markup: `<p className="mt-4 text-lead font-semibold text-on-dark">`.
  - Rule: `mt-6 border-t border-line-on-dark pt-6`.
  - Tie-in: `text-body text-on-crimson-muted` (8.45:1 on crimson-deep).
- Accessibility: give the figure `aria-label="What bearer means"` so screen readers announce
  the panel's purpose before the lone word.

**Components**

- New: `src/components/pages/about/hero.tsx`, `AboutHero()`, **server**, no props (reads `site`).
- Reuse: `ButtonLink`, `onCrimsonLink`.

**States and motion**

- Button and link: existing hover/pressed (`active:translate-y-px`), focus ring from
  `on-dark-focus`.
- Panel: `animate-rise` once on load, 120ms delay. Reduced motion: no animation (global rule
  sets animation duration to 0); panel renders in place. It is never hidden before JS runs (CSS
  only).
- No hover on the panel (not interactive).

**Photos:** none, by design. The hero LCP is text, which paints immediately.

---

### S2. Who we are: "Errands are what we do"

**Structure**

- Pattern: split two-column 5/7. Framed tall photo left; h2, story and fact strip right.
- Background: `page` (no class needed, page background).
- Container: `section` padding, `mx-auto max-w-page gutter`. ~760px at 1440.
- Columns:
  - 375: h2, photo `aspect-4/3`, paragraphs, fact strip (DOM order h2 → photo → text, same
    trick as the home page S6 so the heading leads on phones).
  - 768: same order; photo `md:aspect-16/9`.
  - 1024 / 1440: `lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 xl:gap-x-12`;
    photo `lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:aspect-4/5`; h2
    `lg:col-span-7 lg:col-start-6 lg:row-start-1`; body `lg:col-span-7 lg:col-start-6 lg:row-start-2`.
    The photo is **not sticky** (the text column is short; sticky would do nothing).
- Blocks: 1 photo, h2, 3 paragraphs, fact strip (3 rows).
- Why: a real Kingston street with real people grounds the company in a place before the reader
  meets any claims; the fact strip answers the three trust questions at a glance.

**Copy**

- h2 (`id="story-title"`): **Errands are what we do**
- Para 1: `ShipEast is a courier and bearer service in St. Thomas. Picking things up, dropping
them off and running errands for people who can't be there themselves is our everyday work.`
- Para 2: `Our driver already shops at local stores for customers who live overseas. Shop & Send
puts that on a proper website: you fill the basket and pay in US dollars, and we do the
shopping and the delivery.`
- Para 3: `Nothing is shipped, so there are no barrels, customs or freight. Only the money
crosses the border. Your family installs nothing; they get a text when it's on the way.`
- Fact strip (a `<dl>`), 3 rows:
  | Icon (lucide) | `dt`           | `dd`                                                    |
  | ------------- | -------------- | ------------------------------------------------------- |
  | `MapPin`      | Based in       | St. Thomas, Jamaica                                     |
  | `Truck`       | Delivering in  | `{parishList}` (from active zones; row hidden if empty) |
  | `ReceiptText` | On every order | A photo of the till receipt and a photo at the door     |

**Wireframes**

```
1440 (max-w-page 1152)
┌──────────────────────────────────────────────────────────────────────────────┐ page
│ ┌──────────────────────┐   Errands are what we do                (h2)        │
│ │                      │                                                     │
│ │  kingstonStreet      │   ShipEast is a courier and bearer service in St.   │
│ │  4:5, rounded-xl     │   Thomas. …                         (body, prose)   │
│ │  object-position     │   Our driver already shops at local stores …        │
│ │  center 35%          │   Nothing is shipped, so there are no barrels …     │
│ │                      │   ───────────────────────────────────────────────── │
│ │                      │   (pin)    Based in        St. Thomas, Jamaica      │
│ │                      │   ───────────────────────────────────────────────── │
│ │                      │   (truck)  Delivering in   St. Thomas and Kingston  │
│ │                      │   ───────────────────────────────────────────────── │
│ │                      │   (receipt) On every order A photo of the till …    │
│ └──────────────────────┘                                                     │
└──────────────────────────────────────────────────────────────────────────────┘

768                                      375
┌────────────────────────────────┐       ┌──────────────────────┐
│ Errands are what we do         │       │ Errands are what we  │
│ ┌────────────────────────────┐ │       │ do                   │
│ │ photo 16:9                 │ │       │ ┌──────────────────┐ │
│ └────────────────────────────┘ │       │ │ photo 4:3        │ │
│ para · para · para             │       │ └──────────────────┘ │
│ (pin) Based in   St. Thomas…   │       │ para 1               │
│ (truck) Delivering in …        │       │ para 2               │
│ (receipt) On every order …     │       │ para 3               │
└────────────────────────────────┘       │ (pin) Based in       │
                                         │       St. Thomas, …  │ dt above dd
                                         │ (truck) Delivering in│
                                         │       St. Thomas and │
                                         │       Kingston       │
                                         │ (receipt) On every … │
                                         └──────────────────────┘
```

**Classes**

- Section: `<section aria-labelledby="story-title" className="section">`.
- Photo: `<StockPhoto name="kingstonStreet" position="center 35%" sizes="(min-width: 1024px) 460px, 100vw" className="mt-8 aspect-4/3 rounded-xl md:aspect-16/9 lg:mt-0 lg:aspect-4/5" />`
  (alt from registry; update it, see §6).
- Paragraphs: `mt-6 flex max-w-prose flex-col gap-4 text-body text-ink-body lg:mt-6 lg:text-lead`.
- Fact strip: `<dl className="mt-8 max-w-prose">`; each row
  `grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-line py-4 last:border-b sm:grid-cols-[2.5rem_10rem_1fr]`.
  - Icon cell: `grid size-10 place-items-center rounded-full bg-surface-muted` with icon
    `size-icon text-crimson`, `aria-hidden`.
  - `dt`: `text-small text-ink-muted self-center`; `dd`: `col-start-2 text-body font-semibold text-ink sm:col-start-3 sm:self-center`.

**Components**

- New: `src/components/pages/about/story.tsx`, `AboutStory({ parishList }: { parishList: string })`, **server**.
- Reuse: `StockPhoto`.

**States:** none interactive. Empty: if `parishList` is empty, the "Delivering in" row is not
rendered (never "Jamaica" as a fake coverage claim).

**Motion:** none.

**Accessibility:** `dl` with real `dt`/`dd`; icons decorative; photo alt describes the scene
without claiming it shows our driver.

---

### S3. What we do, and what we don't

**Structure**

- Pattern: header row, then split two-column 6/6 of two ruled lists.
- Background: solid `bg-surface`, full bleed (flat band, like the home page Departments band).
- Container: `section`, `mx-auto max-w-page gutter`. ~820px at 1440.
- Columns: 375 / 768 = 1 (header, "We do" list, "We don't" list). 1024 / 1440 =
  `lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16`.
- Blocks: h2 + lead; list A: h3 "What we do" + 6 items; list B: h3 "What we don't do" + 5 items;
  1 link under list B.
- Why: one honest list is worth more than three value cards. The sender sees, side by side, what
  we promise and the things they fear (cash going astray, barrels, surprise swaps, family being
  asked to pay), each ruled out plainly.

**Copy**

- h2 (`id="promise-title"`): **What we do, and what we don't**
- Lead: `The same rules on every order, whether it's the weekly shop or a Christmas hamper.`
- **What we do** (h3, `id="do-title"`), icon `Check` in a `bg-ok-tint text-ok` disc for each:
  1. **Shop for the items you chose.** At a local store in Jamaica, item by item from your basket.
  2. **Photograph the till receipt.** You see every item and price we paid. (`ReceiptText` is not
     used here; the check disc is the list marker, consistent per list.)
  3. **Deliver to the door.** And photograph the handover, added to your tracking link.
  4. **Follow your swap rule.** If an item is out of stock: a similar item, ask you first, or leave
     it out and refund it. You choose at checkout.
  5. **Charge you in US dollars.** PayPal, or a debit or credit card through PayPal`{bankTransfer ? ', or bank transfer' : ''}`. You see the Jamaican dollar amount too.
  6. **Text your family.** On any phone, when the order is on its way and when it's delivered.
- **What we don't do** (h3, `id="dont-title"`), icon `X` in a `bg-surface-muted text-ink-muted`
  disc for each:
  1. **Ship anything.** No barrels, customs or freight. Only the money crosses the border.
  2. **Send cash.** Your money buys the items you picked, and nothing else.
  3. **Swap without your rule.** We never substitute an item you said not to.
  4. **Ask your family for anything.** No app, no account, no payment at the door.
  5. **Deliver outside `{parishList}` yet.** Family somewhere else in Jamaica? Tell us where.
     (Item 5 renders only when `parishList` is set; the "Tell us where" text is a link to
     `/contact`, `lightLink` style inline variant: `font-semibold text-crimson underline underline-offset-4`.)
- Link under the lists: **Read our refunds and cancellations policy** → `/legal/refunds`
  (`lightLink`).

Copy notes: every item restates facts already in BRIEF / checkout scope. "Payment at the door":
there is no cash on delivery (CLAUDE.md). "Cancel for a full refund until our driver starts
shopping" from the old page is kept out of the list (policy wording lives on `/legal/refunds`,
which the link reaches); flag in §9 if the manager wants it back.

**Wireframes**

```
1440
┌──────────────────────────────────────────────────────────────────────────────┐ surface
│ What we do, and what we don't                                  (h2)          │
│ The same rules on every order, …                               (lead)        │
│                                                                              │
│ What we do                    (h3)      What we don't do              (h3)   │
│ ────────────────────────────────        ──────────────────────────────────   │
│ (✓) Shop for the items you chose.       (×) Ship anything.                   │
│     At a local store in Jamaica, …          No barrels, customs or freight…  │
│ ────────────────────────────────        ──────────────────────────────────   │
│ (✓) Photograph the till receipt.        (×) Send cash.                       │
│ ────────────────────────────────        ──────────────────────────────────   │
│ (✓) Deliver to the door.                (×) Swap without your rule.          │
│ (✓) Follow your swap rule.              (×) Ask your family for anything.    │
│ (✓) Charge you in US dollars.           (×) Deliver outside St. Thomas and   │
│ (✓) Text your family.                       Kingston yet. Tell us where.     │
│                                         Read our refunds and cancellations … │
└──────────────────────────────────────────────────────────────────────────────┘

768: one column, "What we do" list then "What we don't do" list, full width (max-w-prose).
375: same as 768; disc 40px left, text right; title bold on its own line, body below.
```

**Classes**

- Section: `<section aria-labelledby="promise-title" className="bg-surface section">`.
- Header: `max-w-2xl`; h2 `text-h2 text-balance text-ink`; lead `mt-3 text-lead text-ink-body`.
- Lists wrapper: `mt-10 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-12 xl:gap-16`.
- Each list: `<section aria-labelledby="do-title">` (a nested region, so screen reader users can
  jump between the two lists); h3 `text-title text-ink` (the two list titles are the strongest
  sub-heads on the page).
- `<ul className="mt-4">`; item `grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-5`.
  - Disc: `grid size-10 place-items-center rounded-full` + `bg-ok-tint text-ok` (do) or
    `bg-surface-muted text-ink-muted` (don't); icon `size-icon`, `aria-hidden`.
  - Text: `<p><strong className="font-bold text-ink">Title.</strong> <span className="text-ink-body">Body</span></p>`
    in `text-body`. Bold lead-in plus body in one paragraph reads like a list a person wrote,
    not a card grid.
- Not colour alone: the headings "What we do / What we don't do" and the icons (check vs x)
  carry the meaning; colour only reinforces.

**Components**

- New: `src/components/pages/about/promise.tsx`,
  `AboutPromise({ parishList, bankTransfer }: { parishList: string; bankTransfer: boolean })`,
  **server**.

**States:** links hover (underline thickens), focus (`focus-visible` signal ring from base styles).
Empty: no parishes → item 5 is omitted.

**Motion:** none.

---

### S4. Where we work

**Structure**

- Pattern: full-bleed background photo with a flat overlay; text left, one white card right.
- Background: `<StockPhoto name="companyCountryRoad" alt="" position="center 55%" sizes="100vw" />`
  absolutely filling the section, under `bg-photo-scrim` (oxblood at **80%**, flat, `aria-hidden`).
  Same build as `home/coverage.tsx`.
- Container: full bleed; inner `relative mx-auto w-full max-w-page gutter`. `section` padding;
  `lg:flex lg:min-h-[560px] lg:items-center`.
- Columns: 375 = 1 (h2, lead, card). 768 = 1, card `max-w-md`. 1024 / 1440 =
  `lg:grid lg:grid-cols-12 lg:items-center lg:gap-8`; text `lg:col-span-6`, card
  `lg:col-span-5 lg:col-start-8`.
- Blocks: h2, lead, 1 white card = h3 + 1 row per active zone (parish + speed) + `CutoffNote` +
  2 links.
- Why: the home page's coverage band shows Kingston's hills with fees; this one is about
  _roots_: a Jamaican country road (the work happens on roads like these) and a single card
  that states, from live data, where we deliver. Different photo, different job, same family of
  layout so the brand stays coherent.

**Copy**

- h2 (`id="where-title"`): **Based in St. Thomas. Delivering in `{parishList}`.**
  - If `parishList` is empty: **Based in St. Thomas.**
- Lead (`text-on-dark`): `We deliver where we already run errands, so our driver knows the
roads, the stores and how to find a gate from a landmark. More parishes will come when we can
serve them properly.`
  - Note to manager: "how to find a gate from a landmark" is supported by the checkout asking
    for a landmark (`docs/demo/legal.ts` delivery section). Remove it if you judge it a claim.
- Card (`bg-surface rounded-xl p-card text-ink shadow-float`, it floats over a photo):
  - h3 `Where we deliver today` (`text-h3 text-ink`).
  - One row per active zone: `MapPin` icon (`text-crimson`) + parish (`font-semibold text-ink`)
    - right-aligned speed label (`text-small text-ink-muted`: "Same day", "Next day",
      "Scheduled", same map as home coverage). Rows `flex items-center justify-between gap-4 border-b border-line py-3 last:border-0`.
  - `CutoffNote cutoff={earliestCutoff} tone="light"` under the rows when a cut-off exists.
  - Links (stacked, `lightLink`): **Delivery areas and fees** → `/delivery`; **Family somewhere
    else in Jamaica? Tell us where** → `/contact`.
  - No zones: card shows the home coverage empty state copy ("We're not taking orders right
    now" + contact link).

**Wireframes**

```
1440
┌──────────────────────────────────────────────────────────────────────────────┐ photo + oxblood 80%
│                                                                              │
│  Based in St. Thomas.                         ┌──────────────────────────┐   │
│  Delivering in St. Thomas and Kingston.       │ Where we deliver today   │   │
│                                     (h2)      │ (pin) St. Thomas Same day│   │
│                                               │ ─────────────────────────│   │
│  We deliver where we already run errands, …   │ (pin) Kingston   Same day│   │
│                           (lead, on-dark)     │ Order by 2:00 PM …       │   │
│                                               │ Delivery areas and fees  │   │
│                                               │ Family somewhere else? … │   │
│                                               └──────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────┘

768 / 375: h2, lead, then the card full width (768: max-w-md). Photo still behind all of it.
```

**Classes:** section
`relative isolate scroll-mt-header overflow-hidden section text-on-dark on-dark-focus lg:flex lg:min-h-[560px] lg:items-center`;
photo `absolute inset-0 -z-10 rounded-none`; scrim `absolute inset-0 -z-10 bg-photo-scrim`
(after the photo in DOM). h2 `text-h2 text-balance text-on-dark`; lead `mt-4 text-lead text-on-dark`
(on-dark only on the scrim, per `PHOTOGRAPHY.md`). Card `mt-8 lg:mt-0`.

**Components**

- New: `src/components/pages/about/where.tsx`,
  `AboutWhere({ zones, parishList, earliestCutoff })`, **server**.
- Reuse: `StockPhoto`, `CutoffNote`. Move `speedLabel` from `home/coverage.tsx` to
  `src/lib/home.ts` (export) so both use one map.

**States:** links hover/focus as elsewhere; card is not interactive.

**Motion:** none. No parallax (the old page had it; it is decoration).

**Accessibility:** photo `alt=""` (the h2 names the place); all text on the photo is `on-dark`
(8.7:1 worst case per `PHOTOGRAPHY.md`); secondary text lives inside the white card.

---

### S5. Company details: "Who you're dealing with"

**Structure**

- Pattern: split two-column 7/5. Details card (description list) left, ways to reach us right.
- Background: `page`. Card `bg-surface border border-line rounded-xl` (flat, no shadow).
- Container: `section`, `mx-auto max-w-page gutter`, `id="company-details"` with
  `scroll-mt-header` (S1 links here). ~640px at 1440.
- Columns: 375 = 1 (h2, lead, card, reach). 768 = 1; inside the card the `dl` becomes 2 columns
  (`md:grid-cols-2`, name row spans both). 1024 / 1440 = `lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12`;
  header spans 12; card `lg:col-span-7`; reach `lg:col-span-5`.
- Blocks: h2, lead; card dl: 4 always-on rows + 2 hidden-until-provided rows; reach: h3 + 2–4
  contact rows + 2 buttons.
- Why: this is the screenshot-able proof that we're a real company. Putting every contact
  method beside the legal name answers "can I reach a human if something goes wrong?" in the
  same glance.

**Copy**

- h2 (`id="details-title"`): **Who you're dealing with**
- Lead: `A registered Jamaican company, and people you can reach.`
  - "registered" is supported by the "Ltd" in the registered name (BRIEF: "registered name").
- Card `dl` rows:
  | `dt`               | `dd`                                                       | Shown when                |
  | ------------------ | ---------------------------------------------------------- | ------------------------- |
  | Registered name    | `{site.company}` (`text-title`, spans both columns at md+) | always                    |
  | Based in           | St. Thomas, Jamaica                                        | always                    |
  | Delivering in      | `{parishList}`                                             | `parishList` set          |
  | Website            | `shipeastja.com` (from `site.url`, link to `/`)            | always                    |
  | TRN                | `{site.trn}`                                               | **hidden until provided** |
  | Registered address | `{site.registeredAddress}` (multi-line `<address>`)        | **hidden until provided** |
- Reach column, h3 **Talk to us** (`text-h3`), then a list (rows like the footer contact, but on
  light):
  - `Mail` icon + `{settings.email}` → `mailto:` (always).
  - `Phone` icon + `formatJamaicanPhone(settings.phone)` → `tel:` (only if set).
  - `MessageCircle` icon + `WhatsApp {formatted number}` → `https://wa.me/{digits}` (only if set).
  - One line under the list (`text-small text-ink-muted`): `Write in English or patois. If it's
about an order, include the order number.`
    - "patois" is a tone choice, not a claim; remove if the manager disagrees (§9).
  - Buttons: **Contact us** → `/contact` (`ButtonLink variant="primary"`); **Track an order** →
    `/track` (`ButtonLink variant="outline"`). Row `mt-6 flex flex-col gap-3 sm:flex-row`.
- Owner block (**hidden by default; needs Derion's approval**): when
  `SHOW_OWNER` (a `const` in `src/components/pages/about/details.tsx`, default `false`) is true,
  a row at the end of the dl: `dt` "Owner", `dd` "Derion Scarlett". Nothing else about him (no
  location, no photo, no quote) until he approves wording.

**Wireframes**

```
1440
┌──────────────────────────────────────────────────────────────────────────────┐ page
│ Who you're dealing with                                         (h2)         │
│ A registered Jamaican company, and people you can reach.        (lead)       │
│                                                                              │
│ ┌─────────────────────────────────────────────┐   Talk to us        (h3)     │
│ │ Registered name                              │   (mail) info@shipeastja.com │
│ │ ShipEast Couriers & Bearer Service Ltd       │   (phone) 1-876-…          │
│ │ ──────────────────────────────────────────── │   (wa)   WhatsApp 1-876-…  │
│ │ Based in             │ Delivering in         │   Write in English or …     │
│ │ St. Thomas, Jamaica  │ St. Thomas and Kingston│                            │
│ │ ──────────────────────────────────────────── │   [ Contact us ] [ Track an │
│ │ Website              │ (TRN, hidden)         │                    order ]  │
│ │ shipeastja.com       │                       │                             │
│ └─────────────────────────────────────────────┘                              │
└──────────────────────────────────────────────────────────────────────────────┘

768: card full width, dl 2 columns inside; "Talk to us" below the card, buttons in a row.
375: card full width, dl 1 column (dt above dd); contact rows; buttons stacked full width.
```

**Classes**

- Section: `<section id="company-details" aria-labelledby="details-title" className="scroll-mt-header section">`.
- Card: `mt-8 rounded-xl border border-line bg-surface p-card md:p-card-lg lg:col-span-7 lg:mt-10`.
- `dl`: `grid gap-x-8 md:grid-cols-2`; each row wrapper `border-b border-line py-4 last:border-0`
  (name row `md:col-span-2 pt-0`). `dt` `text-small text-ink-muted`; `dd` `mt-1 text-body font-semibold text-ink`
  (name row `text-title`, `break-words`).
- Website link: `font-semibold text-crimson underline-offset-4 hover:underline` with
  `inline-flex min-h-control items-center`.
- Reach: `mt-10 lg:col-span-5 lg:mt-10`; contact links
  `inline-flex min-h-control items-center gap-3 font-semibold text-ink hover:text-crimson break-all`
  with icon `size-icon text-crimson`, phone with `tabular-nums`.

**Components**

- New: `src/components/pages/about/details.tsx`,
  `AboutDetails({ settings, parishList }: { settings: SiteSettings; parishList: string })`, **server**.
- Reuse: `ButtonLink`, `formatJamaicanPhone`.
- Change: `src/lib/site.ts` gains `trn: null as string | null` and
  `registeredAddress: null as string | null` (typed `string | null`; comment "Hidden until
  ShipEast provides it"). Rows render only when non-empty.

**States:** links hover (colour to crimson / underline), focus ring (signal), pressed (button
translate). Missing phone / WhatsApp: rows omitted, never "Not available".

**Motion:** none.

**Accessibility:** `dl` semantics; address in `<address>`; email `break-all` so it never overflows
at 375; every link ≥ 44px tall; WhatsApp link has visible text, not icon only.

---

### S6. Closing

**Structure**

- Pattern: single contained crimson panel, text left / actions right (reuse `HomeClosing`).
- Background: `page` band, solid `crimson` panel `rounded-2xl`.
- Container: `max-w-page gutter`, `section`.
- Columns: 1 → 1 → 2 → 2 (as on home).
- Blocks: h2 "Start a basket for home", 1 line with parishes and cut-off, **Start shopping** +
  **Track an order**.
- Why: same last ask as the home page, so the brand reads as one system; contained so it never
  touches the oxblood footer.

**Components:** reuse `HomeClosing({ parishList, earliestCutoff })` from
`src/components/pages/home/closing.tsx` unchanged. Its h2 id is `closing-title`; no clash on
this page.

---

## 4. Data, rendering and performance

- `src/app/(site)/about/page.tsx` stays a **server component**:
  ```ts
  const [settings, zones] = await Promise.all([getSettings(), getActiveZones()])
  const parishList = joinParishes(zones.map((z) => z.parish))
  const cutoff = earliestCutoff(zones)
  const bankTransfer = Boolean(settings.bankTransfer.bankName)
  ```
  Both loaders are cached (as on the home page), so the whole page prerenders. No `cookies()`,
  `headers()` or `searchParams` are read, so **no Suspense boundary is needed**. If a future
  change adds a runtime read, wrap only that part in `<Suspense>`.
- Keep `metadata` (title "About ShipEast"); update the description to:
  `${site.company}: a courier and errand business in St. Thomas, Jamaica, also serving Kingston. We shop locally for families of Jamaicans abroad and deliver with photo proof.`
- **LCP:** the S1 h1 text (no hero image). The first image is S2's photo, below the fold at 375
  and beside the fold at 1440; it is lazy (no `preload`). S4's background photo is lazy, `sizes="100vw"`.
- **CLS:** every photo has an aspect class or fills an absolutely positioned box; the panel's
  `animate-rise` uses transform/opacity only.
- JS: zero client components added. `StockPhoto` is already a client component (image loader).

---

## 5. Files to add, change and delete

| Action  | File                                                                            | Notes                                                                                                       |
| ------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Rewrite | `src/app/(site)/about/page.tsx`                                                 | Data as §4; renders `AboutHero`, `AboutStory`, `AboutPromise`, `AboutWhere`, `AboutDetails`, `HomeClosing`. |
| Add     | `src/components/pages/about/hero.tsx`                                           | S1, server.                                                                                                 |
| Add     | `src/components/pages/about/story.tsx`                                          | S2, server.                                                                                                 |
| Add     | `src/components/pages/about/promise.tsx`                                        | S3, server.                                                                                                 |
| Add     | `src/components/pages/about/where.tsx`                                          | S4, server.                                                                                                 |
| Add     | `src/components/pages/about/details.tsx`                                        | S5, server; holds `SHOW_OWNER = false`.                                                                     |
| Change  | `src/lib/site.ts`                                                               | Add `trn: null`, `registeredAddress: null` (typed `string \| null`).                                        |
| Change  | `src/lib/home.ts`                                                               | Export `speedLabel` (moved from `home/coverage.tsx`); `coverage.tsx` imports it.                            |
| Change  | `src/components/pages/home/coverage.tsx`                                        | Export `overlayLink` (or move it beside `lightLink`) so S4 reuses it; behaviour unchanged.                  |
| Change  | `src/lib/photos/core.ts`, `company.ts`, `jamaica.ts`                            | `usedOn` fields per §6; `kingstonStreet` alt per §6.                                                        |
| Keep    | `src/components/pages/company/*`, `site/photo-feature.tsx`, `site/cta-band.tsx` | Still used by other pages; About simply stops importing them.                                               |
| Docs    | `docs/DESIGN-DECISIONS.md`                                                      | Dated entry: About rebuilt around the "bearer" definition; values/care bands folded into do / don't.        |

Tests: add a small render/unit test only if cheap (e.g. `AboutDetails` omits TRN/address rows
when `null`, omits phone/WhatsApp when empty). `design-tokens.test.ts` must stay green (no new
colour classes are introduced; every class above is an existing role).

---

## 6. Photo register

**No new photos.** All three slots use registry photos, checked live (HTTP 200 at `?w=200` on
November 6, 2026). No photo repeats a home page photo in the same role.

| Slot            | Key                  | Unsplash id   | URL                                                            | Size        | Photographer (username)    | Alt (final)                                                                                | Crop / position                                                                                  | `usedOn` update                                                                                                                                             |
| --------------- | -------------------- | ------------- | -------------------------------------------------------------- | ----------- | -------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S2 framed photo | `kingstonStreet`     | `9R-WAl5UGWI` | `https://images.unsplash.com/photo-1595220524884-95d1df1857a9` | 4480 × 6604 | Rock Staar (`rockstaar_`)  | **Change to:** "A man walking past street vendors on a market street in downtown Kingston" | 4:3 / 16:9 / 4:5; `position="center 35%"` keeps his face and the umbrella stall in frame         | "About, Delivery"                                                                                                                                           |
| S4 background   | `companyCountryRoad` | `cqE9f81PSY8` | `https://images.unsplash.com/photo-1780332534975-6318b3d734d7` | 5194 × 3456 | Kern Morris (`kernsway`)   | `alt=""` here (decorative; registry alt stays)                                             | cover; `position="center 55%"` (road and cars low in frame, trees fill the rest under the scrim) | "About" (unchanged)                                                                                                                                         |
| (dropped)       | `companyCoast`       | `lzecv_xfTgo` | —                                                              | —           | Kemoi Brown (`kemoibrown`) | —                                                                                          | —                                                                                                | Now unused on the site. **Delete the entry** (the credits page builds from the registry, so it drops off automatically) unless another page plan claims it. |
| (dropped)       | `jmFlag`             | `ysowLwOt-uM` | —                                                              | —           | engin akyurt               | —                                                                                          | —                                                                                                | Change to "Home" (About no longer uses it).                                                                                                                 |

Considered and rejected:

- `8U53QQiitdo` (andrzj brown, a vendor at a covered produce stall): warm and Jamaican, but it
  would read as "our store" or "our driver". No stock photo can honestly show who shops for you,
  so the page shows place and people, and a real photo of ShipEast's driver or vehicle is
  requested from Derion (§9).
- St. Thomas search results on Unsplash were Ocho Rios, Negril and Hanover. Using them under a
  "St. Thomas" heading would be a false place claim, so the page never captions a photo as St.
  Thomas.

Risk: `kingstonStreet` is also used on `/delivery`. If the Delivery redesign keeps it in a
prominent slot, swap S2 to `companyCoast` (`position="center 60%"`, alt "A rocky shore and a small
jetty on the Jamaican coast") and keep the entry instead of deleting it.

---

## 7. Self-review

### 7.1 Two passes (frontend-design)

**First pass** (what I would have done on autopilot), and what changed:

| First pass                                                                                                | Why it was generic                                                                     | Revised                                                                                                                         |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Crimson split hero with a framed coast photo (same as the home hero and every company page's `PhotoHero`) | Third crimson-text-plus-photo hero on the site; the photo says "Jamaica", nothing more | Hero is type only: the "bearer" definition panel. The bold element is the company's own name, which no competitor can copy.     |
| "Our story / Our values / Our team" three-act About with eyebrows                                         | The default About template; "team" would need invented people                          | Story (short), do / don't, where, details. No eyebrows, no team.                                                                |
| Three icon cards for values (Proof, Your money, Local team)                                               | SaaS card kit; repeated the home page's "Why" list                                     | One two-column ruled do / don't list with plain bold lead-ins. "Don't" items answer real fears (cash, barrels, surprise swaps). |
| Stats strip ("X deliveries", "Y years")                                                                   | Fake numbers; banned                                                                   | Fact strip with three true facts (based in, delivering in, proof on every order).                                               |
| Flag photo with parallax for "roots"                                                                      | Decoration plus motion without a job                                                   | Country road under a flat oxblood scrim, with live parishes from the zones table.                                               |
| Story line "grew out of a request we kept hearing from New York, Toronto and London"                      | An unprovable backstory                                                                | Replaced by the BRIEF fact: "Our driver already shops at local stores for customers who live overseas."                         |

Chanel check: removed a Jamaican-flag badge from the hero panel and a pronunciation line
(`/ˈbeə.rə/`) from the headword; both were accessories.

### 7.2 Generic defaults removed

- No eyebrows, no all-caps labels, no "01 / 02 / 03" (nothing here is a sequence), no middle-dot
  meta strings, no "→" on links, no gradient, no glass, no shadow except the one floating card
  over the photo (S4), no scroll-reveal on every section, no stats.
- The single display-size element on the page is the headword; h1 is deliberately one step down.

### 7.3 ui-ux-pro-max

- `--design-system "local courier errand service trust company about page"` returned **Trust &
  Authority + Conversion** with **Flat Design**. Kept: flat solid colour, hero with mission,
  proof, clear CTA path, "Avoid: hidden contact info" (S5 puts every contact method beside the
  legal name). **Rejected:** its blue/orange palette, Inter / Playfair Display fonts and
  logo carousel / certification badges (brand rules: crimson roles and Figtree only; we have no
  certifications or partner logos to show, and inventing them is banned).
- `--domain landing "Storytelling + Trust"`: same pattern; "Proof (logos, certs, stats)" replaced
  with honest proof (receipt + door photos, registered name, reachable contacts).
- `--domain ux` contrast and colour-only checks: every text pair below is AA; do / don't uses
  icons and headings, not colour alone.
- Pre-delivery checklist: lucide icons only; `cursor-pointer` on links/buttons (default for
  `a`/`button` in base styles); hover transitions 150ms (existing classes); light-mode contrast
  4.5:1+; visible focus; reduced motion; 375 / 768 / 1024 / 1440 checked in §8.

### 7.4 Contrast (computed)

| Pair                                                               | Ratio                        |
| ------------------------------------------------------------------ | ---------------------------- |
| blush `#FFC6D3` on crimson-deep `#7A0A23` (headword, display size) | 7.53:1                       |
| on-dark on crimson-deep                                            | 11.08:1                      |
| on-crimson-muted on crimson-deep (tie-in)                          | 8.45:1                       |
| on-crimson-muted on crimson (hero lead)                            | 5.51:1                       |
| on-dark on crimson (`noun` tag)                                    | 7.22:1                       |
| ink-muted on page / surface (dt labels)                            | 5.36:1 / 5.74:1              |
| on-dark on photo-scrim 80% (worst case)                            | 8.7:1 (per `PHOTOGRAPHY.md`) |

### 7.5 Risks

- The definition is plain English ("someone who carries something"), not a quote from a named
  dictionary, so it needs no citation. If the manager wants the Jamaican sense ("bearer" as an
  errand-runner) made explicit, the tie-in line already says "We run errands and deliver".
- `kingstonStreet` overlap with `/delivery` (see §6 fallback).
- If zones are empty, S2's "Delivering in" row, S3's item 5 and S4's parishes all hide; S1 still
  says "also serving Kingston" (company fact). Acceptable; flag if not.

---

## 8. Acceptance checklist

Check at **375, 768, 1024 and 1440**, with real photos loading, demo data and Supabase data.

**Structure**

- [ ] Order is S1 hero → S2 who we are → S3 do / don't → S4 where we work → S5 details → S6
      closing; no section from the old page remains.
- [ ] S1: split 7/5 at ≥1024; text first then panel at < 1024; panel `max-w-xl` at 768.
- [ ] S2: h2 → photo → text order at < 1024; photo left 5 cols, 4:5, at ≥ 1024.
- [ ] S3: two lists side by side at ≥ 1024, stacked below; 6 "do" items, 5 "don't" (4 with no zones).
- [ ] S4: photo fills the band edge to edge under a flat oxblood 80% layer; card right at ≥ 1024.
- [ ] S5: card 7 / reach 5 at ≥ 1024; dl 2 columns at ≥ 768; `#company-details` scrolls below the sticky header.
- [ ] S6 identical to the home page closing panel.
- [ ] No two dark bands touch (S4 has light bands on both sides; S6 is contained).

**Content and honesty**

- [ ] Company name exactly "ShipEast Couriers & Bearer Service Ltd" wherever it appears.
- [ ] No founding year, staff names, headcount, quotes, counts, ratings, logos or "PriceSmart".
- [ ] TRN, registered address and owner rows are absent from the DOM (not just hidden by CSS).
- [ ] Parishes, cut-off and speed come from `getActiveZones()`; nothing hard-coded except "based
      in St. Thomas" and S1's "also serving Kingston".
- [ ] Phone shown as `1-876-123-1234` via `formatJamaicanPhone`; cut-off via `CutoffNote` /
      `formatClockTime`.
- [ ] "bank transfer" appears in S3 only when `settings.bankTransfer.bankName` is set.

**Design system**

- [ ] Only role colour classes; `design-tokens.test.ts` green. No gradients, no eyebrows, no
      hand-set tracking. Figtree only.
- [ ] Exactly one `text-display` element (the headword). One `text-h1`.
- [ ] Only one shadow (S4 card). Cards elsewhere flat with `border-line`.

**Accessibility and behaviour**

- [ ] All targets ≥ 44px; focus visible on crimson (on-dark-focus), on the photo band and on light.
- [ ] Headings in order: h1 → h2 (S2–S6) → h3 inside. Each section labelled.
- [ ] Reduced motion: S1 panel appears without animation. No other motion on the page.
- [ ] No horizontal scroll at 375 (long email and company name wrap).
- [ ] Lighthouse accessibility 100 on the page; no console errors; no hydration warnings.

**Build**

- [ ] `npm run check` green; screenshots at 375 / 768 / 1024 / 1440 compared with the "before" page.
- [ ] `/photo-credits` lists `kingstonStreet` and `companyCountryRoad`; `companyCoast` gone (or
      kept per §6 fallback).

---

## 9. Open questions and content that needs Derion

| #   | Question                                                                                                                                                          | Default until answered                                  |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 1   | **TRN and registered address** (needs Derion).                                                                                                                    | Hidden (`site.trn`, `site.registeredAddress` = `null`). |
| 2   | **Owner mention** "Owner: Derion Scarlett" in the details card (needs Derion's approval; he lives in the USA, so no location is shown).                           | Hidden (`SHOW_OWNER = false`).                          |
| 3   | **A real photo of the ShipEast driver or vehicle** (with consent), to replace the S2 stock photo. This would be the single most trust-building asset on the page. | Stock `kingstonStreet`.                                 |
| 4   | Derion's own short story of the business, in his words (how long, how it started). Only real, approved text.                                                      | The three factual paragraphs in S2.                     |
| 5   | Manager: keep "Write in English or patois" in S5?                                                                                                                 | Keep.                                                   |
| 6   | Manager: keep "how to find a gate from a landmark" in S4's lead?                                                                                                  | Keep (checkout asks for a landmark).                    |
| 7   | Manager: bring back "cancel for a full refund until our driver starts shopping" as a sixth "do" item, or leave it to `/legal/refunds`?                            | Leave to `/legal/refunds` (linked under S3).            |
| 8   | Delivery page plan: does it keep `kingstonStreet`? If yes, About switches S2 to `companyCoast` (§6).                                                              | About uses `kingstonStreet`.                            |
