import { useMemo } from 'react'
import { useDataset } from '../datasets/DatasetContext'
import type { Coupon } from '../datasets/types'
import type { Order } from '../prototypes/ecommerce/cart'
import { useDemoState } from '../state/demoState'

// The coupons of the chosen Dataset, with what the Back Office changed and the coupons it made. Made ones and changes live in the browser under the Back Office's id.
const OWNER = 'backoffice'
const NO_MADE: Coupon[] = []
const NO_EDITS: Record<string, Partial<Coupon>> = {}
const NO_ORDERS: Order[] = []

export type CouponView = Coupon & { used: number; notStarted: boolean }

const todayKey = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function useCoupons() {
  const { dataset } = useDataset()
  const [made, setMade] = useDemoState<Coupon[]>(OWNER, 'madeCoupons', NO_MADE)
  const [edits, setEdits] = useDemoState<Record<string, Partial<Coupon>>>(OWNER, 'couponEdits', NO_EDITS)
  const [orders] = useDemoState<Order[]>('ecommerce', 'orders', NO_ORDERS)
  const base = dataset.ecommerce.checkout.coupons
  const today = todayKey()
  const all: CouponView[] = useMemo(() => {
    const used = new Map<string, number>()
    for (const o of orders) if (o.couponId && o.status !== 'cancelled') used.set(o.couponId, (used.get(o.couponId) ?? 0) + 1)
    return [...base, ...made].map((c) => {
      const edit = edits[c.id]
      const merged = { ...c, ...edit }
      // A coupon of the Dataset keeps its fixed "past its date" flag until its dates are changed; a made one follows today's date.
      const byDate = merged.custom || edit?.expires !== undefined
      const count = used.get(c.id) ?? 0
      return {
        ...merged,
        expired: byDate ? merged.expires < today : merged.expired,
        notStarted: !!(merged.custom || edit?.starts !== undefined) && merged.starts > today,
        full: merged.full || (merged.limit !== undefined && count >= merged.limit),
        used: count,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, made, edits, orders, today])
  // What the shop offers: not switched off and already started.
  const shop = useMemo(() => all.filter((c) => !c.inactive && !c.notStarted), [all])
  const add = (coupon: Coupon) => setMade([...made, coupon])
  const update = (id: string, patch: Partial<Coupon>) => {
    if (made.some((c) => c.id === id)) setMade(made.map((c) => (c.id === id ? { ...c, ...patch } : c)))
    else setEdits({ ...edits, [id]: { ...edits[id], ...patch } })
  }
  const remove = (id: string) => setMade(made.filter((c) => c.id !== id))
  const restore = (id: string) => {
    const rest = { ...edits }
    delete rest[id]
    setEdits(rest)
  }
  return { all, shop, add, update, remove, restore, edited: (id: string) => !!edits[id] }
}
