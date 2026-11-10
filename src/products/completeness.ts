import type { Product } from '../datasets/types'

// The parts of a product page the shop shows; a made product is complete when it has them all.
export const productParts = ['pictures', 'description', 'highlights', 'details', 'specs', 'install', 'warranty', 'caution'] as const
export type ProductPart = (typeof productParts)[number]

const filled = (text?: { th?: string; en?: string }) => !!(text?.th?.trim() || text?.en?.trim())

export function missingParts(p: Product): ProductPart[] {
  const d = p.detail
  const has: Record<ProductPart, boolean> = {
    pictures: (p.images?.length ?? 0) > 0,
    // The description is the name until the owner writes one.
    description: p.description.th !== p.name.th || p.description.en !== p.name.en,
    highlights: !!d?.highlights.length,
    details: !!(d?.general.length || d?.details.length),
    specs: !!d?.specs.length,
    install: filled(d?.install),
    warranty: filled(d?.warranty),
    caution: filled(d?.caution),
  }
  return productParts.filter((part) => !has[part])
}
