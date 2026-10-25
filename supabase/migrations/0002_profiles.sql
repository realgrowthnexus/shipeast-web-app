-- 0002 Profiles, roles and saved family addresses.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.app_role not null default 'customer',
  -- SE-CUS-XXXXXX / SE-DRV-XXXXXX. Random, and never changes when a name, email or phone does.
  public_id text not null unique,
  full_name text not null default '',
  email text not null default '',
  phone text,
  email_updates boolean not null default true,
  sms_updates boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Unique public id for a role: SE-CUS-… for customers, SE-DRV-… for drivers, SE-STF-… for staff.
create or replace function public.new_public_id(role public.app_role)
returns text language plpgsql volatile as $$
declare
  prefix text := case role when 'driver' then 'SE-DRV-' when 'customer' then 'SE-CUS-' else 'SE-STF-' end;
  candidate text;
begin
  loop
    candidate := prefix || public.random_code(6);
    exit when not exists (select 1 from public.profiles where public_id = candidate);
  end loop;
  return candidate;
end $$;

-- Role of the signed-in user. Security definer so RLS policies can call it without recursion.
create or replace function public.current_app_role()
returns public.app_role language sql stable security definer set search_path = '' as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(public.current_app_role() in ('staff', 'admin'), false)
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(public.current_app_role() = 'admin', false)
$$;

-- Every new sign-up becomes a customer. Drivers and staff are promoted by an admin.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, role, public_id, full_name, email, phone)
  values (
    new.id,
    'customer',
    public.new_public_id('customer'),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.email, ''),
    new.raw_user_meta_data ->> 'phone'
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- A profile can't change its own role or public id; only an admin can change the role.
create or replace function public.guard_profile_update()
returns trigger language plpgsql as $$
begin
  if new.public_id is distinct from old.public_id then
    raise exception 'public_id never changes';
  end if;
  if new.role is distinct from old.role then
    if auth.uid() is not null and not public.is_admin() then
      raise exception 'only an admin can change roles';
    end if;
    -- Switching to or from driver gives the matching prefix.
    if (new.role = 'driver') <> (old.role = 'driver') then
      new.public_id := public.new_public_id(new.role);
    end if;
  end if;
  return new;
end $$;

drop trigger if exists profiles_guard on public.profiles;
create trigger profiles_guard before update on public.profiles
  for each row execute function public.guard_profile_update();

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  label text not null default '',            -- "Mum — Morant Bay"
  recipient_name text not null,
  phone text not null,                       -- 1-876-123-1234
  street text not null,
  community text not null,
  parish text not null,
  landmark text not null default '',
  notes text not null default '',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists addresses_owner_idx on public.addresses (owner_id);
create unique index if not exists addresses_one_default on public.addresses (owner_id) where is_default;

drop trigger if exists addresses_touch on public.addresses;
create trigger addresses_touch before update on public.addresses
  for each row execute function public.touch_updated_at();
