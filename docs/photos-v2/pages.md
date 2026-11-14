# Photos v2: every public page except home, /shop and product

November 14, 2026. Research only: no code or registry changes. Contact sheets (current, then A, B, C, cropped to the
slot's real ratio; overlay slots shown under a 60% oxblood wash) are in
`/tmp/claude-0/-home-user-shipeast-web-app/929ce8a4-d339-55c6-8d33-49c8aa81a1e1/scratchpad/photos-v2/pages/`
(`NN-slot.jpg`; `cur_a.jpg` and `cur_b.jpg` show every current photo). All URLs are `https://images.unsplash.com/<path>`.
Every candidate is a free Unsplash photo (no Unsplash+), and none was registered with `download_asset`.

**Out of scope, no stock photos:** checkout, order, track, account, auth, search, legal. `ProofPair` on how-it-works
draws its pair with no photo.

**Big picture:** 16 of 27 slots get a new photo. What fails: dated or sepia frames (`giftBaby`, `kingstonStreet`,
`giftChristmas`), photos that say nothing about the service (`blueMountains`, `companyGiftHands`, a laptop on
`giftSchool`, a newborn's arm on `basketBaby`), misleading details (`staples` has € price tags) and staged frames with
no link to Jamaica (`pantry`, `companyFamilyMeal`). Vitaly Gariev's 2025 sets look the most current. They give a
consistent home look for the sender (Black women paying by card on a phone) and bright modern supermarket aisles.

**One honest gap:** Unsplash has no modern, bright photo of an older Caribbean woman getting groceries at a Jamaican
door, and no ShipEast driver. The best stand-ins are Black families cooking at home. Swap in the client's consented
driver photo and a real door photo the day they exist (Derion's list).

## /about
| Slot | File:line | Current (key, id) | Aspect | Overlay | Verdict |
|---|---|---|---|---|---|
| Story "Errands are what we do" | components/pages/about/story.tsx:28 | kingstonStreet, 9R-WAl5UGWI | 4:3 → 16:9 → 4:5 | no | **Replace.** A hazy, washed-out market street: it reads as old and says nothing about errands |
| "Based in St. Thomas" band | components/pages/about/where.tsx:28 | companyCountryRoad, cqE9f81PSY8 | full-bleed | oxblood scrim | Keep. A real Jamaican road; it works as texture under the scrim |
| Closing | home/closing.tsx | none | | | No photo; fine |

## /how-it-works
| Slot | File:line | Current | Aspect | Overlay | Verdict |
|---|---|---|---|---|---|
| Hero scene | components/pages/how-it-works/hiw-hero.tsx:44 | hiwSender, NP6aeffzH2E | 4:5 / 16:9 / full | ink scrim | **Replace.** Lying on a bed with a laptop: it doesn't read as "paying for groceries" |
| Family installs nothing | components/pages/how-it-works/hiw-family.tsx:39 | hiwFamilyDoor, FkNCfc7MaHc | 4:3 → 16:9 → 4:5 | no | **Replace.** A peeling doorway and an unsmiling elder look like poverty tourism and feel dated |

## /baskets and /baskets/[slug]
| Slot | File:line | Current | Aspect | Overlay | Verdict |
|---|---|---|---|---|---|
| Hero band | components/pages/baskets/baskets-hero.tsx:32 | shopChoosing, 2mhqft65NIo | ~21:9 band | oxblood scrim | **Replace.** A dim, cluttered market shot from behind |
| Occasions split | components/pages/baskets/occasions.tsx:14 | basketsGiftWrap, YSdaUaLopLQ | 4:3 / 16:9 | no | Keep. Modern, warm, a Black woman wrapping a gift |
| Row and detail: family-food-basket | basket-row.tsx:30, baskets/[slug]/page.tsx:99 | basketFood, -9TeWHMASzs | 16:9 | no | Keep. Fresh, product-led |
| Row and detail: baby-care-pack | same | basketBaby, Jqhwp4mcuUM | 16:9 | no | **Replace.** A newborn's arm; nothing from the pack shows |
| Row and detail: pharmacy-pack | same | basketPharmacy, FDvArkoGyvI | 16:9 | no | **Replace.** A moody orange US prescription bottle; the pack is over-the-counter |
| Row and detail: christmas-hamper | same | basketChristmas, SrnCpsp9sGY | 16:9 | no | Keep. Reads as a hamper |

## /gifts
| Slot | File:line | Current | Aspect | Overlay | Verdict |
|---|---|---|---|---|---|
| Hero (PhotoHero) | app/(site)/gifts/page.tsx:72 | companyGiftHands, 3BvVFcZIL7I | 4:3 | no | **Replace.** A pink luxury box on a painted studio wall: cosmetics, not groceries |
| Occasion: Christmas | gifts/page.tsx:102 | giftChristmas, 2WyfCyP9lnY | 4:3 | no | **Replace.** Very dark and moody; fights the light page |
| Occasion: Birthdays | same | giftBirthday, d8s13D29QiE | 4:3 | no | Keep |
| Occasion: Back to school | same | giftSchool, 02z1I7gv4ao | 4:3 | no | **Replace.** A sticker-covered MacBook: tech, not lunch-box groceries |
| Occasion: New baby | same | giftBaby, _7nYEP6QcyY | 4:3 | no | **Replace.** Sepia: the most "100-year-old" frame on the site |
| Gift message feature | gifts/page.tsx:147 | companyGiftCard, hZgbudoG_Qg | 4:3 / 4:5 | no | Keep. Hands, a ribbon and a card do the job |
| Taste of home | gifts/page.tsx:160 | jmEasterBun, 6Wn8R1FDouA | 4:3 / 4:5 | no | Keep. Authentically Jamaican |
| CTA band | gifts/page.tsx:206 | basketChristmas | lg only | no | Keep |

## /delivery
| Slot | File:line | Current | Aspect | Overlay | Verdict |
|---|---|---|---|---|---|
| Hero (GuideHero) | app/(site)/delivery/page.tsx:110 | blueMountains, r1nmJA6sXF8 | 4:3 / 16:9 | no | **Replace.** A hazy green hill: a reader in the UK can't tell it is Jamaica or delivery |
| Our two parishes | delivery/page.tsx:173 | jmKingstonHills, 0uBGE5y9RZ8 | 4:3 / 4:5 | no | Keep, or move it up to the hero (see below) |
| Three things for easy delivery | delivery/page.tsx:224 | kingstonStreet, 9R-WAl5UGWI | 4:3 / 16:9 / 4:5 | no | **Replace.** Same dated street as /about |
| CTA band | delivery/page.tsx:316 | guideKitchen, ce5ShWF9tAY | lg only | no | Keep. Modern, a Black couple at home |

## /faq, /contact, /monthly, /request, 404
| Slot | File:line | Current | Aspect | Overlay | Verdict |
|---|---|---|---|---|---|
| FAQ "Still need help?" | app/(site)/faq/page.tsx:116 | contactPhone, aWY55S07SZg | 16:9 / tall | no | **Replace.** A pouting face mid-call looks odd at this size; also repeats /contact |
| Contact form side | app/(site)/contact/page.tsx:127 | contactPhone | 16:9 / 4:5 | no | **Replace.** Same as above |
| Monthly hero | app/(site)/monthly/page.tsx:90 | pantry, yLor6GEU2yw | 4:3 | no | **Replace.** A staged US luxury pantry |
| "The cupboard stays full" | monthly/page.tsx:139 (parallax) | companyFamilyMeal, gorbBYbo6KM | 4:3 / 4:5 | no | **Replace.** Fine photo, but it isn't a Caribbean family, and it is dark at the edges |
| Monthly CTA | monthly/page.tsx:167 | basketFood | lg only | no | Keep (the same photo is on the basket row; acceptable) |
| Request hero | app/(site)/request/page.tsx:84 | staples, KlEQHVJ6yYY | 4:3 | no | **Replace.** Spice sacks with € price tags: misleading and foreign |
| /contact and /faq heroes | PhotoHero / GuideHero | none | | | No photo; fine |
| 404 | app/not-found.tsx:26 | emptyCart, ziNwhCy0eJk | 4:3 | no | Keep. Bright, on-brand red, and it makes sense |

---

## Replacements (pick first, then 2 alternates)

**1. /about story.** Sheet: `01-about-story.jpg`
- **Pick: xSdL0ze7Qqc** · `photo-1753354868590-81ed82047c4f` · 3800×2138 · Vitaly Gariev (@silverkblack)
  - Alt text: "A grocer carrying a crate of fresh tomatoes through a bright supermarket"
  - Position: `50% 30%`
- Alternates: Kd27X69pYyo (doorstep handover, `75% 50%`); FWwiKyBXvIE (worker at the counter).
- Why it wins: bright, current and about fetching fresh goods, where the current photo is a dated street.
- Honest note: it shows a store worker, not our driver. Replace it with the client's driver photo when that exists.

**2. /how-it-works hero (ink overlay).** Sheet: `02-hiw-hero.jpg`
- **Pick: KOG1thEuTG8** · `photo-1758526214018-a746f9554b8b` · 3840×2160 · Vitaly Gariev
  - Alt text: "A young woman at home smiling as she pays by card on her phone"
  - Position: `70% 40%` (subject on the right, which leaves the left for the h1)
- Alternates: zPKQe_P1Rz4; 0byhYAVF1Do (same set as the current contactPhone).
- Why it wins: in one glance a UK reader sees "someone abroad paying on their phone", and the bright room stays legible under the scrim.
- Copy note: the h1 says "from your laptop"; change it to "from your phone".

**3. /how-it-works "Your family installs nothing".** Sheet: `03-hiw-family.jpg`
- **Pick: 65_nbwiD3I4** · `photo-1575467678950-0c09aad418af` · 2731×4096 · CDC (@cdc)
  - Alt text: "A couple smiling as they prepare vegetables in a bright kitchen at home"
  - Position: `40% 35%`
- Alternates: QzTEUXrntoY; dEiBdBJDnms (both Sweet Life, @sweetlifediabetes, 3840×5760).
- Why it wins: a warm older Black couple at home with fresh food, the "parents back home". It replaces a frame that pities rather than respects.

**4. /baskets hero band (oxblood overlay).** Sheet: `04-baskets-hero.jpg`
- **Pick: Brm2VqeAljw** · `photo-1753354868478-bd0d94f80ab3` · 3800×2138 · Vitaly Gariev
  - Alt text: "" (decorative under the overlay)
  - Position: `60% 50%`
- Alternates: 6aBRyZGtdeY; zE95fhGitc0.
- Why it wins: a clean, bright modern supermarket aisle. It signals "a real store" through the scrim, where the current shot is dim and cluttered.

**5. Baby care pack (row and detail).** Sheet: `05-basket-baby.jpg`
- **Pick: PfIoq7BDSak** · `photo-1658949556725-577c071e92df` · 3855×5783 · Toa Heftiba (@heftiba)
  - Alt text: "A baby in a diaper sitting on a soft rug at home"
  - Position: `50% 55%`
- Alternates: 62uyIe1uFpU (diapers on a shelf); KeiQeZJLmus (diaper packs, Pampers legible).
- Why it wins: colour, warmth, and the diaper is in shot, where the current photo is a cropped newborn arm.

**6. Pharmacy pack.** Sheet: `06-basket-pharmacy.jpg`
- **Pick: BeL662_pojo** · `photo-1714642764170-fb950305c397` · 3691×2944 · Jane Korsak (@jottiko)
  - Alt text: "Tablets, capsules and a vitamin bottle on a white table"
  - Position: center
- Alternates: -9g2opCDxAs (minimal capsules on beige); 7TWRwDjfGew (pills on orange: bold, but it may clash with the crimson).
- Why it wins: a clean, clinical over-the-counter look on white, where the current bottle is a moody US prescription.

**7. /gifts hero.** Sheet: `07-gifts-hero.jpg`
- **Pick: 4HE4wcL_qTE** · `photo-1773450970959-cef81e9b1053` · 2581×3872 · Rafael Pedroso (@zentrj)
  - Alt text: "A wooden crate packed with treats, a drink and fresh flowers as a gift"
  - Position: `50% 40%`
  - Crop so the small logo on the crate's side is cut
- Alternates: N5fp98wt6h8 (rustic hamper, darker); eLpnTMOHAkU (gift basket, but brand labels are legible).
- Why it wins: a food gift, which is what we actually deliver, where the current photo is a cosmetics-style pink box.

**8. Gifts: Christmas.** Sheet: `08-gift-christmas.jpg`
- **Pick: yxx44vQloZU** · `photo-1766701753169-5ed4a00d4217` · 5152×7728 · Barnaby Woodrow (@cranky_bear)
  - Alt text: "Plates of a Christmas dinner being shared at the table"
  - Position: `50% 60%`
- Alternates: APSZtT67IzI (food gift box, ribbon text); basketChristmas (already the CTA on this page).
- Why it wins: it shows the meal the hamper becomes, warm rather than near-black.

**9. Gifts: Back to school.** Sheet: `09-gift-school.jpg`
- **Pick: SBQveLKNSdg** · `photo-1726726192151-6d4139ff229d` · 6000×4000 · The Design Lady (@sarah35)
  - Alt text: "A packed school lunch box with pencils and a notebook on a yellow desk"
  - Position: center
- Alternates: eZRNJ0eUqtc (lunch box with sandwich and vegetables); aDFj86NuvD8 (muffin in a lunch box).
- Why it wins: it says "lunch-box snacks" (the card's copy) instead of a laptop.

**10. Gifts: New baby.** Sheet: `10-gift-baby.jpg`
- **Pick: KeiQeZJLmus** · `photo-1584839404042-8bc21d240e91` · 4480×6720 · Nathan Dumlao (@nate_dumlao)
  - Alt text: "Packs of baby diapers and wipes"
  - Position: `50% 55%`
- Alternates: 62uyIe1uFpU; PfIoq7BDSak (use it here only if row 5 takes another).
- Why it wins: it shows exactly what the card lists, in colour, not sepia.
- Note: the Pampers logo is a real product sold in Jamaica, so it is not misleading. If the owner wants it brand-free, take B.

**11. /delivery hero.** Sheet: `11-delivery-hero.jpg`
- **Pick: jmKingstonHills** (reuse) · `photo-1584238556966-2c407cc4fd56` · 6000×4000 · andrzj brown
  - Alt text as in the registry
  - Position: `50% 60%`
- Alternates: Kd27X69pYyo (doorstep handover); companyCountryRoad.
- Why it wins: a recognisable Kingston with the Blue Mountains reads as "where we deliver" in a second.
- Knock-on change: give the "two parishes" feature companyCountryRoad (the roads we drive), so the page doesn't repeat itself.

**12. /delivery "Three things that make delivery easy".** Sheet: `12-delivery-tips.jpg`
- **Pick: Kd27X69pYyo** · `photo-1758523670564-d1d6a734dc0b` · 3840×2160 · Vitaly Gariev
  - Alt text: "A courier handing over a delivery at a front door"
  - Position: `78% 50%` in the 4:5 crop
- Alternates: 8RaUEd8zD-U (paper bags of groceries); QpuRvyYQ5kA.
- Why it wins: the tips are about the address, landmark and phone, and the photo is the moment at the gate.
- Caveat: the cardboard box can read as "shipping". If the owner objects, drop the photo and make this section type-only with its icon list.

**13. /contact form and /faq help.** Sheet: `13-contact-faq.jpg`
- **Contact pick: PR_KK2WguRs** · `photo-1758612214835-92627cd49c4a` · 3840×2160 · Vitaly Gariev
  - Alt text: "A woman at home smiling as she messages on her phone"
  - Position: `45% 50%`
- **FAQ pick: QpuRvyYQ5kA** · `photo-1758611974982-ca55f12b3378` (same set, different frame), so the two pages differ.
- Alternate: 0byhYAVF1Do.
- Why it wins: relaxed "message us" body language, where the current photo is a pout mid-call.

**14. /monthly hero.** Sheet: `14-monthly-hero.jpg`
- **Pick: 8RaUEd8zD-U** · `photo-1588964895597-cfccd6e2dbf9` · 4032×3024 · Maria Lin Kim (@mrsmaria)
  - Alt text: "Paper bags of groceries with bread, apples, bananas and cabbage"
  - Position: center
- Alternates: eJM7swj-D4g (bright produce aisle); MsPNgufwJRo (pantry, same staged style as now; not advised).
- Why it wins: "their basket" shown as real groceries, not a showroom pantry.
- Watch: it looks similar to home's `homeBags`. If the manager wants zero echo of home, take B.

**15. /monthly "The cupboard stays full".** Sheet: `15-monthly-meal.jpg`
- **Pick: hxeOgLGjuEY** · `photo-1745433921722-26dd28b318d9` · 3648×5472 · Brooke Balentine (@brookebalentine)
  - Alt text: "A couple serving dinner at home"
  - Position: `50% 45%`
- Alternates: dEiBdBJDnms; 65_nbwiD3I4 (already the pick for slot 3; avoid using it twice).
- Why it wins: a warm, current Black household at the table.
- Note: it is lit at night; on the parallax frame check that the 4:5 crop keeps both faces.

**16. /request hero.** Sheet: `16-request-hero.jpg`
- **Pick: pN0Pg_hk3aA** · `photo-1753354868608-d5e635d4f5ca` · 3800×2138 · Vitaly Gariev
  - Alt text: "A shopper walking a supermarket aisle looking along the shelves"
  - Position: `55% 50%`
- Alternates: FWwiKyBXvIE; eJM7swj-D4g.
- Why it wins: "we check the stores for you" in one frame, with no € tags.
- Note: it is from the same set as the baskets hero. They are different pages, but if the manager wants variety, take B.

## Checks for the build agent
- Gariev's supermarket set features white models (slots 1, 4 and 16). They are store scenes, not our family, and Black people appear in slots 2, 3, 13 and 15. If the manager wants Black or Caribbean people in the store frames too, Unsplash has no modern equivalent. The real fix is the client's own store and driver photos.
- Before registering, look at every pick at 2000px for small legible logos (slots 7, 8 and 10 are flagged above).
- The registry's `usedOn` and the credits page update automatically when keys are swapped in `src/lib/photos/*.ts`.
