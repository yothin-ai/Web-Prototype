import type { Coupon } from '../../datasets/types'
import type { Localized } from '../../i18n'
import { readDemoState, useDemoState } from '../../state/demoState'
import { c } from './checkoutStrings'
import { PROTOTYPE_ID, useCart, useOrders, type Order } from './cart'

export type Fulfilment = 'pickup' | 'parcel'
export type PayId = 'card' | 'promptpay' | 'transfer' | 'branch' | 'cod'
export type Address = { name: string; phone: string; line: string; province: string; district: string; subdistrict: string; postcode: string }

export const paymentOptions: { id: PayId; name: Localized; detail: Localized; modes: Fulfilment[] }[] = [
  { id: 'card', name: c.payCard, detail: c.payCardDetail, modes: ['pickup', 'parcel'] },
  { id: 'promptpay', name: c.payPromptpay, detail: c.payPromptpayDetail, modes: ['pickup', 'parcel'] },
  { id: 'transfer', name: c.payTransfer, detail: c.payTransferDetail, modes: ['pickup', 'parcel'] },
  { id: 'branch', name: c.payBranch, detail: c.payBranchDetail, modes: ['pickup'] },
  { id: 'cod', name: c.payCod, detail: c.payCodDetail, modes: ['parcel'] },
]
export const findPayment = (id: string) => paymentOptions.find((p) => p.id === id)

// Methods that go on to a simulated payment page; the others place the order straight away.
export const needsPaymentPage = (id: PayId) => id === 'card' || id === 'promptpay' || id === 'transfer'

// The ?payType= link parameter accepts these names.
export const payTypeFromParam = (value: string | null): PayId | '' => (paymentOptions.some((p) => p.id === value) ? (value as PayId) : '')

export function couponDiscount(coupon: Coupon | undefined, subtotal: number, shipping: number, fulfil: Fulfilment) {
  if (!coupon || subtotal < coupon.minSpend) return { items: 0, shipping: 0 }
  if (coupon.kind === 'amount') return { items: Math.min(coupon.value, subtotal), shipping: 0 }
  if (coupon.kind === 'percent') return { items: Math.min(coupon.cap ?? Infinity, Math.round((subtotal * coupon.value) / 100)), shipping: 0 }
  return { items: 0, shipping: fulfil === 'parcel' ? shipping : 0 }
}

export const usePending = () => useDemoState<Order | null>(PROTOTYPE_ID, 'pending', null)
export type SavedAddress = Address & { id: string; main: boolean }
// Any number of saved addresses; exactly one is the main one while the list is not empty.
export const useAddresses = () => useDemoState<SavedAddress[]>(PROTOTYPE_ID, 'addresses', [])
export const pickAddress = (list: SavedAddress[], id?: string) => list.find((x) => x.id === id) ?? list.find((x) => x.main) ?? list[0]
export const useClubLinked = () => useDemoState<boolean>(PROTOTYPE_ID, 'club', false)

// Turns a draft into a real order: numbers it, stores it, empties the cart.
export function useCommitOrder() {
  const [, setOrders] = useOrders()
  const [, setCart] = useCart()
  const [, setPending] = usePending()
  return (draft: Order): Order => {
    const current = readDemoState<Order[]>(PROTOTYPE_ID, 'orders', [])
    const order: Order = { ...draft, id: `ORD-${1001 + current.length}`, placedAt: new Date().toISOString() }
    setOrders([order, ...current])
    setCart([])
    setPending(null)
    return order
  }
}
