-- 0013 Aisles: sub-groups inside each department, for the shop's aisle filter.
-- Safe to run again: creates only what is missing and never overwrites edits.

create table if not exists public.aisles (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete cascade,
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  sort int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, slug)
);

create index if not exists aisles_category_idx on public.aisles (category_id, sort);

alter table public.products
  add column if not exists aisle_id uuid references public.aisles (id) on delete set null;

create index if not exists products_aisle_idx on public.products (aisle_id) where status <> 'hidden';

-- A product's aisle must belong to the product's own department.
create or replace function public.check_product_aisle()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.aisle_id is not null and not exists (
    select 1 from public.aisles a where a.id = new.aisle_id and a.category_id = new.category_id
  ) then
    raise exception 'Aisle % is not in this product''s department', new.aisle_id;
  end if;
  return new;
end $$;

drop trigger if exists products_aisle_check on public.products;
create trigger products_aisle_check before insert or update of aisle_id, category_id
  on public.products for each row execute function public.check_product_aisle();

drop trigger if exists aisles_touch on public.aisles;
create trigger aisles_touch before update on public.aisles
  for each row execute function public.touch_updated_at();

alter table public.aisles enable row level security;

drop policy if exists "aisles: public read" on public.aisles;
create policy "aisles: public read" on public.aisles for select to anon, authenticated
  using (visible or public.is_staff());

drop policy if exists "aisles: admin write" on public.aisles;
create policy "aisles: admin write" on public.aisles for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Starting aisles for the four launch departments (a first draft: needs Derion to confirm).
-- Edits made later are never overwritten.
insert into public.aisles (category_id, slug, name, sort)
select c.id, v.slug, v.name, v.sort
from public.categories c
join (values
  ('groceries', 'rice-and-grains', 'Rice & grains', 1),
  ('groceries', 'baking', 'Baking', 2),
  ('groceries', 'cooking-oils', 'Cooking oils', 3),
  ('groceries', 'canned-goods', 'Canned goods', 4),
  ('groceries', 'breakfast-and-drinks', 'Breakfast & drinks', 5),
  ('household', 'laundry-and-cleaning', 'Laundry & cleaning', 1),
  ('household', 'dishwashing', 'Dishwashing', 2),
  ('household', 'paper-goods', 'Paper goods', 3),
  ('pharmacy', 'pain-relief', 'Pain relief', 1),
  ('pharmacy', 'vitamins', 'Vitamins', 2),
  ('pharmacy', 'first-aid-and-hygiene', 'First aid & hygiene', 3),
  ('baby-and-child', 'diapers-and-wipes', 'Diapers & wipes', 1),
  ('baby-and-child', 'feeding', 'Feeding', 2),
  ('baby-and-child', 'bath-and-skin-care', 'Bath & skin care', 3)
) as v (category_slug, slug, name, sort) on v.category_slug = c.slug
on conflict (category_id, slug) do nothing;
