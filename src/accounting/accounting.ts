import type { Product } from '../datasets/types'
import type { Order } from '../prototypes/ecommerce/cart'
import { costOf, purchaseTotal, type PurchaseOrder } from '../stock/stock'

// The shop's books, worked out from the orders, the purchase orders and the expenses the Back Office recorded. Nothing here is stored
// as a total. The figures are samples for a demo, never advice on accounting or tax.

// The reduced VAT rate, which the government has extended to 30 September 2027 (a royal decree on the Revenue Code). Prices in the
// storefront already include it.
export const VAT_RATE = 0.07

const round2 = (n: number) => Math.round(n * 100) / 100
export const vatIncluded = (gross: number, rate = VAT_RATE) => round2((gross * rate) / (1 + rate))
export const netOfVat = (gross: number, rate = VAT_RATE) => round2(gross - vatIncluded(gross, rate))

// The VAT rate in force at a moment, as the shop settings say (0 when the shop is not registered then). A record keeps the rate of its own date,
// so a change of rate only reaches records dated after it.
export type VatPolicy = { rateAt: (at: string) => number }
export const DEFAULT_VAT: VatPolicy = { rateAt: () => VAT_RATE }

const hash = (text: string) => {
  let h = 2166136261
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0
  return h
}

export type Channel = 'cash' | 'cod' | 'transfer' | 'card'
export const channels: Channel[] = ['cash', 'cod', 'transfer', 'card']
export const channelOf = (o: Order): Channel => ({ card: 'card', promptpay: 'transfer', transfer: 'transfer', branch: 'cash', cod: 'cod' } as Record<string, Channel>)[o.paymentId] ?? 'transfer'

export type ExpenseCategory = 'shipping' | 'advertising' | 'rent' | 'utilities' | 'fees' | 'other'
export const expenseCategories: ExpenseCategory[] = ['shipping', 'advertising', 'rent', 'utilities', 'fees', 'other']
// A cost entered by hand. `vat` says the amount already includes VAT 7%. A sample's payee is a marker such as '@courier', not text.
export type Expense = { id: string; date: string; category: ExpenseCategory; payee: string; amount: number; vat: boolean; note?: string; sample?: boolean }

// The money of an order: what the shopper paid plus what the wallet paid.
export const grossOf = (o: Order) => o.total + (o.walletUsed ?? 0)

// An order is income once the money is in: online payments when paid, payment at the branch or on delivery when handed over.
// Until then it is money still to come ('receivable'). The made-up past orders stay out of the books, because the made-up
// daily sales stand for them.
export type SaleState = 'paid' | 'receivable' | 'none'
export function saleState(o: Order): SaleState {
  if (o.sample) return 'none'
  const status = o.status ?? 'preparing'
  if (status === 'cancelled') return 'none'
  if (o.paymentId === 'branch' || o.paymentId === 'cod') return status === 'delivered' ? 'paid' : 'receivable'
  return status === 'pending' ? 'receivable' : 'paid'
}
export const paidAtOf = (o: Order) => o.paidAt ?? o.placedAt

export const dayKey = (d: Date | string) => {
  const x = typeof d === 'string' ? new Date(d) : d
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`
}
export const monthKey = (d: Date | string) => dayKey(d).slice(0, 7)
const noonOf = (day: string) => new Date(`${day}T12:00:00`).toISOString()
const shiftDays = (daysAgo: number, now: number) => {
  const d = new Date(now)
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() - daysAgo)
  return d
}

// The last `count` months, newest first, as 'YYYY-MM'.
export function monthsBack(count: number, now = Date.now()) {
  const d = new Date(now)
  d.setDate(1)
  return Array.from({ length: count }, (_, i) => {
    const x = new Date(d)
    x.setMonth(x.getMonth() - i)
    return monthKey(x)
  })
}

const DAYS_BACK = 190
// Made-up sales of a past day, scaled to the Dataset's prices. Today's figure is a made-up morning that live orders add to.
// The made-up figures come from the Dataset's own products only, so a product made in the Back Office does not change them.
const ownProducts = (products: Product[]) => products.filter((p) => !p.custom)

export function seedSales(products: Product[], daysAgo: number) {
  const own = ownProducts(products)
  const average = own.reduce((n, p) => n + (p.basePrice ?? p.price), 0) / Math.max(1, own.length)
  const share = 0.6 + (hash(`day:${daysAgo}`) % 80) / 100
  return Math.round((average * 12 * (daysAgo === 0 ? share / 2 : share)) / 10) * 10
}
const seedWeights: Record<Channel, number> = { cash: 0.25, cod: 0.15, transfer: 0.35, card: 0.25 }
export function seedChannels(products: Product[], daysAgo: number): Record<Channel, number> {
  const gross = seedSales(products, daysAgo)
  const out = { cash: 0, cod: 0, transfer: 0, card: 0 } as Record<Channel, number>
  let left = gross
  channels.forEach((c, i) => {
    const part = i === channels.length - 1 ? left : Math.round(gross * seedWeights[c] * (0.9 + (hash(`${c}:${daysAgo}`) % 21) / 100))
    out[c] = Math.min(left, part)
    left -= out[c]
  })
  return out
}
// The made-up cost of the made-up sales, as a share of the price without VAT.
const SEED_COST_RATE = 0.65

const sampleExpensePlan: [ExpenseCategory, string, number, boolean][] = [
  ['shipping', '@courier', 0.03, true],
  ['advertising', '@ads', 0.04, true],
  ['rent', '@landlord', 0.06, false],
  ['utilities', '@utility', 0.015, true],
  ['fees', '@payments', 0.02, true],
  ['other', '@shop', 0.01, false],
]
// Six made-up costs for each of the last six months, scaled to the Dataset's prices.
export function seedExpenses(products: Product[], now = Date.now()): Expense[] {
  const own = ownProducts(products)
  const average = own.reduce((n, p) => n + (p.basePrice ?? p.price), 0) / Math.max(1, own.length)
  const today = dayKey(new Date(now))
  const rows: Expense[] = []
  monthsBack(6, now).forEach((month) => {
    sampleExpensePlan.forEach(([category, payee, share, vat], i) => {
      const day = 1 + (hash(`${month}:${category}`) % 27)
      const date = `${month}-${String(day).padStart(2, '0')}`
      if (date > today) return
      const jitter = 0.85 + (hash(`${month}:${category}:j`) % 31) / 100
      rows.push({ id: `exp-${month}-${i}`, date, category, payee, amount: Math.round((average * 360 * share * jitter) / 10) * 10, vat, sample: true })
    })
  })
  return rows
}

export type LedgerKind = 'sale' | 'daily' | 'expense' | 'purchase'
export type LedgerEntry = {
  id: string
  at: string
  day: string
  kind: LedgerKind
  ref?: string
  expenseId?: string
  category?: ExpenseCategory
  payee?: string
  channel?: Channel
  moneyIn: number
  moneyOut: number
  // The VAT inside the money: output VAT of a sale, input VAT of a cost.
  vat: number
  // What the goods cost the shop, for a sale.
  cogs: number
  sample?: boolean
}

export type Books = { entries: LedgerEntry[]; receivables: { orderId: string; at: string; amount: number }[] }

export function buildBooks(products: Product[], orders: Order[], purchases: PurchaseOrder[], expenses: Expense[], now = Date.now(), policy: VatPolicy = DEFAULT_VAT): Books {
  const entries: LedgerEntry[] = []
  for (let d = 0; d < DAYS_BACK; d++) {
    const date = shiftDays(d, now)
    const gross = seedSales(products, d)
    const split = seedChannels(products, d)
    const day = dayKey(date)
    // One made-up row per channel would be noisy in the cash book, so the entry carries the whole day and the channels stay in the daily close.
    entries.push({ id: `daily-${day}`, at: date.toISOString(), day, kind: 'daily', moneyIn: gross, moneyOut: 0, vat: vatIncluded(gross, policy.rateAt(new Date(`${day}T00:00:00`).toISOString())), cogs: round2(netOfVat(gross, policy.rateAt(new Date(`${day}T00:00:00`).toISOString())) * SEED_COST_RATE), sample: true, channel: channels.find((c) => split[c] === Math.max(...channels.map((k) => split[k]))) })
  }
  const receivables: Books['receivables'] = []
  const costById = new Map(products.map((p) => [p.id, costOf(p)]))
  for (const o of orders) {
    const state = saleState(o)
    if (state === 'none') continue
    const gross = grossOf(o)
    if (state === 'receivable') {
      receivables.push({ orderId: o.id, at: o.placedAt, amount: gross })
      continue
    }
    const at = paidAtOf(o)
    entries.push({ id: `sale-${o.id}`, at, day: dayKey(at), kind: 'sale', ref: o.id, channel: channelOf(o), moneyIn: gross, moneyOut: 0, vat: vatIncluded(gross, policy.rateAt(at)), cogs: o.lines.reduce((n, l) => n + (l.productId ? (costById.get(l.productId) ?? 0) : 0) * l.qty, 0) })
  }
  for (const e of [...seedExpenses(products, now), ...expenses]) {
    const at = noonOf(e.date)
    entries.push({ id: `expense-${e.id}`, at, day: e.date, kind: 'expense', expenseId: e.id, category: e.category, payee: e.payee, moneyIn: 0, moneyOut: e.amount, vat: e.vat ? vatIncluded(e.amount, policy.rateAt(at)) : 0, cogs: 0, sample: e.sample })
  }
  // Each receipt of a purchase order is a payment of the goods that came in; one placed before receipts existed, or a made-up one, is one payment.
  const cost = (po: PurchaseOrder, lines: { productId: string; qty: number }[]) => purchaseTotal({ ...po, lines }, products)
  const pay = (po: PurchaseOrder, idSuffix: string, at: string, net: number) => {
    const vat = round2(net * policy.rateAt(at))
    entries.push({ id: `purchase-${po.id}${idSuffix}`, at, day: dayKey(at), kind: 'purchase', ref: po.id, moneyIn: 0, moneyOut: round2(net + vat), vat, cogs: 0, sample: po.sample })
  }
  for (const po of purchases) {
    if (po.receipts) po.receipts.forEach((r, i) => pay(po, `-${i}`, r.at, cost(po, r.lines)))
    else if (po.status === 'received') pay(po, '', po.receivedAt ?? po.expectedAt ?? po.at, purchaseTotal(po, products))
  }
  return { entries: entries.sort((a, b) => b.at.localeCompare(a.at)), receivables }
}

export type MonthReport = {
  month: string
  grossSales: number
  outputVat: number
  netSales: number
  cogs: number
  grossProfit: number
  opex: number
  netProfit: number
  inputVat: number
  vatPayable: number
  moneyIn: number
  moneyOut: number
  receivable: number
}

export function monthReport(books: Books, month: string): MonthReport {
  const inMonth = books.entries.filter((e) => e.day.startsWith(month))
  const sum = (rows: LedgerEntry[], pick: (e: LedgerEntry) => number) => round2(rows.reduce((n, e) => n + pick(e), 0))
  const sales = inMonth.filter((e) => e.kind === 'sale' || e.kind === 'daily')
  const costs = inMonth.filter((e) => e.kind === 'expense' || e.kind === 'purchase')
  const grossSales = sum(sales, (e) => e.moneyIn)
  const outputVat = sum(sales, (e) => e.vat)
  const netSales = round2(grossSales - outputVat)
  const cogs = sum(sales, (e) => e.cogs)
  const opex = sum(inMonth.filter((e) => e.kind === 'expense'), (e) => e.moneyOut - e.vat)
  const inputVat = sum(costs, (e) => e.vat)
  return {
    month,
    grossSales,
    outputVat,
    netSales,
    cogs,
    grossProfit: round2(netSales - cogs),
    opex,
    netProfit: round2(netSales - cogs - opex),
    inputVat,
    vatPayable: round2(outputVat - inputVat),
    moneyIn: sum(inMonth, (e) => e.moneyIn),
    moneyOut: sum(inMonth, (e) => e.moneyOut),
    receivable: sum(books.receivables.filter((r) => monthKey(r.at) === month).map((r) => ({ moneyIn: r.amount }) as LedgerEntry), (e) => e.moneyIn),
  }
}

// A day's closing: the cash counted against the cash the books expect. The five oldest of the last fourteen days are
// already closed as samples, and a sample closing counts as reopened once its day is in the reopened list.
export type Close = { day: string; counted: number; expected: number; note?: string; closedAt: string }
export const CLOSE_WINDOW = 14
export const sampleCloseDays = (now = Date.now()) => Array.from({ length: 5 }, (_, i) => dayKey(shiftDays(CLOSE_WINDOW - 1 - i, now)))
export const sampleCloseCounted = (day: string, expected: number) => expected + ((hash(`close:${day}`) % 81) - 50)
export function isClosed(day: string, closes: Close[], reopened: string[], now = Date.now()) {
  return closes.some((c) => c.day === day) || (sampleCloseDays(now).includes(day) && !reopened.includes(day))
}

// A tax invoice for an order that asked for one at checkout. The number is given when it is issued, in order, with no gaps.
// The page shows a sample of the document, not a real tax document.
export type InvoiceStatus = 'pending' | 'issued' | 'cancelled'
export type InvoiceRecord = { orderId: string; no: string; issuedAt: string; status: 'issued' | 'cancelled' }
export type InvoiceLine = { name: { th?: string; en?: string }; qty: number; unitNet: number; net: number }
export type Invoice = {
  id: string
  orderId?: string
  no?: string
  status: InvoiceStatus
  at: string
  buyerName: string
  buyerTaxId: string
  buyerAddress?: string
  lines: InvoiceLine[]
  net: number
  vat: number
  gross: number
  // A live invoice can be issued once the money is in.
  canIssue: boolean
  sample?: boolean
}

export const nextInvoiceNo = (records: InvoiceRecord[], now = Date.now()) => `INV-${new Date(now).getFullYear()}-${String(1001 + records.length).padStart(4, '0')}`

// Splits gross amounts (VAT included) into net amounts that add up exactly to the net of the total.
function netLines(grossParts: { name: InvoiceLine['name']; qty: number; gross: number }[], rate = VAT_RATE): { lines: InvoiceLine[]; net: number; vat: number; gross: number } {
  const gross = round2(grossParts.reduce((n, l) => n + l.gross, 0))
  const vat = vatIncluded(gross, rate)
  const net = round2(gross - vat)
  let left = net
  const lines = grossParts.map((l, i) => {
    const lineNet = i === grossParts.length - 1 ? round2(left) : round2(netOfVat(l.gross, rate))
    left = round2(left - lineNet)
    return { name: l.name, qty: l.qty, unitNet: round2(lineNet / Math.max(1, l.qty)), net: lineNet }
  })
  return { lines, net, vat, gross }
}

const shippingName = { th: 'ค่าจัดส่ง', en: 'Delivery' }
const discountName = { th: 'ส่วนลด', en: 'Discount' }

export function buildInvoices(products: Product[], orders: Order[], records: InvoiceRecord[], now = Date.now(), policy: VatPolicy = DEFAULT_VAT): Invoice[] {
  const rows: Invoice[] = []
  for (const o of orders) {
    if (o.sample || !o.etax || !o.taxBuyer) continue
    const status = o.status ?? 'preparing'
    const record = records.find((r) => r.orderId === o.id)
    if (status === 'cancelled' && !record) continue
    const parts = [
      ...o.lines.map((l) => ({ name: l.name, qty: l.qty, gross: l.price * l.qty })),
      ...(o.shippingPrice > 0 ? [{ name: shippingName, qty: 1, gross: o.shippingPrice }] : []),
      ...((o.discount ?? 0) > 0 ? [{ name: discountName, qty: 1, gross: -(o.discount ?? 0) }] : []),
    ]
    const doc = netLines(parts, policy.rateAt(o.placedAt))
    rows.push({ id: o.id, orderId: o.id, no: record?.no, status: record?.status ?? 'pending', at: record?.issuedAt ?? o.placedAt, buyerName: o.taxBuyer.name, buyerTaxId: o.taxBuyer.id, buyerAddress: o.customer.address, ...doc, canIssue: saleState(o) === 'paid', sample: false })
  }
  const ranked = products.filter((p) => !p.custom).sort((a, b) => hash(`${a.id}:inv`) - hash(`${b.id}:inv`))
  const plan: [string, number, number][] = [['@buyer1', 3, 2], ['@buyer2', 9, 1], ['@buyer3', 16, 3]]
  plan.forEach(([buyer, days, qty], i) => {
    const p = ranked[i]
    if (!p) return
    const doc = netLines([{ name: p.name, qty, gross: (p.basePrice ?? p.price) * qty }], policy.rateAt(shiftDays(days, now).toISOString()))
    rows.push({ id: `INV-SAMPLE-${i + 1}`, no: `INV-${new Date(now).getFullYear()}-090${i + 1}`, status: 'issued', at: shiftDays(days, now).toISOString(), buyerName: buyer, buyerTaxId: '0000000000000', ...doc, canIssue: false, sample: true })
  })
  return rows.sort((a, b) => b.at.localeCompare(a.at))
}

const cashCategories: ExpenseCategory[] = ['shipping', 'utilities', 'other']
export type DayReport = { day: string; byChannel: Record<Channel, number>; received: number; costs: number; expected: number }

// What the books say about one day: the money received by channel, the costs paid, and the cash expected at the till.
// A made-up day brings its made-up split of the channels.
export function dayReport(books: Books, products: Product[], day: string, now = Date.now()): DayReport {
  const byChannel = { cash: 0, cod: 0, transfer: 0, card: 0 } as Record<Channel, number>
  let costs = 0
  const daysAgo = Math.round((new Date(`${dayKey(new Date(now))}T12:00:00`).getTime() - new Date(`${day}T12:00:00`).getTime()) / 86_400_000)
  for (const e of books.entries) {
    if (e.day !== day) continue
    if (e.kind === 'sale' && e.channel) byChannel[e.channel] += e.moneyIn
    if (e.kind === 'daily') {
      const split = seedChannels(products, daysAgo)
      for (const c of channels) byChannel[c] += split[c]
    }
    // Rent, advertising and fees are paid by transfer; delivery, utilities and the rest come out of the till.
    if (e.kind === 'expense' && e.category && cashCategories.includes(e.category)) costs += e.moneyOut
  }
  return { day, byChannel, received: round2(channels.reduce((n, c) => n + byChannel[c], 0)), costs: round2(costs), expected: round2(byChannel.cash + byChannel.cod - costs) }
}
