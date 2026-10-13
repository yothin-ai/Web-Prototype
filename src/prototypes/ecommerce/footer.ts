import type { Localized } from '../../i18n'
import type { IconName } from '../../ui'

// Footer wording shared by every dataset. Contact details are placeholders on purpose.
export const f = {
  // Icons for the lists below, in the same order.
  perkIcons: ['store', 'truck', 'returns', 'shield', 'headset'] as IconName[],
  benefitIcons: ['store', 'headset', 'shield', 'truck', 'returns'] as IconName[],
  contactIcons: ['phone', 'mail', 'pin'] as IconName[],
  perks: [
    { title: { th: 'Click & Collect', en: 'Click & Collect' }, text: { th: 'สั่งออนไลน์ รับที่สาขา', en: 'Order online, collect in store' } },
    { title: { th: 'จัดส่งทั่วประเทศ', en: 'Nationwide delivery' }, text: { th: 'บริการจัดส่งรวดเร็ว', en: 'Fast delivery service' } },
    { title: { th: 'คืนสินค้าง่าย', en: 'Easy returns' }, text: { th: 'คืนได้ตามเงื่อนไขของร้าน', en: 'Returns under the store’s terms' } },
    { title: { th: 'ชำระเงินปลอดภัย', en: 'Secure payment' }, text: { th: 'หลากหลายช่องทาง', en: 'Many ways to pay' } },
    { title: { th: 'Call Center 0-0000-0000', en: 'Call Center 0-0000-0000' }, text: { th: 'ทุกวัน 08:00 - 20:00 น.', en: 'Every day 08:00 - 20:00' } },
  ],
  contact: [
    { th: 'Call Center 0-0000-0000', en: 'Call Center 0-0000-0000' },
    { th: 'hello@example.com', en: 'hello@example.com' },
    { th: 'สำนักงานใหญ่ (ตัวอย่าง): 000 หมู่ 0 ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดตัวอย่าง 00000', en: 'Head office (sample): 000 Moo 0, Sample Subdistrict, Sample District, Sample Province 00000' },
  ],
  aboutTitle: { th: 'เกี่ยวกับร้านของเรา', en: 'About us' },
  about: [
    { th: 'รู้จักกับร้านของเรา', en: 'Get to know us' },
    { th: 'นักลงทุนสัมพันธ์', en: 'Investor relations' },
    { th: 'ติดต่อนักลงทุนสัมพันธ์', en: 'Contact investor relations' },
    { th: 'สมัครงาน', en: 'Careers' },
    { th: 'ลงทะเบียนเป็นผู้ค้า', en: 'Become a seller' },
    { th: 'กิจกรรมด้านความยั่งยืน', en: 'Sustainability activities' },
    { th: 'ข่าวสารและกิจกรรม', en: 'News and events' },
  ] as Localized[],
  // Where each footer link goes, in the same order as the lists above. 'soon' is the not-yet-built page.
  aboutTo: ['info/about', 'info/investor', 'info/investor-contact', 'info/careers', 'info/seller', 'info/sustainability', 'info/news'],
  helpTo: ['info/faq', 'info/howto-order', 'info/click-collect', 'info/howto-payments', 'stores', 'info/installment', 'soon'],
  legalTo: ['info/privacy', 'info/cookie', 'info/terms', 'info/returns', 'info/cctv', 'info/privacy-request'],
  complaintTo: 'info/complaint',
  helpTitle: { th: 'คำถามและข้อสงสัย', en: 'Questions' },
  help: [
    { th: 'คำถามที่พบบ่อย', en: 'Frequently asked questions' },
    { th: 'วิธีการสั่งซื้อสินค้า', en: 'How to order' },
    { th: 'การรับสินค้าด้วยตนเอง', en: 'Collect in store' },
    { th: 'วิธีการชำระเงิน', en: 'How to pay' },
    { th: 'ตำแหน่งสาขา', en: 'Store locations' },
    { th: 'ผ่อนชำระบัตรเครดิต', en: 'Credit card instalments' },
    { th: 'บริการช่าง', en: 'Technician services' },
  ] as Localized[],
  accountTitle: { th: 'บัญชีของฉัน', en: 'My account' },
  signInMember: { th: 'เข้าสู่ระบบ / สมาชิก', en: 'Sign in / Member' },
  profile: { th: 'ข้อมูลส่วนตัว', en: 'Profile' },
  orders: { th: 'รายการสั่งซื้อ', en: 'My orders' },
  addresses: { th: 'ที่อยู่จัดส่งสินค้า', en: 'Delivery addresses' },
  coupons: { th: 'คูปอง', en: 'Coupons' },
  certTitle: { th: 'เครื่องหมายรับรองร้านค้าออนไลน์', en: 'Online store certification' },
  hoursNote: { th: 'สาขา: เปิดให้บริการทุกวัน · เวลาทำการ', en: 'Stores: open every day · opening hours' },
  complaint: { th: 'ร้องเรียนเกี่ยวกับบริการ', en: 'Service complaints' },
  legal: [
    { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy policy' },
    { th: 'นโยบายคุกกี้', en: 'Cookie policy' },
    { th: 'ข้อตกลงและเงื่อนไข', en: 'Terms and conditions' },
    { th: 'เงื่อนไขการเปลี่ยน – คืนสินค้า', en: 'Exchange and return terms' },
    { th: 'นโยบายความเป็นส่วนตัวในการใช้กล้องวงจรปิด', en: 'CCTV privacy policy' },
    { th: 'คำร้องขอใช้สิทธิ', en: 'Data rights requests' },
  ] as Localized[],
  copyright: { th: 'สงวนลิขสิทธิ์ (ตัวอย่าง)', en: 'All rights reserved (sample)' },
  benefits: [
    { title: { th: 'CLICK & COLLECT', en: 'CLICK & COLLECT' }, text: { th: 'คลิกแอนด์คอลเลกต์', en: 'Click and collect' } },
    { title: { th: 'CALL CENTER', en: 'CALL CENTER' }, text: { th: 'ศูนย์บริการลูกค้า 0-0000-0000', en: 'Customer service 0-0000-0000' } },
    { title: { th: 'SECURE PAYMENT', en: 'SECURE PAYMENT' }, text: { th: 'ชำระเงินง่ายและปลอดภัย', en: 'Easy and secure payment' } },
    { title: { th: 'DELIVERY SERVICE', en: 'DELIVERY SERVICE' }, text: { th: 'บริการจัดส่ง', en: 'Delivery service' } },
    { title: { th: 'EASY RETURN', en: 'EASY RETURN' }, text: { th: 'บริการคืนสินค้า', en: 'Easy returns' } },
  ],
}
