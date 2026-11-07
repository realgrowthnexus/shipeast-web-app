# Manager approval: four-page redesign

**Date:** November 7, 2026. **Status: all four plans APPROVED for build**, with the amendments
below. Where an amendment contradicts a plan, the amendment wins.

| Page            | Plan              | Bold element                                                                 |
| --------------- | ----------------- | ---------------------------------------------------------------------------- |
| `/shop`         | `shop.md`         | The aisle board: four oxblood aisle signs inside the crimson front door      |
| `/baskets`      | `baskets.md`      | The price board: one row per basket, the price as large as the name          |
| `/how-it-works` | `how-it-works.md` | The two-lane order day: "On your screen" beside an oxblood "In Jamaica" lane |
| `/about`        | `about.md`        | The "bearer" dictionary entry in the crimson hero                            |

**What was checked:**

- each plan against the owner's brief (structure-first, real photos, a homely brand feel,
  designed from scratch)
- `CLAUDE.md` and `docs/BRAIN.md`
- the real data loaders and fields each plan uses
- the honesty rule: no founding year, staff, numbers or backstory are invented, and content
  that needs Derion is hidden until he provides it
- consistency with the home page: solid crimson and oxblood blocks, no eyebrows, one bold
  element per page, two dark bands never touching, calm motion

## Amendments (apply to all four unless named)

1. **Build order and reuse.**
   - Build `/how-it-works`, then `/baskets`, then `/shop`, then `/about`.
   - Run `npm run check` after each page, so every finished page is usable on its own if
     work stops.
   - When two plans need the same thing (a link style, a closing panel, a questions
     block), build it once in a shared place and reuse it. Never two copies.
   - Reuse the home components and helpers named in the plans (`HomeClosing`,
     `HomeQuestions`, `CutoffNote`, `SmsPreview`, `src/lib/home.ts`) rather than copying
     them.
2. **Honest wording.**
   - `/shop` S4: no "fresh" claim. Say what is true: "bought at a store in Jamaica on the day
     we deliver".
   - `/how-it-works` "If nobody is home": the steps must match the delivery policy text
     (`src/lib/demo/legal.ts`, the `delivery` page). If the policy doesn't state a step,
     leave it out.
3. **`/about` open questions** (manager's calls):
   - Drop "Write in English or patois". It implies a language promise we haven't confirmed.
   - Keep the landmark line, since checkout asks for a landmark.
   - Leave "cancel for a full refund" to `/legal/refunds`, linked from S3.
   - S2 keeps `kingstonStreet`. `/delivery` isn't being redesigned now.
   - The owner row stays hidden (`SHOW_OWNER = false`).
4. **Photos.**
   - For any photo new to the registry, record its download first with the Unsplash MCP
     `download_asset` tool.
   - Add full credit fields and `usedOn` for every new photo.
   - Delete registry photos that no page uses any more, so `/photo-credits` stays truthful.
5. **Anchors.** Keep `#proof-h` on `/how-it-works`, since the home page links to it. Add
   the new anchors the plans list. Update any link the plans say changes.
6. **Docs in the same change.** Update `docs/DESIGN-SYSTEM.md` (new shared components),
   `docs/TOKENS.md` (only if a token is added) and `docs/DESIGN-DECISIONS.md` (a dated
   entry for the four pages).
7. **Done means:**
   - `npm run check` is green.
   - Screenshots of all four pages at 375, 768, 1024 and 1440, with real photos.
   - No horizontal overflow, no broken images, no console errors, no hydration warnings.
   - Every item in each plan's acceptance checklist is checked.
