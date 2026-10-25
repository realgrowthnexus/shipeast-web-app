# Client brief — ShipEast Shop & Send

Source material: the WhatsApp history with the client (April–October 2026), the
*Shop & Send* concept proposal, the *Scope overview* and the *Quote* (all October 2026).

## The client

- **Derion Scarlett** ("Mr. Scarlett"), owner of **ShipEast Couriers & Bearer Service Ltd**,
  a courier and errand ("bearer") business based in **St. Thomas, Jamaica**, also serving
  Kingston. Lives and works in the USA; replies are slow; budget is tight.
- Has a US LLC and a business PayPal. A Stripe / online business bank account was
  **rejected**, so card payments must run through PayPal for now.
- Current operations: one driver who already shops at **PriceSmart** for a few overseas
  customers. Derion has a pricing/markup structure for PriceSmart products.
- Domain **shipeastja.com** (Hostinger), mailbox `info@shipeastja.com`.
- Brand: red. Derion finds plain red-on-white "not premium"; wants red that stands out,
  "red mixed with a little black", glossy.

## The business model

Jamaicans abroad (New York, Toronto, London…) buy everyday goods for family **already in
Jamaica**. ShipEast shops locally and delivers, usually the same day. **Nothing is shipped
— no barrels, customs or freight.** Only the money crosses the border.

What the sender is really buying is **proof they took care of their family**: the store
receipt photo and the photo at the door matter as much as the delivery.

Three kinds of sender: the **monthly supporter** (most valuable), the **occasion sender**
(Christmas, birthdays, back to school — baskets + gift message), the **emergency**
(needs it today, needs to know it arrived).

Competitors: grocerylistjamaica.com (main overseas-ordering player, resells PriceSmart at a
markup + service fee), revvcouriers.com (St. Thomas courier, new website), PriceSmart JM.

## Three users + one non-user

| Who | Where | Interface |
|---|---|---|
| Sender | Overseas, laptop or phone | Public website + shop + account |
| Driver | Jamaica, in the aisle and on the road | Driver PWA at `/driver` (no app store) |
| Admin (ShipEast team) | Jamaica | Admin panel at `/admin` |
| Recipient (family) | Jamaica | **Nothing to install** — SMS only |

## Decisions made

| Topic | Decision |
|---|---|
| Domain | `shipeastja.com` — website at root, `/driver`, `/admin`. (`admin.shipeastja.com` belongs to the separate delivery app.) |
| Coverage at launch | **St. Thomas and Kingston**, as Derion said, until they expand. Zones, fees, cut-offs are configurable in admin; other parishes exist but are switched off. |
| Payments | PayPal (wallet + guest card) and bank transfer confirmed by admin. Provider interface so Stripe can be added later. |
| Currency | Shelf prices stored in US cents. J$ shown alongside using an admin-set exchange rate. |
| Timeline | Quality over speed (agreed with Touseef). |
| Backend | Supabase + Vercel, connected later by Touseef. SQL is handed over to run manually. |
| Legal pages | We build pages + layout; wording reviewed by ShipEast (ideally a lawyer). |
| Product photos | Never copy PriceSmart's images. Use our own branded placeholders until ShipEast supplies photos. |

## Sold scope (Quote, October 2026)

**Launch system — US$1,500:** 9 marketing + 6 legal pages; shop (categories, listings,
search, page per product and basket, basket with parish fee and promo codes); checkout
(card via PayPal, PayPal, bank transfer, guest checkout, gift message, substitution rules);
tracking link with receipt + door photos; accounts (sign in, saved family addresses, order
history, one-tap reorder); driver app 9 screens (offers, shopping mode, receipt photo,
proof of delivery, earnings, offline); admin (dashboard, orders, manual driver assignment,
products, bulk prices, baskets, zones & fees, drivers, customers, basic reports); engine
(DB, auth, payments, emails, SMS, alerts, photo storage, backups, docs, 30 days support).

**Add-ons (feature-flagged, built in Phase 8 once confirmed):** monthly repeat orders
(US$220), automatic driver offers (US$130), request any item (US$120), edit website
content (US$100), advanced reports (US$100).

## Open items to collect from Derion

- FAQs and policies (Derion emailed some on Sep 6), business TRN and registered address.
- Product list + PriceSmart pricing/markup rules, basket contents, product photos.
- Delivery fees and cut-off times for St. Thomas and Kingston; exchange rate policy.
- Bank transfer instructions (account details for senders).
- Accounts: PayPal REST app credentials, Resend, Twilio (Jamaican SMS), Supabase, Vercel.
