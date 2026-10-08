import type { Dataset } from '../types'

const dataset: Dataset = {
  id: 'default',
  name: { th: 'ชุดข้อมูลกลาง', en: 'Generic dataset' },
  brandName: { th: 'แบรนด์ตัวอย่าง', en: 'Sample Brand' },
  tagline: { th: 'ข้อมูลสมมติสำหรับดูโครงสร้าง', en: 'Placeholder content for judging structure' },
  ecommerce: {
    products: [
      { id: 'p1', category: { th: 'เครื่องเขียน', en: 'Stationery' }, name: { th: 'สมุดโน้ตปกผ้า', en: 'Cloth-bound notebook' }, description: { th: 'กระดาษเรียบ 120 หน้า เหมาะกับจดและร่างภาพ', en: '120 smooth pages for notes and sketches' }, price: 290 },
      { id: 'p2', category: { th: 'เครื่องเขียน', en: 'Stationery' }, name: { th: 'ชุดปากกาหมึกเจล', en: 'Gel pen set' }, description: { th: 'ปากกา 5 สี เขียนลื่น หมึกแห้งเร็ว', en: 'Five colors that write smoothly and dry fast' }, price: 159 },
      { id: 'p3', category: { th: 'ของใช้บนโต๊ะ', en: 'Desk' }, name: { th: 'โคมไฟตั้งโต๊ะ', en: 'Desk lamp' }, description: { th: 'ปรับความสว่างได้ 3 ระดับ ถนอมสายตา', en: 'Three brightness levels that are easy on the eyes' }, price: 890 },
      { id: 'p4', category: { th: 'ของใช้บนโต๊ะ', en: 'Desk' }, name: { th: 'ที่วางโน้ตบุ๊กอะลูมิเนียม', en: 'Aluminium laptop stand' }, description: { th: 'พับเก็บได้ รองรับจอสูงสุด 16 นิ้ว', en: 'Folds flat and holds screens up to 16 inches' }, price: 1290 },
      { id: 'p5', category: { th: 'เครื่องดื่ม', en: 'Drinkware' }, name: { th: 'แก้วเซรามิกมีฝา', en: 'Ceramic lidded mug' }, description: { th: 'จุ 350 มล. เข้าไมโครเวฟได้', en: '350 ml and microwave safe' }, price: 350 },
      { id: 'p6', category: { th: 'กระเป๋า', en: 'Bags' }, name: { th: 'กระเป๋าผ้าใบสะพายข้าง', en: 'Canvas shoulder bag' }, description: { th: 'ผ้าหนา กันน้ำเบา ๆ ใส่ของได้เยอะ', en: 'Thick, lightly water-resistant, roomy' }, price: 690 },
    ],
    shippingMethods: [
      { id: 'standard', name: { th: 'ส่งธรรมดา', en: 'Standard' }, detail: { th: '3–5 วันทำการ', en: '3–5 business days' }, price: 40 },
      { id: 'express', name: { th: 'ส่งด่วน', en: 'Express' }, detail: { th: 'ภายในวันถัดไป', en: 'Next day' }, price: 90 },
    ],
    paymentMethods: [
      { id: 'card', name: { th: 'บัตรเครดิต/เดบิต', en: 'Credit / debit card' }, detail: { th: 'จำลองเท่านั้น ไม่มีการตัดเงินจริง', en: 'Simulated, no real charge' } },
      { id: 'promptpay', name: { th: 'พร้อมเพย์', en: 'PromptPay' }, detail: { th: 'จำลองเท่านั้น ไม่มีการตัดเงินจริง', en: 'Simulated, no real charge' } },
      { id: 'cod', name: { th: 'เก็บเงินปลายทาง', en: 'Cash on delivery' }, detail: { th: 'ชำระเมื่อได้รับสินค้า', en: 'Pay when it arrives' } },
    ],
  },
  landing: {
    badge: { th: 'ทดลองใช้ฟรี 14 วัน', en: 'Free for 14 days' },
    featuresTitle: { th: 'ทำไมทีมถึงเลือกใช้', en: 'Why teams choose it' },
    finalTitle: { th: 'พร้อมวางแผนงานให้เป็นระเบียบแล้วหรือยัง', en: 'Ready to get your work in order?' },
    formTitle: { th: 'สมัครทดลองใช้ฟรี', en: 'Start your free trial' },
    companyLabel: { th: 'บริษัทหรือทีม (ไม่บังคับ)', en: 'Company or team (optional)' },
    interestLabel: { th: 'ขนาดทีมของคุณ', en: 'Your team size' },
    headline: { th: 'วางแผนงานของทีมไว้ในที่เดียว', en: 'Plan your team’s work in one place' },
    subheadline: {
      th: 'รวมงาน กำหนดส่ง และการสื่อสารของทีมไว้ด้วยกัน ให้ทุกคนเห็นภาพเดียวกันโดยไม่ต้องไล่ถามในแชต',
      en: 'Bring tasks, deadlines and team conversations together so everyone sees the same picture without chasing answers in chat.',
    },
    cta: { th: 'เริ่มทดลองใช้ฟรี', en: 'Start your free trial' },
    features: [
      { title: { th: 'บอร์ดงานที่เข้าใจง่าย', en: 'A board anyone can read' }, body: { th: 'ลากงานข้ามสถานะได้ทันที เห็นว่าใครถืองานอะไรอยู่', en: 'Drag work across stages and see who owns what.' } },
      { title: { th: 'เตือนก่อนถึงกำหนด', en: 'Reminders before deadlines' }, body: { th: 'แจ้งเตือนอัตโนมัติ ไม่มีงานหลุดโดยไม่มีใครรู้', en: 'Automatic nudges so nothing slips by unnoticed.' } },
      { title: { th: 'สรุปความคืบหน้าให้เอง', en: 'Progress summaries, automatically' }, body: { th: 'ได้รายงานประจำสัปดาห์โดยไม่ต้องทำสไลด์', en: 'A weekly report without building a slide deck.' } },
    ],
    steps: [
      { title: { th: 'สมัครและสร้างทีม', en: 'Sign up and create a team' }, body: { th: 'ใช้เวลาไม่ถึงสองนาที', en: 'It takes under two minutes.' } },
      { title: { th: 'เชิญเพื่อนร่วมงาน', en: 'Invite your colleagues' }, body: { th: 'แชร์ลิงก์เดียว ทุกคนเข้าร่วมได้เลย', en: 'Share one link and everyone can join.' } },
      { title: { th: 'เริ่มวางแผนงานแรก', en: 'Plan your first project' }, body: { th: 'เริ่มจากแม่แบบสำเร็จรูปหรือสร้างเอง', en: 'Start from a ready-made template or build your own.' } },
    ],
    testimonials: [
      { quote: { th: 'ประชุมสั้นลงครึ่งหนึ่ง เพราะทุกคนเห็นสถานะงานตรงกัน', en: 'Our meetings got half as long because everyone sees the same status.' }, author: { th: 'ผู้จัดการโครงการ ทีมการตลาด', en: 'Project manager, marketing team' } },
      { quote: { th: 'เปลี่ยนมาใช้แล้วไม่ต้องตามงานในไลน์อีกเลย', en: 'We stopped chasing work over chat the day we switched.' }, author: { th: 'หัวหน้าทีมออกแบบ', en: 'Design team lead' } },
    ],
    faqs: [
      { question: { th: 'ต้องใส่บัตรเครดิตตอนทดลองใช้ไหม', en: 'Do I need a credit card for the trial?' }, answer: { th: 'ไม่ต้อง ทดลองใช้ได้ฟรีโดยไม่ต้องผูกบัตร', en: 'No. The trial is free and needs no card.' } },
      { question: { th: 'ย้ายข้อมูลจากเครื่องมือเดิมได้ไหม', en: 'Can I move data from my current tool?' }, answer: { th: 'นำเข้าจากไฟล์ CSV ได้ในไม่กี่คลิก', en: 'Yes, import from a CSV file in a few clicks.' } },
      { question: { th: 'ยกเลิกได้เมื่อไหร่', en: 'When can I cancel?' }, answer: { th: 'ยกเลิกได้ทุกเมื่อ ไม่มีค่าธรรมเนียม', en: 'Any time, with no fee.' } },
    ],
    interests: [
      { id: 'small', name: { th: 'ทีมเล็ก', en: 'Small team' }, detail: { th: '1–10 คน', en: '1–10 people' } },
      { id: 'growing', name: { th: 'ทีมกำลังเติบโต', en: 'Growing team' }, detail: { th: '11–50 คน', en: '11–50 people' } },
      { id: 'company', name: { th: 'ทั้งองค์กร', en: 'Whole company' }, detail: { th: 'มากกว่า 50 คน', en: 'More than 50 people' } },
    ],
  },
  education: {
    courses: [
      {
        id: 'photo',
        title: { th: 'พื้นฐานการถ่ายภาพ', en: 'Photography basics' },
        summary: { th: 'เข้าใจแสงและองค์ประกอบภาพ แล้วถ่ายรูปสวยขึ้นได้ด้วยกล้องที่มีอยู่', en: 'Understand light and composition and take better photos with the camera you already have.' },
        level: { th: 'มือใหม่', en: 'Beginner' },
        lessons: [
          { id: 'p1', minutes: 8, title: { th: 'แสงและการเปิดรับแสง', en: 'Light and exposure' }, body: { th: 'แสงคือหัวใจของภาพถ่าย ภาพจะสว่างหรือมืดขึ้นอยู่กับปริมาณแสงที่เข้าสู่เซ็นเซอร์ ลองถ่ายหัวข้อเดียวกันในที่สว่างและที่มืดเพื่อดูความต่าง', en: 'Light is the heart of a photo. How bright or dark it looks depends on how much light reaches the sensor. Shoot the same subject in bright and dim places to see the difference.' } },
          { id: 'p2', minutes: 6, title: { th: 'องค์ประกอบภาพ', en: 'Composition' }, body: { th: 'กฎสามส่วนช่วยให้ภาพสมดุล วางจุดเด่นไว้ที่จุดตัดของเส้นแบ่งสามส่วน แทนที่จะไว้กลางภาพ', en: 'The rule of thirds keeps a photo balanced. Put the subject on an intersection of the thirds lines instead of the center.' } },
          { id: 'p3', minutes: 7, title: { th: 'การจัดแสงในร่ม', en: 'Lighting indoors' }, body: { th: 'แสงจากหน้าต่างนุ่มนวลและเป็นธรรมชาติ ให้วางตัวแบบข้างหน้าต่างแทนการใช้แฟลชตรง ๆ', en: 'Window light is soft and natural. Place the subject beside a window rather than using direct flash.' } },
        ],
        quiz: [
          { id: 'q1', question: { th: 'ภาพที่มืดเกินไปมักเกิดจากอะไร', en: 'What usually makes a photo too dark?' }, correctId: 'a', options: [{ id: 'a', text: { th: 'แสงเข้าสู่เซ็นเซอร์น้อยเกินไป', en: 'Too little light reached the sensor' } }, { id: 'b', text: { th: 'ใช้เลนส์สะอาดเกินไป', en: 'The lens was too clean' } }, { id: 'c', text: { th: 'ถ่ายในแนวนอน', en: 'It was shot in landscape' } }] },
          { id: 'q2', question: { th: 'กฎสามส่วนแนะนำให้วางจุดเด่นไว้ที่ใด', en: 'Where does the rule of thirds put the subject?' }, correctId: 'b', options: [{ id: 'a', text: { th: 'กลางภาพเสมอ', en: 'Always in the center' } }, { id: 'b', text: { th: 'ที่จุดตัดของเส้นแบ่งสามส่วน', en: 'On an intersection of the thirds lines' } }, { id: 'c', text: { th: 'มุมล่างสุดของภาพ', en: 'In the very bottom corner' } }] },
        ],
      },
      {
        id: 'email',
        title: { th: 'เขียนอีเมลให้คนอยากตอบ', en: 'Writing emails people answer' },
        summary: { th: 'เทคนิคสั้น ๆ สำหรับหัวข้อ โครงสร้าง และการปิดท้ายที่ทำให้ผู้รับตอบกลับ', en: 'Short techniques for subjects, structure and closings that get a reply.' },
        level: { th: 'ทุกระดับ', en: 'All levels' },
        lessons: [
          { id: 'e1', minutes: 5, title: { th: 'หัวข้อที่ดี', en: 'A good subject line' }, body: { th: 'หัวข้อควรบอกว่าอีเมลเกี่ยวกับอะไรและต้องการอะไร เช่น “ขออนุมัติงบ 5,000 บาท ภายในวันศุกร์” ดีกว่า “ขอความอนุเคราะห์”', en: 'A subject should say what the email is about and what you need, such as “Approval needed for 5,000 baht by Friday” instead of “A request”.' } },
          { id: 'e2', minutes: 6, title: { th: 'โครงสร้างที่สั้นกระชับ', en: 'A short structure' }, body: { th: 'เริ่มด้วยสิ่งที่ต้องการ ตามด้วยเหตุผลสั้น ๆ และรายละเอียดที่จำเป็นเท่านั้น', en: 'Start with what you need, then a brief reason and only the details that matter.' } },
          { id: 'e3', minutes: 4, title: { th: 'ปิดท้ายด้วยการกระทำ', en: 'Close with an action' }, body: { th: 'ระบุให้ชัดว่าผู้รับต้องทำอะไรและภายในเมื่อไหร่ เพื่อให้ตอบได้ในครั้งเดียว', en: 'Say clearly what the reader should do and by when, so they can answer in one go.' } },
        ],
        quiz: [
          { id: 'q1', question: { th: 'หัวข้ออีเมลที่ดีควรมีอะไร', en: 'What should a good subject line contain?' }, correctId: 'b', options: [{ id: 'a', text: { th: 'คำทักทายยาว ๆ', en: 'A long greeting' } }, { id: 'b', text: { th: 'เรื่องที่เกี่ยวข้องและสิ่งที่ต้องการ', en: 'The topic and what you need' } }, { id: 'c', text: { th: 'ตัวพิมพ์ใหญ่ทั้งหมด', en: 'All capital letters' } }] },
          { id: 'q2', question: { th: 'ควรวางสิ่งที่ต้องการไว้ตรงไหนของอีเมล', en: 'Where should the request go in the email?' }, correctId: 'a', options: [{ id: 'a', text: { th: 'ตอนต้น', en: 'Near the start' } }, { id: 'b', text: { th: 'ท้ายสุดหลังเล่าประวัติ', en: 'At the very end after the backstory' } }, { id: 'c', text: { th: 'ในไฟล์แนบเท่านั้น', en: 'Only in an attachment' } }] },
        ],
      },
      {
        id: 'money',
        title: { th: 'จัดการเงินเบื้องต้น', en: 'Money basics' },
        summary: { th: 'วางงบรายเดือน สร้างเงินสำรอง และออมก่อนใช้ ด้วยวิธีที่ทำได้จริง', en: 'Plan a monthly budget, build a reserve and save first with methods you can actually keep.' },
        level: { th: 'มือใหม่', en: 'Beginner' },
        lessons: [
          { id: 'm1', minutes: 6, title: { th: 'งบรายเดือน', en: 'Monthly budget' }, body: { th: 'จดรายรับและรายจ่ายประจำก่อน แล้วแบ่งเงินที่เหลือเป็นส่วนใช้จ่ายและส่วนออม', en: 'Write down income and fixed costs first, then split what is left between spending and saving.' } },
          { id: 'm2', minutes: 7, title: { th: 'เงินสำรองฉุกเฉิน', en: 'Emergency fund' }, body: { th: 'เป้าหมายเริ่มต้นคือเงินสำรองเท่ากับค่าใช้จ่ายสามเดือน เก็บแยกบัญชีเพื่อไม่ให้เผลอใช้', en: 'A starting goal is three months of expenses, kept in a separate account so it is not spent by accident.' } },
          { id: 'm3', minutes: 5, title: { th: 'ออมก่อนใช้', en: 'Pay yourself first' }, body: { th: 'ตั้งโอนเงินออมอัตโนมัติทันทีที่เงินเดือนเข้า แทนการรอออมจากเงินที่เหลือ', en: 'Set up an automatic transfer the moment your salary arrives instead of saving what is left.' } },
        ],
        quiz: [
          { id: 'q1', question: { th: 'เงินสำรองฉุกเฉินเบื้องต้นควรเท่ากับกี่เดือนของค่าใช้จ่าย', en: 'How many months of expenses is a starting emergency fund?' }, correctId: 'b', options: [{ id: 'a', text: { th: 'หนึ่งสัปดาห์', en: 'One week' } }, { id: 'b', text: { th: 'สามเดือน', en: 'Three months' } }, { id: 'c', text: { th: 'ห้าปี', en: 'Five years' } }] },
          { id: 'q2', question: { th: '“ออมก่อนใช้” หมายถึงอะไร', en: 'What does “pay yourself first” mean?' }, correctId: 'a', options: [{ id: 'a', text: { th: 'โอนเงินออมทันทีที่เงินเข้า', en: 'Transfer savings as soon as money arrives' } }, { id: 'b', text: { th: 'ออมเฉพาะเงินที่เหลือท้ายเดือน', en: 'Only save what is left at month end' } }, { id: 'c', text: { th: 'ไม่ต้องออมเลย', en: 'Do not save at all' } }] },
        ],
      },
    ],
  },
}

export default dataset
