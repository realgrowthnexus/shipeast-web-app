'use server'

import { redirect } from 'next/navigation'
import { readBasket, writeBasket } from '@/lib/basket/cookie'
import { addLine } from '@/lib/basket/state'
import {
  addressSchema,
  emailChangeSchema,
  fieldErrors,
  formValues,
  profileSchema,
  resetPasswordSchema,
  type FormState,
} from '@/lib/account/schemas'
import {
  deleteAccount,
  deleteAddress,
  getAddress,
  listOrders,
  reorderFor,
  saveAddress,
  updateProfile,
} from '@/lib/account/store'
import { isActive } from '@/lib/account/types'
import { endDemoSession, readDemoSession, writeDemoSession } from '@/lib/auth/demo'
import { confirmLink } from '@/lib/auth/origin'
import { requireAccount } from '@/lib/auth/session'
import { getActiveZones, getZones } from '@/lib/data/site'
import { isOrderNumber } from '@/lib/ids'
import { supabaseServer } from '@/lib/supabase/server'

/** My account changes. Each one checks who is signed in first; RLS checks again underneath. */

const ADDRESS_FIELDS = [
  'label',
  'recipientName',
  'phone',
  'street',
  'community',
  'parish',
  'landmark',
  'notes',
]

export async function saveAddressAction(_prev: FormState, form: FormData): Promise<FormState> {
  const account = await requireAccount('/account/addresses')
  const values = formValues(form, ADDRESS_FIELDS)
  const id = String(form.get('id') ?? '') || null
  const next = String(form.get('next') ?? '')

  const parsed = addressSchema.safeParse({ ...values, isDefault: form.get('isDefault') === 'on' })
  const errors = parsed.success ? {} : fieldErrors(parsed.error)
  const parishes = (await getActiveZones()).map((z) => z.parish)
  if (values.parish && !parishes.includes(values.parish)) {
    errors.parish = `We deliver to ${parishes.join(' and ')} for now.`
  }
  if (!parsed.success || errors.parish) return { status: 'error', errors, values }

  const saved = await saveAddress(account, id, parsed.data)
  if (!saved) {
    return {
      status: 'error',
      message: 'That address was removed. Go back to your addresses and try again.',
      errors: {},
      values,
    }
  }
  redirect(next === 'checkout' ? '/checkout' : '/account/addresses?saved=1')
}

export async function deleteAddressAction(form: FormData): Promise<void> {
  const account = await requireAccount('/account/addresses')
  const id = String(form.get('id') ?? '')
  if (await getAddress(account, id)) await deleteAddress(account, id)
  redirect('/account/addresses?deleted=1')
}

export async function makeDefaultAddressAction(form: FormData): Promise<void> {
  const account = await requireAccount('/account/addresses')
  const address = await getAddress(account, String(form.get('id') ?? ''))
  if (address) {
    const { id, ...data } = address
    await saveAddress(account, id, { ...data, isDefault: true })
  }
  redirect('/account/addresses')
}

/** Fills the basket with an earlier order's items and sends the sender to check it. */
export async function reorderAction(form: FormData): Promise<void> {
  const orderNo = String(form.get('orderNo') ?? '')
  const account = await requireAccount('/account/orders')
  if (!isOrderNumber(orderNo)) redirect('/account/orders')
  const found = await reorderFor(account, orderNo)
  if (!found?.lines.length) redirect(`/account/orders/${orderNo}?reorder=empty`)

  let basket = await readBasket()
  for (const line of found.lines) basket = addLine(basket, line)
  if (!basket.zoneId) {
    const zone = (await getZones()).find((z) => z.parish === found.parish && z.active)
    if (zone) basket = { ...basket, zoneId: zone.id }
  }
  await writeBasket(basket)
  redirect(`/basket?from=${orderNo}`)
}

export async function updateProfileAction(_prev: FormState, form: FormData): Promise<FormState> {
  const account = await requireAccount('/account/profile')
  const values = formValues(form, ['fullName', 'phone'])
  const parsed = profileSchema.safeParse({
    ...values,
    emailUpdates: form.get('emailUpdates') === 'on',
    smsUpdates: form.get('smsUpdates') === 'on',
  })
  if (!parsed.success) return { status: 'error', errors: fieldErrors(parsed.error), values }
  if (parsed.data.smsUpdates && !parsed.data.phone) {
    return {
      status: 'error',
      errors: { phone: 'Add your phone number to get texts.' },
      values,
    }
  }
  await updateProfile(account, parsed.data)
  return { status: 'ok', message: 'Saved.' }
}

export async function changeEmailAction(_prev: FormState, form: FormData): Promise<FormState> {
  const account = await requireAccount('/account/profile')
  const values = formValues(form, ['email'])
  const parsed = emailChangeSchema.safeParse(values)
  if (!parsed.success) return { status: 'error', errors: fieldErrors(parsed.error), values }
  if (parsed.data.email === account.email.toLowerCase()) {
    return { status: 'error', errors: { email: 'That’s already your email.' }, values }
  }

  if (account.preview) {
    const session = await readDemoSession()
    if (session) {
      await writeDemoSession({
        ...session,
        account: { ...session.account, email: parsed.data.email },
      })
    }
    return { status: 'ok', message: 'Email changed.' }
  }

  const supabase = await supabaseServer()
  const { error } = await supabase.auth.updateUser(
    { email: parsed.data.email },
    { emailRedirectTo: await confirmLink('/account/profile') },
  )
  if (error) {
    return {
      status: 'error',
      message:
        error.code === 'email_exists'
          ? 'Another account already uses that email.'
          : 'We couldn’t change your email just now. Please try again.',
      errors: {},
      values,
    }
  }
  return {
    status: 'ok',
    message: `Check ${parsed.data.email} for a link to confirm the change. Until then, keep using ${account.email}.`,
  }
}

export async function changePasswordAction(_prev: FormState, form: FormData): Promise<FormState> {
  const account = await requireAccount('/account/profile')
  const current = String(form.get('current') ?? '')
  const parsed = resetPasswordSchema.safeParse({
    password: form.get('password'),
    confirm: form.get('confirm'),
  })
  const errors = parsed.success ? {} : fieldErrors(parsed.error)
  if (!current) errors.current = 'Enter your current password.'
  if (Object.keys(errors).length) return { status: 'error', errors, values: {} }
  if (account.preview) return { status: 'ok', message: 'Password changed.' }

  const supabase = await supabaseServer()
  // Check the current password first, so a borrowed, signed-in phone can't lock the owner out.
  const check = await supabase.auth.signInWithPassword({ email: account.email, password: current })
  if (check.error) {
    return {
      status: 'error',
      errors: { current: 'That isn’t your current password.' },
      values: {},
    }
  }
  const { error } = await supabase.auth.updateUser({ password: parsed.data!.password })
  if (error) {
    return {
      status: 'error',
      message:
        error.code === 'same_password'
          ? 'That is your current password. Choose a new one.'
          : 'Choose a stronger password: longer, and not one used on other sites.',
      errors: {},
      values: {},
    }
  }
  return { status: 'ok', message: 'Password changed.' }
}

export async function deleteAccountAction(_prev: FormState, form: FormData): Promise<FormState> {
  const account = await requireAccount('/account/profile')
  if (form.get('confirm') !== 'on') {
    return {
      status: 'error',
      errors: { confirm: 'Tick the box to confirm you want to delete your account.' },
      values: {},
    }
  }
  if (account.role !== 'customer') {
    return {
      status: 'error',
      message: 'Staff and driver accounts are removed by a ShipEast admin.',
      errors: {},
      values: {},
    }
  }
  if ((await listOrders(account)).some((o) => isActive(o.status))) {
    return {
      status: 'error',
      message:
        'You have an order that isn’t finished yet. You can delete your account once it’s delivered.',
      errors: {},
      values: {},
    }
  }
  if (account.preview) {
    await endDemoSession()
  } else {
    await deleteAccount(account)
    // The user is gone, so only the cookies on this device need clearing.
    await (await supabaseServer()).auth.signOut({ scope: 'local' })
  }
  redirect('/account-deleted')
}
