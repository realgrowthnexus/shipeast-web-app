# Design system

How the ShipEast Shop & Send interface is put together. Every value it uses is listed in
`docs/TOKENS.md`; `/styleguide` shows each token and component live; the choices behind
page layouts are logged in `docs/DESIGN-DECISIONS.md`.

## Principles

1. **The crimson carries the brand.** Everything else is neutral: a grey-white page, white
   cards, near-black ink. Crimson appears as a few large, solid blocks (the first band of each
   page, the main action, the proof band, a closing panel), not as tints spread everywhere. That
   contrast is what makes the red look premium rather than pink.
2. **Flat colour, no gradients.** Depth comes from oxblood blocks, photography and a few
   shadows on floating layers. Cards are flat.
3. **Proof is the signature.** The _proof pair_ (a receipt card beside a door-photo card) is
   the product's promise. It appears on the home page, how-it-works, tracking and order
   detail. Everything around it stays quiet.
4. **Heavy type does the work.** Figtree 800–900 for headings, tight and large; 400 for
   reading. The type scale, not decoration, sets the hierarchy.
5. **Built for a sender on a phone.** 44px touch targets, WCAG AA contrast, visible focus,
   reduced motion respected, and every page works at 375px.
6. **Only true claims.** No invented testimonials, ratings, order counts or "trusted by"
   logos. Use the promises we keep on every order instead.

## Using tokens

- Components use **role** classes only (`bg-surface`, `text-ink-muted`, `border-line-strong`).
  The primitive ramps can't be used: they make no classes.
- Choose by job: a hover fill is `surface-muted`, a chosen option is `surface-selected`, even
  when two roles happen to look alike.
- Money, dates and phone numbers always go through `src/lib/format.ts`.
- Icons: `lucide-react` only, never emoji. `size-icon` (20px) in buttons and lists. Crimson on
  light surfaces, blush or `on-dark` on crimson. Decorative icons get `aria-hidden`.

## Components

All in `src/components/ui/` unless noted. Use them before writing new markup.

| Component                                                       | Rules                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`, `ButtonLink`                                          | Variants: `primary` (one per view), `secondary`, `outline`, `ghost`, `dark`, `onDark`, `destructive`. Sizes `sm`, `md` (44px), `lg` (52px). `loading` shows a spinner and blocks clicks. The label says what happens ("Pay USD$31.50", not "Submit"). |
| `IconButton`                                                    | 44px square, `label` required for screen readers.                                                                                                                                                                                                     |
| `Field` + `Input`, `Select`, `Textarea`, `PhoneInput`           | `surface` fill, `border-control` in `line-strong`, crimson border and ring on focus, `danger` border on error. Label above; help and errors below, linked with `describedBy`.                                                                         |
| `Checkbox`, `ChoiceGroup`                                       | Choice cards: chosen = `surface-selected`, crimson border and ring.                                                                                                                                                                                   |
| `Badge`, `StatusPill`                                           | One tone per lifecycle status (`src/lib/order-status.ts`). Status colours only.                                                                                                                                                                       |
| `Price`                                                         | USD$ first, "about J$" below. Never formats inline.                                                                                                                                                                                                   |
| `QuantityStepper`                                               | 44px buttons, the number between them.                                                                                                                                                                                                                |
| `Card`, `EmptyState`, `Skeleton`                                | Flat `surface` card with a `line` border. Empty states say what to do next.                                                                                                                                                                           |
| `Alert`                                                         | Status tint, line and icon; the message says what happened and how to fix it.                                                                                                                                                                         |
| `Dialog`                                                        | `surface`, `rounded-lg`, `shadow-float`, `scrim` behind. `variant="sheet"` slides up from the bottom below 640px (`sheet-bottom`); `bodyClassName` sets the body's height. The title id is unique per dialog.                                         |
| `Tabs`, `Accordion`, `Pagination`                               | Current item in `crimson`; hover `surface-muted`.                                                                                                                                                                                                     |
| `ProofPair`, `TrackingTimeline` (`components/order`)            | The signature blocks. Don't restyle them per page.                                                                                                                                                                                                    |
| `ProductCard`, `BasketCard`, `CategoryTile` (`components/shop`) | `hover-lift`; the Add button sits on `z-raised` above the card link.                                                                                                                                                                                  |
| `SearchBox` (`components/shop`)                                 | GET form to `/search`. `tone="onDark"` for a white field on crimson (blush focus ring); `compact` is the header pill: a 52px field with a `line-strong` border on the light bar. The submit button is 44px tall in both.                              |
| `DataTable`, `StatTile` (`components/admin`)                    | Admin only. Never show a metric that isn't tracked.                                                                                                                                                                                                   |

## Page building blocks

In `src/components/site/` and `src/components/motion/`:

- **`Section`** (`tone`: `page`, `surface`, `muted`, `crimson`, `oxblood`; `size`; `wide`) is
  one band of the page. Alternate `page` and `surface` so sections read as separate
  chapters. Never put two crimson or oxblood bands next to each other.
- **`SectionHeader`** gives an optional eyebrow, the title, a lead and an optional action link.
- **`PhotoFeature`** puts a photo beside text, with an optional parallax.
- **`CtaBand`** is the wide closing crimson panel with a photo and one main action (older
  pages).
- **`ClosingPanel`** (`site/closing-panel.tsx`) is the contained crimson closing panel on the
  page band: h2, one line, one `onDark` button and one text link. It never touches the oxblood
  footer. `HomeClosing` (home, How it works, About) and `/baskets` are built on it.
- **Link styles** (`site/links.ts`): `lightLink` on `page` / `surface`, `onDarkLink` (blush
  underline) on crimson and oxblood, `overlayLink` (white underline) on a photo under
  `photo-scrim`. Import them; never copy the class string.
- **`CutoffNote`** says "Order by 1:00 PM Jamaica time for delivery today." from the server
  and adds the visitor's own time and countdown after mount (`tone`: `light`, `onDark`,
  `onPhoto`).
- **`HomeQuestions`** and **`HomeClosing`** (`pages/home/`) are reused as they are by How it
  works and About. `SmsPreview` and `ProofPair` (`components/order`) are the shared drawn
  proof. `OutcomeTag` (`order/item-outcome.tsx`) is the bought / swapped / not-in-stock tag the
  tracker shows; How it works shows the same tag.
- **`SavingTag`** (`shop/saving-tag.tsx`) is the gold "Save USD$10.20" tag on every basket
  card and the baskets price board.
- **`StockPhoto`** shows a photo from the registry (`docs/PHOTOGRAPHY.md`); add `zoom` inside
  card links. `imgClassName` puts classes on the image itself, for responsive crops
  (`object-[25%_30%] md:object-[50%_30%]`); when set, the registry's inline `position` is not
  applied. `StockImage` also takes `eager` and `priority` (the first row of a product grid).
- **`ProductImage`** `placeholder="label"` (the shop listing) shows a type-led shelf tag when
  there is no photo: the department icon, the name in heavy type and the size, decorative
  (`aria-hidden`) because the name is the card's link right below.
- **`Reveal`**, **`Stagger`** / **`StaggerItem`** and **`Parallax`** handle motion. The rules
  are in `docs/TOKENS.md` → Motion. The home page and the four redesigned pages (`/shop`,
  `/baskets`, `/how-it-works`, `/about`) use none of them: one CSS `animate-rise` moment each.

Page components for the redesigned pages live in `src/components/pages/<page>/`
(`how-it-works`, `baskets`, `shop`, `about`), one file per section, all server components.

## Header and footer (site-wide, November 6, 2026)

**Header** (`SiteHeader`, `src/components/site/site-header.tsx`). One sticky **light** bar
(November 7, 2026: owner asked for a light shade), 64px on phones and 72px from 768px
(`--header-height`, always the true sticky height). No announcement strip, no department bar,
no mega menu.

| Width       | Bar, left to right                                                                |
| ----------- | --------------------------------------------------------------------------------- |
| < 768px     | Wordmark, account, basket, menu. A search row sits under the bar and scrolls away |
| 768–1023px  | Wordmark, search (inline), account, basket, menu                                  |
| 1024–1279px | Wordmark, Shop, Baskets, How it works, search icon, account, basket               |
| 1280px +    | Wordmark, Shop, Baskets, How it works, Track an order, search, account, basket    |

- Only the bar sticks (`sticky top-0 z-header`). It is `surface` with a 1px `line` bottom
  edge on every page, so it separates from dark and light first bands alike; past 8px of
  scroll it gains `shadow-lift` (`HeaderShell`). On phones at the top of a page the bar's line
  moves to the search row under it, so the two read as one white block.
- Wordmark light variant: ink "Ship", crimson "East", `ink-muted` "Shop & Send". Icons and nav
  are `ink`, hover `surface-muted` with crimson text, pressed `surface-strong`.
- The basket pill is the one solid red block in the bar: `crimson`, hover `crimson-deep`, with
  a white count pill in `crimson-deep`.
- Nav links (`NavLink`) set `aria-current="page"` on their section (`/shop/*` lights Shop):
  crimson text plus a 3px crimson tab that sits on the bar's bottom line. No fill.
- The focus ring is the default `signal` (4.79:1 on white). The bar and the search row do not
  carry `on-dark-focus`.
- The phone search row (`HeaderSearchRow`) is hidden on `/search`, `/shop`, `/shop/*` (the
  listing has its own "Find in" field), `/basket` and `/checkout*`.
- The menu (`MobileMenu`, below 1024px) is a native `<dialog>` sheet from the right
  (`sheet-end`): search, departments with counts, More links, then account and contact. The
  browser traps focus and closes it on Escape; the backdrop, any link and a route change also
  close it, focus returns to the trigger, and the page behind does not scroll.
- Heroes, oxblood bands and closing panels carry `on-dark-focus`, so the focus ring is
  `blush` on dark (signal fails there).
- Anchor targets use `scroll-mt-header` so nothing lands under the bar.

**Heroes (November 7, 2026, `docs/heroes/PLAN.md`).** A different structure on each page:
home is a centred statement on crimson over a full-bleed photo with the receipt on the seam;
`/baskets` is a photo band under `photo-scrim` with the crimson price board overlapping its
edge; `/how-it-works` is a full-bleed scene under `photo-scrim-ink` with the tracker card on the
photo and a docked crimson "On this page" rail (below 1024px a photo stage holds only the h1);
`/about` is type only on oxblood: "bearer" in `text-poster` as a dictionary entry, sense 2 is
the h1.

**Shop listing** (`/shop` and `/shop/[department]`, `src/components/shop/listing/`,
`docs/shop-listing/PLAN.md`). One layout for both routes: a crimson department band with folder
tabs (the current tab cut out in white), a one-line edge strip, then a sticky filter sidebar
(1024px +) beside a 2 / 3 / 3 / 4 column grid of `ProductTile`s. Phones and tablets get a "Find
in" field, a sticky toolbar (Filters and Sort) and a bottom-sheet `FilterSheet` with a live
"Show N items". Every filter is in the URL (`src/lib/shop-filters.ts`); enhanced controls
navigate through `ListingNavProvider` (a transition, `push`, one live region). The tile's Add
becomes a solid crimson stepper (`setProductQuantity`), so red marks what is in the basket.
Results read the URL and the basket cookie, so they stream inside one Suspense boundary: they
need JavaScript to appear (a `<noscript>` note says so).

**Footer** (`SiteFooter`, `src/components/site/site-footer.tsx`, props `settings`,
`categories`, `parishList`). Solid `oxblood`, content `max-w-wide`.

- Brand column first: wordmark, one sentence with the live parishes, email, phone (when set)
  and a "WhatsApp us" button (when set).
- Three link columns, each a `<nav>` with an `h2`: **Shop** (all departments, each category,
  baskets, gifts, monthly), **Help** (how it works, delivery, track, questions, contact,
  account) and **Company** (about, the six policies, photo credits).
- Phones: Shop and Help side by side, Company across both in two columns. 768px: three
  columns under the brand. 1024px +: 12 columns, brand 1–4, Shop 6–7, Help 8–9, Company 10–12.
- Bottom row under a `line-on-dark` rule: how to pay (text only, no logos; bank transfer only
  when configured) and the flag with "© {year} ShipEast Couriers & Bearer Service Ltd. St.
  Thomas, Jamaica." The year is a cached server component in Jamaica time. No TRN until a
  setting holds one.
- Links are `on-oxblood-muted`, turning `on-dark` and underlined on hover; 44px tall on touch,
  36px from 1024px.

## Layout

- Mobile first. Page column `max-w-page` with `gutter` sides; header, footer and full-width
  bands use `max-w-wide`.
- Text is left-aligned. Centre only short, single-purpose blocks (an empty state, a closing
  call to action).
- Vertical rhythm comes from `section-sm` / `section` / `section-lg`, never from one-off
  padding.
- One `h1` per page. Section titles are `text-h2`; store shelves use `text-title`.

## Writing

Plain, warm and specific, in sentence case, from the sender's point of view. Buttons name
the action. Errors say what went wrong and how to fix it, without apologising. Use the
client's formats: `USD$31.50`, `J$3,100`, `July 31, 2026`, `9:12 AM`, `1-876-123-1234`, and
the company name **ShipEast Couriers & Bearer Service Ltd**.
