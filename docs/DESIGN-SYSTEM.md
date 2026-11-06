# Design system

How the ShipEast Shop & Send interface is put together. Every value it uses is listed in
`docs/TOKENS.md`; `/styleguide` shows each token and component live; the choices behind
page layouts are logged in `docs/DESIGN-DECISIONS.md`.

## Principles

1. **The crimson carries the brand.** Everything else is neutral: a grey-white page, white
   cards, near-black ink. Crimson appears as a few large, solid blocks (the header bar, the
   main action, the proof band, a closing panel), not as tints spread everywhere. That
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
| `Dialog`                                                        | `surface`, `rounded-lg`, `shadow-float`, `scrim` behind.                                                                                                                                                                                              |
| `Tabs`, `Accordion`, `Pagination`                               | Current item in `crimson`; hover `surface-muted`.                                                                                                                                                                                                     |
| `ProofPair`, `TrackingTimeline` (`components/order`)            | The signature blocks. Don't restyle them per page.                                                                                                                                                                                                    |
| `ProductCard`, `BasketCard`, `CategoryTile` (`components/shop`) | `hover-lift`; the Add button sits on `z-raised` above the card link.                                                                                                                                                                                  |
| `DataTable`, `StatTile` (`components/admin`)                    | Admin only. Never show a metric that isn't tracked.                                                                                                                                                                                                   |

## Page building blocks

In `src/components/site/` and `src/components/motion/`:

- **`Section`** (`tone`: `page`, `surface`, `muted`, `crimson`, `oxblood`; `size`; `wide`) is
  one band of the page. Alternate `page` and `surface` so sections read as separate
  chapters. Never put two crimson or oxblood bands next to each other.
- **`SectionHeader`** gives an optional eyebrow, the title, a lead and an optional action link.
- **`PhotoFeature`** puts a photo beside text, with an optional parallax.
- **`CtaBand`** is the closing crimson panel with one main action.
- **`StockPhoto`** shows a photo from the registry (`docs/PHOTOGRAPHY.md`); add `zoom` inside
  card links.
- **`Reveal`**, **`Stagger`** / **`StaggerItem`** and **`Parallax`** handle motion. The rules
  are in `docs/TOKENS.md` → Motion.

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
