import type { Localized } from '../../i18n'
import type { InfoSection } from './info'

const p = (th: string, en: string): Localized => ({ th, en })
const sec = (heading: Localized, ...paragraphs: Localized[]): InfoSection => ({ heading, paragraphs })

// Sample legal pages written for the demo. Nothing here is a real policy; contacts are placeholders.
export const legalMeta = { updated: p('1 มกราคม 2569', '1 January 2026'), version: '1.0' }

export const privacySections: InfoSection[] = [
  sec(p('บทนำ', 'Introduction'), p('นโยบายนี้อธิบายว่าร้านตัวอย่างเก็บ ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณอย่างไร เมื่อคุณเข้าชมเว็บไซต์ สมัครสมาชิก หรือสั่งซื้อสินค้า', 'This policy explains how the sample shop collects, uses and protects your personal data when you browse, register or order.')),
  sec(p('ข้อมูลที่เราเก็บ', 'Data we collect'), p('ข้อมูลที่คุณกรอก เช่น ชื่อ-สกุล เบอร์โทร อีเมล ที่อยู่จัดส่ง และประวัติคำสั่งซื้อ รวมถึงข้อมูลการใช้งานเว็บไซต์ เช่น หน้าที่เข้าชมและอุปกรณ์ที่ใช้', 'What you enter, such as your name, phone, email, delivery addresses and order history, plus usage data such as pages visited and the device used.')),
  sec(p('วัตถุประสงค์ในการใช้ข้อมูล', 'How we use it'), p('เพื่อดำเนินการคำสั่งซื้อและการจัดส่ง ให้บริการหลังการขาย ปรับปรุงเว็บไซต์ และส่งข่าวสารหรือโปรโมชันเมื่อคุณยินยอม', 'To process orders and delivery, give after-sales service, improve the site, and send news or promotions when you agree.')),
  sec(p('การเปิดเผยข้อมูล', 'Sharing'), p('เราเปิดเผยข้อมูลเท่าที่จำเป็นแก่ผู้ให้บริการขนส่ง ผู้ให้บริการชำระเงิน และผู้ให้บริการระบบที่ทำงานแทนเรา และไม่ขายข้อมูลของคุณ', 'We share only what is needed with carriers, payment providers and system providers acting for us. We never sell your data.')),
  sec(p('ระยะเวลาเก็บรักษา', 'Retention'), p('เราเก็บข้อมูลตราบเท่าที่จำเป็นตามวัตถุประสงค์ และตามระยะเวลาที่กฎหมายกำหนด เช่น หลักฐานทางภาษี', 'We keep data as long as the purpose needs and the law requires, for example tax records.')),
  sec(p('สิทธิของเจ้าของข้อมูล', 'Your rights'), p('คุณขอเข้าถึง แก้ไข ลบ ระงับการใช้ หรือคัดค้านการใช้ข้อมูลของคุณได้ ส่งคำร้องผ่านหน้า "คำร้องขอใช้สิทธิ"', 'You can ask to access, correct, delete, restrict or object to the use of your data. Send a request on the "Data rights requests" page.')),
  sec(p('ความปลอดภัยของข้อมูล', 'Security'), p('เรามีมาตรการทางเทคนิคและการบริหารจัดการเพื่อป้องกันการเข้าถึง เปลี่ยนแปลง หรือเปิดเผยข้อมูลโดยไม่ได้รับอนุญาต', 'We use technical and organisational measures to prevent unauthorised access, change or disclosure.')),
  sec(p('ติดต่อเจ้าหน้าที่คุ้มครองข้อมูล', 'Contact us'), p('privacy@example.com · โทร 0-0000-0000 · บริษัท ตัวอย่าง จำกัด (ข้อมูลตัวอย่าง)', 'privacy@example.com · 0-0000-0000 · Sample Company Ltd. (sample details)')),
]

export const cookieSections: InfoSection[] = [
  sec(p('คุกกี้คืออะไร', 'What cookies are'), p('คุกกี้คือไฟล์ข้อมูลขนาดเล็กที่เว็บไซต์เก็บไว้ในอุปกรณ์ของคุณ เพื่อจำการตั้งค่าและช่วยให้เว็บไซต์ทำงานได้ดีขึ้น', 'Cookies are small files a site stores on your device to remember settings and help the site work better.')),
  sec(p('คุกกี้ที่จำเป็น', 'Necessary cookies'), p('ใช้จำตะกร้าสินค้า สถานะการเข้าสู่ระบบ และภาษาที่เลือก ปิดไม่ได้เพราะเว็บไซต์ต้องใช้ในการทำงาน', 'They remember your cart, sign-in state and language. They cannot be turned off because the site needs them.')),
  sec(p('คุกกี้เพื่อการวิเคราะห์', 'Analytics cookies'), p('ช่วยให้เราเข้าใจว่าผู้เข้าชมใช้เว็บไซต์อย่างไร เพื่อปรับปรุงหน้าและเนื้อหา เก็บเมื่อคุณยินยอมเท่านั้น', 'They help us see how visitors use the site so we can improve pages and content. Stored only with your consent.')),
  sec(p('คุกกี้เพื่อการตลาด', 'Marketing cookies'), p('ใช้แสดงโฆษณาและข้อเสนอที่ตรงกับความสนใจของคุณ เก็บเมื่อคุณยินยอมเท่านั้น', 'They show ads and offers that match your interests. Stored only with your consent.')),
  sec(p('การจัดการคุกกี้', 'Managing cookies'), p('คุณลบหรือบล็อกคุกกี้ได้ในการตั้งค่าเบราว์เซอร์ แต่บางส่วนของเว็บไซต์อาจใช้งานไม่ได้', 'You can delete or block cookies in your browser settings, but parts of the site may stop working.')),
  sec(p('เดโมนี้', 'This demo'), p('เดโมนี้ใช้พื้นที่เก็บข้อมูลของเบราว์เซอร์เพื่อจำตะกร้า ภาษา และข้อมูลที่กรอกเท่านั้น ไม่มีคุกกี้วิเคราะห์หรือการตลาด', 'This demo uses browser storage only to remember your cart, language and entries. There are no analytics or marketing cookies.')),
]

export const termsSections: InfoSection[] = [
  sec(p('การยอมรับข้อตกลง', 'Acceptance'), p('การใช้เว็บไซต์หรือสมัครสมาชิกถือว่าคุณยอมรับข้อตกลงและเงื่อนไขนี้ หากไม่ยอมรับ โปรดหยุดใช้งาน', 'By using the site or registering you accept these terms. If you do not, please stop using it.')),
  sec(p('บัญชีสมาชิก', 'Your account'), p('คุณต้องให้ข้อมูลที่ถูกต้อง และรักษารหัสผ่านของคุณเป็นความลับ กิจกรรมที่เกิดภายใต้บัญชีของคุณถือเป็นความรับผิดชอบของคุณ', 'Give accurate details and keep your password secret. Activity under your account is your responsibility.')),
  sec(p('สินค้าและราคา', 'Products and prices'), p('เราพยายามแสดงรูปและราคาให้ถูกต้อง หากพบความผิดพลาด เราขอสงวนสิทธิ์แก้ไขหรือยกเลิกคำสั่งซื้อ และแจ้งให้คุณทราบ', 'We aim to show accurate pictures and prices. If there is a mistake, we may correct or cancel the order and will tell you.')),
  sec(p('การสั่งซื้อและการชำระเงิน', 'Orders and payment'), p('คำสั่งซื้อสมบูรณ์เมื่อเราได้รับการชำระเงินหรือยืนยันวิธีชำระปลายทาง เราจะส่งอีเมลยืนยันให้คุณ', 'An order is complete when we receive payment or confirm cash on delivery. We email you a confirmation.')),
  sec(p('การจัดส่ง', 'Delivery'), p('ระยะเวลาจัดส่งเป็นการประมาณ อาจเปลี่ยนตามพื้นที่และสภาพการขนส่ง', 'Delivery times are estimates and may change with the area and transport conditions.')),
  sec(p('ทรัพย์สินทางปัญญา', 'Intellectual property'), p('เนื้อหา รูปภาพ และเครื่องหมายบนเว็บไซต์เป็นของร้านหรือผู้อนุญาต ห้ามคัดลอกหรือนำไปใช้โดยไม่ได้รับอนุญาต', 'Content, pictures and marks on the site belong to the shop or its licensors. Do not copy or reuse them without permission.')),
  sec(p('ข้อจำกัดความรับผิด', 'Limits of liability'), p('เราไม่รับผิดชอบต่อความเสียหายทางอ้อมที่เกิดจากการใช้เว็บไซต์ เท่าที่กฎหมายอนุญาต', 'To the extent the law allows, we are not liable for indirect damage from using the site.')),
  sec(p('การเปลี่ยนแปลงข้อตกลง', 'Changes'), p('เราอาจปรับข้อตกลงนี้เป็นครั้งคราว โดยแจ้งวันที่มีผลบังคับใช้ไว้ที่ด้านบนของหน้า', 'We may update these terms from time to time and show the effective date at the top of the page.')),
]

export const returnsSections: InfoSection[] = [
  sec(p('ระยะเวลา', 'Time limit'), p('เปลี่ยนหรือคืนสินค้าได้ภายใน 30 วันนับจากวันที่รับสินค้า', 'Items can be exchanged or returned within 30 days of receipt.')),
  sec(p('สินค้าที่รับเปลี่ยน–คืน', 'What we accept'), p('สินค้าที่ไม่ได้ใช้งาน สภาพสมบูรณ์ มีบรรจุภัณฑ์ อุปกรณ์เสริม และใบเสร็จครบ', 'Unused items in perfect condition with packaging, accessories and receipt.')),
  sec(p('สินค้าที่ไม่รับเปลี่ยน–คืน', 'What we do not accept'), p('สินค้าที่ตัดหรือผสมตามคำสั่ง สินค้าที่ใช้งานแล้ว สินค้าที่เสียหายจากการใช้งานผิดวิธี และสินค้าโปรโมชันที่ระบุว่าไม่รับคืน', 'Items cut or mixed to order, used items, items damaged by misuse, and promotional items marked non-returnable.')),
  sec(p('สินค้าชำรุดหรือผิดรุ่น', 'Faulty or wrong items'), p('แจ้งภายใน 7 วันพร้อมรูปถ่าย เราเปลี่ยนสินค้าให้ใหม่หรือคืนเงินเต็มจำนวนโดยไม่คิดค่าขนส่ง', 'Tell us within 7 days with photos. We replace the item or refund in full, with no shipping fee.')),
  sec(p('ขั้นตอน', 'How to return'), p('ติดต่อทีมบริการลูกค้า แจ้งเลขคำสั่งซื้อ แล้วนำสินค้าไปที่สาขาหรือรอรับบริการเก็บสินค้า', 'Contact customer service with your order number, then bring the item to a store or wait for pickup.')),
  sec(p('การคืนเงิน', 'Refunds'), p('คืนเงินผ่านช่องทางเดิมที่ชำระ ภายใน 7–14 วันทำการหลังเราตรวจสอบสินค้าแล้ว', 'Refunded to the original payment method within 7–14 working days after we inspect the item.')),
]

export const cctvSections: InfoSection[] = [
  sec(p('วัตถุประสงค์', 'Purpose'), p('เราใช้กล้องวงจรปิดในสาขาและคลังสินค้าเพื่อความปลอดภัยของลูกค้า พนักงาน และทรัพย์สิน', 'We use CCTV in stores and warehouses for the safety of customers, staff and property.')),
  sec(p('ข้อมูลที่เก็บ', 'What is recorded'), p('ภาพและวิดีโอของผู้ที่อยู่ในพื้นที่ที่ติดตั้งกล้อง โดยมีป้ายแจ้งก่อนเข้าพื้นที่ ไม่ติดตั้งในห้องน้ำหรือห้องทดลองสินค้า', 'Pictures and video of people in covered areas, with signs at the entrance. No cameras in toilets or fitting areas.')),
  sec(p('ระยะเวลาเก็บภาพ', 'Retention'), p('เก็บภาพไม่เกิน 30 วัน เว้นแต่มีเหตุที่ต้องใช้เป็นหลักฐาน', 'Footage is kept for up to 30 days unless it is needed as evidence.')),
  sec(p('การเข้าถึงและการเปิดเผย', 'Access and sharing'), p('เจ้าหน้าที่ที่ได้รับมอบหมายเท่านั้นที่ดูภาพได้ เราเปิดเผยภาพแก่เจ้าหน้าที่ตามกฎหมายเมื่อมีคำสั่งหรือคำขอที่ชอบด้วยกฎหมาย', 'Only authorised staff can view footage. We share it with authorities only on a lawful order or request.')),
  sec(p('สิทธิของคุณ', 'Your rights'), p('คุณขอดูภาพของตนเองหรือคัดค้านการเก็บภาพได้ ผ่านหน้า "คำร้องขอใช้สิทธิ"', 'You can ask to see footage of yourself or object to recording through the "Data rights requests" page.')),
  sec(p('ติดต่อ', 'Contact'), p('privacy@example.com · โทร 0-0000-0000 (ข้อมูลตัวอย่าง)', 'privacy@example.com · 0-0000-0000 (sample details)')),
]

export const privacyRequestSections: InfoSection[] = [
  sec(p('สิทธิที่คุณใช้ได้', 'Rights you can use'), p('ขอเข้าถึงหรือรับสำเนาข้อมูล แก้ไขข้อมูลให้ถูกต้อง ลบข้อมูล หรือระงับการใช้ข้อมูลของคุณ', 'Ask to access or get a copy of your data, correct it, delete it, or restrict its use.')),
  sec(p('เราตอบอย่างไรและเมื่อไร', 'How and when we reply'), p('เราตรวจสอบตัวตนของคุณและตอบกลับภายใน 30 วันนับจากวันที่ได้รับคำร้อง', 'We verify your identity and reply within 30 days of receiving the request.')),
  sec(p('ส่งคำร้อง', 'Send a request'), p('กรอกแบบฟอร์มด้านล่าง เดโมนี้ไม่ส่งข้อมูลไปที่ใด', 'Fill in the form below. This demo sends the data nowhere.')),
]
