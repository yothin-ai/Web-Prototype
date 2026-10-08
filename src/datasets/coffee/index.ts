import type { Dataset } from '../types'

const dataset: Dataset = {
  id: 'coffee',
  name: { th: 'ร้านกาแฟคั่ว', en: 'Coffee roaster' },
  brandName: { th: 'บ้านสวนคั่วกาแฟ', en: 'Baan Suan Roasters' },
  tagline: { th: 'ตัวอย่างลูกค้าธุรกิจกาแฟคั่วสด', en: 'Sample client: a fresh-roast coffee business' },
  ecommerce: {
    products: [
      { id: 'c1', category: { th: 'เมล็ดกาแฟ', en: 'Beans' }, name: { th: 'เมล็ดกาแฟเชียงใหม่ คั่วกลาง', en: 'Chiang Mai beans, medium roast' }, description: { th: 'กลิ่นช็อกโกแลตและถั่ว ถุง 250 กรัม', en: 'Notes of chocolate and nuts, 250 g bag' }, price: 320 },
      { id: 'c2', category: { th: 'เมล็ดกาแฟ', en: 'Beans' }, name: { th: 'เมล็ดกาแฟน่าน คั่วอ่อน', en: 'Nan beans, light roast' }, description: { th: 'กลิ่นผลไม้และดอกไม้ ถุง 250 กรัม', en: 'Fruity and floral, 250 g bag' }, price: 340 },
      { id: 'c3', category: { th: 'เมล็ดกาแฟ', en: 'Beans' }, name: { th: 'เอสเปรสโซ่เบลนด์', en: 'Espresso blend' }, description: { th: 'เข้มข้น ครีมาหนา เหมาะทำลาเต้', en: 'Rich with thick crema, great for lattes' }, price: 290 },
      { id: 'c4', category: { th: 'ดริป', en: 'Drip' }, name: { th: 'ดริปแบ็ก 10 ซอง', en: 'Drip bags, 10 sachets' }, description: { th: 'ชงง่ายแค่เติมน้ำร้อน พกไปได้ทุกที่', en: 'Just add hot water and take it anywhere' }, price: 220 },
      { id: 'c5', category: { th: 'อุปกรณ์', en: 'Gear' }, name: { th: 'เครื่องบดมือสแตนเลส', en: 'Stainless hand grinder' }, description: { th: 'ปรับความละเอียดได้ 15 ระดับ', en: '15 grind settings' }, price: 1490 },
      { id: 'c6', category: { th: 'อุปกรณ์', en: 'Gear' }, name: { th: 'กาต้มน้ำคอห่าน', en: 'Gooseneck kettle' }, description: { th: 'ควบคุมสายน้ำได้แม่นยำ จุ 600 มล.', en: 'Precise pour control, 600 ml' }, price: 1890 },
    ],
    shippingMethods: [
      { id: 'standard', name: { th: 'ส่งธรรมดา', en: 'Standard' }, detail: { th: '2–4 วันทำการ', en: '2–4 business days' }, price: 50 },
      { id: 'express', name: { th: 'ส่งด่วนพิเศษ', en: 'Express' }, detail: { th: 'ภายในวันถัดไป', en: 'Next day' }, price: 100 },
    ],
    paymentMethods: [
      { id: 'card', name: { th: 'บัตรเครดิต/เดบิต', en: 'Credit / debit card' }, detail: { th: 'จำลองเท่านั้น ไม่มีการตัดเงินจริง', en: 'Simulated, no real charge' } },
      { id: 'promptpay', name: { th: 'พร้อมเพย์', en: 'PromptPay' }, detail: { th: 'จำลองเท่านั้น ไม่มีการตัดเงินจริง', en: 'Simulated, no real charge' } },
      { id: 'cod', name: { th: 'เก็บเงินปลายทาง', en: 'Cash on delivery' }, detail: { th: 'ชำระเมื่อได้รับสินค้า', en: 'Pay when it arrives' } },
    ],
  },
  landing: {
    badge: { th: 'ลด 20% ในออเดอร์แรก', en: '20% off your first order' },
    featuresTitle: { th: 'ทำไมถึงติดใจ', en: 'Why people keep coming back' },
    finalTitle: { th: 'พร้อมได้กาแฟสดใหม่ทุกเดือนหรือยัง', en: 'Ready for fresh coffee every month?' },
    formTitle: { th: 'สมัครสมาชิกกาแฟรายเดือน', en: 'Join the monthly coffee club' },
    companyLabel: { th: 'ชื่อร้านหรือบริษัท (ไม่บังคับ)', en: 'Shop or company name (optional)' },
    interestLabel: { th: 'ความถี่ในการจัดส่ง', en: 'How often should we deliver?' },
    headline: { th: 'กาแฟคั่วสดใหม่ ส่งถึงบ้านทุกเดือน', en: 'Freshly roasted coffee, delivered monthly' },
    subheadline: { th: 'คั่วตามออเดอร์ทุกสัปดาห์ ส่งภายใน 24 ชั่วโมงหลังคั่ว เพื่อรสชาติที่สดที่สุด', en: 'Roasted to order every week and shipped within 24 hours so it tastes its freshest.' },
    cta: { th: 'เริ่มสมัครสมาชิก', en: 'Start my subscription' },
    features: [
      { title: { th: 'คั่วตามออเดอร์', en: 'Roasted to order' }, body: { th: 'ไม่มีเมล็ดค้างสต็อก ได้รสสดทุกถุง', en: 'No old stock, every bag is fresh.' } },
      { title: { th: 'คัดเมล็ดจากฟาร์มภาคเหนือ', en: 'Beans from northern farms' }, body: { th: 'ซื้อตรงจากเกษตรกร รู้ที่มาทุกถุง', en: 'Bought directly from growers, traceable on every bag.' } },
      { title: { th: 'เลื่อนหรือหยุดได้ทุกเมื่อ', en: 'Skip or pause any time' }, body: { th: 'ปรับรอบจัดส่งได้เองโดยไม่มีค่าธรรมเนียม', en: 'Change your schedule with no fee.' } },
    ],
    steps: [
      { title: { th: 'เลือกเมล็ดที่ชอบ', en: 'Pick your beans' }, body: { th: 'คั่วอ่อน กลาง หรือเข้ม', en: 'Light, medium or dark roast.' } },
      { title: { th: 'เลือกรอบจัดส่ง', en: 'Choose a schedule' }, body: { th: 'ทุกสัปดาห์ สองสัปดาห์ หรือทุกเดือน', en: 'Weekly, fortnightly or monthly.' } },
      { title: { th: 'รับกาแฟถึงบ้าน', en: 'Receive it at home' }, body: { th: 'เปิดถุงแล้วชงได้ทันที', en: 'Open the bag and brew.' } },
    ],
    testimonials: [
      { quote: { th: 'กลิ่นหอมมากตั้งแต่เปิดถุง เหมือนซื้อจากร้านโดยตรง', en: 'The aroma hits you as soon as you open the bag, just like buying in the shop.' }, author: { th: 'สมาชิกมา 1 ปี', en: 'Member for a year' } },
      { quote: { th: 'เลื่อนรอบจัดส่งได้ง่าย ไม่ต้องโทรหาใคร', en: 'Skipping a delivery is easy, no phone calls needed.' }, author: { th: 'คนทำงานที่บ้าน', en: 'Works from home' } },
    ],
    faqs: [
      { question: { th: 'ส่งฟรีไหม', en: 'Is shipping free?' }, answer: { th: 'ฟรีเมื่อสั่งตั้งแต่ 600 บาท', en: 'Free on orders from 600 baht.' } },
      { question: { th: 'ขอเมล็ดบดได้ไหม', en: 'Can I get it ground?' }, answer: { th: 'ได้ เลือกความละเอียดตอนสมัคร', en: 'Yes, choose the grind when you sign up.' } },
      { question: { th: 'ยกเลิกได้เมื่อไหร่', en: 'When can I cancel?' }, answer: { th: 'ทุกเมื่อ ก่อนรอบจัดส่งถัดไป 3 วัน', en: 'Any time, up to 3 days before the next delivery.' } },
    ],
    interests: [
      { id: 'monthly', name: { th: 'ทุกเดือน', en: 'Monthly' }, detail: { th: '1 ถุงต่อเดือน', en: 'One bag a month' } },
      { id: 'fortnight', name: { th: 'ทุกสองสัปดาห์', en: 'Fortnightly' }, detail: { th: '2 ถุงต่อเดือน', en: 'Two bags a month' } },
      { id: 'weekly', name: { th: 'ทุกสัปดาห์', en: 'Weekly' }, detail: { th: '4 ถุงต่อเดือน', en: 'Four bags a month' } },
    ],
  },
  education: {
    courses: [
      {
        id: 'brew',
        title: { th: 'ชงกาแฟดริปที่บ้าน', en: 'Pour-over at home' },
        summary: { th: 'ชงกาแฟดริปให้อร่อยด้วยอุปกรณ์พื้นฐานและขั้นตอนที่ทำซ้ำได้', en: 'Brew a good pour-over with basic gear and a repeatable routine.' },
        level: { th: 'มือใหม่', en: 'Beginner' },
        lessons: [
          { id: 'b1', minutes: 6, title: { th: 'อุปกรณ์ที่ต้องมี', en: 'What you need' }, body: { th: 'ดริปเปอร์ กระดาษกรอง เครื่องชั่ง และกาต้มน้ำคอห่าน ก็เริ่มต้นได้แล้ว', en: 'A dripper, filters, a scale and a gooseneck kettle are enough to start.' } },
          { id: 'b2', minutes: 7, title: { th: 'อัตราส่วนกาแฟต่อน้ำ', en: 'Coffee-to-water ratio' }, body: { th: 'เริ่มจากกาแฟ 1 ส่วนต่อน้ำ 15 ส่วน แล้วปรับตามรสที่ชอบ', en: 'Start at 1 part coffee to 15 parts water, then adjust to taste.' } },
          { id: 'b3', minutes: 8, title: { th: 'เทน้ำอย่างไรให้สม่ำเสมอ', en: 'Pouring evenly' }, body: { th: 'เทเป็นวงกลมช้า ๆ จากกลางออกขอบ และรอให้กาแฟบานก่อนเทรอบแรก', en: 'Pour slowly in circles from center outward, and let the coffee bloom first.' } },
        ],
        quiz: [
          { id: 'q1', question: { th: 'อัตราส่วนเริ่มต้นที่แนะนำคือเท่าไหร่', en: 'What starting ratio is recommended?' }, correctId: 'a', options: [{ id: 'a', text: { th: '1 ต่อ 15', en: '1 to 15' } }, { id: 'b', text: { th: '1 ต่อ 2', en: '1 to 2' } }, { id: 'c', text: { th: '1 ต่อ 100', en: '1 to 100' } }] },
          { id: 'q2', question: { th: 'ต้องทำอะไรก่อนเทน้ำรอบแรก', en: 'What comes before the first main pour?' }, correctId: 'b', options: [{ id: 'a', text: { th: 'เติมน้ำตาล', en: 'Add sugar' } }, { id: 'b', text: { th: 'รอให้กาแฟบาน', en: 'Let the coffee bloom' } }, { id: 'c', text: { th: 'ปิดฝาทิ้งไว้', en: 'Cover it and walk away' } }] },
        ],
      },
      {
        id: 'beans',
        title: { th: 'เข้าใจเมล็ดกาแฟ', en: 'Understanding beans' },
        summary: { th: 'รู้จักระดับการคั่วและแหล่งปลูก เพื่อเลือกกาแฟที่ตรงกับรสนิยม', en: 'Learn roast levels and origins so you can pick coffee you will love.' },
        level: { th: 'ทุกระดับ', en: 'All levels' },
        lessons: [
          { id: 'c1', minutes: 5, title: { th: 'ระดับการคั่ว', en: 'Roast levels' }, body: { th: 'คั่วอ่อนให้รสเปรี้ยวสดใส คั่วเข้มให้รสขมหนัก คั่วกลางอยู่ตรงกลาง', en: 'Light roasts taste bright and acidic, dark roasts bitter and heavy, medium sits between.' } },
          { id: 'c2', minutes: 7, title: { th: 'แหล่งปลูกและรสชาติ', en: 'Origin and flavor' }, body: { th: 'ความสูงและสภาพดินของแหล่งปลูกส่งผลต่อกลิ่นและรสของกาแฟ', en: 'Altitude and soil shape the aroma and taste of the coffee.' } },
          { id: 'c3', minutes: 5, title: { th: 'เก็บเมล็ดอย่างไรให้สด', en: 'Keeping beans fresh' }, body: { th: 'เก็บในถุงปิดสนิท พ้นแสงและความชื้น และใช้ให้หมดภายในหนึ่งเดือนหลังคั่ว', en: 'Store airtight, away from light and moisture, and finish within a month of roasting.' } },
        ],
        quiz: [
          { id: 'q1', question: { th: 'คั่วอ่อนมักให้รสแบบไหน', en: 'What do light roasts usually taste like?' }, correctId: 'a', options: [{ id: 'a', text: { th: 'เปรี้ยวสดใส', en: 'Bright and acidic' } }, { id: 'b', text: { th: 'ขมไหม้', en: 'Burnt and bitter' } }, { id: 'c', text: { th: 'จืดเหมือนน้ำ', en: 'Watery' } }] },
          { id: 'q2', question: { th: 'ควรเก็บเมล็ดกาแฟอย่างไร', en: 'How should beans be stored?' }, correctId: 'b', options: [{ id: 'a', text: { th: 'เปิดฝาไว้บนเคาน์เตอร์', en: 'Open on the counter' } }, { id: 'b', text: { th: 'ในถุงปิดสนิท พ้นแสง', en: 'Airtight and out of light' } }, { id: 'c', text: { th: 'ตากแดด', en: 'In direct sunlight' } }] },
        ],
      },
      {
        id: 'latte',
        title: { th: 'ลาเต้อาร์ตเบื้องต้น', en: 'Latte art basics' },
        summary: { th: 'ตีฟองนมให้ละเอียดและเทเป็นลายหัวใจแรกของคุณ', en: 'Texture milk properly and pour your first heart.' },
        level: { th: 'มือใหม่', en: 'Beginner' },
        lessons: [
          { id: 'l1', minutes: 8, title: { th: 'ตีฟองนม', en: 'Steaming milk' }, body: { th: 'ให้หัวตีฟองอยู่ใต้ผิวนมเล็กน้อย จนได้ฟองละเอียดเหมือนสีทาบ้าน', en: 'Keep the wand just under the surface until the milk looks like wet paint.' } },
          { id: 'l2', minutes: 9, title: { th: 'เทลายหัวใจ', en: 'Pouring a heart' }, body: { th: 'เทจากที่สูงก่อนแล้วลดถ้วยลงใกล้ผิวเมื่อฟองเริ่มลอย', en: 'Pour from high, then lower the jug close to the surface as the foam appears.' } },
          { id: 'l3', minutes: 6, title: { th: 'แก้ปัญหาที่พบบ่อย', en: 'Fixing common problems' }, body: { th: 'ฟองหยาบเกิดจากตีนานเกินไป ลองตีให้สั้นลงและหมุนถ้วยให้ทั่ว', en: 'Coarse foam comes from steaming too long; steam shorter and swirl the jug.' } },
        ],
        quiz: [
          { id: 'q1', question: { th: 'ฟองนมที่ดีควรมีลักษณะอย่างไร', en: 'What should good milk foam look like?' }, correctId: 'a', options: [{ id: 'a', text: { th: 'ละเอียดเหมือนสีทาบ้าน', en: 'Fine, like wet paint' } }, { id: 'b', text: { th: 'เป็นก้อนหยาบ', en: 'Coarse and lumpy' } }, { id: 'c', text: { th: 'ไม่มีฟองเลย', en: 'No foam at all' } }] },
          { id: 'q2', question: { th: 'เทลายหัวใจเริ่มจากตรงไหน', en: 'Where does a heart pour begin?' }, correctId: 'a', options: [{ id: 'a', text: { th: 'เทจากที่สูงก่อน', en: 'Pour from high' } }, { id: 'b', text: { th: 'วางถ้วยชิดผิวทันที', en: 'Rest the jug on the surface at once' } }, { id: 'c', text: { th: 'เทนมลงในถ้วยเปล่า', en: 'Pour into an empty cup' } }] },
        ],
      },
    ],
  },
}

export default dataset
