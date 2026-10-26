import { MapPin, Receipt, Repeat, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { Container } from '@/components/site/page-intro'

const benefits = [
  { icon: Repeat, text: 'Send the same basket again in one tap.' },
  { icon: MapPin, text: 'Keep family addresses saved, landmarks and all.' },
  { icon: Receipt, text: 'Every receipt and door photo in one place.' },
  { icon: ShieldCheck, text: 'Optional. You can always check out as a guest.' },
]

/** Sign in, sign up and password pages: the form, with why an account helps beside it. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="section-sm">
      <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_24rem] lg:gap-16">
        <div className="w-full max-w-md">{children}</div>
        <aside
          aria-labelledby="why-account"
          className="rounded-xl bg-crimson p-card-lg text-white lg:sticky lg:top-24"
        >
          <p className="mb-3 eyebrow text-blush">Your ShipEast account</p>
          <h2 id="why-account" className="text-h2 text-balance">
            Less typing, every time you send
          </h2>
          <ul className="mt-6 flex flex-col gap-4">
            {benefits.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-crimson-deep">
                  <Icon className="size-5 text-blush" aria-hidden />
                </span>
                <span className="pt-1.5 text-on-crimson-muted">{text}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Container>
  )
}
