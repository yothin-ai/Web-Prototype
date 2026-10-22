import type { LandingContent } from '../types'

// The coffee dataset's landing page: the roaster selling to cafés and offices (sample text, mock names).
export const landing: LandingContent = {
  hero: {
    lead: { th: 'กาแฟสดใหม่', en: 'Fresh coffee' },
    title: { th: 'สำหรับร้านและออฟฟิศของคุณ', en: 'for your café and your office' },
    text: {
      th: 'คั่วตามออเดอร์ทุกสัปดาห์ ส่งถึงร้านภายใน 24 ชั่วโมงหลังคั่ว พร้อมทีมช่วยปรับสูตรและดูแลเครื่องชงให้ต่อเนื่อง',
      en: 'Roasted to order every week and delivered within 24 hours of roasting, with a team that helps tune your recipe and look after your machine.',
    },
    cta: { th: 'เริ่มสั่งกาแฟ', en: 'Start ordering' },
    more: { th: 'ดูบริการ', en: 'See services' },
  },
  clients: {
    title: { th: 'ร้านและองค์กรที่สั่งกาแฟกับเรา', en: 'Cafés and offices that order from us' },
    groups: [
      { label: { th: 'ร้านกาแฟ', en: 'Cafés' }, names: ['Corner Cup', 'Morning Bean', 'Hilltop Café', 'Little Brew'] },
      { label: { th: 'โรงแรมและร้านอาหาร', en: 'Hotels and restaurants' }, names: ['Lakeside Inn', 'Garden Table', 'Riverside Hotel'] },
      { label: { th: 'ออฟฟิศ', en: 'Offices' }, names: ['Nimbus Office', 'Pixel Works', 'Harbor Co-work'] },
    ],
  },
  solutions: {
    title: { th: 'จากเมล็ดคุณภาพ สู่แก้วที่ลูกค้าติดใจ', en: 'From good beans to a cup customers love' },
    text: {
      th: 'เรารู้ว่าร้านและออฟฟิศต้องการกาแฟที่รสสม่ำเสมอและส่งตรงเวลา จึงทำบริการสองอย่างที่ช่วยให้เรื่องนี้ง่ายขึ้น',
      en: 'Cafés and offices need coffee that tastes the same every time and arrives on schedule, so we built two services to make that easier.',
    },
    products: [
      {
        headline: { th: 'เมล็ดกาแฟคั่วสดส่งตรงเวลา รสสม่ำเสมอทุกรอบ', en: 'Fresh-roasted beans on time, the same taste every round' },
        name: { th: 'Monthly Roast', en: 'Monthly Roast' },
        tagline: { th: 'สมาชิกเมล็ดกาแฟรายเดือน', en: 'A monthly bean subscription' },
        features: [
          { title: { th: 'คั่วตามออเดอร์', en: 'Roasted to order' }, body: { th: 'ไม่มีเมล็ดค้างสต็อก คั่วหลังรับออเดอร์และส่งภายใน 24 ชั่วโมง', en: 'No stale stock: we roast after your order and ship within 24 hours.' } },
          { title: { th: 'เลือกระดับคั่วได้', en: 'Pick your roast' }, body: { th: 'อ่อน กลาง เข้ม และบดให้ตรงกับเครื่องที่ใช้', en: 'Light, medium or dark, ground to suit your machine.' } },
          { title: { th: 'เลื่อนหรือหยุดได้', en: 'Skip or pause' }, body: { th: 'ปรับรอบส่งได้ตามฤดูกาลของร้าน ไม่มีค่าธรรมเนียม', en: 'Change the schedule with your seasons, at no charge.' } },
        ],
        cta: { th: 'ดูแผนสมาชิก', en: 'See the plans' },
      },
      {
        headline: { th: 'เครื่องชงที่พร้อมใช้งาน มีทีมช่างดูแลให้ต่อเนื่อง', en: 'A machine that is always ready, with a technician team behind it' },
        name: { th: 'Brew Care', en: 'Brew Care' },
        tagline: { th: 'บริการดูแลเครื่องชง', en: 'Machine care service' },
        features: [
          { title: { th: 'ติดตั้งและสอนใช้', en: 'Installed and explained' }, body: { th: 'ทีมช่างติดตั้งถึงที่และสอนทีมงานของคุณชงให้ได้มาตรฐาน', en: 'Our technicians install on site and show your staff how to brew to standard.' } },
          { title: { th: 'ตรวจและล้างตามรอบ', en: 'Regular checks and cleaning' }, body: { th: 'ล้างระบบและเปลี่ยนไส้กรองตามกำหนด ลดโอกาสเครื่องเสียกลางวัน', en: 'We clean the system and replace filters on schedule, so the machine rarely fails mid-day.' } },
          { title: { th: 'เครื่องสำรองระหว่างซ่อม', en: 'A spare while we repair' }, body: { th: 'ร้านไม่ต้องหยุดขาย เรามีเครื่องสำรองให้ยืมใช้', en: 'You never have to close: we lend you a spare machine.' } },
        ],
        cta: { th: 'สนใจข้อมูลเพิ่มเติม', en: 'Find out more' },
      },
    ],
  },
  academy: {
    title: { th: 'ชงให้อร่อย เริ่มจากเรียนให้ถูก', en: 'Great coffee starts with learning it right' },
    text: {
      th: 'เวิร์กช็อปสำหรับคนทำร้านและทีมบาริสต้า ลงมือชงจริงด้วยเครื่องและเมล็ดแบบเดียวกับที่ร้านใช้',
      en: 'Workshops for café owners and barista teams, brewing for real on the same machines and beans you use in your shop.',
    },
    viewAll: { th: 'ดูเวิร์กช็อปทั้งหมด', en: 'See all workshops' },
    courses: [
      { tag: { th: 'พื้นฐาน', en: 'Basics' }, title: { th: 'บาริสต้าเบื้องต้น', en: 'Barista basics' }, meta: { th: '1 วัน · ที่โรงคั่ว', en: '1 day · at the roastery' } },
      { tag: { th: 'ลาเต้อาร์ต', en: 'Latte art' }, title: { th: 'ตีนมและลาเต้อาร์ต', en: 'Milk steaming and latte art' }, meta: { th: 'ครึ่งวัน · ที่โรงคั่ว', en: 'Half a day · at the roastery' } },
      { tag: { th: 'ชงมือ', en: 'Pour-over' }, title: { th: 'กาแฟดริปและชงมือ', en: 'Drip and pour-over coffee' }, meta: { th: 'ครึ่งวัน · ที่โรงคั่ว', en: 'Half a day · at the roastery' } },
      { tag: { th: 'เจ้าของร้าน', en: 'Owners' }, title: { th: 'ตั้งราคาและคุมต้นทุนเมนูกาแฟ', en: 'Pricing and cost control for coffee menus' }, meta: { th: '1 วัน · ออนไลน์', en: '1 day · online' } },
      { tag: { th: 'รสชาติ', en: 'Taste' }, title: { th: 'ชิมกาแฟและแยกกลิ่นรส', en: 'Cupping and tasting notes' }, meta: { th: 'ครึ่งวัน · ที่โรงคั่ว', en: 'Half a day · at the roastery' } },
      { tag: { th: 'ดูแลเครื่อง', en: 'Care' }, title: { th: 'ดูแลเครื่องชงเบื้องต้น', en: 'Everyday machine care' }, meta: { th: 'ครึ่งวัน · ที่ร้านของคุณ', en: 'Half a day · at your shop' } },
    ],
  },
  partners: {
    title: { th: 'ทำงานร่วมกับพันธมิตรที่เราไว้ใจ', en: 'Working with partners we trust' },
    text: {
      th: 'เมล็ดกาแฟจากฟาร์มที่เราไปเยี่ยมเอง และอุปกรณ์จากผู้ผลิตที่มีบริการหลังการขายใกล้ตัว',
      en: 'Beans from farms we visit ourselves, and equipment from makers with after-sales service close by.',
    },
    names: ['Northern Farms', 'Brewline', 'PackWell', 'FreshRoute'],
  },
  articles: {
    title: { th: 'บทความ', en: 'Articles' },
    text: { th: 'เรื่องกาแฟ การทำร้าน และการดูแลเครื่อง', en: 'Coffee, running a café and looking after equipment' },
    items: [
      { category: { th: 'เมล็ดกาแฟ', en: 'Beans' }, title: { th: 'คั่วอ่อน กลาง เข้ม ต่างกันอย่างไร และร้านคุณควรเลือกแบบไหน', en: 'Light, medium and dark roasts: what differs and which suits your shop' }, summary: { th: 'อธิบายความต่างของรสและกลิ่นของแต่ละระดับคั่ว พร้อมแนะนำวิธีเลือกให้เข้ากับเมนูของร้าน', en: 'How the taste and aroma change with each roast level, with advice on choosing for your menu.' } },
      { category: { th: 'ทำร้าน', en: 'Running a café' }, title: { th: '5 ข้อควรเช็กก่อนเปิดร้านกาแฟ', en: 'Five things to check before opening a café' }, summary: { th: 'จากทำเลถึงเครื่องชง รวมสิ่งที่เจ้าของร้านใหม่มักมองข้าม เพื่อเปิดร้านอย่างมั่นใจ', en: 'From location to machine, the things new owners often overlook, so you can open with confidence.' } },
      { category: { th: 'ดูแลเครื่อง', en: 'Equipment' }, title: { th: 'ล้างเครื่องชงให้ถูกวิธีเพื่อรสกาแฟที่ไม่เพี้ยน', en: 'Cleaning your machine properly so the taste stays true' }, summary: { th: 'ขั้นตอนล้างประจำวันและประจำสัปดาห์ที่ช่วยให้กาแฟรสสม่ำเสมอและเครื่องอยู่ได้นาน', en: 'The daily and weekly cleaning steps that keep the taste consistent and the machine lasting.' } },
    ],
  },
  faq: {
    title: { th: 'คำถามที่ร้านกาแฟถามเรา', en: 'What cafés ask us' },
    text: { th: 'ตอบสั้นๆ ก่อนตัดสินใจสั่งกาแฟกับเรา', en: 'Short answers before you decide to order.' },
    items: [
      { question: { th: 'สั่งขั้นต่ำเท่าไร', en: 'What is the minimum order?' }, answer: { th: 'เริ่มที่ 5 กิโลกรัมต่อรอบ ส่งฟรีเมื่อสั่งตั้งแต่ 10 กิโลกรัม (ข้อมูลตัวอย่าง)', en: 'It starts at 5 kilograms per round, with free delivery from 10 kilograms (sample information).' } },
      { question: { th: 'ขอทดลองชิมก่อนได้ไหม', en: 'Can we taste before ordering?' }, answer: { th: 'ได้ ส่งตัวอย่างเมล็ดและให้ทีมงานช่วยปรับสูตรให้ตรงกับเครื่องของร้านก่อนเริ่มสั่งจริง (ข้อมูลตัวอย่าง)', en: 'Yes, we send sample beans and help tune the recipe to your machine before the first real order (sample information).' } },
      { question: { th: 'เปลี่ยนหรือหยุดรอบส่งได้เมื่อไหร่', en: 'When can we change or pause deliveries?' }, answer: { th: 'แจ้งล่วงหน้า 3 วันก่อนวันคั่ว ไม่มีค่าธรรมเนียม (ข้อมูลตัวอย่าง)', en: 'Tell us three days before the roasting day, at no charge (sample information).' } },
    ],
  },
  contact: {
    company: { th: 'บ้านสวนคั่วกาแฟ', en: 'Baan Suan Roasters' },
    address: { th: 'เลขที่ 45 หมู่ 3 ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดเชียงใหม่ 50000', en: '45 Moo 3, Sample Subdistrict, Sample District, Chiang Mai 50000' },
    phone: '0-0000-0000',
    email: 'hello@example.com',
  },
  form: {
    title: { th: 'เริ่มสั่งกาแฟกับเรา', en: 'Start ordering with us' },
    companyLabel: { th: 'ชื่อร้านหรือบริษัท (ไม่บังคับ)', en: 'Shop or company name (optional)' },
    interestLabel: { th: 'คุณสนใจเรื่องอะไร', en: 'What are you interested in?' },
    interests: [
      { id: 'journey', name: { th: 'ขอใบเสนอราคา', en: 'Ask for a quote' }, detail: { th: 'ส่งตัวอย่างและราคาตามปริมาณ', en: 'Samples and prices by volume' } },
      { id: 'product1', name: { th: 'Monthly Roast', en: 'Monthly Roast' }, detail: { th: 'สมาชิกเมล็ดกาแฟรายเดือน', en: 'A monthly bean subscription' } },
      { id: 'product2', name: { th: 'Brew Care', en: 'Brew Care' }, detail: { th: 'บริการดูแลเครื่องชง', en: 'Machine care service' } },
      { id: 'course', name: { th: 'เวิร์กช็อป', en: 'Workshops' }, detail: { th: 'เรียนชงกาแฟกับทีมของเรา', en: 'Learn to brew with our team' } },
    ],
    perks: [
      { title: { th: 'ได้ลองชิมก่อน', en: 'Taste first' }, body: { th: 'ส่งตัวอย่างเมล็ดให้ทดลองกับเครื่องของร้าน', en: 'We send sample beans to try on your machine.' } },
      { title: { th: 'ราคาตามปริมาณ', en: 'Volume pricing' }, body: { th: 'ได้ใบเสนอราคาภายในหนึ่งวันทำการ', en: 'A quote within one working day.' } },
      { title: { th: 'ไม่มีข้อผูกมัด', en: 'No obligation' }, body: { th: 'ขอใบเสนอราคาไม่มีค่าใช้จ่าย', en: 'Asking for a quote is free.' } },
    ],
  },
}
