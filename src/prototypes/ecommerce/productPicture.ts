import { useDataset } from '../../datasets/DatasetContext'
import { productPicture } from '../../assets/product'
import { useProducts } from '../../products/useProducts'

// The picture of a product: its own first picture when it has one (a product made in the Back Office), else the shared
// picture of the hardware shop; the other datasets keep the lettered frame.
export function useProductPicture() {
  const { dataset } = useDataset()
  const { all } = useProducts()
  const shared = dataset.id === 'hardware' ? productPicture : undefined
  return (productId?: string) => all.find((p) => p.id === productId)?.images?.[0] ?? shared
}
