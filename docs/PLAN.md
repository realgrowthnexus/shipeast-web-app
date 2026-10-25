# ShipEast Shop & Send — master plan

Everything we build, page by page, and the order we build it in. Source of truth for every
agent. Read `docs/BRIEF.md` and `CLAUDE.md` first.

**Totals:** 42 customer-facing pages · 9 driver screens · 14 admin screens (+ admin sign-in)
· 5 outside services (PayPal, email, SMS, storage, database/auth).

---

## 1. Architecture

```
shipeastja.com  (one Next.js 16 app on Vercel, one Supabase project)
├── (site)      marketing + legal         public, static/cached
├── (shop)      catalogue + basket        public, cached catalogue reads
├── (checkout)  checkout, pay, confirm    public (guest) + signed-in
├── track/      tracking + quote          public via unguessable token
├── (auth)      sign in / up / reset      public
├── account/    my account                customer role
├── driver/     driver PWA                driver role, offline-capable
├── admin/      admin panel               admin / staff roles
└── api/        webhooks (PayPal), cron (offers, stale prices), uploads
```

- **Data:** Supabase Postgres with Row Level Security on every table. Server-side access
  through a typed data-access layer in `src/lib/data/*`. Service-role key used only in
  server code for webhooks/cron/admin mutations; never shipped to the browser.
- **Auth:** Supabase Auth (email + password, email verification, reset). `profiles.role`
  ∈ `customer | driver | staff | admin`. Guest orders have `customer_id = null` and are
  reachable only through `orders.tracking_token` (random 32+ chars).
- **Storage buckets:** `receipts` (private), `door-photos` (private), `products` (public),
  `site` (public), `driver-docs` (private). Private photos served via short-lived signed
  URLs on the tracking page.
- **Money:** all prices in **USD cents** (integers). J$ display = USD × admin-set rate,
  rounded to the nearest J$10. Totals computed **only on the server** from DB prices.
- **Order number:** `SE-` + sequence starting 10001. Customer IDs `SE-CUS-` + 6 random
  base32 chars; drivers `SE-DRV-…`.
- **Providers behind interfaces:** `PaymentProvider` (PayPal now, Stripe later),
  `SmsProvider` (Twilio), `EmailProvider` (Resend). Each has a console/no-op
  implementation used in demo mode and tests.
- **Demo mode:** if `NEXT_PUBLIC_SUPABASE_URL` is missing, reads come from
  `src/lib/demo/*` seed data and writes are disabled with a clear banner. Lets every page
  render for design review before the backend is connected.
- **Feature flags** (table `settings`, key `features`): `monthly_orders`, `auto_offers`,
  `item_requests`, `cms`, `advanced_reports`. Add-on UI is hidden when off.

### Order lifecycle (one source of truth, shared by site, driver app and admin)

Internal status → what the sender sees on the 7-stage tracker:

| Internal status | Meaning | Tracker stage |
|---|---|---|
| `awaiting_payment` | Bank transfer chosen, not yet confirmed | (before stage 1: "Waiting for your transfer") |
| `payment_failed` | Card/PayPal declined | (recovery page) |
| `paid` | Payment captured | 1 · Paid |
| `confirmed` | ShipEast checked the order and the store | 2 · Confirmed |
| `awaiting_driver` | Confirmed, no driver yet (admin filter "Pending") | 2 · Confirmed |
| `driver_assigned` | Driver accepted | 2 · Confirmed |
| `shopping` | Driver started shopping mode | 3 · Shopping |
| `shopped` | Receipt photographed (required) | 4 · Shopped |
| `out_for_delivery` | Driver left the store | 5 · Out for delivery |
| `delivered` | Door photo + receiver name captured (required) | 6 · Delivered |
| `closed` | Refunds for missing items settled, order finished | 7 · Closed |
| `cancelled`, `failed_delivery`, `refunded` | Outcomes | shown as an outcome banner |

The database enforces allowed transitions (a `transition_order()` function + trigger), so a
driver can never mark *delivered* before *shopped*, nor close without a door photo. Every
change is written to `order_events` (audit trail).

### Notifications matrix

| Event | Sender (email) | Family (SMS) | ShipEast (alert) |
|---|---|---|---|
| Order paid | receipt | — | new order |
| Bank transfer chosen | instructions + reference | — | transfer to confirm |
| Shopping started | ✓ | — | — |
| Item missing | ✓ email (+ SMS if sender gave a phone) | — | ✓ if "ask me first" |
| Shopped | receipt photo | — | — |
| Out for delivery | ✓ | "Your groceries are on the way" | — |
| Delivered | door photo | "Delivered" | — |
| Payment failed | retry link | — | ✓ |
| Unassigned for 15 min | — | — | unassigned job |
| Quote request (add-on) | quote ready | — | request waiting |

---

## 2. Design system

From the client PDFs (see `CLAUDE.md` for the token table): crimson `#AE0E31`, signal
`#E30D3B`, blush `#FFC6D3`, blush page `#F8ECF0`, ink `#2B2326`, typeface **Figtree**.
No gradients anywhere (user rule): flat brand colours only. Red blocks are solid crimson or
oxblood (`#2A0A12`), confident and large, not thin accents.

**Signature element:** the *proof pair* — a receipt card and a door-photo card shown side by
side. It is the product's promise, so it appears on the home hero, how-it-works, tracking
and order detail. Everything else stays quiet.

**UI kit (Phase 1):** Button (primary crimson, secondary blush, ghost, destructive; sm/md/lg;
loading), IconButton, Input, Textarea, Select, PhoneInput (1-876 mask), Checkbox, Radio,
SegmentedChoice (substitution rule), Badge/StatusPill (one colour per lifecycle status),
Price (USD$ + "about J$"), QuantityStepper, Card, ProductCard, BasketCard, CategoryTile,
EmptyState, Alert/Callout, Toast, Dialog, Sheet (mobile basket), Tabs, Accordion (FAQ),
Stepper/Timeline (tracking), ProofPair, Skeleton, Pagination, DataTable (admin), StatTile
(admin), Wordmark/Logo, SiteHeader, SiteFooter, CookieBanner, DemoBanner.

Breakpoints verified at **375, 768, 1024, 1440**. Motion: one orchestrated hero reveal, plus
feedback motion (add-to-basket, step complete). `prefers-reduced-motion` respected.

---

## 3. Page inventory

Legend — **Data:** where content comes from · **States:** empty/loading/error variants that
must be designed · ⓐ = add-on (feature-flagged, Phase 8).

### Part 1 · Public website — 15 pages (Phase 2)

| # | Route | Page | Sections & content | Data | States |
|---|---|---|---|---|---|
| 1 | `/` | Home | Hero ("Send groceries, not money", proof pair, Start shopping CTA, coverage line "Delivering to St. Thomas & Kingston"); how it works in 4 steps; shop by category; featured ready-made baskets; why ShipEast (proof, you choose substitutions, family installs nothing, same-day); delivery coverage at a glance; FAQ teaser; final CTA | categories, featured baskets, zones | demo banner |
| 2 | `/how-it-works` | How it works | Journey of one order (Brooklyn laptop → Kingston door), the 7 tracker stages explained, receipt + door photo explained, substitution rules, what the family receives (SMS sample), timing (same-day cut-off) | static + zones | — |
| 3 | `/delivery` | Coverage & delivery fees | Active zones (St. Thomas, Kingston) with fee, same-day/next-day, cut-off time; "coming soon" parishes; failed-delivery rules; link to delivery policy | `delivery_zones` (live from admin) | no zones |
| 4 | `/about` | About ShipEast | St. Thomas–Kingston story, courier & bearer heritage, who shops for you, trust signals, company details (name, TRN, address) | static / settings | — |
| 5 | `/faq` | Questions & answers | Grouped (Ordering, Payment, Substitutions, Delivery, Refunds, Account) searchable accordion; contact CTA | `faqs` table (seeded from Derion's list) | no results |
| 6 | `/contact` | Contact & WhatsApp | Contact form (name, email, topic, message, order no.) → email to `info@shipeastja.com` + stored; WhatsApp button; hours; email | settings | sent / error |
| 7 | `/monthly` | Monthly repeat orders | "Set up Mum's basket once" — how it works, pause/change/cancel anytime, CTA to baskets. If add-on off: explains one-tap reorder instead | flag | — |
| 8 | `/gifts` | Gifts & occasions | Christmas, birthdays, back to school, new baby — hampers + printed gift message, order-ahead date | baskets tagged by occasion | — |
| 9 | `not-found` + `/maintenance` | Not found & maintenance | Branded 404 with search + popular categories; maintenance page toggled from settings | settings | — |
| 10 | `/legal/terms` | Terms of service | Accepted at checkout; agency model (we shop on your behalf), pricing, substitutions, delivery, liability | `legal_pages` (markdown) | — |
| 11 | `/legal/privacy` | Privacy policy | Data about senders and recipients, SMS consent, processors (PayPal, Supabase, Resend, Twilio), retention, rights | same | — |
| 12 | `/legal/refunds` | Refund & cancellation | Required by card processors: cancel before shopping, refunds for missing items, failed delivery | same | — |
| 13 | `/legal/substitutions` | Substitution & out-of-stock | The three rules explained with examples | same | — |
| 14 | `/legal/delivery` | Delivery policy | Zones, cut-offs, failed deliveries, recipient not home, landmarks | same + zones | — |
| 15 | `/legal/cookies` | Cookie notice | Essential vs analytics cookies; consent banner on all pages stores choice | same | — |

Shared: header (logo, Shop, Baskets, How it works, Track order, Account, basket button with
count), footer (company name, TRN, links, legal, WhatsApp), cookie banner, SEO metadata +
Open Graph per page, JSON-LD (Organization, LocalBusiness), sitemap.xml, robots.txt.

### Part 2 · Online shop — 8 pages (Phase 3)

| # | Route | Page | Content | States |
|---|---|---|---|---|
| 16 | `/shop` | All categories | Groceries, Household, Pharmacy, Baby & Child (+ any added in admin); tile with count; featured baskets strip | no categories |
| 17 | `/shop/[category]` | Category listing | Product grid; filters (sub-category, price range, in stock), sort (popular, price ↑↓, A–Z); USD$ + "about J$"; add-to-basket from the card; pagination | empty, all out of stock |
| 18 | `/product/[slug]` | Single product | Photo, name, size, price, description, "if it's out of stock" note, quantity, add to basket, related items, last-checked date (admin only) ; SEO title + OG | out of stock, hidden → 404 |
| 19 | `/baskets` | Ready-made baskets | Family Food Basket, Baby Care Pack, Pharmacy Pack, Back to School, Christmas Hamper | none |
| 20 | `/baskets/[slug]` | Single basket | Items inside with quantities, one price (and savings vs separate), optional gift message, add to basket, "send this every month" ⓐ | item out of stock |
| 21 | `/search` | Search results | Products + baskets, query highlighting, filters; "Can't find it? Request it" ⓐ (or WhatsApp us when flag off) | no results |
| 22 | `/request` ⓐ | Request something not listed | Item, brand/size, quantity, store preference, budget, recipient parish, contact → admin quotes. Flag off → page explains how to WhatsApp a request | sent |
| 23 | `/basket` | Basket | Lines with stepper/remove, delivery parish selector → fee, promo code, totals in USD$ (+ J$), gift message, minimum order check, checkout CTA; mobile sticky summary | empty, zone closed, below minimum |

Basket persists in a signed cookie for guests, synced to `carts` for signed-in senders.

### Part 3 · Checkout, tracking & accounts — 19 pages (Phases 4–5)

**Checkout & payment (5) — Phase 4**

| # | Route | Page | Content |
|---|---|---|---|
| 24 | `/checkout` | Checkout | 1 Who is receiving it (name, 1-876 phone, street, community, parish, **nearby landmark**, delivery notes, save to address book); 2 Delivery & substitutions (date: same-day if before cut-off / next day; rule: *Allow similar* / *Ask me first* / *Leave it out & refund*; gift message); 3 Sender (email + phone for guests, or signed-in); 4 Payment method (PayPal / Card via PayPal / Bank transfer); terms checkbox; order summary |
| 25 | `/checkout/pay/[orderRef]` | Card & PayPal payment | PayPal Smart Buttons + card fields (guest card), USD$ total, secure badge; server creates and captures the PayPal order; webhook confirms |
| 26 | `/checkout/bank-transfer/[orderRef]` | Bank transfer | Bank details, exact USD amount, reference = order number, "we'll start shopping once it lands", deadline (48h), email copy |
| 27 | `/order/[orderRef]/confirmed` | Order confirmed | Thank-you, order number, what happens next, tracking link to share with family, create-account offer for guests |
| 28 | `/order/[orderRef]/payment-failed` | Payment failed — try again | Reason in plain words, retry with PayPal/card, switch to bank transfer, basket kept |

**Tracking (3) — Phase 4**

| # | Route | Page | Content |
|---|---|---|---|
| 29 | `/track` + `/track/[token]` | Track order | Lookup form (order no. + email); live 7-stage timeline with times, recipient + parish, driver first name, items with found/substituted/missing, receipt + door photo slots, "Send this basket again" ; no login, shareable; auto-refresh |
| 30 | `/track/[token]/photos` | Receipt & door photos | Full-size store receipt and door photo, receiver name, time; download |
| 31 | `/quote/[token]` ⓐ | Quote for a requested item | Item, quoted price, fees, expiry; pay in one click |

**Sign in (3 flows / 5 routes) — Phase 5**

| # | Route | Page |
|---|---|---|
| 32 | `/signin`, `/signup` | Sign in and create account (also offered after a guest order — links the guest order) |
| 33 | `/forgot-password`, `/reset-password` | Forgot / reset password |
| 34 | `/verify-email` | Email verification |

**My account (8) — Phase 5**

| # | Route | Page |
|---|---|---|
| 35 | `/account` | Account home — greeting, active order card, quick reorder, family addresses summary |
| 36 | `/account/orders` | My orders — active / past tabs, status pills |
| 37 | `/account/orders/[orderRef]` | Order detail — timeline, proof pair, items, totals, **reorder in one tap**, receipt download |
| 38 | `/account/addresses` | Saved family addresses — add, edit, label ("Mum — Morant Bay"), default, landmark |
| 39 | `/account/addresses/[id]` | Address editor (add/edit form, also used as `/new`) |
| 40 | `/account/monthly` ⓐ | Monthly repeat orders — set up, pause, change, skip, cancel |
| 41 | `/account/payment-methods` | Saved payment methods (PayPal vault when add-on on; otherwise explains PayPal remembers you) |
| 42 | `/account/profile` | Profile & settings — name, email, phone, password, email/SMS preferences, delete account |

### Part 4 · Driver app — 9 screens (Phase 6)

Installable PWA at `/driver` (manifest, icons, service worker). Big tick targets, high
contrast for sunlight, works offline (job list cached; photo uploads and status changes
queued in IndexedDB and replayed). Server enforces step order.

| # | Route | Screen |
|---|---|---|
| D1 | `/driver/signin` | Sign in (driver accounts are created by admin) |
| D2 | `/driver` | Today's jobs — online/offline toggle, "Online since 9:12 AM", active job card, upcoming |
| D3 | `/driver/offer/[jobId]` | New job offer — countdown ring (default 3:00), zone, item count, parish, accept/decline |
| D4 | `/driver/jobs/[jobId]` | Job detail — shopping list, recipient, landmark, map link, call recipient, substitution rule |
| D5 | `/driver/jobs/[jobId]/shop` | Shopping mode — tick item by item, flag "not on the shelf" (applies sender's rule; "ask me" pings admin/sender), progress "3 of 6" |
| D6 | `/driver/jobs/[jobId]/receipt` | Photograph the receipt — camera capture, retake, upload (queued offline), enter receipt total |
| D7 | `/driver/jobs/[jobId]/deliver` | Out for delivery — navigate (Google Maps link), call / WhatsApp recipient, family gets SMS |
| D8 | `/driver/jobs/[jobId]/proof` | Proof of delivery — door photo + who received it; failed-delivery path with reason |
| D9 | `/driver/earnings` | Earnings & job history — today / week, "Earnings due", past deliveries ("Morant Bay, St. Thomas") |

### Part 5 · Admin panel — 14 screens (Phase 7)

Same visual language as the client's other admin panel (crimson sidebar, white work area),
built fresh. Roles: `admin` (everything), `staff` (orders, drivers, customers — no settings,
prices or refunds).

| # | Route | Screen |
|---|---|---|
| A0 | `/admin/signin` | Admin sign in |
| A1 | `/admin` | Dashboard — orders today, money in today (USD$), shopping now, unassigned, transfers to confirm; **Action needed** list (unassigned 15 min, delayed, payment failed, ask-me-first waiting, transfer pending); recent orders (compact two-line rows) |
| A2 | `/admin/orders` | Orders — status tabs with counts, filters (status, zone, driver, date, payment method), sort newest/oldest, search |
| A3 | `/admin/orders/[orderRef]` | Order detail — timeline, assign/reassign driver, confirm bank transfer, adjust items, refund (full/partial via PayPal), proof photos, notes, audit log |
| A4 | `/admin/requests` ⓐ | Custom requests — New → Reviewing → Quote sent → Accepted/Declined/Expired; price & send quote |
| A5 | `/admin/products` | Products — list, add, edit, hide, out of stock, photo upload, SEO fields |
| A6 | `/admin/prices` | Prices — bulk edit grid, "last checked" date, stale flag (older than N days or flagged by a driver at the till) |
| A7 | `/admin/catalogue` | Categories and baskets — create, order, basket contents & price |
| A8 | `/admin/promos` | Promo codes — amount or %, start/end, global max uses + uses per customer, min order, scope, pause/end, usage |
| A9 | `/admin/drivers` | Drivers — add, deactivate, zones, status (Available / On delivery / Offline), documents with expiry flags, SE-DRV id |
| A10 | `/admin/zones` | Delivery zones & fees — parish, active, fee, same/next-day, cut-off, minimum order |
| A11 | `/admin/customers` | Customers — list, SE-CUS id, orders, spend, last order, tags (Diaspora, VIP manual, Frequent Buyer…), detail drawer |
| A12 | `/admin/monthly` ⓐ | Monthly repeat orders — all active plans, next charge, failures |
| A13 | `/admin/content` ⓐ | Website content — edit page text, images, FAQs, legal pages (when off: FAQs + legal only) |
| A14 | `/admin/reports` + `/admin/settings` | Reports (basic: revenue by day, orders by zone; advanced ⓐ) and Settings (exchange rate, offer timer, bank details, contact info, feature flags, maintenance mode, staff users) |

---

## 4. Database (Supabase) — tables

`profiles` (id → auth.users, role, public_id SE-CUS/SE-DRV, full_name, phone, email prefs) ·
`addresses` (owner, label, recipient_name, phone, street, community, parish, landmark,
notes, is_default) · `delivery_zones` (parish, name, active, fee_cents, speed, cutoff_time,
min_order_cents, sort) · `categories` · `products` (slug, name, size, description, price_cents,
status visible/hidden/out_of_stock, image_path, price_checked_at, price_flagged, seo) ·
`baskets` + `basket_items` · `carts` + `cart_items` · `promo_codes` + `promo_redemptions` ·
`orders` (order_no, tracking_token, customer_id null for guests, sender contact, recipient
snapshot, zone, substitution_rule, gift_message, delivery_date, totals, payment_method,
payment_status, status, driver_id, timestamps) · `order_items` (snapshot of name/price,
qty, found/substituted/missing, substitute note) · `order_events` (audit) · `payments`
(provider, provider_ref, amount, status, raw) · `order_photos` (receipt/door, storage path,
receiver_name) · `drivers` (profile, vehicle, plate, zones, status, online_since, documents
expiry) · `job_offers` (order, driver, expires_at, response) · `notifications_log` ·
`contact_messages` · `faqs` · `legal_pages` · `site_content` · `settings` ·
`item_requests` + `quotes` ⓐ · `subscriptions` ⓐ · `admin_alerts`.

RLS: customers see their own rows; guests read an order only through a security-definer
RPC taking the tracking token; drivers see orders assigned/offered to them; staff/admin
via role checks; catalogue tables are world-readable for visible rows only.

SQL ships as numbered migrations in `supabase/migrations/` with a run-order checklist in
`docs/SQL-RUNBOOK.md` for Touseef to paste into the Supabase SQL editor.

---

## 5. Phases

Every phase runs the same loop: **Design agent** (UI/UX, frontend-design + ui-ux-pro-max
skills) → **Developer agent** (implementation + tests) → **Verify** (typecheck, lint, unit
tests, production build, Playwright screenshots at 375/768/1440, accessibility spot
checks) → **Fix** → commit + push → next phase.

| Phase | Name | Delivers | Exit criteria |
|---|---|---|---|
| 0 | Foundation | Plan, brief, rules, Next 16 scaffold, skills, tokens, formatters, demo data, full SQL schema + runbook, CI scripts | build green, SQL reviewed |
| 1 | Design system | UI kit (section 2), header/footer, `/styleguide` (dev-only) showcasing every component and the colour/type scale | every component screenshot-reviewed at 3 widths |
| 2 | Public website | Pages 1–15, SEO, sitemap, cookie consent | all 15 pages reviewed, Lighthouse a11y ≥ 95 |
| 3 | Online shop | Pages 16–23, basket logic, catalogue data layer, seed catalogue | add → basket → totals correct in tests |
| 4 | Checkout & tracking | Pages 24–31, PayPal provider, bank transfer, order creation, webhook, tracking, emails + SMS providers | sandbox order end to end in tests (mocked provider) |
| 5 | Accounts | Pages 32–42, Supabase auth, address book, reorder, guest-order linking | auth flows tested |
| 6 | Driver PWA | D1–D9, offers, step enforcement, photo uploads, offline queue, manifest | full job flow tested, offline replay tested |
| 7 | Admin panel | A0–A14, manual assignment, bank-transfer confirm, refunds, prices, zones, reports | admin flows tested, role checks tested |
| 8 | Add-ons (if bought) | Monthly orders, auto offers, item requests, CMS, advanced reports — behind flags | each flag on/off tested |
| 9 | Hardening & launch | Security review, RLS audit, E2E journey (sender → driver → admin), performance, docs for admin, env + DNS runbook for shipeastja.com | launch checklist signed off |

---

## 6. What Touseef needs to provide (later)

1. Supabase project → run migrations from `docs/SQL-RUNBOOK.md`; env
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
2. Vercel project linked to this repo; domain `shipeastja.com` (DNS from Hostinger).
3. PayPal REST app (client id/secret, webhook id) under ShipEast's business PayPal.
4. Resend (verify `shipeastja.com`), Twilio (number able to SMS Jamaica).
5. Content from Derion (see `docs/BRIEF.md` → Open items).
