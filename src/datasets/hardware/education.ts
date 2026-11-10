import { course, pair, sharedFaq, sharedReviews } from '../educationBuilder'
import type { EducationContent } from '../types'

// Sample courses for the hardware dataset. The people and numbers are invented.
export const education: EducationContent = {
  categories: [
    { id: 'build', name: pair(['งานก่อสร้างและตกแต่ง', 'Building and finishing']) },
    { id: 'home', name: pair(['งานซ่อมในบ้าน', 'Home repair']) },
    { id: 'tools', name: pair(['เครื่องมือและความปลอดภัย', 'Tools and safety']) },
  ],
  instructors: [
    { id: 'i1', name: pair(['ช่างตัวอย่าง ก', 'Builder A']), role: pair(['ช่างก่อสร้างอิสระ', 'Independent builder']), bio: pair(['ทำงานก่อสร้างบ้านมากว่า 15 ปี (ข้อมูลสมมติ)', 'Has built houses for over 15 years (invented).']) },
    { id: 'i2', name: pair(['ช่างตัวอย่าง ข', 'Technician B']), role: pair(['ช่างไฟฟ้าและประปา', 'Electrician and plumber']), bio: pair(['เน้นสอนให้รู้ว่างานไหนทำเองได้และงานไหนต้องเรียกช่าง (ข้อมูลสมมติ)', 'Teaches what you can do yourself and what needs a pro (invented).']) },
    { id: 'i3', name: pair(['ครูตัวอย่าง ค', 'Instructor C']), role: pair(['ผู้ฝึกอบรมความปลอดภัยในงานช่าง', 'Workshop safety trainer']), bio: pair(['ฝึกการใช้เครื่องมือช่างอย่างปลอดภัย (ข้อมูลสมมติ)', 'Trains people to use workshop tools safely (invented).']) },
  ],
  reviews: sharedReviews,
  faq: sharedFaq,
  courses: [
    course({
      id: 'cement', title: ['เลือกปูนให้เหมาะกับงาน', 'Choosing cement for the job'], summary: ['รู้จักประเภทปูน อัตราส่วนผสม และการบ่มให้งานแข็งแรง', 'Know the cement types, mix ratios and curing for strong work.'],
      level: 'beginner', category: 'build', price: 990, rating: 4.6, ratingCount: 112, instructor: 'i1',
      outcomes: [['เลือกปูนให้ตรงกับงาน', 'Pick the right cement for the job'], ['ผสมในอัตราส่วนเบื้องต้น', 'Mix in basic ratios'], ['บ่มคอนกรีตให้แข็งแรง', 'Cure concrete properly']],
      audience: [['คนที่ต่อเติมหรือซ่อมบ้านเอง', 'People extending or repairing their home'], ['ผู้รับเหมามือใหม่', 'New contractors']],
      lessons: [
        [['ประเภทของปูน', 'Types of cement'], 6, ['ปูนซีเมนต์ปอร์ตแลนด์ใช้งานโครงสร้าง ปูนฉาบสำเร็จใช้งานฉาบเรียบ และปูนกาวใช้ปูกระเบื้อง', 'Portland cement suits structural work, ready plaster suits rendering and tile adhesive suits laying tiles.']],
        [['อัตราส่วนผสมเบื้องต้น', 'Basic mix ratios'], 8, ['คอนกรีตทั่วไปใช้ปูน ทราย หิน อย่างละส่วนตามสูตร เช่น 1:2:3 ใส่น้ำทีละน้อยจนเหนียวพอดี', 'General concrete uses cement, sand and stone in a ratio such as 1:2:3, adding water little by little until workable.']],
        [['การบ่มคอนกรีต', 'Curing concrete'], 5, ['หลังเทต้องรักษาความชื้นอย่างน้อย 7 วัน เช่น รดน้ำหรือคลุมด้วยผ้าชุบน้ำ เพื่อไม่ให้แตกร้าว', 'After pouring, keep it damp for at least 7 days by watering or covering with wet cloth, to avoid cracks.']],
        [['ข้อผิดพลาดที่พบบ่อย', 'Common mistakes'], 5, ['ใส่น้ำมากเกินทำให้ไม่แข็งแรง ผสมไม่ทั่วทำให้เป็นจุดอ่อน และเทแล้วทิ้งแดดแรงทำให้ผิวแตก', 'Too much water weakens it, poor mixing leaves weak spots, and leaving it in strong sun cracks the surface.']],
      ],
      quiz: [
        [['ปูนชนิดใดเหมาะกับการปูกระเบื้อง', 'Which suits laying tiles?'], [['ปูนกาว', 'Tile adhesive'], ['ปูนปอร์ตแลนด์เปล่า', 'Plain Portland cement'], ['ปูนฉาบสำเร็จ', 'Ready plaster']], [0]],
        [['ควรบ่มคอนกรีตอย่างน้อยกี่วัน', 'How many days should concrete be cured at least?'], [['7 วัน', '7 days'], ['1 ชั่วโมง', '1 hour'], ['ไม่ต้องบ่ม', 'No curing']], [0]],
        [['เลือกทุกข้อที่ทำให้คอนกรีตอ่อนแอ', 'Pick what weakens concrete'], [['ใส่น้ำมากเกินไป', 'Too much water'], ['ผสมไม่ทั่ว', 'Poor mixing'], ['บ่มด้วยความชื้น', 'Curing damp']], [0, 1]],
      ],
    }),
    course({
      id: 'electric', title: ['งานไฟฟ้าในบ้านอย่างปลอดภัย', 'Safe home electrics'], summary: ['ตัดไฟ เลือกอุปกรณ์ให้ตรงกับโหลด และรู้ว่าเมื่อไรควรเรียกช่าง', 'Cut the power, match parts to the load and know when to call a technician.'],
      level: 'all', category: 'home', price: 0, rating: 4.8, ratingCount: 260, instructor: 'i2',
      outcomes: [['ตัดไฟและตรวจก่อนลงมือ', 'Cut and test the power first'], ['เลือกสายและเบรกเกอร์ที่พอดี', 'Choose suitable cable and breakers'], ['รู้ขีดจำกัดของงานที่ทำเองได้', 'Know what is safe to do yourself']],
      audience: [['เจ้าของบ้านที่เปลี่ยนสวิตช์หรือหลอดเอง', 'Homeowners swapping switches or lamps'], ['ผู้เช่าที่อยากดูแลห้องเอง', 'Tenants looking after their flat']],
      lessons: [
        [['ตัดไฟก่อนเสมอ', 'Always cut the power first'], 5, ['ปิดเบรกเกอร์ของวงจรนั้น แล้วใช้ไขควงเช็กไฟตรวจซ้ำว่าไม่มีไฟก่อนแตะสายทุกครั้ง', 'Switch off that circuit’s breaker, then check with a voltage tester that it is dead before touching any wire.']],
        [['เลือกอุปกรณ์ให้ตรงกับโหลด', 'Match parts to the load'], 7, ['สายไฟและเบรกเกอร์ต้องรับกระแสได้มากกว่าโหลดรวมของอุปกรณ์ ห้ามเปลี่ยนเป็นขนาดใหญ่ขึ้นโดยไม่ตรวจสาย', 'Cable and breaker must carry more than the total load. Never fit a bigger breaker without checking the cable.']],
        [['การต่อสายและฉนวน', 'Joining wires and insulation'], 6, ['ใช้ตัวต่อสายและเทปฉนวนที่เหมาะสม ปอกสายให้พอดี และไม่ให้ทองแดงโผล่นอกขั้ว', 'Use proper connectors and insulating tape, strip only what is needed and keep bare copper inside the terminal.']],
        [['เมื่อไรควรเรียกช่าง', 'When to call a technician'], 5, ['งานที่ต้องแตะตู้เมน เปลี่ยนสายในผนัง หรือพบกลิ่นไหม้ ให้หยุดและเรียกช่างไฟที่มีใบอนุญาต', 'For work on the main board, wiring inside walls, or a burning smell, stop and call a licensed electrician.']],
      ],
      quiz: [
        [['ก่อนแตะสายไฟควรทำอย่างไร', 'What should you do before touching a wire?'], [['ปิดเบรกเกอร์และตรวจว่าไม่มีไฟ', 'Switch off the breaker and test it is dead'], ['ใส่ถุงมือผ้า', 'Wear cloth gloves'], ['รีบทำให้เสร็จ', 'Work fast']], [0]],
        [['จริงหรือเท็จ: เปลี่ยนเบรกเกอร์เป็นขนาดใหญ่ขึ้นได้โดยไม่ต้องตรวจสาย', 'True or false: you can fit a bigger breaker without checking the cable'], [['จริง', 'True'], ['เท็จ', 'False']], [1]],
        [['เลือกทุกข้อที่ควรเรียกช่างไฟ', 'Pick the cases for an electrician'], [['มีกลิ่นไหม้', 'A burning smell'], ['งานที่ตู้เมน', 'Work on the main board'], ['เปลี่ยนหลอดไฟ', 'Changing a bulb']], [0, 1]],
      ],
    }),
    course({
      id: 'plumb', title: ['ซ่อมรั่วซึมและงานประปาเบื้องต้น', 'Leaks and basic plumbing'], summary: ['หาจุดรั่ว เลือกข้อต่อและเทปพันเกลียว และซ่อมก๊อกน้ำหยด', 'Find the leak, choose fittings and thread tape, and fix a dripping tap.'],
      level: 'beginner', category: 'home', price: 890, rating: 4.5, ratingCount: 143, instructor: 'i2',
      outcomes: [['หาจุดรั่วให้เจอ', 'Find where it leaks'], ['เลือกข้อต่อและเทปที่ถูก', 'Pick the right fittings and tape'], ['เปลี่ยนซีลก๊อกน้ำ', 'Replace a tap washer']],
      audience: [['เจ้าของบ้านที่น้ำรั่วหยด', 'Homeowners with drips'], ['ผู้เช่าที่ต้องการแก้ปัญหาเล็ก', 'Tenants fixing small problems']],
      lessons: [
        [['หาจุดรั่ว', 'Finding the leak'], 6, ['ปิดน้ำทุกจุดแล้วดูมิเตอร์ ถ้ายังหมุนแปลว่ามีรั่ว จากนั้นไล่ตรวจข้อต่อทีละจุดด้วยกระดาษทิชชู', 'Turn every tap off and watch the meter. If it still moves there is a leak; then check joints one by one with tissue.']],
        [['เลือกข้อต่อและเทปพันเกลียว', 'Fittings and thread tape'], 7, ['พันเทปตามทิศทางเกลียว 3–5 รอบ แล้วขันพอแน่น ขันแรงเกินทำให้เกลียวเสียหาย', 'Wrap tape with the thread direction 3–5 times, then tighten firmly. Over-tightening damages the thread.']],
        [['ซ่อมก๊อกน้ำหยด', 'Fixing a dripping tap'], 6, ['ปิดวาล์วน้ำ ถอดก้านก๊อก เปลี่ยนซีลยางที่สึก แล้วประกอบกลับและทดสอบ', 'Close the valve, remove the spindle, replace the worn rubber washer, then reassemble and test.']],
        [['ท่อและข้อต่อพีวีซี', 'PVC pipes and joints'], 5, ['ตัดท่อให้ตรง ลบคมปลาย ทากาวทั้งสองด้าน แล้วกดค้างสักครู่ รอให้แห้งก่อนเปิดน้ำ', 'Cut square, deburr the ends, glue both sides and hold for a moment. Let it cure before turning the water on.']],
      ],
      quiz: [
        [['พันเทปเกลียวอย่างไร', 'How should thread tape be wrapped?'], [['ตามทิศทางเกลียว 3–5 รอบ', 'With the thread, 3–5 turns'], ['ทวนเกลียวรอบเดียว', 'Against the thread, once'], ['ไม่ต้องพัน', 'Not at all']], [0]],
        [['ก่อนถอดก้านก๊อกต้องทำอะไร', 'What must you do before removing the spindle?'], [['ปิดวาล์วน้ำ', 'Close the water valve'], ['เปิดน้ำสุด', 'Open the tap fully'], ['ทาน้ำมัน', 'Apply oil']], [0]],
        [['จริงหรือเท็จ: ขันข้อต่อให้แรงที่สุดจะกันรั่วได้ดีที่สุด', 'True or false: tightening as hard as possible stops leaks best'], [['จริง', 'True'], ['เท็จ', 'False']], [1]],
      ],
    }),
    course({
      id: 'paint', title: ['ทาสีผนังให้เรียบสวย', 'Painting walls neatly'], summary: ['เตรียมผิว เลือกสี และทาให้เรียบไม่เป็นรอย', 'Prepare the surface, choose paint and roll on a smooth finish.'],
      level: 'beginner', category: 'build', price: 790, rating: 4.4, ratingCount: 87, isNew: true, instructor: 'i1',
      outcomes: [['เตรียมผิวผนังก่อนทา', 'Prepare the wall first'], ['เลือกสีภายในและภายนอก', 'Pick interior or exterior paint'], ['ทาให้เรียบไม่เป็นคราบ', 'Roll on a streak-free coat']],
      audience: [['คนที่ทาสีห้องเอง', 'People painting a room themselves'], ['เจ้าของร้านเล็กที่ปรับปรุงเอง', 'Small shop owners refreshing a space']],
      lessons: [
        [['เตรียมผิวผนัง', 'Preparing the wall'], 6, ['ขัดผิวหยาบ อุดรอยแตกด้วยโป๊ว และเช็ดฝุ่นให้สะอาดก่อนทาทุกครั้ง', 'Sand rough spots, fill cracks with filler and wipe off dust before every job.']],
        [['เลือกสีให้ถูกที่', 'Choosing the paint'], 6, ['สีภายนอกทนแดดและฝน สีภายในเช็ดล้างง่ายและกลิ่นน้อย อย่าสลับกัน', 'Exterior paint resists sun and rain, interior paint wipes clean with less smell. Do not swap them.']],
        [['ทาด้วยลูกกลิ้ง', 'Rolling on'], 7, ['ทาเป็นรูปตัว W แล้วลากเก็บให้เรียบ ทาสองชั้นโดยรอให้ชั้นแรกแห้งก่อน', 'Roll a W shape then smooth it out. Apply two coats, letting the first dry.']],
        [['เก็บงานและล้างอุปกรณ์', 'Finishing and cleaning up'], 4, ['ดึงเทปกาวออกก่อนสีแห้งสนิท ล้างลูกกลิ้งด้วยน้ำสำหรับสีน้ำ และเก็บกระป๋องปิดสนิท', 'Peel masking tape before the paint fully dries, wash rollers with water for water-based paint and seal the tin.']],
      ],
      quiz: [
        [['ควรทำอะไรก่อนทาสี', 'What comes before painting?'], [['เตรียมผิวและเช็ดฝุ่น', 'Prepare the surface and wipe off dust'], ['ทาทับของเดิมทันที', 'Paint straight over'], ['เปิดพัดลมแรงๆ', 'Run a strong fan']], [0]],
        [['ควรทากี่ชั้นให้เรียบสวย', 'How many coats for a neat finish?'], [['สองชั้น', 'Two'], ['ชั้นเดียวหนาๆ', 'One thick coat'], ['สิบชั้น', 'Ten']], [0]],
        [['จริงหรือเท็จ: ใช้สีภายนอกทาภายในห้องนอนได้', 'True or false: exterior paint is fine for a bedroom'], [['จริง', 'True'], ['เท็จ', 'False']], [1]],
      ],
    }),
    course({
      id: 'tools', title: ['ใช้สว่านและเครื่องมือไฟฟ้าอย่างปลอดภัย', 'Using drills and power tools safely'], summary: ['เลือกดอก ตั้งชิ้นงาน และป้องกันตัวเองเมื่อใช้เครื่องมือไฟฟ้า', 'Choose bits, secure the work and protect yourself with power tools.'],
      level: 'intermediate', category: 'tools', price: 1290, rating: 4.7, ratingCount: 59, isNew: true, instructor: 'i3',
      outcomes: [['เลือกดอกสว่านตามวัสดุ', 'Pick the bit for the material'], ['ยึดชิ้นงานให้มั่นคง', 'Clamp the work securely'], ['แต่งกายและป้องกันให้ถูก', 'Dress and protect yourself properly']],
      audience: [['คนที่เพิ่งซื้อสว่านหรือเลื่อยไฟฟ้า', 'People with a new drill or saw'], ['ผู้ช่วยช่างมือใหม่', 'Apprentice tradespeople']],
      lessons: [
        [['เลือกดอกสว่าน', 'Choosing a drill bit'], 6, ['ไม้ใช้ดอกไม้ เหล็กใช้ดอกเหล็ก คอนกรีตใช้ดอกเจาะปูนกับโหมดกระแทก ผิดชนิดจะร้อนและทื่อเร็ว', 'Use wood bits for wood, metal bits for metal, and masonry bits with hammer mode for concrete. The wrong type overheats and dulls.']],
        [['ยึดชิ้นงานให้มั่นคง', 'Securing the work'], 5, ['ใช้แคลมป์ยึดชิ้นงานแทนการจับด้วยมือ ชิ้นงานหมุนตามดอกสว่านเป็นสาเหตุอุบัติเหตุบ่อย', 'Clamp the work rather than holding it. A workpiece spinning with the bit is a common cause of accidents.']],
        [['อุปกรณ์ป้องกันตัว', 'Protective gear'], 5, ['สวมแว่นตานิรภัย และที่อุดหูเมื่อเสียงดัง หลีกเลี่ยงถุงมือผ้าและแขนเสื้อหลวมใกล้ของหมุน', 'Wear safety glasses and ear protection when loud. Avoid cloth gloves and loose sleeves near spinning parts.']],
        [['ถอดปลั๊กและเก็บเครื่องมือ', 'Unplugging and storage'], 4, ['ถอดปลั๊กหรือแบตเตอรี่ก่อนเปลี่ยนดอก และเก็บเครื่องมือในที่แห้งให้พ้นมือเด็ก', 'Unplug or remove the battery before changing a bit, and store tools dry and out of children’s reach.']],
      ],
      quiz: [
        [['ควรทำอย่างไรกับชิ้นงานก่อนเจาะ', 'What should you do with the work before drilling?'], [['ยึดด้วยแคลมป์', 'Clamp it'], ['จับด้วยมือเปล่า', 'Hold it by hand'], ['วางไว้เฉยๆ', 'Leave it loose']], [0]],
        [['เลือกทุกข้อที่เป็นอุปกรณ์ป้องกันที่เหมาะ', 'Pick the suitable protective gear'], [['แว่นตานิรภัย', 'Safety glasses'], ['ที่อุดหู', 'Ear protection'], ['ถุงมือผ้าหลวม', 'Loose cloth gloves']], [0, 1]],
        [['จริงหรือเท็จ: ควรถอดแบตเตอรี่ก่อนเปลี่ยนดอก', 'True or false: remove the battery before changing a bit'], [['จริง', 'True'], ['เท็จ', 'False']], [0]],
      ],
    }),
    course({
      id: 'tile', title: ['ปูกระเบื้องห้องน้ำเบื้องต้น', 'Tiling a bathroom'], summary: ['วางแนว ปูกาว และยาแนวให้สวยและกันน้ำ', 'Set out the lines, lay adhesive and grout neatly and watertight.'],
      level: 'intermediate', category: 'build', price: 1490, rating: 4.5, ratingCount: 38, instructor: 'i1',
      outcomes: [['วางแนวกระเบื้องให้ตรง', 'Set out straight lines'], ['ปูกาวและกดกระเบื้องให้เต็มแผ่น', 'Lay adhesive with full contact'], ['ยาแนวและทำความสะอาด', 'Grout and clean']],
      audience: [['คนที่ปรับปรุงห้องน้ำเอง', 'People renovating a bathroom'], ['ช่างมือใหม่', 'New tilers']],
      lessons: [
        [['เตรียมพื้นและกันซึม', 'Preparing the floor and waterproofing'], 7, ['พื้นต้องแห้ง เรียบ และมีความลาดไปทางท่อระบายน้ำ ทากันซึมก่อนปูทุกครั้ง', 'The floor must be dry and flat with a fall toward the drain. Always apply waterproofing before tiling.']],
        [['วางแนวและตั้งศูนย์', 'Setting out'], 6, ['เริ่มจากเส้นกลางห้อง แล้ววางกระเบื้องแห้งดูก่อนเพื่อให้ชิ้นที่ตัดไม่เล็กเกินไป', 'Start from the centre line and dry-lay first so cut pieces are not too small.']],
        [['ปูกาวและกดกระเบื้อง', 'Laying adhesive'], 8, ['ใช้เกรียงหวีปาดกาวให้เป็นร่อง กดกระเบื้องแล้วบิดเล็กน้อยให้กาวเต็มหลังแผ่น ใช้ตัวคั่นรักษาช่องไฟ', 'Comb the adhesive into ridges, press and twist the tile slightly for full contact, and use spacers for even joints.']],
        [['ยาแนวและทำความสะอาด', 'Grouting and cleaning'], 6, ['รอกาวแห้งตามเวลา อัดยาแนวให้เต็มร่อง เช็ดส่วนเกินด้วยฟองน้ำชื้นก่อนยาแนวแห้ง', 'Wait for the adhesive to cure, fill the joints fully and wipe off the excess with a damp sponge before it dries.']],
      ],
      quiz: [
        [['พื้นห้องน้ำควรลาดไปทางใด', 'Which way should a bathroom floor fall?'], [['ไปทางท่อระบายน้ำ', 'Toward the drain'], ['ออกจากท่อระบายน้ำ', 'Away from the drain'], ['ไม่ต้องลาด', 'No fall']], [0]],
        [['ควรทำอะไรก่อนปูกาวจริง', 'What do you do before laying adhesive for real?'], [['วางกระเบื้องแห้งเพื่อดูแนว', 'Dry-lay the tiles to check the layout'], ['ยาแนวทันที', 'Grout straight away'], ['ตัดกระเบื้องทั้งหมด', 'Cut every tile']], [0]],
        [['จริงหรือเท็จ: ต้องทากันซึมก่อนปูกระเบื้องห้องน้ำ', 'True or false: waterproof before tiling a bathroom'], [['จริง', 'True'], ['เท็จ', 'False']], [0]],
      ],
    }),
  ],
}
