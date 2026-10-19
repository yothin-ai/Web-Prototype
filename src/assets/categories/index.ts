import type { Localized } from '../../i18n'
import steel from './construction-steel-materials-still-life.jpg'
import electrical from './electrical-tools-and-hardware-collection.jpg'
import garden from './garden-supplies-studio-arrangement.jpg'
import doorsWood from './home-improvement-hardware-and-wood-collection.jpg'
import flooring from './interior-materials-sample-collection.jpg'
import lighting from './lighting-fixture-catalog-display.jpg'
import kitchen from './modern-kitchen-essentials-display.jpg'
import cement from './organized-construction-materials-display.jpg'
import household from './organized-home-cleaning-essentials.jpg'
import tools from './organized-workshop-tools-and-hardware-assortment.jpg'
import plumbing from './plumbing-equipment-and-water-tanks-display.jpg'
import roofing from './roofing-and-construction-materials-display.jpg'
import furniture from './scandinavian-home-furniture-vignette.jpg'
import paint from './construction-and-painting-supplies-still-life.jpg'
import appliances from './modern-home-appliance-collection.jpg'
import bathroom from './modern-minimalist-bathroom-vignette.jpg'
import outletLiving from './neutral-home-and-outdoor-living-collection.jpg'
import sports from './ultimate-sports-gear-collection.jpg'
import installation from './hvac-technician-installing-ceiling-cassette.jpg'

// Pictures of the top-level categories of the hardware shop (resized copies of the originals in src/assets/brand/Categories).
// They are looked up by the Thai category name; a category with no picture here keeps the letter frame.
const categoryImages: { th: string; src: string }[] = [
  { th: 'ปูนซีเมนต์ และงานก่อสร้าง', src: cement },
  { th: 'เหล็ก', src: steel },
  { th: 'หลังคา ผนังฝ้า และอุปกรณ์ติดตั้ง', src: roofing },
  { th: 'ปั๊มน้ำ ถังน้ำ ท่อน้ำ และระบบประปา', src: plumbing },
  { th: 'งานเกษตรและตกแต่งสวน', src: garden },
  { th: 'เครื่องมือช่าง และอุปกรณ์ฮาร์ดแวร์', src: tools },
  { th: 'ระบบไฟฟ้า', src: electrical },
  { th: 'โคมไฟและหลอดไฟ', src: lighting },
  { th: 'ประตู หน้าต่าง ไม้ และอุปกรณ์', src: doorsWood },
  { th: 'วัสดุปูพื้น และผนัง', src: flooring },
  { th: 'เฟอร์นิเจอร์ และของตกแต่งบ้าน', src: furniture },
  { th: 'ของใช้ในบ้าน อุปกรณ์จัดเก็บ อุปกรณ์ทำความสะอาด', src: household },
  { th: 'ห้องน้ำ และอุปกรณ์ห้องน้ำ', src: bathroom },
  { th: 'ห้องครัว', src: kitchen },
  { th: 'เครื่องใช้ไฟฟ้า', src: appliances },
  { th: 'สีและเคมีภัณฑ์ก่อสร้าง', src: paint },
  { th: 'กีฬา และสันทนาการ', src: sports },
  { th: 'Outlet and Living', src: outletLiving },
  { th: 'บริการติดตั้ง', src: installation },
]

export const categoryImage = (label: Localized | undefined) => categoryImages.find((c) => c.th === label?.th)?.src
