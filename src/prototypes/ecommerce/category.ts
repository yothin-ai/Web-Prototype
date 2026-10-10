import { useLocation, useNavigate } from 'react-router-dom'
import { useDataset } from '../../datasets/DatasetContext'
import type { MenuNode, Product } from '../../datasets/types'
import type { Localized } from '../../i18n'
import { PROTOTYPE_ID } from './cart'
import { useGoSearch } from './Storefront'

// A category page is addressed by positions in the menu tree, e.g. "3-1-2".
export const pathToSlug = (path: number[]) => path.join('-')
export const slugToPath = (slug: string | undefined) => (slug ?? '').split('-').map(Number)

export function nodeAt(menu: MenuNode[], path: number[]): MenuNode | undefined {
  let nodes: MenuNode[] | undefined = menu
  let node: MenuNode | undefined
  for (const i of path) {
    node = nodes?.[i]
    if (!node) return undefined
    nodes = node.children
  }
  return node
}

// Every node whose Thai or English name equals `label`, shallowest first.
export function findPathByLabel(menu: MenuNode[], label: string): number[] | null {
  const same = (n: MenuNode) => n.label.th === label || n.label.en === label
  for (let i = 0; i < menu.length; i++) if (same(menu[i])) return [i]
  for (let i = 0; i < menu.length; i++) {
    const subs = menu[i].children ?? []
    for (let j = 0; j < subs.length; j++) if (same(subs[j])) return [i, j]
  }
  for (let i = 0; i < menu.length; i++) {
    const subs = menu[i].children ?? []
    for (let j = 0; j < subs.length; j++) {
      const leaves = subs[j].children ?? []
      for (let k = 0; k < leaves.length; k++) if (same(leaves[k])) return [i, j, k]
    }
  }
  return null
}

const hash = (text: string) => {
  let h = 0
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
}

// The Dataset has far fewer products than the menu has items, so each item shows a fixed sample
// of 6 to 14 products picked from its position in the tree.
export function productsFor(products: Product[], path: number[]): Product[] {
  if (products.length === 0) return []
  const key = pathToSlug(path)
  const count = Math.min(products.length, 6 + (hash(key) % 9))
  const start = hash(`start-${key}`) % products.length
  return Array.from({ length: count }, (_, i) => products[(start + i) % products.length])
}

export function useCategoryLink() {
  const { search } = useLocation()
  return (path: number[]) => `/${PROTOTYPE_ID}/category/${pathToSlug(path)}${search}`
}

// Opens the category page whose name matches `label`, or searches for it when no category does.
export function useGoCategory() {
  const { dataset } = useDataset()
  const navigate = useNavigate()
  const link = useCategoryLink()
  const goSearch = useGoSearch()
  return (label: string) => {
    const path = findPathByLabel(dataset.ecommerce.home.menu, label)
    if (path) navigate(link(path))
    else goSearch(label)
  }
}

export const joinLabels = (nodes: MenuNode[] | undefined, t: (l: Localized) => string) => (nodes ?? []).map((n) => t(n.label)).join(', ')
