-- 0011 Checkout: placing an order in one step, and bank transfer details.
--
-- create_order() prices the basket again from the database, so a sender can never pay a
-- price the site didn't show. The app passes the totals it showed; if anything differs (a
-- price changed, a parish closed, a promo ran out) the order is refused with a reason code
-- and the sender sees the basket again. Only server code (the service role) may call it.

create or replace function public.create_order(p jsonb)
returns table (order_no text, tracking_token text)
language plpgsql security definer set search_path = '' as $$
declare
  v_zone public.delivery_zones;
  v_promo public.promo_codes;
  v_line jsonb;
  v_qty int;
  v_unit int;
  v_name text;
  v_size text;
  v_subtotal int := 0;
  v_discount int := 0;
  v_total int;
  v_items jsonb := '[]'::jsonb;
  v_order_id uuid;
  v_sort int := 0;
  v_today date := (now() at time zone 'America/Jamaica')::date;
  v_email text := lower(btrim(p #>> '{sender,email}'));
begin
  if jsonb_array_length(coalesce(p -> 'lines', '[]'::jsonb)) = 0 then
    raise exception 'EMPTY' using errcode = 'P0001';
  end if;

  select * into v_zone from public.delivery_zones z
  where z.id = (p ->> 'zone_id')::uuid and z.active;
  if not found then
    raise exception 'ZONE_CLOSED' using errcode = 'P0001';
  end if;

  if (p ->> 'delivery_date')::date < v_today then
    raise exception 'DATE_PASSED' using errcode = 'P0001';
  end if;

  -- Price every line from the catalogue.
  for v_line in select * from jsonb_array_elements(p -> 'lines') loop
    v_qty := (v_line ->> 'quantity')::int;
    if v_qty is null or v_qty < 1 or v_qty > 20 then
      raise exception 'BAD_QUANTITY' using errcode = 'P0001';
    end if;

    if v_line ->> 'kind' = 'product' then
      select pr.price_cents, pr.name, pr.size into v_unit, v_name, v_size
      from public.products pr
      where pr.id = (v_line ->> 'id')::uuid and pr.status = 'visible';
    elsif v_line ->> 'kind' = 'basket' then
      select b.price_cents, b.name,
             'Ready-made basket, ' || (select sum(bi.quantity) from public.basket_items bi where bi.basket_id = b.id) || ' items'
      into v_unit, v_name, v_size
      from public.baskets b
      where b.id = (v_line ->> 'id')::uuid and b.status = 'visible'
        and not exists (
          select 1 from public.basket_items bi join public.products pr on pr.id = bi.product_id
          where bi.basket_id = b.id and pr.status <> 'visible'
        );
    else
      raise exception 'BAD_LINE' using errcode = 'P0001';
    end if;

    if v_unit is null then
      raise exception 'ITEM_UNAVAILABLE' using errcode = 'P0001';
    end if;

    v_subtotal := v_subtotal + v_unit * v_qty;
    v_items := v_items || jsonb_build_object(
      'kind', v_line ->> 'kind', 'id', v_line ->> 'id', 'name', v_name, 'size', v_size,
      'unit', v_unit, 'quantity', v_qty, 'sort', v_sort
    );
    v_sort := v_sort + 1;
    v_unit := null;
  end loop;

  if v_subtotal < v_zone.min_order_cents then
    raise exception 'BELOW_MINIMUM' using errcode = 'P0001';
  end if;

  -- Promo code: same rules as the basket page, plus usage limits that only the database knows.
  if coalesce(p ->> 'promo_code', '') <> '' then
    select * into v_promo from public.promo_codes pc
    where pc.code = upper(btrim(p ->> 'promo_code')) and pc.active
      and (pc.starts_at is null or pc.starts_at <= now())
      and (pc.ends_at is null or pc.ends_at > now())
    for update;
    if not found or v_subtotal < v_promo.min_order_cents then
      raise exception 'PROMO_INVALID' using errcode = 'P0001';
    end if;
    if v_promo.max_uses is not null
       and (select count(*) from public.promo_redemptions r where r.promo_code_id = v_promo.id) >= v_promo.max_uses then
      raise exception 'PROMO_USED_UP' using errcode = 'P0001';
    end if;
    if (select count(*) from public.promo_redemptions r
        where r.promo_code_id = v_promo.id and lower(r.sender_email) = v_email) >= v_promo.max_uses_per_customer then
      raise exception 'PROMO_ALREADY_USED' using errcode = 'P0001';
    end if;
    v_discount := least(
      v_subtotal,
      coalesce(round(v_subtotal * v_promo.percent_off / 100.0)::int, v_promo.amount_off_cents)
    );
  end if;

  v_total := v_subtotal - v_discount + v_zone.fee_cents;

  if (p #>> '{expect,subtotal_cents}')::int is distinct from v_subtotal
     or (p #>> '{expect,discount_cents}')::int is distinct from v_discount
     or (p #>> '{expect,delivery_fee_cents}')::int is distinct from v_zone.fee_cents
     or (p #>> '{expect,total_cents}')::int is distinct from v_total then
    raise exception 'PRICE_CHANGED' using errcode = 'P0001';
  end if;

  insert into public.orders (
    customer_id, sender_name, sender_email, sender_phone,
    recipient_name, recipient_phone, street, community, parish, landmark, delivery_notes,
    zone_id, delivery_date, substitution_rule, gift_message,
    subtotal_cents, delivery_fee_cents, discount_cents, total_cents, jmd_per_usd,
    promo_code_id, payment_method
  ) values (
    nullif(p ->> 'customer_id', '')::uuid,
    p #>> '{sender,name}', v_email, nullif(p #>> '{sender,phone}', ''),
    p #>> '{recipient,name}', p #>> '{recipient,phone}', p #>> '{recipient,street}',
    p #>> '{recipient,community}', v_zone.parish, coalesce(p #>> '{recipient,landmark}', ''),
    coalesce(p #>> '{recipient,notes}', ''),
    v_zone.id, (p ->> 'delivery_date')::date, (p ->> 'substitution_rule')::public.substitution_rule,
    nullif(p ->> 'gift_message', ''),
    v_subtotal, v_zone.fee_cents, v_discount, v_total, (p ->> 'jmd_per_usd')::numeric,
    v_promo.id, (p ->> 'payment_method')::public.payment_method
  )
  returning id into v_order_id;

  insert into public.order_items (order_id, product_id, basket_id, name, size, unit_price_cents, quantity, sort)
  select v_order_id,
         case when i ->> 'kind' = 'product' then (i ->> 'id')::uuid end,
         case when i ->> 'kind' = 'basket' then (i ->> 'id')::uuid end,
         i ->> 'name', i ->> 'size', (i ->> 'unit')::int, (i ->> 'quantity')::int, (i ->> 'sort')::int
  from jsonb_array_elements(v_items) i;

  if v_promo.id is not null then
    insert into public.promo_redemptions (promo_code_id, order_id, customer_id, sender_email)
    values (v_promo.id, v_order_id, nullif(p ->> 'customer_id', '')::uuid, v_email);
  end if;

  return query select o.order_no, o.tracking_token from public.orders o where o.id = v_order_id;
end $$;

revoke all on function public.create_order(jsonb) from public, anon, authenticated;
grant execute on function public.create_order(jsonb) to service_role;

-- Everything the sender's pages need about one order, found by its tracking token: the
-- confirmation, payment and tracking pages. Photo paths are signed into short-lived URLs by
-- server code. Service role only; the public tracking link goes through the app.
create or replace function public.order_for_sender(token text)
returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'order_no', o.order_no,
    'token', o.tracking_token,
    'status', o.status,
    'payment_method', o.payment_method,
    'payment_status', o.payment_status,
    'sender_email', o.sender_email,
    'recipient_name', o.recipient_name,
    'community', o.community,
    'parish', o.parish,
    'delivery_date', o.delivery_date,
    'substitution_rule', o.substitution_rule,
    'gift_message', o.gift_message,
    'subtotal_cents', o.subtotal_cents,
    'delivery_fee_cents', o.delivery_fee_cents,
    'discount_cents', o.discount_cents,
    'total_cents', o.total_cents,
    'jmd_per_usd', o.jmd_per_usd,
    'receipt_total_cents', o.receipt_total_cents,
    'receiver_name', o.receiver_name,
    'driver_first_name', nullif(split_part(p.full_name, ' ', 1), ''),
    'created_at', o.created_at,
    'paid_at', o.paid_at,
    'delivered_at', o.delivered_at,
    'items', coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', i.name, 'size', i.size, 'quantity', i.quantity, 'unit_price_cents', i.unit_price_cents,
        'outcome', i.outcome, 'substitute_note', i.substitute_note, 'refund_cents', i.refund_cents
      ) order by i.sort)
      from public.order_items i where i.order_id = o.id
    ), '[]'::jsonb),
    'events', coalesce((
      select jsonb_agg(jsonb_build_object('status', e.to_status, 'at', e.created_at) order by e.created_at, e.id)
      from public.order_events e where e.order_id = o.id
    ), '[]'::jsonb),
    'photos', coalesce((
      select jsonb_agg(jsonb_build_object('kind', ph.kind, 'path', ph.storage_path, 'at', ph.created_at) order by ph.created_at desc)
      from public.order_photos ph where ph.order_id = o.id
    ), '[]'::jsonb)
  )
  from public.orders o
  left join public.profiles p on p.id = o.driver_id
  where length(token) >= 32 and o.tracking_token = token
$$;

-- "Track an order" form: order number plus the sender's email gives back the tracking token.
create or replace function public.find_order_token(p_order_no text, p_email text)
returns text
language sql stable security definer set search_path = '' as $$
  select o.tracking_token from public.orders o
  where o.order_no = upper(btrim(p_order_no)) and o.sender_email = lower(btrim(p_email))
$$;

revoke all on function public.order_for_sender(text) from public, anon, authenticated;
revoke all on function public.find_order_token(text, text) from public, anon, authenticated;
grant execute on function public.order_for_sender(text) to service_role;
grant execute on function public.find_order_token(text, text) to service_role;

-- Records a payment result from PayPal (the capture call or its webhook) or a bank transfer
-- confirmed by staff. Safe to call twice for the same provider reference. A capture only marks
-- the order paid when the amount matches the order total exactly.
create or replace function public.record_payment(
  p_order_no text,
  p_provider text,
  p_provider_ref text,
  p_amount_cents int,
  p_status public.payment_status,
  p_raw jsonb default null
)
returns public.order_status
language plpgsql security definer set search_path = '' as $$
declare
  v_order public.orders;
begin
  select * into v_order from public.orders o where o.order_no = p_order_no for update;
  if not found then
    raise exception 'ORDER_NOT_FOUND' using errcode = 'P0001';
  end if;

  insert into public.payments (order_id, provider, provider_ref, amount_cents, status, raw)
  values (v_order.id, p_provider, p_provider_ref, p_amount_cents, p_status, p_raw)
  on conflict (provider, provider_ref) do update
    set status = excluded.status, raw = coalesce(excluded.raw, public.payments.raw);

  if p_status = 'captured' and v_order.status in ('awaiting_payment', 'payment_failed') then
    if p_amount_cents <> v_order.total_cents then
      insert into public.admin_alerts (kind, order_id, message)
      values ('payment_mismatch', v_order.id,
              format('Payment %s for %s was %s cents; the order total is %s cents.',
                     p_provider_ref, v_order.order_no, p_amount_cents, v_order.total_cents));
      return v_order.status;
    end if;
    update public.orders set status = 'paid' where id = v_order.id;
    return 'paid';
  elsif p_status = 'failed' and v_order.status = 'awaiting_payment' then
    update public.orders set status = 'payment_failed', payment_status = 'failed' where id = v_order.id;
    return 'payment_failed';
  end if;
  return v_order.status;
end $$;

-- Lets the sender switch an unpaid order to another payment method (e.g. after a card is
-- declined). The tracking token proves it's their order.
create or replace function public.change_payment_method(p_token text, p_method public.payment_method)
returns public.order_status
language plpgsql security definer set search_path = '' as $$
declare
  v_order public.orders;
begin
  select * into v_order from public.orders o where o.tracking_token = p_token and length(p_token) >= 32 for update;
  if not found or v_order.status not in ('awaiting_payment', 'payment_failed') then
    raise exception 'NOT_CHANGEABLE' using errcode = 'P0001';
  end if;
  update public.orders
     set payment_method = p_method,
         status = case when v_order.status = 'payment_failed' then 'awaiting_payment'::public.order_status else v_order.status end,
         payment_status = 'pending'
   where id = v_order.id;
  return 'awaiting_payment';
end $$;

revoke all on function public.record_payment(text, text, text, int, public.payment_status, jsonb) from public, anon, authenticated;
revoke all on function public.change_payment_method(text, public.payment_method) from public, anon, authenticated;
grant execute on function public.record_payment(text, text, text, int, public.payment_status, jsonb) to service_role;
grant execute on function public.change_payment_method(text, public.payment_method) to service_role;

-- Bank details shown on the bank transfer page. Fill these in from the admin panel (or here)
-- once ShipEast confirms the account. Empty values keep bank transfer hidden at checkout.
insert into public.settings (key, value) values
  ('bank_transfer', '{"bank_name": "", "account_name": "", "account_number": "", "branch": "", "account_type": "", "currency": "USD", "notes": ""}')
on conflict (key) do update set value = excluded.value
  where public.settings.value = '{"instructions": ""}'::jsonb;
