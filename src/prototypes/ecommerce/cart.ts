import { readDemoState, useDemoState } from '../../state/demoState'
import { useSettings } from '../../settings/useSettings'
import { useProducts } from '../../products/useProducts'
import { useDataset } from '../../datasets/DatasetContext'
import { useStock } from '../../stock/useStock'
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
  // The coupon's id, so the Back Office can count how often it was used.
  couponId?: string
  // Paid from the wallet (already taken off `total`).
  walletUsed?: number
  points?: number
  installment?: { months: number; monthly: number }
  status?: OrderStatus
  etax?: boolean
  sample?: boolean
  // Where the goods come from: a branch for pick-up, the central warehouse for a parcel (see src/stock).
  stockLoc?: string
  // Set by the Back Office when the goods are taken off the shelf.
  packed?: boolean
  packedAt?: string
  // When the money came in (online: when paid; at the branch or on delivery: when handed over).
  paidAt?: string
  // Who the tax invoice is for, when one was asked for at checkout.
  taxBuyer?: { id: string; name: string }
}

// `products` is the Dataset's own products the shop still shows, for the curated pages that pick from a fixed list;
// `catalog` adds the products made in the Back Office, for the full list and search; `productById` finds any of them.
export const useEcommerce = () => {
  const { shippingMethods, paymentMethods } = useDataset().dataset.ecommerce
  const { all, shop, shopSeed } = useProducts()
  const { shippingOff } = useSettings()
  const productById = (id: string) => all.find((p) => p.id === id)
  // `shippingMethods` are the ones the shop has switched on, to choose from; `allShippingMethods` finds the one an old order used.
  return { products: shopSeed, catalog: shop, shippingMethods: shippingMethods.filter((m) => !shippingOff.includes(m.id)), allShippingMethods: shippingMethods, paymentMethods, productById }
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
  if (p.sku) return p.sku
  let h = 0
  for (const ch of p.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return `SKU-${String(h).padStart(8, '0').slice(-8)}`
}

export const isTicked = (l: CartLine) => l.selected !== false

// What the cart page and checkout work with: lines that are ticked and still in stock. A line asks for no more than
// the stock has, counting every place that holds the product.
export function useChosenCart() {
  const { productById } = useEcommerce()
  const stock = useStock()
  const [cart] = useCart()
  const stockOf = (id: string) => Math.max(0, stock.total(id).available)
  const available = (l: CartLine) => !!productById(l.productId) && stockOf(l.productId) > 0
  const chosen = cart.filter((l) => isTicked(l) && available(l)).map((l) => ({ ...l, qty: Math.min(l.qty, stockOf(l.productId)) }))
  return { cart, stockOf, available, chosen }
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
