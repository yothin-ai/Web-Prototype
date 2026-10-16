import type { Localized } from '../../i18n'

// Sample text for the article pages. It is written for the demo and is the same shape for every
// article; `{cat}` and `{title}` are swapped for the article's own category and title.
const p = (th: string, en: string): Localized => ({ th, en })

export const articleContent = {
  intro: [
    p('บทความนี้เป็นตัวอย่างสำหรับเดโม เพื่อให้เห็นหน้าตาของหน้าอ่านบทความในหมวด "{cat}" เนื้อหาด้านล่างเป็นข้อความสมมติ ไม่ใช่คำแนะนำจริง', 'This is a sample article for the demo, showing how an article page looks in the "{cat}" group. The text below is made up and is not real advice.'),
    p('เรื่อง "{title}" เป็นหัวข้อที่หลายบ้านสนใจ เพราะเกี่ยวข้องกับการใช้ชีวิตประจำวันและการดูแลบ้านให้น่าอยู่', 'The topic "{title}" interests many households because it touches daily life and keeping a home pleasant.'),
    p('ลองดู 3 ประเด็นสำคัญต่อไปนี้ แล้วเลือกใช้ตามความเหมาะสมของบ้านคุณ', 'Look at the three points below and use what suits your home.'),
  ],
  sections: [
    { title: p('วางแผนก่อนเริ่มลงมือ', 'Plan before you start'), body: [
      p('เริ่มจากสำรวจพื้นที่และเป้าหมายของคุณ จดสิ่งที่ต้องการให้ชัด จะช่วยให้เลือกวัสดุและอุปกรณ์ได้ตรงกับงาน', 'Start by looking at the space and your goal. Write down what you want so you can choose materials and tools that fit the job.'),
      p('การวางแผนล่วงหน้าช่วยลดงานที่ต้องแก้ซ้ำ และประหยัดทั้งเวลาและค่าใช้จ่าย', 'Planning ahead means less rework and saves both time and money.'),
    ] },
    { title: p('เลือกวัสดุและอุปกรณ์ให้เหมาะกับงาน', 'Choose materials and tools that fit'), body: [
      p('วัสดุแต่ละชนิดเหมาะกับงานต่างกัน ควรดูรายละเอียดสินค้า ขนาด และข้อควรระวังก่อนซื้อทุกครั้ง', 'Each material suits different work. Check the product details, size and cautions before every purchase.'),
      p('ถ้าไม่แน่ใจ ลองเปรียบเทียบหลายรุ่นแล้วเลือกที่คุ้มค่าที่สุดสำหรับการใช้งานจริงของคุณ', 'If you are unsure, compare a few models and pick the one that gives the best value for how you will really use it.'),
    ] },
    { title: p('ดูแลรักษาหลังใช้งาน', 'Look after it afterwards'), body: [
      p('หลังใช้งานเสร็จ ควรทำความสะอาดและเก็บอุปกรณ์ให้เป็นระเบียบ เพื่อให้ใช้งานได้นานและพร้อมใช้ครั้งต่อไป', 'When you finish, clean and store your tools neatly so they last longer and are ready next time.'),
    ] },
  ],
  figure: p('ภาพประกอบตัวอย่าง', 'Sample illustration'),
  listIntro: p('ก่อนเริ่ม ควรเตรียมสิ่งเหล่านี้:', 'Before you start, get these ready:'),
  bullets: [
    p('รายการสิ่งที่ต้องทำและงบประมาณคร่าวๆ', 'A list of what to do and a rough budget'),
    p('อุปกรณ์ป้องกัน เช่น ถุงมือและแว่นตา', 'Protective gear such as gloves and glasses'),
    p('วัสดุและอุปกรณ์หลักที่ใช้กับงาน', 'The main materials and tools for the job'),
    p('พื้นที่ทำงานที่โล่งและปลอดภัย', 'A clear, safe place to work'),
  ],
  checkTitle: p('เช็กง่ายๆ ก่อนลงมือ', 'A quick check before you begin'),
  checks: [
    p('วางแผนพื้นที่ใช้งานแล้ว', 'The space is planned'),
    p('เลือกวัสดุที่เหมาะกับงานแล้ว', 'Materials are chosen'),
    p('เตรียมอุปกรณ์ครบแล้ว', 'Tools are ready'),
    p('ตรวจสอบความปลอดภัยแล้ว', 'Safety is checked'),
    p('วางแผนการเก็บรักษาหลังใช้งานแล้ว', 'Storage afterwards is planned'),
  ],
  summaryTitle: p('สรุปบทความ', 'Summary'),
  summary: [
    p('เรื่อง "{title}" เริ่มได้ง่ายถ้าวางแผนดี เลือกของให้เหมาะ และดูแลรักษาหลังใช้งาน', 'With "{title}", a good plan, the right choices and some care afterwards make it easy to start.'),
    p('ทำทีละขั้น ไม่ต้องรีบ แล้วบ้านของคุณจะน่าอยู่ขึ้นอย่างสบายใจ', 'Take it one step at a time and your home will become more pleasant without stress.'),
  ],
  faqTitle: p('FAQ', 'FAQ'),
  faq: [
    { q: p('ควรเริ่มจากตรงไหนก่อน?', 'Where should I start?'), a: p('เริ่มจากสำรวจพื้นที่และจดสิ่งที่ต้องการ แล้วค่อยเลือกวัสดุตามลำดับความสำคัญ', 'Start by looking at the space and noting what you want, then choose materials in order of importance.') },
    { q: p('ต้องใช้งบประมาณเท่าไร?', 'How much will it cost?'), a: p('ขึ้นกับขนาดงานและวัสดุที่เลือก ลองเปรียบเทียบหลายรุ่นก่อนตัดสินใจ', 'It depends on the size of the job and the materials you pick. Compare several models first.') },
    { q: p('ทำเองได้ไหมหรือควรจ้างช่าง?', 'Can I do it myself or should I hire a technician?'), a: p('งานเบาๆ ทำเองได้ ส่วนงานที่เกี่ยวกับความปลอดภัย เช่น ไฟฟ้า ควรให้ช่างทำ', 'Light jobs you can do yourself; for safety work such as electrics, hire a technician.') },
  ],
  closing: [
    p('หลังวางแผนแล้ว การเตรียมอุปกรณ์ให้เหมาะกับงานก็เป็นเรื่องสำคัญ', 'Once you have a plan, getting the right tools for the job matters too.'),
  ],
  shop: p('ดูสินค้าที่เกี่ยวข้องในร้านของเรา', 'See related products in our shop'),
  hotline: p('ข้อความตัวอย่าง: สายด่วนช่วยเหลือ 0-0000-0000', 'Sample text: help line 0-0000-0000'),
}
