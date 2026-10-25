-- 0006 Site content, settings, contact messages, notifications and admin alerts.

create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists settings_touch on public.settings;
create trigger settings_touch before update on public.settings
  for each row execute function public.touch_updated_at();

-- Keys the public site may read. Everything else in settings stays private to staff.
create or replace function public.is_public_setting(k text)
returns boolean language sql immutable as $$
  select k in ('exchange_rate', 'contact', 'features', 'maintenance', 'bank_transfer_hours')
$$;

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  group_name text not null,          -- Ordering, Payment, Substitutions, Delivery, Refunds, Account
  question text not null,
  answer text not null,
  visible boolean not null default true,
  sort int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.legal_pages (
  slug text primary key,             -- terms, privacy, refunds, substitutions, delivery, cookies
  title text not null,
  body_md text not null default '',
  effective_on date,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  key text primary key,              -- e.g. 'home.hero.title' (editable when the CMS add-on is on)
  value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null,
  order_no text,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications_log (
  id bigint generated always as identity primary key,
  order_id uuid references public.orders (id) on delete set null,
  channel text not null check (channel in ('email', 'sms', 'alert')),
  template text not null,
  recipient text not null,
  provider_ref text,
  status text not null default 'sent',
  error text,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_alerts (
  id bigint generated always as identity primary key,
  kind text not null,                -- new_order, unassigned, transfer_to_confirm, payment_failed, ask_first
  order_id uuid references public.orders (id) on delete cascade,
  message text not null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists admin_alerts_open_idx on public.admin_alerts (created_at desc) where resolved_at is null;

do $$
declare t text;
begin
  foreach t in array array['faqs', 'legal_pages', 'site_content'] loop
    execute format('drop trigger if exists %I_touch on public.%I', t, t);
    execute format('create trigger %I_touch before update on public.%I for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;
