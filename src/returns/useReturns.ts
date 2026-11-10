import type { Localized } from '../i18n'
import { useDemoState } from '../state/demoState'

// Goods a shopper gave back after an order was handed over. A return refunds money, may put the goods back on a shelf, and has a credit note.
export type ReturnReason = 'defective' | 'changed' | 'wrong' | 'other'
export type RefundMethod = 'cash' | 'transfer' | 'wallet'
export type ReturnLine = { lineIndex: number; productId?: string; name: Localized; price: number; qty: number }
export type Return = {
  id: string
  creditNo: string
  orderId: string
  at: string
  lines: ReturnLine[]
  reason: ReturnReason
  note?: string
  // 'restock': the goods go back on the shelf of `restockLoc`; 'discard': they are written off.
  destination: 'restock' | 'discard'
  restockLoc: string
  method: RefundMethod
  // What is given back, VAT included.
  amount: number
}

const NO_RETURNS: Return[] = []
export const useReturns = () => useDemoState<Return[]>('backoffice', 'returns', NO_RETURNS)

// How many pieces of an order's line were already given back.
export const returnedQty = (returns: Return[], orderId: string, lineIndex: number) =>
  returns.filter((r) => r.orderId === orderId).reduce((n, r) => n + r.lines.filter((l) => l.lineIndex === lineIndex).reduce((m, l) => m + l.qty, 0), 0)
