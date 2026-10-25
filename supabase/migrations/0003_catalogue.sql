-- 0003 Catalogue: categories, products, baskets, delivery zones and promo codes.
-- All money is integer US cents.

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  image_path text,
  visible boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  size text not null default '',
  description text not null default '',
  category_id uuid not null references public.categories (id),
  price_cents int not null check (price_cents >= 0),
  status public.product_status not null default 'visible',
  image_path text,
  featured boolean not null default false,
  price_checked_at timestamptz not null default now(),
  price_flagged boolean not null default false,  -- set by a driver who saw a different price at the till
  price_flag_note text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_id) where status <> 'hidden';

create table if not exists public.baskets (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  price_cents int not null check (price_cents >= 0),
  occasion text not null default 'everyday',
  status public.product_status not null default 'visible',
  image_path text,
  featured boolean not null default false,
  sort int not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.basket_items (
  basket_id uuid not null references public.baskets (id) on delete cascade,
  product_id uuid not null references public.products (id),
  quantity int not null check (quantity > 0),
  primary key (basket_id, product_id)
);

create table if not exists public.delivery_zones (
  id uuid primary key default gen_random_uuid(),
  parish text not null unique,
  active boolean not null default false,
  fee_cents int not null check (fee_cents >= 0),
  speed public.delivery_speed not null default 'same_day',
  cutoff_time time not null default '13:00',   -- Jamaica time
  min_order_cents int not null default 0,
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code = upper(code)),
  description text not null default '',
  percent_off int check (percent_off between 1 and 100),
  amount_off_cents int check (amount_off_cents > 0),
  min_order_cents int not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  max_uses int,
  max_uses_per_customer int not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  check ((percent_off is null) <> (amount_off_cents is null))
);

do $$
declare t text;
begin
  foreach t in array array['categories', 'products', 'baskets', 'delivery_zones'] loop
    execute format('drop trigger if exists %I_touch on public.%I', t, t);
    execute format('create trigger %I_touch before update on public.%I for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;
