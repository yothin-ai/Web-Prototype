import { course, pair, sharedFaq, sharedReviews } from '../educationBuilder'
import type { EducationContent } from '../types'

// Sample courses for the general dataset. The people and numbers are invented.
export const education: EducationContent = {
  categories: [
    { id: 'creative', name: pair(['งานสร้างสรรค์', 'Creative']) },
    { id: 'work', name: pair(['การทำงาน', 'Work']) },
    { id: 'life', name: pair(['ชีวิตและการเงิน', 'Life and money']) },
  ],
  instructors: [
    { id: 'i1', name: pair(['ครูตัวอย่าง ก', 'Instructor A']), role: pair(['ช่างภาพอิสระ', 'Freelance photographer']), bio: pair(['สอนถ่ายภาพมากว่า 10 ปี ชอบทำให้เรื่องเทคนิคฟังง่าย (ข้อมูลสมมติ)', 'Has taught photography for over 10 years and likes making technical things easy to follow (invented).']) },
    { id: 'i2', name: pair(['ครูตัวอย่าง ข', 'Instructor B']), role: pair(['โค้ชการสื่อสารในองค์กร', 'Workplace communication coach']), bio: pair(['ช่วยทีมงานเขียนและพูดให้ชัดขึ้น (ข้อมูลสมมติ)', 'Helps teams write and speak more clearly (invented).']) },
    { id: 'i3', name: pair(['ครูตัวอย่าง ค', 'Instructor C']), role: pair(['ที่ปรึกษาการวางแผนการเงินส่วนบุคคล', 'Personal finance planner']), bio: pair(['เน้นวิธีที่คนทั่วไปทำได้จริงในชีวิตประจำวัน (ข้อมูลสมมติ)', 'Focuses on methods ordinary people can keep (invented).']) },
    { id: 'i4', name: pair(['ครูตัวอย่าง ง', 'Instructor D']), role: pair(['นักโภชนาการและผู้สอนทำอาหาร', 'Nutritionist and cooking teacher']), bio: pair(['สอนให้ทำอาหารง่ายๆ ที่ได้สารอาหารครบ (ข้อมูลสมมติ)', 'Teaches simple meals with balanced nutrition (invented).']) },
  ],
  reviews: sharedReviews,
  faq: sharedFaq,
  courses: [
    course({
      id: 'photo', title: ['พื้นฐานการถ่ายภาพ', 'Photography basics'], summary: ['เข้าใจแสงและองค์ประกอบภาพ แล้วถ่ายรูปสวยขึ้นได้ด้วยกล้องที่มีอยู่', 'Understand light and composition and take better photos with the camera you already have.'],
      level: 'beginner', category: 'creative', price: 1490, rating: 4.6, ratingCount: 137, instructor: 'i1',
      outcomes: [['ควบคุมแสงให้ภาพสว่างพอดี', 'Control light so photos are well exposed'], ['จัดองค์ประกอบด้วยกฎสามส่วน', 'Frame a shot with the rule of thirds'], ['ใช้แสงจากหน้าต่างแทนแฟลช', 'Use window light instead of flash'], ['ตรวจและแก้ภาพที่ไม่ถูกใจ', 'Review and fix a shot you do not like']],
      audience: [['คนที่เพิ่งซื้อกล้องหรือใช้มือถือถ่ายภาพ', 'People with a new camera or a phone'], ['คนที่อยากถ่ายสินค้าหรืออาหารเอง', 'Anyone who wants to shoot products or food'], ['ไม่ต้องมีพื้นฐานมาก่อน', 'No background needed']],
      lessons: [
        [['แสงและการเปิดรับแสง', 'Light and exposure'], 8, ['ภาพจะสว่างหรือมืดขึ้นอยู่กับปริมาณแสงที่เข้าสู่เซนเซอร์ ลองถ่ายหัวข้อเดียวกันในที่สว่างและที่มืดเพื่อดูความต่าง', 'How bright or dark a photo looks depends on how much light reaches the sensor. Shoot one subject in bright and dim places to see it.']],
        [['องค์ประกอบภาพ', 'Composition'], 6, ['กฎสามส่วนช่วยให้ภาพสมดุล วางจุดเด่นไว้ที่จุดตัดของเส้นแบ่งสามส่วน แทนที่จะไว้กลางภาพ', 'The rule of thirds keeps a photo balanced. Put the subject on an intersection of the thirds lines instead of the centre.']],
        [['การจัดแสงในร่ม', 'Lighting indoors'], 7, ['แสงจากหน้าต่างนุ่มนวลและเป็นธรรมชาติ ให้วางตัวแบบข้างหน้าต่างแทนการใช้แฟลชตรงๆ', 'Window light is soft and natural. Place the subject beside a window rather than using direct flash.']],
        [['ดูภาพและแก้ปัญหา', 'Reviewing your shots'], 6, ['ถ่ายหลายมุมแล้วเลือกภาพที่ดีที่สุด ดูว่าภาพมืด เบลอ หรือเอียง แล้วแก้ที่ต้นเหตุในครั้งต่อไป', 'Shoot from several angles and pick the best. Check for dark, blurry or tilted shots and fix the cause next time.']],
      ],
      quiz: [
        [['ภาพที่มืดเกินไปมักเกิดจากอะไร', 'What usually makes a photo too dark?'], [['แสงเข้าสู่เซนเซอร์น้อยเกินไป', 'Too little light reached the sensor'], ['ใช้เลนส์สะอาดเกินไป', 'The lens was too clean'], ['ถ่ายในแนวนอน', 'It was shot in landscape']], [0]],
        [['กฎสามส่วนแนะนำให้วางจุดเด่นไว้ที่ใด', 'Where does the rule of thirds put the subject?'], [['กลางภาพเสมอ', 'Always in the centre'], ['ที่จุดตัดของเส้นแบ่งสามส่วน', 'On an intersection of the thirds lines'], ['มุมล่างสุดของภาพ', 'In the very bottom corner']], [1]],
        [['เลือกทุกข้อที่ช่วยให้ภาพในร่มสวยขึ้น', 'Pick everything that helps indoor photos'], [['วางตัวแบบข้างหน้าต่าง', 'Place the subject by a window'], ['เปิดแฟลชตรงใส่หน้า', 'Fire the flash straight at the face'], ['ถ่ายหลายมุมแล้วเลือก', 'Shoot several angles and choose']], [0, 2]],
      ],
    }),
    course({
      id: 'email', title: ['เขียนอีเมลให้คนอยากตอบ', 'Writing emails people answer'], summary: ['เทคนิคสั้นๆ สำหรับหัวข้อ โครงสร้าง และการปิดท้ายที่ทำให้ผู้รับตอบกลับ', 'Short techniques for subjects, structure and closings that get a reply.'],
      level: 'all', category: 'work', price: 0, rating: 4.7, ratingCount: 212, instructor: 'i2',
      outcomes: [['เขียนหัวข้อที่บอกเรื่องและสิ่งที่ต้องการ', 'Write a subject that says the topic and the ask'], ['เรียบเรียงอีเมลให้สั้นกระชับ', 'Keep an email short and structured'], ['ปิดท้ายให้ผู้รับรู้ว่าต้องทำอะไร', 'Close so the reader knows what to do']],
      audience: [['คนทำงานที่ต้องส่งอีเมลทุกวัน', 'People who email every day'], ['คนที่อยากให้ผู้รับตอบกลับเร็วขึ้น', 'Anyone who wants faster replies']],
      lessons: [
        [['หัวข้อที่ดี', 'A good subject line'], 5, ['หัวข้อควรบอกว่าอีเมลเกี่ยวกับอะไรและต้องการอะไร เช่น “ขออนุมัติงบ 5,000 บาท ภายในวันศุกร์” ดีกว่า “ขอความอนุเคราะห์”', 'A subject should say what the email is about and what you need, such as “Approval needed for 5,000 baht by Friday” instead of “A request”.']],
        [['โครงสร้างที่สั้นกระชับ', 'A short structure'], 6, ['เริ่มด้วยสิ่งที่ต้องการ ตามด้วยเหตุผลสั้นๆ และรายละเอียดที่จำเป็นเท่านั้น', 'Start with what you need, then a brief reason and only the details that matter.']],
        [['ปิดท้ายด้วยการกระทำ', 'Close with an action'], 4, ['ระบุให้ชัดว่าผู้รับต้องทำอะไรและภายในเมื่อไหร่ เพื่อให้ตอบได้ในครั้งเดียว', 'Say clearly what the reader should do and by when, so they can answer in one go.']],
        [['อ่านทวนก่อนส่ง', 'Read it back before sending'], 4, ['ตรวจชื่อผู้รับ ไฟล์แนบ และน้ำเสียง อ่านออกเสียงในใจหนึ่งรอบจะเห็นประโยคที่ยาวเกินไป', 'Check the recipient, the attachment and the tone. Reading it through once spots sentences that run too long.']],
      ],
      quiz: [
        [['หัวข้ออีเมลที่ดีควรมีอะไร', 'What should a good subject line contain?'], [['คำทักทายยาวๆ', 'A long greeting'], ['เรื่องที่เกี่ยวข้องและสิ่งที่ต้องการ', 'The topic and what you need'], ['ตัวพิมพ์ใหญ่ทั้งหมด', 'All capital letters']], [1]],
        [['ควรวางสิ่งที่ต้องการไว้ตรงไหนของอีเมล', 'Where should the request go in the email?'], [['ตอนต้น', 'Near the start'], ['ท้ายสุดหลังเล่าประวัติ', 'At the very end after the backstory'], ['ในไฟล์แนบเท่านั้น', 'Only in an attachment']], [0]],
        [['จริงหรือเท็จ: การระบุกำหนดเวลาช่วยให้ตอบได้เร็วขึ้น', 'True or false: giving a deadline helps get a faster answer'], [['จริง', 'True'], ['เท็จ', 'False']], [0]],
      ],
    }),
    course({
      id: 'money', title: ['จัดการเงินเบื้องต้น', 'Money basics'], summary: ['วางงบรายเดือน สร้างเงินสำรอง และออมก่อนใช้ ด้วยวิธีที่ทำได้จริง', 'Plan a monthly budget, build a reserve and save first with methods you can actually keep.'],
      level: 'beginner', category: 'life', price: 990, rating: 4.5, ratingCount: 98, instructor: 'i3',
      outcomes: [['ทำงบรายเดือนที่ใช้ได้จริง', 'Make a monthly budget you can follow'], ['ตั้งเป้าเงินสำรองฉุกเฉิน', 'Set an emergency fund goal'], ['ตั้งโอนออมอัตโนมัติ', 'Set up automatic saving']],
      audience: [['คนเริ่มทำงานใหม่', 'People starting their first job'], ['คนที่เงินหมดก่อนสิ้นเดือน', 'Anyone who runs out before month end']],
      lessons: [
        [['งบรายเดือน', 'Monthly budget'], 6, ['จดรายรับและรายจ่ายประจำก่อน แล้วแบ่งเงินที่เหลือเป็นส่วนใช้จ่ายและส่วนออม', 'Write down income and fixed costs first, then split what is left between spending and saving.']],
        [['เงินสำรองฉุกเฉิน', 'Emergency fund'], 7, ['เป้าหมายเริ่มต้นคือเงินสำรองเท่ากับค่าใช้จ่ายสามเดือน เก็บแยกบัญชีเพื่อไม่ให้เผลอใช้', 'A starting goal is three months of expenses, kept in a separate account so it is not spent by accident.']],
        [['ออมก่อนใช้', 'Pay yourself first'], 5, ['ตั้งโอนเงินออมอัตโนมัติทันทีที่เงินเดือนเข้า แทนการรอออมจากเงินที่เหลือ', 'Set up an automatic transfer the moment your salary arrives instead of saving what is left.']],
        [['ตามดูและปรับงบ', 'Track and adjust'], 5, ['ทบทวนงบเดือนละครั้ง ดูหมวดที่เกินและปรับตัวเลขของเดือนถัดไปให้ตรงกับชีวิตจริง', 'Review the budget once a month, see which category ran over and adjust next month to real life.']],
      ],
      quiz: [
        [['เงินสำรองฉุกเฉินเบื้องต้นควรเท่ากับกี่เดือนของค่าใช้จ่าย', 'How many months of expenses is a starting emergency fund?'], [['หนึ่งสัปดาห์', 'One week'], ['สามเดือน', 'Three months'], ['ห้าปี', 'Five years']], [1]],
        [['“ออมก่อนใช้” หมายถึงอะไร', 'What does “pay yourself first” mean?'], [['โอนเงินออมทันทีที่เงินเข้า', 'Transfer savings as soon as money arrives'], ['ออมเฉพาะเงินที่เหลือท้ายเดือน', 'Only save what is left at month end'], ['ไม่ต้องออมเลย', 'Do not save at all']], [0]],
        [['เลือกทุกข้อที่เป็นรายจ่ายประจำ', 'Pick all the fixed costs'], [['ค่าเช่าบ้าน', 'Rent'], ['ของขวัญวันเกิดเพื่อน', 'A friend’s birthday gift'], ['ค่าอินเทอร์เน็ตรายเดือน', 'Monthly internet']], [0, 2]],
      ],
    }),
    course({
      id: 'present', title: ['นำเสนองานให้คนจำได้', 'Presentations people remember'], summary: ['วางเรื่อง ออกแบบสไลด์ และพูดให้ชัดใน 10 นาที', 'Shape the story, design slides and speak clearly in ten minutes.'],
      level: 'intermediate', category: 'work', price: 1990, rating: 4.6, ratingCount: 76, isNew: true, instructor: 'i2',
      outcomes: [['เปิดและปิดการนำเสนอให้จับใจ', 'Open and close a talk with impact'], ['ทำสไลด์ที่อ่านง่าย', 'Make slides that are easy to read'], ['ตอบคำถามอย่างมั่นใจ', 'Answer questions with confidence']],
      audience: [['คนที่ต้องนำเสนองานในที่ประชุม', 'People who present at meetings'], ['คนที่ประหม่าเมื่อต้องพูด', 'Anyone who gets nervous speaking']],
      lessons: [
        [['วางเรื่องด้วยสามส่วน', 'The three-part story'], 7, ['เปิดด้วยปัญหา กลางด้วยทางออก ปิดด้วยสิ่งที่อยากให้ผู้ฟังทำ จำได้ง่ายกว่าการเรียงข้อมูลทั้งหมด', 'Open with the problem, give the way out, close with what you want the audience to do. It sticks better than listing all the data.']],
        [['สไลด์ที่อ่านง่าย', 'Readable slides'], 8, ['หนึ่งสไลด์หนึ่งข้อความ ตัวอักษรใหญ่พอให้คนหลังห้องอ่านได้ และใช้รูปหรือกราฟแทนตารางยาว', 'One message per slide, text big enough for the back row, and a picture or chart instead of a long table.']],
        [['น้ำเสียงและจังหวะ', 'Voice and pace'], 6, ['พูดช้ากว่าที่คิดเล็กน้อย เว้นจังหวะหลังประเด็นสำคัญ และมองผู้ฟังทีละคนแทนการมองจอ', 'Speak a little slower than feels natural, pause after key points and look at people rather than the screen.']],
        [['รับมือกับคำถาม', 'Handling questions'], 6, ['ฟังจนจบ ทวนคำถามสั้นๆ แล้วตอบ หากไม่รู้ให้บอกตรงๆ และสัญญาว่าจะกลับมาตอบ', 'Listen to the end, repeat the question briefly, then answer. If you do not know, say so and promise to follow up.']],
      ],
      quiz: [
        [['โครงสามส่วนที่แนะนำเริ่มด้วยอะไร', 'What does the suggested three-part story open with?'], [['ปัญหา', 'The problem'], ['ประวัติบริษัท', 'The company history'], ['ขอบคุณผู้ฟัง', 'Thanking the audience']], [0]],
        [['จริงหรือเท็จ: สไลด์ที่ดีควรใส่ข้อความให้มากที่สุด', 'True or false: a good slide holds as much text as possible'], [['จริง', 'True'], ['เท็จ', 'False']], [1]],
        [['เลือกทุกข้อที่ช่วยเรื่องจังหวะการพูด', 'Pick everything that helps your pace'], [['พูดช้าลงเล็กน้อย', 'Speak a little slower'], ['เว้นจังหวะหลังประเด็นสำคัญ', 'Pause after key points'], ['พูดเร็วขึ้นเมื่อเวลาใกล้หมดโดยไม่หยุด', 'Rush without pausing when time runs short']], [0, 1]],
      ],
    }),
    course({
      id: 'time', title: ['บริหารเวลาให้งานเสร็จ', 'Time management that works'], summary: ['จัดลำดับงาน กันเวลาทำงานลึก และจบวันโดยไม่ค้างงาน', 'Rank tasks, protect deep work and end the day with nothing left hanging.'],
      level: 'beginner', category: 'work', price: 0, rating: 4.4, ratingCount: 64, isNew: true, instructor: 'i2',
      outcomes: [['แยกงานเร่งด่วนกับงานสำคัญ', 'Tell urgent work from important work'], ['กันเวลาทำงานต่อเนื่อง', 'Block time for focused work'], ['ทบทวนสัปดาห์ใน 10 นาที', 'Review the week in ten minutes']],
      audience: [['คนที่งานล้นมือ', 'People with too much on their plate'], ['คนที่โดนขัดจังหวะบ่อย', 'Anyone interrupted often']],
      lessons: [
        [['เร่งด่วนกับสำคัญ', 'Urgent versus important'], 5, ['งานเร่งด่วนเรียกร้องให้ทำตอนนี้ แต่งานสำคัญคือสิ่งที่พาไปสู่เป้าหมาย เลือกทำงานสำคัญก่อนเมื่อทำได้', 'Urgent work demands attention now, but important work moves you to your goals. Do the important work first when you can.']],
        [['กันเวลาทำงานลึก', 'Protecting deep work'], 6, ['จองช่วงเวลา 60–90 นาทีในปฏิทินโดยปิดแจ้งเตือน ใช้กับงานที่ต้องใช้สมาธิที่สุด', 'Book 60–90 minutes in the calendar with notifications off, for the work that needs the most focus.']],
        [['จัดการการขัดจังหวะ', 'Handling interruptions'], 5, ['บอกคนรอบข้างว่าช่วงไหนไม่ว่าง และรวมเรื่องเล็กไว้ตอบเป็นรอบแทนการตอบทันทีทุกครั้ง', 'Tell people when you are unavailable and batch small things instead of answering each at once.']],
        [['ทบทวนสัปดาห์', 'The weekly review'], 4, ['ทุกวันศุกร์ดูว่าเสร็จอะไร ค้างอะไร แล้วเลือกสามเรื่องสำคัญของสัปดาห์หน้า', 'Each Friday see what is done and what is left, then pick three priorities for next week.']],
      ],
      quiz: [
        [['งานสำคัญคืองานแบบใด', 'What is important work?'], [['งานที่พาไปสู่เป้าหมาย', 'Work that moves you toward goals'], ['งานที่มีคนเร่ง', 'Work someone is chasing'], ['งานที่ใช้เวลาน้อยที่สุด', 'The quickest work']], [0]],
        [['ช่วงทำงานลึกควรเป็นอย่างไร', 'What should a deep-work block be like?'], [['ปิดแจ้งเตือนและกันเวลาในปฏิทิน', 'Notifications off, time blocked in the calendar'], ['เปิดแชตทุกกลุ่มไว้', 'Every chat open'], ['สลับงานทุก 5 นาที', 'Switching tasks every 5 minutes']], [0]],
        [['จริงหรือเท็จ: การทบทวนสัปดาห์ช่วยเลือกงานสำคัญของสัปดาห์ถัดไป', 'True or false: a weekly review helps choose next week’s priorities'], [['จริง', 'True'], ['เท็จ', 'False']], [0]],
      ],
    }),
    course({
      id: 'cook', title: ['ทำอาหารสุขภาพง่ายๆ ที่บ้าน', 'Simple healthy cooking at home'], summary: ['วางเมนูประจำสัปดาห์ เตรียมวัตถุดิบล่วงหน้า และปรุงให้อร่อยโดยไม่ใช้เวลานาน', 'Plan a weekly menu, prep ahead and cook tasty meals without spending long.'],
      level: 'beginner', category: 'life', price: 690, rating: 4.5, ratingCount: 52, isNew: true, instructor: 'i4',
      outcomes: [['วางเมนูห้าวันในหนึ่งชั่วโมง', 'Plan five days of meals in an hour'], ['เตรียมวัตถุดิบล่วงหน้า', 'Prep ingredients ahead'], ['ปรุงรสให้สมดุลโดยไม่เติมเกินจำเป็น', 'Season in balance without overdoing it']],
      audience: [['คนที่อยากกินดีขึ้นแต่มีเวลาน้อย', 'People who want to eat better with little time'], ['คนที่เริ่มทำอาหารกินเอง', 'Anyone starting to cook for themselves']],
      lessons: [
        [['วางเมนูประจำสัปดาห์', 'Planning the weekly menu'], 6, ['เลือกโปรตีนสองชนิดและผักสามชนิดต่อสัปดาห์ แล้วจัดเป็นเมนูที่ใช้วัตถุดิบซ้ำกันได้', 'Pick two proteins and three vegetables a week and shape meals that reuse the same ingredients.']],
        [['เตรียมวัตถุดิบล่วงหน้า', 'Prepping ahead'], 7, ['ล้าง หั่น และแบ่งใส่กล่องในวันเดียว ช่วยให้ทำอาหารวันธรรมดาเสร็จใน 20 นาที', 'Wash, chop and portion in one session so weekday meals take 20 minutes.']],
        [['ปรุงรสให้สมดุล', 'Seasoning in balance'], 5, ['ชิมระหว่างทำ เติมทีละน้อย ลองเพิ่มความเปรี้ยวหรือสมุนไพรก่อนเติมเค็มหรือหวาน', 'Taste as you go and add a little at a time. Try acid or herbs before more salt or sugar.']],
        [['เก็บและอุ่นอาหารให้ปลอดภัย', 'Storing and reheating safely'], 5, ['ปล่อยให้เย็นแล้วใส่กล่องปิดสนิท เก็บในตู้เย็นไม่เกิน 3 วัน และอุ่นให้ร้อนทั่วก่อนกิน', 'Cool it, seal it and keep it in the fridge up to 3 days, then reheat until hot all the way through.']],
      ],
      quiz: [
        [['การเตรียมวัตถุดิบล่วงหน้าช่วยเรื่องอะไร', 'What does prepping ahead help with?'], [['ทำอาหารวันธรรมดาได้เร็วขึ้น', 'Cooking weekday meals faster'], ['ทำให้อาหารเสียเร็ว', 'Spoiling food sooner'], ['ไม่ช่วยอะไร', 'Nothing']], [0]],
        [['เก็บอาหารที่ทำแล้วในตู้เย็นได้ประมาณกี่วัน', 'About how long can cooked food keep in the fridge?'], [['ไม่เกิน 3 วัน', 'Up to 3 days'], ['หนึ่งเดือน', 'A month'], ['หนึ่งปี', 'A year']], [0]],
        [['เลือกทุกข้อที่ช่วยปรุงรสให้สมดุล', 'Pick what helps balance seasoning'], [['ชิมระหว่างทำ', 'Taste as you cook'], ['เติมทีละน้อย', 'Add a little at a time'], ['เติมเกลือเยอะๆ ตอนแรก', 'Add lots of salt at the start']], [0, 1]],
      ],
    }),
  ],
}
