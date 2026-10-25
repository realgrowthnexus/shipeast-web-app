-- 0010 Starting data: categories, delivery zones and settings.
-- Fees, cut-offs, the exchange rate and contact numbers are PLACEHOLDERS until ShipEast
-- confirms them; change them later in the admin panel. Re-running never overwrites edits.

insert into public.categories (slug, name, description, sort) values
  ('groceries', 'Groceries', 'Pantry staples, breakfast, drinks and snacks.', 1),
  ('household', 'Household', 'Cleaning, laundry, paper goods and kitchen basics.', 2),
  ('pharmacy', 'Pharmacy', 'Over-the-counter care, vitamins and first aid.', 3),
  ('baby-and-child', 'Baby & Child', 'Diapers, wipes, formula and baby care.', 4)
on conflict (slug) do nothing;

-- Launch coverage is St. Thomas and Kingston. Other parishes exist but are switched off.
insert into public.delivery_zones (parish, active, fee_cents, speed, cutoff_time, min_order_cents, sort) values
  ('St. Thomas',    true,   800, 'same_day',  '13:00', 2500,  1),
  ('Kingston',      true,  1000, 'same_day',  '13:00', 2500,  2),
  ('St. Andrew',    false, 1000, 'same_day',  '13:00', 2500,  3),
  ('St. Catherine', false, 1200, 'next_day',  '13:00', 2500,  4),
  ('Clarendon',     false, 1500, 'next_day',  '13:00', 2500,  5),
  ('Manchester',    false, 1800, 'scheduled', '13:00', 2500,  6),
  ('St. Elizabeth', false, 1800, 'scheduled', '13:00', 2500,  7),
  ('Westmoreland',  false, 2000, 'scheduled', '13:00', 2500,  8),
  ('Hanover',       false, 2000, 'scheduled', '13:00', 2500,  9),
  ('St. James',     false, 2000, 'scheduled', '13:00', 2500, 10),
  ('Trelawny',      false, 2000, 'scheduled', '13:00', 2500, 11),
  ('St. Ann',       false, 1800, 'scheduled', '13:00', 2500, 12),
  ('St. Mary',      false, 1800, 'scheduled', '13:00', 2500, 13),
  ('Portland',      false, 1500, 'scheduled', '13:00', 2500, 14)
on conflict (parish) do nothing;

insert into public.settings (key, value) values
  ('exchange_rate', '{"jmd_per_usd": 157}'),
  ('contact', '{"email": "info@shipeastja.com", "phone": "", "whatsapp": ""}'),
  ('features', '{"monthly_orders": false, "auto_offers": false, "item_requests": false, "cms": false, "advanced_reports": false}'),
  ('maintenance', '{"enabled": false, "message": ""}'),
  ('bank_transfer_hours', '48'),
  ('bank_transfer', '{"instructions": ""}'),
  ('driver_offer_seconds', '180')
on conflict (key) do nothing;

insert into public.legal_pages (slug, title) values
  ('terms', 'Terms of service'),
  ('privacy', 'Privacy policy'),
  ('refunds', 'Refund and cancellation policy'),
  ('substitutions', 'Substitution and out-of-stock policy'),
  ('delivery', 'Delivery policy'),
  ('cookies', 'Cookie notice')
on conflict (slug) do nothing;
