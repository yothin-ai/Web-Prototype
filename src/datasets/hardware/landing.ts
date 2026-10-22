import type { LandingContent } from '../types'

// The hardware dataset's landing page: the building-materials shop selling to contractors (sample text, mock names).
export const landing: LandingContent = {
  hero: {
    lead: { th: 'วัสดุก่อสร้างครบ', en: 'Every building material' },
    title: { th: 'ส่งตรงถึงไซต์งานของผู้รับเหมา', en: 'delivered straight to the contractor’s site' },
    text: {
      th: 'สั่งเหล็ก ปูน หลังคา และอุปกรณ์ในใบสั่งเดียว ได้ราคาโครงการ เครดิตสำหรับผู้รับเหมา และทีมดูแลที่ตามงานให้ถึงวันส่งมอบ',
      en: 'Order steel, cement, roofing and fittings on one order, with project pricing, credit for contractors and a team that follows the job to handover.',
    },
    cta: { th: 'ขอใบเสนอราคา', en: 'Ask for a quote' },
    more: { th: 'ดูบริการ', en: 'See services' },
  },
  clients: {
    title: { th: 'ผู้รับเหมาและโครงการที่ไว้ใจเรา', en: 'Contractors and projects that trust us' },
    groups: [
      { label: { th: 'ผู้รับเหมา', en: 'Contractors' }, names: ['Strong Build', 'Prime Works', 'Anchor Construction', 'Bluestone Builders'] },
      { label: { th: 'โครงการที่อยู่อาศัย', en: 'Housing projects' }, names: ['Skyline Homes', 'Green Park Estate', 'Harbor Land'] },
      { label: { th: 'โรงงานและคลังสินค้า', en: 'Factories and warehouses' }, names: ['Delta Factory', 'Nimbus Logistics'] },
    ],
  },
  solutions: {
    title: { th: 'ซื้อง่าย ส่งตรงเวลา ไม่สะดุดกลางงาน', en: 'Easy to buy, on time, never stalls a job' },
    text: {
      th: 'ผู้รับเหมาเสียเวลาที่สุดตอนของไม่มาตามนัด เราจึงทำบริการสองอย่างที่ช่วยให้วัสดุมาถึงไซต์ตามแผน',
      en: 'Nothing costs a contractor more time than materials that do not arrive as planned, so we built two services that get them to site on schedule.',
    },
    products: [
      {
        headline: { th: 'รวมวัสดุทั้งโครงการไว้ในใบสั่งเดียว ได้ราคาโครงการและเครดิต', en: 'Put a whole project’s materials on one order, with project pricing and credit' },
        name: { th: 'Pro Account', en: 'Pro Account' },
        tagline: { th: 'บัญชีสำหรับผู้รับเหมา', en: 'An account for contractors' },
        features: [
          { title: { th: 'ราคาโครงการ', en: 'Project pricing' }, body: { th: 'ล็อกราคาตามปริมาณทั้งโครงการ ไม่ต้องต่อรองใหม่ทุกครั้ง', en: 'Lock in pricing by project volume so you never renegotiate each time.' } },
          { title: { th: 'เครดิตเทอม', en: 'Credit terms' }, body: { th: 'ซื้อก่อนจ่ายตามรอบบิลที่ตกลงไว้ (ข้อมูลตัวอย่าง)', en: 'Buy now and pay on the billing cycle you agree on (sample information).' } },
          { title: { th: 'สั่งซ้ำได้ทันที', en: 'Reorder in a tap' }, body: { th: 'เก็บรายการวัสดุของแต่ละไซต์ไว้ สั่งซ้ำได้โดยไม่ต้องพิมพ์ใหม่', en: 'Keep each site’s list and reorder without retyping.' } },
        ],
        cta: { th: 'สมัครบัญชีผู้รับเหมา', en: 'Open a contractor account' },
      },
      {
        headline: { th: 'วัสดุถึงไซต์ตามวันและเวลาที่นัด พร้อมทีมช่วยขนลง', en: 'Materials on site at the agreed day and time, with a team to unload' },
        name: { th: 'Site Delivery', en: 'Site Delivery' },
        tagline: { th: 'บริการส่งถึงไซต์งาน', en: 'Delivery to the job site' },
        features: [
          { title: { th: 'นัดวันเวลาได้', en: 'A fixed slot' }, body: { th: 'เลือกช่วงเวลาส่งที่ไม่ชนกับงานของคุณ', en: 'Pick a delivery slot that does not clash with your work.' } },
          { title: { th: 'รถให้เหมาะกับของ', en: 'The right truck' }, body: { th: 'รถบรรทุกติดเครน รถกระบะ หรือรถพ่วง ตามชนิดและน้ำหนักวัสดุ', en: 'A crane truck, flatbed or pickup, chosen by material type and weight.' } },
          { title: { th: 'ติดตามสถานะ', en: 'Track the delivery' }, body: { th: 'ดูว่ารถถึงไหนแล้วและเวลาคาดว่าจะถึง', en: 'See where the truck is and when it should arrive.' } },
        ],
        cta: { th: 'สนใจข้อมูลเพิ่มเติม', en: 'Find out more' },
      },
    ],
  },
  academy: {
    title: { th: 'ฝึกทีมช่างให้ทำงานได้ดีและปลอดภัย', en: 'Train your crew to work well and safely' },
    text: {
      th: 'เวิร์กช็อปสำหรับช่างและหัวหน้างาน เรียนจากของจริงที่ใช้ในงาน และกลับไปทำได้ทันที',
      en: 'Workshops for technicians and foremen, learned on the real materials used on site and ready to apply straight away.',
    },
    viewAll: { th: 'ดูเวิร์กช็อปทั้งหมด', en: 'See all workshops' },
    courses: [
      { tag: { th: 'โครงสร้าง', en: 'Structure' }, title: { th: 'งานคอนกรีตและปูนให้แข็งแรง', en: 'Strong concrete and cement work' }, meta: { th: '1 วัน · ที่ศูนย์ฝึก', en: '1 day · at the training centre' } },
      { tag: { th: 'หลังคา', en: 'Roofing' }, title: { th: 'ติดตั้งหลังคาและรางน้ำให้ไม่รั่ว', en: 'Roofs and gutters that do not leak' }, meta: { th: '1 วัน · ที่ศูนย์ฝึก', en: '1 day · at the training centre' } },
      { tag: { th: 'ประปา', en: 'Plumbing' }, title: { th: 'ระบบประปาและวาล์วเบื้องต้น', en: 'Plumbing and valve basics' }, meta: { th: 'ครึ่งวัน · ที่ศูนย์ฝึก', en: 'Half a day · at the training centre' } },
      { tag: { th: 'ไฟฟ้า', en: 'Electrical' }, title: { th: 'งานไฟฟ้าในบ้านอย่างปลอดภัย', en: 'Safe home electrical work' }, meta: { th: '1 วัน · ที่ศูนย์ฝึก', en: '1 day · at the training centre' } },
      { tag: { th: 'ความปลอดภัย', en: 'Safety' }, title: { th: 'ความปลอดภัยในไซต์ก่อสร้าง', en: 'Safety on a construction site' }, meta: { th: 'ครึ่งวัน · ที่ไซต์ของคุณ', en: 'Half a day · at your site' } },
      { tag: { th: 'หัวหน้างาน', en: 'Foremen' }, title: { th: 'ถอดแบบและคำนวณวัสดุ', en: 'Reading plans and estimating materials' }, meta: { th: '1 วัน · ออนไลน์', en: '1 day · online' } },
    ],
  },
  partners: {
    title: { th: 'ทำงานร่วมกับผู้ผลิตชั้นนำ', en: 'Working with leading manufacturers' },
    text: {
      th: 'วัสดุมาจากผู้ผลิตที่มีมาตรฐานและบริการหลังการขาย เพื่อให้งานของคุณมั่นใจได้ในระยะยาว',
      en: 'Materials come from makers with standards and after-sales service, so your work holds up over the long term.',
    },
    names: ['SteelCore', 'RoofLine', 'PipeMax', 'PaintWorks'],
  },
  articles: {
    title: { th: 'บทความ', en: 'Articles' },
    text: { th: 'ความรู้วัสดุและงานก่อสร้างสำหรับมืออาชีพ', en: 'Materials and construction knowledge for professionals' },
    items: [
      { category: { th: 'วัสดุ', en: 'Materials' }, title: { th: 'เลือกเหล็กเส้นให้ตรงกับงานโครงสร้างแต่ละแบบ', en: 'Choosing rebar for each kind of structural work' }, summary: { th: 'สรุปขนาดและชั้นคุณภาพเหล็กเส้นที่ใช้กับงานฐานราก เสา และพื้น พร้อมข้อควรระวังตอนรับของที่ไซต์', en: 'A summary of the sizes and grades of rebar for footings, columns and slabs, with points to check when taking delivery.' } },
      { category: { th: 'บริหารงาน', en: 'Management' }, title: { th: 'วางแผนสั่งวัสดุอย่างไรไม่ให้งานสะดุด', en: 'Planning material orders so work never stalls' }, summary: { th: 'แบ่งรอบสั่งตามลำดับงาน และเผื่อเวลาส่งให้พอดี ลดของค้างหน้างานและต้นทุนที่เก็บ', en: 'Split orders by work sequence and allow the right lead time, cutting leftover stock on site and storage costs.' } },
      { category: { th: 'ความปลอดภัย', en: 'Safety' }, title: { th: 'เช็กลิสต์ความปลอดภัยก่อนเริ่มงานหลังคา', en: 'A safety checklist before starting roof work' }, summary: { th: 'รายการที่ต้องตรวจก่อนขึ้นหลังคาทุกครั้ง ตั้งแต่อุปกรณ์กันตกจนถึงสภาพอากาศ', en: 'What to check every time before going up on a roof, from fall protection to the weather.' } },
    ],
  },
  faq: {
    title: { th: 'คำถามที่ผู้รับเหมาถามเรา', en: 'What contractors ask us' },
    text: { th: 'ตอบสั้นๆ ก่อนเปิดบัญชีกับเรา', en: 'Short answers before you open an account.' },
    items: [
      { question: { th: 'ต้องใช้เอกสารอะไรเปิดบัญชี', en: 'What do I need to open an account?' }, answer: { th: 'ใช้สำเนาทะเบียนนิติบุคคลหรือบัตรประชาชน และข้อมูลโครงการคร่าวๆ ทีมงานจะติดต่อกลับภายในหนึ่งวันทำการ (ข้อมูลตัวอย่าง)', en: 'A copy of your company registration or ID and a rough project outline. We call back within one working day (sample information).' } },
      { question: { th: 'ส่งนอกกรุงเทพฯ ได้ไหม', en: 'Do you deliver outside Bangkok?' }, answer: { th: 'ได้ ส่งทั่วประเทศ ค่าส่งขึ้นกับน้ำหนักและระยะทาง แจ้งในใบเสนอราคา (ข้อมูลตัวอย่าง)', en: 'Yes, nationwide. The delivery charge depends on weight and distance and is shown in the quote (sample information).' } },
      { question: { th: 'คืนวัสดุที่เหลือได้ไหม', en: 'Can I return leftover materials?' }, answer: { th: 'ได้สำหรับของที่ยังไม่เปิดใช้ภายใน 14 วัน หักค่าขนส่งตามจริง (ข้อมูลตัวอย่าง)', en: 'Yes, for unopened items within 14 days, less the actual delivery cost (sample information).' } },
    ],
  },
  contact: {
    company: { th: 'บิลด์มาร์ท ตัวอย่าง', en: 'Sample BuildMart' },
    address: { th: 'เลขที่ 99 ถนนตัวอย่าง ตำบลตัวอย่าง อำเภอเมือง จังหวัดปทุมธานี 12000', en: '99 Sample Road, Sample Subdistrict, Mueang District, Pathum Thani 12000' },
    phone: '0-0000-0000',
    email: 'hello@example.com',
  },
  form: {
    title: { th: 'ขอใบเสนอราคา', en: 'Ask for a quote' },
    companyLabel: { th: 'ชื่อบริษัทหรือผู้รับเหมา (ไม่บังคับ)', en: 'Company or contractor name (optional)' },
    interestLabel: { th: 'คุณสนใจเรื่องอะไร', en: 'What are you interested in?' },
    interests: [
      { id: 'journey', name: { th: 'ขอใบเสนอราคา', en: 'A quote' }, detail: { th: 'ราคาวัสดุตามรายการของโครงการ', en: 'Prices for your project’s list' } },
      { id: 'product1', name: { th: 'Pro Account', en: 'Pro Account' }, detail: { th: 'บัญชีสำหรับผู้รับเหมา', en: 'An account for contractors' } },
      { id: 'product2', name: { th: 'Site Delivery', en: 'Site Delivery' }, detail: { th: 'บริการส่งถึงไซต์งาน', en: 'Delivery to the job site' } },
      { id: 'course', name: { th: 'เวิร์กช็อปช่าง', en: 'Crew workshops' }, detail: { th: 'ฝึกทีมช่างและหัวหน้างาน', en: 'Train technicians and foremen' } },
    ],
    perks: [
      { title: { th: 'ราคาตามโครงการ', en: 'Project pricing' }, body: { th: 'ได้ใบเสนอราคาภายในหนึ่งวันทำการ', en: 'A quote within one working day.' } },
      { title: { th: 'ทีมดูแลเฉพาะ', en: 'A dedicated team' }, body: { th: 'มีผู้ประสานงานตามงานให้ถึงวันส่งมอบ', en: 'A coordinator follows the job to handover.' } },
      { title: { th: 'ไม่มีข้อผูกมัด', en: 'No obligation' }, body: { th: 'ขอใบเสนอราคาไม่มีค่าใช้จ่าย', en: 'Asking for a quote is free.' } },
    ],
  },
}
