# Photos v2: shop and product imagery

Research only (November 14, 2026). No code, registry or data file was changed. Contact sheets are in
`/tmp/claude-0/-home-user-shipeast-web-app/929ce8a4-d339-55c6-8d33-49c8aa81a1e1/scratchpad/photos-v2/products/`
(scratch space: copy them somewhere durable if they need to be kept). Every candidate is a free
Unsplash photo (no Unsplash+), checked by eye at `?w=800`.

**Owner's verdict:** the department tiles look like an old site, the pharmacy photo looks 100 years
old, the product pictures make no sense. **Root causes found:** (1) the Pharmacy and Baby tiles are
close-up, warm-cast or lifestyle shots that turn into mush at 56px; (2) the Groceries tile is a veg box,
not a shop; (3) 13 demo products use mood photos (a bowl of flour on black, a pill organiser, a
Clorox bottle on wood) that clash with the client's clean pack shots right next to them on the shelf.

Crops used on the sheets: home department tile `aspect-[4/3]` (300px); shop band tile `size-14`
(56px, also shown at 2x); basket cards 16:10 (home), 1:1 (shop shortcut tile), 16:9 (baskets page);
product cards = whole photo, `object-contain p-3 mix-blend-multiply` on a `#F0F0F0` square.

## 1. Departments (`departmentLooks` in `src/lib/departments.ts`)

| Slot         | Current (key, id)          | Verdict                                                                                                                    | Pick                                                                                                                           | Alternates                                                                                                                                                    | Sheet                |
| ------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Groceries    | `homeVegBox` Ss1u-roUcuM   | Veg box from above: reads as a farm box, not a shop. Also used as the home hero tile, so reusing it here repeats the photo | **PM16-G2eVAs**: a supermarket produce shelf, bright red tomatoes, limes, avocados. Reads at 56px (red block) and at tile size | 6vz4FbVMlj0 (bright modern produce aisle, wide; mush at 56px), luKV6avowg0 (broccoli on a store shelf)                                                        | `dept-groceries.jpg` |
| Household    | `catHousehold` DJcVOQUZxF0 | A woman in black hugging bottles: dark and cluttered, brand tubs                                                           | **vkdyCL9Y93A**: three pastel spray bottles on a light counter, modern and calm                                                | o-QHS4pQWtY (neat flat lay of bottles and brushes), XxAy813D66I (rows of white spray bottles in caddies)                                                      | `dept-household.jpg` |
| Pharmacy     | `catPharmacy` HTttz00wkzU  | A heap of amber pill bottles: heavy orange cast, dated, unreadable at 56px. This is the "100-year-old" photo               | **mLaIFEtUZFs**: a real pharmacy shelf of white medicine bottles, clean and clinical                                           | 0-HAIyTj7Xw (white medicine cabinet, very bright, soft focus), kxblPqfYc9E (blue capsules and a jar on pale grey)                                             | `dept-pharmacy.jpg`  |
| Baby & Child | `catBaby` QCVrp1uxCXs      | A baby's body in a cloth nappy: a person, not products; reads as skin at 56px                                              | **WLPwW1gGyKg**: one pack of baby wipes (pink and yellow) on a pale blue surface, no legible brand                             | KeiQeZJLmus (stacked packs of disposable diapers; Pampers is legible), aMca3BHUvmU (wipes, bottle and toys in a changing bag; the Natracare brand is legible) | `dept-baby.jpg`      |

## 2. Ready-made baskets (`basketPhotos` in `src/lib/stock-photos.ts`)

Used in `home/baskets.tsx` (16:10), `shop/listing/basket-shortcut-tile.tsx` (1:1),
`pages/baskets/basket-row.tsx` (16:9), `shop/product-card.tsx` and `product/product-baskets.tsx`.

| Basket (contents)                                                                    | Current                                                           | Verdict                                                                  | Pick                                                                                                                                                                                      | Alternates                                                                                  | Sheet                    |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------ |
| Family Food Basket (rice, flour, sugar, oil, corned beef, mackerel, evaporated milk) | `basketFood` -9TeWHMASzs, cloth bags of fresh veg                 | Bright and good, but shows fresh veg and the basket holds pantry staples | **Hz4FAtKSLKo**: a grocery haul on a white sheet with cans, a bottle of oil, boxes and fruit. Caveat: Milka and Edgell labels are small but legible                                       | Keep the current photo if the brands are a problem; HeP33WOkVqM (paper bags of veg on teal) | `basket-family-food.jpg` |
| Baby Care Pack (diapers, wipes, formula, lotion)                                     | `basketBaby` Jqhwp4mcuUM, newborn asleep                          | Lifestyle; shows none of the contents; skin-tone mush at small sizes     | **KeiQeZJLmus**: stacked packs of disposable diapers, which really are the main item. Caveat: Pampers is legible; acceptable on a basket card but say "diapers" in the alt, not the brand | aMca3BHUvmU (wipes and toys), rhkIPearrck (Vaseline and baby soap; brands legible)          | `basket-baby-care.jpg`   |
| Pharmacy Pack (pain relief, multivitamin, first aid kit, sanitiser)                  | `basketPharmacy` FDvArkoGyvI, amber bottle on a dark wooden table | Dark, moody, same dated amber look as the old tile                       | **0-HAIyTj7Xw**: a bright white medicine cabinet with bottles                                                                                                                             | j-ped4HD32Q (orange first aid case), kxblPqfYc9E (capsules on pale grey)                    | `basket-pharmacy.jpg`    |
| Christmas Hamper (coffee, milk, sugar, flour, oats)                                  | `basketChristmas` SrnCpsp9sGY, wicker hamper by a tree            | The best of what is free; darkish, and it's a candle gift box. **Keep**  | keep current                                                                                                                                                                              | QFHN8XN923I (kraft-wrapped gift on wood), 1eEAexOD2MQ (panettone, too dark)                 | `basket-christmas.jpg`   |

## 3. Products

Inventory: **80 demo products**. (a) 58 client pack shots in `public/products/` (all groceries);
(b) 13 placeholder products with an Unsplash photo (`src/lib/photos/products.ts`); (c) 9 with no image
(designed shelf-tag placeholder). Unsplash has almost no honest, unbranded, isolated pack shots of
generic staples, so most rows below end in **keep placeholder**: a clean designed tile beats a mood
photo next to the client's pack shots.

| Product                     | Group | Current                             | Verdict                                                       | Pick                                                                                              | Sheet                                |
| --------------------------- | ----- | ----------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------ |
| 58 client products          | a     | own pack shot                       | Good overall, see §5                                          | keep                                                                                              | `packshots-1.jpg`, `packshots-2.jpg` |
| Long Grain Rice 10 lb       | b     | D8PSaH0o7kk, grain texture          | Texture, not an item                                          | **wGDGlVxEE20** glass bowl of rice on white                                                       | `products-1-groceries.jpg`           |
| All-Purpose Flour 5 lb      | b     | quVArOn8-30, bowl on black          | Dark, the owner's example                                     | keep placeholder                                                                                  | same                                 |
| Granulated Sugar 4 lb       | b     | AQv1UhsnkqE, jar in a dark kitchen  | Cluttered, dark                                               | keep placeholder                                                                                  | same                                 |
| Vegetable Cooking Oil 1 gal | b     | XV1CK2z5VYg, red oil jug on tiles   | Wrong colour, misleading                                      | keep placeholder                                                                                  | same                                 |
| Rolled Oats 42 oz           | b     | 3H5UJIpint0, glass on dark wood     | Dark, moody                                                   | keep placeholder                                                                                  | same                                 |
| Ground Coffee 24 oz         | b     | j_DqtxKL4xY, pile of grounds        | Texture; out of stock anyway                                  | keep placeholder                                                                                  | same                                 |
| Corned Beef 12 oz           | c     | placeholder                         | No honest shot (blank round cans are the wrong shape)         | keep placeholder                                                                                  | same                                 |
| Mackerel in Tomato Sauce    | c     | placeholder                         | Duplicates the client's **Grace Mackerel** (pack shot exists) | retire it or point the basket at the client product                                               | same                                 |
| Evaporated Milk 12 pk       | c     | placeholder                         | A blank can is not honest                                     | keep placeholder                                                                                  | same                                 |
| Laundry Detergent 150 fl oz | c     | placeholder                         | —                                                             | **9wCOqpBJRHI** unbranded jug with a handle on grey (3D render)                                   | `products-2-household-pharmacy.jpg`  |
| Dish Soap 3 pk              | b     | 6w_RiUhcbnA, amber bottle by a sink | Lifestyle                                                     | keep placeholder                                                                                  | same                                 |
| Toilet Paper 30 rolls       | b     | gSdhs5DJ1bg, rolls on white         | Already pack style                                            | **keep current**                                                                                  | same                                 |
| Paper Towels 12 rolls       | c     | placeholder                         | Nothing honest found                                          | keep placeholder                                                                                  | same                                 |
| Household Bleach 2 pk       | b     | CZ7YLgYAfos, Clorox on wood         | Legible brand, dark wood                                      | keep placeholder (alt iHqzvk7C3eM, a plain white bottle, is too generic)                          | same                                 |
| Pain Relief Tablets         | b     | kdgiNc0sDeI, white tablets          | Honest and light enough                                       | **keep current**; 1Moq8hAvy_M rejected (black pills)                                              | same                                 |
| Adult Multivitamin          | b     | HtDQ9Z64Vpo, pill organiser         | Not a multivitamin pack                                       | **kxblPqfYc9E** capsules and a jar on pale grey                                                   | same                                 |
| First Aid Kit               | b     | 17oHCCMnPqo, grimy green bag        | Dark and worn                                                 | **j-ped4HD32Q** orange first aid case on a light table ("Erste Hilfe" in German is printed on it) | same                                 |
| Hand Sanitiser 2 pk         | b     | tAZElyZEm40, bottle on white        | Already pack style                                            | **keep current**                                                                                  | same                                 |
| Baby Diapers Size 3         | c     | placeholder                         | Only branded lifestyle piles                                  | keep placeholder                                                                                  | `products-3-baby.jpg`                |
| Baby Wipes 900              | c     | placeholder                         | WLPwW1gGyKg is on blue, not white; others are branded         | keep placeholder                                                                                  | same                                 |
| Infant Formula 48 oz        | c     | placeholder                         | Nothing honest                                                | keep placeholder                                                                                  | same                                 |
| Baby Lotion 2 pk            | c     | placeholder                         | Renders found are feeding bottles                             | keep placeholder                                                                                  | same                                 |

## 4. Pick details

All `src` values are the base URL, without query parameters. Positions are CSS `object-position`.

| Id          | `src`                                                          | W×H       | Photographer (username)             | Alt                                                                | Position     |
| ----------- | -------------------------------------------------------------- | --------- | ----------------------------------- | ------------------------------------------------------------------ | ------------ |
| PM16-G2eVAs | `https://images.unsplash.com/photo-1751200270667-cb13feeac24c` | 5575×8160 | Zoshua Colah (zoshuacolah)          | Fresh tomatoes, limes and avocados on a supermarket produce shelf  | `center 55%` |
| vkdyCL9Y93A | `https://images.unsplash.com/photo-1642429948123-bb852afcb0f1` | 6240×5452 | everdrop GmbH (everdrop)            | Three spray bottles of household cleaner on a light counter        | `center 60%` |
| mLaIFEtUZFs | `https://images.unsplash.com/photo-1696861286643-341a8d7a79e9` | 3600×2400 | David Trinks (dtrinksrph)           | Rows of white medicine bottles on a pharmacy shelf                 | `center`     |
| WLPwW1gGyKg | `https://images.unsplash.com/photo-1633265484557-e298493cb162` | 4592×3064 | Towfiqu barbhuiya (towfiqu999999)   | A pack of baby wipes on a pale blue surface                        | `center`     |
| Hz4FAtKSLKo | `https://images.unsplash.com/photo-1543168256-418811576931`    | 4330×2887 | Maddi Bazzocco (maddibazzocco)      | A grocery haul of tins, oil, boxed food and fruit on a white sheet | `center`     |
| KeiQeZJLmus | `https://images.unsplash.com/photo-1584839404042-8bc21d240e91` | 4480×6720 | Nathan Dumlao (nate_dumlao)         | Stacked packs of disposable diapers                                | `center 45%` |
| 0-HAIyTj7Xw | `https://images.unsplash.com/photo-1586015555751-63bb77f4322a` | 6000×4000 | freestocks (freestocks)             | Medicine bottles on a bright white cabinet shelf                   | `center`     |
| wGDGlVxEE20 | `https://images.unsplash.com/photo-1705147289789-6df2593f1b1e` | 6194×4130 | Mehmet Keskin (keskinlerinmehmet)   | A glass bowl of uncooked white rice                                | `center`     |
| 9wCOqpBJRHI | `https://images.unsplash.com/photo-1649005011845-ef225c89da86` | 2507×2505 | Sufyan (blenderdesigner)            | A plain white laundry detergent jug with a handle                  | `center`     |
| kxblPqfYc9E | `https://images.unsplash.com/photo-1544991936-9464fa9919d2`    | 6000×4000 | Pawel Czerwinski (pawel_czerwinski) | Capsules beside an open glass jar on pale grey                     | `center`     |
| j-ped4HD32Q | `https://images.unsplash.com/photo-1563260324-5ebeedc8af7c`    | 4032×3024 | Ploegerson (boombasti)              | An orange first aid case on a light table                          | `center`     |

Alternates worth keeping on file: 6vz4FbVMlj0 `photo-1793621624560-4039d288c441` 9504×6336
Ashita Mata (mataashita); luKV6avowg0 `photo-1751200365135-9e9eb01a2919` 4911×6889 Zoshua Colah;
o-QHS4pQWtY `photo-1649073005971-37babef31983` 5304×7952 Sophie (sophiebarrowauthor); XxAy813D66I
`photo-1626379481874-3dc5678fa8ca` 5760×3840 Giorgio Trovato (giorgiotrovato); aMca3BHUvmU
`photo-1734599397715-f030c6d206a0` 5303×5303 Natracare (natracare).

Notes for the build: register each pick through the Unsplash download endpoint when it's added (the
registry rule in `src/lib/photos/types.ts`). Two picks are shared (KeiQeZJLmus could be both the baby
tile alternate and the baby basket; kxblPqfYc9E is the multivitamin and a pharmacy alternate). Pick
different photos for the tile and the basket so one photo doesn't appear twice on a page.
9wCOqpBJRHI is a 3D render: honest because it has no brand, but credit it as normal.

## 5. Client pack shots: what to ask Derion for

58 files, all 640×640 JPEG except two (soybean frying oil 386×640, Walkerswood green seasoning
559×640). Most are clean store catalogue shots on white and sit well on the grey square. Flags:

1. **Kraft Easy Mac Cups 12 units**: a marketing banner ("12 Easy Mac Cups Included") filling the
   frame, not a pack shot. Ask for the plain box on white.
2. **Libby's Vienna Sausages 18 units**: the box is cut off on the right and fills the frame edge to
   edge. Ask for the whole box on white.
3. **Island Spice All Purpose Seasoning 907 g**: small in its frame on a grey box with a visible edge,
   low detail. Ask for a sharper, larger shot.
4. **Golden Diamond Thai Jasmine Rice 5 kg**: crumpled bag, soft, small. Ask for a cleaner shot.
5. **Yellow onion 1.36 kg and 4.54 kg**: the same photo for both sizes. Ask for a photo of each bag,
   or show the 10 lb sack for the larger one.
6. **Grace Mackerel 10 units** shows 5 cans, and **Maggi Season-Up** pairs sit on a soft grey
   background. Fine for now; replace when better shots arrive.
7. Ideally 1000×1000 or larger for every product, so the product page can zoom.
8. Pack shots for the non-grocery departments (household, pharmacy, baby), which have none from him
   yet. That is the only real fix for the 9 placeholder tiles and 13 mood photos.
