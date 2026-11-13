# Handoff: ShipEast Shop & Send

The complete state of the project, for whoever picks it up next: a new Claude session, another
agent or a developer. Last updated **November 7, 2026**, at `main` after PR #28.

Read in this order: `docs/BRAIN.md` (the owner's standing rules) → this file → `CLAUDE.md`
→ `docs/PLAN.md` and `docs/BRIEF.md`.

---

## 1. What exists today

Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 and Supabase. It runs in
**demo mode** on `src/lib/demo/*` seed data until the Supabase keys are set.

### Phases (from `docs/PLAN.md`)

| Phase | What                                      | State                                                     |
| ----- | ----------------------------------------- | --------------------------------------------------------- |
| 0     | Foundation, schema, demo data             | Done                                                      |
| 1     | Design system                             | Done, rebuilt November 6 (role tokens, pure neutral base) |
| 2     | Public website (15 pages)                 | Done                                                      |
| 3     | Online shop                               | Done; `/shop` rebuilt as a big-mart listing November 7    |
| 4     | Checkout, PayPal, bank transfer, tracking | Done                                                      |
| 5     | Accounts                                  | Done                                                      |
| 6     | Driver PWA (`/driver`)                    | **Not started**                                           |
| 7     | Admin panel (`/admin`)                    | **Not started**                                           |
| 8     | Add-ons (feature-flagged)                 | Not started                                               |
| 9     | Hardening and launch                      | Not started                                               |

### Pages redesigned in the owner's new direction (PRs #20–#27)

| Route                       | What it is now                                                                                                                                                                                                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header (all pages)          | Light: white bar, ink nav with a crimson current tab, crimson basket pill, 44px search, dialog menu on phones                                                                                                                                             |
| Footer (all pages)          | Oxblood, four columns, then a payments line and a legal line                                                                                                                                                                                              |
| `/`                         | Hero: a centred statement on crimson above a full-width photo, with the printed example receipt across the seam. Then steps, departments, baskets, the oxblood proof band, why us, the Kingston coverage band under an overlay, questions, closing        |
| `/shop`, `/shop/[category]` | Big-mart listing: department tabs band, edge strip, sticky filter sidebar (find, department, aisle, price, availability with real counts), sort, chips, a 2/3/3/4 grid with unit prices and an Add-to-stepper, basket tile, load more, phone filter sheet |
| `/baskets`                  | A photo under `photo-scrim`, with the crimson price board overlapping it; one card per basket showing every item and its real saving                                                                                                                      |
| `/how-it-works`             | A full photo under `photo-scrim-ink`, with a tracker card and an "On this page" bar; the two-lane order day; proof, substitution rules, family texts, timing and "nobody home"                                                                            |
| `/about`                    | Type-only "bearer" dictionary entry on oxblood (`text-poster`); who we are, what we do and don't do, where, company details                                                                                                                               |

### Pages NOT yet redesigned

These already use the new tokens, header and footer, but keep their older layouts: `/delivery`,
`/gifts`, `/faq`, `/contact`, `/monthly`, `/request`, `/search`, `/product/[slug]`,
`/baskets/[slug]`, `/basket`, `/checkout` and its sub-pages, `/order/*`, `/track/*`, the
sign-in pages, `/account/*`, `/legal/*`, `/photo-credits`, `/maintenance`. Redesigning them is
the natural next design work. Follow the BRAIN workflow, and give each hero its own
structure.

## 2. Where the decisions live

| Topic                                                             | File                                                                                                                           |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Owner's standing rules and workflow                               | `docs/BRAIN.md`                                                                                                                |
| Client, business model                                            | `docs/BRIEF.md`                                                                                                                |
| What to build, phase by phase                                     | `docs/PLAN.md`                                                                                                                 |
| Every token value (colour roles, type, spacing, motion, overlays) | `docs/TOKENS.md` (live at `/styleguide`)                                                                                       |
| How to use the tokens and components                              | `docs/DESIGN-SYSTEM.md`                                                                                                        |
| Dated log of design choices and why                               | `docs/DESIGN-DECISIONS.md`                                                                                                     |
| Photo rules and registry                                          | `docs/PHOTOGRAPHY.md`, `src/lib/photos/*.ts`                                                                                   |
| SQL migrations, in run order                                      | `docs/SQL-RUNBOOK.md`                                                                                                          |
| Approved plans (history, already built)                           | `docs/home-redesign/PLAN.md`, `docs/pages-redesign/*.md` (+ `APPROVAL.md`), `docs/heroes/PLAN.md`, `docs/shop-listing/PLAN.md` |

## 3. Waiting on the owner or the client

1. **Run migration `supabase/migrations/0013_product_aisles.sql`** in the Supabase SQL editor
   (see `docs/SQL-RUNBOOK.md`). Until it runs, the aisle filter hides itself.
2. **Fix GitHub Actions** (owner): every CI run fails in about 2 seconds with `runner_id: 0`,
   meaning no runner is assigned. It is an account setting under Settings → Actions or
   Billing, not a code problem. Until it is fixed, run `npm run check` locally and post the
   result on each PR.
3. **From Derion (the client):**
   - confirm the 14 aisle names
   - real product photos (several items show type placeholders)
   - a consented photo of the driver or vehicle (for `/about`)
   - the real SMS wording
   - Sunday and holiday delivery rules
   - the TRN and registered address (hidden until provided)
   - the owner row on `/about` (`SHOW_OWNER = false` until he approves)
   - whether the Christmas Hamper should be buyable this season (the home page hides
     baskets with an unavailable item, so it no longer shows there)
   - the Facebook page link (Instagram and TikTok are in the home footer)
   - the delivery policy (`src/lib/demo/legal.ts`) still promises same-day delivery; it needs
     the softer "we aim to" wording when the legal pages are redone
4. **Later services** (from `docs/PLAN.md` §6): connect Supabase, Vercel and the domain, the
   PayPal REST app, Resend and Twilio.

## 4. Known limitations, accepted on purpose

- **`/shop` without JavaScript:** the listing streams inside Suspense (Cache Components), so
  a visitor with JavaScript off sees the skeleton plus a note linking to `/baskets`. Senders
  use modern browsers, and search engines render JavaScript.
- **Basket quantity:** the server action accepts 0–99, but the stored quantity is capped by
  the basket's `MAX_QUANTITY` (20).
- **No "in a ready-made basket" filter** on the shop. It barely narrows anything, since 15 of
  the 22 products are in a basket.

## 5. Follow-ups (not blocking)

- **Groceries tile photo:** `pantry` isn't Caribbean; swap it for a Jamaican kitchen or
  market shot.
- **Lighthouse:** run it on mobile against the Vercel preview (LCP, CLS, accessibility).
- **New product card everywhere:** use it on the product page, gifts and basket detail.
- **`/search`:** could reuse the shop listing layout.
- **Unused code:** `shelfIsReady` and `MIN_PHOTOGRAPHED` are unused leftovers.

## 6. How to work in this repo (lessons from these sessions)

### Run and check

```bash
npm install
npm run check          # typecheck, lint, tests and production build: must be green
npm run build && npx next start -p 3100
node scripts/screenshots.mjs /tmp/shots "/,/shop" "375,768,1024,1440"
```

- **Stale pages after a rebuild:** if `next start` was running during a rebuild, delete
  `.next/server/route-cache` before taking screenshots, or stale chunks get served.
- **Consent cookie:** it is called `se_consent`. The screenshot script sets it, so the
  cookie banner stays hidden.
- **Real photos:** they load only on the cloud environment `shipeast-web-app`, which allows
  `images.unsplash.com` and `api.unsplash.com`.
- **Token guard:** only role colour classes exist (Tailwind's default palette is switched
  off). `src/lib/design-tokens.test.ts` fails on any other colour class, raw hex, gradient
  or text under 12px.
- **Recording photo downloads:** new Unsplash photos need their download recorded through
  the Unsplash MCP `download_asset` tool before they go into the registry.

### Git and PRs

- **Branch:** work on the session's designated branch (here `claude/great-maxwell-qejgto`)
  and never force-push.
- **The owner merges ready PRs within minutes.** So:
  - Never push half-built code to a PR; commit only once `npm run check` is green.
  - Before pushing, check whether the last PR has merged. If it has, bring the branch up to
    date with `git merge --ff-only origin/main` (or restart the branch from `origin/main`
    when the working tree is clean), then open a new draft PR.
  - Fast-forwarding keeps uncommitted work intact; `checkout -B` over a dirty tree is
    riskier.
- **When a push lost a race with a merge:** merge `origin/<branch>` back in rather than
  rewriting history.

### Workflow

Run the BRAIN §4 workflow for any sizeable task:

1. **Design agent:** writes a structure-first plan.
2. **Manager approval:** amendments go at the top of the plan file.
3. **Development agent:** builds the plan in a set order, with `npm run check` after each part.
4. **Manager QA:** screenshots at four widths, then the manager fixes what's wrong.

Agents can hit the usage limit mid-run. Their files survive, so check what's on disk before
re-running anything.
