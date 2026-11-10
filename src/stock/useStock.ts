import { useMemo } from 'react'
import { useDataset } from '../datasets/DatasetContext'
import type { Order } from '../prototypes/ecommerce/cart'
import { useDemoState } from '../state/demoState'
import { buildStock, type Movement } from './stock'

const NO_ORDERS: Order[] = []
const NO_MOVEMENTS: Movement[] = []

// The Back Office keeps its movements under its own id; the orders belong to the storefront.
export const BACKOFFICE_ID = 'backoffice'
export const useMovements = () => useDemoState<Movement[]>(BACKOFFICE_ID, 'movements', NO_MOVEMENTS)

// The stock of every product of the chosen Dataset, worked out from the orders and the recorded movements.
export function useStock() {
  const { dataset } = useDataset()
  const products = dataset.ecommerce.products
  const [orders] = useDemoState<Order[]>('ecommerce', 'orders', NO_ORDERS)
  const [movements] = useMovements()
  return useMemo(() => buildStock(products, orders, movements), [products, orders, movements])
}
