import { describe, expect, it } from 'vitest'
import * as demo from '@/lib/demo'
import { unitPriceLabel } from './unit-price'

const table: [size: string, cents: number, expected: string | null][] = [
  ['10 lb bag', 1450, 'USD$1.45 per lb'],
  ['5 lb bag', 650, 'USD$1.30 per lb'],
  ['4 lb bag', 575, 'USD$1.44 per lb'],
  ['1 gallon', 1325, null],
  ['42 oz canister', 825, 'USD$3.14 per lb'],
  ['12 oz can', 475, 'USD$6.33 per lb'],
  ['15 oz can, 3 pack', 690, 'USD$2.30 each'],
  ['12 oz can, 12 pack', 1590, 'USD$1.33 each'],
  ['24 oz bag', 1890, 'USD$12.60 per lb'],
  ['150 fl oz', 1975, 'USD$0.13 per fl oz'],
  ['28 fl oz, 3 pack', 990, 'USD$3.30 each'],
  ['30 double rolls', 2450, 'USD$0.82 per roll'],
  ['12 rolls', 2190, 'USD$1.83 per roll'],
  ['121 fl oz, 2 pack', 1150, 'USD$5.75 each'],
  ['500 mg, 200 count', 1280, 'USD$6.40 per 100'],
  ['300 tablets', 1890, 'USD$6.30 per 100'],
  ['160 pieces', 2200, null],
  ['33.8 fl oz, 2 pack', 1050, 'USD$5.25 each'],
  ['168 count', 4290, 'USD$0.26 each'],
  ['900 count', 2390, 'USD$2.66 per 100'],
  ['48 oz tub', 4590, 'USD$15.30 per lb'],
  ['27 fl oz, 2 pack', 1490, 'USD$7.45 each'],
  ['', 1000, null],
  ['pack of 1', 1000, null],
  ['0 lb', 1000, null],
]

describe('unitPriceLabel', () => {
  it.each(table)('%s at %d cents is %s', (size, cents, expected) => {
    expect(unitPriceLabel(size, cents)).toBe(expected)
  })

  it('the table covers every placeholder product, at its demo price', () => {
    // ShipEast's own list (ids `prd-se-…`) uses metric and multi-unit sizes; see the next test.
    for (const p of demo.products.filter((x) => !x.id.startsWith('prd-se-'))) {
      expect(table.some(([size, cents]) => size === p.size && cents === p.priceCents)).toBe(true)
    }
  })

  it("never throws on a size from ShipEast's own list", () => {
    for (const p of demo.products.filter((x) => x.id.startsWith('prd-se-'))) {
      const label = unitPriceLabel(p.size, p.priceCents)
      expect(label === null || label.startsWith('USD$'), `${p.name}: ${label}`).toBe(true)
    }
  })
})
