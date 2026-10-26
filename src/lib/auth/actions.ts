'use server'

import { redirect } from 'next/navigation'
import { linkGuestOrders } from '@/lib/account/store'
import {
  fieldErrors,
  forgotPasswordSchema,
  formValues,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  type FormState,
} from '@/lib/account/schemas'
import { isDemoMode } from '@/lib/env'
import { supabaseServer } from '@/lib/supabase/server'
import { endDemoSession, startDemoSession } from './demo'
import { confirmLink } from './origin'
import { safeNext } from './redirect'

/** Sign in, sign up, password reset and sign out. Every input is checked here, on the server. */

export async function signInAction(_prev: FormState, form: FormData): Promise<FormState> {
  const values = formValues(form, ['email'])
  const next = safeNext(form.get('next'))
  const parsed = signInSchema.safeParse({
    email: form.get('email'),
    password: form.get('password'),
  })
  if (!parsed.success) {
    return { status: 'error', errors: fieldErrors(parsed.error), values }
  }

  if (isDemoMode()) {
    await startDemoSession({ email: parsed.data.email })
    redirect(next)
  }

  const supabase = await supabaseServer()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)
  if (error) {
    if (error.code === 'email_not_confirmed') {
      redirect(`/verify-email?email=${encodeURIComponent(parsed.data.email)}`)
    }
    return {
      status: 'error',
      message:
        error.code === 'invalid_credentials'
          ? 'That email and password don’t match. Try again, or reset your password.'
          : error.status === 429
            ? 'Too many tries. Wait a few minutes, then try again.'
            : 'We couldn’t sign you in just now. Please try again.',
      errors: {},
      values,
    }
  }
  await linkGuestOrders()
  redirect(next)
}

export async function signUpAction(_prev: FormState, form: FormData): Promise<FormState> {
  const values = formValues(form, ['fullName', 'email', 'phone'])
  const next = safeNext(form.get('next'))
  const parsed = signUpSchema.safeParse({ ...values, password: form.get('password') })
  if (!parsed.success) {
    return { status: 'error', errors: fieldErrors(parsed.error), values }
  }
  const { fullName, email, phone, password } = parsed.data

  if (isDemoMode()) {
    await startDemoSession({ email, fullName })
    redirect(`/verify-email?email=${encodeURIComponent(email)}&next=${encodeURIComponent(next)}`)
  }

  const supabase = await supabaseServer()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, phone },
      emailRedirectTo: await confirmLink(next),
    },
  })
  if (error) {
    const message =
      error.code === 'weak_password'
        ? 'Choose a stronger password: longer, and not one used on other sites.'
        : error.status === 429
          ? 'Too many tries. Wait a few minutes, then try again.'
          : 'We couldn’t create your account just now. Please try again.'
    return {
      status: 'error',
      message,
      errors: error.code === 'weak_password' ? { password: message } : {},
      values,
    }
  }
  // Same page whether or not the email already had an account, so nobody can use this form to
  // find out who has one. The page points existing owners to sign in or reset instead.
  redirect(`/verify-email?email=${encodeURIComponent(email)}`)
}

export async function resendVerificationAction(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  const parsed = forgotPasswordSchema.safeParse({ email: form.get('email') })
  if (!parsed.success) {
    return { status: 'error', errors: fieldErrors(parsed.error), values: {} }
  }
  if (!isDemoMode()) {
    const supabase = await supabaseServer()
    await supabase.auth.resend({
      type: 'signup',
      email: parsed.data.email,
      options: { emailRedirectTo: await confirmLink('/account') },
    })
  }
  return { status: 'ok', message: 'Sent. It can take a minute or two to arrive.' }
}

export async function forgotPasswordAction(_prev: FormState, form: FormData): Promise<FormState> {
  const values = formValues(form, ['email'])
  const parsed = forgotPasswordSchema.safeParse(values)
  if (!parsed.success) {
    return { status: 'error', errors: fieldErrors(parsed.error), values }
  }
  if (!isDemoMode()) {
    const supabase = await supabaseServer()
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: await confirmLink('/reset-password'),
    })
    if (error?.status === 429) {
      return {
        status: 'error',
        message: 'Too many tries. Wait a few minutes, then try again.',
        errors: {},
        values,
      }
    }
  }
  // The same answer whether or not the email has an account.
  return {
    status: 'ok',
    message: `If ${parsed.data.email} has a ShipEast account, a link to choose a new password is on its way. It works for one hour.`,
  }
}

export async function resetPasswordAction(_prev: FormState, form: FormData): Promise<FormState> {
  const parsed = resetPasswordSchema.safeParse({
    password: form.get('password'),
    confirm: form.get('confirm'),
  })
  if (!parsed.success) {
    return { status: 'error', errors: fieldErrors(parsed.error), values: {} }
  }
  if (!isDemoMode()) {
    const supabase = await supabaseServer()
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password })
    if (error) {
      return {
        status: 'error',
        message:
          error.code === 'same_password'
            ? 'That is your current password. Choose a new one.'
            : error.code === 'weak_password'
              ? 'Choose a stronger password: longer, and not one used on other sites.'
              : 'Your reset link has expired. Ask for a new one below.',
        errors: {},
        values: {},
      }
    }
  }
  redirect('/account?updated=password')
}

export async function signOutAction(): Promise<void> {
  if (isDemoMode()) await endDemoSession()
  else await (await supabaseServer()).auth.signOut()
  redirect('/')
}
