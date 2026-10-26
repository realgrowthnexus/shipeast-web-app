import { Camera, Receipt } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { ProofPair } from '@/components/order/proof-pair'
import { Section, SectionHeader } from '@/components/site/section'
import { sampleDoor, sampleReceipt } from './sample-proof'

const proofs = [
  {
    icon: Receipt,
    title: 'A photo of the store receipt',
    body: 'Once everything is bought, the driver photographs the till receipt and we send it to you. You see every item and every price.',
  },
  {
    icon: Camera,
    title: 'A photo at the door',
    body: 'When the bags are handed over, you get a photo and the name of the person who took them in.',
  },
]

/** The crimson band that explains the two photos every order comes with. */
export function ProofBand() {
  return (
    <Section tone="crimson" wide aria-labelledby="proof-h">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeader
            onDark
            id="proof-h"
            eyebrow="Proof on every order"
            title="You see what was bought, and that it arrived"
            lead="No guessing where the money went. Two photos come with every order, sent to your email and your tracking link."
          />
          <Stagger className="mt-10 grid gap-6">
            {proofs.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-crimson-700">
                  <Icon className="size-6 text-blush" aria-hidden />
                </span>
                <div>
                  <h3 className="text-h3">{title}</h3>
                  <p className="mt-1 text-on-crimson-muted">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal className="mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-xl" delay={0.1}>
          <div className="rounded-2xl bg-crimson-800 px-6 pt-8 pb-12 sm:px-12 sm:pt-12 sm:pb-16">
            <ProofPair tilt onDark receipt={sampleReceipt} door={sampleDoor} />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
