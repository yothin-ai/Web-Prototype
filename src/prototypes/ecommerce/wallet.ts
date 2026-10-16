import type { Localized } from '../../i18n'
import { useDemoState } from '../../state/demoState'
import { PROTOTYPE_ID } from './cart'

// Money the shop holds for the shopper (refunds and store deposits) that can pay for a later order.
export type WalletCredit = { id: string; at: string; title: Localized; amount: number; remaining: number }
export type WalletDebit = { id: string; at: string; orderId: string; amount: number }
type WalletState = { credits: WalletCredit[]; debits: WalletDebit[] }

const p = (th: string, en: string): Localized => ({ th, en })
const start: WalletState = {
  credits: [
    { id: 'w-refund', at: '2026-10-05T13:30:00', title: p('เงินคืนจากการคืนสินค้า ORD-0902', 'Refund for the return on ORD-0902'), amount: 900, remaining: 900 },
    { id: 'w-deposit', at: '2026-09-22T10:00:00', title: p('เงินมัดจำสาขา สาขาตัวอย่าง ปทุมธานี', 'Store deposit, sample branch Pathum Thani'), amount: 300, remaining: 300 },
  ],
  debits: [],
}

export function useWallet() {
  const [state, setState] = useDemoState<WalletState>(PROTOTYPE_ID, 'wallet', start)
  const balance = state.credits.reduce((n, c) => n + c.remaining, 0)
  return {
    credits: state.credits,
    debits: state.debits,
    balance,
    readyCount: state.credits.filter((c) => c.remaining > 0).length,
    // Pays `amount` from the oldest credits first and records what it paid for.
    spend: (amount: number, orderId: string) => {
      let left = amount
      const credits = [...state.credits].reverse().map((c) => {
        const take = Math.min(c.remaining, left)
        left -= take
        return { ...c, remaining: c.remaining - take }
      }).reverse()
      setState({ credits, debits: [{ id: `d-${Date.now()}`, at: new Date().toISOString(), orderId, amount }, ...state.debits] })
    },
  }
}
