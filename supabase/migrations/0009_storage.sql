-- 0009 Storage buckets for photos. Receipt and door photos are private and shown through
-- short-lived signed URLs created by server code.

insert into storage.buckets (id, name, public)
values
  ('products', 'products', true),
  ('site', 'site', true),
  ('receipts', 'receipts', false),
  ('door-photos', 'door-photos', false),
  ('driver-docs', 'driver-docs', false)
on conflict (id) do nothing;

-- Admins upload catalogue and site images.
drop policy if exists "public images: admin write" on storage.objects;
create policy "public images: admin write" on storage.objects for all to authenticated
  using (bucket_id in ('products', 'site') and public.is_admin())
  with check (bucket_id in ('products', 'site') and public.is_admin());

-- Drivers upload proof photos into a folder named after the order id: <order_id>/<file>.
drop policy if exists "proof photos: driver upload" on storage.objects;
create policy "proof photos: driver upload" on storage.objects for insert to authenticated
  with check (
    bucket_id in ('receipts', 'door-photos')
    and exists (
      select 1 from public.orders o
       where o.id::text = (storage.foldername(name))[1]
         and o.driver_id = auth.uid()
    )
  );

drop policy if exists "proof photos: read" on storage.objects;
create policy "proof photos: read" on storage.objects for select to authenticated
  using (
    bucket_id in ('receipts', 'door-photos')
    and public.can_see_order(((storage.foldername(name))[1])::uuid)
  );

drop policy if exists "driver docs: staff" on storage.objects;
create policy "driver docs: staff" on storage.objects for all to authenticated
  using (bucket_id = 'driver-docs' and public.is_staff())
  with check (bucket_id = 'driver-docs' and public.is_staff());
