import { useDataset } from '../../datasets/DatasetContext'
import { productPicture } from '../../assets/product'

// The shared picture for products of the hardware shop; the other datasets keep the lettered frame.
export function useProductPicture() {
  const { dataset } = useDataset()
  return dataset.id === 'hardware' ? productPicture : undefined
}
