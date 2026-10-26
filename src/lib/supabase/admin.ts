import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-only client with the service role key. It bypasses row-level security, so it is only
 * used for reads that must stay private (promo codes, bank details) and for writes that go
 * through checked database functions (placing an order).
 */
let client: SupabaseClient | null = null

export function supabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set.')
  client ??= createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  return client
}

/** Public URL for a file in a public bucket (product and basket photos). */
export function publicImageUrl(bucket: string, path: string | null): string | null {
  if (!path) return null
  if (/^https?:\/\//.test(path)) return path
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}
