import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useDataset } from '../../datasets/DatasetContext'
import type { Product } from '../../datasets/types'
import type { Localized } from '../../i18n'
import { CENTRAL } from '../../stock/stock'
import { useEffect } from 'react'
import { samplePurchaseOrders, sampleTransfers, type PurchaseOrder, type Transfer } from '../../stock/stock'
import { usePurchases, useStock, useTransfers } from '../../stock/useStock'
import { readDemoState, useDemoState } from '../../state/demoState'
import { branchById } from '../ecommerce/branches'
import { useOrders, type Order } from '../ecommerce/cart'
import { useOrderBook } from '../ecommerce/orders'
import { b } from './strings'

export const PROTOTYPE_ID = 'backoffice'

// The storefront's orders, newest first. Reading them here also fills in the sample orders on a first visit.
export const useBackOrders = () => useOrderBook()[0]

export const locationName = (loc: string): Localized => (loc === CENTRAL ? b.central : branchById(loc).name)

// Changes one order of the storefront; the status moves it through packing, handing over or cancelling.
export function useUpdateOrder() {
  const [, setOrders] = useOrders()
  return (id: string, patch: Partial<Order>) => {
    const current = readDemoState<Order[]>('ecommerce', 'orders', [])
    setOrders(current.map((o) => (o.id === id ? { ...o, ...patch } : o)))
  }
}

const hash = (text: string) => {
  let h = 2166136261
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0
  return h
}

const sameDay = (a: Date, c: Date) => a.getFullYear() === c.getFullYear() && a.getMonth() === c.getMonth() && a.getDate() === c.getDate()

// Made-up sales of past days, scaled to the Dataset's prices so they look right for any shop. Today's figure
// starts from a made-up morning and grows with the orders placed since.
const pastSales = (products: Product[], daysAgo: number) => {
  const average = products.reduce((n, p) => n + p.price, 0) / Math.max(1, products.length)
  const share = 0.6 + (hash(`day:${daysAgo}`) % 80) / 100
  return Math.round((average * 12 * (daysAgo === 0 ? share / 2 : share)) / 10) * 10
}

// Sales of the last `days` days, oldest first: the made-up figure plus every order the shopper placed (not cancelled).
export function useSales(days = 7) {
  const { dataset } = useDataset()
  const products = dataset.ecommerce.products
  const orders = useBackOrders()
  return useMemo(() => {
    const now = new Date()
    return Array.from({ length: days }, (_, i) => {
      const daysAgo = days - 1 - i
      const day = new Date(now)
      day.setDate(day.getDate() - daysAgo)
      const live = orders.filter((o) => !o.sample && o.status !== 'cancelled' && sameDay(new Date(o.placedAt), day)).reduce((n, o) => n + o.total, 0)
      return { day, value: pastSales(products, daysAgo) + live }
    })
  }, [days, orders, products])
}

// The address search to carry on links inside the back office: whatever the visitor came with (such as ?clean=1),
// without the ?product= and ?level= that only the receive and stock pages read.
export function useSearch() {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  params.delete('product')
  params.delete('level')
  params.delete('supplier')
  const rest = params.toString()
  return rest ? `?${rest}` : ''
}

// How many orders wait to be packed, and how many products are running low or out: the numbers the menu and the bell show.
export function useCounts() {
  const { dataset } = useDataset()
  const products = dataset.ecommerce.products
  const orders = useBackOrders()
  const book = useStock()
  return {
    toPack: orders.filter((o) => ['pending', 'preparing'].includes(o.status ?? 'preparing')).length,
    alerts: products.filter((p) => book.status(p.id) !== 'ok').length,
  }
}

// Units sold per product, from every order that was not cancelled, most first.
export function useBestSellers(limit = 5) {
  const orders = useBackOrders()
  return useMemo(() => {
    const sold = new Map<string, number>()
    for (const o of orders) {
      if (o.status === 'cancelled') continue
      for (const l of o.lines) if (l.productId) sold.set(l.productId, (sold.get(l.productId) ?? 0) + l.qty)
    }
    return [...sold.entries()].sort((a, c) => c[1] - a[1]).slice(0, limit)
  }, [orders, limit])
}

// The transfers, newest first. The first time, the list is filled with the made-up ones; Reset clears them with the rest.
export function useTransferBook(): [Transfer[], (next: Transfer[]) => void] {
  const products = useDataset().dataset.ecommerce.products
  const [transfers, setTransfers] = useTransfers()
  const [seeded, setSeeded] = useDemoState<boolean>(PROTOTYPE_ID, 'transfersSeeded', false)
  useEffect(() => {
    if (seeded || readDemoState<boolean>(PROTOTYPE_ID, 'transfersSeeded', false)) return
    setSeeded(true)
    if (readDemoState<Transfer[]>(PROTOTYPE_ID, 'transfers', []).length > 0) return
    setTransfers(sampleTransfers(products))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seeded])
  return [[...transfers].sort((a, c) => c.at.localeCompare(a.at)), setTransfers]
}

// The purchase orders, newest first, filled with the made-up ones the first time.
export function usePurchaseBook(): [PurchaseOrder[], (next: PurchaseOrder[]) => void] {
  const products = useDataset().dataset.ecommerce.products
  const [purchases, setPurchases] = usePurchases()
  const [seeded, setSeeded] = useDemoState<boolean>(PROTOTYPE_ID, 'purchasesSeeded', false)
  useEffect(() => {
    if (seeded || readDemoState<boolean>(PROTOTYPE_ID, 'purchasesSeeded', false)) return
    setSeeded(true)
    if (readDemoState<PurchaseOrder[]>(PROTOTYPE_ID, 'purchases', []).length > 0) return
    setPurchases(samplePurchaseOrders(products))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seeded])
  return [[...purchases].sort((a, c) => c.at.localeCompare(a.at)), setPurchases]
}
