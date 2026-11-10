import type { Product } from '../datasets/types'
import type { Order } from '../prototypes/ecommerce/cart'

// The stock model shared by the storefront and the Back Office. Nothing here is stored: every number is worked out
// from the Dataset's products, the orders and the movements the Back Office recorded, so a Reset puts it back.

export const CENTRAL = 'central'
export const branchIds = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6']
export const locationIds = [CENTRAL, ...branchIds]

// A movement the Back Office recorded: goods received (+) or a count that corrected a place's figure (+ or -).
export type AdjustmentReason = 'damaged' | 'expired' | 'lost' | 'count' | 'other'
export const adjustmentReasons: AdjustmentReason[] = ['count', 'damaged', 'expired', 'lost', 'other']
export type Movement = { id: string; at: string; productId: string; loc: string; kind: 'in' | 'adjust'; qty: number; supplierId?: string; note?: string; reason?: AdjustmentReason; poId?: string }
// One line of a product's history: the recorded movements, the made-up past sales and receipts, and orders that took stock out.
export type HistoryEntry = { id: string; at: string; productId: string; loc: string; kind: 'in' | 'adjust' | 'sale' | 'order' | 'transferOut' | 'transferIn'; qty: number; ref?: string; supplierId?: string; note?: string; reason?: AdjustmentReason; sample?: boolean }

// A move of goods from one place to another. Stock leaves the source when it is approved (`outAt`) and arrives when it is
// received (`inAt`). The made-up past ones carry neither, because their stock is already in the starting figures.
export type TransferStatus = 'pending' | 'transit' | 'done' | 'cancelled'
export type Transfer = { id: string; at: string; productId: string; qty: number; from: string; to: string; status: TransferStatus; outAt?: string; inAt?: string; note?: string; sample?: boolean }

export type Cell = { onHand: number; reserved: number; available: number }
export type StockStatus = 'out' | 'low' | 'ok'

export const supplierIds = ['s1', 's2', 's3', 's4']

const hash = (text: string) => {
  let h = 2166136261
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0
  return h
}

export const reorderPoint = (productId: string) => 10 + (hash(`${productId}:r`) % 15)

// A few products start low on stock and one starts out, so the warnings have something to show.
const flagCache = new WeakMap<Product[], Map<string, 'out' | 'low'>>()
function flagsFor(products: Product[]) {
  const cached = flagCache.get(products)
  if (cached) return cached
  const ranked = [...products].sort((a, b) => hash(`${a.id}:f`) - hash(`${b.id}:f`))
  const flags = new Map<string, 'out' | 'low'>()
  ranked.slice(0, 1).forEach((p) => flags.set(p.id, 'out'))
  ranked.slice(1, 5).forEach((p) => flags.set(p.id, 'low'))
  flagCache.set(products, flags)
  return flags
}

function seedOnHand(productId: string, loc: string, flag?: 'out' | 'low') {
  if (flag === 'out') return 0
  if (flag === 'low') return loc === CENTRAL ? 2 + (hash(productId) % 4) : loc === 'b1' ? hash(productId) % 2 : 0
  return loc === CENTRAL ? 24 + (hash(productId) % 60) : 3 + (hash(`${productId}:${loc}`) % 14)
}

export const orderLocation = (o: Order) => o.stockLoc ?? (o.fulfilment === 'pickup' ? 'b1' : CENTRAL)

// 'reserve': held for a customer but still on the shelf. 'cut': taken off the shelf. The made-up past orders only count
// once the Back Office has packed them, because their stock is already in the starting figures.
export function orderEffect(o: Order): 'reserve' | 'cut' | 'none' {
  const status = o.status ?? 'preparing'
  if (status === 'pending' || status === 'preparing') return 'reserve'
  if ((status === 'ready' || status === 'delivered') && (o.packed || !o.sample)) return 'cut'
  return 'none'
}

export type StockBook = {
  cell: (productId: string, loc: string) => Cell
  total: (productId: string) => Cell
  status: (productId: string) => StockStatus
}

export function buildStock(products: Product[], orders: Order[], movements: Movement[], transfers: Transfer[] = []): StockBook {
  const flags = flagsFor(products)
  const book = new Map<string, Map<string, { onHand: number; reserved: number }>>()
  for (const p of products) {
    const row = new Map<string, { onHand: number; reserved: number }>()
    for (const loc of locationIds) row.set(loc, { onHand: seedOnHand(p.id, loc, flags.get(p.id)), reserved: 0 })
    book.set(p.id, row)
  }
  for (const m of movements) {
    const place = book.get(m.productId)?.get(m.loc)
    if (place) place.onHand += m.qty
  }
  for (const tr of transfers) {
    if (tr.outAt) {
      const place = book.get(tr.productId)?.get(tr.from)
      if (place) place.onHand -= tr.qty
    }
    if (tr.inAt) {
      const place = book.get(tr.productId)?.get(tr.to)
      if (place) place.onHand += tr.qty
    }
  }
  for (const o of orders) {
    const effect = orderEffect(o)
    if (effect === 'none') continue
    const loc = orderLocation(o)
    for (const l of o.lines) {
      const place = l.productId ? book.get(l.productId)?.get(loc) : undefined
      if (!place) continue
      if (effect === 'cut') place.onHand -= l.qty
      else place.reserved += l.qty
    }
  }
  const none: Cell = { onHand: 0, reserved: 0, available: 0 }
  const cell = (productId: string, loc: string): Cell => {
    const place = book.get(productId)?.get(loc)
    return place ? { ...place, available: place.onHand - place.reserved } : none
  }
  const total = (productId: string): Cell => {
    const sum = locationIds.reduce((n, loc) => {
      const c = cell(productId, loc)
      return { onHand: n.onHand + c.onHand, reserved: n.reserved + c.reserved }
    }, { onHand: 0, reserved: 0 })
    return { ...sum, available: sum.onHand - sum.reserved }
  }
  const status = (productId: string): StockStatus => {
    const available = total(productId).available
    return available <= 0 ? 'out' : available < reorderPoint(productId) ? 'low' : 'ok'
  }
  return { cell, total, status }
}

const dayAt = (daysAgo: number, now: number) => {
  const d = new Date(now)
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString()
}

// What happened to one product, newest first. The two made-up past lines (a receipt and a sale) are marked as samples.
export function historyOf(productId: string, orders: Order[], movements: Movement[], transfers: Transfer[] = [], now = Date.now()): HistoryEntry[] {
  const h = hash(productId)
  const rows: HistoryEntry[] = [
    { id: `seed-in-${productId}`, at: dayAt(6 + (h % 20), now), productId, loc: CENTRAL, kind: 'in', qty: 20 + (h % 40), supplierId: supplierIds[h % supplierIds.length], sample: true },
    { id: `seed-sale-${productId}`, at: dayAt(1 + (h % 5), now), productId, loc: CENTRAL, kind: 'sale', qty: -(1 + (h % 4)), sample: true },
    ...movements.filter((m) => m.productId === productId).map((m): HistoryEntry => ({ ...m, ref: m.poId })),
  ]
  for (const o of orders) {
    if (orderEffect(o) !== 'cut') continue
    const line = o.lines.find((l) => l.productId === productId)
    if (line) rows.push({ id: `order-${o.id}`, at: o.packedAt ?? o.placedAt, productId, loc: orderLocation(o), kind: 'order', qty: -line.qty, ref: o.id })
  }
  for (const tr of transfers) {
    if (tr.productId !== productId) continue
    if (tr.outAt) rows.push({ id: `trf-out-${tr.id}`, at: tr.outAt, productId, loc: tr.from, kind: 'transferOut', qty: -tr.qty, ref: tr.id })
    if (tr.inAt) rows.push({ id: `trf-in-${tr.id}`, at: tr.inAt, productId, loc: tr.to, kind: 'transferIn', qty: tr.qty, ref: tr.id })
  }
  return rows.sort((a, b) => b.at.localeCompare(a.at))
}

// A line of the adjustments page: the corrections the Back Office recorded, after four made-up ones from the past.
export type AdjustmentRow = { id: string; at: string; productId: string; loc: string; qty: number; reason: AdjustmentReason; note?: string; sample?: boolean }

export function adjustmentsOf(products: Product[], movements: Movement[], now = Date.now()): AdjustmentRow[] {
  const ranked = [...products].sort((a, b) => hash(`${a.id}:adj`) - hash(`${b.id}:adj`))
  const past: [AdjustmentReason, number, string, number][] = [['damaged', -2, 'b2', 1], ['count', 5, CENTRAL, 3], ['expired', -3, CENTRAL, 6], ['lost', -1, 'b4', 9]]
  const rows: AdjustmentRow[] = past.flatMap(([reason, qty, loc, days], i) => (ranked[i] ? [{ id: `ADJ-090${i + 1}`, at: dayAt(days, now), productId: ranked[i].id, loc, qty, reason, sample: true }] : []))
  const live = movements.filter((m) => m.kind === 'adjust').sort((a, b) => a.at.localeCompare(b.at))
  live.forEach((m, i) => rows.push({ id: `ADJ-${1001 + i}`, at: m.at, productId: m.productId, loc: m.loc, qty: m.qty, reason: m.reason ?? 'count', note: m.note }))
  return rows.sort((a, b) => b.at.localeCompare(a.at))
}

// Four made-up transfers, so the page is never empty: two done, one cancelled and one waiting for approval.
export function sampleTransfers(products: Product[], now = Date.now()): Transfer[] {
  const flags = flagsFor(products)
  const ranked = [...products].filter((p) => !flags.has(p.id)).sort((a, b) => hash(`${a.id}:trf`) - hash(`${b.id}:trf`))
  const plan: [TransferStatus, number, string, string, number][] = [['done', 30, CENTRAL, 'b1', 8], ['done', 12, CENTRAL, 'b2', 5], ['cancelled', 8, 'b3', CENTRAL, 3], ['pending', 10, CENTRAL, 'b3', 0]]
  return plan.flatMap(([status, qty, from, to, days], i) =>
    ranked[i] ? [{ id: `TRF-090${i + 1}`, at: dayAt(days, now), productId: ranked[i].id, qty, from, to, status, sample: true }] : [],
  )
}
