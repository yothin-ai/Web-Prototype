import { Ecommerce } from './Ecommerce'
import type { PrototypeManifest } from '../types'

const manifest: PrototypeManifest = {
  id: 'ecommerce',
  order: 1,
  title: { th: 'E-Commerce', en: 'E-Commerce' },
  summary: { th: 'ร้านค้าออนไลน์ ตั้งแต่เลือกสินค้าจนดูคำสั่งซื้อย้อนหลัง', en: 'Online store from browsing to order history' },
  journey: [
    { th: 'เลือกสินค้า', en: 'Browse products' },
    { th: 'ตะกร้า', en: 'Cart' },
    { th: 'เช็กเอาต์', en: 'Checkout' },
    { th: 'หน้าสำเร็จ', en: 'Confirmation' },
    { th: 'ประวัติคำสั่งซื้อ', en: 'Order history' },
  ],
  status: 'ready',
  Component: Ecommerce,
}

export default manifest
