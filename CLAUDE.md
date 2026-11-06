@AGENTS.md

# ShipEast Shop & Send — project rules

Read `docs/PLAN.md` (what we build, page by page, phase by phase) and `docs/BRIEF.md`
(client, business model, decisions) before doing any work.

## This project is standalone — never mix it up

Shop & Send is a **standalone web app** with its **own Supabase database**, its own driver
app (a PWA inside this repo) and its own admin panel (inside this repo).

It is **NOT** the ShipEast Flutter/Firebase delivery app (customer app, driver APK,
restaurants/merchants, Firebase project `shipeast-1a1f6`, `admin.shipeastja.com`,
`employee.shipeastja.com`). Never import, reference, link to or reuse anything from that
project: no Firebase, no restaurants/menus/merchants, no cash on delivery, no
`admin.shipeastja.com` links.

## What the product is (one paragraph)

A Jamaican living overseas opens shipeastja.com, fills a basket with groceries, household
goods, pharmacy or baby items, and pays in US dollars. A ShipEast driver in Jamaica buys the
items at a local store (often PriceSmart), photographs the till receipt, and delivers to the
family's door with a photo at the door. Nothing is shipped; only the money crosses the border.
The family in Jamaica installs nothing — they get SMS. The sender gets email + a tracking link.

## Stack

- Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, `src/` dir.
- **Next 16 differs from older Next.** Read `node_modules/next/dist/docs/` before using an
  API. Cache Components is ON (`cacheComponents: true`): runtime reads (`cookies()`,
  `headers()`, `searchParams`, `params` without `generateStaticParams`, uncached DB reads)
  must sit inside `<Suspense>`; use `'use cache'` + `cacheLife()` for cacheable data.
  Middleware is now `src/proxy.ts`.
- Supabase (Postgres + Auth + Storage + RLS) via `@supabase/ssr`. SQL lives in
  `supabase/migrations/NNNN_name.sql`; the user runs it by hand in the Supabase SQL editor,
  so every migration must be idempotent-safe to read and listed in `docs/SQL-RUNBOOK.md`.
- Hosting: Vercel. Domain: **shipeastja.com** (site at root, driver app at `/driver`,
  admin at `/admin`).
- Payments: PayPal (wallet + guest debit/credit card) and bank transfer (confirmed by
  admin). Stripe was rejected for the client — keep payments behind a provider interface.
- Email: Resend. SMS: Twilio (provider interface). Icons: `lucide-react` only, never emoji.
- **Demo mode:** when Supabase env vars are missing the app must still run, reading
  `src/lib/demo/` seed data, so every page can be viewed and screenshotted.

## Brand & design system (from the client PDFs — do not invent new brand colours)

Tokens live in `src/app/globals.css`; every value is listed in `docs/TOKENS.md`, how to use
them in `docs/DESIGN-SYSTEM.md`, and they are live at `/styleguide`. Three layers: primitive
ramps (make no classes) → **roles** (the only colour classes; Tailwind's default palette,
white and black included, is off) → components. Use roles, never raw hex.
`src/lib/design-tokens.test.ts` fails on any colour class that isn't a role.

| Role                            | Hex                               | Use                                                        |
| ------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| crimson                         | `#AE0E31`                         | primary action, header bar, brand blocks, links            |
| crimson-deep                    | `#7A0A23`                         | hover/pressed, panels inside a crimson band                |
| oxblood                         | `#4A0B1C`                         | "red mixed with black": dark panels and bands              |
| signal                          | `#E30D3B`                         | focus ring, live dot, big numerals (never text under 24px) |
| blush                           | `#FFC6D3`                         | "East" in wordmark, text/icons on crimson (never on light) |
| page                            | `#F7F7F7`                         | page background (pure neutral grey-white)                  |
| surface                         | `#FFFFFF`                         | cards, inputs, panels, menus                               |
| surface-muted / surface-strong  | `#F0F0F0` / `#E5E5E5`             | quiet fills, hover, placeholders / hover on a muted fill   |
| surface-selected                | `#FFE8EE`                         | chosen option, current item, search marks                  |
| line / line-hover / line-strong | `#E5E5E5` / `#D1D1D1` / `#858585` | dividers / card hover border / form control borders (3:1)  |
| ink / ink-body / ink-muted      | `#2B2326` / `#474747` / `#666666` | headings / paragraphs / help text                          |
| on-dark / on-crimson-muted      | `#FFFFFF` / `#F3DBE0`             | text on crimson/oxblood/ink / secondary text on crimson    |

- Type: use the named scale only (`text-display`, `text-numeral`, `text-h1`, `text-h2`,
  `text-title`, `text-h3`, `text-lead`, `text-body`, `text-small`, `text-xs` for pills,
  `eyebrow`). One modular scale (1.2 → 1.3). Never set `tracking-*` by hand. The eyebrow is
  sentence case, never uppercase.
- Spacing: 4px grid. Sections use `section-sm` / `section` / `section-lg`, cards `p-card` /
  `p-card-lg`, page sides `gutter`. Touch targets `h-control` / `size-control` (44px),
  icons `size-icon`. Layers `z-raised` / `z-sticky` / `z-header` / `z-overlay`.
  Corners: 4 / 8 / 12 / 16 / 24px. Cards are flat; only floating layers get a shadow.
- Typeface: **Figtree** (the PDFs' font) via `next/font/google`, weights 400–900.
  Headlines 800–900 with tight tracking; body 400/500.
- **No gradients of any kind** (user rule): flat brand colours only, no gloss. Red feels
  premium through large solid crimson/oxblood blocks, spacing and heavy type, never pinkish
  red. Red must stand out — not a white app with red buttons.
- Accessibility floor: WCAG AA contrast, visible focus, 44px touch targets, reduced motion,
  works at 375px.

## Client formatting rules (non-negotiable, from Derion)

- Company name everywhere: **ShipEast Couriers & Bearer Service Ltd** (Service, singular).
- Money: US dollars shown as `USD$31.50`; Jamaican dollars as `J$3,100` (no decimals).
  Always use `src/lib/format.ts` — never format money inline.
- Dates: `July 31, 2026`. Times: `9:12 AM`.
- Phone: `1-876-123-1234`. Names in Title Case (`Chris Brown`). Use "Groceries", not "Grocery".
- IDs: customers `SE-CUS-XXXXXX`, drivers `SE-DRV-XXXXXX` (random, never sequential).
  Orders `SE-10428`. IDs never change when a name/email/phone changes.
- Coverage at launch: **St. Thomas and Kingston only**; zones are admin-configurable.
- Statuses are specific; "Pending" is only a broad admin filter, never a customer status.
- Never show fake numbers. If a metric isn't tracked yet, hide it.

## Working rules

- Small, typed, server-first components. Client components only for interactivity.
- Validate every input with zod on the server. Never trust the client for prices/totals.
- Every phase ends with: `npm run typecheck && npm run lint && npm test && npm run build`,
  plus Playwright screenshots at 375 / 768 / 1440 px reviewed against the design. Fix, then
  move on.
- Copy: plain, warm, specific, sentence case. Write from the sender's point of view.
