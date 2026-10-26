import type { EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { linkGuestOrders } from '@/lib/account/store'
import { safeNext } from '@/lib/auth/redirect'
import { isDemoMode } from '@/lib/env'
import { supabaseServer } from '@/lib/supabase/server'

/**
 * Where the links in ShipEast's emails land: confirm an email address, reset a password or
 * confirm a new email. Signs the person in, links any guest orders, and sends them on.
 * Handles both link styles Supabase can send: `token_hash` (works on any device) and `code`.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const next = safeNext(params.get('next'))
  if (isDemoMode()) return NextResponse.redirect(new URL(next, request.url))

  const tokenHash = params.get('token_hash')
  const type = params.get('type') as EmailOtpType | null
  const code = params.get('code')

  const supabase = await supabaseServer()
  let ok = false
  if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ type, token_hash: tokenHash })).error
  } else if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error
  }

  if (!ok) {
    const retry = type === 'recovery' || next === '/reset-password' ? '/forgot-password' : '/signin'
    return NextResponse.redirect(new URL(`${retry}?link=expired`, request.url))
  }

  await linkGuestOrders()
  const target = new URL(next, request.url)
  if (next === '/account' && (type === 'signup' || type === 'email' || code)) {
    target.search = 'welcome=1'
  }
  return NextResponse.redirect(target)
}
