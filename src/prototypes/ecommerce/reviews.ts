import type { Localized } from '../../i18n'
import { useDataset } from '../../datasets/DatasetContext'
import { useDemoState } from '../../state/demoState'
import { PROTOTYPE_ID } from './cart'
import { statusOf, useOrderBook } from './orders'

export type Review = { id: string; productId: string; rating: number; text: Localized | string; at: string; author: string; mine?: boolean; orderId?: string }

const p = (th: string, en: string): Localized => ({ th, en })

// Reviews by other (made-up) shoppers, on the first products of every dataset.
const others: { index: number; rating: number; author: string; at: string; text: Localized }[] = [
  { index: 0, rating: 5, author: 'Somchai K.', at: '2026-10-01T09:12:00', text: p('คุณภาพดีตามที่คาดไว้ แพ็คมาอย่างดี ส่งเร็วมาก', 'Good quality as expected, well packed and very fast delivery.') },
  { index: 0, rating: 4, author: 'Malee S.', at: '2026-09-20T18:40:00', text: p('ใช้งานได้ดี ราคาคุ้มค่า แต่กล่องมีรอยเล็กน้อย', 'Works well and good value, though the box had a small dent.') },
  { index: 1, rating: 5, author: 'Nop P.', at: '2026-09-28T11:05:00', text: p('ตรงตามรูป ใช้งานง่าย แนะนำเลย', 'Matches the picture and easy to use. Recommended.') },
  { index: 2, rating: 3, author: 'Arun T.', at: '2026-09-11T14:22:00', text: p('โดยรวมใช้ได้ แต่ส่งช้ากว่าที่แจ้งไว้นิดหน่อย', 'Fine overall, but delivery was a little slower than promised.') },
  { index: 2, rating: 5, author: 'Pim R.', at: '2026-09-03T08:30:00', text: p('ซื้อซ้ำเป็นรอบที่สอง ไม่ผิดหวัง', 'Second time buying and no regrets.') },
]
// The two reviews the sample shopper already wrote, on the products of the older delivered order.
const mineSeed: { index: number; rating: number; at: string; text: Localized }[] = [
  { index: 7, rating: 5, at: '2026-09-18T20:10:00', text: p('คุ้มราคา ใช้มาสองสัปดาห์ยังดีอยู่', 'Worth the price and still good after two weeks.') },
  { index: 8, rating: 4, at: '2026-09-18T20:15:00', text: p('ของดี ส่งไว มีติดขัดเรื่องคู่มือนิดหน่อย', 'Good product and fast delivery; the manual could be clearer.') },
]

export const reviewKey = (orderId: string, productId: string) => `${orderId}:${productId}`

export function useReviews() {
  const { dataset } = useDataset()
  const { products } = dataset.ecommerce
  const [orders] = useOrderBook()
  const [written, setWritten] = useDemoState<Review[]>(PROTOTYPE_ID, 'reviews', [])
  const at = (i: number) => products[i % products.length]
  const seeded: Review[] = [
    ...mineSeed.flatMap((m, n) => (at(m.index) ? [{ id: `seed-mine-${n}`, productId: at(m.index).id, rating: m.rating, text: m.text, at: m.at, author: 'ฉัน', mine: true, orderId: 'ORD-0899' }] : [])),
    ...others.flatMap((o, n) => (at(o.index) ? [{ id: `seed-${n}`, productId: at(o.index).id, rating: o.rating, text: o.text, at: o.at, author: o.author }] : [])),
  ]
  const all = [...written, ...seeded].sort((a, b) => b.at.localeCompare(a.at))
  const mine = all.filter((r) => r.mine)
  const reviewed = new Set(mine.map((r) => reviewKey(r.orderId ?? '', r.productId)))
  // Products of delivered orders that have no review yet.
  const pending = orders
    .filter((o) => statusOf(o) === 'delivered')
    .flatMap((o) => o.lines.filter((l) => l.productId && !reviewed.has(reviewKey(o.id, l.productId))).map((l) => ({ key: reviewKey(o.id, l.productId!), order: o, line: l })))
  return {
    all,
    mine,
    pending,
    forProduct: (id: string) => all.filter((r) => r.productId === id),
    add: (r: Omit<Review, 'id' | 'at' | 'mine' | 'author'>) => setWritten([{ ...r, id: `r-${Date.now()}`, at: new Date().toISOString(), author: 'ฉัน', mine: true }, ...written]),
  }
}

export const averageRating = (list: Review[]) => (list.length ? list.reduce((n, r) => n + r.rating, 0) / list.length : 0)
