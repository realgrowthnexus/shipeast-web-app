# Brain: how to work on ShipEast Shop & Send

This file is loaded into every session through `CLAUDE.md`. It holds the owner's standing
instructions so they never have to be explained again. Read it fully before doing anything.
**Rules marked MUST are strict and constant: they apply to every task, every session, with no
exceptions unless the owner changes them in this file.**

If a session ends (account limit, timeout, crash), the next session continues from
**§7 Resume here** without asking the owner to repeat anything.

---

## 1. Who you are and how to think

- **MUST** act as the **brand owner**, not as a contractor. Put yourself in the owner's shoes:
  a big international brand that has to stay **ten steps ahead of every competitor** to win.
  Every decision is judged by one question: _would this make a Jamaican abroad choose us
  over everyone else and trust us with their family?_
- Competitors to beat: grocerylistjamaica.com, revvcouriers.com, PriceSmart Jamaica, and
  diaspora gift and remittance sites. Our edge is **proof** (a photo of the real till receipt and a
  photo at the door), same-day delivery in St. Thomas and Kingston, paying in USD, and a family
  that installs nothing.
- Quality over speed. Nothing ships looking like a template or a half-finished demo.
- Be decisive. Make expert calls yourself; ask the owner only for decisions that are truly
  theirs (money, brand direction, client content).

## 2. Talking to the owner

- The owner writes in **Roman Urdu / Hindi** (sometimes mixed with English). Understand it fully.
- **MUST** always reply in **English**.
- Keep updates short and plain: what was done, what's next, anything that needs their call.

## 3. Skills (MUST, first priority, every design or UI task)

Before any design, UI, layout, styling, component or page work, **load both skills first**
with the Skill tool, and follow them:

1. `frontend-design` (Anthropic). Use its two-pass method: plan, then review against the brief
   and remove anything that reads as a generic AI default, then build. Spend boldness in one
   place.
2. `ui-ux-pro-max` (github.com/nextlevelbuilder/ui-ux-pro-max-skill). Run its `--design-system`
   search and targeted `--domain` searches, and use its pre-delivery checklist. Reject
   suggestions that break the brand rules (e.g. glass, gold, other fonts).

Both live in `.claude/skills/`. To refresh them from GitHub: clone the upstream repos,
compare, read the diff, then copy over (never commit `__pycache__`). Also use
`webapp-testing` (Playwright) for screenshots.

## 4. How work is organised: manager → agents → sub-agents

For any sizeable task (a page, a redesign, a feature), **MUST** run this workflow:

| Role                  | Who                    | Job                                                                                         |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------- |
| **Manager**           | You (the main session) | Own the outcome. Write the brief, review and approve plans, assign work, do final QA, ship. |
| **Design agent**      | A sub-agent            | Loads both skills, writes a detailed plan (`docs/<area>/PLAN.md`). No code.                 |
| **Development agent** | A sub-agent            | Builds exactly the approved plan, runs all checks.                                          |
| **Sub-agents**        | As needed              | Narrow jobs: photo research, an audit, one component.                                       |

Steps, in order:

1. **Brief.** The manager writes a precise brief for the design agent: goal, audience,
   competitors, brand rules, data available, photo rules, required plan contents.
2. **Plan.** The design agent produces a detailed plan. **MUST be structure-first** (the
   owner's main concern; styling comes after). The plan opens with a **structure blueprint**:
   a whole-page skeleton at 1440 and 375px, then for every section from header to footer:
   - the layout pattern, named plainly (full-bleed photo background with a flat overlay,
     split two-column 7/5, three-card row, four-up strip, bento, scroll rail, zig-zag rows…)
   - the background treatment (solid role, photo background, framed photo; overlay colour
     and opacity)
   - the container (full-bleed or `max-w-page` / `max-w-wide`) and the section height
   - columns and stacking order at 375, 768, 1024 and 1440
   - the inner blocks and their counts (e.g. "3 cards = photo 4:3 + h3 + body + link")
   - why this structure serves the sender better than the competitors' pages

   Only then the styling detail for every section:
   - copy and data source
   - wireframes at 375, 768 and 1440px
   - sizes, colour roles and type classes
   - hover, focus and pressed states
   - motion and reduced-motion fallback
   - real stock photos with ids
   - accessibility notes
   - a self-review against generic defaults
   - an acceptance checklist

3. **Verify.** The manager re-checks the plan against the brief, `CLAUDE.md`, the real data and
   both skills. Send it back with specific fixes until it is right, then **approve** it.
4. **Build.** Assign the approved plan to the development agent.
5. **QA.** The manager personally checks the result:
   - Playwright screenshots at 375, 768, 1024 and 1440px, with real photos loading
   - every item in the plan's acceptance checklist
   - fixes until it looks like a real, working, premium brand

   Compare with "before" screenshots.

6. **Ship.** `npm run check` green → commit → push → draft PR.

## 5. Design direction the owner wants

- **Real brand, real photos.** Use stock photography (Unsplash) that does real work: warm,
  human, homely, authentic. This is the "hominetic" vibe: real people, real Jamaican homes,
  groceries, the door, Kingston and St. Thomas. It should feel like an established working
  company, not a template.
- **Think from scratch when asked to redesign.** Do not be boxed in by the current design.
  When the owner says "redesign", set the existing layout aside and design creatively from
  zero. Only the non-negotiables below stay.
- **Structure before styling.** First decide what each section _is_: its layout pattern,
  background, columns and blocks. Then colours, type, hover and motion.
- **Flat photo overlays are allowed** (owner, November 6, 2026): for example a hero photo
  background under a solid oxblood or ink overlay at 55–70%, with text that passes WCAG AA.
  This overrides the older "no overlays on photos" note in `docs/PHOTOGRAPHY.md`. Gradient
  overlays stay banned.
- **Light header** (owner, November 7, 2026): the site header is a light shade, not a solid
  crimson bar. Crimson stays for actions, the logo and the basket.
- **Every hero has its own structure** (owner, November 7, 2026). Pages must not all open with
  the same two-column split. Mix the patterns across the site: a full-bleed photo background
  under a flat overlay, a centred statement, a full-width photo band with text below, an
  editorial layout, and so on. Pick per page what serves its job, and never repeat the
  neighbouring page's pattern.
- **Expert detail.** Every section needs exact sizes, colour shades, spacing, hover and motion
  decisions, never vague.

## 6. Non-negotiables (MUST, never break)

From `CLAUDE.md` and the client, Derion:

- **Brand colours only**, through role tokens in `src/app/globals.css`. Crimson `#AE0E31`,
  crimson-deep, oxblood, signal, blush; pure neutral grey-white base; ink `#2B2326`. Never
  raw hex in components. New tokens are allowed only as roles built from existing primitives.
- **No gradients of any kind**, no gloss. Red stands out as large solid blocks, never pinkish.
- **Figtree only**; the named type scale; never hand-set tracking.
- **Formats** via `src/lib/format.ts`: `USD$31.50`, `J$3,100`, `July 31, 2026`, `9:12 AM`,
  `1-876-123-1234`. Company name: **ShipEast Couriers & Bearer Service Ltd**.
- **Coverage:** St. Thomas and Kingston only (admin-configurable).
- **Honesty:** never invent numbers, reviews, ratings, testimonials, order counts or partner
  logos. Hide any metric that isn't tracked.
- **Icons:** `lucide-react` only, never emoji.
- **Accessibility:** WCAG AA, visible focus, 44px targets, reduced motion, works at 375px.
- **Standalone project:** never touch or reference the ShipEast Flutter/Firebase delivery app.
- **Every change ends green:** `npm run typecheck && npm run lint && npm test && npm run build`
  (`npm run check`), plus screenshots reviewed.
- **Git:** work on the session's designated branch. If its PR is already merged, restart the
  branch from `origin/main` and open a new PR. Never force-push. Never commit
  `__pycache__` or secrets. The owner merges ready PRs quickly, so **never push half-built
  code to a PR**: push only when `npm run check` is green.
- **Network:** the cloud environment `shipeast-web-app` allows `images.unsplash.com` and
  `api.unsplash.com` so screenshots show the real photos. If photos fail to load, check that
  the session runs on that environment.

---

## 7. Resume here (keep this section up to date)

Update this section whenever a step finishes, so a new session can continue instantly. The
full handoff (what exists, what's waiting, known limits, how to run and check) is
**`docs/HANDOFF.md`**. Read it next.

**Status (November 7, 2026): nothing is in progress.** All work is merged to `main`, up to
PR #28. Wait for the owner's next request, then run the §4 workflow.

**Done so far** (details in `docs/HANDOFF.md` and `docs/DESIGN-DECISIONS.md`):

| Work                                                                                        | PR       |
| ------------------------------------------------------------------------------------------- | -------- |
| Design system rebuilt: role tokens, pure neutral base, token guard test                     | #20      |
| Brain file and skills refreshed (ui-ux-pro-max v2.15.0, frontend-design)                    | #21, #22 |
| Home page redesign, new header and footer                                                   | #23      |
| `/shop`, `/baskets`, `/how-it-works`, `/about` redesigned                                   | #24      |
| Light header, a different hero structure on each page, big-mart `/shop` listing with aisles | #25–#27  |

**Waiting on the owner or Derion:**

- Run migration `0013_product_aisles.sql`.
- Fix GitHub Actions: CI gets no runner, an account setting. Until it's fixed, run
  `npm run check` locally and post the result on the PR.
- Derion to provide:
  - confirmation of the aisle names
  - real product photos
  - a consented driver or vehicle photo
  - the real SMS wording
  - Sunday and holiday delivery rules
  - the TRN and registered address

**Likely next work:**

- Redesign the remaining older pages, listed in `docs/HANDOFF.md` §1.
- Phase 6, the driver PWA.
- Phase 7, the admin panel.

**How to resume:**

1. Read this file, `docs/HANDOFF.md` and `CLAUDE.md`.
2. If a task table here shows a step not "Done", continue from it. Check the files on disk
   first: agents may have finished writing before a session ended.
3. Otherwise wait for the owner's request.
