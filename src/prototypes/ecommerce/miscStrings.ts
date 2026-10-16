import type { Localized } from '../../i18n'

export const nf = {
  title: { th: 'ไม่พบหน้าที่ต้องการ', en: 'Page not found' },
  text: { th: 'หน้านี้อาจถูกย้ายหรือลบไปแล้ว ลองกลับหน้าหลักหรือดูสินค้าทั้งหมดของเรา', en: 'This page may have moved or been removed. Try the home page or browse all our products.' },
  home: { th: 'กลับหน้าหลัก', en: 'Back to home' },
  all: { th: 'ดูสินค้าทั้งหมด', en: 'Browse all products' },
} satisfies Record<string, Localized>

export const ck = {
  bannerTitle: { th: 'เว็บไซต์นี้ใช้คุกกี้', en: 'This site uses cookies' },
  bannerText: { th: 'เราใช้คุกกี้เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง วิเคราะห์การใช้งาน และนำเสนอสินค้าหรือโปรโมชันที่ตรงกับความสนใจของคุณ คุณสามารถเลือกยอมรับเฉพาะประเภทที่ต้องการได้', en: 'We use cookies to make the site work properly, to analyse how it is used and to show products and offers that fit your interests. You can accept only the kinds you want.' },
  readPolicy: { th: 'อ่านนโยบายคุกกี้', en: 'Read the cookie policy' },
  settings: { th: 'ตั้งค่าคุกกี้', en: 'Cookie settings' },
  rejectAll: { th: 'ปฏิเสธทั้งหมด', en: 'Reject all' },
  acceptAll: { th: 'ยอมรับทั้งหมด', en: 'Accept all' },
  regionLabel: { th: 'การแจ้งเรื่องคุกกี้', en: 'Cookie notice' },
  modalTitle: { th: 'ตั้งค่าคุกกี้', en: 'Cookie settings' },
  modalIntro: { th: 'เลือกประเภทคุกกี้ที่คุณยินยอม เปลี่ยนการตั้งค่าได้ทุกเมื่อจากลิงก์ที่ส่วนท้ายเว็บไซต์', en: 'Choose the cookies you agree to. You can change this at any time from the link in the page footer.' },
  necessary: { th: 'คุกกี้ที่จำเป็น', en: 'Necessary cookies' },
  necessaryText: { th: 'จำตะกร้า การเข้าสู่ระบบ และภาษา ปิดไม่ได้เพราะเว็บไซต์ต้องใช้', en: 'Remember your cart, sign-in and language. They cannot be turned off because the site needs them.' },
  alwaysOn: { th: 'เปิดเสมอ', en: 'Always on' },
  analytics: { th: 'คุกกี้เพื่อการวิเคราะห์', en: 'Analytics cookies' },
  analyticsText: { th: 'ช่วยให้เข้าใจว่าผู้เข้าชมใช้เว็บไซต์อย่างไร เพื่อปรับปรุงหน้าและเนื้อหา', en: 'Help us see how visitors use the site so we can improve pages and content.' },
  marketing: { th: 'คุกกี้เพื่อการตลาด', en: 'Marketing cookies' },
  marketingText: { th: 'ใช้แสดงโฆษณาและข้อเสนอที่ตรงกับความสนใจของคุณ', en: 'Used to show ads and offers that match your interests.' },
  save: { th: 'บันทึกการตั้งค่า', en: 'Save settings' },
  closeModal: { th: 'ปิดหน้าต่างตั้งค่าคุกกี้', en: 'Close cookie settings' },
  demoNote: { th: 'เดโมนี้ไม่มีคุกกี้วิเคราะห์หรือการตลาดจริง การเลือกเก็บไว้ในเบราว์เซอร์นี้เท่านั้น', en: 'This demo has no real analytics or marketing cookies; your choice stays in this browser.' },
} satisfies Record<string, Localized>

export const pm = {
  title: { th: 'โปรโมชั่นสำหรับคุณ', en: 'Promotions for you' },
  sub: { th: 'รวมแคมเปญ ส่วนลด และสิทธิพิเศษของร้านไว้ในที่เดียว', en: 'Every campaign, discount and perk in one place' },
  campaigns: { th: 'แคมเปญเด่น', en: 'Featured campaigns' },
  quick: { th: 'โปรโมชั่นทางลัด', en: 'Promotion shortcuts' },
  perks: { th: 'สิทธิพิเศษสำหรับคุณ', en: 'Perks for you' },
  open: { th: 'ดูแคมเปญ', en: 'See the campaign' },
  menuAll: { th: 'โปรโมชั่นทั้งหมด', en: 'All promotions' },
  menuCoupons: { th: 'คูปองส่วนลด', en: 'Discount coupons' },
  menuClub: { th: 'สิทธิประโยชน์สมาชิกคลับ', en: 'Club member perks' },
  navLabel: { th: 'โปรโมชั่นสำหรับคุณ', en: 'Promotions for you' },
  couponsText: { th: 'เก็บคูปองส่วนลดไว้ใช้ตอนชำระเงิน', en: 'Collect discount coupons for checkout' },
  clubText: { th: 'สะสมคะแนน แลกคูปอง และรับสิทธิตามระดับ', en: 'Earn points, redeem coupons and get tier perks' },
  servicesText: { th: 'ติดตั้งโดยช่างมืออาชีพ จองได้ทันที', en: 'Professional installation, bookable now' },
} satisfies Record<string, Localized>
