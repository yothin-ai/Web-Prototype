import type { Localized } from '../../i18n'

export const nf = {
  title: { th: 'ไม่พบหน้าที่ต้องการ', en: 'Page not found' },
  text: { th: 'หน้านี้อาจถูกย้ายหรือลบไปแล้ว ลองกลับหน้าหลักหรือดูสินค้าทั้งหมดของเรา', en: 'This page may have moved or been removed. Try the home page or browse all our products.' },
  home: { th: 'กลับหน้าหลัก', en: 'Back to home' },
  all: { th: 'ดูสินค้าทั้งหมด', en: 'Browse all products' },
} satisfies Record<string, Localized>
