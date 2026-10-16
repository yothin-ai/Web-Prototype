import type { MenuNode } from '../types'

export const menu: MenuNode[] = [
  {
    label: { th: 'เมล็ดกาแฟ', en: 'Beans' },
    children: [
      { label: { th: 'ตามระดับคั่ว', en: 'By roast' }, children: [
        { label: { th: 'คั่วอ่อน', en: 'Light roast' } },
        { label: { th: 'คั่วกลาง', en: 'Medium roast' } },
        { label: { th: 'คั่วเข้ม', en: 'Dark roast' } },
        { label: { th: 'เอสเปรสโซ่เบลนด์', en: 'Espresso blends' } },
      ] },
      { label: { th: 'ตามแหล่งปลูก', en: 'By origin' }, children: [
        { label: { th: 'เชียงใหม่', en: 'Chiang Mai' } },
        { label: { th: 'น่าน', en: 'Nan' } },
        { label: { th: 'เชียงราย', en: 'Chiang Rai' } },
        { label: { th: 'แม่ฮ่องสอน', en: 'Mae Hong Son' } },
      ] },
      { label: { th: 'ตามการชง', en: 'By brew method' }, children: [
        { label: { th: 'สำหรับดริป', en: 'For pour-over' } },
        { label: { th: 'สำหรับเอสเปรสโซ่', en: 'For espresso' } },
        { label: { th: 'สำหรับโคลด์บรูว์', en: 'For cold brew' } },
        { label: { th: 'สำหรับเฟรนช์เพรส', en: 'For French press' } },
      ] },
    ],
  },
  {
    label: { th: 'ดริป', en: 'Drip' },
    children: [
      { label: { th: 'ดริปแบ็ก', en: 'Drip bags' }, children: [
        { label: { th: 'ดริปแบ็ก 10 ซอง', en: 'Drip bags, 10 pack' } },
        { label: { th: 'ดริปแบ็ก 20 ซอง', en: 'Drip bags, 20 pack' } },
        { label: { th: 'ดริปแบ็กรสผลไม้', en: 'Fruity drip bags' } },
        { label: { th: 'ดริปแบ็กคั่วเข้ม', en: 'Dark roast drip bags' } },
      ] },
      { label: { th: 'กระดาษกรอง', en: 'Filters' }, children: [
        { label: { th: 'กระดาษกรองดริป', en: 'Paper filters' } },
        { label: { th: 'ที่กรองผ้า', en: 'Cloth filters' } },
        { label: { th: 'ที่กรองโลหะ', en: 'Metal filters' } },
        { label: { th: 'กระดาษกรองทรงกรวย', en: 'Cone filters' } },
      ] },
      { label: { th: 'ชุดดริป', en: 'Drip sets' }, children: [
        { label: { th: 'ชุดเริ่มต้น', en: 'Starter sets' } },
        { label: { th: 'ชุดเดินทาง', en: 'Travel sets' } },
        { label: { th: 'ชุดของขวัญ', en: 'Gift sets' } },
        { label: { th: 'ชุดทดลองรส', en: 'Taster sets' } },
      ] },
    ],
  },
  {
    label: { th: 'อุปกรณ์ชงกาแฟ', en: 'Brewing gear' },
    children: [
      { label: { th: 'อุปกรณ์ดริป', en: 'Pour-over gear' }, children: [
        { label: { th: 'ดริปเปอร์', en: 'Drippers' } },
        { label: { th: 'กาต้มน้ำคอห่าน', en: 'Gooseneck kettles' } },
        { label: { th: 'เครื่องชั่งกาแฟ', en: 'Coffee scales' } },
        { label: { th: 'เหยือกรองกาแฟ', en: 'Servers' } },
      ] },
      { label: { th: 'เครื่องบด', en: 'Grinders' }, children: [
        { label: { th: 'เครื่องบดมือ', en: 'Hand grinders' } },
        { label: { th: 'เครื่องบดไฟฟ้า', en: 'Electric grinders' } },
        { label: { th: 'ใบมีดสำรอง', en: 'Spare burrs' } },
        { label: { th: 'แปรงทำความสะอาด', en: 'Cleaning brushes' } },
      ] },
      { label: { th: 'อุปกรณ์อื่นๆ', en: 'Other gear' }, children: [
        { label: { th: 'เฟรนช์เพรส', en: 'French presses' } },
        { label: { th: 'โมก้าพอท', en: 'Moka pots' } },
        { label: { th: 'ที่ตีฟองนม', en: 'Milk frothers' } },
        { label: { th: 'แทมเปอร์', en: 'Tampers' } },
      ] },
    ],
  },
  {
    label: { th: 'แก้วและถ้วย', en: 'Cups and mugs' },
    children: [
      { label: { th: 'แก้วกาแฟ', en: 'Coffee cups' }, children: [
        { label: { th: 'แก้วเซรามิก', en: 'Ceramic mugs' } },
        { label: { th: 'ถ้วยเอสเปรสโซ่', en: 'Espresso cups' } },
        { label: { th: 'แก้วลาเต้', en: 'Latte glasses' } },
        { label: { th: 'แก้วดับเบิลวอลล์', en: 'Double-wall glasses' } },
      ] },
      { label: { th: 'แก้วพกพา', en: 'Travel cups' }, children: [
        { label: { th: 'แก้วเก็บอุณหภูมิ', en: 'Insulated cups' } },
        { label: { th: 'กระบอกน้ำ', en: 'Bottles' } },
        { label: { th: 'แก้วพับได้', en: 'Collapsible cups' } },
        { label: { th: 'ฝาปิดกันหก', en: 'Spill-proof lids' } },
      ] },
      { label: { th: 'จานรองและอุปกรณ์', en: 'Saucers and accessories' }, children: [
        { label: { th: 'จานรอง', en: 'Saucers' } },
        { label: { th: 'ที่รองแก้ว', en: 'Coasters' } },
        { label: { th: 'ช้อนกาแฟ', en: 'Coffee spoons' } },
        { label: { th: 'ถาดเสิร์ฟ', en: 'Serving trays' } },
      ] },
    ],
  },
  {
    label: { th: 'ชา', en: 'Tea' },
    children: [
      { label: { th: 'ชาเขียว', en: 'Green tea' }, children: [
        { label: { th: 'ชาเขียวใบอ่อน', en: 'Young green tea' } },
        { label: { th: 'มัทฉะ', en: 'Matcha' } },
        { label: { th: 'ชาเขียวคั่ว', en: 'Roasted green tea' } },
        { label: { th: 'ชาเขียวมะลิ', en: 'Jasmine green tea' } },
      ] },
      { label: { th: 'ชาดำและชาสมุนไพร', en: 'Black and herbal tea' }, children: [
        { label: { th: 'ชาดำ', en: 'Black tea' } },
        { label: { th: 'ชาอู่หลง', en: 'Oolong tea' } },
        { label: { th: 'ชาสมุนไพร', en: 'Herbal tea' } },
        { label: { th: 'ชาดอกไม้', en: 'Flower tea' } },
      ] },
      { label: { th: 'อุปกรณ์ชงชา', en: 'Tea accessories' }, children: [
        { label: { th: 'กาน้ำชา', en: 'Teapots' } },
        { label: { th: 'ที่กรองชา', en: 'Tea infusers' } },
        { label: { th: 'ถ้วยชา', en: 'Tea cups' } },
        { label: { th: 'ชุดชงชา', en: 'Tea sets' } },
      ] },
    ],
  },
  {
    label: { th: 'ขนมและของว่าง', en: 'Snacks' },
    children: [
      { label: { th: 'คุกกี้', en: 'Cookies' }, children: [
        { label: { th: 'คุกกี้เนยกาแฟ', en: 'Coffee butter cookies' } },
        { label: { th: 'คุกกี้ช็อกโกแลต', en: 'Chocolate cookies' } },
        { label: { th: 'คุกกี้ชาเขียว', en: 'Matcha cookies' } },
        { label: { th: 'คุกกี้ธัญพืช', en: 'Granola cookies' } },
      ] },
      { label: { th: 'ขนมอบ', en: 'Baked goods' }, children: [
        { label: { th: 'บราวนี่', en: 'Brownies' } },
        { label: { th: 'เค้กกล้วยหอม', en: 'Banana cakes' } },
        { label: { th: 'ขนมปังกรอบ', en: 'Crisp toasts' } },
        { label: { th: 'มาการอง', en: 'Macarons' } },
      ] },
      { label: { th: 'ของว่างพกพา', en: 'Snacks on the go' }, children: [
        { label: { th: 'ถั่วอบ', en: 'Roasted nuts' } },
        { label: { th: 'ผลไม้อบแห้ง', en: 'Dried fruit' } },
        { label: { th: 'ช็อกโกแลตแท่ง', en: 'Chocolate bars' } },
        { label: { th: 'กราโนล่า', en: 'Granola' } },
      ] },
    ],
  },
  {
    label: { th: 'ของขวัญ', en: 'Gifts' },
    children: [
      { label: { th: 'ชุดของขวัญกาแฟ', en: 'Coffee gift sets' }, children: [
        { label: { th: 'ชุดเมล็ดกาแฟ', en: 'Bean gift sets' } },
        { label: { th: 'ชุดดริปแบ็ก', en: 'Drip bag gift sets' } },
        { label: { th: 'ชุดแก้วและกาแฟ', en: 'Mug and coffee sets' } },
        { label: { th: 'ชุดทดลองรส', en: 'Tasting sets' } },
      ] },
      { label: { th: 'ชุดของขวัญชา', en: 'Tea gift sets' }, children: [
        { label: { th: 'ชุดชาเขียว', en: 'Green tea sets' } },
        { label: { th: 'ชุดชาดอกไม้', en: 'Flower tea sets' } },
        { label: { th: 'ชุดชาและถ้วย', en: 'Tea and cup sets' } },
        { label: { th: 'ชุดชาสมุนไพร', en: 'Herbal tea sets' } },
      ] },
      { label: { th: 'บัตรของขวัญ', en: 'Gift cards' }, children: [
        { label: { th: 'บัตรของขวัญดิจิทัล', en: 'Digital gift cards' } },
        { label: { th: 'บัตรของขวัญแบบกล่อง', en: 'Boxed gift cards' } },
        { label: { th: 'การ์ดอวยพร', en: 'Greeting cards' } },
        { label: { th: 'กล่องของขวัญ', en: 'Gift boxes' } },
      ] },
    ],
  },
  {
    label: { th: 'สมาชิกรายเดือน', en: 'Monthly club' },
    children: [
      { label: { th: 'แพ็กเกจกาแฟ', en: 'Coffee plans' }, children: [
        { label: { th: 'รายเดือน 1 ถุง', en: 'Monthly, 1 bag' } },
        { label: { th: 'สองสัปดาห์ 2 ถุง', en: 'Fortnightly, 2 bags' } },
        { label: { th: 'รายสัปดาห์ 4 ถุง', en: 'Weekly, 4 bags' } },
        { label: { th: 'ชุดทดลองรส', en: 'Taster plan' } },
      ] },
      { label: { th: 'ตัวเลือกการจัดส่ง', en: 'Delivery options' }, children: [
        { label: { th: 'ส่งธรรมดา', en: 'Standard delivery' } },
        { label: { th: 'ส่งด่วนพิเศษ', en: 'Express delivery' } },
        { label: { th: 'รับที่ร้าน', en: 'Collect in store' } },
        { label: { th: 'เลื่อนรอบจัดส่ง', en: 'Skip a delivery' } },
      ] },
      { label: { th: 'การจัดการสมาชิก', en: 'Manage membership' }, children: [
        { label: { th: 'เปลี่ยนแพ็กเกจ', en: 'Change plan' } },
        { label: { th: 'หยุดชั่วคราว', en: 'Pause plan' } },
        { label: { th: 'ยกเลิกสมาชิก', en: 'Cancel membership' } },
        { label: { th: 'ประวัติการจัดส่ง', en: 'Delivery history' } },
      ] },
    ],
  },
]
