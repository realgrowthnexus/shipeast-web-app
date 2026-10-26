# Design tokens

The full ShipEast token set: color shades, type, spacing, shape, elevation, motion and hover
states. Every value lives in `src/app/globals.css` (`@theme`), and the motion values are
mirrored for JavaScript in `src/lib/motion.ts`. Components use the Tailwind classes these
tokens generate (`bg-crimson-50`, `shadow-lift`, `max-w-page`), never raw hex values or
one-off numbers. `docs/DESIGN-SYSTEM.md` explains how the pieces fit together.

The client supplied five brand colors: crimson #AE0E31, red #E30D3B, blush #FFC6D3, light
pink #F8ECF0 and ink #2B2326. Every other color below is a shade between them. No new hues
are added.

**Rule zero: no gradients of any kind.** Every surface is one flat color, so depth comes from
shade steps, shadows and photography instead.

## Color

### Crimson scale

| Token         | Hex       | Named alias    | Use                                                         |
| ------------- | --------- | -------------- | ----------------------------------------------------------- |
| `crimson-50`  | `#FFF5F7` |                | Soft band behind light sections, alternate rows             |
| `crimson-100` | `#FFE8EE` | `surface-tint` | Selected state, hover rows, image placeholders              |
| `crimson-200` | `#FFC6D3` | `blush`        | Accent text and icons on crimson, the "East" in the logo    |
| `crimson-300` | `#F994AB` |                | Decorative only: dividers on crimson, illustration fills    |
| `crimson-400` | `#EE5679` |                | Decorative only: never text                                 |
| `crimson-500` | `#E30D3B` | `signal`       | Big numerals, live dot, focus ring. Never text under 24px   |
| `crimson-600` | `#AE0E31` | `crimson`      | Primary buttons, hero blocks, links, eyebrow labels         |
| `crimson-700` | `#7A0A23` | `crimson-deep` | Hover and pressed on crimson, ghost-button hover on crimson |
| `crimson-800` | `#62091F` |                | Pressed on crimson-deep, deep panels inside crimson bands   |
| `crimson-900` | `#4A0B1C` | `oxblood`      | Footer, dark bands, the promise ticker                      |
| `crimson-950` | `#1A050B` |                | The footer's bottom strip, image frames on oxblood          |

### Warm neutrals

| Token         | Hex       | Named alias        | Use                                 |
| ------------- | --------- | ------------------ | ----------------------------------- |
| `neutral-0`   | `#FFF8FA` | `surface`          | Cards, inputs, panels (never white) |
| `neutral-50`  | `#F8ECF0` | `canvas`           | Page background                     |
| `neutral-100` | `#F1D9E0` | `line`             | Card borders, dividers              |
| `neutral-200` | `#E2C9D1` |                    | Hover border on cards               |
| `neutral-300` | `#C3BABD` | `on-oxblood-muted` | Secondary text on oxblood           |
| `neutral-400` | `#9C7F89` | `line-strong`      | Form control borders (3:1)          |
| `neutral-500` | `#6B5C63` | `ink-muted`        | Help text, captions                 |
| `neutral-700` | `#4A3F43` | `ink-body`         | Paragraphs                          |
| `neutral-900` | `#2B2326` | `ink`              | Headings, prices, labels            |

Prefer the named alias when one exists (`text-ink`, not `text-neutral-900`), because it says
what the color is for.

### Jamaican flag

The user asked for touches of the Jamaican flag so visitors see at once that this is a Jamaican
service. These are the only colors outside the brand palette, and they are accents.

| Token      | Hex       | Use                                                             |
| ---------- | --------- | --------------------------------------------------------------- |
| `jm-green` | `#009B3A` | Flag mark, basket price strips (with `jm-black` text only)      |
| `jm-gold`  | `#FED100` | Flag mark, icons on red and oxblood, deal tiles with `ink` text |
| `jm-black` | `#000000` | Flag mark, basket price strips (with white text)                |

Use the flag through `src/components/site/jamaica.tsx`: `JamaicaFlag` (the flag, drawn flat) and
`FlagBadge` (a pill with the flag). No striped flag bars: the user found them out of place.

### Status

`ok`, `info`, `warn` and `danger`, each with a `-tint` background, are for alerts and
status pills only. They are never used for decoration.

### Pairs that pass WCAG AA

The pairs below are checked on every test run (`src/lib/design-tokens.test.ts`). Text on
crimson is white, `blush` or `on-crimson-muted`. Text on oxblood is white or
`on-oxblood-muted`. Text on light surfaces is an `ink-*` color or `crimson`.

## Type

The only typeface is Figtree, in weights 400 to 900. Each size carries its own weight, line
height and letter spacing, and scales smoothly from a 375px phone to a 1024px screen.

| Class          | Size    | Weight | Use                          |
| -------------- | ------- | ------ | ---------------------------- |
| `text-display` | 48–72px | 900    | Home hero headline           |
| `text-numeral` | 48–60px | 900    | Step numbers, real facts     |
| `text-h1`      | 36–48px | 800    | Page titles, CTA band titles |
| `text-h2`      | 28–36px | 800    | Section titles               |
| `text-h3`      | 20px    | 800    | Card and step titles         |
| `text-lead`    | 18–20px | 400    | The paragraph under a title  |
| `text-body`    | 16px    | 400    | Running text                 |
| `text-small`   | 14px    | 500    | Captions, meta               |
| `eyebrow`      | 12px    | 800    | Uppercase label above titles |

Never set `tracking-*` or font sizes by hand.

## Spacing and layout

- **Grid.** Spacing follows a 4px grid: 4, 8 or 12px inside components, and 16, 24, 32 or 48px between blocks.
- **Sections.** `section-sm` is 48–64px, `section` is 64–96px and `section-lg` is 80–128px.
- **Cards.** `p-card` is 20–24px and `p-card-lg` is 24–32px.
- **Page sides.** `gutter` is 16–32px.
- **Widths.**
  - `max-w-page` (72rem) is the normal page column.
  - `max-w-wide` (80rem) is for the header, footer, CTA bands and photo-led sections.
  - `max-w-2xl` is the reading width for paragraphs.

## Shape

| Class          | Size | Use                                     |
| -------------- | ---- | --------------------------------------- |
| `rounded-sm`   | 4px  | Tags, checkboxes                        |
| `rounded-md`   | 8px  | Buttons, inputs, small photo thumbnails |
| `rounded-lg`   | 12px | Cards, panels, photos inside cards      |
| `rounded-xl`   | 16px | Crimson feature cards                   |
| `rounded-2xl`  | 24px | Large photo frames, CTA bands           |
| `rounded-full` |      | Pills, step dots, avatars               |

## Elevation

| Class            | Use                                                       |
| ---------------- | --------------------------------------------------------- |
| none             | Cards at rest: `surface` with a 1px `line` border         |
| `shadow-lift`    | Cards on hover, and the header once the page has scrolled |
| `shadow-float`   | Floating layers: cookie banner, hero proof photos, menus  |
| `shadow-overlay` | The mobile menu and dialogs                               |

## Motion

| Token                    | Value                            | Use                               |
| ------------------------ | -------------------------------- | --------------------------------- |
| `duration-fast` / `.15s` | 150ms                            | Button press, color changes       |
| `duration-base` / `.25s` | 250ms                            | Hovers, card lift                 |
| `duration-slow` / `.45s` | 450ms                            | Header change, menus              |
| reveal                   | 700ms                            | Scroll reveals, page-load rise    |
| `ease-out-soft`          | `cubic-bezier(0.22, 1, 0.36, 1)` | Almost everything                 |
| `ease-in-out-soft`       | `cubic-bezier(0.65, 0, 0.35, 1)` | Loops (skeleton pulse)            |
| rise                     | 24px                             | How far a block travels on reveal |
| stagger                  | 80ms                             | Gap between items in a group      |

**Rules.** Motion is calm. Things fade and rise into place once, and nothing bounces, spins,
loops forever or follows the cursor. The only loops are the promise ticker, which pauses on
hover, and skeleton pulses. Everything is switched off when the visitor's device asks for
reduced motion.

**Components.** All motion components use the `motion` package (Framer Motion) through
`LazyMotion`, so only the small feature set loads.

| Piece                         | What it does                                                    |
| ----------------------------- | --------------------------------------------------------------- |
| `animate-rise`                | CSS page-load entrance for above-the-fold text. No JavaScript   |
| `<Reveal>`                    | Fade and rise as a block scrolls into view                      |
| `<Stagger>` / `<StaggerItem>` | A list whose items appear one after another                     |
| `<Parallax>`                  | A large photo that drifts slightly as you scroll (one per page) |
| `animate-marquee`             | The promise ticker                                              |
| `skeleton`                    | Loading placeholder: a flat tint that breathes                  |

**Never on the hero headline.** The hero's main photo and headline must not wait for
JavaScript, so they use `animate-rise` rather than `<Reveal>`.

## Hover and press states

| Element              | Rest                          | Hover                                                   | Press / active |
| -------------------- | ----------------------------- | ------------------------------------------------------- | -------------- |
| Primary button       | `crimson`                     | `crimson-deep`                                          | moves down 1px |
| Secondary button     | `surface-tint`                | `blush`                                                 | moves down 1px |
| Outline button       | 1.5px crimson border          | `surface-tint` fill                                     | moves down 1px |
| On-dark button       | white                         | `surface`                                               | moves down 1px |
| Ghost on crimson     | transparent, white text       | `crimson-700`                                           |                |
| Card link            | `line` border, flat           | rises 2px, `shadow-lift`, `blush` border (`hover-lift`) |                |
| Photo in a card link | 100%                          | zooms to 104% over 700ms (`zoom` prop)                  |                |
| Nav link             | ink                           | crimson text, underline grows from the left             |                |
| Text link            | crimson                       | underline                                               |                |
| Focus (all)          | 3px `signal` ring, 2px offset |                                                         |                |
