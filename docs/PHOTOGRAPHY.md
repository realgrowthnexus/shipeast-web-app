# Photography

Stock photos on the marketing pages, and the rules for adding or swapping one. The page-by-page
plan, with the reason for each photo, is in the "ShipEast photography plan" doc.

## Rules

- Every photo shows the sentence next to it: the step, the category, the basket, the occasion. A
  photo that only adds "mood" is left out.
- Warm, everyday, Caribbean where we can find it: family, groceries, the door, Kingston and St.
  Thomas. No studio shots of models staring at the camera.
- No overlays, tints, gradients or text on top of a photo. Crimson blocks sit beside photos.
- No PriceSmart photos, no store or delivery-company logos, and no real product photos here:
  products keep their placeholders until ShipEast supplies photos.
- 12px corners (`rounded-lg`), cropped to 4:3 for steps and occasions, 16:9 for places and basket
  headers, 4:5 for the tall people shot in "Why ShipEast".
- Only pages that sell or explain get photos. Basket, checkout, payment, tracking, product pages,
  search, FAQ, legal, accounts, the driver app and admin stay photo-free so nothing slows them
  down or distracts from the task.

## How it works

- `src/lib/stock-photos.ts` is the only list of photos. Each entry has the Unsplash id, the
  image URL, size, alt text, photographer and where it is used. The credits page at
  `/photo-credits` is built from it, so a photo cannot be on the site without a credit.
- `<StockPhoto name="…" sizes="…" className="aspect-4/3" />` draws one. Unsplash's CDN does the
  resizing (`?w=…&auto=format`), so files arrive as WebP or AVIF at the size the layout needs.
  Always pass a real `sizes`. Only the home hero uses `preload`.
- Category tiles and basket cards look up their photo by slug (`categoryPhotos`, `basketPhotos`).
  A new category or basket without an entry keeps its icon or plain crimson card.

## Swapping a photo

1. Find a free (not Unsplash+) photo on unsplash.com that fits the rules.
2. Record the download through the Unsplash API (`/photos/:id/download`), as the API terms ask.
3. Replace the entry in `stock-photos.ts`: id, `images.unsplash.com/photo-…` URL without the query
   string, width, height, honest alt text, photographer and username.
