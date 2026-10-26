import 'server-only'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Client that acts as the signed-in user, from their session cookies. Row-level security
 * decides what it can read and change, so account pages use this one, never the admin client.
 */
export async function supabaseServer() {
  const jar = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => jar.getAll(),
        setAll: (list) => {
          try {
            for (const { name, value, options } of list) jar.set(name, value, options)
          } catch {
            // Server Components can't set cookies. The proxy refreshes the session instead.
          }
        },
      },
    },
  )
}
