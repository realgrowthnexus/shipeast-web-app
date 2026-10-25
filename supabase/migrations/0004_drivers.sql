-- 0004 Drivers. A driver is a profile with role 'driver' plus vehicle and zone details.

create table if not exists public.drivers (
  id uuid primary key references public.profiles (id) on delete cascade,
  vehicle text not null default '',
  plate text not null default '',
  zone_ids uuid[] not null default '{}',
  status public.driver_status not null default 'offline',
  online_since timestamptz,
  active boolean not null default true,
  licence_expires_on date,
  insurance_expires_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists drivers_touch on public.drivers;
create trigger drivers_touch before update on public.drivers
  for each row execute function public.touch_updated_at();

-- Keeps online_since in step with the online/offline toggle.
create or replace function public.track_driver_online()
returns trigger language plpgsql as $$
begin
  if new.status = 'offline' then
    new.online_since := null;
  elsif old.status is null or old.status = 'offline' then
    new.online_since := now();
  end if;
  return new;
end $$;

drop trigger if exists drivers_online on public.drivers;
create trigger drivers_online before insert or update of status on public.drivers
  for each row execute function public.track_driver_online();
