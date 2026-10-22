import type { LandingContent } from '../types'

// The generic dataset's landing page: a made-up AI consultancy, laid out like the reference page (sample text, mock names).
export const landing: LandingContent = {
  hero: {
    lead: { th: 'เปลี่ยน', en: 'Transform' },
    title: { th: 'วิธีทำงานขององค์กรด้วย AI', en: 'how your organisation works with AI' },
    text: {
      th: 'ทีมของเราช่วยวางแผน ฝึกคน และสร้างเครื่องมือ AI ให้ทำงานจริงในองค์กร เพื่อให้เห็นผลลัพธ์ที่วัดได้ ไม่ใช่แค่การทดลองใช้',
      en: 'We help you plan, train people and build AI tools that do real work in your organisation, so you see results you can measure, not just a trial.',
    },
    cta: { th: 'เริ่มต้นกับ AI', en: 'Start with AI' },
    more: { th: 'ดูโซลูชัน', en: 'See solutions' },
  },
  clients: {
    title: { th: 'องค์กรที่ไว้วางใจเรามาตลอด 10 ปี', en: 'Organisations that have trusted us for ten years' },
    groups: [
      { label: { th: 'การเงิน', en: 'Finance' }, names: ['Alpha Bank', 'Northwind Finance', 'Delta Credit', 'Summit Insurance'] },
      { label: { th: 'ค้าปลีก', en: 'Retail' }, names: ['Mega Mart', 'Fresh Basket', 'Urban Style', 'Home Plus'] },
      { label: { th: 'อสังหาริมทรัพย์', en: 'Real estate' }, names: ['Skyline Homes', 'Green Park Estate', 'Harbor Land'] },
      { label: { th: 'เทคโนโลยี', en: 'Technology' }, names: ['Nimbus Cloud', 'Pixel Works'] },
    ],
  },
  solutions: {
    title: { th: 'จากประสบการณ์ สู่โซลูชันที่ใช้ได้จริง', en: 'From experience to practical solutions' },
    text: {
      th: 'หลายปีที่ทำงานกับองค์กรต่างๆ ทำให้เราเห็นว่างานแบบไหนที่ AI ช่วยได้จริง จึงรวบรวมเป็นเครื่องมือสองตัวที่ใช้ได้ทันที',
      en: 'Years of working with organisations showed us where AI genuinely helps, so we packed that into two tools you can use right away.',
    },
    products: [
      {
        headline: { th: 'ลดงานคีย์ข้อมูล ลดความผิดพลาด และทำเอกสารได้เร็วขึ้น', en: 'Less data entry, fewer mistakes, faster paperwork' },
        name: { th: 'DocFlow', en: 'DocFlow' },
        tagline: { th: 'ประมวลผลเอกสารอัตโนมัติ', en: 'Automatic document processing' },
        features: [
          { title: { th: 'อ่านได้หลายรูปแบบ', en: 'Reads many formats' }, body: { th: 'PDF รูปถ่าย และแบบฟอร์มกระดาษที่สแกนมา', en: 'PDFs, photos and scanned paper forms.' } },
          { title: { th: 'จัดข้อมูลให้พร้อมใช้', en: 'Structures the data' }, body: { th: 'ดึงข้อมูลเป็นช่องๆ แล้วตรวจแก้ได้ในไม่กี่วินาที', en: 'Pulls the data into fields that you can check and fix in seconds.' } },
          { title: { th: 'ต่อกับระบบเดิม', en: 'Plugs into your systems' }, body: { th: 'ส่งข้อมูลเข้าระบบที่ใช้อยู่ โดยไม่ต้องย้ายข้อมูล', en: 'Sends data into the systems you already use, with no migration.' } },
        ],
        cta: { th: 'ทดลองใช้ DocFlow', en: 'Try DocFlow' },
      },
      {
        headline: { th: 'ยกระดับ AI จากเครื่องมือส่วนตัว ให้เป็นความสามารถของทั้งองค์กร', en: 'Turn AI from a personal tool into a skill of the whole organisation' },
        name: { th: 'TeamMind', en: 'TeamMind' },
        tagline: { th: 'แพลตฟอร์ม AI สำหรับองค์กร', en: 'An AI platform for organisations' },
        features: [
          { title: { th: 'AI หลายค่ายในที่เดียว', en: 'Several AIs in one place' }, body: { th: 'ใช้โมเดลชั้นนำ สร้างรูป สไลด์ และแดชบอร์ดได้จากหน้าเดียว', en: 'Use leading models and make images, slides and dashboards from one screen.' } },
          { title: { th: 'ผู้ช่วยที่รู้จักองค์กรคุณ', en: 'An assistant that knows you' }, body: { th: 'สอนให้ตอบคำถามที่ถูกถามบ่อยจากเอกสารภายในอย่างปลอดภัย', en: 'Teach it to answer common questions from your own documents, safely.' } },
          { title: { th: 'คุมงบได้', en: 'Costs under control' }, body: { th: 'กำหนดโควตาการใช้ของแต่ละทีม ไม่ให้ค่าใช้จ่ายบานปลาย', en: 'Set a usage quota for each team so spending never runs away.' } },
        ],
        cta: { th: 'สนใจข้อมูลเพิ่มเติม', en: 'Find out more' },
      },
    ],
  },
  academy: {
    title: { th: 'พัฒนาทักษะคนให้พร้อมกับ AI', en: 'Get your people ready for AI' },
    text: {
      th: 'หลักสูตรที่ออกแบบมาตั้งแต่ระดับผู้บริหารจนถึงทีมปฏิบัติการ เรียนแล้วนำไปใช้กับงานของตัวเองได้ทันที',
      en: 'Courses designed from executives to front-line teams, so people can apply what they learn to their own work straight away.',
    },
    viewAll: { th: 'ดูหลักสูตรทั้งหมด', en: 'See all courses' },
    courses: [
      { tag: { th: 'ผู้บริหาร', en: 'Executives' }, title: { th: 'AI สำหรับผู้บริหาร: ตัดสินใจอย่างมีทิศทาง', en: 'AI for executives: decide with direction' }, meta: { th: '1 วัน · ที่องค์กรหรือออนไลน์', en: '1 day · on site or online' } },
      { tag: { th: 'ทีมงาน', en: 'Teams' }, title: { th: 'ผู้ช่วย AI ในงานประจำวัน', en: 'AI assistants in everyday work' }, meta: { th: '1 วัน · ที่องค์กรหรือออนไลน์', en: '1 day · on site or online' } },
      { tag: { th: 'นักพัฒนา', en: 'Builders' }, title: { th: 'สร้างระบบด้วย AI สำหรับธุรกิจ', en: 'Build business tools with AI' }, meta: { th: '2 วัน · ออนไลน์', en: '2 days · online' } },
      { tag: { th: 'ข้อมูล', en: 'Data' }, title: { th: 'วิเคราะห์ข้อมูลด้วย AI', en: 'Analyse data with AI' }, meta: { th: '1 วัน · ออนไลน์', en: '1 day · online' } },
      { tag: { th: 'พื้นฐาน', en: 'Basics' }, title: { th: 'เขียนคำสั่งให้ได้ผลลัพธ์ที่ต้องการ', en: 'Write prompts that get the result you want' }, meta: { th: 'ครึ่งวัน · ออนไลน์', en: 'Half a day · online' } },
      { tag: { th: 'ความปลอดภัย', en: 'Safety' }, title: { th: 'ใช้ AI อย่างปลอดภัยในองค์กร', en: 'Using AI safely at work' }, meta: { th: 'ครึ่งวัน · ที่องค์กร', en: 'Half a day · on site' } },
    ],
  },
  partners: {
    title: { th: 'ทำงานร่วมกับเทคโนโลยีชั้นนำ', en: 'Working with leading technology' },
    text: {
      th: 'เราเลือกเครื่องมือและแพลตฟอร์มที่ยืดหยุ่นและพร้อมเติบโต เพื่อส่งมอบโซลูชันที่ทันสมัยและดูแลต่อได้ง่าย',
      en: 'We pick flexible tools and platforms that can grow with you, so what we deliver is modern and easy to maintain.',
    },
    names: ['CloudBase', 'FlowKit', 'PayLink', 'BuildSpace'],
  },
  articles: {
    title: { th: 'บทความ', en: 'Articles' },
    text: { th: 'กลยุทธ์ การใช้งานจริง และทิศทางของโลก AI', en: 'Strategy, real-world use and where AI is heading' },
    items: [
      { category: { th: 'เปรียบเทียบ', en: 'Comparison' }, title: { th: 'เปรียบเทียบ AI ผู้ช่วยยอดนิยม: ตัวไหนเหมาะกับงานอะไร', en: 'Popular AI assistants compared: which suits which job' }, summary: { th: 'สรุปจุดเด่นและข้อจำกัดของผู้ช่วย AI ที่คนใช้กันมากที่สุด พร้อมแนะนำว่าควรเลือกแบบไหนกับงานแบบไหน', en: 'A summary of the strengths and limits of the most used AI assistants, with advice on which to pick for which kind of work.' } },
      { category: { th: 'ผู้บริหาร', en: 'Leadership' }, title: { th: 'โครงสร้างองค์กรเปลี่ยนไปอย่างไรในยุค AI', en: 'How AI is reshaping organisation structures' }, summary: { th: 'ผู้บริหารควรรู้อะไรเมื่อ AI เริ่มเข้ามาทำงานที่เคยเป็นของคนกลางทาง และทีมควรปรับตัวอย่างไร', en: 'What leaders should know as AI takes over work that once sat in the middle, and how teams should adapt.' } },
      { category: { th: 'แนวโน้ม', en: 'Trends' }, title: { th: 'เอเจนต์ AI จะมาแทนซอฟต์แวร์ที่เราใช้อยู่จริงหรือ', en: 'Will AI agents really replace the software we use today' }, summary: { th: 'มองคำทำนายที่ถูกพูดถึงมากในปีนี้ด้วยข้อเท็จจริง และสิ่งที่องค์กรควรเตรียมตัวตั้งแต่วันนี้', en: 'A look at this year’s most talked-about prediction through the facts, and what organisations should prepare for today.' } },
    ],
  },
  faq: {
    title: { th: 'คำถามของคุณ ประสบการณ์ของเรา', en: 'Your questions, our experience' },
    text: { th: 'เรานำบทเรียนจากการทำงานกับองค์กรต่างๆ มาช่วยให้ AI ของคุณเกิดผลจริง', en: 'We bring lessons from working with many organisations to help your AI deliver.' },
    items: [
      { question: { th: 'บริษัทให้บริการอะไรบ้าง', en: 'What do you offer?' }, answer: { th: 'เราช่วยตั้งแต่วางกลยุทธ์ AI ฝึกอบรมบุคลากร ไปจนถึงสร้างและติดตั้งเครื่องมือที่ใช้งานได้จริงในองค์กร (ข้อมูลตัวอย่าง)', en: 'We help from setting an AI strategy and training people to building and installing tools that work in your organisation (sample information).' } },
      { question: { th: 'ต่างจากบริษัทอื่นอย่างไร', en: 'How are you different?' }, answer: { th: 'เราทำงานใกล้ชิดกับทั้งผู้บริหารและทีมปฏิบัติการ จึงเข้าใจว่างานจริงหน้าตาเป็นอย่างไร และเลือกใช้ AI ให้ตรงจุด (ข้อมูลตัวอย่าง)', en: 'We work closely with both executives and front-line teams, so we understand what the real work looks like and use AI where it fits (sample information).' } },
      { question: { th: 'เริ่มทำงานร่วมกันอย่างไร', en: 'How do we get started?' }, answer: { th: 'ฝากข้อมูลติดต่อไว้ ทีมงานจะนัดคุยเพื่อประเมินเป้าหมายและความพร้อมขององค์กร แล้วเสนอแนวทางที่เหมาะสม (ข้อมูลตัวอย่าง)', en: 'Leave your contact details and we will arrange a call to assess your goals and readiness, then suggest a fitting approach (sample information).' } },
    ],
  },
  contact: {
    company: { th: 'บริษัท แบรนด์ตัวอย่าง จำกัด', en: 'Sample Brand Co., Ltd.' },
    address: { th: 'เลขที่ 123 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง กรุงเทพมหานคร 10000', en: '123 Sample Road, Sample Subdistrict, Sample District, Bangkok 10000' },
    phone: '0-0000-0000',
    email: 'hello@example.com',
  },
  form: {
    title: { th: 'เริ่มต้นกับเรา', en: 'Get started with us' },
    companyLabel: { th: 'บริษัทหรือองค์กร (ไม่บังคับ)', en: 'Company or organisation (optional)' },
    interestLabel: { th: 'คุณสนใจเรื่องอะไร', en: 'What are you interested in?' },
    interests: [
      { id: 'journey', name: { th: 'เริ่มต้นกับ AI', en: 'Starting with AI' }, detail: { th: 'ปรึกษาเป้าหมายและแนวทาง', en: 'Talk through goals and approach' } },
      { id: 'product1', name: { th: 'DocFlow', en: 'DocFlow' }, detail: { th: 'ประมวลผลเอกสารอัตโนมัติ', en: 'Automatic document processing' } },
      { id: 'product2', name: { th: 'TeamMind', en: 'TeamMind' }, detail: { th: 'แพลตฟอร์ม AI สำหรับองค์กร', en: 'An AI platform for organisations' } },
      { id: 'course', name: { th: 'หลักสูตรอบรม', en: 'Training courses' }, detail: { th: 'พัฒนาทักษะทีมงาน', en: 'Build your team’s skills' } },
    ],
    perks: [
      { title: { th: 'คุยกับผู้เชี่ยวชาญ', en: 'Talk to an expert' }, body: { th: 'นัดคุยสั้นๆ เพื่อฟังโจทย์ของคุณ', en: 'A short call to hear what you need.' } },
      { title: { th: 'ข้อเสนอที่เหมาะกับองค์กร', en: 'A proposal that fits' }, body: { th: 'ได้แนวทางและงบประมาณคร่าวๆ ภายในไม่กี่วัน', en: 'A direction and a rough budget within a few days.' } },
      { title: { th: 'ไม่มีข้อผูกมัด', en: 'No obligation' }, body: { th: 'ปรึกษาเบื้องต้นไม่มีค่าใช้จ่าย', en: 'The first consultation is free.' } },
    ],
  },
}
