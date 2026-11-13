# Home v3.4 Colour Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebalance the home page's colour around the client's crimson. Retire the warm cream page and the pastel tints. Turn the gift banner into a crimson block and the hero proof card into an oxblood block. Use mango only as a sticker colour. Keep one cool neutral family from page to line.

**Architecture:** This is colour classes only, in `src/components/home/*`, `src/app/(home)/*` and `src/app/globals.css` (roles, primitives, `photo-loading`), plus the contrast pairs in `src/lib/design-tokens.test.ts`. Layout, spacing and motion from v3.3 stay as they are.

**Tech Stack:** Tailwind v4 role tokens, Vitest, Playwright.

**Spec:** `docs/home-v3/audits/colour.md`, findings F1–F11, palette §4, section sequence §4, acceptance §5. Every class change below is listed there with its file. This plan only orders them and adds the manager's rulings.

## Global Constraints

- Brand reds unchanged: crimson `#AE0E31`, crimson-deep `#7A0A23`, oxblood `#4A0B1C`, signal, blush. No gradients, no glass, no gold.
- Components use role classes only; `src/lib/design-tokens.test.ts` stays green.
- Every text pair passes 4.5:1, or 3:1 for text 24px and up. Every focus ring is at least 3:1 against what surrounds it.
- **Manager ruling R1:** the `cream` role and `--cream-50` primitive stay, used only by `src/components/site/brand-mark.tsx`. The logo's door fill is brand-kit art that is waiting for the owner's review. No home element other than the logo may use `cream`. Delete `cream-deep`, `mango-soft`, `sky-soft` and their primitives (`--cream-200`, `--mango-100`, `--sky-100`).
- **Manager ruling R2:** `surface-selected` (`#FFE8EE`) stays as a role, for selected states and marks of 80×80px or less.
- Touch only the home page; `brand-mark.tsx` stays unchanged.

## Review Focus

1. Focus rings on the new crimson gift block and the oxblood hero card must be visible. Each needs `on-dark-focus`, or must rely on the default signal ring on the page.
2. Text contrast on the new fills: `text-on-crimson-muted` on crimson, `text-on-oxblood-muted` on oxblood, `text-crimson-deep` on surface.
3. White cards on the `#F7F7F7` page have a 1.07 edge, so each needs `border border-line`, or sits in a band.
4. The photo-loading pulse colour on the page must still be visible: use `surface-muted` on the page and surface-strong where the card is muted.
5. A deleted role still referenced anywhere in `src/` would silently drop its class. Grep must return nothing before the commit.

---

### Task 1: Tokens and contrast tests

**Files:** `src/app/globals.css`, `src/lib/design-tokens.test.ts`, `docs/TOKENS.md`

- [ ] **Step 1: Update the contrast pairs (F11).** In `design-tokens.test.ts`, remove the pairs that use `cream-deep`, `mango-soft` and `sky-soft`; keep `cream` pairs out of the list too, since it is not a page colour any more. Add `['ink','page',4.5]`, `['ink-body','page',4.5]`, `['ink-muted','page',4.5]`, `['crimson','page',4.5]`, `['signal','page',3]`, `['line-strong','page',3]`, `['on-oxblood-muted','oxblood',4.5]`, `['crimson-deep','mango',4.5]`, `['leaf-deep','leaf-soft',4.5]`, `['on-crimson-muted','crimson',4.5]` and `['mango','oxblood',4.5]`.
- [ ] **Step 2: Watch the guard fail.** Add a test to `src/lib/home-guard.test.ts`: `globals.css` must not declare `--color-cream-deep`, `--color-mango-soft` or `--color-sky-soft`, and no file under `src/components/home` or `src/app/(home)` may contain `cream`. Run `npx vitest run src/lib/home-guard.test.ts`. Expected: FAIL.
- [ ] **Step 3: Update the tokens** (F8, R1). Delete those roles and primitives in `globals.css`. Set `--leaf-100: #dbf0e6`. Add primitive `--leaf-50: #cfe6d6` and point `--color-on-leaf-muted` at it. `photo-loading` uses `var(--color-surface-muted)`. Update the `docs/TOKENS.md` rows.
- [ ] **Step 4: Run** `npx vitest run`. Expected: only the home-guard "no cream in home files" test still fails, because Task 2 removes those uses.

### Task 2: Classes, section by section

**Files:** `src/app/(home)/layout.tsx`, `loading.tsx`; `src/components/home/header.tsx`, `hero.tsx`, `departments.tsx`, `shelf.tsx`, `baskets.tsx`, `gift-note.tsx`, `proof.tsx`, `steps.tsx`, `closing.tsx`

- [ ] **Step 1: Apply F2–F7 exactly as the audit lists them.** Also:
  - **Gift block:** gets `on-dark-focus`. The paper note stays `bg-surface text-crimson-deep`.
  - **Hero proof card:** `bg-oxblood text-on-dark`. Its focus ring is the global default; check it is visible. The receipt visual's bars stay `bg-line`.
  - **Steps lanes:** lose fill and padding (F5). Keep `gap-4`. The lane pill stays as the lane's label. The step cards get `border border-line` (Review Focus 3).
  - **Basket cards:** `bg-surface border border-line`, with `hover:border-line-hover` as on the shelf.
  - **Hero baskets card and delivery card** (`bg-surface`): add `border border-line`.
- [ ] **Step 2: Run** `grep -rnE "cream|mango-soft|sky-soft|leaf-soft|surface-selected" src/components/home "src/app/(home)"`. Expected: only `leaf-soft` on the SMS bubbles and Save pills, and `surface-selected` on the location disc. Nothing else.
- [ ] **Step 3: Run** `npm run typecheck && npm run lint && npx vitest run`. Expected: all pass.
- [ ] **Step 4: Commit.** `Home v3.4: one neutral, crimson leads, mango only as a sticker`

### Task 3: Measured QA, docs, ship

- [ ] **Step 1: Run Playwright at 375, 768, 1024 and 1440** (cookie banner dismissed, `nextjs-portal` hidden, page scrolled through) and check every item in the audit's §5 acceptance list:
  - **Crimson share:** at least 8.5% and greater than all the greens together. Measure by pixel classification of the full-page shot, ±6 RGB.
  - **Retired colours:** no rendered `#FFF8EE` outside the logo; no `#F5E8D3`, `#FFF0C4` or `#DDEBF8`.
  - **Pink:** `#FFE8EE` only on boxes of 80×80px or less.
  - **Mango:** no mango background wider than 160px.
  - **First screen:** no leaf block touches a crimson block.
  - **Contrast:** every text pair and every focus ring passes (read the computed colours).
  - **Alignment:** the baskets title has the same x as the other section titles.
  - **Unchanged from v3.3:** CLS 0, no overflow, nothing under 44px, nothing animating under reduced motion, everything visible with JavaScript off.
- [ ] **Step 2: Update docs.** Add `docs/home-v3/PLAN.md` §13 (the palette table and section sequence from audit §4, in a few lines). Update §2's colour table to point at it. Add one line to BRAIN §8 status.
- [ ] **Step 3: Run** `npm run check`. Expected: green. Then commit and push to `claude/keen-sagan-fhdjhr`. PR [realgrowthnexus/shipeast-web-app#33](https://github.com/realgrowthnexus/shipeast-web-app/pull/33) is open: add a short "v3.4 colour" section to its description.
