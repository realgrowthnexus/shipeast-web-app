-- 0014 Five more grocery aisles, named as in ShipEast's own price list (November 2026):
-- Pasta, Pantry, Fresh produce, Dairy, Seasonings & spices.
-- Safe to run again: adds only what is missing and never overwrites edits.

insert into public.aisles (category_id, slug, name, sort)
select c.id, v.slug, v.name, v.sort
from public.categories c
join (values
  ('groceries', 'pasta', 'Pasta', 6),
  ('groceries', 'pantry', 'Pantry', 7),
  ('groceries', 'fresh-produce', 'Fresh produce', 8),
  ('groceries', 'dairy', 'Dairy', 9),
  ('groceries', 'seasonings-and-spices', 'Seasonings & spices', 10)
) as v (category_slug, slug, name, sort) on v.category_slug = c.slug
on conflict (category_id, slug) do nothing;
