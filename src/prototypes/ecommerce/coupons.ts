import type { Coupon } from '../../datasets/types'
import { useDemoState } from '../../state/demoState'
import { PROTOTYPE_ID } from './cart'
import type { CouponCardState } from '../../ui'

// The shopper's coupon wallet: what has been collected and what has been spent. It starts with one usable and one expired coupon.
export type WalletEntry = { id: string; used?: boolean }

export function useCouponWallet() {
  const [wallet, setWallet] = useDemoState<WalletEntry[]>(PROTOTYPE_ID, 'coupons', [{ id: 'save100' }, { id: 'welcome50' }])
  const entryOf = (id: string) => wallet.find((w) => w.id === id)
  return {
    wallet,
    entryOf,
    claim: (id: string) => { if (!entryOf(id)) setWallet([...wallet, { id }]) },
    // Gives a spent coupon back (a coupon bought again with points).
    restore: (id: string) => setWallet(wallet.map((w) => (w.id === id ? { id } : w))),
    markUsed: (id: string) => setWallet(wallet.map((w) => (w.id === id ? { ...w, used: true } : w))),
  }
}

// How a coupon in the wallet stands: usable, spent or past its date.
export const walletState = (c: Coupon, entry: WalletEntry): CouponCardState => (entry.used ? 'used' : c.expired ? 'expired' : 'ready')
export const isUsable = (c: Coupon, entry: WalletEntry | undefined): entry is WalletEntry => !!entry && !entry.used && !c.expired

// 19 Oct 26 style date.
export const shortDate = (iso: string, lang: string) =>
  new Intl.DateTimeFormat(lang === 'th' ? 'th-TH-u-ca-gregory' : 'en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).format(new Date(iso))
