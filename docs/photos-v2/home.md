# Home page photos v2: audit and picks

Scope: the home page only (`src/app/(home)/`, `src/components/home/*`). No code or registry
changes here. Contact sheets (current photo, then A, B, C, cropped to the slot's real aspect) are in
`/tmp/claude-0/-home-user-shipeast-web-app/929ce8a4-d339-55c6-8d33-49c8aa81a1e1/scratchpad/photos-v2/home/`
(`01-hero.jpg` … `12-closing.jpg`). Nothing was registered with `download_asset`. All picks are free
(not Unsplash+). URLs are `https://images.unsplash.com/<base>`.

## 1. Slot table

| #   | Slot                                                                             | File:line                                       | Current key / id                        | Aspect                                                            | Verdict                                                                                                                             |
| --- | -------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hero photo (crimson card, right 5/12)                                            | `hero.tsx:40`                                   | `homeBags` / wjoIBMRjQ7s                | 16:10 mobile; about 4:5 at md+ (`md:aspect-auto`, 400–460px tall) | Replace: three paper bags and a pot plant on a white counter read as a craft-shop product shot, not "we shop in a store in Jamaica" |
| 2   | Hero card "Baskets ready to go" thumb                                            | `hero.tsx:114`                                  | `homeVegBox` / Ss1u-roUcuM              | 80px, rotated, square-ish                                         | Replace: a box of loose veg at 80px reads as a farm box, not a basket of staples                                                    |
| 3   | Dept tile Groceries                                                              | `departments.tsx:44` via `lib/departments.ts:8` | `homeVegBox` / Ss1u-roUcuM              | 4:3                                                               | Replace: owner wants a modern supermarket                                                                                           |
| 4   | Dept tile Household                                                              | same, `departments.ts:9`                        | `catHousehold` / DJcVOQUZxF0            | 4:3                                                               | Replace: headless person hugging bottles, dark, 2020 "pandemic stock" feel                                                          |
| 5   | Dept tile Pharmacy                                                               | same, `departments.ts:10`                       | `catPharmacy` / HTttz00wkzU             | 4:3                                                               | Replace: heap of orange US pill bottles, heavy orange cast, reads as "opioids", not a modern pharmacy                               |
| 6   | Dept tile Baby & Child                                                           | same, `departments.ts:11`                       | `catBaby` / QCVrp1uxCXs                 | 4:3 (object-top)                                                  | Replace: a baby's nappy and a teddy, not baby products                                                                              |
| 7   | Basket card Family Food                                                          | `baskets.tsx:65` via `stock-photos.ts:41`       | `basketFood` / -9TeWHMASzs              | 16:10                                                             | Replace: cloth bags of aubergine and peppers look like a farmers' market, not rice, flour, oil                                      |
| 8   | Basket card Baby Care                                                            | `baskets.tsx:65`, `stock-photos.ts:42`          | `basketBaby` / Jqhwp4mcuUM              | 16:10                                                             | Replace: a sleeping newborn's arm, dark and moody; shows no product                                                                 |
| 9   | Basket card Pharmacy Pack (shows when featured, it is in the current screenshot) | `stock-photos.ts:43`                            | `basketPharmacy` / FDvArkoGyvI          | 16:10                                                             | Replace: one orange pill bottle on a dark table, gloomy                                                                             |
| 10  | Basket card Christmas Hamper                                                     | `stock-photos.ts:44`                            | `basketChristmas` / SrnCpsp9sGY         | 16:10                                                             | Keep (seasonal, reads clearly)                                                                                                      |
| 11  | Proof "2. The photo at the door"                                                 | `proof.tsx:75`                                  | `homeStepToDoor` / czTuLlcSAus          | 4:3, in a white frame, "Delivered 2:41 PM" chip top-left          | Replace: jeans, a bag and a railing; no door, no groceries visible, the owner could not tell what it was                            |
| 12  | Delivering in St. Thomas and Kingston                                            | `jamaica.tsx:74`                                | `kingstonStreet` / 9R-WAl5UGWI          | 4:3 with parallax, mango chip bottom-left                         | Replace: random market-street snapshot; owner wants a delivery agent in a downtown street                                           |
| 13  | Closing "Start a basket for home"                                                | `closing.tsx:40`                                | `homeFamilyCook` / m9cBmbOQCmQ          | 4:3 mobile; md: 5/12 column, full height of the crimson band      | Replace: a family playing in a kitchen does not say "order groceries"                                                               |
| —   | Shelf "Staples for the kitchen"                                                  | `shelf.tsx`                                     | client pack shots in `public/products/` | square                                                            | Not mine to replace. Notes below                                                                                                    |

## 2. Picks

### 1. Hero — contact sheet `01-hero.jpg`

- **A (recommended) IH65r4HEQWQ** · base `photo-1670684684445-a4504dca0bbc` · 5686×3736 · Jack Lee (@jack19992011) · alt "A bright supermarket aisle stocked with snacks and groceries" · position `center`.
- B gFJRgtzPNVc · `photo-1641440616173-7241e6fe6be9` · 6240×4160 · Khuc Le Thanh Danh (@danhk111296) · a bright aisle with fridges; small red sign top centre, crop with `center 70%`.
- C 6aBRyZGtdeY · `photo-1753354868507-729241ac48eb` · 3800×2138 · Vitaly Gariev (@silverkblack) · woman pushing a trolley down an aisle, `55% center`.
- Why: a clean, bright modern aisle (London) says "a real store, real shelves" in one glance, and the "Bought in Jamaica. Nothing is shipped." badge now sits on a store, which is the whole promise. Note: the aisle header sign "16 · Chocolate, Sweets / Biscuits, Cereal bars" is small and generic, no store brand.

### 2. Hero card "Baskets ready to go" — `02-hero-basket-tile.jpg`

- **A wjoIBMRjQ7s** (the current hero photo, registry key `homeBags`, freed by slot 1) · bread, tomatoes and bananas in paper bags · position `center 60%`. Use the same photo as the Family Food basket card so the card and the basket match.
- B 8RaUEd8zD-U · `photo-1588964895597-cfccd6e2dbf9` · 4032×3024 · Maria Lin Kim (@mrsmaria) · two full paper bags from above.
- C basketFood (current card photo).
- Why: at 80px, paper grocery bags read as "a bag of shopping"; a box of loose veg does not.

### 3. Dept Groceries — `03-dept-groceries.jpg`

- **A ivfp_yxZuYQ** · `photo-1604719312566-8912e9227c6a` · 4032×3024 · Franki Chamaki (@franki) · alt "A modern supermarket aisle with stocked shelves and fridges at the end" · `center`.
- B rWMIbqmOxrY · `photo-1578916171728-46686eac8d58` · 4032×3024 · Nathália Rosa (@nathaliarosa) · long bright aisle.
- C gFJRgtzPNVc (see slot 1).
- Why: exactly the "modern mart" the owner asked for; different from the hero aisle (darker ceiling, deeper view) so the two never look like a repeat.

### 4. Dept Household — `04-dept-household.jpg`

- **A XxAy813D66I** · `photo-1626379481874-3dc5678fa8ca` · 5760×3840 · Giorgio Trovato (@giorgiotrovato) · alt "White spray bottles and cleaning supplies in a caddy" · `center`. No brand names; red triggers echo the crimson.
- B xp-ND7NjWaA · `photo-1583947215259-38e31be8751f` · 5568×3712 · Kelly Sikkema (@kellysikkema) · bleach, wipes and sanitiser on a table; clearest "household products" but Clorox, Lysol and Walgreens labels are legible (flag).
- C __ZMnefoI3k · `photo-1563453392212-326f5e854473` · 4200×2800 · JESHOOTS.COM (@jeshoots) · gloved hand with a spray bottle; mint background fights the palette.
- Why: real cleaning products, bright and clean, no person hiding behind bottles.

### 5. Dept Pharmacy — `05-dept-pharmacy.jpg`

- **A byGTytEGjBo** · `photo-1580281657527-47f249e8f4df` · 3000×2000 · National Cancer Institute (@nci) · alt "A pharmacist reaching for a box on a bright pharmacy shelf" · `center`. Smiling woman of colour, white coat, clean shelves.
- B fTQHPb6r4wQ · `photo-1580281657529-557a6abb6387` · 3000×2000 · NCI · pharmacist in a long, bright dispensary aisle.
- C 0-HAIyTj7Xw · `photo-1586015555751-63bb77f4322a` · 6000×4000 · freestocks (@freestocks) · medicine bottles on a white shelf, soft focus.
- Why: a real, tidy, modern pharmacy with a professional, instead of a pile of US prescription bottles.

### 6. Dept Baby & Child — `06-dept-baby.jpg`

- **A KeiQeZJLmus** · `photo-1584839404042-8bc21d240e91` · 4480×6720 (portrait) · Nathan Dumlao (@nate_dumlao) · alt "Packs of baby diapers and wipes" · position `center 55%`. Shows Pampers packs (a product we sell, not a store; flag for the manager).
- B YTB_nXkyu6M · `photo-1750085894110-b2e2f11d5e8b` · 7859×5572 · Zoshua Colah (@zoshuacolah) · rows of Johnson's baby bath bottles; legible brand, very yellow.
- C Uz24kdozS5M · `photo-1620875638465-ee3df56ff181` · 4780×3731 · Alex Bodini (@suuthe) · baby on a changing mat, blue backdrop (blue cast).
- Why: diapers and wipes are the first thing a sender buys for a baby; it reads as "baby products" at tile size. Unsplash has few unbranded baby-product shots; if brands are a problem, the manager may prefer client pack shots here.

### 7. Basket Family Food — `07-basket-food.jpg`

- **A wjoIBMRjQ7s** (key `homeBags`, already registered) · position `center 60%`.
- B 8RaUEd8zD-U (see slot 2) — used for slot 11, so avoid doubling up.
- C Ss1u-roUcuM (`homeVegBox`).
- Why: a staples bag (bread, fruit) reads as "a week's food"; loose aubergines read as a market stall.

### 8. Basket Baby Care — `08-basket-baby.jpg`

- **A YTB_nXkyu6M** (see slot 6) · `center`. Pairs with the pack's lotion and wipes.
- B KeiQeZJLmus (if slot 6 goes elsewhere).
- C Uz24kdozS5M.
- Why: shows products, bright, instead of a dark close-up of a sleeping baby.

### 9. Basket Pharmacy Pack — `09-basket-pharmacy.jpg`

- **A 0-HAIyTj7Xw** (see slot 5) · `center`. alt "Medicine and vitamin bottles on a bright shelf".
- B fTQHPb6r4wQ · C byGTytEGjBo (if not used on the tile).
- Why: bright, clean, everyday medicines; no gloom.

### 11. Proof "the photo at the door" — `10-proof-door.jpg`

- **A 8RaUEd8zD-U** · `photo-1588964895597-cfccd6e2dbf9` · 4032×3024 · Maria Lin Kim (@mrsmaria) · alt "Two paper bags of groceries set down on the floor: bread, apples, bananas and a cabbage" · `center`.
- B t0Aio60jD4Q · `photo-1551825687-f9de1603ed8b` · 6016×4016 · Victória Kubiaki (@victoriakubiaki) · smiling Black delivery driver at his open van, blue light; a small chest logo (unreadable at size).
- C KSQgzzn3dW0 (see slot 12).
- Why: the caption promises "the bags at the door", and this is what a driver's proof photo actually looks like: full bags of recognisable food, top-down, readable in a second with the "Delivered 2:41 PM" chip. Gap: no free, unbranded "handing groceries over at a front door" photo exists on Unsplash (the good ones carry Grab, GrabFood or DoorDash branding: xBUDLmcyrVQ, ZbtlHGyz-sk, ipD-GQzwQgw, rejected). A real ShipEast door photo would beat all of these.

### 12. Delivering in St. Thomas and Kingston — `11-street.jpg`

- **A KSQgzzn3dW0** · `photo-1493135637657-c2411b3497ad` · 4898×3265 · Maarten van den Heuvel (@mvdheuvel) · alt "A courier carrying parcels down a busy downtown street" · `center`. No legible logo on the uniform.
- B kWUZKKBR2Ag · `photo-1582902281043-69c645f40cd5` · 3579×5368 · Wynand van Poortvliet (@wwwynand) · delivery man wheeling boxes on a hand truck across a downtown crossing; a "Patagonia" shop sign is legible top-left, so crop `center 85%` to cut it.
- C 23-_-Z-m7jw · `photo-1764696745397-42701a7efd3f` · 4000×6000 · Marvin Alexander Avila (@alexavila777) · man wheeling boxes down a cobbled Paris street, `center 60%`.
- Why: exactly the owner's ask, a delivery agent at work in a downtown street; warm daylight, clear subject, nothing to decode. Update the mango chip "Downtown Kingston" (the photo is not Kingston) to something true, e.g. "Our own drivers".

### 13. Closing "Start a basket for home" — `12-closing.jpg`

- **A 6aBRyZGtdeY** · `photo-1753354868507-729241ac48eb` · 3800×2138 · Vitaly Gariev (@silverkblack) · alt "A shopper pushing a trolley down a bright supermarket aisle" · `55% center` (keeps her centred in the tall md column).
- B eJM7swj-D4g · `photo-1753354868656-53671f69602a` · 3800×2138 · Vitaly Gariev · same shoot, trolley by the produce; green crates are a strong green, `30% center`.
- C wjoIBMRjQ7s (paper bags on a counter) if the manager wants no people.
- Why: "we fill the basket for you" in one image; no posed family. Caveat: the shopper is not Black or Caribbean; Unsplash has no free, modern, unbranded equivalent with a Caribbean shopper that I found.

## 3. Shelf pack shots (client images, for the product-image agent)

From `home-1440.png`: "Member's Selection Thai Jasmine Long…" and "Member's Selection Cold Extracted
Extra…" are PriceSmart's own label (Member's Selection), which is store branding on the front page;
the canned tuna and mackerel shots are low-resolution with grey backgrounds that do not match the
white wells. The Grace baked beans shot is fine.

## 4. Notes for the manager

- Keep the `homeBags` registry entry: it leaves the hero but is reused in slots 2 and 7 (update its `usedOn`).
- Several picks share a photographer shoot (6aBRyZGtdeY / eJM7swj-D4g): use only one on the page.
- Flags to decide: legible product brands in slot 4B, 6A, 6B, 8A (products, not stores).
- The "Downtown Kingston" chip must change if slot 12 uses a non-Jamaican street.
