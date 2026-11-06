import { describe, expect, it } from 'vitest'
import type { Faq } from '@/lib/types'
import {
  basketsLead,
  buildReceipt,
  earliestCutoff,
  joinParishes,
  pickHomeFaqs,
  RECEIPT_MAX_LINES,
} from './home'

const products = [
  { id: 'p1', name: 'Long Grain Rice', priceCents: 1200 },
  { id: 'p2', name: 'Corned Beef', priceCents: 450 },
  { id: 'p3', name: 'Flour', priceCents: 375 },
]

describe('buildReceipt', () => {
  it('prices each line in J$ at the live rate, quantity included', () => {
    const r = buildReceipt(
      {
        name: 'Family Food Basket',
        items: [
          { productId: 'p1', quantity: 1 },
          { productId: 'p2', quantity: 2 },
        ],
      },
      products,
      157,
    )
    expect(r).toEqual({
      basketName: 'Family Food Basket',
      lines: [
        { qty: 1, name: 'Long Grain Rice', jmd: 1880 },
        { qty: 2, name: 'Corned Beef', jmd: 1410 },
      ],
      more: 0,
      totalJmd: 3290,
    })
  })

  it('the total is the sum of the lines', () => {
    const r = buildReceipt(
      { name: 'B', items: products.map((p) => ({ productId: p.id, quantity: 3 })) },
      products,
      160,
    )!
    expect(r.totalJmd).toBe(r.lines.reduce((s, l) => s + l.jmd, 0))
  })

  it('shows at most seven lines and counts the rest', () => {
    const many = Array.from({ length: 10 }, (_, i) => ({
      id: `x${i}`,
      name: `Item ${i}`,
      priceCents: 100,
    }))
    const r = buildReceipt(
      { name: 'Big', items: many.map((p) => ({ productId: p.id, quantity: 1 })) },
      many,
      150,
    )!
    expect(r.lines).toHaveLength(RECEIPT_MAX_LINES)
    expect(r.more).toBe(3)
    expect(r.totalJmd).toBe(10 * 150)
  })

  it('skips missing products and returns null when nothing is left', () => {
    const r = buildReceipt(
      {
        name: 'B',
        items: [
          { productId: 'gone', quantity: 1 },
          { productId: 'p3', quantity: 1 },
        ],
      },
      products,
      157,
    )!
    expect(r.lines.map((l) => l.name)).toEqual(['Flour'])
    expect(
      buildReceipt({ name: 'B', items: [{ productId: 'gone', quantity: 1 }] }, products, 157),
    ).toBeNull()
  })
})

describe('joinParishes', () => {
  it('reads naturally for one, two and three', () => {
    expect(joinParishes([])).toBe('')
    expect(joinParishes(['St. Thomas'])).toBe('St. Thomas')
    expect(joinParishes(['St. Thomas', 'Kingston'])).toBe('St. Thomas and Kingston')
    expect(joinParishes(['St. Thomas', 'Kingston', 'St. Andrew'])).toBe(
      'St. Thomas, Kingston and St. Andrew',
    )
  })
})

describe('earliestCutoff', () => {
  it('picks the earliest time, padding single-digit hours', () => {
    expect(earliestCutoff([])).toBeNull()
    expect(earliestCutoff([{ cutoffTime: '13:00' }, { cutoffTime: '9:30' }])).toBe('9:30')
    expect(earliestCutoff([{ cutoffTime: '13:00' }, { cutoffTime: '12:45' }])).toBe('12:45')
  })
})

describe('pickHomeFaqs', () => {
  const faq = (id: string, sort: number): Faq => ({
    id,
    sort,
    group: 'Ordering',
    question: id,
    answer: id,
  })
  it('keeps the preferred order and fills gaps from the lowest sort', () => {
    const faqs = [
      faq('faq-2', 2),
      faq('faq-4', 4),
      faq('faq-1', 1),
      faq('faq-3', 3),
      faq('faq-6', 6),
    ]
    expect(pickHomeFaqs(faqs).map((f) => f.id)).toEqual([
      'faq-1',
      'faq-6',
      'faq-4',
      'faq-2',
      'faq-3',
    ])
  })
})

describe('basketsLead', () => {
  it('names the featured occasions', () => {
    expect(basketsLead(['everyday', 'baby', 'christmas'])).toBe(
      'Put together for the usual needs: the weekly shop, a new baby, Christmas. Add one in a tap.',
    )
  })
})
