import type { Localized } from '../../i18n'
import { cctvSections, cookieSections, privacyRequestSections, privacySections, returnsSections, termsSections } from './legalContent'

export type InfoSection = { heading?: Localized; paragraphs?: Localized[]; faq?: { q: Localized; a: Localized }[] }
export type InfoPageDef = { slug: string; group: 'about' | 'help' | 'legal'; title: Localized; sections: InfoSection[]; legal?: boolean }

const p = (th: string, en: string): Localized => ({ th, en })

// Sample text for the information pages. It is written for the demo: nothing here is a real policy or promise.
export const infoPages: InfoPageDef[] = [
  { slug: 'about', group: 'about', title: p('รู้จักกับร้านของเรา', 'Get to know us'), sections: [
    { paragraphs: [p('เราเป็นร้านวัสดุและของตกแต่งบ้านตัวอย่าง ที่รวมสินค้าหลายหมวดไว้ในที่เดียว ทั้งออนไลน์และหน้าร้าน', 'We are a sample home and building supplies store that brings many categories together, online and in store.'), p('ข้อความในหน้านี้เป็นตัวอย่างสำหรับเดโมเท่านั้น', 'The text on this page is sample content for the demo only.')] },
    { heading: p('วิสัยทัศน์', 'Vision'), paragraphs: [p('ทำให้การสร้างและตกแต่งบ้านเป็นเรื่องง่ายสำหรับทุกคน', 'To make building and decorating a home easy for everyone.')] },
    { heading: p('พันธกิจ', 'Mission'), paragraphs: [p('คัดสินค้าคุณภาพ ราคายุติธรรม และบริการที่ไว้ใจได้', 'Choose quality products, fair prices and dependable service.')] },
  ] },
  { slug: 'investor', group: 'about', title: p('นักลงทุนสัมพันธ์', 'Investor relations'), sections: [
    { paragraphs: [p('ส่วนนี้จะรวมรายงานประจำปี งบการเงิน และข่าวสำหรับผู้ถือหุ้น (ข้อความตัวอย่าง)', 'This section would hold annual reports, financial statements and shareholder news (sample text).')] },
  ] },
  { slug: 'investor-contact', group: 'about', title: p('ติดต่อนักลงทุนสัมพันธ์', 'Contact investor relations'), sections: [
    { paragraphs: [p('ส่งคำถามถึงทีมนักลงทุนสัมพันธ์ได้ที่ ir@example.com หรือโทร 0-0000-0000 (ข้อมูลตัวอย่าง)', 'Send questions to the investor relations team at ir@example.com or call 0-0000-0000 (sample details).')] },
  ] },
  { slug: 'careers', group: 'about', title: p('สมัครงาน', 'Careers'), sections: [
    { paragraphs: [p('เรารับสมัครพนักงานหลายตำแหน่ง ทั้งหน้าร้านและสำนักงาน (ข้อความตัวอย่าง)', 'We hire for many roles, in stores and in the office (sample text).')] },
    { heading: p('ตำแหน่งตัวอย่าง', 'Sample roles'), paragraphs: [p('พนักงานขาย · เจ้าหน้าที่คลังสินค้า · นักออกแบบ UX · เจ้าหน้าที่บัญชี', 'Sales associate · Warehouse officer · UX designer · Accountant')] },
  ] },
  { slug: 'seller', group: 'about', title: p('ลงทะเบียนเป็นผู้ค้า', 'Become a seller'), sections: [
    { paragraphs: [p('ผู้ผลิตและผู้จัดจำหน่ายที่สนใจนำสินค้ามาวางขายกับเรา สามารถลงทะเบียนเพื่อให้ทีมจัดซื้อติดต่อกลับ (ข้อความตัวอย่าง)', 'Makers and distributors who want to sell with us can register so our buying team can get in touch (sample text).')] },
  ] },
  { slug: 'sustainability', group: 'about', title: p('กิจกรรมด้านความยั่งยืน', 'Sustainability activities'), sections: [
    { paragraphs: [p('เราลดการใช้พลาสติกในบรรจุภัณฑ์ และสนับสนุนสินค้าที่ประหยัดพลังงาน (ข้อความตัวอย่าง)', 'We cut plastic in packaging and support energy-saving products (sample text).')] },
  ] },
  { slug: 'news', group: 'about', title: p('ข่าวสารและกิจกรรม', 'News and events'), sections: [
    { paragraphs: [p('ข่าวประชาสัมพันธ์และกิจกรรมของร้านจะแสดงที่นี่ (ข้อความตัวอย่าง)', 'Press releases and store events would appear here (sample text).')] },
  ] },
  { slug: 'faq', group: 'help', title: p('คำถามที่พบบ่อย', 'Frequently asked questions'), sections: [
    { faq: [
      { q: p('สั่งซื้อแล้วจะได้รับสินค้าเมื่อไร', 'When will my order arrive?'), a: p('จัดส่งภายใน 1–3 วันทำการ ส่วนรับที่สาขาพร้อมรับภายในประมาณ 2 ชั่วโมง (ตัวอย่าง)', 'Delivery takes 1–3 working days; in-store pickup is usually ready in about 2 hours (sample).') },
      { q: p('ชำระเงินได้ด้วยวิธีใดบ้าง', 'How can I pay?'), a: p('บัตรเครดิต/เดบิต พร้อมเพย์ โอนผ่านธนาคาร และชำระที่สาขาหรือปลายทาง (ตัวอย่าง)', 'Credit or debit card, PromptPay, bank transfer, and pay in store or on delivery (sample).') },
      { q: p('เปลี่ยนหรือคืนสินค้าได้หรือไม่', 'Can I exchange or return an item?'), a: p('ได้ภายใน 30 วันหากสินค้าอยู่ในสภาพเดิม (ตัวอย่าง)', 'Yes, within 30 days if the item is in its original condition (sample).') },
      { q: p('แก้ไขที่อยู่จัดส่งอย่างไร', 'How do I change my delivery address?'), a: p('ไปที่บัญชีของฉัน แล้วเลือกที่อยู่จัดส่งสินค้า', 'Go to My account, then Delivery addresses.') },
    ] },
  ] },
  { slug: 'howto-order', group: 'help', title: p('วิธีการสั่งซื้อสินค้า', 'How to order'), sections: [
    { paragraphs: [p('1. เลือกสินค้าแล้วกด "ใส่ตะกร้า"', '1. Pick a product and press "Add to cart".'), p('2. เปิดตะกร้า ติ๊กสินค้าที่ต้องการ แล้วกด "ดำเนินการชำระเงิน"', '2. Open the cart, tick the items you want and press "Proceed to payment".'), p('3. เลือกรับที่สาขาหรือจัดส่ง เลือกวิธีชำระเงิน แล้วยืนยันคำสั่งซื้อ', '3. Choose pickup or delivery, pick a payment method and confirm the order.')] },
  ] },
  { slug: 'click-collect', group: 'help', title: p('การรับสินค้าด้วยตนเอง', 'Collect in store'), sections: [
    { paragraphs: [p('สั่งออนไลน์แล้วรับที่สาขาที่เลือก ผ่านเคาน์เตอร์หรือล็อกเกอร์ตลอด 24 ชั่วโมง (ตัวอย่าง)', 'Order online and collect at your chosen store, at the counter or from a 24-hour locker (sample).'), p('เมื่อสินค้าพร้อม ระบบจะแจ้งเตือนทางโทรศัพท์หรืออีเมล', 'When your order is ready we will tell you by phone or email.')] },
  ] },
  { slug: 'howto-payments', group: 'help', title: p('วิธีการชำระเงิน', 'How to pay'), sections: [
    { paragraphs: [p('บัตรเครดิต/เดบิต: กรอกข้อมูลบัตรและยืนยันรหัส OTP', 'Card: enter your card details and confirm the OTP.'), p('พร้อมเพย์: สแกน QR ด้วยแอปธนาคารภายในเวลาที่กำหนด', 'PromptPay: scan the QR code in your bank app within the time limit.'), p('โอนผ่านธนาคาร: โอนมาที่บัญชีที่แสดงแล้วกดแจ้งชำระ', 'Bank transfer: transfer to the account shown, then confirm you have paid.')] },
  ] },
  { slug: 'installment', group: 'help', title: p('ผ่อนชำระบัตรเครดิต', 'Credit card instalments'), sections: [
    { paragraphs: [p('ผ่อน 0% นาน 3, 6 หรือ 10 เดือน เมื่อยอดชำระตั้งแต่ ฿3,000 กับธนาคารที่ร่วมรายการ (ตัวอย่าง)', '0% instalments over 3, 6 or 10 months when you pay ฿3,000 or more with a taking-part bank (sample).')] },
  ] },
  { slug: 'returns', group: 'legal', title: p('เงื่อนไขการเปลี่ยน – คืนสินค้า', 'Exchange and return terms'), legal: true, sections: returnsSections },
  { slug: 'privacy', group: 'legal', title: p('นโยบายความเป็นส่วนตัว', 'Privacy policy'), legal: true, sections: privacySections },
  { slug: 'cookie', group: 'legal', title: p('นโยบายคุกกี้', 'Cookie policy'), legal: true, sections: cookieSections },
  { slug: 'terms', group: 'legal', title: p('ข้อตกลงและเงื่อนไข', 'Terms and conditions'), legal: true, sections: termsSections },
  { slug: 'cctv', group: 'legal', title: p('นโยบายความเป็นส่วนตัวในการใช้กล้องวงจรปิด', 'CCTV privacy policy'), legal: true, sections: cctvSections },
  { slug: 'privacy-request', group: 'legal', title: p('คำร้องขอใช้สิทธิ', 'Data rights requests'), legal: true, sections: privacyRequestSections },
  { slug: 'complaint', group: 'help', title: p('ร้องเรียนเกี่ยวกับบริการ', 'Service complaints'), sections: [
    { paragraphs: [p('แจ้งปัญหาการใช้บริการได้ที่ complaint@example.com หรือโทร 0-0000-0000 ทีมงานจะติดต่อกลับภายใน 2 วันทำการ (ข้อมูลตัวอย่าง)', 'Report a service problem at complaint@example.com or call 0-0000-0000; we reply within 2 working days (sample details).')] },
  ] },
]

export const infoBySlug = (slug: string | undefined) => infoPages.find((x) => x.slug === slug)
