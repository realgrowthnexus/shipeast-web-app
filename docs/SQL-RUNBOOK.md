# SQL runbook

How to set up the Shop & Send database in Supabase. You run each file by hand in the
Supabase SQL editor, in order. Every file is safe to run again: re-running never deletes data
or overwrites edits made in the admin panel.

## Before you start

1. Create a new Supabase project for Shop & Send. It must be its own project, separate from
   the delivery app.
2. Open **SQL Editor → New query** in the Supabase dashboard.

## Run these files in order

Open each file on GitHub, copy all of it, paste it into a new query and press **Run**. Wait
for "Success" before moving to the next file.

| #   | File                                              | What it does                                                         |
| --- | ------------------------------------------------- | -------------------------------------------------------------------- |
| 1   | `supabase/migrations/0001_foundation.sql`         | Extensions, status types and helper functions                        |
| 2   | `supabase/migrations/0002_profiles.sql`           | Profiles, roles, SE-CUS / SE-DRV ids, saved family addresses         |
| 3   | `supabase/migrations/0003_catalogue.sql`          | Categories, products, baskets, delivery zones, promo codes           |
| 4   | `supabase/migrations/0004_drivers.sql`            | Drivers and their online status                                      |
| 5   | `supabase/migrations/0005_orders.sql`             | Orders, items, payments, proof photos, audit trail, step enforcement |
| 6   | `supabase/migrations/0006_content_and_ops.sql`    | Settings, FAQs, legal pages, contact messages, alerts                |
| 7   | `supabase/migrations/0007_functions.sql`          | Tracking-link lookup and driver actions                              |
| 8   | `supabase/migrations/0008_row_level_security.sql` | Who can read and change what                                         |
| 9   | `supabase/migrations/0009_storage.sql`            | Photo buckets and their access rules                                 |
| 10  | `supabase/migrations/0010_seed.sql`               | Starting categories, parishes, settings and legal page slots         |

## After running them

1. **Make yourself an admin.** Sign up on the site first, then run this with your email:

   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```

2. **Copy three keys into Vercel** (Project Settings → Environment Variables). They are
   under **Project Settings → API** in Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secret: never share it or paste it in chat)

Until those keys are set, the site runs in demo mode on placeholder data.

## Placeholders to replace later

The seed file uses placeholder delivery fees (St. Thomas USD$8, Kingston USD$10), a 1:00 PM
same-day cut-off, a USD$25 minimum order and an exchange rate of J$157 per US dollar. Change
them in the admin panel once ShipEast confirms the real values.

## Checked before hand-over

Each migration has been run twice in a row on PostgreSQL 16 with Supabase-style `auth` and
`storage` schemas. Tests confirmed that:

- a driver can't mark an order shopped without a receipt photo, or delivered without a door
  photo and the receiver's name
- a driver can't close an order or change prices or totals
- senders see only their own orders, and guests reach an order only by its tracking link
- nobody can promote themselves to admin
