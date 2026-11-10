import { useMemo } from 'react'
import { useDataset } from '../datasets/DatasetContext'
import type { Order } from '../prototypes/ecommerce/cart'
import { useDemoState } from '../state/demoState'
import { buildStock, type Movement, type PurchaseOrder, type Transfer } from './stock'

const NO_ORDERS: Order[] = []
const NO_MOVEMENTS: Movement[] = []
const NO_TRANSFERS: Transfer[] = []
const NO_PURCHASES: PurchaseOrder[] = []

// The Back Office keeps its movements under its own id; the orders belong to the storefront.
export const BACKOFFICE_ID = 'backoffice'
export const useMovements = () => useDemoState<Movement[]>(BACKOFFICE_ID, 'movements', NO_MOVEMENTS)
export const usePurchases = () => useDemoState<PurchaseOrder[]>(BACKOFFICE_ID, 'purchases', NO_PURCHASES)
export const useTransfers = () => useDemoState<Transfer[]>(BACKOFFICE_ID, 'transfers', NO_TRANSFERS)

// The stock of every product of the chosen Dataset, worked out from the orders and the recorded movements.
export function useStock() {
  const { dataset } = useDataset()
  const products = dataset.ecommerce.products
  const [orders] = useDemoState<Order[]>('ecommerce', 'orders', NO_ORDERS)
  const [movements] = useMovements()
  const [transfers] = useTransfers()
  const [purchases] = usePurchases()
  return useMemo(() => buildStock(products, orders, movements, transfers, purchases), [products, orders, movements, transfers, purchases])
}
