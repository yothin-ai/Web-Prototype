import type { MenuNode } from '../types'

export const menu: MenuNode[] = [
  {
    label: { th: 'เครื่องเขียน', en: 'Stationery' },
    children: [
      { label: { th: 'ปากกา', en: 'Pens' }, children: [
        { label: { th: 'ปากกาลูกลื่น', en: 'Ballpoint pens' } },
        { label: { th: 'ปากกาเจล', en: 'Gel pens' } },
        { label: { th: 'ปากกาหมึกซึม', en: 'Fountain pens' } },
        { label: { th: 'ปากกาเน้นข้อความ', en: 'Highlighters' } },
      ] },
      { label: { th: 'สมุดและกระดาษ', en: 'Notebooks and paper' }, children: [
        { label: { th: 'สมุดโน้ต', en: 'Notebooks' } },
        { label: { th: 'สมุดแพลนเนอร์', en: 'Planners' } },
        { label: { th: 'กระดาษโน้ต', en: 'Sticky notes' } },
        { label: { th: 'กระดาษวาดเขียน', en: 'Drawing paper' } },
      ] },
      { label: { th: 'อุปกรณ์เขียน', en: 'Writing accessories' }, children: [
        { label: { th: 'ดินสอ', en: 'Pencils' } },
        { label: { th: 'ยางลบ', en: 'Erasers' } },
        { label: { th: 'ไม้บรรทัด', en: 'Rulers' } },
        { label: { th: 'กบเหลาดินสอ', en: 'Pencil sharpeners' } },
      ] },
    ],
  },
  {
    label: { th: 'ของใช้บนโต๊ะ', en: 'Desk' },
    children: [
      { label: { th: 'ที่จัดโต๊ะ', en: 'Desk organisers' }, children: [
        { label: { th: 'ที่เสียบปากกา', en: 'Pen holders' } },
        { label: { th: 'ถาดวางเอกสาร', en: 'Document trays' } },
        { label: { th: 'กล่องเก็บของ', en: 'Storage boxes' } },
        { label: { th: 'ที่วางโทรศัพท์', en: 'Phone stands' } },
      ] },
      { label: { th: 'โคมไฟและแสงสว่าง', en: 'Lamps and lighting' }, children: [
        { label: { th: 'โคมไฟตั้งโต๊ะ', en: 'Desk lamps' } },
        { label: { th: 'โคมไฟหนีบ', en: 'Clip-on lamps' } },
        { label: { th: 'ไฟ LED อ่านหนังสือ', en: 'LED reading lights' } },
        { label: { th: 'หลอดไฟสำรอง', en: 'Spare bulbs' } },
      ] },
      { label: { th: 'อุปกรณ์เสริมโต๊ะ', en: 'Desk accessories' }, children: [
        { label: { th: 'แผ่นรองเมาส์', en: 'Mouse pads' } },
        { label: { th: 'ที่วางโน้ตบุ๊ก', en: 'Laptop stands' } },
        { label: { th: 'แผ่นรองโต๊ะ', en: 'Desk mats' } },
        { label: { th: 'นาฬิกาตั้งโต๊ะ', en: 'Desk clocks' } },
      ] },
    ],
  },
  {
    label: { th: 'เครื่องดื่ม', en: 'Drinkware' },
    children: [
      { label: { th: 'แก้วและกระบอกน้ำ', en: 'Cups and bottles' }, children: [
        { label: { th: 'แก้วเซรามิก', en: 'Ceramic mugs' } },
        { label: { th: 'กระบอกน้ำสแตนเลส', en: 'Stainless bottles' } },
        { label: { th: 'แก้วพกพา', en: 'Travel cups' } },
        { label: { th: 'แก้วน้ำใส', en: 'Clear glasses' } },
      ] },
      { label: { th: 'อุปกรณ์ชงเครื่องดื่ม', en: 'Drink-making tools' }, children: [
        { label: { th: 'ที่ชงชา', en: 'Tea infusers' } },
        { label: { th: 'ที่ตีฟองนม', en: 'Milk frothers' } },
        { label: { th: 'กาต้มน้ำ', en: 'Kettles' } },
        { label: { th: 'ที่กรองกาแฟ', en: 'Coffee filters' } },
      ] },
      { label: { th: 'อุปกรณ์เสริม', en: 'Accessories' }, children: [
        { label: { th: 'ฝาปิดแก้ว', en: 'Cup lids' } },
        { label: { th: 'หลอดดูด', en: 'Straws' } },
        { label: { th: 'ที่รองแก้ว', en: 'Coasters' } },
        { label: { th: 'ถุงเก็บความเย็น', en: 'Cooler bags' } },
      ] },
    ],
  },
  {
    label: { th: 'กระเป๋า', en: 'Bags' },
    children: [
      { label: { th: 'กระเป๋าทำงาน', en: 'Work bags' }, children: [
        { label: { th: 'กระเป๋าเป้', en: 'Backpacks' } },
        { label: { th: 'กระเป๋าโน้ตบุ๊ก', en: 'Laptop bags' } },
        { label: { th: 'กระเป๋าเอกสาร', en: 'Document bags' } },
        { label: { th: 'กระเป๋าสะพายข้าง', en: 'Messenger bags' } },
      ] },
      { label: { th: 'กระเป๋าผ้า', en: 'Tote bags' }, children: [
        { label: { th: 'กระเป๋าผ้าใบ', en: 'Canvas totes' } },
        { label: { th: 'กระเป๋าผ้าพับได้', en: 'Foldable totes' } },
        { label: { th: 'ถุงผ้ารักษ์โลก', en: 'Reusable shopping bags' } },
        { label: { th: 'กระเป๋าช้อปปิ้ง', en: 'Shopping bags' } },
      ] },
      { label: { th: 'กระเป๋าใบเล็ก', en: 'Small bags' }, children: [
        { label: { th: 'กระเป๋าสตางค์', en: 'Wallets' } },
        { label: { th: 'กระเป๋าใส่เหรียญ', en: 'Coin purses' } },
        { label: { th: 'กระเป๋าเครื่องสำอาง', en: 'Pouches' } },
        { label: { th: 'ที่ใส่บัตร', en: 'Card holders' } },
      ] },
    ],
  },
  {
    label: { th: 'ของขวัญ', en: 'Gifts' },
    children: [
      { label: { th: 'ชุดของขวัญ', en: 'Gift sets' }, children: [
        { label: { th: 'ชุดเครื่องเขียน', en: 'Stationery gift sets' } },
        { label: { th: 'ชุดแก้วกาแฟ', en: 'Mug gift sets' } },
        { label: { th: 'ชุดของใช้บนโต๊ะ', en: 'Desk gift sets' } },
        { label: { th: 'ชุดสมุดและปากกา', en: 'Notebook and pen sets' } },
      ] },
      { label: { th: 'อุปกรณ์ห่อของขวัญ', en: 'Gift wrapping' }, children: [
        { label: { th: 'กระดาษห่อ', en: 'Wrapping paper' } },
        { label: { th: 'ริบบิ้น', en: 'Ribbons' } },
        { label: { th: 'กล่องของขวัญ', en: 'Gift boxes' } },
        { label: { th: 'การ์ดอวยพร', en: 'Greeting cards' } },
      ] },
      { label: { th: 'ของขวัญตามโอกาส', en: 'Occasion gifts' }, children: [
        { label: { th: 'ปีใหม่', en: 'New Year gifts' } },
        { label: { th: 'วันเกิด', en: 'Birthday gifts' } },
        { label: { th: 'ขอบคุณ', en: 'Thank-you gifts' } },
        { label: { th: 'แทนใจ', en: 'Tokens of appreciation' } },
      ] },
    ],
  },
  {
    label: { th: 'งานฝีมือ', en: 'Crafts' },
    children: [
      { label: { th: 'อุปกรณ์วาดภาพ', en: 'Art supplies' }, children: [
        { label: { th: 'สีน้ำ', en: 'Watercolours' } },
        { label: { th: 'สีไม้', en: 'Coloured pencils' } },
        { label: { th: 'พู่กัน', en: 'Paint brushes' } },
        { label: { th: 'สมุดสเก็ตช์', en: 'Sketchbooks' } },
      ] },
      { label: { th: 'อุปกรณ์ประดิษฐ์', en: 'Craft supplies' }, children: [
        { label: { th: 'กาว', en: 'Glue' } },
        { label: { th: 'กรรไกร', en: 'Scissors' } },
        { label: { th: 'กระดาษสี', en: 'Coloured paper' } },
        { label: { th: 'เทปตกแต่ง', en: 'Decorative tape' } },
      ] },
      { label: { th: 'ชุด DIY', en: 'DIY kits' }, children: [
        { label: { th: 'ชุดถักนิตติ้ง', en: 'Knitting kits' } },
        { label: { th: 'ชุดปักผ้า', en: 'Embroidery kits' } },
        { label: { th: 'ชุดทำเทียนหอม', en: 'Candle-making kits' } },
        { label: { th: 'ชุดงานไม้', en: 'Woodwork kits' } },
      ] },
    ],
  },
  {
    label: { th: 'ออฟฟิศ', en: 'Office' },
    children: [
      { label: { th: 'อุปกรณ์สำนักงาน', en: 'Office equipment' }, children: [
        { label: { th: 'เครื่องเย็บกระดาษ', en: 'Staplers' } },
        { label: { th: 'เครื่องเจาะกระดาษ', en: 'Hole punches' } },
        { label: { th: 'เครื่องคิดเลข', en: 'Calculators' } },
        { label: { th: 'เครื่องตัดกระดาษ', en: 'Paper trimmers' } },
      ] },
      { label: { th: 'แฟ้มและจัดเก็บ', en: 'Files and storage' }, children: [
        { label: { th: 'แฟ้มเอกสาร', en: 'Document folders' } },
        { label: { th: 'กล่องเอกสาร', en: 'Archive boxes' } },
        { label: { th: 'ชั้นวางเอกสาร', en: 'Document racks' } },
        { label: { th: 'ป้ายชื่อ', en: 'Label stickers' } },
      ] },
      { label: { th: 'บอร์ดและป้าย', en: 'Boards and signs' }, children: [
        { label: { th: 'กระดานไวต์บอร์ด', en: 'Whiteboards' } },
        { label: { th: 'กระดานปักหมุด', en: 'Pin boards' } },
        { label: { th: 'ปากกาไวต์บอร์ด', en: 'Whiteboard markers' } },
        { label: { th: 'แม่เหล็กติดบอร์ด', en: 'Board magnets' } },
      ] },
    ],
  },
  {
    label: { th: 'สินค้าลดราคา', en: 'On sale' },
    children: [
      { label: { th: 'Flash Sale', en: 'Flash Sale' }, children: [
        { label: { th: 'ลดสูงสุด 50%', en: 'Up to 50% off' } },
        { label: { th: 'สินค้าใกล้หมด', en: 'Almost sold out' } },
        { label: { th: 'ราคาพิเศษวันนี้', en: 'Today\'s special prices' } },
        { label: { th: 'ซื้อ 1 แถม 1', en: 'Buy 1 get 1' } },
      ] },
      { label: { th: 'โปรโมชั่นชุด', en: 'Bundle deals' }, children: [
        { label: { th: 'ชุดเครื่องเขียน', en: 'Stationery bundles' } },
        { label: { th: 'ชุดของขวัญ', en: 'Gift bundles' } },
        { label: { th: 'ชุดโต๊ะทำงาน', en: 'Desk bundles' } },
        { label: { th: 'ชุดกระเป๋า', en: 'Bag bundles' } },
      ] },
      { label: { th: 'ล้างสต็อก', en: 'Clearance' }, children: [
        { label: { th: 'สินค้าตัวโชว์', en: 'Display items' } },
        { label: { th: 'สินค้าเลิกผลิต', en: 'Discontinued items' } },
        { label: { th: 'สินค้าตกรุ่น', en: 'Previous models' } },
        { label: { th: 'สินค้ามีตำหนิเล็กน้อย', en: 'Slightly imperfect items' } },
      ] },
    ],
  },
]
