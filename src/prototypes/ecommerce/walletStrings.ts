import type { Localized } from '../../i18n'

export const wl = {
  title: { th: 'Wallet ของฉัน', en: 'My wallet' },
  label: { th: 'WALLET', en: 'WALLET' },
  caption: { th: 'มูลค่าที่พร้อมใช้', en: 'Available balance' },
  unit: { th: 'บาท', en: 'baht' },
  ready: { th: 'รายการพร้อมใช้', en: 'credits ready' },
  listTitle: { th: 'Wallet ของฉัน', en: 'My wallet' },
  items: { th: 'รายการ', en: 'items' },
  emptyTitle: { th: 'ยังไม่มียอดมัดจำคงเหลือ', en: 'No deposit balance yet' },
  emptyText: { th: 'เมื่อมีเงินมัดจำจากรายการที่สาขา เช่น การคืนสินค้า จะแสดงที่นี่', en: 'Deposits from store transactions, such as a return, will appear here' },
  statusReady: { th: 'พร้อมใช้', en: 'Ready' },
  statusUsed: { th: 'ใช้แล้ว', en: 'Used' },
  of: { th: 'จาก', en: 'of' },
  usedTitle: { th: 'ประวัติการใช้', en: 'Usage history' },
  usedFor: { th: 'ใช้ชำระคำสั่งซื้อ', en: 'Used to pay order' },
  howTitle: { th: 'ใช้ Wallet ได้อย่างไร', en: 'How to use your wallet' },
  howText: { th: 'เปิดสวิตช์ "ใช้ Wallet" ในหน้าชำระเงิน ระบบจะหักยอดเท่าที่ใช้ได้ โดยต้องเหลือชำระอย่างน้อย ฿1', en: 'Turn on "Use wallet" at checkout; the balance is applied as far as it goes, leaving at least ฿1 to pay.' },
  switchLabel: { th: 'ใช้ Wallet', en: 'Use wallet' },
  switchHint: { th: 'ยอดคงเหลือ', en: 'Balance' },
  switchNone: { th: 'ยังไม่มียอดใน Wallet', en: 'Your wallet is empty' },
  summaryLine: { th: 'ใช้ Wallet', en: 'Wallet' },
} satisfies Record<string, Localized>
