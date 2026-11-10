import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDataset } from '../datasets/DatasetContext'
import type { Product } from '../datasets/types'
import { useDemoState } from '../state/demoState'
import type { Order } from '../prototypes/ecommerce/cart'
import { soldIn, stateOf, usePricePromos } from '../promotions/usePricePromos'

// Products made in the Back Office live in the browser, one list per Dataset, beside the Dataset's own products.
// They sit under the Back Office's id so that Reset clears them with everything else.
const OWNER = 'backoffice'
const NONE: Product[] = []
const NO_IDS: string[] = []
// What the Back Office changed on a Dataset's own product; the Dataset itself is never touched.
export type ProductEdit = { price?: number; cost?: number; reorderAt?: number }
const NO_EDITS: Record<string, ProductEdit> = {}
const NO_ORDERS: Order[] = []
type Made = Record<string, Product[]>
const NO_MADE: Made = {}

export function useProducts() {
  const { dataset } = useDataset()
  const [made, setMade] = useDemoState<Made>(OWNER, 'madeProducts', NO_MADE)
  const [edits, setEdits] = useDemoState<Record<string, ProductEdit>>(OWNER, 'productEdits', NO_EDITS)
  const [hidden, setHidden] = useDemoState<Record<string, string[]>>(OWNER, 'hiddenProducts', {})
  // The Dataset's own products: the made-up history, the curated shop pages and the reviews are built from these only.
  const original = dataset.ecommerce.products
  const seed = useMemo(
    () => (Object.keys(edits).length ? original.map((p) => (edits[p.id] ? { ...p, basePrice: p.price, price: edits[p.id].price ?? p.price, cost: edits[p.id].cost ?? p.cost, reorderAt: edits[p.id].reorderAt ?? p.reorderAt } : p)) : original),
    [original, edits],
  )
  const own = made[dataset.id] ?? NONE
  const [promos] = usePricePromos()
  const [orders] = useDemoState<Order[]>('ecommerce', 'orders', NO_ORDERS)
  // The promotions are checked against the clock once a minute.
  const [minute, setMinute] = useState(() => Math.floor(Date.now() / 60000))
  useEffect(() => {
    if (promos.length === 0) return
    const timer = window.setInterval(() => setMinute(Math.floor(Date.now() / 60000)), 15000)
    return () => window.clearInterval(timer)
  }, [promos.length])
  const hiddenIds = hidden[dataset.id] ?? NO_IDS
  const plain = useMemo(() => (own.length ? [...seed, ...own] : seed), [seed, own])
  // A product with a price promotion on carries the lowered price, and its regular price as `originalPrice`. A Flash Sale wins over a discount.
  const all = useMemo(() => {
    if (promos.length === 0) return plain
    const now = new Date(minute * 60000).toISOString()
    const live = new Map<string, { promo: (typeof promos)[number]; sold: number }>()
    for (const promo of promos) {
      const sold = soldIn(promo, orders)
      if (stateOf(promo, now, sold) !== 'active') continue
      const held = live.get(promo.productId)
      if (!held || (promo.kind === 'flash' && held.promo.kind !== 'flash')) live.set(promo.productId, { promo, sold })
    }
    if (live.size === 0) return plain
    return plain.map((p) => {
      const hit = live.get(p.id)
      if (!hit) return p
      const { promo, sold } = hit
      return {
        ...p,
        originalPrice: p.originalPrice ?? p.price,
        // The made-up history and the estimated cost keep working from the price before the promotion.
        basePrice: p.basePrice ?? p.price,
        price: promo.price,
        promoId: promo.id,
        promoKind: promo.kind,
        promoEnds: promo.ends,
        ...(promo.kind === 'flash' && promo.qty !== undefined ? { sold, stock: Math.max(0, promo.qty - sold) } : {}),
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plain, promos, orders, minute])
  // The Flash Sales that are on now, soonest to end first.
  const activeFlash = useMemo(() => all.filter((p) => p.promoKind === 'flash').sort((a, b) => (a.promoEnds ?? '').localeCompare(b.promoEnds ?? '')), [all])
  const shop = useMemo(() => (hiddenIds.length ? all.filter((p) => !hiddenIds.includes(p.id)) : all), [all, hiddenIds])
  const shopSeed = useMemo(() => {
    const own = new Set(seed.map((p) => p.id))
    return all.filter((p) => own.has(p.id) && !hiddenIds.includes(p.id))
  }, [all, seed, hiddenIds])

  const save = useCallback((next: Product[]) => setMade({ ...made, [dataset.id]: next }), [made, setMade, dataset.id])
  const add = (product: Product) => save([...own, product])
  const update = (product: Product) => save(own.map((p) => (p.id === product.id ? product : p)))
  const remove = (id: string) => {
    save(own.filter((p) => p.id !== id))
    setHidden({ ...hidden, [dataset.id]: hiddenIds.filter((x) => x !== id) })
  }
  const setShown = (id: string, shown: boolean) => setHidden({ ...hidden, [dataset.id]: shown ? hiddenIds.filter((x) => x !== id) : [...hiddenIds.filter((x) => x !== id), id] })
  const isHidden = (id: string) => hiddenIds.includes(id)
  const editSample = (id: string, edit: ProductEdit | null) => {
    const rest = { ...edits }
    if (edit) rest[id] = edit
    else delete rest[id]
    setEdits(rest)
  }
  const originalOf = (id: string) => original.find((p) => p.id === id)

  const regularPriceOf = (id: string) => plain.find((p) => p.id === id)?.price
  return { seed, all, shop, shopSeed, activeFlash, regularPriceOf, add, update, remove, setShown, isHidden, editSample, originalOf, edits }
}
