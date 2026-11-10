import { useDemoState } from '../state/demoState'
import type { Order } from '../prototypes/ecommerce/cart'

// A lowered price for one product between two moments: a plain discount, or a Flash Sale with a number of pieces on offer.
export type PricePromo = {
  id: string
  productId: string
  kind: 'discount' | 'flash'
  // The lowered selling price (VAT included, like every price in the shop).
  price: number
  // ISO moments; the promotion is on from `starts` until `ends`.
  starts: string
  ends: string
  // Flash Sale only: how many pieces are on offer; it ends early when they are sold.
  qty?: number
}

const NO_PROMOS: PricePromo[] = []
export const usePricePromos = () => useDemoState<PricePromo[]>('backoffice', 'pricePromos', NO_PROMOS)

// Pieces of a product sold inside a promotion's window, from the orders that were not cancelled.
export function soldIn(promo: PricePromo, orders: Order[]): number {
  let n = 0
  for (const o of orders) {
    if (o.status === 'cancelled' || o.placedAt < promo.starts || o.placedAt > promo.ends) continue
    for (const l of o.lines) if (l.productId === promo.productId) n += l.qty
  }
  return n
}

export type PromoState = 'scheduled' | 'active' | 'ended' | 'soldout'
export function stateOf(promo: PricePromo, now: string, sold: number): PromoState {
  if (now < promo.starts) return 'scheduled'
  if (now > promo.ends) return 'ended'
  if (promo.kind === 'flash' && promo.qty !== undefined && sold >= promo.qty) return 'soldout'
  return 'active'
}
