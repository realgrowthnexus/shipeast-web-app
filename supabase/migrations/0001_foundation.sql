-- 0001 Foundation: extensions, enums and shared helper functions.
-- Safe to run more than once.

create extension if not exists pgcrypto with schema extensions;

do $$ begin
  create type public.app_role as enum ('customer', 'driver', 'staff', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.product_status as enum ('visible', 'hidden', 'out_of_stock');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.substitution_rule as enum ('allow_similar', 'ask_first', 'leave_out');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_method as enum ('paypal', 'card', 'bank_transfer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_status as enum ('pending', 'captured', 'failed', 'refunded', 'partially_refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.delivery_speed as enum ('same_day', 'next_day', 'scheduled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.order_status as enum (
    'awaiting_payment', 'payment_failed', 'paid', 'confirmed', 'awaiting_driver',
    'driver_assigned', 'shopping', 'shopped', 'out_for_delivery', 'delivered', 'closed',
    'cancelled', 'failed_delivery', 'refunded'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.item_outcome as enum ('pending', 'found', 'substituted', 'missing');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.photo_kind as enum ('receipt', 'door');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.driver_status as enum ('available', 'on_delivery', 'offline');
exception when duplicate_object then null; end $$;

-- Keeps updated_at current on every table that has one.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- Random code from the Crockford alphabet without I, L, O and U (matches src/lib/ids.ts).
create or replace function public.random_code(len int default 6)
returns text language plpgsql volatile as $$
declare
  alphabet constant text := '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  bytes bytea := extensions.gen_random_bytes(len);
  out text := '';
begin
  for i in 0 .. len - 1 loop
    out := out || substr(alphabet, (get_byte(bytes, i) % 32) + 1, 1);
  end loop;
  return out;
end $$;
