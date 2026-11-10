import type { Localized } from '../../i18n'
import { b, supplierNames } from './strings'

// Four made-up suppliers. The phone numbers and emails are placeholders, never real contact details.
export type Supplier = { id: string; name: Localized; contact: Localized; phone: string; email: string; city: Localized }

export const suppliers: Supplier[] = [
  { id: 's1', name: supplierNames.s1, contact: b.supContact1, phone: '02-000-0001', email: 'supplier-a@example.com', city: b.cityBangkok },
  { id: 's2', name: supplierNames.s2, contact: b.supContact2, phone: '02-000-0002', email: 'supplier-b@example.com', city: b.cityChonburi },
  { id: 's3', name: supplierNames.s3, contact: b.supContact3, phone: '02-000-0003', email: 'supplier-c@example.com', city: b.cityChiangmai },
  { id: 's4', name: supplierNames.s4, contact: b.supContact4, phone: '02-000-0004', email: 'supplier-d@example.com', city: b.cityKhonkaen },
]
