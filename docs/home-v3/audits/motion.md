# Home v3.3 audit: motion and interaction (owner point 9, "the whole page needs it")

Measured on http://localhost:3100/ (dev, demo mode), Chromium, 1440 and 375 px, deviceScaleFactor 1.
Evidence: `/tmp/claude-0/-home-user-shipeast-web-app/3726e011-a553-5fc4-a6e0-d81ec1f92f75/scratchpad/motion/`
(`faq-click-1440.webm` video of the click, `faq-open-0..3.png` = four frames 60 ms apart, all identical;
`faq.js`, `m2.js`, `m3.js` are the measuring scripts). Skills used: frontend-design (motion that answers
a person's action is welcome; scattered fade-ups read as generic), ui-ux-pro-max `--domain ux`
("animate transform/opacity", "exit faster than enter", "infinite animation only for loaders",
"1–2 key animated elements per view", "reduced motion") and `--domain gsap` (scroll reveal: 300–400 ms,
8–16 px rise, never invisible-by-default without a no-JS fallback).

## 0. What the motion stack is today (facts)

| Thing | Now (measured) |
| --- | --- |
| `motion` / `framer-motion` / `motion-dom` | 14.1.1, `LazyMotion features={domAnimation} strict` + `MotionConfig reducedMotion="user"` (`src/components/motion/motion-provider.tsx`) |
| Tokens | `src/lib/motion.ts`: fast .15 / base .25 / slow .45 / reveal .7 s, `outSoft [0.22,1,0.36,1]`, `inOutSoft [0.65,0,0.35,1]`, rise 16 px, stagger .08 s. CSS twins in `globals.css` L221–226 |
| Scroll reveals | **29 elements** server-rendered with inline `style="opacity:0;transform:translateY(16px)"` (`Reveal`, `Stagger`) |
| Infinite animations | 2: `.ticker` (38 s loop, 3170 px track = **42 px/s**) and `.animate-bob` (hero sticker, 5 s) — plus **8** `photo-loading::before` pulses that never stop after the photo loads |
| Hover lifts | 15 `card-rise` (-4 px + `shadow-lift`, 250 ms), 12 `btn-slide` (fill slides in over **450 ms**) |
| Parallax | 2 (`closing.tsx` photo, `jamaica.tsx` photo), strength 8 % |
| Photo zoom on hover | `scale(1.04)` stock / `scale(1.06)` pack shots over **700 ms** |
| Header | `sticky`, 65 px, gains `shadow-lift` after 8 px over **450 ms**; the oxblood ticker strip and the aisles row scroll away |
| CLS over a full scroll | **0.00** (good — keep it that way) |

LazyMotion check (read in `node_modules`): `domAnimation` = `animations` (animate, variants, **exit**,
whileInView) + gesture animations. `domMax` only adds `drag` and `layout`. Animating `height: 'auto'` is
resolved by `motion-dom`'s `DOMKeyframesResolver` (it measures the end height), so **height:auto works
under `domAnimation` — no `domMax`, no `layout` prop, no bundle growth.** Under `strict`, only `m.*`
components may be used (`motion.*` throws). Reduced motion: `MotionConfig reducedMotion="user"` makes
*positional* keys (`height`, `width`, transforms) instant, while `opacity` still animates — correct
behaviour for a panel.

## 1. FAQ accordion (owner point 9) — P0

**What happens now (measured, 1440 px, item 2 "How will I know it arrived?").** It is a native
`<details>`: on click the item goes from **57 px to 125 px in one frame (+68 px)**, the list from 286 to
354 px, and everything below (the rest of the list, the closing band, the footer) jumps 68 px at once.
Frames at 9 / 28 / 43 … 323 ms after the click are identical. Closing snaps back in the first frame
(125 → 57 px). Meanwhile the `+` icon rotates over 200 ms with Tailwind's default `cubic-bezier(.4,0,.2,1)`
— so one thing glides while the panel teleports: that mismatch is the "sticky jerk" the owner feels.
At 375 px the answers are 68–116 px tall, so the jump is up to 116 px. The open row also keeps the grey
`hover:bg-surface-muted` under the pointer, so the open item looks "stuck" grey (see `faq-open-0.png`).
Several items can be open at once (verified).

**Decision: a new button-based client component, home only for now.** Create
`src/components/ui/faq-accordion.tsx` (`'use client'`) and use it in `src/components/home/questions.tsx`.
Leave `src/components/ui/accordion.tsx` (used by `/faq` with `anchors`, the styleguide and the old
`components/pages/home`) untouched — BRAIN §7 "touch only the page in hand". When `/faq` is redone it
switches to the new component; give it the same `anchors` prop now so that swap is a one-liner.

Spec:

1. **Structure (WAI-ARIA accordion pattern).** Per item: `<h3><button id="faq-btn-{id}" aria-expanded
   aria-controls="faq-panel-{id}">question + icon</button></h3>` and
   `<m.div id="faq-panel-{id}" role="region" aria-labelledby="faq-btn-{id}">`. Button is the full row:
   `flex w-full min-h-14 items-center justify-between gap-4 px-5 py-4 text-left`, 44 px+ target, visible
   focus from the global ring (`focus-visible:outline-signal`, `-outline-offset-2` so the ring is not
   clipped by the list's rounded border). Enter/Space work natively on `<button>`.
2. **Independent items, not one-open-at-a-time.** With auto-close, opening item 4 while item 1 (116 px
   at 375) closes would slide the row the visitor just tapped up under their finger — a worse jump than
   today. Independent items move only what is *below* the tapped row, which reads as natural.
3. **First item open on load** (`defaultOpen={0}`), so the visitor sees at once that answers live here
   and the server HTML shows one answer expanded. `initial={false}` on every panel so nothing animates
   on hydration.
4. **Panels stay mounted** (no `AnimatePresence` unmount): all five answers stay in the HTML for search
   engines. Closed panel: `animate={{ height: 0, opacity: 0 }}`, `overflow-hidden`, and `inert` so its
   text is skipped by keyboard and screen readers. Open: `{ height: 'auto', opacity: 1 }`.
5. **Padding lives on an inner div, never on the animated one** (`<m.div className="overflow-hidden">
   <div className="px-5 pb-5 text-small text-ink-body">…`). Padding on the animated box is the classic
   cause of a last-frame snap.
6. **Timing** (add one token each side, see §3): open — height **300 ms** `ease.outSoft`, opacity
   200 ms `outSoft` with a 60 ms delay (text fades in as the room opens). Close — height **220 ms**
   `ease.inOutSoft`, opacity 120 ms, no delay (exit faster than enter). Icon: keep lucide `Plus`
   rotating to 45° but drive it from the same state with
   `transition-[rotate] duration-(--duration-panel) ease-out-soft` so icon and panel finish together.
7. **States.** Hover (closed rows only, `hover:` is already `@media (hover:hover)` in Tailwind v4):
   `bg-surface-muted`, 150 ms colour. Open row: `bg-surface`, question in `text-crimson-deep`, no grey.
   Pressed: `active:bg-surface-strong` 150 ms. Focus: signal ring.
8. **Reduced motion:** nothing extra to write for height (instant via MotionConfig); additionally read
   `useReducedMotion()` and pass `transition={{ duration: 0 }}` so the opacity does not lag either. The
   global CSS rule already makes the icon instant.
9. **No-JS:** the left column already links "All questions and answers" to `/faq`, which is built on
   `<details>` and works without JS. That is the fallback; do not add a second one.
10. **Do not** use `layout`, `layoutId` or `domMax`; do not animate `max-height` (wrong duration feel).
11. Remove the `delay={0.1}` `Reveal` around the list (the questions are content, not a show); keep one
    `Reveal` on the whole section row.

Acceptance: sampling `getBoundingClientRect().height` every rAF after a click shows ≥ 15 intermediate
heights over ~300 ms, monotonic, no overshoot; the next row's `top` moves smoothly; Tab reaches each
button, Space/Enter toggle, `aria-expanded` flips; reduced-motion emulation opens in one frame.

## 2. Page-wide motion pass

Principle: one orchestrated load moment (the hero), one choreographed scroll moment (the proof band),
calm reveals everywhere else, and quick, honest feedback on every hover and press. 150–400 ms for all
interaction; nothing infinite except the news ticker.

| # | Where | Problem (measured) | Fix | Pri |
| --- | --- | --- | --- | --- |
| 1 | All `Reveal`/`Stagger` (29 els) | Server HTML ships `opacity:0`; with JS off or a failed bundle **the page below the hero is blank**. The comment in `reveal.tsx` ("no-JS visitors see everything") is false. | Add `data-reveal` to the element `Reveal`/`StaggerItem` render, and in `src/app/(home)/layout.tsx` put `<noscript><style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style></noscript>`. Fix the comment. | P0 |
| 2 | Hero tiles (`hero.tsx` `Stagger`) | Above the fold but gated on hydration + `whileInView`: in dev they stayed at opacity 0 until **2.59 s** (DCL 0.54 s). A visitor sees the crimson panel, then three empty holes. | Make the hero a pure CSS load moment: replace `Stagger/StaggerItem` with plain `div`s using `animate-rise` and `[animation-delay:240ms]`, `300ms`, `360ms` (runs before hydration, like the existing `animate-settle`). | P0 |
| 3 | Reveal timing (`lib/motion.ts`) | `reveal: 0.7` s + `rise: 16` + stagger `.08`: a 7-card shelf finishes at 0.08×6+0.7 = **1.18 s**; the proof texts at 0.35+0.16+0.7 = **1.21 s**. Feels slow and "floaty". | `duration.reveal = 0.5`, `rise = 12`, `staggerStep = 0.05`, viewport margin stays `-10%`. CSS: `--duration-reveal: 500ms`. Cap any delay chain at 0.3 s. | P1 |
| 4 | What reveals | Every section header, both step lanes, both FAQ columns fade-up independently — the generic "everything slides up" look. | Keep `Stagger` only on card rows (departments 4, shelf 7, baskets 3). Section headers and text columns: a single `Reveal` per section, `y={0}` (fade only, 400 ms). Proof band (`proof.tsx`) is the one choreographed sequence: receipt (0) → door photo (0.12) → texts stagger (0.24 + 0.05 each), with rise 16. Steps: lanes reveal together (drop `laneIndex * 0.15`), the four numbered cards stagger 0.05. | P1 |
| 5 | Hero sticker `.animate-bob` | Infinite 5 s bob, the only decorative loop on the page; ui-ux-pro-max: infinite motion is for loaders only; it competes with the ticker and the CTA. | Remove `animate-bob` (and the `@utility animate-bob` + keyframes in `globals.css`). The sticker keeps its one `animate-settle` on load. | P1 |
| 6 | Hero load moment | `animate-settle` 700 ms ×3 at 0/120/240 ms ends at **940 ms**; plus tiles. | `--duration-reveal` 500 ms (from #3) shortens it; delays: photo 0, sticker 100, gift note 180, tiles 240/300/360 → everything settled by **≈ 860 ms**. H1 and copy stay static (they are the LCP; never animate them). | P1 |
| 7 | `photo-loading` wells (8) | The `::before` pulse keeps running forever under loaded photos (8 permanent compositor animations); lazy photos then **pop** in with no transition. | In `StockImage` (already a client component) and `ProductImage`: `onLoad` sets `data-loaded` on the frame. CSS: `.photo-loading[data-loaded]::before{animation:none;opacity:0;transition:opacity var(--duration-base)}`; lazy images get `opacity-0 data-[loaded]:opacity-100 transition-opacity duration-(--duration-base)`. Never fade the `preload` hero photo (LCP). | P1 |
| 8 | `btn-slide` (12 buttons) | Fill slides over **450 ms** in and out: the colour arrives after the pointer has moved on; feels sluggish. | `transition: transform 300ms var(--ease-out-soft)` on hover-in; on leave 200 ms (`&::before{transition-duration:200ms}` / `&:hover::before{transition-duration:300ms}`). Arrow nudge stays 3 px / 250 ms. Press: keep `active:translate-y-px`, add `active:duration-75`. | P1 |
| 9 | Add button (`add-button.tsx`) | Crimson → leaf "Added" swap is instant (no colour transition on the button), pending only dims to 70 %. | Add `transition-colors duration-(--duration-base)` to the button; pending: swap `Plus` for lucide `LoaderCircle` with `animate-spin` (a real loader, allowed). The `Check` enters with `animate-rise` 250 ms. Basket count in the header: one 300 ms scale pulse (1 → 1.15 → 1, `outSoft`) when the count changes; none under reduced motion. | P1 |
| 10 | `card-rise` (15 cards) | -4 px + `shadow-lift`, 250 ms: good. No press state, so a tap on a card does nothing visible. | Keep hover. Add `&:active{transform:translateY(-1px);transition-duration:var(--duration-fast)}`. Inner photos: zoom `scale(1.04)` for all (pack shots 1.06 → 1.04) over **400 ms**, not 700 ms (`duration-700` → `duration-400` in `stock-photo.tsx` and `product-image.tsx`). | P2 |
| 11 | Header on scroll (`header-shell.tsx`) | Sticky 65 px bar, shadow fades in over 450 ms. | Keep it sticky, **no shrink** (the owner just asked for more breathing room, and a shrinking bar moves the search field under the cursor and causes layout work every scroll). Keep the `shadow-lift` cue but at `duration-(--duration-base)`. Aisles row keeps scrolling away. Do not hide-on-scroll. | P2 |
| 12 | News ticker | 42 px/s is a readable speed. It pauses on hover/focus only, so touch and screen-magnifier users cannot stop it — WCAG 2.2.2 (moving > 5 s). | Add a 44 px pause/play toggle at the strip's right end (lucide `Pause`/`Play`, `aria-pressed`, label "Pause news"), sets `animation-play-state` via a `data-paused` attribute. Keep 38 s; reduced motion already stops it. | P1 |
| 13 | Parallax | 2 uses (closing photo, Jamaica photo), 8 %. Right count. | Keep both; do not add more (the owner asked for "a photo or two"). Hero gets none (it already has the settle moment). | — |
| 14 | Basket price sticker | Hover `scale-105 rotate-0` 250 ms: charming, on-brand. | Keep. | — |
| 15 | Departments tile arrow chip | `bg-surface → bg-crimson` 250 ms on hover: good. | Keep; add `group-hover:translate-x-0.5` on the icon for parity with other arrows. | P2 |
| 16 | Layout shift | CLS measured **0.00** over a full scroll; no reveal uses `height`/`top`. | Keep: everything above animates only `transform`/`opacity`; the FAQ is the one deliberate height animation and moves only content below the tapped row. | — |

## 3. Tokens to add (both sides, nothing else changes)

`src/lib/motion.ts`
```ts
export const duration = { fast: 0.15, base: 0.25, panel: 0.3, slow: 0.45, reveal: 0.5 } as const
export const rise = 12
export const staggerStep = 0.05
/** Disclosure panels: open on outSoft, close faster on inOutSoft. */
export const panel = {
  open: { height: { duration: 0.3, ease: ease.outSoft }, opacity: { duration: 0.2, delay: 0.06, ease: ease.outSoft } },
  close: { height: { duration: 0.22, ease: ease.inOutSoft }, opacity: { duration: 0.12 } },
} as const
```
`src/app/globals.css` `@theme`: `--duration-panel: 300ms;` and `--duration-reveal: 500ms;`.
Remove `@utility animate-bob` and `@keyframes bob`.

## 4. Accordion component sketch (load-bearing details only)

```tsx
'use client'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
// state: const [open, setOpen] = useState<Set<string>>(new Set(items[0] ? [items[0].id] : []))
<m.div
  id={`faq-panel-${id}`} role="region" aria-labelledby={`faq-btn-${id}`}
  inert={!isOpen} initial={false} className="overflow-hidden"
  animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
  transition={still ? { duration: 0 } : isOpen ? panel.open : panel.close}
>
  <div className="px-5 pb-5 text-small text-ink-body">{body}</div>
</m.div>
```
List container keeps `divide-y divide-line rounded-2xl border border-line bg-surface overflow-hidden`
(radius per the layout audit). Works under `LazyMotion strict` + `domAnimation` as-is.

## 5. Acceptance checklist (motion)

- [ ] FAQ: ≥ 15 intermediate heights over ~300 ms on open, ~220 ms on close; icon and panel end together; no grey on open rows; keyboard + `aria-expanded` verified; reduced motion = instant.
- [ ] JS disabled: every section visible (noscript rule), FAQ answers reachable via `/faq`.
- [ ] Hero tiles visible on first paint, before hydration (CSS `animate-rise`); load moment done ≤ 900 ms.
- [ ] Only infinite animations left: ticker (with pause button) and real loaders.
- [ ] No `photo-loading` pulse running after its image loads; lazy photos fade in 250 ms.
- [ ] All hovers/presses 150–400 ms; `btn-slide` 300 ms in / 200 ms out.
- [ ] Parallax count = 2; header sticky without shrink; CLS stays 0.00 over a full scroll.
- [ ] `prefers-reduced-motion: reduce` emulated: no rises, no parallax, no ticker, no sticker settle.
