import { useEffect } from 'react'
import { useDataset } from '../../datasets/DatasetContext'
import type { Product } from '../../datasets/types'
import { readDemoState, useDemoState } from '../../state/demoState'
import { PROTOTYPE_ID, useOrders, type Order, type OrderStatus } from './cart'

export const statusOf = (o: Order): OrderStatus => o.status ?? 'preparing'
export const statusOrder: OrderStatus[] = ['pending', 'preparing', 'ready', 'delivered', 'cancelled']

// Paid when the goods arrive (in store or on delivery), so "unpaid" is not a real state for these.
export const paysOnDelivery = (o: Order) => o.paymentId === 'branch' || o.paymentId === 'cod'

export type StepKey = 'placed' | 'paid' | 'preparing' | 'ready' | 'delivered'
export const stepKeys: StepKey[] = ['placed', 'paid', 'preparing', 'ready', 'delivered']

// Which steps of the timeline are done for an order; the first one not done is the current step.
export function stepsDone(o: Order): Record<StepKey, boolean> {
  const st = statusOf(o)
  if (st === 'cancelled') return { placed: true, paid: false, preparing: false, ready: false, delivered: false }
  // A step is done once the order has moved past it; the one it is in right now is the current step.
  return {
    placed: true,
    paid: paysOnDelivery(o) ? st === 'delivered' : st !== 'pending',
    preparing: st === 'ready' || st === 'delivered',
    ready: st === 'delivered',
    delivered: st === 'delivered',
  }
}

// The sample orders keep these markers instead of text, so they read in whichever language the page is in.
export const SAMPLE_NAME = '@sample-name'
export const SAMPLE_ADDRESS = '@sample-address'
export const SAMPLE_STORE = '@sample-store'
const sampleText: Record<string, { th: string; en: string }> = {
  [SAMPLE_NAME]: { th: 'ผู้ใช้ตัวอย่าง', en: 'Sample shopper' },
  [SAMPLE_ADDRESS]: { th: '000 ถนนตัวอย่าง ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดตัวอย่าง 00000', en: '000 Sample Road, Sample Subdistrict, Sample District, Sample Province 00000' },
  [SAMPLE_STORE]: { th: 'สาขาตัวอย่าง ปทุมธานี', en: 'Sample branch, Pathum Thani' },
}
export const customerText = (value: string, lang: string) => sampleText[value]?.[lang === 'th' ? 'th' : 'en'] ?? value

const orderLines = (products: Product[], picks: [number, number][]) =>
  picks.flatMap(([i, qty]) => {
    const p = products[i % products.length]
    return p ? [{ productId: p.id, name: p.name, price: p.price, qty }] : []
  })

// Four sample orders in different states, so the order pages are never empty on a first visit.
export function sampleOrders(products: Product[], parcelShippingId: string, parcelPrice: number, now = Date.now()): Order[] {
  const make = (id: string, ago: number, picks: [number, number][], rest: Partial<Order>): Order => {
    const lines = orderLines(products, picks)
    const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0)
    const shippingPrice = rest.fulfilment === 'pickup' ? 0 : parcelPrice
    return {
      id,
      placedAt: new Date(now - ago).toISOString(),
      customer: { name: SAMPLE_NAME, phone: '0800000000', address: SAMPLE_ADDRESS },
      shippingId: parcelShippingId,
      paymentId: 'promptpay',
      lines,
      subtotal,
      shippingPrice,
      total: subtotal + shippingPrice,
      fulfilment: 'parcel',
      sample: true,
      ...rest,
    }
  }
  const hour = 3_600_000
  const day = 24 * hour
  return [
    make('ORD-0904', 2 * hour, [[0, 1], [1, 2]], { status: 'pending', paymentId: 'promptpay' }),
    make('ORD-0903', 2 * day, [[2, 1]], { status: 'ready', paymentId: 'transfer' }),
    make('ORD-0902', 9 * day, [[3, 1], [4, 1], [6, 1]], { status: 'delivered', paymentId: 'branch', fulfilment: 'pickup', shippingId: 'pickup', pickupMode: 'counter', customer: { name: SAMPLE_NAME, phone: '0800000000', address: SAMPLE_STORE } }),
    make('ORD-0899', 34 * day, [[7, 1], [8, 1]], { status: 'delivered', paymentId: 'transfer' }),
    make('ORD-0901', 20 * day, [[5, 2]], { status: 'cancelled', paymentId: 'cod' }),
  ]
}

// The orders, newest first. The first time the list is empty it is filled with the sample orders,
// which can then be opened, paid and filtered like any other; Reset clears them with everything else.
export function useOrderBook(): [Order[], (orders: Order[]) => void] {
  const { dataset } = useDataset()
  const { products, shippingMethods } = dataset.ecommerce
  const [orders, setOrders] = useOrders()
  const [seeded, setSeeded] = useDemoState<boolean>(PROTOTYPE_ID, 'samples', false)
  useEffect(() => {
    if (seeded || readDemoState<boolean>(PROTOTYPE_ID, 'samples', false)) return
    setSeeded(true)
    if (readDemoState<Order[]>(PROTOTYPE_ID, 'orders', []).length > 0) return
    const parcel = shippingMethods.find((m) => m.id !== 'pickup')
    setOrders(sampleOrders(products, parcel?.id ?? 'standard', parcel?.price ?? 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seeded])
  return [[...orders].sort((a, b) => b.placedAt.localeCompare(a.placedAt)), setOrders]
}
