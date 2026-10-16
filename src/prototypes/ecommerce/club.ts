import type { Localized } from '../../i18n'
import { useDemoState } from '../../state/demoState'
import { useDataset } from '../../datasets/DatasetContext'
import { PROTOTYPE_ID } from './cart'
import { useClubLinked } from './checkout'

export type PointEntry = { at: string; note: Localized; delta: number }

const p = (th: string, en: string): Localized => ({ th, en })

// Past points shown as history before the shopper does anything; they are already inside the starting balance.
export const sampleHistory: PointEntry[] = [
  { at: '2026-10-08T10:20:00', note: p('คำสั่งซื้อ ORD-0904', 'Order ORD-0904'), delta: 120 },
  { at: '2026-09-27T14:05:00', note: p('คำสั่งซื้อ ORD-0903', 'Order ORD-0903'), delta: 260 },
  { at: '2026-09-15T09:40:00', note: p('แลกคูปอง ลด ฿50', 'Redeemed a ฿50 coupon'), delta: -200 },
  { at: '2026-09-02T16:30:00', note: p('คำสั่งซื้อ ORD-0902', 'Order ORD-0902'), delta: 90 },
]

// Points the shopper earns and spends in this session, on top of the starting balance.
export function useClubPoints() {
  const [log, setLog] = useDemoState<PointEntry[]>(PROTOTYPE_ID, 'clubPoints', [])
  return {
    log,
    extra: log.reduce((sum, e) => sum + e.delta, 0),
    add: (note: Localized, delta: number) => setLog([{ at: new Date().toISOString(), note, delta }, ...log]),
  }
}

// The balance shown everywhere: nothing until the member card is linked.
export function useClubBalance() {
  const { dataset } = useDataset()
  const [linked] = useClubLinked()
  const { extra } = useClubPoints()
  return { linked, balance: linked ? dataset.ecommerce.account.points + extra : 0 }
}
