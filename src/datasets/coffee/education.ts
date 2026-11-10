import { course, pair, sharedFaq, sharedReviews } from '../educationBuilder'
import type { EducationContent } from '../types'

// Sample courses for the coffee dataset. The people and numbers are invented.
export const education: EducationContent = {
  categories: [
    { id: 'brew', name: pair(['การชงกาแฟ', 'Brewing']) },
    { id: 'beans', name: pair(['เมล็ดกาแฟ', 'Beans']) },
    { id: 'milk', name: pair(['นมและเมนูเย็น', 'Milk and cold drinks']) },
  ],
  instructors: [
    { id: 'i1', name: pair(['บาริสต้าตัวอย่าง ก', 'Barista A']), role: pair(['หัวหน้าบาริสต้าร้านกาแฟ', 'Head barista']), bio: pair(['ชงกาแฟมากว่า 8 ปี สอนให้เริ่มจากพื้นฐานที่ถูกต้อง (ข้อมูลสมมติ)', 'Has brewed for over 8 years and teaches starting from sound basics (invented).']) },
    { id: 'i2', name: pair(['นักคั่วตัวอย่าง ข', 'Roaster B']), role: pair(['ผู้คั่วและคัดเมล็ด', 'Roaster and green-bean buyer']), bio: pair(['คัดเมล็ดจากหลายแหล่งปลูกและชอบอธิบายเรื่องรสชาติ (ข้อมูลสมมติ)', 'Sources beans from several origins and likes explaining flavour (invented).']) },
    { id: 'i3', name: pair(['บาริสต้าตัวอย่าง ค', 'Barista C']), role: pair(['ผู้ฝึกอบรมเมนูนมและเมนูเย็น', 'Milk and cold-drink trainer']), bio: pair(['ฝึกทีมร้านใหม่ให้ทำเมนูนมได้สม่ำเสมอ (ข้อมูลสมมติ)', 'Trains new shop teams to make milk drinks consistently (invented).']) },
  ],
  reviews: sharedReviews,
  faq: sharedFaq,
  courses: [
    course({
      id: 'pour', title: ['ชงกาแฟดริปที่บ้าน', 'Pour-over at home'], summary: ['ชงกาแฟดริปให้รสสม่ำเสมอด้วยอุปกรณ์ไม่กี่ชิ้น', 'Brew a consistent pour-over with only a few tools.'],
      level: 'beginner', category: 'brew', price: 1290, rating: 4.7, ratingCount: 184, instructor: 'i1',
      outcomes: [['เลือกอุปกรณ์ที่จำเป็น', 'Pick the tools you actually need'], ['ใช้อัตราส่วนกาแฟต่อน้ำ', 'Use a coffee-to-water ratio'], ['เทน้ำให้สม่ำเสมอ', 'Pour evenly']],
      audience: [['คนที่เพิ่งซื้อดริปเปอร์', 'People with a new dripper'], ['คนที่ชงแล้วรสไม่นิ่ง', 'Anyone whose cups taste different each time']],
      lessons: [
        [['อุปกรณ์ที่ต้องมี', 'What you need'], 6, ['ดริปเปอร์ กระดาษกรอง เครื่องชั่ง และกาต้มน้ำคอห่าน เครื่องชั่งช่วยให้ชงซ้ำได้รสเดิม', 'A dripper, filters, a scale and a gooseneck kettle. The scale lets you repeat the same cup.']],
        [['อัตราส่วนกาแฟต่อน้ำ', 'Coffee-to-water ratio'], 7, ['เริ่มที่กาแฟ 1 ส่วนต่อน้ำ 15–16 ส่วน เช่น กาแฟ 15 กรัมต่อน้ำ 240 กรัม แล้วปรับตามรสที่ชอบ', 'Start at 1 part coffee to 15–16 parts water, such as 15 g of coffee to 240 g of water, then adjust to taste.']],
        [['เทน้ำอย่างไรให้สม่ำเสมอ', 'Pouring evenly'], 8, ['เริ่มด้วยการบลูมประมาณ 30 วินาที แล้วเทเป็นวงเล็กๆ จากกลางออกขอบ อย่าให้น้ำโดนกระดาษกรองโดยตรง', 'Begin with a bloom of about 30 seconds, then pour in small circles from the centre out, keeping water off the paper.']],
        [['แก้รสเปรี้ยวหรือขม', 'Fixing sour or bitter cups'], 6, ['เปรี้ยวแหลมมักบดหยาบหรือน้ำเย็นไป ขมแห้งมักบดละเอียดหรือสกัดนานไป ปรับทีละอย่าง', 'Sharp sourness often means too coarse a grind or cool water; dry bitterness often means too fine or too long. Change one thing at a time.']],
      ],
      quiz: [
        [['อัตราส่วนเริ่มต้นของกาแฟต่อน้ำคือเท่าไร', 'What is a starting coffee-to-water ratio?'], [['1 ต่อ 15–16', '1 to 15–16'], ['1 ต่อ 2', '1 to 2'], ['1 ต่อ 100', '1 to 100']], [0]],
        [['การบลูมทำเพื่ออะไร', 'What is the bloom for?'], [['ให้ก๊าซออกจากกาแฟก่อนเทหลัก', 'To let gas escape before the main pour'], ['ทำให้น้ำเย็นลง', 'To cool the water'], ['ล้างกระดาษกรอง', 'To rinse the filter']], [0]],
        [['เลือกทุกข้อที่แก้รสเปรี้ยวแหลม', 'Pick everything that fixes sharp sourness'], [['บดให้ละเอียดขึ้น', 'Grind finer'], ['ใช้น้ำร้อนขึ้น', 'Use hotter water'], ['บดให้หยาบขึ้น', 'Grind coarser']], [0, 1]],
      ],
    }),
    course({
      id: 'beans', title: ['เข้าใจเมล็ดกาแฟ', 'Understanding beans'], summary: ['รู้จักระดับการคั่ว แหล่งปลูก และเก็บเมล็ดให้สด', 'Know roast levels, origins and how to keep beans fresh.'],
      level: 'all', category: 'beans', price: 0, rating: 4.6, ratingCount: 121, instructor: 'i2',
      outcomes: [['อ่านฉลากเมล็ดได้', 'Read a bean label'], ['เลือกระดับคั่วที่ชอบ', 'Choose a roast you like'], ['เก็บเมล็ดไม่ให้เสื่อม', 'Store beans so they stay fresh']],
      audience: [['คนที่ยืนงงหน้าชั้นเมล็ด', 'People baffled at the bean shelf'], ['คนที่อยากรู้ว่าทำไมรสต่างกัน', 'Anyone curious why coffees taste different']],
      lessons: [
        [['ระดับการคั่ว', 'Roast levels'], 5, ['คั่วอ่อนให้รสเปรี้ยวสดใส คั่วกลางสมดุล คั่วเข้มให้รสขมหนักและกลิ่นควัน', 'Light roasts taste bright and fruity, medium roasts are balanced, dark roasts are bitter and smoky.']],
        [['แหล่งปลูกและรสชาติ', 'Origin and flavour'], 7, ['ความสูง ดิน และสายพันธุ์ทำให้รสต่างกัน เมล็ดจากที่สูงมักเปรี้ยวสดใสกว่า', 'Altitude, soil and variety change the taste. Beans from higher ground are often brighter.']],
        [['เก็บเมล็ดอย่างไรให้สด', 'Keeping beans fresh'], 5, ['เก็บในถุงที่ปิดสนิทและพ้นแสง ไม่ต้องแช่ตู้เย็น และบดทีละครั้งก่อนชง', 'Keep them in a sealed bag away from light, not in the fridge, and grind just before brewing.']],
        [['อ่านฉลากเมล็ด', 'Reading the label'], 4, ['ดูวันที่คั่ว แหล่งปลูก กรรมวิธี และโน้ตรส วันที่คั่วสำคัญกว่าวันหมดอายุ', 'Look for the roast date, origin, process and tasting notes. The roast date matters more than the expiry date.']],
      ],
      quiz: [
        [['คั่วอ่อนมักให้รสแบบใด', 'What does a light roast usually taste like?'], [['เปรี้ยวสดใส', 'Bright and fruity'], ['ขมไหม้', 'Burnt and bitter'], ['จืดเหมือนน้ำ', 'Watery']], [0]],
        [['จริงหรือเท็จ: ควรแช่เมล็ดกาแฟในตู้เย็นเพื่อให้สดนานขึ้น', 'True or false: keep beans in the fridge to stay fresh longer'], [['จริง', 'True'], ['เท็จ', 'False']], [1]],
        [['เลือกทุกข้อที่ควรดูบนฉลากเมล็ด', 'Pick what to look for on a label'], [['วันที่คั่ว', 'Roast date'], ['แหล่งปลูก', 'Origin'], ['สีของถุง', 'The bag colour']], [0, 1]],
      ],
    }),
    course({
      id: 'latte', title: ['ลาเต้อาร์ตเบื้องต้น', 'Latte art basics'], summary: ['ตีฟองนมให้เนียนและเทลายหัวใจได้', 'Steam silky milk and pour a heart.'],
      level: 'beginner', category: 'milk', price: 1590, rating: 4.8, ratingCount: 203, instructor: 'i3',
      outcomes: [['ตีฟองนมให้เนียน', 'Steam silky microfoam'], ['เทลายหัวใจ', 'Pour a heart'], ['แก้ปัญหาที่พบบ่อย', 'Fix common problems']],
      audience: [['คนที่ฝึกเครื่องเอสเปรสโซ่อยู่', 'People learning an espresso machine'], ['เจ้าของร้านเล็กที่อยากเพิ่มเมนู', 'Small shop owners adding drinks']],
      lessons: [
        [['ตีฟองนม', 'Steaming milk'], 8, ['ให้หัวตีฟองอยู่ใต้ผิวนมเล็กน้อยเพื่อดึงอากาศช่วงแรก แล้วจมลึกขึ้นให้นมหมุนจนเนียน', 'Keep the wand just under the surface at first to add air, then sink it deeper so the milk spins until silky.']],
        [['เทลายหัวใจ', 'Pouring a heart'], 9, ['เทจากที่สูงให้นมจมลงใต้เครมา แล้วลดถ้วยใกล้ผิวเพื่อให้ฟองลอยเป็นวง จบด้วยการลากผ่านกลาง', 'Pour from height so the milk sinks under the crema, then lower close to the surface so a circle forms, and draw through the middle.']],
        [['แก้ปัญหาที่พบบ่อย', 'Fixing common problems'], 6, ['ฟองใหญ่เกินไปแปลว่าดึงอากาศมาก ลายไม่ชัดมักเทช้าเกินไป ลองทำซ้ำโดยเปลี่ยนทีละอย่าง', 'Big bubbles mean too much air, and a blurry pattern often means pouring too slowly. Repeat, changing one thing at a time.']],
        [['ล้างและดูแลหัวตีฟอง', 'Cleaning the steam wand'], 4, ['เช็ดหัวตีฟองและปล่อยไอน้ำทันทีหลังใช้ นมที่แห้งติดจะอุดรูและทำให้ฟองไม่เนียน', 'Wipe the wand and purge steam straight after use. Dried milk blocks the holes and ruins the foam.']],
      ],
      quiz: [
        [['ช่วงแรกของการตีฟองควรวางหัวตีฟองที่ไหน', 'Where does the wand sit at the start of steaming?'], [['ใต้ผิวนมเล็กน้อย', 'Just under the milk surface'], ['ก้นเหยือก', 'At the bottom of the jug'], ['นอกเหยือก', 'Outside the jug']], [0]],
        [['ฟองนมใหญ่เกินไปมักเกิดจากอะไร', 'What usually causes oversized bubbles?'], [['ดึงอากาศเข้ามากเกินไป', 'Letting in too much air'], ['ใช้ถ้วยเล็กเกินไป', 'A cup that is too small'], ['กาแฟร้อนเกินไป', 'Coffee that is too hot']], [0]],
        [['จริงหรือเท็จ: ควรเช็ดหัวตีฟองทันทีหลังใช้', 'True or false: wipe the wand straight after use'], [['จริง', 'True'], ['เท็จ', 'False']], [0]],
      ],
    }),
    course({
      id: 'espresso', title: ['เอสเปรสโซ่ให้นิ่งทุกช็อต', 'Consistent espresso'], summary: ['บด อัด และสกัดให้ได้ช็อตที่รสซ้ำกันได้', 'Grind, tamp and extract shots you can repeat.'],
      level: 'intermediate', category: 'brew', price: 1890, rating: 4.7, ratingCount: 88, isNew: true, instructor: 'i1',
      outcomes: [['ตั้งขนาดบดจากเวลาสกัด', 'Set the grind from extraction time'], ['อัดผงกาแฟให้เสมอกัน', 'Tamp evenly'], ['อ่านช็อตว่าสกัดต่ำหรือเกิน', 'Read a shot for under or over-extraction']],
      audience: [['คนที่มีเครื่องเอสเปรสโซ่แล้ว', 'People who own an espresso machine'], ['พนักงานร้านใหม่', 'New café staff']],
      lessons: [
        [['สูตรตั้งต้น', 'A starting recipe'], 6, ['เริ่มที่กาแฟ 18 กรัมได้เอสเปรสโซ่ราว 36 กรัมใน 25–30 วินาที แล้วปรับจากรสที่ได้', 'Start with 18 g of coffee for about 36 g of espresso in 25–30 seconds, then adjust to taste.']],
        [['การบดและเวลา', 'Grind and time'], 7, ['ช็อตไหลเร็วเกินไปให้บดละเอียดขึ้น ไหลช้าจนหยดให้บดหยาบขึ้น ปรับทีละนิด', 'If the shot runs too fast grind finer; if it drips too slowly grind coarser. Adjust a little at a time.']],
        [['การอัดผงกาแฟ', 'Tamping'], 5, ['กดให้เรียบเสมอกันด้วยแรงสม่ำเสมอ ผงที่เอียงทำให้น้ำไหลทางเดียว', 'Press level with steady force. A tilted bed lets water run down one side.']],
        [['อ่านช็อตจากรสและสี', 'Reading the shot'], 6, ['เปรี้ยวบางมักสกัดน้อย ขมแห้งมักสกัดมาก เครมาสีน้ำตาลทองคือสัญญาณที่ดี', 'Thin sourness suggests under-extraction, dry bitterness over-extraction, and golden-brown crema is a good sign.']],
      ],
      quiz: [
        [['ช็อตไหลเร็วเกินไปควรทำอย่างไร', 'What do you do when a shot runs too fast?'], [['บดให้ละเอียดขึ้น', 'Grind finer'], ['บดหยาบขึ้น', 'Grind coarser'], ['เพิ่มน้ำ', 'Add more water']], [0]],
        [['จริงหรือเท็จ: ควรปรับตัวแปรหลายอย่างพร้อมกัน', 'True or false: change several variables at once'], [['จริง', 'True'], ['เท็จ', 'False']], [1]],
        [['เลือกทุกข้อที่บ่งบอกว่าสกัดน้อยไป', 'Pick the signs of under-extraction'], [['รสเปรี้ยวบาง', 'Thin sourness'], ['รสขมแห้งมาก', 'Very dry bitterness'], ['ช็อตไหลเร็ว', 'A fast shot']], [0, 2]],
      ],
    }),
    course({
      id: 'cold', title: ['กาแฟเย็นและโคลด์บรูว์', 'Iced coffee and cold brew'], summary: ['ทำกาแฟเย็นที่ไม่จืดและโคลด์บรูว์แช่เองที่บ้าน', 'Make iced coffee that is not watery, and cold brew at home.'],
      level: 'beginner', category: 'milk', price: 0, rating: 4.5, ratingCount: 70, isNew: true, instructor: 'i3',
      outcomes: [['ชงดริปร้อนลงน้ำแข็ง', 'Brew hot over ice'], ['แช่โคลด์บรูว์ให้ได้รสนุ่ม', 'Steep a smooth cold brew'], ['เก็บและเสิร์ฟอย่างปลอดภัย', 'Store and serve it safely']],
      audience: [['คนที่ชอบกาแฟเย็น', 'Iced coffee fans'], ['ร้านที่อยากทำเมนูเตรียมล่วงหน้า', 'Shops preparing drinks ahead']],
      lessons: [
        [['ดริปร้อนลงน้ำแข็ง', 'Hot brew over ice'], 6, ['ลดน้ำชงลงราวหนึ่งในสามแล้วเทลงบนน้ำแข็ง น้ำแข็งละลายจะเติมน้ำให้พอดีโดยไม่จืด', 'Cut the brew water by about a third and pour onto ice; the melting ice supplies the rest without turning weak.']],
        [['โคลด์บรูว์แช่เย็น', 'Steeping cold brew'], 7, ['บดหยาบ แช่กาแฟ 1 ส่วนต่อน้ำ 8 ส่วนในตู้เย็น 12–16 ชั่วโมง แล้วกรอง', 'Grind coarse, steep 1 part coffee to 8 parts water in the fridge for 12–16 hours, then filter.']],
        [['เก็บและเสิร์ฟ', 'Storing and serving'], 4, ['เก็บในขวดปิดสนิทในตู้เย็นไม่เกิน 7 วัน เสิร์ฟกับน้ำหรือนมตามชอบ', 'Keep it in a sealed bottle in the fridge for up to 7 days, and serve with water or milk.']],
        [['เมนูต่อยอด', 'Drinks to build on it'], 5, ['ลองโคลด์บรูว์ผสมนม โทนิก หรือน้ำผลไม้ แล้วจดสูตรที่ชอบไว้', 'Try cold brew with milk, tonic or juice and write down the recipes you like.']],
      ],
      quiz: [
        [['โคลด์บรูว์ควรบดแบบใด', 'How should cold brew coffee be ground?'], [['หยาบ', 'Coarse'], ['ละเอียดมาก', 'Very fine'], ['ไม่ต้องบด', 'Not ground']], [0]],
        [['เก็บโคลด์บรูว์ในตู้เย็นได้นานสุดโดยประมาณเท่าไร', 'How long can cold brew keep in the fridge?'], [['ประมาณ 7 วัน', 'About 7 days'], ['ประมาณ 3 เดือน', 'About 3 months'], ['ไม่ได้เลย', 'Not at all']], [0]],
        [['จริงหรือเท็จ: ดริปร้อนลงน้ำแข็งควรลดน้ำชงลง', 'True or false: hot-over-ice brewing uses less brew water'], [['จริง', 'True'], ['เท็จ', 'False']], [0]],
      ],
    }),
    course({
      id: 'taste', title: ['ชิมกาแฟให้เป็น', 'Tasting coffee'], summary: ['ฝึกจมูกและลิ้นให้บอกกลิ่นรสที่ได้ด้วยคำที่ใช้ร่วมกันได้', 'Train your nose and tongue to describe a coffee in shared words.'],
      level: 'all', category: 'beans', price: 790, rating: 4.4, ratingCount: 41, instructor: 'i2',
      outcomes: [['ชิมแบบคัปปิงเบื้องต้น', 'Run a simple cupping'], ['อธิบายกลิ่นและรส', 'Describe aroma and taste'], ['จดบันทึกการชิม', 'Keep tasting notes']],
      audience: [['คนอยากพูดเรื่องรสกาแฟให้ตรงกัน', 'People who want to talk about taste'], ['ทีมร้านที่คัดเมล็ดเอง', 'Shop teams choosing beans']],
      lessons: [
        [['เตรียมถ้วยชิม', 'Setting up a cupping'], 6, ['ใช้กาแฟบดหยาบ 10 กรัมต่อน้ำ 165 กรัมต่อถ้วย รอสี่นาทีแล้วทำลายเปลือกฟองก่อนชิม', 'Use 10 g of coarse coffee to 165 g of water per cup, wait four minutes and break the crust before tasting.']],
        [['กลิ่นและรสพื้นฐาน', 'Aroma and basic tastes'], 7, ['แยกกลิ่นก่อนดื่มและแยกรสเปรี้ยว หวาน ขม เค็ม ลองบอกด้วยคำง่ายๆ ก่อนใช้คำเฉพาะ', 'Separate the aroma from the taste, and sour, sweet, bitter and salty from each other. Use simple words before technical ones.']],
        [['บอดี้และความรู้สึกในปาก', 'Body and mouthfeel'], 5, ['บอดี้คือความหนักเบาของกาแฟในปาก ลองเทียบกับน้ำเปล่า นม และน้ำผลไม้', 'Body is how heavy the coffee feels. Compare it with water, milk and juice.']],
        [['จดบันทึกการชิม', 'Keeping notes'], 4, ['จดชื่อเมล็ด วันที่ และสามคำที่นึกได้ทันที ทบทวนภายหลังจะเห็นรสที่ชอบ', 'Write the bean, the date and the first three words that come to mind. Looking back shows the flavours you like.']],
      ],
      quiz: [
        [['ควรรอกี่นาทีก่อนทำลายเปลือกฟองในการชิม', 'How long before breaking the crust when cupping?'], [['ประมาณสี่นาที', 'About four minutes'], ['ทันที', 'Straight away'], ['หนึ่งชั่วโมง', 'One hour']], [0]],
        [['บอดี้หมายถึงอะไร', 'What does body mean?'], [['ความหนักเบาในปาก', 'How heavy it feels in the mouth'], ['สีของกาแฟ', 'The colour'], ['ราคาของเมล็ด', 'The bean price']], [0]],
        [['เลือกทุกข้อที่ควรจดในบันทึกชิม', 'Pick what to write in a tasting note'], [['ชื่อเมล็ด', 'The bean name'], ['วันที่ชิม', 'The date'], ['สีเสื้อผู้ชิม', 'What the taster wore']], [0, 1]],
      ],
    }),
  ],
}
