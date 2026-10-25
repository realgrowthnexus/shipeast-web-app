import 'server-only'
import { z } from 'zod'

/** Browser calls to the payment routes must come from our own pages. */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  return !origin || origin === new URL(request.url).origin
}

export async function readToken(request: Request): Promise<string | null> {
  const body = await request.json().catch(() => null)
  const parsed = z.object({ token: z.string().min(8).max(128) }).safeParse(body)
  return parsed.success ? parsed.data.token : null
}
