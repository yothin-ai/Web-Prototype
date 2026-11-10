import { useMemo } from 'react'
import { useDataset } from '../datasets/DatasetContext'
import type { Order } from '../prototypes/ecommerce/cart'
import { useDemoState } from '../state/demoState'
import { buildStock, type Movement, type Transfer } from './stock'

const NO_ORDERS: Order[] = []
const NO_MOVEMENTS: Movement[] = []
const NO_TRANSFERS: Transfer[] = []

// The Back Office keeps its movements under its own id; the orders belong to the storefront.
export const BACKOFFICE_ID = 'backoffice'
export const useMovements = () => useDemoState<Movement[]>(BACKOFFICE_ID, 'movements', NO_MOVEMENTS)
export const useTransfers = () => useDemoState<Transfer[]>(BACKOFFICE_ID, 'transfers', NO_TRANSFERS)

// The stock of every product of the chosen Dataset, worked out from the orders and the recorded movements.
export function useStock() {
  const { dataset } = useDataset()
  const products = dataset.ecommerce.products
  const [orders] = useDemoState<Order[]>('ecommerce', 'orders', NO_ORDERS)
  const [movements] = useMovements()
  const [transfers] = useTransfers()
  return useMemo(() => buildStock(products, orders, movements, transfers), [products, orders, movements, transfers])
}
