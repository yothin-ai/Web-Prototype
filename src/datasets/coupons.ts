import type { Localized } from '../i18n'
import type { Coupon } from './types'

const p = (th: string, en: string): Localized => ({ th, en })
const base = { starts: '2026-10-01', expires: '2026-12-31' }

// Sample coupons shared by every dataset: money, percent and free-delivery coupons for the web shop, and till coupons for stores.
export const sampleCoupons: Coupon[] = [
  { id: 'save1000', title: p('ลด ฿1,000', '฿1,000 off'), detail: p('ช้อปครบ ฿15,000 รับส่วนลด ฿1,000', 'Spend ฿15,000, get ฿1,000 off'), kind: 'amount', value: 1000, minSpend: 15000, channel: 'online', memberOnly: true, ...base },
  { id: 'save600', title: p('ลด ฿600', '฿600 off'), detail: p('ช้อปครบ ฿8,000 รับส่วนลด ฿600', 'Spend ฿8,000, get ฿600 off'), kind: 'amount', value: 600, minSpend: 8000, channel: 'online', ...base },
  { id: 'save350', title: p('ลด ฿350', '฿350 off'), detail: p('ช้อปครบ ฿5,000 รับส่วนลด ฿350', 'Spend ฿5,000, get ฿350 off'), kind: 'amount', value: 350, minSpend: 5000, channel: 'online', full: true, ...base },
  { id: 'save100', title: p('ลด ฿100', '฿100 off'), detail: p('เมื่อซื้อครบ ฿500', 'When you spend ฿500'), kind: 'amount', value: 100, minSpend: 500, channel: 'online', ...base },
  { id: 'save5', title: p('ลด 5%', '5% off'), detail: p('สูงสุด ฿300 เมื่อซื้อครบ ฿1,000', 'Up to ฿300 when you spend ฿1,000'), kind: 'percent', value: 5, cap: 300, minSpend: 1000, channel: 'online', ...base },
  { id: 'freeship', title: p('ส่งฟรี', 'Free delivery'), detail: p('ฟรีค่าจัดส่งเมื่อซื้อครบ ฿800 (เฉพาะจัดส่งพัสดุ)', 'Free delivery when you spend ฿800 (parcel delivery only)'), kind: 'freeship', value: 0, minSpend: 800, channel: 'online', ...base },
  { id: 'welcome50', title: p('ลด ฿50', '฿50 off'), detail: p('คูปองต้อนรับสมาชิกใหม่ เมื่อซื้อครบ ฿300', 'Welcome coupon for new members, when you spend ฿300'), kind: 'amount', value: 50, minSpend: 300, channel: 'online', starts: '2026-08-01', expires: '2026-09-30', expired: true },
  { id: 'store100', title: p('ลด ฿100', '฿100 off'), detail: p('ใช้ที่หน้าร้าน เมื่อซื้อครบ ฿1,000', 'Use in store when you spend ฿1,000'), kind: 'amount', value: 100, minSpend: 1000, channel: 'store', ...base },
  { id: 'store5', title: p('ลด 5%', '5% off'), detail: p('ใช้ที่หน้าร้าน สูงสุด ฿200 เมื่อซื้อครบ ฿2,000', 'Use in store, up to ฿200 when you spend ฿2,000'), kind: 'percent', value: 5, cap: 200, minSpend: 2000, channel: 'store', memberOnly: true, ...base },
  { id: 'store50', title: p('ลด ฿50', '฿50 off'), detail: p('ใช้ที่หน้าร้าน เมื่อซื้อครบ ฿300', 'Use in store when you spend ฿300'), kind: 'amount', value: 50, minSpend: 300, channel: 'store', ...base },
]
