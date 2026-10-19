import type { Localized } from '../../i18n'

// Sample text written for each article of the hardware shop, in the same shape as the shared template in
// articleContent.ts (a lead and an intro, three sections, a short list). It replaces the template's intro,
// sections and list for that article; the checklist, summary and FAQ still come from the template.
// Looked up by the Thai title. Written for the demo; the health and safety advice is general sample text.
export type ArticleText = {
  intro: Localized[]
  sections: { title: Localized; body: Localized[] }[]
  listIntro?: Localized
  bullets: Localized[]
}

const p = (th: string, en: string): Localized => ({ th, en })
const sec = (title: Localized, ...body: Localized[]) => ({ title, body })

const texts: Record<string, ArticleText> = {
  'แต่งห้องนั่งเล่นให้อบอุ่นน่าอยู่': {
    intro: [
      p('ไอเดียเลือกเฟอร์นิเจอร์และของแต่งบ้านที่ทำให้ทุกวันที่บ้านเป็นวันที่ดี', 'Ideas for choosing furniture and decor that make every day at home a good one'),
      p('ห้องนั่งเล่นคือพื้นที่ที่ทุกคนในบ้านใช้เวลาร่วมกันมากที่สุด การปรับเพียงไม่กี่อย่างก็ช่วยให้ห้องดูอบอุ่นและนั่งสบายขึ้นได้ทันที', 'The living room is where everyone at home spends the most time together. A few small changes can make it feel warmer and more comfortable straight away.'),
    ],
    sections: [
      sec(p('เริ่มจากแสงและสีโทนอุ่น', 'Start with light and warm colours'), p('เลือกผ้าม่านบางที่ให้แสงธรรมชาติผ่านเข้ามา และใช้ผนังสีครีมหรือขาวนวลเป็นพื้น แล้วเพิ่มสีเน้นอย่างส้มอิฐหรือน้ำตาลเพียงจุดสองจุด ห้องจะดูอบอุ่นโดยไม่รู้สึกแน่น', 'Choose sheer curtains that let daylight in, use cream or soft white walls as the base, then add one or two accents of terracotta or brown. The room feels warm without feeling crowded.')),
      sec(p('เลือกเฟอร์นิเจอร์ให้พอดีห้อง', 'Choose furniture that fits the room'), p('วัดพื้นที่ก่อนซื้อ เว้นทางเดินอย่างน้อยประมาณ 80 เซนติเมตร เลือกโซฟาที่นั่งสบายและโต๊ะกลางขนาดสมส่วน ไม้และผ้าสีธรรมชาติช่วยให้ห้องดูผ่อนคลาย', 'Measure before you buy and leave a walkway of about 80 centimetres. Pick a comfortable sofa and a well-proportioned coffee table; wood and natural-coloured fabric keep the room relaxed.')),
      sec(p('เติมของแต่งบ้านเล็กๆ ให้มีชีวิต', 'Add small touches that bring it to life'), p('ต้นไม้ใบเขียว พรมเส้นใยธรรมชาติ และโคมไฟทรงเรียบ ช่วยเพิ่มมิติโดยไม่ต้องรื้อห้องใหม่ ลองเปลี่ยนทีละชิ้นตามงบประมาณ', 'Leafy plants, a natural-fibre rug and a simple lamp add depth without redoing the room. Change one piece at a time to fit your budget.')),
    ],
    bullets: [
      p('ภาพห้องที่ชอบ 2-3 ภาพ', 'Two or three photos of rooms you like'),
      p('ขนาดห้องและตำแหน่งปลั๊กไฟ', 'The size of the room and where the sockets are'),
      p('ตัวอย่างสีผนังและผ้าม่าน', 'Samples of wall colour and curtain fabric'),
      p('งบประมาณคร่าวๆ แยกตามรายการ', 'A rough budget split by item'),
    ],
  },

  'เชื่อมต่อบัญชี รับสิทธิพิเศษฟรี': {
    intro: [
      p('สมาชิกรับของแถมและสิทธิพิเศษหลายต่อ', 'Members get free gifts and several perks'),
      p('การเชื่อมต่อบัญชีสมาชิกเข้ากับช่องทางที่คุณใช้อยู่ ทำให้รับสิทธิ์และติดตามคะแนนสะสมได้สะดวกขึ้นในที่เดียว (ข้อมูลตัวอย่าง)', 'Linking your member account to the channels you already use lets you claim perks and follow your points in one place (sample information).'),
    ],
    sections: [
      sec(p('เชื่อมต่อบัญชีทำอย่างไร', 'How to link your account'), p('เข้าสู่ระบบ เปิดหน้าสมาชิก แล้วเลือกเชื่อมต่อกับบัญชีที่ต้องการ ใช้เวลาไม่ถึงหนึ่งนาที และยกเลิกได้ทุกเมื่อ', 'Sign in, open the member page and choose the account to link. It takes under a minute and you can unlink at any time.')),
      sec(p('สิทธิพิเศษที่ได้รับ', 'The perks you get'), p('สมาชิกที่เชื่อมต่อแล้วจะได้ของแถม คูปองส่วนลด และคะแนนสะสมเพิ่ม รายการที่แน่ชัดอาจเปลี่ยนตามช่วงเวลา (ข้อมูลตัวอย่าง)', 'Linked members receive free gifts, discount coupons and bonus points. The exact list may change over time (sample information).')),
      sec(p('ใช้สิทธิให้คุ้มที่สุด', 'Make the most of them'), p('ตรวจวันหมดอายุของคูปองในหน้าคูปองของฉัน แล้วเลือกใช้กับรายการที่ต้องซื้ออยู่แล้ว จะประหยัดได้มากกว่าซื้อเพิ่มเพื่อใช้สิทธิ', 'Check the expiry dates on the My coupons page and use them on things you were going to buy anyway; that saves more than buying extra to use a perk.')),
    ],
    bullets: [
      p('บัญชีสมาชิกที่เข้าสู่ระบบแล้ว', 'A member account that is signed in'),
      p('เบอร์โทรศัพท์หรืออีเมลที่ใช้สมัคร', 'The phone number or email you registered with'),
      p('ช่องทางที่ต้องการเชื่อมต่อ', 'The channel you want to link'),
      p('เวลาว่างประมาณหนึ่งนาที', 'About a minute of spare time'),
    ],
  },

  'รางน้ำฝนล้น แก้ได้ง่ายกว่าที่คิด': {
    intro: [
      p('วิธีเช็กและแก้ก่อนฝนตกหนัก', 'How to check and fix it before heavy rain'),
      p('รางน้ำฝนที่ล้นมักเกิดจากสิ่งอุดตันหรือความลาดเอียงที่ไม่พอ ซึ่งส่วนใหญ่ตรวจและแก้เองได้ถ้าทำก่อนฝนตกหนัก', 'An overflowing rain gutter is usually caused by a blockage or too little slope, and most of the time you can check and fix it yourself if you do it before heavy rain.'),
    ],
    sections: [
      sec(p('เช็กสิ่งอุดตันก่อน', 'Check for blockages first'), p('ใบไม้ เศษดิน และเศษวัสดุเป็นสาเหตุที่พบบ่อยที่สุด ใช้ถุงมือและพลั่วเล็กตักออก แล้วฉีดน้ำไล่ให้ไหลลงท่อ อย่าขึ้นบันไดขณะฝนตกหรือพื้นเปียก', 'Leaves, soil and debris are the most common cause. Scoop them out with gloves and a small trowel, then flush with water. Never climb a ladder in the rain or on wet ground.')),
      sec(p('ตรวจความลาดเอียงและรอยต่อ', 'Check the slope and the joints'), p('รางควรลาดลงหาท่อลงอย่างสม่ำเสมอ ถ้ามีน้ำขังกลางราง ให้ปรับตัวยึดใหม่ และอุดรอยรั่วที่รอยต่อด้วยซีลแลนต์สำหรับงานกลางแจ้ง', 'The gutter should fall steadily towards the downpipe. If water pools in the middle, adjust the brackets, and seal leaking joints with an outdoor sealant.')),
      sec(p('ป้องกันไม่ให้เกิดซ้ำ', 'Stop it happening again'), p('ติดตะแกรงกันใบไม้ ตัดกิ่งไม้ที่ห้อยเหนือหลังคา และเช็กรางทุกต้นฤดูฝน จะลดโอกาสล้นได้มาก', 'Fit a leaf guard, trim branches that hang over the roof and check the gutter at the start of every rainy season; this cuts the chance of overflow a lot.')),
    ],
    bullets: [
      p('บันไดที่ตั้งมั่นคง', 'A stable ladder'),
      p('ถุงมือและรองเท้ากันลื่น', 'Gloves and non-slip shoes'),
      p('พลั่วเล็กและสายยาง', 'A small trowel and a hose'),
      p('ซีลแลนต์และตะแกรงกันใบไม้', 'Sealant and a leaf guard'),
    ],
  },

  'สัญญาณเตือนสุขภาพหลังน้ำท่วม 7 ข้อ': {
    intro: [
      p('อย่ามองข้ามเพื่อความปลอดภัยของทุกคนในบ้าน', 'Do not ignore them, for the safety of everyone at home'),
      p('หลังน้ำลด ร่างกายและบ้านยังมีความเสี่ยงที่มองไม่เห็น การรู้สัญญาณเตือนไว้ช่วยให้รีบดูแลได้ทันเวลา ข้อความนี้เป็นข้อมูลทั่วไปแบบตัวอย่าง ไม่ใช่คำแนะนำทางการแพทย์', 'After the water recedes there are still risks you cannot see, and knowing the warning signs helps you act in time. This is general sample information, not medical advice.'),
    ],
    sections: [
      sec(p('ผิวหนังและแผล (ข้อ 1-2)', 'Skin and wounds (signs 1 and 2)'), p('ข้อ 1 แผลที่แดง บวม หรือมีหนอง และข้อ 2 ผื่นคันหลังย่ำน้ำ ควรล้างให้สะอาดและปรึกษาแพทย์หากอาการไม่ดีขึ้น', 'Sign 1 is a wound that is red, swollen or weeping, and sign 2 is an itchy rash after wading. Clean it well and see a doctor if it does not improve.')),
      sec(p('ท้อง ไข้ และการหายใจ (ข้อ 3-5)', 'Stomach, fever and breathing (signs 3 to 5)'), p('ข้อ 3 ท้องเสียหรืออาเจียน ข้อ 4 ไข้สูง และข้อ 5 ไอหรือหายใจลำบาก ควรดื่มน้ำสะอาดให้เพียงพอ และไปพบแพทย์เมื่อมีอาการหนัก', 'Sign 3 is diarrhoea or vomiting, sign 4 a high fever and sign 5 a cough or trouble breathing. Drink enough clean water and see a doctor if it is severe.')),
      sec(p('สภาพบ้าน (ข้อ 6-7)', 'The state of the house (signs 6 and 7)'), p('ข้อ 6 กลิ่นอับหรือเชื้อรา และข้อ 7 สายไฟหรือเต้ารับที่เปียกน้ำ เป็นความเสี่ยงต่อทั้งสุขภาพและความปลอดภัย ควรระบายอากาศและให้ช่างตรวจระบบไฟก่อนใช้งาน', 'Sign 6 is a musty smell or mould and sign 7 is wet wiring or sockets, both risks to health and safety. Ventilate and have an electrician check the wiring before use.')),
    ],
    bullets: [
      p('รองเท้าบู๊ตและถุงมือยาง', 'Rubber boots and gloves'),
      p('น้ำดื่มสะอาดและยาสามัญประจำบ้าน', 'Clean drinking water and basic home medicines'),
      p('หน้ากากอนามัย', 'Face masks'),
      p('เบอร์ติดต่อหน่วยงานช่วยเหลือในพื้นที่', 'Contact numbers of local help services'),
    ],
  },

  '10 ขั้นตอนดูแลบ้านหลังน้ำลด': {
    intro: [
      p('ให้กลับมาปลอดภัยและน่าอยู่อีกครั้ง', 'Make it safe and pleasant to live in again'),
      p('หลังน้ำลด ควรทำตามลำดับ คือความปลอดภัยก่อน แล้วจึงทำความสะอาดและซ่อมแซม บทความนี้สรุป 10 ขั้นตอนไว้เป็น 3 ช่วง', 'After the water recedes, work in order: safety first, then cleaning, then repairs. This article groups the ten steps into three stages.'),
    ],
    sections: [
      sec(p('ขั้นตอนที่ 1-3: ความปลอดภัยก่อน', 'Steps 1 to 3: safety first'), p('ตัดไฟที่เบรกเกอร์ ตรวจพื้นที่ลื่นและส่วนที่อาจพังถล่ม สวมรองเท้าบู๊ตและถุงมือก่อนเข้าบ้าน อย่าเปิดอุปกรณ์ไฟฟ้าที่เปียกน้ำ', 'Switch the power off at the breaker, check for slippery floors and anything that could collapse, and wear boots and gloves before going in. Do not switch on wet electrical appliances.')),
      sec(p('ขั้นตอนที่ 4-7: ทำความสะอาด', 'Steps 4 to 7: cleaning'), p('เปิดประตูหน้าต่างให้อากาศถ่ายเท ขนของออก ล้างพื้นและผนังด้วยน้ำยาฆ่าเชื้อ และตากเฟอร์นิเจอร์ให้แห้ง', 'Open doors and windows for air, carry things out, wash floors and walls with a disinfectant and dry the furniture.')),
      sec(p('ขั้นตอนที่ 8-10: ซ่อมแซมและป้องกัน', 'Steps 8 to 10: repair and prevent'), p('ให้ช่างตรวจไฟและประปา ซ่อมผนังและพื้นที่เสียหาย ทาสีกันชื้น และเตรียมอุปกรณ์ป้องกันสำหรับครั้งหน้า', 'Have an electrician and plumber check the house, repair damaged walls and floors, apply damp-proof paint and get your flood protection ready for next time.')),
    ],
    bullets: [
      p('รองเท้าบู๊ตและถุงมือยาง', 'Rubber boots and gloves'),
      p('น้ำยาฆ่าเชื้อและไม้ถูพื้น', 'Disinfectant and a mop'),
      p('พัดลมหรือเครื่องลดความชื้น', 'A fan or dehumidifier'),
      p('ถังและผ้าสะอาด', 'Buckets and clean cloths'),
    ],
  },

  'น้ำย้อนเข้าบ้าน ติดวาล์วกันย้อนเองได้ไหม': {
    intro: [
      p('ขั้นตอนง่ายๆ ที่ทำเองได้ที่บ้าน', 'Simple steps you can do at home'),
      p('น้ำย้อนเข้าบ้านผ่านท่อระบายน้ำตอนฝนตกหนักเป็นปัญหาที่พบบ่อยในพื้นที่ลุ่ม วาล์วกันย้อนช่วยให้น้ำไหลออกได้ทางเดียว', 'Water backing up through the drain in heavy rain is common in low-lying areas. A check valve lets water flow out in one direction only.'),
    ],
    sections: [
      sec(p('เลือกวาล์วให้ตรงกับท่อ', 'Pick a valve that matches the pipe'), p('วัดขนาดท่อและเลือกวาล์วกันย้อนที่มีขนาดเท่ากัน ท่อพีวีซีในบ้านมักใช้ 2-4 นิ้ว วาล์วทองเหลืองทนทานกว่าแบบพลาสติก', 'Measure the pipe and choose a check valve of the same size. Household PVC pipes are often 2 to 4 inches; a brass valve lasts longer than a plastic one.')),
      sec(p('ติดตั้งทีละขั้น', 'Fit it step by step'), p('ปิดน้ำ ตัดท่อด้วยเครื่องตัดท่อ ใส่วาล์วโดยให้ลูกศรบนตัววาล์วชี้ตามทิศทางที่น้ำไหลออก แล้วขันข้อต่อให้แน่น', 'Turn the water off, cut the pipe with a pipe cutter, fit the valve with its arrow pointing the way the water leaves, and tighten the joints.')),
      sec(p('ทดสอบก่อนใช้จริง', 'Test before relying on it'), p('เปิดน้ำไหลผ่านและดูว่าไม่รั่วซึม จากนั้นลองราดน้ำย้อนทางเบาๆ ถ้าน้ำไม่ไหลกลับ แสดงว่าติดตั้งถูกต้อง ถ้าไม่มั่นใจควรให้ช่างช่วย', 'Run water through and check for leaks, then pour a little water back the wrong way. If it does not come back, the valve is fitted correctly. If you are unsure, ask a technician.')),
    ],
    bullets: [
      p('วาล์วกันย้อนขนาดเท่าท่อ', 'A check valve the same size as the pipe'),
      p('เครื่องตัดท่อและประแจ', 'A pipe cutter and a wrench'),
      p('เทปพันเกลียว', 'Thread seal tape'),
      p('ถุงมือและผ้าเช็ดมือ', 'Gloves and a rag'),
    ],
  },

  'ความรู้เรื่องปูน สำหรับคนสร้างบ้านครั้งแรก': {
    intro: [
      p('เลือกให้ถูกชนิด ใช้ให้ถูกงาน', 'Pick the right type and use it for the right job'),
      p('ปูนมีหลายชนิดและแต่ละชนิดเหมาะกับงานต่างกัน คนสร้างบ้านครั้งแรกควรรู้พื้นฐานเหล่านี้ก่อนสั่งซื้อ', 'There are several kinds of cement and each suits a different job. First-time home builders should know these basics before ordering.'),
    ],
    sections: [
      sec(p('ปูนมีกี่ชนิด', 'What kinds are there'), p('ปูนซีเมนต์ปอร์ตแลนด์ใช้กับงานโครงสร้าง ปูนก่อใช้ก่ออิฐ ปูนฉาบใช้ฉาบผนัง และปูนเทพื้นใช้กับงานพื้น ดูชนิดที่ถุงก่อนซื้อ', 'Portland cement is for structural work, masonry cement for laying bricks, plaster mix for rendering walls and floor screed for floors. Check the type on the bag before you buy.')),
      sec(p('เลือกให้ตรงกับงาน', 'Match it to the job'), p('งานโครงสร้างต้องการกำลังอัดสูง ส่วนงานตกแต่งต้องการเนื้อละเอียดและฉาบง่าย ถ้าไม่แน่ใจให้ถามช่างหรือผู้ออกแบบ', 'Structural work needs high compressive strength, while finishing work needs a fine mix that is easy to apply. If you are unsure, ask your builder or designer.')),
      sec(p('เก็บและใช้ให้ถูกวิธี', 'Store and use it properly'), p('เก็บถุงปูนบนพื้นยกสูง ห่างผนัง และคลุมกันชื้น ใช้ให้หมดภายในเวลาที่ผู้ผลิตแนะนำ เพราะปูนที่จับเป็นก้อนแล้วจะแข็งตัวได้ไม่ดี', 'Keep bags on a raised floor away from walls and covered against damp, and use them within the time the maker recommends, because lumpy cement does not set well.')),
    ],
    bullets: [
      p('แบบแปลนและรายการงาน', 'The plans and a list of jobs'),
      p('ปริมาณปูนที่คำนวณคร่าวๆ', 'A rough calculation of the cement needed'),
      p('ที่เก็บปูนที่แห้งและยกพื้น', 'A dry, raised place to store it'),
      p('ผู้รับเหมาหรือช่างที่ปรึกษาได้', 'A builder or technician you can ask'),
    ],
  },

  'อุปกรณ์กันน้ำท่วมบ้าน 10 อย่างที่ควรมี': {
    intro: [
      p('เตรียมให้พร้อมก่อนฤดูน้ำหลาก', 'Get ready before the flood season'),
      p('ของที่เตรียมไว้ล่วงหน้าช่วยลดความเสียหายและความตื่นตระหนกเมื่อน้ำมา บทความนี้แบ่งอุปกรณ์ 10 อย่างเป็น 3 กลุ่ม', 'Things prepared in advance reduce damage and panic when the water arrives. This article splits the ten items into three groups.'),
    ],
    sections: [
      sec(p('กั้นน้ำไม่ให้เข้าบ้าน (3 อย่าง)', 'Keep water out (three items)'), p('แผงกั้นน้ำอะลูมิเนียมที่ประตู กระสอบทราย และเทปกันซึมสำหรับรอยต่อ ช่วยชะลอน้ำที่ทางเข้าหลัก', 'An aluminium flood barrier for the door, sandbags and waterproof sealing tape for joints slow the water at the main entrance.')),
      sec(p('ระบายน้ำออก (3 อย่าง)', 'Get water out (three items)'), p('เครื่องสูบน้ำแบบพกพา สายยางยาวพอ และถังตักน้ำ ช่วยระบายน้ำที่ซึมเข้ามา', 'A portable water pump, a hose that is long enough and a bucket help clear water that seeps in.')),
      sec(p('ของใช้ฉุกเฉิน (4 อย่าง)', 'Emergency supplies (four items)'), p('ไฟฉายและแบตเตอรี่สำรอง เพาเวอร์แบงก์ กล่องกันน้ำสำหรับเอกสาร และน้ำดื่มสำรอง', 'A torch with spare batteries, a power bank, a waterproof box for documents and spare drinking water.')),
    ],
    bullets: [
      p('แผงกั้นน้ำและกระสอบทราย', 'A flood barrier and sandbags'),
      p('เครื่องสูบน้ำและสายยาง', 'A pump and a hose'),
      p('ไฟฉายและเพาเวอร์แบงก์', 'A torch and a power bank'),
      p('กล่องกันน้ำสำหรับเอกสาร', 'A waterproof box for documents'),
    ],
  },

  '5 วิธีจัดตู้เย็น หยิบง่าย เก็บได้นาน': {
    intro: [
      p('จัดครั้งเดียว ใช้สะดวกทุกวัน', 'Organise it once and it is easy to use every day'),
      p('ตู้เย็นที่จัดเป็นระบบช่วยให้หยิบง่าย ลดอาหารเสียโดยไม่รู้ตัว และประหยัดไฟเพราะเปิดตู้นานน้อยลง', 'A well-organised fridge makes things easy to find, cuts food waste without you noticing and saves power because the door stays open for less time.'),
    ],
    sections: [
      sec(p('แบ่งโซนตามประเภทอาหาร', 'Divide it into zones'), p('ชั้นบนเก็บอาหารปรุงสุกและของพร้อมกิน ชั้นล่างเก็บเนื้อดิบ ช่องผักเก็บผักผลไม้ ส่วนช่องประตูเก็บเครื่องปรุงและขวดน้ำ', 'Keep cooked and ready-to-eat food on the top shelf, raw meat at the bottom, fruit and vegetables in the drawer, and sauces and bottles in the door.')),
      sec(p('ใช้กล่องและโหลใสแยกของ', 'Use clear boxes and jars'), p('ภาชนะใสช่วยให้เห็นของด้านใน ปิดสนิทกันกลิ่นปน เลือกขนาดเท่าๆ กันจะวางซ้อนได้เป็นระเบียบ', 'Clear containers show what is inside, and tight lids stop smells mixing. Choosing similar sizes lets them stack neatly.')),
      sec(p('เช็กและทำความสะอาดเป็นประจำ', 'Check and clean regularly'), p('เช็ดชั้นวางทุกสัปดาห์ วางของเก่าไว้ด้านหน้า และดูวันหมดอายุทุกครั้งที่จัดตู้', 'Wipe the shelves every week, put older items at the front and check the dates each time you tidy up.')),
    ],
    listIntro: p('สรุป 5 วิธีที่ทำได้ทันที:', 'The five ways, in short:'),
    bullets: [
      p('แบ่งโซนตามประเภทอาหาร', 'Divide the fridge into zones'),
      p('ใช้ภาชนะใสและปิดสนิท', 'Use clear, tightly closed containers'),
      p('วางของใหม่ไว้ด้านหลัง ของเก่าไว้ด้านหน้า', 'Put new items at the back and old ones at the front'),
      p('ไม่ใส่แน่นเกินไป เพื่อให้ลมเย็นไหลเวียน', 'Do not overfill, so cold air can circulate'),
      p('เช็ดทำความสะอาดทุกสัปดาห์', 'Wipe it clean every week'),
    ],
  },
}

export const articleText = (title: Localized | undefined) => texts[title?.th ?? '']
