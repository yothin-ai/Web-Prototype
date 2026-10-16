import { readDemoState, useDemoState } from '../../state/demoState'
import { useDataset } from '../../datasets/DatasetContext'
import type { Product } from '../../datasets/types'
import type { Localized } from '../../i18n'

export const PROTOTYPE_ID = 'ecommerce'

// `selected` is false when the shopper un-ticks a line in the cart; a missing value counts as ticked.
export type CartLine = { productId: string; qty: number; selected?: boolean }
// Where an order stands. A missing status (orders made before statuses existed) counts as 'preparing'.
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
export type Order = {
  id: string
  placedAt: string
  customer: { name: string; phone: string; address: string }
  shippingId: string
  paymentId: string
  lines: { productId?: string; name: Localized; price: number; qty: number }[]
  subtotal: number
  shippingPrice: number
  total: number
  fulfilment?: 'pickup' | 'parcel'
  pickupMode?: 'counter' | 'locker'
  discount?: number
  couponTitle?: Localized
  // Paid from the wallet (already taken off `total`).
  walletUsed?: number
  points?: number
  installment?: { months: number; monthly: number }
  status?: OrderStatus
  etax?: boolean
  sample?: boolean
}

export const useEcommerce = () => {
  const { products, shippingMethods, paymentMethods } = useDataset().dataset.ecommerce
  const productById = (id: string) => products.find((p) => p.id === id)
  return { products, shippingMethods, paymentMethods, productById }
}

export const useCart = () => useDemoState<CartLine[]>(PROTOTYPE_ID, 'cart', [])
export const useOrders = () => useDemoState<Order[]>(PROTOTYPE_ID, 'orders', [])

export const useAddToCart = () => {
  const [, setCart] = useCart()
  return (productId: string, qty = 1) => {
    const cart = readDemoState<CartLine[]>(PROTOTYPE_ID, 'cart', [])
    const existing = cart.find((l) => l.productId === productId)
    setCart(existing ? cart.map((l) => (l === existing ? { ...l, qty: l.qty + qty } : l)) : [...cart, { productId, qty }])
  }
}

// The SKU shown for a product: the Dataset's own when it has one, else a stable made-up number.
export function skuOf(p: Product) {
  if (p.detail?.sku) return p.detail.sku
  let h = 0
  for (const ch of p.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return `SKU-${String(h).padStart(8, '0').slice(-8)}`
}

export const isTicked = (l: CartLine) => l.selected !== false

// What the cart page and checkout work with: lines that are ticked and still in stock.
export function useChosenCart() {
  const { productById } = useEcommerce()
  const { store } = useDataset().dataset.ecommerce
  const [cart] = useCart()
  const stockOf = (id: string) => productById(id)?.stock ?? store.stockDefault
  const available = (l: CartLine) => !!productById(l.productId) && stockOf(l.productId) > 0
  return { cart, stockOf, available, chosen: cart.filter((l) => isTicked(l) && available(l)) }
}

// Up to `limit` products to suggest: same categories as the cart first, then the Dataset's picks, then the rest.
export function useSuggestions(limit = 5) {
  const { products } = useEcommerce()
  const { home } = useDataset().dataset.ecommerce
  const [cart] = useCart()
  const inCart = new Set(cart.map((l) => l.productId))
  const cats = new Set(cart.map((l) => products.find((p) => p.id === l.productId)?.category.th))
  const pool = products.filter((p) => !inCart.has(p.id))
  const picks = home.recommendedIds.flatMap((id) => pool.filter((p) => p.id === id))
  return [...new Set([...pool.filter((p) => cats.has(p.category.th)), ...picks, ...pool])].slice(0, limit)
}

export const cartCount = (cart: CartLine[]) => cart.reduce((n, l) => n + l.qty, 0)
export const cartSubtotal = (cart: CartLine[], productById: (id: string) => Product | undefined) =>
  cart.reduce((sum, l) => sum + (productById(l.productId)?.price ?? 0) * l.qty, 0)

export const formatMoney = (amount: number, lang: string) =>
  new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-US', { style: 'currency', currency: 'THB', currencyDisplay: 'narrowSymbol', maximumFractionDigits: Number.isInteger(amount) ? 0 : 2 }).format(amount)

export const formatDate = (iso: string, lang: string) =>
  new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
