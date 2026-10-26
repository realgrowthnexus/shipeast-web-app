import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Keeps the Supabase session fresh on the pages that read it, and sends signed-out visitors
 * from /account to sign in first. Pages still check the session themselves; this is the fast,
 * early check. Only the matched paths pay for it, so shop pages stay static and quick.
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const wantsAccount = request.nextUrl.pathname.startsWith('/account')

  // Preview site: the page verifies the signed cookie; here we only check it is there.
  if (!url || !anonKey) {
    if (wantsAccount && !request.cookies.has('se_demo_account')) return toSignIn(request)
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        for (const { name, value } of list) request.cookies.set(name, value)
        response = NextResponse.next({ request })
        for (const { name, value, options } of list) response.cookies.set(name, value, options)
      },
    },
  })

  // getUser() checks the token with Supabase and refreshes it when it is close to expiry.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (wantsAccount && !user) {
    const redirect = toSignIn(request)
    for (const cookie of response.cookies.getAll()) redirect.cookies.set(cookie)
    return redirect
  }
  return response
}

function toSignIn(request: NextRequest) {
  const target = request.nextUrl.clone()
  const next = request.nextUrl.pathname + request.nextUrl.search
  target.pathname = '/signin'
  target.search = next === '/account' ? '' : `?next=${encodeURIComponent(next)}`
  return NextResponse.redirect(target)
}

export const config = {
  matcher: [
    '/account/:path*',
    '/checkout/:path*',
    '/order/:path*',
    '/signin',
    '/signup',
    '/reset-password',
    '/verify-email',
  ],
}
