import type { Localized } from '../../i18n'

// For each job on the home page, the product groups that job needs. These are sample lists written
// for the demo (general product groups, no brands); the key is the job's Thai name in the Dataset.
const g = (th: string, en: string): Localized => ({ th, en })

export const jobGroups: Record<string, Localized[]> = {
  // Hardware Dataset
  'งานซ่อมถนนคอนกรีต / ซ่อม Joint ด่วน': [
    g('ปูนซ่อมถนนแห้งเร็ว', 'Fast-setting road repair mortar'), g('วัสดุอุดรอยต่อ (Joint Sealant)', 'Joint sealant'), g('โฟมอุดรอยต่อ (Backer Rod)', 'Backer rod'),
    g('เครื่องตัดคอนกรีต', 'Concrete cutters'), g('เครื่องบดอัด', 'Compactors'), g('กรวยจราจรและแผงกั้น', 'Traffic cones and barriers'), g('อุปกรณ์เซฟตี้', 'Safety gear'),
  ],
  'รั้วบ้าน / กั้นอาณาเขต / รั้วเกษตร / รั้วเอนกประสงค์': [
    g('ตาข่ายและลวดหนาม', 'Mesh and barbed wire'), g('เสารั้วและเสาเข็มเหล็ก', 'Fence posts and steel stakes'), g('แผงรั้วสำเร็จรูป', 'Ready-made fence panels'),
    g('ประตูรั้ว', 'Gates'), g('ลวดผูกและสายรัด', 'Binding wire and ties'), g('ปูนและวัสดุฝังเสา', 'Concrete for setting posts'), g('สีกันสนิมและสีทารั้ว', 'Rust-proof and fence paint'),
  ],
  'ติดตั้งต่อเติมหลังคา/โรงรถ วัสดุแผ่นโพลี': [
    g('แผ่นหลังคาโพลีคาร์บอเนต', 'Polycarbonate roof sheets'), g('โครงเหล็กและแป', 'Steel frames and purlins'), g('สกรูและอุปกรณ์ยึดหลังคา', 'Roof screws and fixings'),
    g('ซีลแลนท์และกันซึม', 'Sealant and waterproofing'), g('รางน้ำฝน', 'Rain gutters'), g('เครื่องเชื่อมและอุปกรณ์เชื่อม', 'Welders and accessories'), g('บันไดและนั่งร้าน', 'Ladders and scaffolding'),
  ],
  'งานติดตั้งถังเก็บน้ำ และปั๊มน้ำ': [
    g('ถังเก็บน้ำ', 'Water tanks'), g('ปั๊มน้ำอัตโนมัติ', 'Automatic water pumps'), g('ท่อพีวีซีและข้อต่อ', 'PVC pipes and fittings'), g('วาล์วและลูกลอย', 'Valves and float valves'),
    g('สายน้ำและสายยาง', 'Water hoses'), g('เทปพันเกลียวและกาวท่อ', 'Thread tape and pipe glue'), g('ฐานรองถังและขาตั้ง', 'Tank bases and stands'),
  ],
  'ปศุสัตว์': [
    g('รั้วและคอกสัตว์', 'Fences and pens'), g('ระบบให้น้ำสัตว์', 'Animal watering systems'), g('อุปกรณ์ให้อาหาร', 'Feeding equipment'), g('หลังคาและโรงเรือน', 'Roofing and sheds'),
    g('พัดลมและระบายอากาศ', 'Fans and ventilation'), g('อุปกรณ์ทำความสะอาดคอก', 'Pen cleaning tools'), g('เครื่องมือซ่อมแซมทั่วไป', 'General repair tools'),
  ],
  'งานซ่อมถนนลาดยาง / ผิวจราจรเร่งด่วนถนนยางมะตอย': [
    g('ยางมะตอยซ่อมหลุม', 'Asphalt pothole patch'), g('น้ำยาทาผิวยางมะตอย', 'Asphalt surface sealer'), g('เครื่องบดอัด', 'Compactors'), g('จอบ พลั่ว และคราด', 'Shovels and rakes'),
    g('กรวยจราจรและแผงกั้น', 'Traffic cones and barriers'), g('ไฟเตือนและแถบสะท้อนแสง', 'Warning lights and reflective tape'), g('อุปกรณ์เซฟตี้', 'Safety gear'),
  ],
  'งานฐานราก': [
    g('ปูนซีเมนต์และคอนกรีตผสมเสร็จ', 'Cement and ready-mix concrete'), g('เหล็กเส้นและเหล็กตะแกรง', 'Rebar and mesh'), g('ลวดผูกเหล็ก', 'Tie wire'), g('ไม้แบบและค้ำยัน', 'Formwork and props'),
    g('หินและทราย', 'Gravel and sand'), g('น้ำยากันซึมและผสมคอนกรีต', 'Waterproofing and concrete admixtures'), g('เครื่องผสมปูนและเครื่องจี้', 'Mixers and vibrators'), g('เครื่องมือวัดระดับ', 'Levelling tools'),
  ],
  'ติดตั้งฝ้า (ฝ้าฉาบเรียบ/ฝ้าหลุม)': [
    g('แผ่นยิปซั่ม (ธรรมดา / กันชื้น / กันไฟ)', 'Gypsum boards (standard / moisture / fire)'), g('โครงคร่าว', 'Ceiling framing'), g('คิ้วเข้ามุม / อุปกรณ์ยึดโครงคร่าว / สกรู', 'Corner trims, framing fixings and screws'),
    g('ปูนฉาบยิปซั่ม', 'Gypsum plaster'), g('ผ้าฉาบรอยต่อ', 'Joint tape'), g('สีรองพื้นและสีทาฝ้าเพดาน', 'Primer and ceiling paint'), g('ช่องเซอร์วิส', 'Access panels'),
    g('ไฟใต้ฝ้า', 'Ceiling lights'), g('สายไฟ', 'Electric cable'), g('สวิตช์', 'Switches'), g('เครื่องยกฝ้า (Panel Lift)', 'Panel lifts'),
    g('ตัดแผ่น / ตกแต่งแผ่น / เครื่องเจียร', 'Board cutters, trimmers and grinders'), g('กรรไกรตัดโครงคร่าว', 'Framing snips'), g('สว่านไฟฟ้าและดอกเจาะ', 'Drills and bits'), g('ไม้บรรทัดฉากและเชือกดิ่ง (วัดระดับ)', 'Set squares and plumb lines'),
  ],
  'งานบำบัดน้ำ': [
    g('ถังบำบัดน้ำเสีย', 'Wastewater tanks'), g('เครื่องกรองน้ำ', 'Water filters'), g('ไส้กรองและสารกรอง', 'Filter cartridges and media'), g('ปั๊มน้ำและปั๊มสูบน้ำเสีย', 'Water and sewage pumps'),
    g('ท่อและข้อต่อ', 'Pipes and fittings'), g('เคมีบำบัดน้ำ', 'Water treatment chemicals'), g('เครื่องวัดคุณภาพน้ำ', 'Water quality testers'),
  ],
  'ทำไร่ ทำสวน': [
    g('เมล็ดพันธุ์และต้นกล้า', 'Seeds and seedlings'), g('ปุ๋ยและดินปลูก', 'Fertiliser and soil'), g('ระบบรดน้ำและสปริงเกลอร์', 'Watering and sprinklers'), g('เครื่องมือทำสวน', 'Garden tools'),
    g('เครื่องพ่นยาและเครื่องตัดหญ้า', 'Sprayers and mowers'), g('ตาข่ายพรางแสง', 'Shade net'), g('บู๊ตและถุงมือ', 'Boots and gloves'),
  ],
  'งานตีเส้นจราจรด่วน / ทางม้าลาย': [
    g('สีตีเส้นจราจร', 'Road marking paint'), g('เม็ดแก้วสะท้อนแสง', 'Reflective glass beads'), g('เครื่องตีเส้น', 'Line marking machines'), g('เทปและแถบสะท้อนแสง', 'Tape and reflective strips'),
    g('กรวยจราจรและแผงกั้น', 'Traffic cones and barriers'), g('ไฟเตือน', 'Warning lights'), g('อุปกรณ์เซฟตี้', 'Safety gear'),
  ],
  'งานโครงหลังคา': [
    g('เหล็กโครงหลังคาและแป', 'Roof steel and purlins'), g('จันทันและอะเสไม้', 'Rafters and plates'), g('สกรูและน็อต', 'Screws and bolts'), g('เครื่องเชื่อมและอุปกรณ์เชื่อม', 'Welders and accessories'),
    g('กระเบื้องและแผ่นมุงหลังคา', 'Roof tiles and sheets'), g('ฉนวนกันความร้อน', 'Thermal insulation'), g('บันไดและนั่งร้าน', 'Ladders and scaffolding'), g('เข็มขัดนิรภัย', 'Safety harnesses'),
  ],
  'กั้นห้องภายใน ผนังเบา': [
    g('แผ่นยิปซั่มและแผ่นไฟเบอร์', 'Gypsum and fibre boards'), g('โครงคร่าวผนัง', 'Wall framing'), g('สกรูยิปซั่ม', 'Drywall screws'), g('ฉนวนกันเสียง', 'Acoustic insulation'),
    g('ปูนฉาบและผ้าฉาบรอยต่อ', 'Plaster and joint tape'), g('สีทาภายใน', 'Interior paint'), g('ประตูและวงกบ', 'Doors and frames'),
  ],
  'ปั๊มน้ำโซลาร์เซลล์ และอุปกรณ์ติดตั้ง': [
    g('ปั๊มน้ำโซลาร์เซลล์', 'Solar water pumps'), g('แผงโซลาร์เซลล์', 'Solar panels'), g('คอนโทรลเลอร์และอินเวอร์เตอร์', 'Controllers and inverters'), g('สายไฟโซลาร์', 'Solar cable'),
    g('ขาตั้งและโครงยึดแผง', 'Panel stands and mounts'), g('ท่อและข้อต่อ', 'Pipes and fittings'), g('ถังเก็บน้ำ', 'Water tanks'),
  ],
  'งานดูแลสวนบ้าน': [
    g('เครื่องตัดหญ้า', 'Lawn mowers'), g('กรรไกรและเลื่อยตัดกิ่ง', 'Shears and pruning saws'), g('สายยางและหัวฉีด', 'Hoses and nozzles'), g('ปุ๋ยและยากำจัดศัตรูพืช', 'Fertiliser and pest control'),
    g('กระถางและดินปลูก', 'Pots and soil'), g('ถุงมือทำสวน', 'Garden gloves'), g('รถเข็นสวน', 'Garden carts'),
  ],
  'กลุ่มงานระบายน้ำ ป้องกันตลิ่ง และบดอัดด่วน': [
    g('ท่อระบายน้ำ', 'Drainage pipes'), g('ตะแกรงและฝาท่อ', 'Grates and covers'), g('ถุงทรายและกระสอบ', 'Sandbags and sacks'), g('ผ้าใบและแผ่นกันดิน', 'Tarpaulins and geotextile'),
    g('เครื่องบดอัด', 'Compactors'), g('ปั๊มสูบน้ำ', 'Dewatering pumps'), g('อุปกรณ์เซฟตี้', 'Safety gear'),
  ],
  'กลุ่มงาน PPE & เซฟตี้หน้างานซ่อมฉุกเฉิน': [
    g('หมวกนิรภัย', 'Hard hats'), g('แว่นตานิรภัย', 'Safety glasses'), g('ถุงมือกันบาด', 'Cut-resistant gloves'), g('รองเท้าเซฟตี้', 'Safety boots'),
    g('หน้ากากกันฝุ่น', 'Dust masks'), g('เสื้อสะท้อนแสง', 'Hi-vis vests'), g('ที่อุดหู', 'Ear protection'), g('ชุดปฐมพยาบาล', 'First-aid kits'),
  ],
  'งานจัดสวนทางเดินรอบบ้านความยาว 6 เมตร': [
    g('แผ่นปูทางเดิน', 'Paving stones'), g('หินกรวดและหินโรยทาง', 'Gravel and path stones'), g('ทรายและปูนปูพื้น', 'Sand and paving mortar'), g('ขอบสวนและแนวกั้นดิน', 'Garden edging'),
    g('ไฟสนามโซลาร์', 'Solar garden lights'), g('ต้นไม้และไม้ประดับ', 'Plants and shrubs'), g('เครื่องมือทำสวน', 'Garden tools'),
  ],
  // Default Dataset (stationery)
  'จัดโต๊ะทำงานใหม่': [g('โต๊ะและที่วางจอ', 'Desks and monitor stands'), g('ชุดเครื่องเขียนบนโต๊ะ', 'Desk stationery sets'), g('โคมไฟตั้งโต๊ะ', 'Desk lamps'), g('ที่จัดระเบียบสายและของ', 'Organisers and cable tidies'), g('สมุดและแผ่นรองเขียน', 'Notebooks and desk pads'), g('กล่องเก็บเอกสาร', 'File boxes')],
  'เตรียมกลับไปเรียน': [g('สมุดและกระดาษ', 'Notebooks and paper'), g('ปากกาและดินสอ', 'Pens and pencils'), g('กระเป๋านักเรียน', 'School bags'), g('กล่องดินสอ', 'Pencil cases'), g('อุปกรณ์ศิลปะ', 'Art supplies'), g('เครื่องคิดเลข', 'Calculators')],
  'ของขวัญให้เพื่อนร่วมงาน': [g('ชุดปากกาของขวัญ', 'Gift pen sets'), g('สมุดบันทึกปกผ้า', 'Cloth-bound notebooks'), g('แก้วและกระบอกน้ำ', 'Mugs and bottles'), g('กล่องของขวัญและการ์ด', 'Gift boxes and cards'), g('ที่วางโทรศัพท์', 'Phone stands'), g('ต้นไม้ตั้งโต๊ะ', 'Desk plants')],
  'มุมอ่านหนังสือที่บ้าน': [g('โคมไฟอ่านหนังสือ', 'Reading lamps'), g('ที่คั่นหนังสือ', 'Bookmarks'), g('ชั้นหนังสือ', 'Bookshelves'), g('เบาะและหมอนรอง', 'Cushions'), g('สมุดบันทึก', 'Notebooks'), g('แว่นขยายและที่ตั้งหนังสือ', 'Magnifiers and book stands')],
  'เดินทางไปทำงาน': [g('กระเป๋าสะพาย', 'Shoulder bags'), g('กระบอกน้ำพกพา', 'Travel bottles'), g('สมุดพกและปากกา', 'Pocket notebooks and pens'), g('ที่ชาร์จพกพา', 'Power banks'), g('ร่มพับ', 'Folding umbrellas'), g('กล่องข้าว', 'Lunch boxes')],
  'เตรียมประชุมทีม': [g('ไวท์บอร์ดและปากกา', 'Whiteboards and markers'), g('กระดาษโน้ตและโพสต์อิท', 'Sticky notes'), g('แฟ้มและคลิปหนีบ', 'Folders and clips'), g('ปากกาเน้นข้อความ', 'Highlighters'), g('ป้ายชื่อ', 'Name badges'), g('เครื่องเย็บกระดาษ', 'Staplers')],
  // Coffee Dataset
  'ชงดริปที่บ้าน': [g('เมล็ดกาแฟคั่ว', 'Roasted beans'), g('ดริปเปอร์และกระดาษกรอง', 'Drippers and filters'), g('กาดริปคอห่านและเครื่องชั่ง', 'Gooseneck kettles and scales'), g('เครื่องบดกาแฟมือหมุน', 'Hand grinders'), g('แก้วและเหยือกเซิร์ฟ', 'Cups and servers'), g('ที่เก็บเมล็ดกาแฟ', 'Bean storage')],
  'เริ่มทำคาเฟ่เล็ก ๆ': [g('เครื่องชงเอสเปรสโซ', 'Espresso machines'), g('เครื่องบดกาแฟไฟฟ้า', 'Electric grinders'), g('เมล็ดกาแฟสำหรับร้าน', 'Beans for cafes'), g('แก้วและบรรจุภัณฑ์', 'Cups and packaging'), g('เหยือกตีนมและอุปกรณ์บาริสต้า', 'Milk jugs and barista tools'), g('ไซรัปและวัตถุดิบ', 'Syrups and ingredients'), g('ชุดตั้งโต๊ะและเก้าอี้', 'Tables and chairs')],
  'ของขวัญคนรักกาแฟ': [g('ชุดกาแฟของขวัญ', 'Coffee gift sets'), g('แก้วเซรามิก', 'Ceramic mugs'), g('ชุดดริปเริ่มต้น', 'Starter drip kits'), g('เมล็ดกาแฟคัดพิเศษ', 'Specialty beans'), g('กล่องของขวัญและการ์ด', 'Gift boxes and cards'), g('หนังสือกาแฟ', 'Coffee books')],
  'กาแฟระหว่างเดินทาง': [g('แก้วเก็บอุณหภูมิ', 'Insulated cups'), g('กาแฟดริปแบบซอง', 'Drip bag coffee'), g('เครื่องชงพกพา', 'Portable brewers'), g('กระบอกน้ำ', 'Bottles'), g('กาแฟสำเร็จรูป', 'Instant coffee'), g('ที่หุ้มแก้ว', 'Cup sleeves')],
  'ปาร์ตี้กาแฟกับเพื่อน': [g('เหยือกและเครื่องชงขนาดใหญ่', 'Large pitchers and brewers'), g('ชุดแก้วและจานรอง', 'Cup and saucer sets'), g('ขนมและคุกกี้', 'Snacks and cookies'), g('เมล็ดกาแฟหลายรสชาติ', 'Mixed-flavour beans'), g('ที่ตั้งแก้วและถาด', 'Coasters and trays'), g('นมและครีมเทียม', 'Milk and creamers')],
  'ทำงานที่บ้านให้สดชื่น': [g('กาแฟพร้อมดื่ม', 'Ready-to-drink coffee'), g('เครื่องชงขนาดเล็ก', 'Compact brewers'), g('แก้วใบใหญ่', 'Large mugs'), g('เมล็ดกาแฟคั่วอ่อน', 'Light-roast beans'), g('เครื่องทำความร้อนแก้ว', 'Mug warmers'), g('ชาและเครื่องดื่มทางเลือก', 'Tea and alternatives')],
}
