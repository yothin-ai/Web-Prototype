import { useMemo } from 'react'
import type { Localized } from '../../i18n'
import { useDemoState } from '../../state/demoState'
import { b, supplierNames } from './strings'

// Four made-up suppliers. The phone numbers and emails are placeholders, never real contact details.
export type Supplier = {
  id: string
  name: Localized
  contact: Localized
  phone: string
  email: string
  city: Localized
  address?: string
  // Days to pay after the goods arrive.
  termsDays?: number
  // Made in the Back Office; the four made-up ones are not.
  custom?: boolean
  // Left out of the choices for a new order or receipt; its history stays.
  inactive?: boolean
}

export const suppliers: Supplier[] = [
  { id: 's1', name: supplierNames.s1, contact: b.supContact1, phone: '02-000-0001', email: 'supplier-a@example.com', city: b.cityBangkok },
  { id: 's2', name: supplierNames.s2, contact: b.supContact2, phone: '02-000-0002', email: 'supplier-b@example.com', city: b.cityChonburi },
  { id: 's3', name: supplierNames.s3, contact: b.supContact3, phone: '02-000-0003', email: 'supplier-c@example.com', city: b.cityChiangmai },
  { id: 's4', name: supplierNames.s4, contact: b.supContact4, phone: '02-000-0004', email: 'supplier-d@example.com', city: b.cityKhonkaen },
]

// The suppliers the Viewer made and the changes made to the four made-up ones live in the browser, under the Back Office's id so a Reset clears them.
const OWNER = 'backoffice'
const NO_MADE: Supplier[] = []
const NO_EDITS: Record<string, Partial<Supplier>> = {}

export function useSuppliers() {
  const [made, setMade] = useDemoState<Supplier[]>(OWNER, 'madeSuppliers', NO_MADE)
  const [edits, setEdits] = useDemoState<Record<string, Partial<Supplier>>>(OWNER, 'supplierEdits', NO_EDITS)
  const all = useMemo(() => [...suppliers, ...made].map((s) => ({ ...s, ...edits[s.id] })), [made, edits])
  const active = useMemo(() => all.filter((s) => !s.inactive), [all])
  const byId = (id: string) => all.find((s) => s.id === id)
  const nameOf = (id: string): Localized => byId(id)?.name ?? { th: id, en: id }
  const add = (supplier: Supplier) => setMade([...made, supplier])
  // A made supplier is rewritten; a made-up one keeps its original and carries the changes beside it.
  const update = (id: string, patch: Partial<Supplier>) => {
    if (made.some((s) => s.id === id)) setMade(made.map((s) => (s.id === id ? { ...s, ...patch } : s)))
    else setEdits({ ...edits, [id]: { ...edits[id], ...patch } })
  }
  const remove = (id: string) => setMade(made.filter((s) => s.id !== id))
  return { all, active, byId, nameOf, add, update, remove }
}
