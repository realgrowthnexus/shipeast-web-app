/**
 * Demo mode: until Supabase is connected the app runs on seed data in `src/lib/demo/`, so every
 * page can be built and reviewed. Writes are disabled and a banner says so.
 */
export function isDemoMode(): boolean {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}
