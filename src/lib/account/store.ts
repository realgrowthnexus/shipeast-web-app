import 'server-only'
import type { BasketLine } from '@/lib/basket/state'
import { getCatalogue } from '@/lib/data/catalogue'
import { demoOrders } from '@/lib/demo/orders'
import { readDemoSession, writeDemoSession } from '@/lib/auth/demo'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { supabaseServer } from '@/lib/supabase/server'
import type { AddressData } from './schemas'
import type { Account, AccountOrder, SavedAddress } from './types'

/**
 * Everything My account reads and changes. Live, it goes through the signed-in user's own
 * Supabase client, so row-level security keeps each sender to their own orders and addresses.
 * On the preview site it reads the sample orders and the addresses in the demo cookie.
 */

const fail = (what: string, error: { message: string }) => {
  throw new Error(`${what} failed: ${error.message}`)
}

// Orders ---------------------------------------------------------------------------------------

interface OrderListRow {
  order_no: string
  tracking_token: string
  status: AccountOrder['status']
  created_at: string
  delivery_date: string
  recipient_name: string
  community: string
  parish: string
  total_cents: number
  order_items: { name: string; quantity: number; sort: number }[]
}

export async function listOrders(account: Account): Promise<AccountOrder[]> {
  if (account.preview) {
    return demoOrders.map((o) => ({
      orderNo: o.orderNo,
      token: o.token,
      status: o.status,
      createdAt: o.createdAt,
      deliveryDate: o.deliveryDate,
      recipientName: o.recipientName,
      community: o.community,
      parish: o.parish,
      totalCents: o.totalCents,
      itemCount: o.items.reduce((n, i) => n + i.quantity, 0),
      itemNames: o.items.map((i) => i.name),
    }))
  }
  const { data, error } = await (
    await supabaseServer()
  )
    .from('orders')
    .select(
      'order_no, tracking_token, status, created_at, delivery_date, recipient_name, community, parish, total_cents, order_items(name, quantity, sort)',
    )
    .eq('customer_id', account.id)
    .order('created_at', { ascending: false })
    .limit(200)
    .returns<OrderListRow[]>()
  if (error) fail('listOrders', error)
  return (data ?? []).map((o) => {
    const items = [...o.order_items].sort((a, b) => a.sort - b.sort)
    return {
      orderNo: o.order_no,
      token: o.tracking_token,
      status: o.status,
      createdAt: o.created_at,
      deliveryDate: o.delivery_date,
      recipientName: o.recipient_name,
      community: o.community,
      parish: o.parish,
      totalCents: o.total_cents,
      itemCount: items.reduce((n, i) => n + i.quantity, 0),
      itemNames: items.map((i) => i.name),
    }
  })
}

/** The tracking token of one of the sender's own orders, or null if it isn't theirs. */
export async function orderTokenFor(account: Account, orderNo: string): Promise<string | null> {
  if (account.preview) return demoOrders.find((o) => o.orderNo === orderNo)?.token ?? null
  const { data, error } = await (
    await supabaseServer()
  )
    .from('orders')
    .select('tracking_token')
    .eq('customer_id', account.id)
    .eq('order_no', orderNo)
    .maybeSingle<{ tracking_token: string }>()
  if (error) fail('orderTokenFor', error)
  return data?.tracking_token ?? null
}

/**
 * Basket lines to send an order again, and the parish it went to. Items since removed from the
 * shop are skipped; the basket page reprices everything and flags anything now out of stock.
 */
export async function reorderFor(
  account: Account,
  orderNo: string,
): Promise<{ lines: BasketLine[]; parish: string } | null> {
  if (account.preview) {
    const order = demoOrders.find((o) => o.orderNo === orderNo)
    if (!order) return null
    const { products } = await getCatalogue()
    const lines = order.items.flatMap((item) => {
      const product = products.find((p) => p.name === item.name)
      return product ? [{ kind: 'product' as const, id: product.id, quantity: item.quantity }] : []
    })
    return { lines, parish: order.parish }
  }
  const { data, error } = await (
    await supabaseServer()
  )
    .from('order_items')
    .select('product_id, basket_id, quantity, sort, orders!inner(order_no, customer_id, parish)')
    .eq('orders.order_no', orderNo)
    .eq('orders.customer_id', account.id)
    .order('sort')
    .returns<
      {
        product_id: string | null
        basket_id: string | null
        quantity: number
        orders: { parish: string }
      }[]
    >()
  if (error) fail('reorderFor', error)
  if (!data?.length) return null
  const lines = data.flatMap((row): BasketLine[] => {
    if (row.basket_id) return [{ kind: 'basket', id: row.basket_id, quantity: row.quantity }]
    if (row.product_id) return [{ kind: 'product', id: row.product_id, quantity: row.quantity }]
    return []
  })
  return { lines, parish: data[0].orders.parish }
}

/**
 * Attaches orders placed as a guest with this account's email. The database only does it once
 * the email is verified, so nobody can claim someone else's orders by signing up with their
 * address. Returns how many orders were linked.
 */
export async function linkGuestOrders(): Promise<number> {
  const { data, error } = await (await supabaseServer()).rpc('link_guest_orders')
  if (error) {
    console.error('link_guest_orders failed', error)
    return 0
  }
  return Number(data ?? 0)
}

// Addresses ------------------------------------------------------------------------------------

interface AddressRow {
  id: string
  label: string
  recipient_name: string
  phone: string
  street: string
  community: string
  parish: string
  landmark: string
  notes: string
  is_default: boolean
}

const toAddress = (r: AddressRow): SavedAddress => ({
  id: r.id,
  label: r.label,
  recipientName: r.recipient_name,
  phone: r.phone,
  street: r.street,
  community: r.community,
  parish: r.parish,
  landmark: r.landmark,
  notes: r.notes,
  isDefault: r.is_default,
})

const toRow = (a: AddressData) => ({
  label: a.label,
  recipient_name: a.recipientName,
  phone: a.phone,
  street: a.street,
  community: a.community,
  parish: a.parish,
  landmark: a.landmark,
  notes: a.notes,
  is_default: a.isDefault,
})

/** Default first, then by label. */
const byDefault = (a: SavedAddress, b: SavedAddress) =>
  Number(b.isDefault) - Number(a.isDefault) || addressSort(a).localeCompare(addressSort(b))
const addressSort = (a: SavedAddress) => a.label || a.recipientName

export async function listAddresses(account: Account): Promise<SavedAddress[]> {
  if (account.preview) return [...((await readDemoSession())?.addresses ?? [])].sort(byDefault)
  const { data, error } = await (
    await supabaseServer()
  )
    .from('addresses')
    .select(
      'id, label, recipient_name, phone, street, community, parish, landmark, notes, is_default',
    )
    .eq('owner_id', account.id)
    .returns<AddressRow[]>()
  if (error) fail('listAddresses', error)
  return (data ?? []).map(toAddress).sort(byDefault)
}

export async function getAddress(account: Account, id: string): Promise<SavedAddress | null> {
  return (await listAddresses(account)).find((a) => a.id === id) ?? null
}

/** Creates (id null) or updates an address. Making one the default clears the old default. */
export async function saveAddress(
  account: Account,
  id: string | null,
  input: AddressData,
): Promise<SavedAddress | null> {
  if (account.preview) return saveDemoAddress(id, input)

  const db = await supabaseServer()
  const existing = await listAddresses(account)
  // The first address is always the default, so checkout has one to start from.
  const data = { ...input, isDefault: input.isDefault || existing.length === 0 }
  if (id && !existing.some((a) => a.id === id)) return null

  // Only one default per sender (a unique index enforces it), so clear the old one first.
  if (data.isDefault) {
    const { error } = await db
      .from('addresses')
      .update({ is_default: false })
      .eq('owner_id', account.id)
      .eq('is_default', true)
      .neq('id', id ?? '00000000-0000-0000-0000-000000000000')
    if (error) fail('saveAddress', error)
  }
  const query = id
    ? db.from('addresses').update(toRow(data)).eq('id', id).eq('owner_id', account.id)
    : db.from('addresses').insert({ ...toRow(data), owner_id: account.id })
  const { data: row, error } = await query
    .select(
      'id, label, recipient_name, phone, street, community, parish, landmark, notes, is_default',
    )
    .single<AddressRow>()
  if (error) fail('saveAddress', error)
  return row ? toAddress(row) : null
}

export async function deleteAddress(account: Account, id: string): Promise<void> {
  if (account.preview) {
    const session = await readDemoSession()
    if (!session) return
    const addresses = session.addresses.filter((a) => a.id !== id)
    if (addresses.length && !addresses.some((a) => a.isDefault)) addresses[0].isDefault = true
    await writeDemoSession({ ...session, addresses })
    return
  }
  const db = await supabaseServer()
  const { data: removed, error } = await db
    .from('addresses')
    .delete()
    .eq('id', id)
    .eq('owner_id', account.id)
    .select('is_default')
    .maybeSingle<{ is_default: boolean }>()
  if (error) fail('deleteAddress', error)
  // Keep a default when the old default goes, so checkout always has one to start from.
  if (removed?.is_default) {
    const next = (await listAddresses(account))[0]
    if (next) await db.from('addresses').update({ is_default: true }).eq('id', next.id)
  }
}

async function saveDemoAddress(id: string | null, input: AddressData) {
  const session = await readDemoSession()
  if (!session) return null
  if (id && !session.addresses.some((a) => a.id === id)) return null
  const saved: SavedAddress = {
    ...input,
    id: id ?? `demo-address-${Date.now().toString(36)}`,
    isDefault: input.isDefault || session.addresses.length === 0,
  }
  const others = session.addresses
    .filter((a) => a.id !== saved.id)
    .map((a) => (saved.isDefault ? { ...a, isDefault: false } : a))
  await writeDemoSession({ ...session, addresses: [...others, saved] })
  return saved
}

// Profile --------------------------------------------------------------------------------------

export async function updateProfile(
  account: Account,
  patch: Pick<Account, 'fullName' | 'phone' | 'emailUpdates' | 'smsUpdates'>,
): Promise<void> {
  if (account.preview) {
    const session = await readDemoSession()
    if (session) await writeDemoSession({ ...session, account: { ...session.account, ...patch } })
    return
  }
  const { error } = await (
    await supabaseServer()
  )
    .from('profiles')
    .update({
      full_name: patch.fullName,
      phone: patch.phone,
      email_updates: patch.emailUpdates,
      sms_updates: patch.smsUpdates,
    })
    .eq('id', account.id)
  if (error) fail('updateProfile', error)
}

/**
 * Deletes the sign-in and profile. Saved addresses go with it; past orders stay for the
 * business records (and any open delivery) but are no longer tied to a person's account.
 */
export async function deleteAccount(account: Account): Promise<void> {
  if (account.preview) return
  const { error } = await supabaseAdmin().auth.admin.deleteUser(account.id)
  if (error) fail('deleteAccount', error)
}
