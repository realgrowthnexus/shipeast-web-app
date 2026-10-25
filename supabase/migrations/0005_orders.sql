-- 0005 Orders, items, payments, proof photos and the audit trail.
-- Order totals are written only by server code (service role) from database prices.

create sequence if not exists public.order_no_seq start 10001;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_no text not null unique default ('SE-' || nextval('public.order_no_seq')),
  -- Unguessable token for the no-login tracking link. Guests reach their order only through it.
  tracking_token text not null unique default encode(extensions.gen_random_bytes(24), 'hex'),
  customer_id uuid references public.profiles (id) on delete set null,   -- null for guests
  sender_name text not null,
  sender_email text not null,
  sender_phone text,
  recipient_name text not null,
  recipient_phone text not null,
  street text not null,
  community text not null,
  parish text not null,
  landmark text not null default '',
  delivery_notes text not null default '',
  zone_id uuid references public.delivery_zones (id),
  delivery_date date not null,
  substitution_rule public.substitution_rule not null,
  gift_message text,
  subtotal_cents int not null check (subtotal_cents >= 0),
  delivery_fee_cents int not null check (delivery_fee_cents >= 0),
  discount_cents int not null default 0 check (discount_cents >= 0),
  total_cents int not null check (total_cents >= 0),
  jmd_per_usd numeric(10, 2) not null,           -- rate shown to the sender at checkout
  promo_code_id uuid references public.promo_codes (id),
  payment_method public.payment_method not null,
  payment_status public.payment_status not null default 'pending',
  status public.order_status not null default 'awaiting_payment',
  driver_id uuid references public.drivers (id) on delete set null,
  receipt_total_cents int,                       -- entered by the driver from the till receipt
  receiver_name text,                            -- who took the delivery at the door
  failure_reason text,
  paid_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (total_cents = subtotal_cents + delivery_fee_cents - discount_cents)
);

create index if not exists orders_customer_idx on public.orders (customer_id, created_at desc);
create index if not exists orders_driver_idx on public.orders (driver_id) where driver_id is not null;
create index if not exists orders_status_idx on public.orders (status, created_at desc);

drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  basket_id uuid references public.baskets (id) on delete set null,
  -- Snapshot at checkout, so later price or name changes don't rewrite history.
  name text not null,
  size text not null default '',
  unit_price_cents int not null check (unit_price_cents >= 0),
  quantity int not null check (quantity > 0),
  outcome public.item_outcome not null default 'pending',
  substitute_note text,
  refund_cents int not null default 0,
  sort int not null default 0,
  check (product_id is null or basket_id is null)
);

create index if not exists order_items_order_idx on public.order_items (order_id);

create table if not exists public.order_events (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders (id) on delete cascade,
  from_status public.order_status,
  to_status public.order_status not null,
  actor_id uuid references public.profiles (id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists order_events_order_idx on public.order_events (order_id, created_at);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  provider text not null,                        -- 'paypal' | 'bank_transfer' | later 'stripe'
  provider_ref text,
  amount_cents int not null,
  status public.payment_status not null,
  raw jsonb,
  created_at timestamptz not null default now(),
  unique (provider, provider_ref)
);

create table if not exists public.order_photos (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  kind public.photo_kind not null,
  storage_path text not null,                    -- in the 'receipts' or 'door-photos' bucket
  taken_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists order_photos_order_idx on public.order_photos (order_id, kind);

create table if not exists public.promo_redemptions (
  promo_code_id uuid not null references public.promo_codes (id) on delete cascade,
  order_id uuid not null references public.orders (id) on delete cascade,
  customer_id uuid references public.profiles (id) on delete set null,
  sender_email text not null,
  created_at timestamptz not null default now(),
  primary key (promo_code_id, order_id)
);

-- Signed-in senders' baskets. Guests keep theirs in a signed cookie.
create table if not exists public.cart_items (
  customer_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid references public.products (id) on delete cascade,
  basket_id uuid references public.baskets (id) on delete cascade,
  quantity int not null check (quantity > 0),
  added_at timestamptz not null default now(),
  check ((product_id is null) <> (basket_id is null))
);

create unique index if not exists cart_items_unique
  on public.cart_items (customer_id, coalesce(product_id, basket_id));

-- Allowed status moves. The driver app, admin panel and webhooks all go through this,
-- so a driver can never skip a step.
create or replace function public.order_transition_allowed(from_s public.order_status, to_s public.order_status)
returns boolean language sql immutable as $$
  select (from_s, to_s) in (
    ('awaiting_payment', 'paid'),
    ('awaiting_payment', 'payment_failed'),
    ('awaiting_payment', 'cancelled'),
    ('payment_failed', 'awaiting_payment'),
    ('payment_failed', 'paid'),
    ('payment_failed', 'cancelled'),
    ('paid', 'confirmed'),
    ('paid', 'cancelled'),
    ('confirmed', 'awaiting_driver'),
    ('confirmed', 'driver_assigned'),
    ('confirmed', 'cancelled'),
    ('awaiting_driver', 'driver_assigned'),
    ('awaiting_driver', 'cancelled'),
    ('driver_assigned', 'awaiting_driver'),
    ('driver_assigned', 'shopping'),
    ('driver_assigned', 'cancelled'),
    ('shopping', 'shopped'),
    ('shopped', 'out_for_delivery'),
    ('out_for_delivery', 'delivered'),
    ('out_for_delivery', 'failed_delivery'),
    ('failed_delivery', 'out_for_delivery'),
    ('failed_delivery', 'refunded'),
    ('delivered', 'closed'),
    ('cancelled', 'refunded')
  )
$$;

-- Enforces the lifecycle on every status change and writes the audit trail.
create or replace function public.enforce_order_status()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    insert into public.order_events (order_id, from_status, to_status, actor_id, note)
    values (new.id, null, new.status, auth.uid(), 'Order created');
    return new;
  end if;

  if new.status is not distinct from old.status then
    return new;
  end if;

  if not public.order_transition_allowed(old.status, new.status) then
    raise exception 'Order % cannot move from % to %', old.order_no, old.status, new.status
      using errcode = 'check_violation';
  end if;

  if new.status = 'driver_assigned' and new.driver_id is null then
    raise exception 'Assign a driver before marking the order assigned' using errcode = 'check_violation';
  end if;

  if new.status = 'shopped' and not exists (
    select 1 from public.order_photos where order_id = new.id and kind = 'receipt'
  ) then
    raise exception 'Photograph the receipt before marking the order shopped' using errcode = 'check_violation';
  end if;

  if new.status = 'delivered' then
    if not exists (select 1 from public.order_photos where order_id = new.id and kind = 'door') then
      raise exception 'Take the door photo before marking the order delivered' using errcode = 'check_violation';
    end if;
    if coalesce(btrim(new.receiver_name), '') = '' then
      raise exception 'Record who received the order' using errcode = 'check_violation';
    end if;
    new.delivered_at := now();
  end if;

  if new.status = 'paid' then
    new.paid_at := coalesce(new.paid_at, now());
    new.payment_status := 'captured';
  end if;

  insert into public.order_events (order_id, from_status, to_status, actor_id)
  values (new.id, old.status, new.status, auth.uid());
  return new;
end $$;

drop trigger if exists orders_status_ins on public.orders;
create trigger orders_status_ins after insert on public.orders
  for each row execute function public.enforce_order_status();

drop trigger if exists orders_status_upd on public.orders;
create trigger orders_status_upd before update of status on public.orders
  for each row execute function public.enforce_order_status();
