import type { StockPhotoKey } from './stock-photos'

/**
 * Each department's own photo and crop, shared by the home's department tiles and the shop's
 * department band, so a department looks the same wherever it appears.
 */
export const departmentLooks: Record<string, { photo: StockPhotoKey; crop: string }> = {
  groceries: { photo: 'homeVegBox', crop: 'object-center' },
  household: { photo: 'catHousehold', crop: 'object-[center_35%]' },
  pharmacy: { photo: 'catPharmacy', crop: 'object-center' },
  'baby-and-child': { photo: 'catBaby', crop: 'object-top' },
}
