import { useDemoState } from '../../state/demoState'
import { useDataset } from '../../datasets/DatasetContext'
import type { Product } from '../../datasets/types'
import type { Localized } from '../../i18n'

export const PROTOTYPE_ID = 'ecommerce'

export type CartLine = { productId: string; qty: number }
export type Order = {
  id: string
  placedAt: string
  customer: { name: string; phone: string; address: string }
  shippingId: string
  paymentId: string
  lines: { name: Localized; price: number; qty: number }[]
  subtotal: number
  shippingPrice: number
  total: number
}

export const useEcommerce = () => {
  const { products, shippingMethods, paymentMethods } = useDataset().dataset.ecommerce
  const productById = (id: string) => products.find((p) => p.id === id)
  return { products, shippingMethods, paymentMethods, productById }
}

export const useCart = () => useDemoState<CartLine[]>(PROTOTYPE_ID, 'cart', [])
export const useOrders = () => useDemoState<Order[]>(PROTOTYPE_ID, 'orders', [])

export const cartCount = (cart: CartLine[]) => cart.reduce((n, l) => n + l.qty, 0)
export const cartSubtotal = (cart: CartLine[], productById: (id: string) => Product | undefined) =>
  cart.reduce((sum, l) => sum + (productById(l.productId)?.price ?? 0) * l.qty, 0)

export const formatMoney = (amount: number, lang: string) =>
  new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-US', { style: 'currency', currency: 'THB', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(amount)

export const formatDate = (iso: string, lang: string) =>
  new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
