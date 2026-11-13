# Design tokens

The reference for every value in the ShipEast Shop & Send design system. The values live in
`src/app/globals.css`; motion values used from JavaScript are mirrored in `src/lib/motion.ts`.
`/styleguide` shows them live. `docs/DESIGN-SYSTEM.md` explains how to put them together.

**Rule zero: no gradients of any kind.** Every surface is one flat colour.

---

## How the system is built

Three layers. Each layer only uses the one below it.

| Layer         | Where                            | Example                        | Used by              |
| ------------- | -------------------------------- | ------------------------------ | -------------------- |
| 1. Primitives | `:root` in `globals.css`         | `--crimson-600`, `--grey-200`  | Roles only           |
| 2. Roles      | `@theme inline` in `globals.css` | `bg-surface`, `text-ink-muted` | Components and pages |
| 3. Components | `src/components/ui/*`            | `Button variant="primary"`     | Pages                |

- **Primitives make no Tailwind classes.** `bg-crimson-800` or `text-grey-500` don't exist, so
  a component can't skip the role layer.
- **Tailwind's default palette is switched off** (`--color-*: initial`), including `white`
  and `black`. White is `surface` (a background) or `on-dark` (text). `transparent`, `current`
  and `inherit` still work.
- **Choose a role by job, not by look.** If two jobs share a colour today, they still get two
  roles, so one can change without breaking the other.
- **Adding a role:** add it to `@theme` in `globals.css` as a `var()` of a primitive, add its
  contrast pair to `src/lib/design-tokens.test.ts`, add a swatch to `/styleguide`, and list it
  here.

`src/lib/design-tokens.test.ts` runs with `npm test`. It fails when:

- a colour class used in `src/` is not a role (a misspelt, retired or primitive name, which
  Tailwind would otherwise drop silently);
- a text or control pair below falls under WCAG AA;
- a component uses a gradient, raw hex, see-through text, hand-set letter spacing or text
  under 12px.

---

## 1. Primitives

Built from the client's five PDF colours: crimson `#AE0E31`, red `#E30D3B`, blush `#FFC6D3`,
light pink `#F8ECF0` and ink `#2B2326`. No new hues are added.

### Crimson ramp

| Step  | Hex       | Anchor                           |
| ----- | --------- | -------------------------------- |
| `50`  | `#FFF5F7` |                                  |
| `100` | `#FFE8EE` |                                  |
| `200` | `#FFC6D3` | Client blush                     |
| `300` | `#F994AB` |                                  |
| `400` | `#EE5679` |                                  |
| `500` | `#E30D3B` | Client red                       |
| `600` | `#AE0E31` | Client crimson                   |
| `700` | `#7A0A23` |                                  |
| `800` | `#62091F` |                                  |
| `900` | `#4A0B1C` | Oxblood ("red mixed with black") |
| `950` | `#1A050B` |                                  |

### Grey ramp

Pure neutral, with no tint, so the crimson carries all of the brand.

| Step  | Hex       |
| ----- | --------- |
| `0`   | `#FFFFFF` |
| `50`  | `#F7F7F7` |
| `100` | `#F0F0F0` |
| `200` | `#E5E5E5` |
| `300` | `#D1D1D1` |
| `400` | `#A3A3A3` |
| `500` | `#858585` |
| `600` | `#666666` |
| `700` | `#474747` |
| `800` | `#333333` |
| `900` | `#242424` |

`--ink-900` (`#2B2326`) is the client's heading ink, kept as its own primitive.

---

## 2. Roles

### Backgrounds

| Role               | Value       | Job                                                                                                                       |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `page`             | grey-50     | The page behind everything (`body`)                                                                                       |
| `surface`          | grey-0      | Cards, inputs, panels, menus, dialogs                                                                                     |
| `surface-muted`    | grey-100    | Quiet fills: wells, photo placeholders, icon discs, hover on rows and ghost buttons, secondary button, muted section band |
| `surface-strong`   | grey-200    | Hover on a `surface-muted` fill                                                                                           |
| `surface-selected` | crimson-100 | The chosen option, the current item, search-match marks, a highlighted card                                               |

Light surfaces are separated by space and `line` borders, not by tinted bands.

### Brand fills

These also work as text and border colours.

| Role           | Value       | Job                                                                                     |
| -------------- | ----------- | --------------------------------------------------------------------------------------- |
| `crimson`      | crimson-600 | Primary action, the header bar, brand blocks, text links                                |
| `crimson-deep` | crimson-700 | Hover and pressed on crimson; a panel inside a crimson band; text on `surface-selected` |
| `oxblood`      | crimson-900 | Dark panels and bands                                                                   |
| `signal`       | crimson-500 | Focus ring, live dot, big numerals. **Never text under 24px**                           |
| `blush`        | crimson-200 | Text and icons on crimson, "East" in the wordmark. **Never a fill or border on light**  |

### Text

| Role               | Value     | Job                                                |
| ------------------ | --------- | -------------------------------------------------- |
| `ink`              | ink-900   | Headings, prices, labels                           |
| `ink-body`         | grey-700  | Paragraphs and long text                           |
| `ink-muted`        | grey-600  | Help text, captions, meta                          |
| `ink-disabled`     | grey-400  | Disabled controls and decorative icons. Never text |
| `on-dark`          | grey-0    | Text and icons on crimson, oxblood or ink          |
| `on-crimson-muted` | `#F3DBE0` | Secondary text on crimson                          |
| `on-oxblood-muted` | `#C3BABD` | Secondary text on oxblood                          |

There are no see-through text colours (`text-ink/70` and the like). Use the role.

### Lines

| Role           | Value     | Job                                     |
| -------------- | --------- | --------------------------------------- |
| `line`         | grey-200  | Card borders, dividers (decorative)     |
| `line-hover`   | grey-300  | Card border on hover                    |
| `line-strong`  | grey-500  | Form control borders (3:1, WCAG 1.4.11) |
| `line-on-dark` | `#6E3848` | Dividers and borders on oxblood         |

### Overlay

| Role              | Value                                  | Job                                                                                                                                    |
| ----------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `scrim`           | oxblood at 60%                         | Behind dialogs (`backdrop:bg-scrim`)                                                                                                   |
| `photo-scrim`     | oxblood at 80% (`rgb(74 11 28 / 0.8)`) | The flat overlay on a background photo (home coverage band, About "where", the `/baskets` hero). Only `on-dark` text on it (see below) |
| `photo-scrim-ink` | ink at 75% (`rgb(43 35 38 / 0.75)`)    | The flat ink overlay of the `/how-it-works` hero. Only `on-dark` text: no `blush` or muted text on it                                  |

They are kept apart so each can change alone. `design-tokens.test.ts` checks
`on-dark` over `photo-scrim` blended on a pure white pixel (the worst case: 8.7:1) and the
`blush` focus ring over it blended on black (3:1 or more). For `photo-scrim-ink` it checks
`on-dark` over white (6.74:1) and the `blush` ring over white (4.58:1) and over black (11.6:1).

### Status

Used for alerts, status pills and form feedback only, never as decoration. Each has a
strong colour (text, icons), a `-tint` (background) and a `-line` (border).

| Role     | Strong    | Tint      | Line      |
| -------- | --------- | --------- | --------- |
| `ok`     | `#16794A` | `#E3F4EA` | `#B5DCC6` |
| `info`   | `#1D5FA8` | `#E4EEFA` | `#B8CFEC` |
| `warn`   | `#8A5300` | `#FDF0D8` | `#ECD2A3` |
| `danger` | `#B42318` | `#FDE8E6` | `#F1BDB8` |

`danger-deep` (`#93190F`) is the hover on a destructive button.

### Jamaican flag

The only colours outside the brand palette. They are accents, and each has one job so
shoppers learn what it means.

| Role       | Hex       | Its one job                                               |
| ---------- | --------- | --------------------------------------------------------- |
| `jm-gold`  | `#FED100` | Savings only, as small tags ("Save 13%"), with `ink` text |
| `jm-green` | `#009B3A` | The flag mark and good news (in stock, delivered)         |
| `jm-black` | `#000000` | The flag mark only                                        |

Use the flag through `src/components/site/jamaica.tsx` (`JamaicaFlag`). No
striped flag bars.

### Produce (home page, v3.4)

The home page's only colours outside crimson and grey. The page itself is `page` (grey);
there is no warm neutral. Retired in v3.4: `cream-deep`, `mango-soft`, `sky-soft`; `cream` went
with the door mark (November 13, 2026), and the Receipt E mark is crimson and `surface` white.

| Role            | Primitive   | Hex       | Its one job                                                 |
| --------------- | ----------- | --------- | ----------------------------------------------------------- |
| `leaf`          | `leaf-700`  | `#16603D` | The Jamaica band, the "in Jamaica" lane, delivered, added   |
| `leaf-deep`     | `leaf-800`  | `#0F4A2F` | Hover on leaf, zone cards inside the leaf band, "Save" text |
| `leaf-soft`     | `leaf-100`  | `#DBF0E6` | SMS bubbles and "Save" pills only                           |
| `on-leaf-muted` | `leaf-200`  | `#CFE6D6` | Secondary text on leaf and leaf-deep                        |
| `mango`         | `mango-400` | `#FFC83D` | Price stickers and one highlight per block, never a fill    |

### Pairs that pass WCAG AA

Checked on every test run. Text needs 4.5:1, control borders and the focus ring 3:1.

| On                                                     | Allowed text                                              |
| ------------------------------------------------------ | --------------------------------------------------------- |
| `page`, `surface`, `surface-muted`, `surface-selected` | `ink`, `ink-body`, `ink-muted`, `crimson`, `crimson-deep` |
| `surface-strong`                                       | `ink`, `ink-body`, `crimson-deep`                         |
| `crimson`, `crimson-deep`, `oxblood`                   | `on-dark`, `blush`, `on-crimson-muted`                    |
| `oxblood`                                              | also `on-oxblood-muted`                                   |
| `ink`, `danger`                                        | `on-dark`                                                 |
| `photo-scrim` over a photo                             | `on-dark` only                                            |
| `photo-scrim-ink` over a photo                         | `on-dark` only (6.7:1 over white)                         |
| status `-tint`                                         | its own status colour                                     |
| `jm-gold`                                              | `ink`, `crimson-deep`                                     |
| `mango`                                                | `ink`, `ink-body`, `crimson-deep`                         |
| `leaf-soft`                                            | `ink`, `leaf-deep`                                        |
| `leaf`, `leaf-deep`                                    | `on-dark`, `mango`, `on-leaf-muted`                       |

---

## Type

Figtree only, weights 400 to 900, loaded with `next/font/google`.

One modular scale on a 16px body. The ratio is **1.2 on a 375px phone, growing to 1.3 at
1280px and up**, so headings gain drama on large screens without crowding small ones. Each
class carries its own size, line height, weight and letter spacing.

| Class          | Step | Size (375 → 1280px) | Weight          | Line height | Use                                       |
| -------------- | ---- | ------------------- | --------------- | ----------- | ----------------------------------------- |
| `text-poster`  | +8   | 72 → 130px          | 900             | 0.85        | One word per page: the About "bearer"     |
| `text-display` | +6   | 48 → 77px           | 900             | 0.95        | The home hero headline only               |
| `text-numeral` | +5   | 40 → 59px           | 900             | 1           | Step numbers and real facts, in `signal`  |
| `text-h1`      | +4   | 33 → 46px           | 800             | 1.05        | One page title per page                   |
| `text-h2`      | +3   | 28 → 35px           | 800             | 1.1         | Section titles, totals                    |
| `text-title`   | +2   | 23 → 27px           | 800             | 1.15        | Store shelf titles                        |
| `text-h3`      | +1   | 19 → 21px           | 700             | 1.25        | Card, step and form-step titles           |
| `text-price`   |      | 18px                | 600 (set)       | 1.25        | Shelf prices and basket price tags (home) |
| `text-lead`    |      | 18 → 20px           | 400             | 1.55        | The paragraph under a title               |
| `text-body`    | 0    | 16px                | 400             | 1.6         | Running text and inputs                   |
| `text-small`   |      | 14px                | 500             | 1.5         | Captions, meta, table cells               |
| `text-xs`      |      | 12px                | set by the pill | 1.35        | Pills and counters only                   |
| `eyebrow`      |      | 14px                | 700             | 1.3         | A short label above a title               |

- Never set `tracking-*`, font sizes or line heights by hand. The one exception is the
  wordmark, which is a logo.
- Nothing on the site is smaller than 12px.
- The eyebrow is **sentence case**, with no uppercase or wide tracking. Use one only when it
  adds information the title doesn't, not above every heading.
- Keep paragraphs under about 75 characters (`max-w-2xl`).

---

## Space and size

**Grid.** Everything sits on a 4px grid (Tailwind's own scale, `p-4` = 16px): 4, 8 or 12px
inside components, and 16, 24, 32 or 48px between blocks.

| Token                        | Value      | Use                                                                  |
| ---------------------------- | ---------- | -------------------------------------------------------------------- |
| `section-sm`                 | 48 → 64px  | Vertical padding of a quiet band                                     |
| `section`                    | 64 → 96px  | Vertical padding of a normal band                                    |
| `section-lg`                 | 80 → 128px | Heroes only                                                          |
| `p-card`                     | 20 → 24px  | Card padding                                                         |
| `p-card-lg`                  | 24 → 32px  | Feature panel padding                                                |
| `gutter`                     | 16 → 32px  | Page sides                                                           |
| `h-control` / `size-control` | 44px       | The smallest touch target: buttons, icon buttons, steppers, nav rows |
| `h-control-lg`               | 52px       | Large buttons, the hero action                                       |
| `size-icon-sm`               | 16px       | Icons in small text and pills                                        |
| `size-icon`                  | 20px       | Icons in buttons, nav and lists                                      |
| `size-icon-lg`               | 24px       | Icons in icon discs                                                  |
| `border-control`             | 1.5px      | Form controls and outline buttons                                    |
| `--header-height`            | 64 / 72px  | The sticky header bar (72px from 768px). Sticky columns offset by it |
| `scroll-mt-header`           | bar + 16px | Every `id` target, so anchors and focus stop below the sticky bar    |

### Widths and breakpoints

| Token        | Value          | Use                                 |
| ------------ | -------------- | ----------------------------------- |
| `max-w-page` | 72rem (1152px) | The normal page column              |
| `max-w-wide` | 80rem (1280px) | Header, footer and full-width bands |
| `max-w-2xl`  | 42rem          | Reading width for paragraphs        |

Tailwind's breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Design mobile
first and check every page at 375, 768, 1024 and 1440px.

---

## Shape

Bigger surfaces get bigger corners.

| Class          | Size | Use                                   |
| -------------- | ---- | ------------------------------------- |
| `rounded-sm`   | 4px  | Tags, search marks, checkboxes        |
| `rounded-md`   | 8px  | Buttons, inputs, thumbnails           |
| `rounded-lg`   | 12px | Cards, panels, menus, dialogs         |
| `rounded-xl`   | 16px | Feature panels and brand blocks       |
| `rounded-2xl`  | 24px | Hero frames and full-width bands      |
| `rounded-full` |      | Pills, step dots, avatars, icon discs |

## Elevation

A shadow means "this floats above the page". The shadow colour is the ink at low strength,
so it reads neutral on the grey page.

| Class            | Use                                                      |
| ---------------- | -------------------------------------------------------- |
| none             | Cards at rest: `surface` with a 1px `line` border        |
| `shadow-lift`    | Cards on hover (`hover-lift`), the header once scrolled  |
| `shadow-float`   | Floating layers: menus, cookie banner, hero proof photos |
| `shadow-overlay` | The mobile menu and dialogs                              |

## Layers

| Class       | z-index | Use                                                  |
| ----------- | ------- | ---------------------------------------------------- |
| `z-raised`  | 10      | A button above a card's full-size link               |
| `z-sticky`  | 30      | Sticky bars inside a page (basket summary, FAQ tabs) |
| `z-header`  | 40      | The site header                                      |
| `z-overlay` | 50      | Menus, the cookie banner, the skip link              |

Don't use `z-*` numbers directly.

---

## Motion

| Token               | Value                            | Use                                |
| ------------------- | -------------------------------- | ---------------------------------- |
| `--duration-fast`   | 150ms                            | Presses, colour changes            |
| `--duration-base`   | 250ms                            | Hovers, card lift                  |
| `--duration-slow`   | 450ms                            | Menus, the header change           |
| `--duration-reveal` | 700ms                            | The page-load rise, scroll reveals |
| `ease-out-soft`     | `cubic-bezier(0.22, 1, 0.36, 1)` | Almost everything                  |
| `ease-in-out-soft`  | `cubic-bezier(0.65, 0, 0.35, 1)` | Loops (the skeleton pulse)         |
| `--motion-rise`     | 16px                             | How far a block rises on reveal    |
| `staggerStep` (JS)  | 80ms                             | Gap between items in a group       |

The durations are CSS variables, not Tailwind theme keys, so `duration-slow` makes no class:
write `duration-(--duration-slow)` (or `duration-150` for the fast step). The utilities below
read the variables directly.

**Rules.**

- Motion is calm. Things fade and rise into place once, and nothing bounces, spins, loops
  forever or follows the cursor. The skeleton pulse is the only loop.
- Spend motion in one place per page (the hero entrance). Motion that answers an action
  (add to basket, step complete, menu open) is always welcome.
- Everything switches off when the device asks for reduced motion.
- The hero headline and photo use the CSS `animate-rise`, never `<Reveal>`, so the largest
  paint never waits for JavaScript.

| Piece                         | What it does                                                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `animate-rise`                | CSS page-load entrance for above-the-fold text                                                                                          |
| `<Reveal>`                    | Fade and rise as a block scrolls into view. Never on headings                                                                           |
| `<Stagger>` / `<StaggerItem>` | A list whose items appear one after another                                                                                             |
| `<Parallax>`                  | A large photo that drifts slightly on scroll (one per page)                                                                             |
| `skeleton`                    | Loading placeholder: a flat `surface-muted` fill that breathes                                                                          |
| `animate-print`               | The home hero receipt prints once: unclips top to bottom and slides 16px down, 700ms after a 300ms delay. Put any rotation on a wrapper |
| `sheet-end`                   | A native `<dialog>` that slides in from the right (the phone menu): opens over 450ms, closes over 250ms                                 |
| `sheet-bottom`                | The bottom-edge twin of `sheet-end` (the shop's phone filter sheet, `Dialog variant="sheet"` below 640px)                               |
| `bleed-gutter`                | A bar inside a `gutter` container that still touches both screen edges (the shop toolbar below 1024px). Reset with `lg:mx-0 lg:px-0`    |

All motion components use the `motion` package through `LazyMotion`.

---

## States

| Element            | Rest                                                                                                                                        | Hover                                                        | Pressed / chosen                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------- |
| Primary button     | `crimson`, `on-dark` text                                                                                                                   | `crimson-deep`                                               | moves down 1px                               |
| Secondary button   | `surface-muted`, `crimson-deep` text                                                                                                        | `surface-strong`                                             | moves down 1px                               |
| Outline button     | `border-control` crimson                                                                                                                    | `surface-selected` fill                                      | moves down 1px                               |
| Ghost button       | `ink` text                                                                                                                                  | `surface-muted` fill                                         | moves down 1px                               |
| Dark button        | `ink`, `on-dark` text                                                                                                                       | `ink-body`                                                   | moves down 1px                               |
| On-dark button     | `surface`, `crimson-deep` text                                                                                                              | `surface-muted`                                              | moves down 1px                               |
| Destructive button | `danger`, `on-dark` text                                                                                                                    | `danger-deep`                                                | moves down 1px                               |
| Card link          | `line` border, flat                                                                                                                         | `line-hover` border, rises 2px, `shadow-lift` (`hover-lift`) |                                              |
| Photo in a card    | 100%                                                                                                                                        | zooms to 104% over 700ms                                     |                                              |
| Row, nav item      | transparent                                                                                                                                 | `surface-muted`                                              | `surface-selected` or `crimson` when current |
| Choice card        | `surface`, `line-strong` border                                                                                                             | `ink-muted` border                                           | `surface-selected`, crimson border and ring  |
| Text link          | `crimson`                                                                                                                                   | underline                                                    |                                              |
| Disabled           | 50% opacity, no pointer                                                                                                                     |                                                              |                                              |
| Focus (everything) | 3px `signal` ring, 2px offset                                                                                                               |                                                              |                                              |
| Focus on dark      | 3px `blush` ring (add `on-dark-focus` to a crimson, oxblood or photo-overlay container, never the light header; signal is only 1.6:1 there) |                                                              |                                              |
