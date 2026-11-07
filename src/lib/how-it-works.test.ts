import { describe, expect, it } from 'vitest'
import { buildExampleOrder, EXAMPLE_TIMES, shoppedItems } from './how-it-works'

const products = [
  { id: 'rice', name: 'Long Grain Rice', priceCents: 1450 },
  { id: 'flour', name: 'Flour', priceCents: 600 },
]
const basket = {
  name: 'Family Food Basket',
  priceCents: 6900,
  items: [
    { productId: 'rice', quantity: 2 },
    { productId: 'flour', quantity: 1 },
  ],
}
const zones = [
  { parish: 'Kingston', feeCents: 1000 },
  { parish: 'St. Thomas', feeCents: 800 },
]

describe('buildExampleOrder', () => {
  it('delivers to St. Thomas when it is active', () => {
    const order = buildExampleOrder(basket, products, zones)
    expect(order?.parish).toBe('St. Thomas')
    expect(order?.feeCents).toBe(800)
  })

  it('falls back to the first active zone', () => {
    expect(buildExampleOrder(basket, products, [zones[0]])?.parish).toBe('Kingston')
  })

  it('adds the delivery fee to the basket price', () => {
    expect(buildExampleOrder(basket, products, zones)?.totalCents).toBe(7700)
  })

  it('refunds one unit of the first item that still has a product', () => {
    expect(buildExampleOrder(basket, products, zones)?.missing).toEqual({
      productId: 'rice',
      name: 'Long Grain Rice',
      cents: 1450,
    })
    const gone = { ...basket, items: [{ productId: 'gone', quantity: 1 }, ...basket.items] }
    expect(buildExampleOrder(gone, products, zones)?.missing?.name).toBe('Long Grain Rice')
    expect(buildExampleOrder(basket, [], zones)?.missing).toBeNull()
  })

  it('returns null with no zones', () => {
    expect(buildExampleOrder(basket, products, [])).toBeNull()
  })
})

describe('EXAMPLE_TIMES', () => {
  it('runs forward through the day and promises no refund time', () => {
    const times = Object.values(EXAMPLE_TIMES).filter((t): t is string => t !== null)
    expect([...times].sort()).toEqual(times)
    expect(EXAMPLE_TIMES.closed).toBeNull()
  })
})

describe('shoppedItems', () => {
  it('takes one unit of the missing item off', () => {
    expect(shoppedItems(basket.items, { productId: 'rice' })).toEqual([
      { productId: 'rice', quantity: 1 },
      { productId: 'flour', quantity: 1 },
    ])
    expect(shoppedItems(basket.items, { productId: 'flour' })).toEqual([
      { productId: 'rice', quantity: 2 },
    ])
  })

  it('keeps every item when nothing is missing', () => {
    expect(shoppedItems(basket.items, null)).toBe(basket.items)
  })
})
