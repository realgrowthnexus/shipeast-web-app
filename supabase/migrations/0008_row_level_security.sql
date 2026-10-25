-- 0008 Row Level Security. Every table is locked down; these policies open exactly what each
-- role needs. Server code that uses the service role key (checkout, webhooks, cron) bypasses
-- RLS and must do its own checks.

-- Can the signed-in user see this order? Sender who owns it, its assigned driver, or staff.
create or replace function public.can_see_order(p_order_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select public.is_staff() or exists (
    select 1 from public.orders o
     where o.id = p_order_id
       and (o.customer_id = auth.uid() or o.driver_id = auth.uid())
  )
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'profiles', 'addresses', 'categories', 'products', 'baskets', 'basket_items',
    'delivery_zones', 'promo_codes', 'drivers', 'orders', 'order_items', 'order_events',
    'payments', 'order_photos', 'promo_redemptions', 'cart_items', 'settings', 'faqs',
    'legal_pages', 'site_content', 'contact_messages', 'notifications_log', 'admin_alerts'
  ] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

-- Profiles
drop policy if exists "profiles: read own or staff" on public.profiles;
create policy "profiles: read own or staff" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_staff());

drop policy if exists "profiles: update own or admin" on public.profiles;
create policy "profiles: update own or admin" on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- Saved family addresses
drop policy if exists "addresses: owner" on public.addresses;
create policy "addresses: owner" on public.addresses for all to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());

drop policy if exists "addresses: staff read" on public.addresses;
create policy "addresses: staff read" on public.addresses for select to authenticated
  using (public.is_staff());

-- Catalogue: everyone reads what's on sale; staff read everything; admins edit.
drop policy if exists "categories: public read" on public.categories;
create policy "categories: public read" on public.categories for select to anon, authenticated
  using (visible or public.is_staff());

drop policy if exists "products: public read" on public.products;
create policy "products: public read" on public.products for select to anon, authenticated
  using (status <> 'hidden' or public.is_staff());

drop policy if exists "baskets: public read" on public.baskets;
create policy "baskets: public read" on public.baskets for select to anon, authenticated
  using (status <> 'hidden' or public.is_staff());

drop policy if exists "basket_items: public read" on public.basket_items;
create policy "basket_items: public read" on public.basket_items for select to anon, authenticated
  using (true);

drop policy if exists "delivery_zones: public read" on public.delivery_zones;
create policy "delivery_zones: public read" on public.delivery_zones for select to anon, authenticated
  using (true);

do $$
declare t text;
begin
  foreach t in array array['categories', 'products', 'baskets', 'basket_items', 'delivery_zones', 'promo_codes'] loop
    execute format('drop policy if exists "%s: admin write" on public.%I', t, t);
    execute format(
      'create policy "%s: admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      t, t
    );
  end loop;
end $$;

-- Drivers: a driver reads their own row and flips their online status; staff manage drivers.
drop policy if exists "drivers: own or staff read" on public.drivers;
create policy "drivers: own or staff read" on public.drivers for select to authenticated
  using (id = auth.uid() or public.is_staff());

drop policy if exists "drivers: own status" on public.drivers;
create policy "drivers: own status" on public.drivers for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "drivers: staff write" on public.drivers;
create policy "drivers: staff write" on public.drivers for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- Drivers may only change their status column directly. Staff edits go through the admin
-- server code (service role).
revoke update on public.drivers from authenticated;
grant update (status) on public.drivers to authenticated;

-- Orders: senders read their own, drivers read assigned ones, staff read and manage all.
-- Orders are created only by server code, so there is no insert policy.
drop policy if exists "orders: read" on public.orders;
create policy "orders: read" on public.orders for select to authenticated
  using (customer_id = auth.uid() or driver_id = auth.uid() or public.is_staff());

drop policy if exists "orders: staff update" on public.orders;
create policy "orders: staff update" on public.orders for update to authenticated
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "order_items: read" on public.order_items;
create policy "order_items: read" on public.order_items for select to authenticated
  using (public.can_see_order(order_id));

drop policy if exists "order_items: staff update" on public.order_items;
create policy "order_items: staff update" on public.order_items for update to authenticated
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "order_events: read" on public.order_events;
create policy "order_events: read" on public.order_events for select to authenticated
  using (public.can_see_order(order_id));

drop policy if exists "order_photos: read" on public.order_photos;
create policy "order_photos: read" on public.order_photos for select to authenticated
  using (public.can_see_order(order_id));

drop policy if exists "order_photos: driver adds" on public.order_photos;
create policy "order_photos: driver adds" on public.order_photos for insert to authenticated
  with check (
    taken_by = auth.uid()
    and exists (
      select 1 from public.orders o
       where o.id = order_id and o.driver_id = auth.uid()
         and o.status in ('shopping', 'shopped', 'out_for_delivery')
    )
  );

drop policy if exists "payments: staff read" on public.payments;
create policy "payments: staff read" on public.payments for select to authenticated
  using (public.is_staff());

drop policy if exists "promo_redemptions: admin read" on public.promo_redemptions;
create policy "promo_redemptions: admin read" on public.promo_redemptions for select to authenticated
  using (public.is_admin());

drop policy if exists "cart_items: owner" on public.cart_items;
create policy "cart_items: owner" on public.cart_items for all to authenticated
  using (customer_id = auth.uid()) with check (customer_id = auth.uid());

-- Settings and content
drop policy if exists "settings: public keys" on public.settings;
create policy "settings: public keys" on public.settings for select to anon, authenticated
  using (public.is_public_setting(key) or public.is_staff());

drop policy if exists "settings: admin write" on public.settings;
create policy "settings: admin write" on public.settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "faqs: public read" on public.faqs;
create policy "faqs: public read" on public.faqs for select to anon, authenticated
  using (visible or public.is_staff());

do $$
declare t text;
begin
  foreach t in array array['faqs', 'legal_pages', 'site_content'] loop
    execute format('drop policy if exists "%s: admin write" on public.%I', t, t);
    execute format(
      'create policy "%s: admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      t, t
    );
  end loop;
end $$;

drop policy if exists "legal_pages: public read" on public.legal_pages;
create policy "legal_pages: public read" on public.legal_pages for select to anon, authenticated
  using (true);

drop policy if exists "site_content: public read" on public.site_content;
create policy "site_content: public read" on public.site_content for select to anon, authenticated
  using (true);

-- Inbox and operations: staff only. Contact messages arrive through server code.
do $$
declare t text;
begin
  foreach t in array array['contact_messages', 'admin_alerts'] loop
    execute format('drop policy if exists "%s: staff" on public.%I', t, t);
    execute format(
      'create policy "%s: staff" on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())',
      t, t
    );
  end loop;
end $$;

drop policy if exists "notifications_log: staff read" on public.notifications_log;
create policy "notifications_log: staff read" on public.notifications_log for select to authenticated
  using (public.is_staff());
