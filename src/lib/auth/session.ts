import 'server-only'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { cache } from 'react'
import type { Account } from '@/lib/account/types'
import { isDemoMode } from '@/lib/env'
import { supabaseServer } from '@/lib/supabase/server'
import { readDemoSession } from './demo'
import { withNext } from './redirect'

interface ProfileRow {
  id: string
  public_id: string
  role: Account['role']
  full_name: string
  email: string
  phone: string | null
  email_updates: boolean
  sms_updates: boolean
  created_at: string
}

/**
 * The signed-in sender, or null. Reads the session cookie, so callers sit behind
 * `<Suspense>`. Checked against Supabase Auth on every request, once per render.
 */
export const getAccount = cache(async (): Promise<Account | null> => {
  if (isDemoMode()) return (await readDemoSession())?.account ?? null

  // Supabase checks token expiry against the clock, so this always runs per request.
  await connection()
  const supabase = await supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('id, public_id, role, full_name, email, phone, email_updates, sms_updates, created_at')
    .eq('id', user.id)
    .maybeSingle<ProfileRow>()
  if (!data) return null
  return {
    id: data.id,
    publicId: data.public_id,
    role: data.role,
    fullName: data.full_name,
    email: user.email ?? data.email,
    phone: data.phone,
    emailUpdates: data.email_updates,
    smsUpdates: data.sms_updates,
    createdAt: data.created_at,
  }
})

/** The signed-in sender; anyone else is sent to sign in and brought back afterwards. */
export async function requireAccount(next: string): Promise<Account> {
  const account = await getAccount()
  if (!account) redirect(withNext('/signin', next))
  return account
}
