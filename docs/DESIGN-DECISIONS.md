# Design decisions

A dated log of design choices and the feedback behind them, so the reasons aren't lost.
The rules themselves live in `docs/DESIGN-SYSTEM.md` and `docs/TOKENS.md`. Add new entries
at the top.

## November 7, 2026: shop, baskets, how it works and about redesigned

Owner brief: four more pages in the home page's design language. Plans:
`docs/pages-redesign/<page>.md`, approved with seven amendments
(`docs/pages-redesign/APPROVAL.md`). One bold element per page, no eyebrows, no scroll reveals,
two dark bands never touching, a contained crimson closing panel where a page has one.

- **`/how-it-works`: the two-lane order day.** One example order (`SE-10428`, labelled
  "Example") runs down the seven real tracker stages with Jamaica clock times. Beside each
  stage: "On your screen" (white email cards: the receipt, a mini drawn till receipt, a door
  card, the refund) and "In Jamaica", one continuous oxblood column built from touching cells.
  The out-of-stock item in the example is left off both drawn receipts and refunded at the
  end, so the page tells one consistent story. The hero carries a tracker card (the home hero
  carries the receipt). "If nobody is home" uses only the delivery policy's own steps.
- **`/baskets`: the price board.** A text-only crimson hero with one row per basket, the
  price as large as the name. Below, every basket opened up: every item at today's shop price
  and three totals (one by one, basket, you save), so the saving is checkable. A basket with an
  out-of-stock item sorts last, says "Not available today" and has no Add button.
- **`/shop`: the aisle board.** Search and four oxblood aisle signs (real counts and the first
  products on each shelf) inside the crimson front door, with a "Good to know" card (cut-off,
  exchange rate, the real price-check date). Then a compact baskets row, an Everyday staples
  shelf ("picked by our team", from the admin's featured flag), one shelf per department, the
  oxblood "Bought in Jamaica" band and "Can't find it?". No hero photo.
- **`/about`: "bearer", defined.** The word from the registered name set as a dictionary entry
  in the crimson hero. Then a short provable story with a fact strip, a ruled "what we do /
  what we don't" pair, the live delivery zones over a country road under `photo-scrim`, and a
  company details card. TRN, registered address and the owner row stay out of the page until
  ShipEast provides them.
- **Honest wording:** no "fresh" claims ("bought at a store in Jamaica on the day we
  deliver"); the shop promise "Bought fresh on the day" is now "Bought on the day we deliver".
- **Shared once:** `ClosingPanel`, `site/links.ts` (`lightLink`, `onDarkLink`,
  `overlayLink`), `SavingTag`, `OutcomeTag`, `SPEED_LABEL` and `occasionPhrases`
  (`src/lib/home.ts`). New pure helpers with tests: `src/lib/how-it-works.ts`,
  `src/lib/baskets.ts`, `src/lib/shop-front.ts`.
- **Fix:** `cn` now knows `border-control` is a border width, so outline buttons keep their
  border (tailwind-merge had been dropping it in favour of `border-crimson`).
- **Photos:** new `hiwSender`, `hiwFamilyDoor`, `basketsGiftWrap` and `shopChoosing`, each
  download recorded through the Unsplash API. Removed from the registry because no page uses
  them: `guideProduce`, `stepOrder`, `stepDoor`, `stepFamily`, `shopProduce`, `companyCoast`,
  `jmFlag`, `heroGroceries`, `catGroceries`, `kingston` and `jmAckee`. A hero photo may now use
  `preload` on any page (the top photo of the page), not only the home page.
- **Deleted:** `StageTimeline`, `CategoryPhotoCard` and `FlagBadge` (no page uses them).

## November 6, 2026: home page redesign, new header and footer

Owner brief: redesign the home page from scratch, structure first, with real stock photos and
a homely brand feel. Plan: `docs/home-redesign/PLAN.md` (approved with six amendments).

- **One bold element: the printed receipt.** The hero is a split on solid crimson: the
  promise "Groceries for home. Proof for you." beside a warm photo, with a drawn till receipt
  for the Family Food Basket (real catalogue lines, J$ at the live rate, labelled "Example
  receipt") straddling the photo's edge. It prints once on load (`animate-print`). Nothing
  else on the page moves: no `Reveal`, `Stagger` or `Parallax` on `/`.
- **Page rhythm:** red mass (header and hero), three light photo rows (steps, departments,
  baskets), the oxblood proof band (what you get by email, what the family gets by text), a
  light split (why us, against barrels and cash), the Kingston photo band, questions, and a
  contained crimson closing panel. Two dark bands never touch.
- **Flat photo overlays allowed** (owner): a photo may be a section background under one role
  at one opacity. New role `photo-scrim` (oxblood at 80%, 8.7:1 for `on-dark` text in the worst
  case). Used once, on the coverage band. See `docs/PHOTOGRAPHY.md`.
- **No eyebrows, no `→`, no middle dots, no invented numbers** on the page. Step numbers stay
  only because the four steps are a real sequence.
- **New header:** one sticky crimson bar with nav, search, account and basket; the old light
  department bar and the `<details>` menu are gone. Phones get a non-sticky search row and a
  `<dialog>` menu sheet. **New footer:** solid oxblood with brand and contact first, Shop, Help
  and Company columns, and a payments and legal line.
- **New tokens and utilities:** `photo-scrim`, `--header-height`, `scroll-mt-header`,
  `animate-print`, `on-dark-focus` (blush focus ring on dark, since signal is 1.6:1 on
  crimson) and `sheet-end`.
- **New photo:** `homeStepToDoor` (`czTuLlcSAus`, Mathias Reding), download recorded through
  the Unsplash API.
- The old home components (promo banners, popular products, features strip, today card and
  the rest) are deleted.

## November 6, 2026: token system rebuilt

Feedback: the user was not happy with the design system or `TOKENS.md`.

- **Three layers.** Primitive ramps (no classes) → roles (the only colour classes) →
  components. Tailwind's default palette, including `white` and `black`, is switched off.
  Before, two names pointed at one colour (`crimson-200` and `blush`, `crimson-100` and
  `surface-tint`), and components mixed both freely.
- **Pure neutral greys.** The user chose a grey-white page and white cards over the pink
  tint (`#F8ECF0` / `#FFF8FA`), so the crimson alone carries the brand. The client's ink
  `#2B2326` stays for headings.
- **`surface-tint` split by job** into `surface-muted` (neutral hover, wells, placeholders)
  and `surface-selected` (a crimson tint for chosen and current items). `canvas` became
  `page`.
- **Blush no longer appears on light surfaces** (borders, highlight marks, the progress pill
  now use `line-hover` or `surface-selected`).
- **One modular type scale**: ratio 1.2 on phones, 1.3 at 1280px and up. The display headline
  grows to 77px; `title` and `h3` are now fluid.
- **The eyebrow is sentence case** (14px, 700) instead of a 12px uppercase tracked label,
  which reads as template chrome.
- **New tokens:** control and icon sizes, `border-control`, z-index layers, status `-line`
  borders, `line-hover`, `line-on-dark`, `scrim`, `duration-reveal`, `--motion-rise`.
- **Fixed contradictions:** the page background, the largest corner (24px), the card hover
  border and the reveal distance (16px in CSS and JS) now agree everywhere.
- **New test guard:** any colour class that isn't a role fails `npm test`.

## October 27, 2026: home page audits

From the colour audit, the user's follow-up ("too much red, simplicity is gone") and the
three-designer home page audit:

- Calm and minimal. Sections are separated by space and `line` borders, not coloured bands.
- Crimson fills at rest on the home page: the header bar, the hero's main button, the proof
  band and the baskets lead tile. An Add button fills only once the item is in the basket.
- Crimson line and text: outline Add buttons, text links, the "not money" span. Never
  prices, step dots, pills or table headers.
- Prices are `ink`.
- The `dark` (ink) button is the action on a light promo banner, so it doesn't compete with
  the crimson main action.
- The footer is light, like the rest of the store, with crimson on hover.
- The header is one crimson bar, then a light, text-only department bar with a thin line.
- Home sections share one frame (`HomeSection`): a `text-title` heading and a quiet "See all"
  link on the same line. On the home page only the proof band has an eyebrow.
- The promise ticker was removed: touch visitors couldn't pause it (WCAG 2.2.2).

## October 2026: Jamaican flag touches

The user asked for touches of the Jamaican flag so visitors see at once that this is a
Jamaican service. Gold is for savings tags only, green for good news, black for the flag
mark. Striped flag bars were tried and removed as out of place.

## October 2026: no gradients

User rule: flat brand colours only, no gloss. Red should feel premium through large solid
crimson and oxblood blocks, spacing and heavy type, never a pinkish red.
