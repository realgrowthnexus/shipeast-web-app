import 'server-only'
import { cookies } from 'next/headers'
import type { Account, SavedAddress } from '@/lib/account/types'
import { demoAccount, demoAddresses } from '@/lib/demo/account'
import { cookieSecret } from '@/lib/secret'
import { signJson, verifyJson } from '@/lib/signed'

/**
 * Preview-site sessions. Without Supabase there is no real sign-in, so a signed cookie holds a
 * sample account and its addresses. Nothing here runs once the site is live.
 */

export const DEMO_SESSION_COOKIE = 'se_demo_account'
const ONE_DAY = 60 * 60 * 24
const MAX_ADDRESSES = 8

export interface DemoSession {
  account: Account
  addresses: SavedAddress[]
}

export async function readDemoSession(): Promise<DemoSession | null> {
  const value = (await cookies()).get(DEMO_SESSION_COOKIE)?.value
  const session = verifyJson(value, cookieSecret()) as DemoSession | null
  return session?.account ? session : null
}

export async function writeDemoSession(session: DemoSession) {
  ;(await cookies()).set(
    DEMO_SESSION_COOKIE,
    signJson({ ...session, addresses: session.addresses.slice(0, MAX_ADDRESSES) }, cookieSecret()),
    { httpOnly: true, sameSite: 'lax', path: '/', maxAge: ONE_DAY },
  )
}

export async function startDemoSession(details: { email: string; fullName?: string }) {
  await writeDemoSession({
    account: {
      ...demoAccount,
      email: details.email,
      fullName: details.fullName || demoAccount.fullName,
    },
    addresses: demoAddresses,
  })
}

export async function endDemoSession() {
  ;(await cookies()).delete(DEMO_SESSION_COOKIE)
}
