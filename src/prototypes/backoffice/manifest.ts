import { BackOffice } from './BackOffice'
import type { PrototypeManifest } from '../types'

const manifest: PrototypeManifest = {
  id: 'backoffice',
  order: 4,
  title: { th: 'ระบบหลังบ้าน', en: 'Back Office' },
  summary: { th: 'หลังบ้านของร้านค้าออนไลน์ ตั้งแต่รับคำสั่งซื้อไปจนถึงสต็อก ที่ตัวเลขเปลี่ยนตามหน้าร้านจริง', en: 'The online shop’s back office, from taking an order to stock, with figures that follow the storefront' },
  journey: [
    { th: 'ดูภาพรวมวันนี้', en: 'See today at a glance' },
    { th: 'รับคำสั่งซื้อใหม่จากหน้าร้าน', en: 'Pick up a new order from the storefront' },
    { th: 'จัดของและตัดสต็อก', en: 'Pack the goods and take them off stock' },
    { th: 'รับสินค้าเข้าเมื่อใกล้หมด', en: 'Receive goods when stock runs low' },
  ],
  status: 'ready',
  Component: BackOffice,
}

export default manifest
