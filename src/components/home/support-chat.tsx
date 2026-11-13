'use client'

import { Mail, MessageCircle, Phone, X } from 'lucide-react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useId, useRef, useState } from 'react'
import { useCookieChoiceMade } from '@/components/site/cookie-banner'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/motion'

type Message = { id: string; from: 'us' | 'you'; text: string }

const GREETING =
  'Hi! Ask us about sending groceries to your family in Jamaica. Pick a question, or talk to a person on WhatsApp.'

/**
 * The support chat (owner, November 13): a button in the bottom-right corner that opens a small
 * panel. For now it answers the common questions from the site's own FAQ, instantly and word for
 * word, and hands everything else to a person on WhatsApp, email or phone. It never makes up a
 * reply. It waits for the cookie banner to be answered, so the two never share the corner.
 */
export function SupportChat({
  faqs,
  whatsapp,
  email,
  phone,
}: {
  faqs: { id: string; question: string; answer: string }[]
  /** Digits only, or empty when not set. */
  whatsapp: string
  email: string
  /** Formatted for display, or empty. */
  phone: string
}) {
  const ready = useCookieChoiceMade()
  const still = useReducedMotion()
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ id: 'hi', from: 'us', text: GREETING }])
  const [asked, setAsked] = useState<Set<string>>(new Set())
  const [typing, setTyping] = useState(false)
  const launcher = useRef<HTMLButtonElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    heading.current?.focus()
    // On the document, not the panel: an answered question's button leaves the page, and focus
    // with it, so a panel-level handler would miss the key.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        launcher.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end', behavior: still ? 'auto' : 'smooth' })
  }, [messages, typing, still])

  function close() {
    setOpen(false)
    launcher.current?.focus()
  }

  function ask(faq: (typeof faqs)[number]) {
    setAsked((s) => new Set(s).add(faq.id))
    setMessages((list) => [...list, { id: `q-${faq.id}`, from: 'you', text: faq.question }])
    heading.current?.focus() // the tapped button is about to go; keep focus in the panel
    // A short pause before the answer, so it reads as a reply; none with reduced motion.
    const reply = () => {
      setTyping(false)
      setMessages((list) => [...list, { id: `a-${faq.id}`, from: 'us', text: faq.answer }])
    }
    if (still) return reply()
    setTyping(true)
    window.setTimeout(reply, 600)
  }

  const left = faqs.filter((f) => !asked.has(f.id))
  const telDigits = phone.replace(/\D/g, '')

  if (!ready) return null

  return (
    <div className="fixed right-4 bottom-4 z-overlay sm:right-6 sm:bottom-6 print:hidden">
      <AnimatePresence>
        {open && (
          <m.div
            key="panel"
            id={panelId}
            role="dialog"
            aria-labelledby={`${panelId}-title`}
            initial={still ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: still ? 0.15 : 0.3, ease: ease.outSoft }}
            style={{ transformOrigin: 'bottom right' }}
            className="absolute right-0 bottom-18 flex max-h-[min(34rem,calc(100dvh-7rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-float"
          >
            <div className="flex items-start justify-between gap-3 bg-crimson py-4 pr-2 pl-5 text-on-dark on-dark-focus">
              <div>
                <h2
                  id={`${panelId}-title`}
                  ref={heading}
                  tabIndex={-1}
                  className="font-display text-lead font-semibold focus:outline-none"
                >
                  ShipEast support
                </h2>
                <p className="text-small text-on-crimson-muted">
                  Answers right away. A person on WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close the support chat"
                className="grid size-control shrink-0 cursor-pointer place-items-center rounded-md transition-colors duration-150 hover:bg-crimson-deep"
              >
                <X className="size-icon" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4" aria-live="polite">
              <ul className="flex flex-col gap-2">
                {messages.map((msg) => (
                  <m.li
                    key={msg.id}
                    initial={still ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: ease.outSoft }}
                    className={cn(
                      'max-w-[85%] px-3.5 py-2.5 text-small',
                      msg.from === 'us'
                        ? 'self-start rounded-xl rounded-bl-sm bg-surface-muted text-ink'
                        : 'self-end rounded-xl rounded-br-sm bg-crimson text-on-dark',
                    )}
                  >
                    <span className="sr-only">{msg.from === 'us' ? 'ShipEast: ' : 'You: '}</span>
                    {msg.text}
                  </m.li>
                ))}
                {typing && (
                  <li
                    aria-label="ShipEast is typing"
                    className="flex gap-1 self-start rounded-xl rounded-bl-sm bg-surface-muted px-3.5 py-3.5"
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-pulse rounded-full bg-ink-muted"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </li>
                )}
              </ul>

              {left.length > 0 && !typing && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {left.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => ask(f)}
                      className="min-h-control cursor-pointer rounded-md border border-line bg-surface px-3 py-2 text-left text-small font-medium text-crimson-deep transition-colors duration-150 hover:border-crimson hover:bg-surface-selected"
                    >
                      {f.question}
                    </button>
                  ))}
                </div>
              )}
              <div ref={end} />
            </div>

            <div className="border-t border-line px-4 py-3">
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-slide flex min-h-control items-center justify-center gap-2 rounded-md bg-leaf px-4 text-small font-semibold text-on-dark [--slide:var(--color-leaf-deep)]"
                >
                  <MessageCircle className="size-icon" aria-hidden />
                  Chat with a person on WhatsApp
                </a>
              )}
              <div className="mt-1 flex flex-wrap justify-center gap-x-5 text-small">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-control items-center gap-1.5 font-medium text-ink-body hover:text-crimson"
                >
                  <Mail className="size-icon-sm" aria-hidden />
                  Email
                </a>
                {telDigits && (
                  <a
                    href={`tel:+${telDigits}`}
                    className="inline-flex min-h-control items-center gap-1.5 font-medium text-ink-body hover:text-crimson"
                  >
                    <Phone className="size-icon-sm" aria-hidden />
                    {phone}
                  </a>
                )}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <m.button
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close the support chat' : 'Open the support chat'}
        onClick={() => (open ? close() : setOpen(true))}
        initial={still ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={still ? undefined : { scale: 0.94 }}
        transition={{ duration: 0.3, ease: ease.outSoft }}
        className="grid size-14 cursor-pointer place-items-center rounded-full bg-crimson text-on-dark shadow-float transition-colors duration-150 hover:bg-crimson-deep focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-signal"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={open ? 'x' : 'chat'}
            initial={still ? false : { opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={still ? undefined : { opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
            className="grid place-items-center"
          >
            {open ? (
              <X className="size-6" aria-hidden />
            ) : (
              <MessageCircle className="size-6" aria-hidden />
            )}
          </m.span>
        </AnimatePresence>
      </m.button>
    </div>
  )
}
