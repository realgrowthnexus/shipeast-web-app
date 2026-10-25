-- 0007 Functions the app calls. Each checks who is calling, so they are safe to expose.

-- No-login tracking: returns one order by its tracking token, without sender contact details.
create or replace function public.get_order_by_token(token text)
returns table (
  order_no text,
  status public.order_status,
  recipient_name text,
  parish text,
  delivery_date date,
  substitution_rule public.substitution_rule,
  gift_message text,
  total_cents int,
  driver_first_name text,
  receiver_name text,
  created_at timestamptz,
  paid_at timestamptz,
  delivered_at timestamptz,
  items jsonb,
  events jsonb
)
language sql stable security definer set search_path = '' as $$
  select
    o.order_no, o.status, o.recipient_name, o.parish, o.delivery_date, o.substitution_rule,
    o.gift_message, o.total_cents,
    split_part(p.full_name, ' ', 1),
    o.receiver_name, o.created_at, o.paid_at, o.delivered_at,
    coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', i.name, 'size', i.size, 'quantity', i.quantity,
        'outcome', i.outcome, 'substitute_note', i.substitute_note
      ) order by i.sort)
      from public.order_items i where i.order_id = o.id
    ), '[]'::jsonb),
    coalesce((
      select jsonb_agg(jsonb_build_object('status', e.to_status, 'at', e.created_at) order by e.created_at)
      from public.order_events e where e.order_id = o.id
    ), '[]'::jsonb)
  from public.orders o
  left join public.profiles p on p.id = o.driver_id
  where length(token) >= 32 and o.tracking_token = token
$$;

-- Driver moves their own order one step. The status trigger enforces the order of steps.
create or replace function public.driver_advance_order(
  p_order_id uuid,
  p_to public.order_status,
  p_receipt_total_cents int default null,
  p_receiver_name text default null,
  p_note text default null
)
returns public.order_status
language plpgsql security definer set search_path = '' as $$
declare
  result public.order_status;
begin
  if public.current_app_role() <> 'driver' then
    raise exception 'Only drivers can do this' using errcode = 'insufficient_privilege';
  end if;
  if p_to not in ('shopping', 'shopped', 'out_for_delivery', 'delivered', 'failed_delivery') then
    raise exception 'Drivers cannot set %', p_to using errcode = 'insufficient_privilege';
  end if;

  update public.orders
     set status = p_to,
         receipt_total_cents = coalesce(p_receipt_total_cents, receipt_total_cents),
         receiver_name = coalesce(nullif(btrim(p_receiver_name), ''), receiver_name),
         failure_reason = case when p_to = 'failed_delivery' then p_note else failure_reason end
   where id = p_order_id and driver_id = auth.uid()
  returning status into result;

  if result is null then
    raise exception 'Order not found or not assigned to you' using errcode = 'no_data_found';
  end if;
  return result;
end $$;

-- Driver ticks an item off in shopping mode, or flags it missing or substituted.
create or replace function public.driver_mark_item(
  p_item_id uuid,
  p_outcome public.item_outcome,
  p_note text default null
)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  if public.current_app_role() <> 'driver' then
    raise exception 'Only drivers can do this' using errcode = 'insufficient_privilege';
  end if;

  update public.order_items i
     set outcome = p_outcome, substitute_note = p_note
    from public.orders o
   where i.id = p_item_id and o.id = i.order_id
     and o.driver_id = auth.uid() and o.status = 'shopping';

  if not found then
    raise exception 'Item not found, or the order is not in shopping mode' using errcode = 'no_data_found';
  end if;
end $$;

-- Driver reports that the shelf price differs from ours, so admin can re-check it.
create or replace function public.driver_flag_price(p_product_id uuid, p_note text)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  if public.current_app_role() <> 'driver' then
    raise exception 'Only drivers can do this' using errcode = 'insufficient_privilege';
  end if;
  update public.products set price_flagged = true, price_flag_note = p_note where id = p_product_id;
end $$;

revoke all on function public.driver_advance_order(uuid, public.order_status, int, text, text) from public, anon;
revoke all on function public.driver_mark_item(uuid, public.item_outcome, text) from public, anon;
revoke all on function public.driver_flag_price(uuid, text) from public, anon;
grant execute on function public.driver_advance_order(uuid, public.order_status, int, text, text) to authenticated;
grant execute on function public.driver_mark_item(uuid, public.item_outcome, text) to authenticated;
grant execute on function public.driver_flag_price(uuid, text) to authenticated;
grant execute on function public.get_order_by_token(text) to anon, authenticated;
