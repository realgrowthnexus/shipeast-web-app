# Brand kit: ShipEast Shop & Send

Made November 13, 2026, for the owner's review. Everything here is generated from one drawing
and one script, so it can be changed in minutes.

## The mark

A doorway on a crimson tile, with a mango dot. Every order ends at a door, and the dot is the
price sticker from the home page. It reads at 16px, which is why there is no lettering in it.

- Drawing: `public/brand/shipeast-mark.svg` (the same file is `src/app/icon.svg`, the favicon).
- In pages: `<BrandMark />` (`src/components/site/brand-mark.tsx`), drawn in role colours.

This is our own mark. The client's logo file was emailed to the owner and is not in the repo;
if he wants his logo used instead, replace the SVG and re-run the script.

## The logo

The mark, then "Ship" in ink and "East" in crimson, set in Bricolage Grotesque Bold. On dark
backgrounds "East" is blush and the mark gets a cream ring.

| File                                                                 | Use                                             |
| -------------------------------------------------------------------- | ----------------------------------------------- |
| `public/brand/shipeast-logo.png`                                     | on light backgrounds (transparent, 1040×280)    |
| `public/brand/shipeast-logo-on-dark.png`                             | on crimson, oxblood or leaf                     |
| `public/brand/shipeast-mark.svg`                                     | the mark alone, any size                        |
| `public/brand/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | phone home-screen icons (`src/app/manifest.ts`) |
| `src/app/favicon.ico`, `src/app/icon.svg`, `src/app/apple-icon.png`  | browser tab and iPhone icons                    |

## Colours and type

Crimson `#AE0E31` leads. Oxblood `#4A0B1C`, cream `#FFF8EE`, leaf `#16603D` and mango `#FFC83D`
support it. Headings: Bricolage Grotesque 600. Text: Figtree. The gift note: Caveat. Full
values are in `src/app/globals.css` and `docs/TOKENS.md`.

## Share cards (the picture shown when a page is shared)

One 1200×630 card per main page: the logo, the page's promise, one picture, on a flat brand
colour. They are the `opengraph-image.png` files beside each page, each with an
`opengraph-image.alt.txt`.

| Page                                 | Card                                      |
| ------------------------------------ | ----------------------------------------- |
| Home, and every page without its own | crimson, groceries, gift note and sticker |
| `/shop`                              | cream, four of ShipEast's own products    |
| `/baskets`                           | mango, bags of vegetables                 |
| `/how-it-works`                      | oxblood, the till receipt                 |
| `/delivery`                          | leaf, downtown Kingston                   |
| `/gifts`                             | crimson, a gift being tied, the note      |
| `/about`                             | cream, a family cooking                   |
| `/track`                             | oxblood, the bag at the door              |
| `/faq`, `/contact`                   | cream and crimson, the mark               |

Product pages share the product's own picture; `public/brand/og-default.png` is the fallback.

## Regenerating

```bash
node scripts/brand-assets.mjs
```

Edit the titles, photos or colours in `scripts/brand-assets.mjs`, run it, then copy
`src/app/opengraph-image.png` to `public/brand/og-default.png`. It needs Playwright and network
access for the fonts and photos. `src/app/favicon.ico` is made from `icon-512.png`.
