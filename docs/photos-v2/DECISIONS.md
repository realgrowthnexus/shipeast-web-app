# Photos v2: the manager's decisions

The owner's review on November 14, 2026 said the photos make the site look outdated and don't
make sense to a sender abroad. Three research agents audited every slot (`home.md`,
`products.md`, `pages.md`). The manager reviewed every contact sheet and made these final
picks. One photo per slot, and no photo used twice on the same page.

Where a pick differs from an agent's recommendation, this file wins. Take each photo's
metadata (base URL, size, photographer, username, alt) from the agent file that lists the id.

## Home page

| Slot                                   | Pick                       | Notes                                                                                                                                                                                                          |
| -------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero photo                             | `IH65r4HEQWQ`              | Bright, modern supermarket aisle: "we shop in a real store". Crop so the price tags aren't the focus.                                                                                                          |
| Hero card "Baskets ready to go" (80px) | `HeP33WOkVqM`              | Flat lay of paper grocery bags with fresh produce (from `products.md`, family food alternates). Unique on the page.                                                                                            |
| Proof: the photo at the door           | `8RaUEd8zD-U`              | Full grocery bags from above, the way a real proof photo looks. Matches "a photo of the bags at the door".                                                                                                     |
| Delivering in St. Thomas and Kingston  | `KSQgzzn3dW0`              | A courier carrying parcels down a downtown street (the owner's own suggestion). It's not Kingston, so the "Downtown Kingston" chip must change to a true line, e.g. "Door to door in St. Thomas and Kingston". |
| Closing "Start a basket for home"      | `wjoIBMRjQ7s` (`homeBags`) | Warm groceries in paper bags, which reads as "for home". Replaces the family playing. Keep the `homeBags` entry; update `usedOn`.                                                                              |

## Departments (home tiles and the shop band tiles)

| Department   | Pick          | Why                                                                                       |
| ------------ | ------------- | ----------------------------------------------------------------------------------------- |
| Groceries    | `PM16-G2eVAs` | A supermarket produce shelf. It reads at 56px and differs from the hero aisle.            |
| Household    | `vkdyCL9Y93A` | Clean, unbranded spray bottles in soft colours.                                           |
| Pharmacy     | `byGTytEGjBo` | A pharmacist at a bright, modern shelf. Human and clinical, not a heap of orange bottles. |
| Baby & Child | `WLPwW1gGyKg` | One unbranded pack of baby wipes on pale blue. Reads at every size.                       |

## Ready-made baskets

| Basket           | Pick          | Notes                                                                                                     |
| ---------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| Family Food      | `Hz4FAtKSLKo` | Real pantry staples (tins, oil, produce), like the basket's contents. Small product labels are fine.      |
| Baby Care Pack   | `KeiQeZJLmus` | Diapers and wipes. A product brand is visible, not a store brand. Alt text says "diapers", not the brand. |
| Pharmacy Pack    | `0-HAIyTj7Xw` | A bright, clean medicine cabinet.                                                                         |
| Christmas Hamper | keep          | Nothing better was free.                                                                                  |

## Products

Follow `products.md` exactly:

- **Replace (4):** rice → `wGDGlVxEE20`, laundry → `9wCOqpBJRHI`, multivitamin → `kxblPqfYc9E`, first aid kit → `j-ped4HD32Q`.
- **Keep (3):** toilet paper, hand sanitiser and pain relief.
- **Switch to the designed placeholder (7):** flour, sugar, oil, oats, coffee, dish soap and bleach. Their mood photos clash with the client's pack shots.
- **Keep on the placeholder (9):** the products with no image.
- Remove any photo-registry entry that no longer has a user, and keep the credits page consistent.

## Other pages

These are the picks from `pages.md`, reviewed by the manager. Metadata comes from `pages.md`.

| Slot                                    | Pick                               | Notes                                                                                         |
| --------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------- |
| /about story                            | `xSdL0ze7Qqc`                      | A grocer with a crate of tomatoes in a modern store.                                          |
| /how-it-works hero (overlay)            | `KOG1thEuTG8`                      | A sender paying on her phone at home. **Change the h1's "laptop" to "phone".**                |
| /how-it-works "family installs nothing" | `65_nbwiD3I4`                      | A family cooking at home with fresh produce.                                                  |
| /baskets hero (overlay)                 | `Brm2VqeAljw`                      | As in `pages.md`.                                                                             |
| Basket cards (all pages)                | as in **Ready-made baskets** above | The pages agent's basket picks (rows 5 and 6) are overruled: one photo per basket, site-wide. |
| /gifts hero                             | `4HE4wcL_qTE`                      | A gift crate of treats. Crop so the burned-in crate logo isn't prominent.                     |
| Gifts: Christmas                        | `yxx44vQloZU`                      |                                                                                               |
| Gifts: Back to school                   | `SBQveLKNSdg`                      |                                                                                               |
| Gifts: New baby                         | `PfIoq7BDSak`                      | Not `KeiQeZJLmus`, which is the Baby Care basket's photo; no repeats.                         |
| /delivery hero                          | `jmKingstonHills` (existing)       | Moved up. The "two parishes" slot gets `companyCountryRoad` (existing).                       |
| /delivery tips                          | `8RaUEd8zD-U`                      | Grocery bags at the door. The parcel hand-over read as "shipping" and is rejected.            |
| /contact form                           | `PR_KK2WguRs`                      |                                                                                               |
| /faq help                               | `QpuRvyYQ5kA`                      |                                                                                               |
| /monthly hero                           | `eJM7swj-D4g`                      | The alternate, so it doesn't echo home's `homeBags` or the delivery tips photo.               |
| /monthly "cupboard stays full"          | `hxeOgLGjuEY`                      |                                                                                               |
| /request hero                           | `pN0Pg_hk3aA`                      |                                                                                               |
| Everything else in `pages.md`           | keep                               |                                                                                               |

Retire registry entries that lose every user (`giftBaby`, `blueMountains`, `staples`, `pantry` and so on), after a grep shows they're unused, so the credits page stays exact.

## For Derion (pack shots)

- **Re-send:**
  - Kraft Easy Mac: the current image is a banner.
  - Libby's Vienna Sausage: cut off on the right.
  - Island Spice: small and soft.
  - Golden Diamond rice: the bag is crumpled.
  - Yellow onions: both sizes use the same picture.
- **Bigger files:** 1000×1000 or larger. Almost all are 640px now.
- **New departments:** pack shots for household, pharmacy and baby products, which replaces the placeholders.
- **Store label:** "Member's Selection" is PriceSmart's own label. It's fine to sell, but say so if he'd rather it didn't lead the home shelf.
