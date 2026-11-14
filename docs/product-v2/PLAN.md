# Product v2: `/product/[slug]`: plan

## Manager approval and amendments (November 14, 2026)

Approved, with these amendments. They override the body of the plan where they clash.

1. **Substitution default (§7 Q1): fix it in this PR.** The client's default is "Ask me first"
   (`docs/CLIENT-NOTES.md` item 5). In `src/app/(site)/checkout/checkout-form.tsx`, change the
   fallback `'allow_similar'` to the ask-first value the schema already uses: check the zod
   enum and the type, and add `ask_first` only if it is missing. Make sure any test or demo
   order still passes. The page's "We ask you first" line is then true.
2. **Stage caption (§7 Q2): keep it, shorter.** Use "Store catalogue picture. Packaging may
   vary." Show it only under the client's pack shots, never under Unsplash photos or the label.
3. **Add bar (§7 Q3): below 1024px, as planned.**
4. **Baskets section (§7 Q4): hidden when no basket we can buy today holds the product.** No
   placeholder.
5. **No visible change to other pages.** Before/after screenshots of `/`, `/shop/groceries` and
   `/shop/pharmacy` must match (pixel diff) after the `TileBasketControl` hook lift and the
   `MoreFromShop` props change.


Design agent, November 14, 2026. Status: **draft for the manager's review.** No code changed.

Scope: everything between the site shell's header and its oxblood footer on `/product/[slug]`.
The shell, `ShelfCard`, the shop listing and the home page must not change visibly. Metadata,
`generateStaticParams` and the JSON-LD block of today's page stay as they are.

Skills used: `frontend-design` (two passes, §5) and `ui-ux-pro-max` (`--design-system` for
"grocery e-commerce product detail page"; `--domain ux` for sticky bars, focus not obscured,
steppers, loading feedback, image sizing). Its design system came back green and orange, Rubik
and Nunito Sans, "vibrant block-based", and a "feature grid + social proof" pattern: all
rejected (brand colours and fonts are fixed; we have no social proof to show). The `landing`
domain had no match for product pages, so the page pattern is our own. Kept from it: one strong
CTA repeated in a sticky bar, 150–300ms colour-shift hovers, offset sticky UI with
`scroll-padding` so focus is never hidden, serve images at the size they are shown, keep the
skeleton in the final geometry, motion off under reduced motion.

## Real data this page has

| Field | What is there | Used as |
| --- | --- | --- |
| `name`, `size` | 80 items; 5 client items have an empty `size` | h1, size line (hidden when empty) |
| `priceCents` + `settings.jmdPerUsd` | every item | USD price, "about J$…" guide |
| `unitPriceLabel(size, priceCents)` | works for most kg / lb / oz / count sizes, else null | unit line (hidden when null) |
| `imagePath` | 58 client pack shots, `/products/*.jpg`, **640px at most** | the stage (shown no wider than 440 CSS px) |
| `productPhotos[slug]` | 13 placeholder items have an Unsplash photo | the stage, photo variant |
| neither | 9 items | branded shelf-label placeholder |
| `status` | `visible` or `out_of_stock` (Ground Coffee) | buy box state |
| `categoryId`, `aisleId` | every item has a department; most an aisle (`getAisleNames()`) | breadcrumb, aisle link, related |
| `priceCheckedAt` | every item (client items November 7, 2026) | "Price checked in store on November 7, 2026" |
| `description` | generated sentence ("…Bought at a store in Jamaica on the day we deliver.") | one line in Details |
| baskets | 4 demo baskets, built from the placeholder items only; the Christmas hamper holds Ground Coffee (out of stock) so it can't be bought | "In a ready-made basket" (orderable only) |
| substitution | no per-product field; the client's default is "Ask me first" (`SUBSTITUTION_RULES`) | the sold-out line |
| zones | St. Thomas and Kingston, cut-off via `earliestCutoff` | delivery line |

No ratings, reviews, sales counts or stock numbers exist, so none are shown. No sticker, no
"Our pick", no "Bestseller". The 58 client items are in no basket today, so the basket section
will usually be absent: that is the honest default, not a bug.

---

## 1. Structure blueprint

### 1.1 Whole page at 1440 (`max-w-wide` 1280, gutter 32)

```
┌ SiteShell header (not in scope) ─────────────────────────────────────────── ~178px ┐
│ A. TRAIL  Shop › Groceries › Rice & grains › Kings Basmati Rice           48px     │
│ ┌ B. STAGE  col 1–6 ───────────────┐   ┌ C. BUY BOX  col 8–12  (sticky) ─────────┐ │
│ │ grey square, 24px corners        │   │ [Rice & grains]  aisle link              │ │
│ │                                  │   │ Kings Basmati Rice           h1 27px     │ │
│ │          ┌──────────┐            │   │ 6.8 kg / 15 lb                           │ │
│ │          │ pack shot│ ≤440px     │   │ USD$24.83    about J$3,899               │ │
│ │          │  whole   │            │   │ USD$1.66 per lb                          │ │
│ │          └──────────┘            │   │ [ − 1 + ] [   + Add to basket       ]    │ │
│ │                                  │   │ ───────────────────────────────────────  │ │
│ │ Picture from the store's         │   │ (?) Sold out on the day? We ask you first│ │
│ │ catalogue. Packs can change.     │   │ (clk) Order by 1:00 PM… aim same day…    │ │
│ └──────────────────────────────────┘   │ (pin) St. Thomas and Kingston only       │ │
│ ┌ D. DETAILS col 1–6 ──────────────┐   │ ┌ PROOF TICKET oxblood 16px ───────────┐ │ │
│ │ Size │ Aisle │ Per unit │ Checked│   │ │ You see it twice  [rcpt] [door]      │ │ │
│ └──────────────────────────────────┘   │ └──────────────────────────────────────┘ │ │
│                                        └──────────────────────────────────────────┘ │
│ E. IN A READY-MADE BASKET (only if any)   3 compact basket cards in a row          │
│ F. MORE FROM RICE & GRAINS                6 ShelfCards in a row     See all →      │
│ G. HELP STRIP  Can't find it? │ Ask us on WhatsApp                                 │
├ SiteShell footer (not in scope) ───────────────────────────────────────────────────┤
```

### 1.2 Whole page at 375 (gutter 16)

```
┌ header + search row ─────── ~164px ┐
│ A. ‹ Groceries          (44px row) │
│ ┌ B. STAGE  4:3, 343×257 ────────┐ │
│ │        [ pack shot ]           │ │
│ └────────────────────────────────┘ │
│ C. [Rice & grains]                 │
│ Kings Basmati Rice        h1 23px  │
│ 6.8 kg / 15 lb                     │
│ USD$24.83  about J$3,899           │
│ USD$1.66 per lb                    │
│ [ − 1 + ][  + Add to basket    ]   │  ← at ~y 760: inside the first screen (812)
│ (?) Sold out… We ask you first     │
│ (clk) Order by…  (pin) St. Thomas… │
│ ┌ proof ticket oxblood ──────────┐ │
│ └────────────────────────────────┘ │
│ D. Details (4 rows)                │
│ E. Baskets rail (if any)           │
│ F. More from Rice & grains (rail)  │
│ G. Help strip, stacked             │
│ ┌ H. DOCK sticky bottom ─────────┐ │  appears once the buy box's Add scrolls away;
│ │[img] Kings Basmati  [+ Add]    │ │  settles above the footer, never over it
│ └────────────────────────────────┘ │
├ footer ────────────────────────────┤
```

### 1.3 Section by section

**A. Trail.** Pattern: one slim text row, left aligned, on `bg-page`. Container `mx-auto
max-w-wide gutter`, `pt-4 pb-3 lg:pt-5 lg:pb-4`; 44px tall at 375, 48px at 1440. 375 and 768:
a single back link to the department ("‹ Groceries"), because a four-step trail wraps to three
lines on a phone. 1024+: the full trail Shop › Department › Aisle › Name. Why: PriceSmart's
product page opens on a promo strip and a long category path; ours gives one tap back to the
shelf the sender came from.

**B + C. Stage and buy box (the hero).** Pattern: a split product stage, **6 / 5 columns with
one empty column between** (`lg:grid-cols-12`, stage `col-span-6`, buy box `col-start-8
col-span-5`). Background: page grey, with the stage itself a `bg-surface-muted` square and the
buy box sitting on the page with no card around it (one surface, not boxes inside boxes).
Container `max-w-wide gutter`. Height: stage is square at 768+ (≈592px at 1440, ≈470 at 1024, 544 at
768) and 4:3 at 375 (343×257, so the Add button lands inside an 812px screen); the buy box is content-led (≈560px at 1440) and `lg:sticky` so it stays beside the stage
and details while they scroll.
Columns: 375 and 768 one column, stage first then buy box (768: stage capped at `max-w-[34rem]`
centred so it isn't a 700px square). 1024 and 1440: the split.
Inner blocks: stage = 1 pack shot (or photo, or label) + 1 caption. Buy box = aisle link, h1,
size, price group (3 lines), control row, divider, 3 promise lines, 1 proof ticket.
Why it beats the competitors: grocerylistjamaica.com shows a small image, a price and an "add"
with no word on what happens if the store is out, when it arrives, or how you'll know it was
bought. We answer all three inside the first screen, next to the button, and the proof ticket
is something no competitor can claim. It is deliberately not the shop's crimson band: the shop
is for browsing, this page is for one decision, so the product is the hero and red is spent on
the single action.

**D. Details.** Pattern: a four-row definition list (two columns of label/value at 768+), on
`bg-surface`, `rounded-xl` (16px), `border border-line`, `p-card`. Sits under the stage at
1024+ (`lg:col-span-6`), under the buy box below 1024. Blocks: Size, Aisle (link), Price per
unit, Price checked in store, then the description sentence under the list. Rows whose value is
missing are left out (no "—").

**E. In a ready-made basket.** Only when at least one orderable basket contains this product.
Pattern: a row of compact horizontal basket cards. Container `max-w-wide gutter`, `pt-10
lg:pt-12`. 375: rail, cards `w-[85%]`, the next peeks. 768: rail, `w-[60%]`. 1024+: `grid
grid-cols-3 gap-4` (with 1–2 baskets they sit left, they don't stretch). Card = photo 4:3
112px wide + name + "{n} items, with {q} × {product name}" + mango price tag + Add basket.
Max 3. Why: on PriceSmart the bundle and the item never meet; here a sender buying rice sees
the family food basket that already includes it.

**F. More from the aisle.** Pattern: the shop's product rail (`MoreFromShop`, generalised).
Container `max-w-wide gutter`, `pt-10 lg:pt-12`. 375 rail of `ShelfCard`s at `w-[42%]` (2.3
visible), 768 `w-[28%]`, 1024 `grid-cols-4` (first 4), 1280+ `grid-cols-6`. Up to 6 items:
same aisle first (visible before out of stock, then `featured`, then name), topped up from the
same department. Title "More from Rice & grains" (or "More from Groceries" when topped up past
half). Link "See all" to the aisle or department.

**G. Help strip.** `ListingHelpRow` as on the shop (`mt-12`), then `pb-12 lg:pb-16` to the
footer. Why: a family list always has one item we don't list.

**H. Dock (below 1024 only).** Pattern: a sticky bottom bar, the **last child of the page's
content wrapper** with `position: sticky; bottom: 0`, not `fixed`. It therefore occupies its
own 64px at the end of the content and settles there, so it can never cover the help strip or
the footer, and no spacer is needed. It is translated out of view while the buy box's control
row is on screen. Blocks: 40px thumbnail, name (1 line) + price, the shared basket control.

---

## 2. Styling, section by section

Shared rules for this page: headings `font-display font-semibold` (Bricolage 600); body
Figtree 400 at `text-small` (14px); prices, buttons and labels 600/500; nothing bolder than
600. Radius: stage 24px (`rounded-2xl`), details / proof ticket 16px (`rounded-xl`), basket
cards 16px, `ShelfCard` 12px, buttons / inputs / thumbnails 8px (`rounded-md`). Colours:
crimson for the one action and links; oxblood for the proof ticket and pressed fills; leaf only
for "in your basket" and the Jamaica pin; mango only for basket price tags. Focus: the global
3px `signal` ring; `on-dark-focus` (blush ring) inside the proof ticket.

### 2.A Trail

- Below 1024: `Link` "‹ {Department}" to `/shop/{slug}`: `inline-flex h-control items-center
  gap-1 -ml-2 px-2 rounded-md text-small font-medium text-ink-body hover:text-crimson
  hover:bg-surface-muted`, `ChevronLeft size-icon`. With no aisle and no department: "‹ Shop".
- 1024+: `Breadcrumb` (existing component, unchanged): Shop › Department › Aisle (link to
  `/shop/{dept}?aisle={slug}`, the URL the shop's aisle chip uses via `shopHref`) › name
  (`aria-current="page"`, `line-clamp-1 max-w-[40ch]`).

### 2.B Stage (`ProductStage`, new)

- Frame: `relative aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl bg-surface-muted` (+
  `photo-loading` while a picture loads; `data-loaded` already clears it via `FadeImage`).
  768: `mx-auto w-full max-w-[34rem]`.
- **Pack shot:** `next/image` via `FadeImage`, `fill`, `object-contain mix-blend-multiply`,
  inside an inner box `absolute inset-[12%] lg:inset-[14%] max-w-[440px] max-h-[440px] m-auto`
  so a 640px source is never shown wider than 440 CSS px. `sizes="(min-width: 1024px) 440px,
  76vw"`, `priority` (it is the LCP element), `alt` = "{name}, {size}". Out of stock:
  `opacity-60`.
- **Caption** (pack shots only): `absolute inset-x-0 bottom-0 px-4 pb-3 text-xs text-ink-muted
  text-center`: "Picture from the store's catalogue. Packs can change." Honest, because the
  driver buys what's on the shelf in Jamaica that day.
- **Stock photo** (`productPhotos[slug]`): `StockImage` filling the square, `object-cover`, no
  blend, no caption (credits live on `/photo-credits` as today).
- **No picture: the shelf label.** It must look designed, not missing. Centred inside the grey
  square: a white price-label card `w-[72%] max-w-[22rem] rounded-xl bg-surface p-card-lg
  shadow-lift border-t-4 border-crimson` (the one floating layer on the stage). Inside:
  department icon in a `size-12 rounded-md bg-surface-selected text-crimson grid
  place-items-center` well (`Wheat` / `SprayCan` / `Pill` / `Baby`, the same map as
  `ProductImage`), the name `mt-4 font-display text-title font-semibold text-ink text-balance`,
  the size `mt-1 text-small text-ink-muted`, then a hairline and `mt-3 text-xs text-ink-muted`
  "No picture yet. We buy exactly the item named." `aria-hidden` on the card (the h1 says it). Below 768 (the 4:3 stage) the card uses `p-card`,
  the icon well drops to `size-10` and the note line is hidden, so it fits 257px.
- Out of stock: a pill `absolute top-4 left-4 rounded-md bg-surface px-3 py-1.5 text-xs
  font-semibold text-ink shadow-lift` "Out of stock today".
- Motion: none on the stage (it is the LCP). No hover zoom, no lightbox: the source images are
  640px and zooming would show blur.

### 2.C Buy box (`BuyBox`, new; static parts on the server, the control streams)

Container: `flex flex-col lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start`
(same offset as the shop sidebar), `pt-6 lg:pt-0`.

1. **Aisle link** (when the product has an aisle): `inline-flex self-start h-8 items-center
   rounded-md bg-surface-selected px-2.5 text-xs font-semibold text-crimson-deep
   hover:bg-crimson hover:text-on-dark transition-colors duration-200`; 24px target is fine as
   an inline link, but give it `py-2 -my-2` hit padding to reach 44px. Without an aisle, the
   department name.
2. **h1:** `mt-3 font-display text-title font-semibold text-ink text-balance` (23 → 27px).
3. **Size:** `mt-1 text-small text-ink-muted` (omitted when empty).
4. **Price group** `mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5`:
   USD `font-display text-h3 font-semibold text-ink tabular-nums` (19 → 21px: one step above
   the shelf's 18px, still compact) with `formatUsd`; "about {formatJmd(usdCentsToJmd(…))}"
   `text-small font-medium text-ink-muted tabular-nums`; on its own line the unit price
   `w-full text-small text-ink-body tabular-nums` ("USD$1.66 per lb"). Under it, `text-xs
   text-ink-muted`: "You pay in US dollars. J$ is a guide at J$157 to USD$1."
5. **Control row** `mt-5` (client, `ProductBasketControl`, §3), three states:
   - *Not in basket:* `flex gap-2`. Picker: `inline-flex h-control rounded-md border-control
     border-line-strong bg-surface` with two `size-control` buttons (`Minus`, `Plus`,
     `text-crimson hover:bg-surface-muted active:bg-surface-strong`, disabled `text-ink-disabled`)
     and an `output w-9 text-small font-semibold tabular-nums`. Button: `btn-slide flex-1
     inline-flex h-control items-center justify-center gap-2 rounded-md bg-crimson px-5
     text-small font-semibold text-on-dark [--slide:var(--color-crimson-deep)]
     active:translate-y-px`, `Plus size-icon`, "Add to basket" + sr-only " {name}". Posts
     `quantity = picked` to `setProductQuantity`.
   - *In basket:* the row becomes the leaf stepper, `flex h-control w-full rounded-md bg-leaf
     text-on-dark` (`Trash2` at 1 / `Minus`, "{n} in your basket", `Plus`; buttons `w-11
     hover:bg-leaf-deep`), posting absolute targets, exactly as `TileBasketControl`. Under it
     `mt-2 text-small`: link "Go to basket" `font-semibold text-crimson underline
     underline-offset-2 hover:text-crimson-deep`. Max 20 (`MAX_QUANTITY`): `+` disables with
     the title "20 is the most per item".
   - *Out of stock and not in basket:* no button. A `rounded-lg bg-surface-muted p-4` note:
     `text-small font-semibold text-ink` "Out of stock today" + `text-small text-ink-body`
     "The store is out right now. We restock often." + link "See more {aisle or department}"
     (`text-crimson font-semibold underline`). Out of stock but already in basket: the leaf
     stepper with `+` disabled and "Out of stock now. We follow your swap choice." (same copy
     as the shop tile).
   - Pending: the pressed button shows a 16px `LoaderCircle animate-spin` in place of the icon
     and `aria-busy`; the stepper shows the target number at once. Errors: `mt-2 text-small
     font-medium text-danger` with the action's message. One `aria-live="polite"` region
     announces "{name}: 2 in your basket. 5 items in total." / "removed".
6. **Divider** `mt-6 border-t border-line`, then **promise lines** `mt-5 flex flex-col gap-3
   text-small text-ink-body`, each `flex gap-3`, icon `size-icon shrink-0 mt-0.5` decorative:
   - `MessageCircleQuestion text-crimson`: **"Sold out on the day? We ask you first."**
     (`font-semibold text-ink`) then the `ask_first` body from `SUBSTITUTION_RULES`: "We
     message you before swapping anything. No answer in time means we leave it out and refund
     it." You can change this at checkout.
   - `Clock text-crimson`: "Order by {formatClockTime(earliestCutoff)} Jamaica time and we aim
     to deliver the same day. Delivery times are estimates." (No zones: "Delivery is paused for
     now. Check back soon.")
   - `MapPin text-leaf`: "We deliver in {joinParishes(zones)} only." (hidden with no zones).
7. **Proof ticket** `mt-6 rounded-xl bg-oxblood p-card text-on-dark on-dark-focus`: the page's
   one bold block (§5). Layout: `grid grid-cols-[1fr_auto] gap-4 items-center`.
   Left: h2 `font-display text-body font-semibold` "You'll see it bought and delivered", then
   `mt-1 text-small text-on-oxblood-muted` "A photo of the till receipt when we finish
   shopping, and a photo of the bags at the door." and a link `mt-2 inline-flex min-h-control
   items-center text-small font-semibold text-blush underline underline-offset-2` "How it
   works" → `/how-it-works`.
   Right: two small proof objects overlapping by 12px, decorative (`aria-hidden`): a paper
   receipt `w-16 h-20 bg-surface receipt-edge rotate-[-4deg]` with three `h-1 rounded-sm
   bg-surface-strong` lines and a `ReceiptText size-icon text-ink-muted`; and a door photo
   `size-16 rounded-md overflow-hidden rotate-[3deg] ring-2 ring-surface` (the home proof
   band's door photo, `StockPhoto` by the same registry name, `sizes="64px"`). Below 360px the
   objects hide (`max-[359px]:hidden`).
   Hover: none (it is not a link as a whole). Motion: none.

### 2.D Details

`section aria-labelledby="details-title"`, h2 `font-display text-lead font-semibold`
"About this item" (`text-lead` here is 18 → 20px). `dl mt-3 grid gap-x-8 gap-y-3
md:grid-cols-2`; each row `flex flex-col`: `dt text-xs font-medium text-ink-muted`, `dd
text-small font-medium text-ink`. Rows: Size; Aisle (link `text-crimson underline`); Price per
unit; "Price checked in store" → `formatDate(priceCheckedAt)` ("November 7, 2026"). Then `p
mt-4 border-t border-line pt-4 text-small text-ink-body` with the description. `mt-6
lg:mt-8` below the stage. No motion.

### 2.E In a ready-made basket (`ProductBaskets`, new)

- Data: `getBaskets()` filtered to baskets whose `items` include `product.id`, run through
  `buildBasketRows` and kept only when `unavailable` is empty; first 3.
- Header row: h2 `font-display text-title font-semibold` "In a ready-made basket"; under it
  `text-small text-ink-body` "{name} comes in these baskets. Add one in a tap."
- Card: `group relative flex gap-3 card-rise rounded-xl border border-line bg-surface p-2
  hover:border-line-hover has-[h3_a:focus-visible]:outline-3 …outline-signal` (the home basket
  card's focus pattern). Photo `basketPhotos[slug]` via `StockPhoto`, `w-28 aspect-[4/3]
  rounded-md photo-loading shrink-0`, `sizes="112px"`; missing photo: `bg-surface-muted` with
  `ShoppingBasket text-ink-muted`. Text column `flex flex-1 flex-col py-1 pr-1`: h3
  `font-display text-small font-semibold` with the stretched link to `/baskets/{slug}`; `text-xs
  text-ink-muted` "{itemCount} items, with {qty} × {product name}"; price tag `mt-2 self-start
  -rotate-2 rounded-full bg-mango px-3 py-0.5 font-display text-small font-semibold text-ink
  tabular-nums group-hover:rotate-0 transition-transform duration-250`; `HomeAddButton
  kind="basket"` label "Add basket" at `mt-auto pt-2 relative z-raised`.
- Hover: `card-rise` lift and border; the tag straightens. Pressed: `card-rise:active`.
- Motion: none on entry (below the fold; the rail is plain).

### 2.F More from the aisle

`MoreFromShop` with new optional props (see §3); markup, card sizes and `placeholder="icon"`
unchanged. Wrapped in `ListingNavProvider` so `TileBasketControl` announces through one live
region (today it would fall back to a silent no-op). Quantities from the basket cookie.

### 2.G Help strip

`<ListingHelpRow itemRequests={settings.features.item_requests} whatsapp={settings.whatsapp} />`.

### 2.H Dock (`ProductDock`, new, client)

- Wrapper: `lg:hidden sticky bottom-0 z-sticky mt-8 border-t border-line bg-surface
  shadow-float pb-[env(safe-area-inset-bottom)]`, inner `mx-auto max-w-wide gutter flex h-16
  items-center gap-3`. Thumb `size-10 rounded-md bg-surface-muted` with the pack shot
  `object-contain p-1 mix-blend-multiply` (label placeholder → department icon). Text `min-w-0
  flex-1`: name `truncate text-small font-semibold text-ink`, price `text-xs font-medium
  text-ink-muted tabular-nums` "USD$24.83 · about J$3,899" is **not** allowed (middle-dot
  joins are banned); use two spans: USD `font-semibold text-ink` then " about J$3,899".
  Control: the shared control in its compact form, `w-36` (Add only, no picker, `Plus`
  "Add"; in basket: the leaf stepper; out of stock: the dock is not rendered).
- Show/hide: an `IntersectionObserver` on the buy box's control row; while it intersects, the
  dock gets `data-hidden` → `translate-y-full opacity-0 pointer-events-none` and `inert`.
  Transition `transform 250ms var(--ease-out-soft), opacity 200ms`. Reduced motion: no slide,
  instant swap. No JavaScript: the dock is always shown (it still works as a form post).
- Focus never hidden: `globals.css` gets `html:has([data-product-dock]) { scroll-padding-bottom:
  5rem }` below 1024 (WCAG 2.4.11), so tabbing to a card scrolls it clear of the dock.
- Support chat: its fixed button (bottom-right, `bottom-4`) would sit on the dock's Add. Add
  `--dock-offset` to `globals.css`: `html:has([data-product-dock]:not([data-hidden])) {
  --dock-offset: 4.5rem }` below 1024, and the chat wrapper becomes `bottom-[calc(1rem+var(
  --dock-offset,0px))] sm:bottom-[calc(1.5rem+var(--dock-offset,0px))]` with `transition-[bottom]
  duration-250`. Every other page has no dock, so the chat stays exactly where it is there.

### 2.I Motion, the whole page

One orchestrated moment, on load, CSS only (before JavaScript, lets go after playing): the buy
box's price group, control row and proof ticket `animate-rise` with delays 0 / 80 / 160ms. The
stage and h1 do not animate (LCP and the heading paint at once). Below the fold: sections
`Reveal y={0}` (fade only, as the home headers), no staggered cards. Hovers: `btn-slide` on
the Add button (300ms in, 200ms out), `card-rise` on cards (400ms `ease-hover`), 200ms colour
on links and chips. Pressed: `active:translate-y-px` on buttons. Reduced motion: the global
rule zeroes all of it; the dock swaps instantly.

### 2.J Loading skeleton

`src/app/(site)/product/[slug]/loading.tsx` renders `ProductSkeleton` in the final geometry:
trail line `skeleton h-4 w-48`; stage `skeleton aspect-square rounded-2xl` (same columns);
buy box: `h-6 w-28`, `h-8 w-4/5`, `h-4 w-24`, `h-6 w-40`, `h-control w-full`, three `h-4`
lines, `h-28 rounded-xl`. The control row inside the page has its own Suspense fallback:
`skeleton h-control w-full rounded-md` (not a working Add: a fallback Add would post 1 and
overwrite an existing quantity). The related rail's fallback is four `ShelfCard`-sized
skeletons (`aspect-square` + three lines + `h-control`). `aria-busy="true"` on the fallback
wrappers.

### 2.K Empty and edge states

| State | What shows |
| --- | --- |
| No picture | shelf-label placeholder (§2.B); dock thumb = department icon |
| Stock photo only | photo fills the stage, no catalogue caption |
| Empty `size` | size line, size row and unit line hidden; alt = name only |
| Out of stock | stage pill, faded pack shot, out-of-stock note instead of Add, no dock, JSON-LD `OutOfStock` |
| In no orderable basket | section E not rendered (no "not in any basket" text) |
| No related items | section F not rendered; the trail's back link is the way out |
| No zones | delivery line "Delivery is paused for now. Check back soon.", pin line hidden |
| Long name (49 chars) | h1 wraps to 2 lines `text-balance`; dock name truncates |
| Unknown slug | `notFound()` as today |

---

## 3. Component map

**Page:** `src/app/(site)/product/[slug]/page.tsx` (rewrite). Server component. Static reads
(cached loaders): `getProduct`, `getProducts`, `getCategories`, `getAisleNames`,
`getSettings`, `getActiveZones`, `getBaskets`. Keeps `generateStaticParams`,
`generateMetadata`, JSON-LD. Pure helper `relatedProducts(product, products, 6)` and
`basketsWith(productId, summaries, products)` go in a new `src/lib/product-page.ts` with unit
tests (`product-page.test.ts`: aisle first, top-up from department, excludes self and hidden,
orders visible before out of stock; baskets drop unorderable ones). The control and the related
rail read `readBasket()` (cookies) inside `<Suspense>`.

| File | Action | Props / notes |
| --- | --- | --- |
| `src/components/product/product-stage.tsx` | add (server) | `{ product: Product; categoryId: string }`; pack shot / stock photo / shelf label |
| `src/components/product/buy-box.tsx` | add (server) | `{ product; aisle: {name; href} \| null; jmdPerUsd; cutoff: string \| null; parishes: string[]; control: ReactNode }` |
| `src/components/product/product-basket-control.tsx` | add (client) | `{ productId; name; quantity; inStock; variant: 'full' \| 'dock' }`; `useActionState(setProductQuantity)`, local picker, optimistic target, live region; shares logic with the shop tile via a small hook |
| `src/components/product/product-buy-provider.tsx` | add (client) | context holding `quantity`, the action state and `controlRef`, so the buy box and dock stay in step |
| `src/components/product/product-dock.tsx` | add (client) | `{ product; jmdPerUsd }` + the provider; `data-product-dock`, observer |
| `src/components/product/product-details.tsx` | add (server) | `{ product; aisle; unitPrice }` |
| `src/components/product/product-baskets.tsx` | add (server) | `{ rows: BasketRow[]; product }` |
| `src/components/product/proof-ticket.tsx` | add (server) | no props |
| `src/components/product/product-skeleton.tsx` + `loading.tsx` | add | §2.J |
| `src/lib/basket/use-quantity-control.ts` | add (client hook) | lifted from `TileBasketControl`: target, pending, focus follow, announce; **`TileBasketControl` switches to it with identical output** |
| `src/components/shop/listing/more-from-shop.tsx` | change | add optional `title = 'More from the shop'`, `href = '/shop'`, `linkLabel = 'Shop everything'`, `headingId = 'more-from-shop'`; defaults keep the shop byte-for-byte |
| `src/components/home/support-chat.tsx` | change | bottom offset reads `var(--dock-offset,0px)` (0 everywhere else) |
| `src/app/globals.css` | change | `--dock-offset` and `scroll-padding-bottom` rules under `html:has([data-product-dock])`, `max-width: 1023px` |
| `ShelfCard`, `TileBasketControl` UI, `Breadcrumb`, `ListingHelpRow`, `ListingNavProvider`, `HomeAddButton`, `FadeImage`, `StockImage`, `StockPhoto`, `ProductImage` | reuse unchanged | |
| `src/components/pages/shop/stagger-product-grid.tsx` | delete | only this page used it |
| `TrustRow` in `src/components/pages/shop/shop-promises.tsx` | delete the export | `requestLink` stays (shop and search use it) |
| `AddToBasket`, `Price`, `QuantityStepper`, `deliveryPromise` | keep | still used by search, baskets and the styleguide; this page stops using them |

Data functions: `getProduct`, `getProducts`, `getAisleNames`, `getCategories`, `getSettings`,
`getActiveZones`, `getBaskets`, `buildBasketRows`, `earliestCutoff`, `joinParishes`,
`unitPriceLabel`, `readBasket`, `setProductQuantity`, `SUBSTITUTION_RULES`, and from
`format.ts`: `formatUsd`, `formatJmd`, `usdCentsToJmd`, `formatDate`, `formatClockTime`.
No new tokens are needed; every class above exists in `globals.css`.

Before/after guard: screenshot `/shop/groceries` (thin department "More from the shop" on
`/shop/pharmacy`) and the home shelf at 375 and 1440 before the `MoreFromShop`, hook and
support-chat changes, and compare after. The chat button must sit at the same pixel on `/`.

---

## 4. Copy (all of it)

Trail "Groceries" / "Shop". Caption "Picture from the store's catalogue. Packs can change."
Label card "No picture yet. We buy exactly the item named." Price note "You pay in US dollars.
J$ is a guide at J$157 to USD$1." Button "Add to basket" / dock "Add"; "{n} in your basket";
"Go to basket"; "Out of stock today"; "The store is out right now. We restock often."; "See
more Rice & grains". "Sold out on the day? We ask you first." + rule body + "You can change
this at checkout." Delivery "Order by 1:00 PM Jamaica time and we aim to deliver the same day.
Delivery times are estimates." "We deliver in St. Thomas and Kingston only." Ticket "You'll
see it bought and delivered" / body / "How it works". "About this item", "Price checked in
store". "In a ready-made basket" / "{name} comes in these baskets. Add one in a tap." "More
from Rice & grains" / "See all". No "Same-day delivery" promise anywhere on the page.

---

## 5. Self-review against generic defaults (pass 2)

- First draft put the buy box in a white bordered card beside the image, with a "With every
  order" row of three icon cards under it: the stock e-commerce kit, and it was today's page.
  Removed the card (the buy box sits on the page, divided by one rule) and folded the promises
  into three plain lines next to the button, where the decision happens.
- First draft spent red on a crimson title band like the shop. That repeats the neighbouring
  page's hero (BRAIN §5). Red now goes to the one action; the bold block is the **oxblood proof
  ticket** with a little receipt and a door photo: the thing only ShipEast can promise, shown
  as objects, not as an icon row. That is where the page spends its boldness.
- First draft had a 7-column stage (≈690px square) and a zoom lightbox. Too "zoomed in" for the
  owner, and the 640px pack shots would blur. Now 6 columns, the image capped at 440px, no zoom.
- First draft used an eyebrow above the h1. Replaced with the aisle link: it carries
  information and takes you somewhere.
- First draft used a `fixed` bottom bar with a spacer. Replaced with `sticky` as the last child,
  which cannot cover the footer by construction, plus scroll padding and a chat offset.
- Checked for tells: no gradients, no middle-dot meta strings, no "→" glued to link text, no
  all-caps labels, no numbered markers (nothing here is a sequence), one shadowed layer per
  context (label card, dock), radii follow hierarchy (24 / 16 / 12 / 8).

## 6. Acceptance checklist

- [ ] At 375×812 the h1, USD price and Add button are visible without scrolling, for a client
      pack-shot item (e.g. `/product/kings-basmati-rice-6-8-kg-15-lb`).
- [ ] At 1440×900 stage and full buy box (to the proof ticket's top) are in the first screen.
- [ ] Pack shot shows whole, blended on `bg-surface-muted`, never rendered wider than 440 CSS px.
- [ ] A no-picture item (`paper-towels-12`, `diapers-size-3`) shows the shelf label; a
      stock-photo item (`toilet-paper-30`) fills the stage without the catalogue caption.
- [ ] `/product/ground-coffee-24oz`: no Add, out-of-stock note with a working link, no dock.
- [ ] Add posts the picked quantity; the control turns leaf with "{n} in your basket"; the
      header count updates; the dock shows the same state; reload keeps it (cookie).
- [ ] Stepper clamps at 20; Trash at 1 removes; works with JavaScript off (plain form posts).
- [ ] Dock appears only after the buy box control leaves the screen, settles above the help
      strip at the end, never overlaps the footer, and is absent at 1024+.
- [ ] With the dock shown, the support chat button sits above it; on `/` and `/shop` the chat
      is at the same position as before (screenshot compare).
- [ ] Tabbing through the related rail at 375 never leaves the focused card under the dock.
- [ ] Basket section shows for `long-grain-rice-10lb` (Family food basket) and is absent for
      every client item; the Christmas hamper never shows (Ground Coffee is out of stock).
- [ ] Related rail: same aisle first, never the product itself, `ShelfCard` identical to shop.
- [ ] "Price checked in store on November 7, 2026" for client items; all money via `format.ts`.
- [ ] No "same-day delivery" promise; the line says "we aim to" and "times are estimates".
- [ ] No ratings, reviews, stickers, counts or "Our pick"; lucide icons only; no raw hex, no
      gradients; weights ≤ 600 (wordmark aside); radius ≤ 24px (`home-guard` style check).
- [ ] Reduced motion: no rise, no dock slide. Contrast AA for blush and on-oxblood-muted on
      oxblood, crimson-deep on surface-selected (added to the contrast test if new).
- [ ] No horizontal scroll at 375, 768, 1024, 1440. Screenshots at all four reviewed.
- [ ] `/shop/groceries`, `/shop/pharmacy` and `/` unchanged versus before screenshots.
- [ ] `src/lib/product-page.test.ts` passes; `npm run check` is green.

## 7. Open questions for the manager

1. **Substitution default mismatch.** This page says "We ask you first" (Derion's default),
   but `checkout-form.tsx` defaults to `allow_similar`. Recommend a one-line change to
   `ask_first` at checkout, or this page's promise is false. In scope or a separate PR?
2. The stage caption "Picture from the store's catalogue. Packs can change." Keep, or is it
   too cautious for the owner's taste?
3. Dock below 1024 (phones and tablets) rather than phones only: agreed?
