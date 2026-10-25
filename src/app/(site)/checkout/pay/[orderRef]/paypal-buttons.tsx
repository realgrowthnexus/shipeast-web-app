'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Alert } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/card'

interface PayPalNamespace {
  FUNDING: { PAYPAL: string; CARD: string }
  Buttons: (options: Record<string, unknown>) => {
    isEligible: () => boolean
    render: (el: HTMLElement) => Promise<void>
    close: () => Promise<void>
  }
}

declare global {
  interface Window {
    paypal?: PayPalNamespace
  }
}

let sdk: Promise<PayPalNamespace> | null = null

function loadSdk(clientId: string): Promise<PayPalNamespace> {
  sdk ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&components=buttons&enable-funding=card&disable-funding=paylater,venmo`
    s.async = true
    s.onload = () => (window.paypal ? resolve(window.paypal) : reject(new Error('PayPal missing')))
    s.onerror = () => {
      sdk = null
      reject(new Error('PayPal failed to load'))
    }
    document.head.appendChild(s)
  })
  return sdk
}

/**
 * PayPal's own button: the PayPal-account button, or the "Debit or Credit Card" button that
 * opens PayPal's guest card form. Card details go straight to PayPal, never to us.
 */
export function PayPalButtons({
  clientId,
  token,
  method,
}: {
  clientId: string
  token: string
  method: 'paypal' | 'card'
}) {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'working' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let buttons: ReturnType<PayPalNamespace['Buttons']> | null = null
    let cancelled = false
    loadSdk(clientId)
      .then((paypal) => {
        if (cancelled || !ref.current) return
        buttons = paypal.Buttons({
          fundingSource: method === 'card' ? paypal.FUNDING.CARD : paypal.FUNDING.PAYPAL,
          style: { layout: 'vertical', shape: 'rect', height: 48, label: 'pay' },
          createOrder: async () => {
            setMessage('')
            const res = await fetch('/api/paypal/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token }),
            })
            const data = (await res.json()) as { id?: string; error?: string }
            if (!data.id) {
              if (data.error === 'ALREADY_PAID') router.refresh()
              throw new Error(data.error ?? 'create failed')
            }
            return data.id
          },
          onApprove: async ({ orderID }: { orderID: string }) => {
            setState('working')
            const res = await fetch(`/api/paypal/orders/${encodeURIComponent(orderID)}/capture`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token }),
            })
            const data = (await res.json()) as { redirect?: string; error?: string }
            if (data.redirect) router.push(data.redirect)
            else {
              setState('ready')
              setMessage(
                'We couldn’t confirm the payment. You haven’t been charged twice; please try again.',
              )
            }
          },
          onCancel: () =>
            setMessage('Payment cancelled. Your order is saved, so you can try again.'),
          onError: () => {
            setState('ready')
            setMessage(
              'PayPal had a problem taking the payment. Please try again, or pay by bank transfer.',
            )
          },
        })
        if (!buttons.isEligible()) {
          setState('error')
          return
        }
        return buttons.render(ref.current).then(() => !cancelled && setState('ready'))
      })
      .catch(() => !cancelled && setState('error'))
    return () => {
      cancelled = true
      buttons?.close().catch(() => {})
    }
  }, [clientId, method, token, router])

  return (
    <div className="flex flex-col gap-3">
      {state === 'loading' && <Skeleton className="h-12" />}
      {state === 'error' && (
        <Alert tone="danger" title="PayPal didn’t load">
          Check your connection and reload the page, or pay by bank transfer instead.
        </Alert>
      )}
      <div
        ref={ref}
        aria-busy={state === 'working'}
        className={state === 'working' ? 'pointer-events-none opacity-60' : undefined}
      />
      {state === 'working' && (
        <p className="text-sm font-semibold text-ink">Confirming your payment…</p>
      )}
      {message && (
        <p role="alert" className="text-sm font-medium text-danger">
          {message}
        </p>
      )}
    </div>
  )
}
