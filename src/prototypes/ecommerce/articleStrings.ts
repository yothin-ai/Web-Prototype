import type { Localized } from '../../i18n'

export const w = {
  share: { th: 'แชร์', en: 'Share' },
  copied: { th: 'คัดลอกลิงก์แล้ว', en: 'Link copied' },
  copyFailed: { th: 'คัดลอกลิงก์ไม่ได้ในเบราว์เซอร์นี้', en: 'This browser could not copy the link' },
  sampleNote: { th: 'บทความนี้เป็นข้อความตัวอย่างสำหรับเดโม ไม่ใช่เนื้อหาจริง', en: 'This article is sample text for the demo, not real content.' },
  relatedTitle: { th: 'สินค้าที่เกี่ยวข้อง', en: 'Related products' },
  relatedSub: { th: 'สินค้าคุณภาพดี ราคาดี พร้อมจัดส่งถึงบ้านคุณ', en: 'Good quality, good prices, delivered to your door' },
  relatedRow: { th: 'แถวสินค้าที่เกี่ยวข้อง', en: 'Related products row' },
  allCategories: { th: 'ทั้งหมด', en: 'All' },
  categoriesLabel: { th: 'หมวดบทความ', en: 'Article groups' },
  listIntro: { th: 'ไอเดียและความรู้เพื่อบ้านที่น่าอยู่ (ข้อความตัวอย่าง)', en: 'Ideas and know-how for a pleasant home (sample text)' },
  empty: { th: 'ยังไม่มีบทความในหมวดนี้', en: 'No articles in this group yet' },
} satisfies Record<string, Localized>
