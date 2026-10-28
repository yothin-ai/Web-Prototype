import type { Localized } from '../../i18n'

// The full text of the Landing page's articles, in the same order as `articles.items` in content.ts.
// The facts come from the sources listed with each article; the wording is ours. The author, the date and the
// small shop in the last article are sample information, and the article page says so.

export type ArticleBlock =
  | { kind: 'p'; text: Localized }
  | { kind: 'h'; text: Localized }
  | { kind: 'list'; items: Localized[] }
  | { kind: 'checks'; items: Localized[] }
  | { kind: 'qa'; q: Localized; a: Localized }
  | { kind: 'note'; text: Localized }

export type ArticleText = {
  date: string
  minutes: number
  blocks: ArticleBlock[]
  sources: { label: string; url: string }[]
}

export const articleTexts: ArticleText[] = [
  {
    date: '2026-09-08',
    minutes: 3,
    blocks: [
      {
        kind: 'p',
        text: {
          th: 'ถ้าคุณเคยอยากได้เว็บหรือแอปสักตัวแต่ไม่รู้จะเริ่มจากตรงไหน คำว่า vibe coding อาจเป็นคำตอบที่ใกล้ตัวกว่าที่คิด แนวคิดนี้ง่ายมาก คุณอธิบายสิ่งที่อยากได้เป็นภาษาคน แล้วให้ AI เขียนโค้ดให้',
          en: 'If you have ever wanted a website or an app but had no idea where to start, vibe coding may be closer than you think. The idea is simple: you describe what you want in plain language, and an AI writes the code.',
        },
      },
      { kind: 'h', text: { th: 'คำนี้มาจากไหน', en: 'Where the term comes from' } },
      {
        kind: 'p',
        text: {
          th: 'Andrej Karpathy นักวิจัยด้าน AI เป็นคนตั้งชื่อนี้ในโพสต์บน X เมื่อวันที่ 2 กุมภาพันธ์ 2025 เขาเล่าถึงการทำงานแบบปล่อยตัวไปตามความรู้สึก (vibes) พูดสั่งงานแทนการพิมพ์ ยอมรับการแก้ไขโดยไม่อ่านรายละเอียด และวางข้อความแจ้งข้อผิดพลาดกลับไปให้ AI แก้ต่อ เขาบอกว่าวิธีนี้เหมาะกับโปรเจกต์ทดลองวันหยุดที่ทิ้งได้ ต่อมา Collins English Dictionary เลือก "vibe coding" เป็นคำแห่งปี 2025',
          en: 'The AI researcher Andrej Karpathy coined it in a post on X on 2 February 2025. He described working by feel: talking to the tool instead of typing, accepting changes without reading them, and pasting error messages straight back to the AI. He said it suited throwaway weekend projects. Collins English Dictionary later named "vibe coding" its word of the year for 2025.',
        },
      },
      { kind: 'h', text: { th: 'vibe coding ไม่เท่ากับการใช้ AI ช่วยเขียนโค้ดทุกแบบ', en: 'Vibe coding is not every use of AI for code' } },
      {
        kind: 'p',
        text: {
          th: 'Simon Willison นักพัฒนาซอฟต์แวร์ที่เขียนเรื่องนี้ไว้ละเอียด แยกให้เห็นชัดว่า vibe coding คือการสร้างซอฟต์แวร์ด้วย AI โดยไม่ตรวจโค้ดที่ได้ ส่วนการเขียนโปรแกรมอย่างมืออาชีพที่ใช้ AI ช่วย ผู้เขียนยังอ่าน ทดสอบ และเข้าใจโค้ดทั้งหมด กฎส่วนตัวของเขาคือไม่ส่งโค้ดที่ตัวเองอธิบายให้คนอื่นฟังไม่ได้',
          en: 'Simon Willison, a software developer who has written about this at length, separates the two. Vibe coding, he says, is building software with an AI without reviewing the code it produces. Professional programming with AI help is different, because the author still reads, tests and understands everything. His own rule is not to commit code he could not explain to someone else.',
        },
      },
      { kind: 'h', text: { th: 'เหมาะกับงานแบบไหน', en: 'What it suits' } },
      {
        kind: 'list',
        items: [
          { th: 'หน้าเว็บแนะนำธุรกิจ หน้าเปิดตัวสินค้า หรือหน้ารับลงทะเบียน', en: 'A business site, a product launch page or a sign-up page' },
          { th: 'เครื่องมือเล็กๆ ที่ใช้ภายในทีม เช่น ตารางสรุปหรือแบบฟอร์มรับคำขอ', en: 'Small tools for your own team, such as a summary table or a request form' },
          { th: 'ต้นแบบที่ใช้ทดสอบไอเดียก่อนลงทุนจริง', en: 'A prototype to test an idea before you invest' },
        ],
      },
      { kind: 'h', text: { th: 'งานที่ยังควรให้นักพัฒนาดูแล', en: 'What still needs a developer' } },
      {
        kind: 'p',
        text: {
          th: 'งานที่เกี่ยวกับเงิน ข้อมูลส่วนตัวของลูกค้า หรือระบบที่คนจำนวนมากต้องพึ่งพา ควรให้นักพัฒนาตรวจก่อนเปิดใช้ Willison แนะนำเช่นกันว่าให้เริ่มจากงานที่ความเสียหายต่ำ และให้คนที่มีประสบการณ์ดูก่อนแชร์ให้คนอื่นใช้',
          en: 'Anything that handles money, customers’ personal data or a system many people rely on should be checked by a developer before it goes live. Willison gives the same advice: start with low-stakes work, and have someone more experienced look before you share it widely.',
        },
      },
      { kind: 'h', text: { th: 'คำถามที่พบบ่อย', en: 'Common questions' } },
      {
        kind: 'qa',
        q: { th: 'ต้องเขียนโค้ดเป็นไหม', en: 'Do I need to know how to code?' },
        a: {
          th: 'ไม่จำเป็นสำหรับงานง่าย แต่คุณต้องอธิบายสิ่งที่อยากได้ให้ชัด และต้องลองใช้ผลงานจริงก่อนเปิด',
          en: 'Not for simple work, but you do need to describe what you want clearly, and to try the result yourself before it goes live.',
        },
      },
      {
        kind: 'qa',
        q: { th: 'ทำเสร็จแล้วต้องจ่ายอะไรต่อไหม', en: 'Is there a cost after it is built?' },
        a: {
          th: 'มักมีค่าโฮสติ้งหรือโดเมนรายปี และบางบริการคิดตามการใช้งาน ควรตั้งวงเงินแจ้งเตือนไว้ตั้งแต่ต้น',
          en: 'Usually there is hosting or a domain to pay for each year, and some services charge by usage. Set a spending alert from the start.',
        },
      },
      {
        kind: 'p',
        text: {
          th: 'สรุปคือ vibe coding เป็นทางลัดที่ใช้ได้จริงสำหรับงานเล็กและงานทดลอง ขอเพียงรู้ว่าตรงไหนควรหยุดแล้วให้คนช่วยตรวจ ถ้าอยากเริ่มจากไอเดียของคุณ ลองเล่าให้ทีมของเราฟังได้เลย',
          en: 'In short, vibe coding is a real shortcut for small and experimental work, as long as you know where to stop and ask someone to check. If you want to start from your own idea, tell our team about it.',
        },
      },
    ],
    sources: [
      { label: 'Vibe coding, Wikipedia', url: 'https://en.wikipedia.org/wiki/Vibe_coding' },
      { label: 'Andrej Karpathy, post on X (2 February 2025)', url: 'https://x.com/karpathy/status/1886192184808149383' },
      { label: 'Simon Willison, Not all AI-assisted programming is vibe coding (but vibe coding rocks)', url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/' },
    ],
  },
  {
    date: '2026-09-15',
    minutes: 3,
    blocks: [
      {
        kind: 'p',
        text: {
          th: 'สั่ง AI ว่า "ทำเว็บร้านกาแฟให้หน่อย" แล้วได้หน้าตาที่ไม่ตรงใจ เป็นเรื่องที่เจอกันบ่อย ปัญหามักไม่ได้อยู่ที่ AI แต่อยู่ที่ข้อมูลที่เราให้ไปยังไม่พอ คู่มือการเขียน prompt ของ Anthropic เปรียบว่า AI เหมือนพนักงานใหม่ที่เก่งมากแต่ยังไม่รู้บริบทของงานเรา ยิ่งบอกชัด ผลยิ่งตรง',
          en: 'Telling an AI "build me a coffee shop website" and getting something you did not want is common. The cause is usually not the AI but how little we told it. Anthropic’s prompting guide compares the AI to a brilliant new employee who does not yet know how your work goes: the more precisely you explain, the better the result.',
        },
      },
      { kind: 'h', text: { th: '1. บอกเป้าหมายและผู้ใช้ก่อน', en: '1. Start with the goal and the audience' } },
      {
        kind: 'p',
        text: {
          th: 'บอกว่าเว็บนี้มีไว้ทำอะไร ใครจะเข้ามาดู และอยากให้เขาทำอะไรต่อ เช่น "หน้าเว็บให้ลูกค้าในย่านนี้ดูเมนูและกดโทรสั่ง" การอธิบายเหตุผลช่วยให้ AI ตัดสินใจเรื่องรายละเอียดได้ตรงกับเป้าหมายของคุณมากขึ้น',
          en: 'Say what the site is for, who will visit, and what you want them to do next, for example "a page where local customers see the menu and tap to call". Explaining the reason helps the AI make the small decisions in line with your goal.',
        },
      },
      { kind: 'h', text: { th: '2. ระบุผลลัพธ์และข้อจำกัด', en: '2. Say what you want back, and the limits' } },
      {
        kind: 'p',
        text: {
          th: 'ระบุรูปแบบที่ต้องการให้ชัด เช่น หน้าเดียว มี 4 ส่วน ใช้สีหลักสีเดียว อ่านง่ายบนมือถือ และอย่าเพิ่มสิ่งที่ไม่ได้ขอ ถ้าอยากได้มากกว่าที่ขอขั้นต่ำ ให้บอกตรงๆ แทนที่จะหวังให้ AI เดาเอง',
          en: 'Be specific about the shape of the result: one page, four sections, one main colour, easy to read on a phone, and nothing you did not ask for. If you want more than the bare minimum, say so rather than hoping the AI will guess.',
        },
      },
      { kind: 'h', text: { th: '3. ให้ตัวอย่างที่ชอบ', en: '3. Show an example you like' } },
      {
        kind: 'p',
        text: {
          th: 'ตัวอย่างบอกได้มากกว่าคำบรรยาย ลองแนบลิงก์หรือภาพหน้าเว็บที่ชอบ แล้วบอกว่าชอบตรงไหน เช่น "ชอบที่ปุ่มใหญ่และพื้นที่ว่างเยอะ" คู่มือเดียวกันแนะนำให้ใช้ตัวอย่างที่หลากหลายพอ ไม่ใช้ตัวอย่างเดียวซ้ำๆ',
          en: 'An example says more than a description. Attach a link or a screenshot of a page you like and say what you like about it, such as "the big buttons and the empty space". The same guide suggests using examples that vary enough, not one example over and over.',
        },
      },
      { kind: 'h', text: { th: '4. ขอทีละขั้น', en: '4. Ask one step at a time' } },
      {
        kind: 'p',
        text: {
          th: 'แทนที่จะสั่งทั้งเว็บในครั้งเดียว ให้ขอโครงหน้าก่อน แล้วค่อยปรับทีละส่วน ถ้าลำดับสำคัญ ให้เขียนเป็นข้อ 1 2 3 การแก้ทีละจุดช่วยให้รู้ว่าอะไรได้ผลและย้อนกลับได้ง่ายเมื่อพลาด',
          en: 'Rather than asking for the whole site at once, ask for the page outline first and refine one section at a time. When the order matters, write the steps as a numbered list. Changing one thing at a time shows you what worked, and makes it easy to go back when something goes wrong.',
        },
      },
      { kind: 'h', text: { th: '5. ให้คนที่ไม่รู้เรื่องอ่านก่อน', en: '5. Let someone outside the project read it first' } },
      {
        kind: 'p',
        text: {
          th: 'คู่มือของ Anthropic มีวิธีทดสอบง่ายๆ คือให้เพื่อนร่วมงานที่ไม่รู้เรื่องโปรเจกต์อ่าน prompt แล้วลองทำตาม ถ้าเขางง AI ก็จะงงเหมือนกัน',
          en: 'Anthropic’s guide offers a simple test: show your prompt to a colleague who knows nothing about the project and ask them to follow it. If they would be confused, the AI will be too.',
        },
      },
      {
        kind: 'note',
        text: {
          th: 'ตัวอย่าง: "ทำหน้าเว็บหน้าเดียวให้ร้านกาแฟในย่านอารีย์ ลูกค้าส่วนใหญ่ดูบนมือถือและอยากรู้เมนูกับเวลาเปิด มี 4 ส่วน คือ ภาพเปิด เมนูเด่น เวลาและแผนที่ และปุ่มโทร ใช้สีน้ำตาลสีเดียว พื้นที่ว่างเยอะ แบบเดียวกับหน้าเว็บที่แนบ ขอโครงหน้าก่อน ยังไม่ต้องใส่ข้อความจริง"',
          en: 'Example: "Build a one-page site for a coffee shop in Ari. Most customers look on a phone and want the menu and opening hours. Four sections: an opening image, signature drinks, hours and a map, and a call button. One brown colour, lots of white space, like the page I attached. Give me the outline first; no real text yet."',
        },
      },
      {
        kind: 'p',
        text: {
          th: 'ลองใช้ครบทั้ง 5 ข้อกับโปรเจกต์ถัดไปของคุณ แล้วเปรียบเทียบกับครั้งที่สั่งสั้นๆ จะเห็นความต่างทันที',
          en: 'Try all five on your next project and compare it with a one-line request. The difference shows straight away.',
        },
      },
    ],
    sources: [{ label: 'Anthropic, Prompting best practices', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices' }],
  },
  {
    date: '2026-09-22',
    minutes: 3,
    blocks: [
      {
        kind: 'p',
        text: {
          th: 'เว็บที่ AI สร้างให้มักดูเรียบร้อยและใช้งานได้ตั้งแต่ครั้งแรก แต่ "ใช้ได้" ไม่ได้แปลว่า "ปลอดภัย" ก่อนเปิดให้คนทั่วไปใช้ ควรหยุดตรวจอีกรอบ',
          en: 'A site built by an AI often looks tidy and works the first time. But "works" does not mean "safe". Before you open it to the public, stop and check once more.',
        },
      },
      { kind: 'h', text: { th: 'ทำไมต้องตรวจ', en: 'Why check' } },
      {
        kind: 'p',
        text: {
          th: 'ในรายงานปี 2025 บริษัทความปลอดภัย Veracode ทดสอบโมเดล AI มากกว่า 100 ตัวกับงานเขียนโค้ด 80 งาน พบว่าเมื่อมีทางเลือกระหว่างวิธีที่ปลอดภัยกับไม่ปลอดภัย โมเดลเลือกวิธีที่ไม่ปลอดภัยถึง 45% ของกรณี และในงานป้องกัน cross-site scripting ทำไม่ผ่านถึง 86% ตัวเลขนี้มาจากชุดทดสอบ ไม่ได้แปลว่าโค้ดจาก AI ทุกชิ้นมีช่องโหว่ แต่บอกว่าเราไม่ควรเชื่อว่ามันปลอดภัยโดยอัตโนมัติ',
          en: 'In its 2025 report, the security company Veracode tested more than 100 AI models on 80 coding tasks. When a task offered a secure and an insecure way to do something, the models chose the insecure one 45% of the time, and they failed to defend against cross-site scripting in 86% of the relevant cases. These numbers come from a test set. They do not mean every piece of AI code is flawed, but they do mean you should not assume it is safe.',
        },
      },
      {
        kind: 'p',
        text: {
          th: 'รายการความเสี่ยง OWASP Top 10 ฉบับปี 2025 ซึ่งเป็นรายการช่องโหว่เว็บที่นักพัฒนาทั่วโลกใช้อ้างอิง จัดให้ "การควบคุมสิทธิ์การเข้าถึงที่บกพร่อง" อยู่อันดับ 1 และ "การตั้งค่าผิดพลาดด้านความปลอดภัย" อยู่อันดับ 2 เรื่องสิทธิ์การเข้าถึงนั้นคุณลองตรวจเองได้โดยไม่ต้องอ่านโค้ด ตามเช็กลิสต์ด้านล่าง',
          en: 'The 2025 edition of the OWASP Top 10, the list of web risks that developers worldwide refer to, puts broken access control first and security misconfiguration second. You can test access control yourself without reading any code, using the checklist below.',
        },
      },
      { kind: 'h', text: { th: 'เช็กลิสต์สั้นๆ ก่อนเปิดใช้', en: 'A short checklist before launch' } },
      {
        kind: 'checks',
        items: [
          { th: 'รหัสผ่านและคีย์ API ไม่ได้เขียนไว้ในโค้ดหรือในไฟล์ที่เปิดดูได้', en: 'Passwords and API keys are not written into the code or any file anyone can open' },
          { th: 'ลองเข้าหน้าของผู้ดูแลโดยไม่ล็อกอิน ต้องเข้าไม่ได้', en: 'Open the admin page without signing in. It must refuse you' },
          { th: 'ลองล็อกอินเป็นผู้ใช้ทั่วไป แล้วลองเปิดข้อมูลของคนอื่น ต้องเปิดไม่ได้', en: 'Sign in as an ordinary user and try to open someone else’s data. It must refuse you' },
          { th: 'ข้อมูลลูกค้า เช่น ชื่อ อีเมล เบอร์โทร ถูกเก็บเท่าที่จำเป็นและไม่โชว์ให้คนอื่นเห็น', en: 'Customer details such as names, emails and phone numbers are kept only as needed and never shown to others' },
          { th: 'ช่องกรอกข้อความ ลองใส่อักขระแปลกๆ แล้วหน้าเว็บไม่พัง', en: 'Type odd characters into the text fields and the page does not break' },
          { th: 'ตั้งวงเงินแจ้งเตือนค่าใช้จ่ายของบริการที่คิดตามการใช้งาน', en: 'Set a spending alert on any service that charges by usage' },
          { th: 'มีที่สำรองข้อมูลและรู้ว่ากู้คืนอย่างไร', en: 'There is a backup, and you know how to restore it' },
          { th: 'ให้นักพัฒนาหรือคนที่มีประสบการณ์ดูก่อนเปิดให้คนจำนวนมากใช้', en: 'A developer or someone experienced has looked at it before many people use it' },
        ],
      },
      { kind: 'h', text: { th: 'อัปเดตหลังเปิดใช้', en: 'After launch' } },
      {
        kind: 'p',
        text: {
          th: 'เว็บที่เปิดแล้วต้องมีคนดูแลต่อ ไลบรารีที่ AI เลือกมาจะมีเวอร์ชันใหม่และมีช่องโหว่ที่ถูกค้นพบเพิ่มเสมอ ควรกำหนดว่าใครเป็นคนตรวจอัปเดตและทำทุกกี่เดือน',
          en: 'A live site needs someone to look after it. The libraries an AI picked get new versions, and new weaknesses are found in them over time. Decide who checks for updates, and how often.',
        },
      },
      {
        kind: 'qa',
        q: { th: 'ต้องเข้าใจโค้ดทั้งหมดไหม', en: 'Do I need to understand all the code?' },
        a: {
          th: 'ไม่จำเป็นสำหรับงานเล็ก แต่ถ้ามีเงินหรือข้อมูลส่วนตัวของลูกค้าเกี่ยวข้อง ควรให้นักพัฒนาอ่านโค้ดส่วนนั้นก่อนเปิดใช้',
          en: 'Not for small work. But if money or customers’ personal data is involved, have a developer read that part of the code before you launch.',
        },
      },
      {
        kind: 'p',
        text: {
          th: 'ถ้าอยากให้ทีมของเราตรวจให้ หรือใช้เช็กลิสต์ที่ลองแล้วในชุดเริ่มต้น VibeKit ติดต่อเราได้เลย',
          en: 'If you would like our team to check it for you, or to use a tested checklist from the VibeKit starter kit, get in touch.',
        },
      },
    ],
    sources: [
      { label: 'Veracode, AI-generated code poses major security risks in nearly half of all development tasks (30 July 2025)', url: 'https://www.veracode.com/press-release/ai-generated-code-poses-major-security-risks-in-nearly-half-of-all-development-tasks-veracode-research-reveals/' },
      { label: 'OWASP Top 10:2025', url: 'https://top10.owasp.org/2025/0x00_2025-Introduction' },
      { label: 'Simon Willison, Not all AI-assisted programming is vibe coding (but vibe coding rocks)', url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/' },
    ],
  },
  {
    date: '2026-09-29',
    minutes: 3,
    blocks: [
      {
        kind: 'p',
        text: {
          th: 'ร้านเล็กๆ ที่อยากมีหน้าเว็บขายของของตัวเอง ไม่จำเป็นต้องรอเป็นเดือน บทความนี้เล่าขั้นตอนที่ทำได้ในวันเดียวสำหรับหน้าแนะนำสินค้าแบบง่าย โดยยกตัวอย่างร้านขนมสมมติชื่อ "บ้านขนมตัวอย่าง" (ข้อมูลตัวอย่าง)',
          en: 'A small shop that wants its own page to sell from does not have to wait for months. This article walks through what can be done in a day for a simple product page, using a made-up bakery called "Sample Bakehouse" (sample information).',
        },
      },
      { kind: 'h', text: { th: 'ช่วงเช้า: เตรียมโจทย์', en: 'Morning: prepare the brief' } },
      {
        kind: 'list',
        items: [
          { th: 'รายการสินค้า 6 ถึง 10 ชิ้น พร้อมราคา ภาพ และคำอธิบายสั้นๆ', en: 'Six to ten products with prices, pictures and a short description each' },
          { th: 'ช่องทางที่ลูกค้าสั่งซื้อได้ เช่น ไลน์ โทรศัพท์ หรือปุ่มชำระเงินออนไลน์', en: 'How customers can order: a chat app, a phone call or an online payment button' },
          { th: 'ข้อมูลร้านที่ต้องมี เช่น เวลาทำการ ที่อยู่ และวิธีจัดส่ง', en: 'The shop details to show: opening hours, address and how delivery works' },
        ],
      },
      { kind: 'h', text: { th: 'ช่วงสาย: ให้ AI ร่างหน้า', en: 'Late morning: have the AI draft the page' } },
      {
        kind: 'p',
        text: {
          th: 'ใส่โจทย์ทั้งหมดลงใน prompt แล้วขอโครงหน้าก่อน เช่น ภาพเปิด รายการสินค้า วิธีสั่ง และข้อมูลร้าน ดูว่าลำดับตรงกับวิธีที่ลูกค้าตัดสินใจหรือไม่ ค่อยขอหน้าจริงเมื่อโครงลงตัว',
          en: 'Put the whole brief into a prompt and ask for the outline first: an opening image, the product list, how to order, and the shop details. Check whether the order matches how your customers decide, and ask for the real page once the outline feels right.',
        },
      },
      { kind: 'h', text: { th: 'ช่วงบ่าย: ปรับทีละส่วน', en: 'Afternoon: refine section by section' } },
      {
        kind: 'p',
        text: {
          th: 'ปรับทีละส่วน เช่น ขอให้การ์ดสินค้าอ่านง่ายขึ้น ปุ่มสั่งซื้อเด่นขึ้น หรือตัวอักษรใหญ่ขึ้นบนมือถือ แล้วเปิดดูบนมือถือจริงทุกครั้ง เพราะลูกค้าส่วนใหญ่จะเข้ามาจากมือถือ',
          en: 'Refine one section at a time: make the product cards easier to read, the order button stand out, or the text larger on a phone. Open it on a real phone each time, because most of your customers will arrive from one.',
        },
      },
      { kind: 'h', text: { th: 'เรื่องที่ต้องคิดก่อนรับเงินและข้อมูลลูกค้า', en: 'What to think about before taking money or customer details' } },
      {
        kind: 'p',
        text: {
          th: 'การรับชำระเงินควรใช้หน้าชำระเงินของผู้ให้บริการที่ผ่านมาตรฐานบัตร ไม่ควรให้หน้าเว็บของเรารับหรือเก็บเลขบัตรเอง ส่วนข้อมูลลูกค้า ถ้าร้านเก็บชื่อ เบอร์โทร หรือที่อยู่ของคนในประเทศไทย จะอยู่ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) ที่บังคับใช้ในส่วนการเก็บ ใช้ และเปิดเผยข้อมูลตั้งแต่ 1 มิถุนายน 2022 ต้องแจ้งวัตถุประสงค์ให้ลูกค้าทราบก่อนหรือขณะเก็บข้อมูล และขอความยินยอมอย่างชัดเจนเมื่อกรณีนั้นต้องใช้ความยินยอม',
          en: 'For payments, use the checkout page of a provider that meets the card industry’s standards, and do not let your own page receive or store card numbers. As for customer details, if the shop collects the name, phone number or address of people in Thailand, it falls under the Personal Data Protection Act (PDPA), whose rules on collecting, using and disclosing data have applied since 1 June 2022. You must tell customers the purpose before or when you collect their data, and ask for clear consent where the case needs it.',
        },
      },
      {
        kind: 'note',
        text: {
          th: 'ข้อมูลข้างต้นเป็นภาพรวมเพื่อให้รู้ว่าควรถามอะไร ไม่ใช่คำแนะนำทางกฎหมาย ถ้าร้านของคุณเก็บข้อมูลลูกค้าจริง ควรปรึกษาผู้เชี่ยวชาญ',
          en: 'The above is an overview to show what to ask about, not legal advice. If your shop collects real customer data, talk to a specialist.',
        },
      },
      { kind: 'h', text: { th: 'ก่อนเปิดใช้', en: 'Before you open' } },
      {
        kind: 'checks',
        items: [
          { th: 'ทดสอบสั่งซื้อทั้งขั้นตอนบนมือถือด้วยตัวเอง', en: 'Place a test order from start to finish on a phone yourself' },
          { th: 'ตรวจราคา ภาพ และข้อความทุกจุดกับของจริง', en: 'Check every price, picture and line of text against the real thing' },
          { th: 'ใช้เช็กลิสต์ความปลอดภัยของเราก่อนเปิดให้คนทั่วไปใช้', en: 'Run through our safety checklist before you open to the public' },
        ],
      },
      {
        kind: 'qa',
        q: { th: 'หนึ่งวันพอจริงหรือ', en: 'Is one day really enough?' },
        a: {
          th: 'พอสำหรับหน้าแนะนำสินค้าแบบง่ายที่รับออเดอร์ทางไลน์หรือโทรศัพท์ ถ้าต้องมีระบบตะกร้า สต็อก หรือชำระเงินออนไลน์เต็มรูปแบบ จะใช้เวลานานกว่านี้และควรให้นักพัฒนาร่วมตรวจ',
          en: 'It is enough for a simple product page that takes orders by chat or phone. A full cart, stock control or online payment takes longer and should have a developer involved.',
        },
      },
      {
        kind: 'p',
        text: {
          th: 'ถ้าอยากให้ทีมของเราช่วยทำหรือสอนวิธีทำ เริ่มจากเล่าเรื่องร้านของคุณให้เราฟังได้เลย',
          en: 'If you would like our team to build it with you or teach you how, start by telling us about your shop.',
        },
      },
    ],
    sources: [
      { label: 'Linklaters, Data Protected: Thailand', url: 'https://www.linklaters.com/insights/data-protected/data-protected---thailand' },
      { label: 'OWASP Top 10:2025', url: 'https://top10.owasp.org/2025/0x00_2025-Introduction' },
      { label: 'Simon Willison, Not all AI-assisted programming is vibe coding (but vibe coding rocks)', url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/' },
    ],
  },
]
