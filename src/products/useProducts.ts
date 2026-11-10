import { useCallback, useMemo } from 'react'
import { useDataset } from '../datasets/DatasetContext'
import type { Product } from '../datasets/types'
import { useDemoState } from '../state/demoState'

// Products made in the Back Office live in the browser, one list per Dataset, beside the Dataset's own products.
// They sit under the Back Office's id so that Reset clears them with everything else.
const OWNER = 'backoffice'
const NONE: Product[] = []
const NO_IDS: string[] = []
type Made = Record<string, Product[]>
const NO_MADE: Made = {}

export function useProducts() {
  const { dataset } = useDataset()
  const [made, setMade] = useDemoState<Made>(OWNER, 'madeProducts', NO_MADE)
  const [hidden, setHidden] = useDemoState<Record<string, string[]>>(OWNER, 'hiddenProducts', {})
  // The Dataset's own products: the made-up history, the curated shop pages and the reviews are built from these only.
  const seed = dataset.ecommerce.products
  const own = made[dataset.id] ?? NONE
  const hiddenIds = hidden[dataset.id] ?? NO_IDS
  const all = useMemo(() => (own.length ? [...seed, ...own] : seed), [seed, own])
  const shop = useMemo(() => (hiddenIds.length ? all.filter((p) => !hiddenIds.includes(p.id)) : all), [all, hiddenIds])
  const shopSeed = useMemo(() => (hiddenIds.length ? seed.filter((p) => !hiddenIds.includes(p.id)) : seed), [seed, hiddenIds])

  const save = useCallback((next: Product[]) => setMade({ ...made, [dataset.id]: next }), [made, setMade, dataset.id])
  const add = (product: Product) => save([...own, product])
  const update = (product: Product) => save(own.map((p) => (p.id === product.id ? product : p)))
  const remove = (id: string) => {
    save(own.filter((p) => p.id !== id))
    setHidden({ ...hidden, [dataset.id]: hiddenIds.filter((x) => x !== id) })
  }
  const setShown = (id: string, shown: boolean) => setHidden({ ...hidden, [dataset.id]: shown ? hiddenIds.filter((x) => x !== id) : [...hiddenIds.filter((x) => x !== id), id] })
  const isHidden = (id: string) => hiddenIds.includes(id)

  return { seed, all, shop, shopSeed, add, update, remove, setShown, isHidden }
}
