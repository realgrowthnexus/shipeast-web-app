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
2. **Plan.** The design agent produces a detailed plan. It covers every section with:
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
  `__pycache__` or secrets.
- **Network:** the cloud environment `shipeast-web-app` allows `images.unsplash.com` and
  `api.unsplash.com` so screenshots show the real photos. If photos fail to load, check that
  the session runs on that environment.

---

## 7. Resume here (keep this section up to date)

Update this section whenever a step finishes, so a new session can continue instantly.

**Current task (started November 6, 2026): total home page redesign, header to footer.**

| Step                                                                                 | Status                         | Where                        |
| ------------------------------------------------------------------------------------ | ------------------------------ | ---------------------------- |
| Skills refreshed from GitHub (ui-ux-pro-max v2.15.0; frontend-design already latest) | Done                           | `.claude/skills/`            |
| Unsplash allowed in the `shipeast-web-app` environment                               | Done                           |                              |
| "Before" screenshots of the old home page                                            | Done (session scratchpad only) |                              |
| Design agent writes the detailed plan                                                | In progress                    | `docs/home-redesign/PLAN.md` |
| Manager verifies and approves the plan                                               | Not started                    |                              |
| Development agent builds the home page, new header and footer (site-wide)            | Not started                    |                              |
| Manager QA at 375/768/1024/1440, fixes, `npm run check`, draft PR                    | Not started                    |                              |

**How to resume:**

1. Read this file, `CLAUDE.md` and `docs/home-redesign/PLAN.md` if it exists.
2. If the plan is missing or incomplete, re-run the design agent with the brief in §4 step 1
   and the rules in §5–§6.
3. Then continue from the first step that is not "Done".

The previous design system rebuild (role tokens, pure neutral base) is merged:
see `docs/TOKENS.md` and `docs/DESIGN-DECISIONS.md`.
