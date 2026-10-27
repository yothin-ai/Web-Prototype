import type { LandingContent } from './types'

// The Landing page's own copy: a made-up studio that builds websites and apps with vibe coding (telling an AI what
// you want and letting it write the code), sells a starter kit and teaches it. Sample text, mock names; it does not
// change with the Dataset. Written with the ux-copy skill.
export const landingContent: LandingContent = {
  brand: { th: 'VibeCraft', en: 'VibeCraft' },
  hero: {
    lead: { th: 'ไอเดียของคุณ', en: 'Your idea' },
    title: { th: 'กลายเป็นเว็บและแอป', en: 'becomes a website or app' },
    emphasis: { th: 'ด้วย Vibe Coding', en: 'with vibe coding' },
    highlight: { th: 'Vibe Coding', en: 'vibe coding' },
    text: {
      th: 'Vibe Coding คือการบอก AI เป็นภาษาคนว่าอยากได้อะไร แล้วให้ AI เขียนโค้ดให้ เราช่วยให้ไอเดียของคุณเป็นเว็บหรือแอปที่ใช้งานได้จริง โดยไม่ต้องเขียนโค้ดเอง',
      en: 'Vibe coding means telling an AI what you want in plain words and letting it write the code. We turn your idea into a working website or app, with no coding on your side.',
    },
    cta: { th: 'เริ่มโปรเจกต์ของคุณ', en: 'Start your project' },
    more: { th: 'ดูบริการของเรา', en: 'See what we offer' },
  },
  clients: {
    title: { th: 'ธุรกิจที่เราสร้างเว็บและแอปให้', en: 'Businesses we have built websites and apps for' },
    groups: [
      { label: { th: 'ธุรกิจขนาดเล็ก', en: 'Small businesses' }, names: ['Little Brew', 'Corner Studio', 'Harbor Books', 'Green Table'] },
      { label: { th: 'สตาร์ทอัพ', en: 'Startups' }, names: ['Pocket Clinic', 'Nimbus Fit', 'Pixel Bakery', 'Skyline Rentals'] },
    ],
  },
  solutions: {
    title: { th: 'สองวิธีเริ่มต้น เลือกตามที่ถนัด', en: 'Two ways to start, pick the one that suits you' },
    text: {
      th: 'ให้เราสร้างให้ หรือสร้างเองด้วยชุดเริ่มต้นของเรา ทั้งสองทางใช้ AI เขียนโค้ด ต่างกันที่ว่าใครเป็นคนคุมงาน',
      en: 'Have us build it, or build it yourself with our starter kit. Both use AI to write the code; the difference is who steers.',
    },
    products: [
      {
        headline: { th: 'ได้เว็บหรือแอปที่ใช้งานได้ โดยไม่ต้องจ้างทีมพัฒนาเต็มรูปแบบ', en: 'Get a working website or app without hiring a full development team' },
        name: { th: 'VibeStudio', en: 'VibeStudio' },
        tagline: { th: 'ทีมรับสร้างเว็บและแอปด้วย AI', en: 'We build your website or app with AI' },
        features: [
          { title: { th: 'เล่าไอเดียเป็นภาษาคน', en: 'Tell us in plain words' }, body: { th: 'คุยกับเราว่าอยากได้อะไร แล้วเราแปลงเป็นคำสั่งให้ AI สร้างต้นแบบ', en: 'Talk through what you want and we turn it into instructions for the AI.' } },
          { title: { th: 'เห็นต้นแบบเร็ว', en: 'See a prototype fast' }, body: { th: 'ได้ต้นแบบที่คลิกใช้ได้ภายในไม่กี่วัน (ข้อมูลตัวอย่าง) แล้วปรับไปด้วยกัน', en: 'A clickable prototype within a few days (sample information), then we refine it together.' } },
          { title: { th: 'มีคนตรวจก่อนเปิดใช้', en: 'Checked before launch' }, body: { th: 'นักพัฒนาของเราตรวจโค้ดจาก AI ทั้งความปลอดภัยและความเสถียร', en: 'Our developers review the AI’s code for security and stability.' } },
        ],
        cta: { th: 'ดูรายละเอียด VibeStudio', en: 'Learn more about VibeStudio' },
      },
      {
        headline: { th: 'เริ่มสร้างเว็บแรกของคุณเองได้ตั้งแต่วันนี้', en: 'Start building your own first website today' },
        name: { th: 'VibeKit', en: 'VibeKit' },
        tagline: { th: 'ชุดเริ่มต้นสำหรับสร้างเอง', en: 'A starter kit to build it yourself' },
        features: [
          { title: { th: 'เทมเพลตพร้อมใช้', en: 'Ready-made templates' }, body: { th: 'หน้าเว็บ ร้านค้า และฟอร์มที่ปรับแต่งต่อได้', en: 'Pages, shops and forms you can adapt.' } },
          { title: { th: 'ชุดคำสั่ง (prompt) ที่ลองแล้ว', en: 'Tested prompts' }, body: { th: 'คัดลอกไปใช้กับผู้ช่วยเขียนโค้ดด้วย AI แล้วปรับให้เข้ากับงานของคุณ', en: 'Copy them into your AI coding assistant and adapt them to your work.' } },
          { title: { th: 'มีเช็กลิสต์ก่อนเปิดใช้', en: 'A pre-launch checklist' }, body: { th: 'ตรวจเรื่องความปลอดภัยและข้อมูลส่วนตัวก่อนเผยแพร่', en: 'Check security and privacy before you publish.' } },
        ],
        cta: { th: 'ดูรายละเอียด VibeKit', en: 'Learn more about VibeKit' },
      },
    ],
  },
  academy: {
    title: { th: 'เรียน Vibe Coding แล้วลงมือทำเอง', en: 'Learn vibe coding and build it yourself' },
    text: {
      th: 'หลักสูตรสั้นสำหรับคนที่ไม่เคยเขียนโค้ด ลงมือทำจริงตลอดชั่วโมงเรียน และจบด้วยผลงานที่เปิดใช้ได้',
      en: 'Short courses for people who have never written code. You build throughout, and finish with something you can publish.',
    },
    viewAll: { th: 'ดูหลักสูตรทั้งหมด', en: 'See all courses' },
    gallery: [
      { th: 'เวิร์กช็อปลงมือทำ', en: 'Hands-on workshop' },
      { th: 'ผู้เรียนสร้างเว็บของตัวเอง', en: 'Learners building their own sites' },
      { th: 'ถามตอบกับผู้สอน', en: 'Q&A with the instructor' },
    ],
    courses: [
      { tag: { th: 'เจ้าของธุรกิจ', en: 'Business owners' }, title: { th: 'Vibe Coding สำหรับเจ้าของธุรกิจ', en: 'Vibe coding for business owners' }, meta: { th: '1 วัน · ออนไลน์', en: '1 day · online' } },
      { tag: { th: 'มือใหม่', en: 'Beginners' }, title: { th: 'ทำเว็บแรกของคุณในหนึ่งวัน', en: 'Build your first website in one day' }, meta: { th: '1 วัน · ห้องอบรมหรือออนไลน์', en: '1 day · classroom or online' } },
    ],
  },
  partners: {
    title: { th: 'เครื่องมือที่เราใช้ทำงาน', en: 'The tools we work with' },
    text: {
      th: 'เราเลือกผู้ช่วยเขียนโค้ดด้วย AI โฮสติ้ง และฐานข้อมูลที่ใช้งานง่าย เปลี่ยนได้ และดูแลต่อได้ ไม่ผูกคุณไว้กับเจ้าใดเจ้าหนึ่ง',
      en: 'We choose AI coding assistants, hosting and databases that are easy to use, easy to swap and easy to maintain, so you are never locked in to one vendor.',
    },
    groups: [
      { label: { th: 'ผู้ช่วยเขียนโค้ดด้วย AI', en: 'AI coding assistants' }, tools: [{ name: 'Claude', logo: 'claude' }, { name: 'OpenAI', logo: 'openai' }, { name: 'Cursor', logo: 'cursor' }] },
      { label: { th: 'โฮสติ้ง', en: 'Hosting' }, tools: [{ name: 'Vercel', logo: 'vercel' }, { name: 'Netlify', logo: 'netlify' }, { name: 'Cloudflare', logo: 'cloudflare' }] },
      { label: { th: 'ฐานข้อมูลและโค้ด', en: 'Database and code' }, tools: [{ name: 'Supabase', logo: 'supabase' }, { name: 'GitHub', logo: 'github' }] },
    ],
    note: {
      th: 'โลโก้เป็นเครื่องหมายการค้าของเจ้าของแต่ละราย ใช้เพื่อระบุชื่อเครื่องมือเท่านั้น ไม่ได้หมายความว่าได้รับการรับรองจากเจ้าของ (ข้อมูลตัวอย่าง)',
      en: 'Logos are trademarks of their owners, used only to name the tools. They do not mean the owners endorse us (sample information).',
    },
  },
  articles: {
    title: { th: 'บทความ', en: 'Articles' },
    text: { th: 'เรื่องควรรู้ก่อนและระหว่างทำเว็บหรือแอปด้วย AI', en: 'What to know before and while building a website or app with AI' },
    items: [
      {
        category: { th: 'พื้นฐาน', en: 'Basics' },
        title: { th: 'Vibe Coding คืออะไร และเหมาะกับงานแบบไหน', en: 'What is vibe coding, and what is it good for' },
        summary: { th: 'อธิบายแนวคิดให้เข้าใจง่าย พร้อมตัวอย่างงานที่เหมาะ เช่น หน้าเว็บธุรกิจและเครื่องมือภายใน และงานที่ยังควรให้นักพัฒนาทำ', en: 'The idea in plain words, with examples of work that suits it, such as business sites and internal tools, and work that still needs a developer.' },
      },
      {
        category: { th: 'เทคนิค', en: 'Technique' },
        title: { th: '5 วิธีเขียน prompt ให้ AI สร้างหน้าเว็บได้ตรงใจ', en: 'Five ways to write prompts that get the page you want' },
        summary: { th: 'บอกเป้าหมาย ผู้ใช้ และตัวอย่างที่ชอบ แล้วขอทีละขั้น จะได้ผลตรงกว่าสั่งทั้งเว็บในครั้งเดียว', en: 'State the goal, the audience and an example you like, then ask one step at a time. It works better than asking for the whole site at once.' },
      },
      {
        category: { th: 'ความปลอดภัย', en: 'Safety' },
        title: { th: 'เว็บที่ AI สร้างให้ ต้องตรวจอะไรก่อนเปิดใช้จริง', en: 'What to check before you launch a site an AI built' },
        summary: { th: 'เช็กลิสต์สั้นๆ เรื่องรหัสผ่าน ข้อมูลลูกค้า และการอัปเดต เพื่อไม่ให้ปัญหาซ่อนอยู่ในโค้ดที่คุณไม่ได้อ่าน', en: 'A short checklist on passwords, customer data and updates, so problems do not hide in code you never read.' },
      },
      {
        category: { th: 'ตัวอย่างงาน', en: 'Examples' },
        title: { th: 'ใช้ AI ทำหน้าเว็บขายของให้ร้านเล็กๆ ได้ในหนึ่งวัน', en: 'Using AI to build a small shop page in one day' },
        summary: { th: 'เล่าขั้นตอนตั้งแต่เขียนโจทย์ ให้ AI ร่างหน้า ปรับทีละส่วน จนเปิดรับออเดอร์ได้ พร้อมสิ่งที่ควรเตรียมก่อนเริ่ม', en: 'The steps from writing the brief and getting a first draft to refining it section by section and taking orders, with what to prepare beforehand.' },
      },
    ],
  },
  faq: {
    title: { th: 'คำถามที่เจอบ่อยก่อนเริ่ม', en: 'Questions we hear before you start' },
    text: { th: 'ตอบตรงๆ ทั้งสิ่งที่ AI ทำได้และสิ่งที่ยังทำไม่ได้', en: 'Straight answers on what building with AI can and cannot do.' },
    items: [
      {
        question: { th: 'Vibe Coding คืออะไร', en: 'What is vibe coding?' },
        answer: { th: 'คือการอธิบายสิ่งที่อยากได้ให้ AI เป็นภาษาคน แล้วให้ AI เขียนโค้ดให้ คุณดูผล บอกให้แก้ แล้วทำซ้ำจนได้ตามต้องการ', en: 'You describe what you want to an AI in plain language and it writes the code. You look at the result, ask for changes and repeat until it is right.' },
      },
      {
        question: { th: 'ไม่เคยเขียนโค้ดเลย ทำได้ไหม', en: 'Can I do it if I have never written code?' },
        answer: { th: 'ทำได้สำหรับงานง่าย เช่น หน้าเว็บธุรกิจหรือเครื่องมือเล็กๆ ส่วนงานที่ซับซ้อน หรือที่เกี่ยวกับเงินและข้อมูลลูกค้า ควรให้นักพัฒนาช่วยตรวจ', en: 'Yes for simple work, such as a business site or a small tool. For anything complex, or that handles money or customer data, have a developer check it.' },
      },
      {
        question: { th: 'เว็บที่ AI สร้างให้ปลอดภัยและดูแลต่อได้ไหม', en: 'Is a site built by AI secure and easy to maintain?' },
        answer: { th: 'ได้ ถ้ามีการตรวจและวางโครงสร้างที่ดี งานของ VibeStudio ผ่านการตรวจโดยนักพัฒนา (ข้อมูลตัวอย่าง) และ VibeKit มีเช็กลิสต์ให้คุณตรวจเอง', en: 'It can be, if it is reviewed and well structured. Work from VibeStudio is checked by a developer (sample information), and VibeKit includes a checklist for checking it yourself.' },
      },
    ],
  },
  contact: {
    company: { th: 'บริษัท ไวบ์คราฟต์ จำกัด', en: 'VibeCraft Co., Ltd.' },
    address: { th: 'เลขที่ 123 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง กรุงเทพมหานคร 10000', en: '123 Sample Road, Sample Subdistrict, Sample District, Bangkok 10000' },
    phone: '0-0000-0000',
    email: 'hello@example.com',
  },
  form: {
    title: { th: 'เริ่มโปรเจกต์กับเรา', en: 'Start a project with us' },
    companyLabel: { th: 'ชื่อธุรกิจหรือโปรเจกต์ (ไม่บังคับ)', en: 'Business or project name (optional)' },
    interestLabel: { th: 'คุณสนใจเรื่องอะไร', en: 'What are you interested in?' },
    interests: [
      { id: 'journey', name: { th: 'เริ่มโปรเจกต์', en: 'Starting a project' }, detail: { th: 'เล่าไอเดียและรับคำแนะนำ', en: 'Share your idea and get advice' } },
      { id: 'product1', name: { th: 'VibeStudio', en: 'VibeStudio' }, detail: { th: 'ทีมรับสร้างเว็บและแอปด้วย AI', en: 'We build your website or app with AI' } },
      { id: 'product2', name: { th: 'VibeKit', en: 'VibeKit' }, detail: { th: 'ชุดเริ่มต้นสำหรับสร้างเอง', en: 'A starter kit to build it yourself' } },
      { id: 'course', name: { th: 'หลักสูตรอบรม', en: 'Training courses' }, detail: { th: 'เรียน Vibe Coding แล้วลงมือทำ', en: 'Learn vibe coding by building' } },
    ],
    perks: [
      { title: { th: 'คุยกับทีมของเรา', en: 'Talk to our team' }, body: { th: 'นัดคุยสั้นๆ เพื่อฟังไอเดียของคุณ', en: 'A short call to hear your idea.' } },
      { title: { th: 'ได้แนวทางที่ชัดเจน', en: 'A clear direction' }, body: { th: 'ได้ขอบเขตงานและงบประมาณคร่าวๆ ภายในไม่กี่วัน (ข้อมูลตัวอย่าง)', en: 'A scope and a rough budget within a few days (sample information).' } },
      { title: { th: 'ไม่มีข้อผูกมัด', en: 'No obligation' }, body: { th: 'ปรึกษาเบื้องต้นไม่มีค่าใช้จ่าย', en: 'The first consultation is free.' } },
    ],
  },
}
