# Brain: how to work on ShipEast Shop & Send

This file is loaded into every session through `CLAUDE.md`. It holds the owner's standing
instructions so they never have to be explained again. Read it fully before doing anything.
**Rules marked MUST are strict and constant: they apply to every task, every session, with no
exceptions unless the owner changes them in this file.**

If a session ends (account limit, timeout, crash), the next session continues from
**§8 Resume here** without asking the owner to repeat anything.

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

- The owner writes or dictates in **Roman Urdu** (not Hindi), mixed with English. Voice notes
  may arrive transcribed in Hindi script; read them as Urdu. Understand it fully.
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

## 7. Owner's direction, November 13, 2026 (newest; overrides older notes where they clash)

- **Take over.** The owner wants the manager to run the project end to end: plan, check,
  verify, build, control quality. Ask only for decisions that are truly the owner's.
- **Three major phases, each approved by the owner before the next starts.** Sub-phases are
  free. Phase 1 is the look of the site, one page at a time, **home page first**. The owner
  reviews the home page; only if he likes it do the other pages follow.
- **Save credits.** Touch only the page in hand. Do not redesign, re-screenshot or re-plan
  other pages unless asked. Use sub-agents only when they clearly save work.
- **The client sees the surface, not the code.** The UI has to look like an international
  brand. Layout and visuals come before anything else in Phase 1.
- **Redesign from zero.** Treat the old page as a blank space. Do not carry over its structure.
- **The design system is not a cage.** Colours, fonts, sizes, structure, layout and pictures
  may all change when it makes the page better. New roles go into `globals.css` (the guard
  test stays green); the client's red stays the brand colour.
- **It is a grocery shop, not a corporation.** The old pages felt corporate. Lead with food,
  products, prices and baskets, the way the client's sample **upercart.com** does (sent
  September 20: product photos, category tiles, product rails). Photos of food and home, not
  of offices, laptops and phone calls.
- **Owner's review of home v3 (November 13, approved the direction).** Standing taste for
  every page that follows: compact, not "zoomed in" (modest type sizes, small prices, tight and
  even section spacing, clean alignment); the page must feel **alive** (reveal on scroll,
  parallax on a photo or two, cards that rise, buttons whose hover colour slides in, photo
  wells that pulse until loaded, a loading skeleton); the top strip is a moving news ticker;
  no giant wordmark in the footer.
- **Client facts to keep in view** (full list: `docs/CLIENT-NOTES.md`): hero words he wrote
  ("Shop for Family in Jamaica. Order from overseas & we shop in Jamaica & deliver to their
  door"), tagline "We Shop. We Deliver. We Care.", WhatsApp 876-797-4301, substitution default
  "Ask me first", no guaranteed same-day promise in his November 3 policy brief (open
  question), his price list is in J$ and he wants to edit prices himself in admin.

## 8. Resume here (keep this section up to date)

Update this section whenever a step finishes, so a new session can continue instantly. The
full handoff is **`docs/HANDOFF.md`**.

**Status (November 13, 2026): Phase 1, step 1: the home page ("home v3") is merged (PR #30)
and the owner approved the direction. His first round of feedback (compact sizes, motion,
ticker, hover effects, footer) is applied as v3.1 and waiting for his second look.** Plan: `docs/home-v3/PLAN.md`. The home page now lives
in its own route group `src/app/(home)/` with its own header, footer, fonts and palette, so
no other page changed. If the owner approves, roll the new header, footer and palette out to
the other pages one by one; if not, revise the home page first.

**Done before this** (details in `docs/HANDOFF.md` and `docs/DESIGN-DECISIONS.md`): design
system (#20), brain and skills (#21, #22), earlier home, header and footer (#23), `/shop`,
`/baskets`, `/how-it-works`, `/about` (#24), light header, heroes and the shop listing
(#25–#27). Phases 0–5 of `docs/PLAN.md` are built on demo data; the driver app (Phase 6) and
admin panel (Phase 7) are not started.

**Waiting on the owner or Derion:**

- Owner: review the new home page; decide whether the client's PriceSmart product images
  (57 inside his spreadsheet) may be used on the site; run migration
  `0013_product_aisles.sql`; fix GitHub Actions (no runner assigned, an account setting).
- Derion: final prices and markup, exchange rate, delivery fees and cut-off times, basket
  contents, bank transfer details, TRN and registered address, business hours, real SMS
  wording, a consented driver photo.

**How to resume:**

1. Read this file, `docs/HANDOFF.md`, `docs/CLIENT-NOTES.md` and `CLAUDE.md`.
2. If the owner has given feedback on the home page, act on it. Otherwise wait.
