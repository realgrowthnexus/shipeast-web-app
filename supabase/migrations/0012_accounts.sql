-- 0012 Sender accounts: link guest orders, keep the profile email in step with sign-in, and
-- limit what a sender can change on their own profile. Safe to run again.

-- Attaches guest orders placed with the signed-in sender's email to their account. Only once
-- the email is confirmed, so nobody can claim someone else's orders by signing up with their
-- address. Called after sign-in and after the email link is opened. Returns the number linked.
create or replace function public.link_guest_orders()
returns int language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
  verified_email text;
  linked int;
begin
  if uid is null then
    return 0;
  end if;
  select lower(u.email) into verified_email
    from auth.users u
   where u.id = uid and u.email_confirmed_at is not null;
  if verified_email is null or verified_email = '' then
    return 0;
  end if;
  update public.orders o
     set customer_id = uid
   where o.customer_id is null
     and lower(o.sender_email) = verified_email;
  get diagnostics linked = row_count;
  return linked;
end $$;

revoke all on function public.link_guest_orders() from public, anon;
grant execute on function public.link_guest_orders() to authenticated;

-- Finds guest orders by email quickly.
create index if not exists orders_guest_email_idx
  on public.orders (lower(sender_email)) where customer_id is null;

-- When a sender confirms a new email, the profile follows (receipts and admin search use it).
create or replace function public.handle_user_email_change()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  update public.profiles set email = coalesce(new.email, '') where id = new.id;
  return new;
end $$;

drop trigger if exists on_auth_user_email_changed on auth.users;
create trigger on_auth_user_email_changed after update of email on auth.users
  for each row when (old.email is distinct from new.email)
  execute function public.handle_user_email_change();

-- A sender may change their name, phone and message choices, nothing else. Role and public id
-- were already guarded; email now only changes through a confirmed sign-in change (above).
-- Admin edits go through server code with the service role key, which these grants don't limit.
revoke update on public.profiles from authenticated;
grant update (full_name, phone, email_updates, sms_updates) on public.profiles to authenticated;

-- Saved addresses: a sensible cap per sender, so the table can't be filled up by one account.
create or replace function public.limit_addresses()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if (select count(*) from public.addresses where owner_id = new.owner_id) >= 20 then
    raise exception 'ADDRESS_LIMIT';
  end if;
  return new;
end $$;

drop trigger if exists addresses_limit on public.addresses;
create trigger addresses_limit before insert on public.addresses
  for each row execute function public.limit_addresses();
