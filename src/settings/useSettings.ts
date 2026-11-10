import { useMemo } from 'react'
import type { VatPolicy } from '../accounting/accounting'
import { useDemoState } from '../state/demoState'

// What the shop owner set in the Back Office. It lives in the browser under the Back Office's id, so a Reset puts the defaults back.
export type ShopInfo = { name: string; address: string; phone: string; taxId: string; branch: string }
// From the moment `from`, the shop charges `rate` (a fraction) and is registered for VAT or not. Steps are only ever added, so a record keeps the rate of its own date.
export type VatStep = { from: string; rate: number; registered: boolean }
export type Settings = { shop: ShopInfo; vat: VatStep[]; shippingOff: string[]; paymentOff: string[] }

export const DEFAULT_RATE = 0.07
const FIRST: VatStep = { from: '1970-01-01T00:00:00.000Z', rate: DEFAULT_RATE, registered: true }
const DEFAULTS: Settings = { shop: { name: '', address: '', phone: '', taxId: '', branch: '' }, vat: [FIRST], shippingOff: [], paymentOff: [] }

export function useSettings() {
  const [stored, setStored] = useDemoState<Settings>('backoffice', 'settings', DEFAULTS)
  const settings = stored
  const steps = useMemo(() => [...settings.vat].sort((a, b) => a.from.localeCompare(b.from)), [settings.vat])
  const stepAt = (at: string) => [...steps].reverse().find((s) => s.from <= at) ?? FIRST
  const policy: VatPolicy = useMemo(() => ({ rateAt: (at: string) => { const s = [...steps].reverse().find((x) => x.from <= at) ?? FIRST; return s.registered ? s.rate : 0 } }), [steps])
  const now = stepAt(new Date().toISOString())
  const patch = (next: Partial<Settings>) => setStored({ ...settings, ...next })
  return {
    shop: settings.shop,
    steps,
    vatNow: { rate: now.rate, registered: now.registered },
    policy,
    shippingOff: settings.shippingOff,
    paymentOff: settings.paymentOff,
    setShop: (shop: ShopInfo) => patch({ shop }),
    // A new step from this moment; the older ones stay as they were.
    setVat: (rate: number, registered: boolean) => patch({ vat: [...settings.vat, { from: new Date().toISOString(), rate, registered }] }),
    setShippingOff: (shippingOff: string[]) => patch({ shippingOff }),
    setPaymentOff: (paymentOff: string[]) => patch({ paymentOff }),
  }
}
