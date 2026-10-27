# Design system

The ShipEast Shop & Send brand system, built from the client's proposal, scope and quote PDFs.
Tokens live in `src/app/globals.css` and are listed in full, with shades, hovers and motion, in
`docs/TOKENS.md`; `/styleguide` shows every one of them live, and
`src/lib/design-tokens.test.ts` checks contrast and token use on every test run.

**No gradients of any kind.** Flat brand colours only. Red feels premium through large solid
crimson and oxblood blocks, generous spacing and heavy type.

## Colour

| Token                                         | Hex       | Use                                                                    |
| --------------------------------------------- | --------- | ---------------------------------------------------------------------- |
| `crimson`                                     | `#AE0E31` | Buttons, hero and callout blocks, links, eyebrow labels                |
| `crimson-deep`                                | `#7A0A23` | Hover and pressed                                                      |
| `oxblood`                                     | `#4A0B1C` | Footer, dark panels                                                    |
| `signal`                                      | `#E30D3B` | Big numerals, live dot, active step, focus ring. Never text under 24px |
| `blush`                                       | `#FFC6D3` | "East" in the wordmark, accent text on crimson                         |
| `canvas`                                      | `#F8ECF0` | Page background                                                        |
| `surface`                                     | `#FFF8FA` | Cards, inputs, panels. White is never a surface                        |
| `surface-tint`                                | `#FFE8EE` | Selected state, hover rows, image placeholders                         |
| `line`                                        | `#F1D9E0` | Card borders and dividers (decorative)                                 |
| `line-strong`                                 | `#9C7F89` | Form control borders (3:1, WCAG 1.4.11)                                |
| `ink`                                         | `#2B2326` | Headings, prices, labels                                               |
| `ink-body`                                    | `#4A3F43` | Paragraphs and long text                                               |
| `ink-muted`                                   | `#6B5C63` | Help text, captions, placeholders                                      |
| `ink-disabled`                                | `#94878D` | Disabled controls and decorative icons only                            |
| `on-crimson-muted`                            | `#F3DBE0` | Secondary text on crimson (or oxblood)                                 |
| `on-oxblood-muted`                            | `#C3BABD` | Secondary text in the footer                                           |
| `ok` / `info` / `warn` / `danger` (+ `-tint`) |           | Status pills and alerts                                                |

No see-through text colours (`text-white/70` and the like): use the `on-*` tokens.

## Type

Figtree only. Each style carries its own size, weight, line height and letter spacing, and
grows smoothly from a 375px phone to a 1024px screen. Never set `tracking-*` by hand.

| Class                      | Size       | Weight         | Use                                          |
| -------------------------- | ---------- | -------------- | -------------------------------------------- |
| `text-display`             | 48 to 64px | 900            | Home hero headline only                      |
| `text-numeral`             | 48 to 60px | 900            | Step numbers, big stats (with `text-signal`) |
| `text-h1`                  | 36 to 48px | 800            | One page title per page                      |
| `text-h2`                  | 28 to 36px | 800            | Section titles, totals                       |
| `text-title`               | 24px       | 800            | Store shelf titles                           |
| `text-h3`                  | 20px       | 700            | Card, step and form-step titles              |
| `text-lead`                | 18 to 20px | 400            | The paragraph under a title                  |
| `text-body`                | 16px       | 400            | Running text and inputs                      |
| `text-small`               | 14px       | 500            | Help text, captions, meta, table cells       |
| `eyebrow` + `text-crimson` | 12px       | 800, uppercase | The label above a title                      |

`text-xs` (12px) is kept for pills and counters. Nothing on the site is smaller than 12px.

## Spacing and layout

- 4px grid. Inside components use 4, 8, 12px; between fields and cards 16, 20, 24px.
- Sections: `section-sm` (48 to 64px), `section` (64 to 96px), `section-lg` (80 to 128px, hero only).
- Cards: `p-card` (20 to 24px) and `p-card-lg` (24 to 32px).
- Page: `max-w-6xl` with the `gutter` utility (16 to 32px sides). Reading width `max-w-2xl`.

## Shape and elevation

| Token          | Size | Use                                 |
| -------------- | ---- | ----------------------------------- |
| `rounded-sm`   | 4px  | Tags, checkboxes                    |
| `rounded-md`   | 8px  | Buttons, inputs, choice cards       |
| `rounded-lg`   | 12px | Cards, panels                       |
| `rounded-xl`   | 16px | Crimson feature panels, hero frames |
| `rounded-full` |      | Pills, step dots                    |

Cards are flat: `surface` with a 1px `line` border. Only floating layers (menus, dialogs,
the cookie banner, the hero proof photos) use `shadow-float`.

## Components

- **Buttons:** primary crimson, secondary `surface-tint`, outline 1.5px crimson, on-dark white.
  At least 44px tall.
- **Inputs and selects:** `surface`, 1.5px `line-strong` border, crimson border and ring on focus,
  danger border on error. Label above, help and errors below.
- **Choice cards:** as inputs; when chosen, crimson border and ring on `surface-tint`.
- **Section header:** `eyebrow`, then `text-h2`, then an optional `text-lead`.
- **Icons:** Lucide only. Crimson on light surfaces, blush on crimson.

## Marketing page building blocks

Use these, in `src/components/site/` and `src/components/motion/`, before writing new layout:

- `Section` (`tone`: canvas, surface, tint, crimson, oxblood; `size`; `wide`) is one band of the page.
  Alternate the tones so each section reads as its own chapter. Never put two crimson bands next to each other.
- `SectionHeader` gives the eyebrow, title, lead and an optional action link, revealed on scroll.
- `PhotoFeature` puts a photo beside text, with an optional parallax.
- `CtaBand` is the closing crimson panel with one main action.
- `StockPhoto` (with `zoom` inside card links) shows a photo from the registry.
- `Reveal`, `Stagger` / `StaggerItem` and `Parallax` handle motion. See `docs/TOKENS.md` for the rules.

Every claim on a page must be true today. Don't invent testimonials, ratings, order counts or
"trusted by" logos. Use the promises we keep on every order instead.
