import type { Localized } from '../../i18n'
import job00 from './job-00.jpg'
import job01 from './job-01.jpg'
import job02 from './job-02.jpg'
import job03 from './job-03.jpg'
import job04 from './job-04.jpg'
import job05 from './job-05.jpg'
import job06 from './job-06.jpg'
import job07 from './job-07.jpg'
import job08 from './job-08.jpg'
import job09 from './job-09.jpg'
import job10 from './job-10.jpg'
import job11 from './job-11.jpg'
import job12 from './job-12.jpg'
import job13 from './job-13.jpg'
import job14 from './job-14.jpg'
import job15 from './job-15.jpg'
import job16 from './job-16.jpg'
import job17 from './job-17.jpg'

// Pictures for the "shop by job" tiles of the hardware shop (resized copies of the originals in src/assets/brand/Shop by job),
// looked up by the Thai job name. A job without a picture here keeps the letter frame.
const jobImages: { th: string; src: string }[] = [
  { th: 'งานซ่อมถนนคอนกรีต / ซ่อม Joint ด่วน', src: job00 },
  { th: 'รั้วบ้าน / กั้นอาณาเขต / รั้วเกษตร / รั้วเอนกประสงค์', src: job01 },
  { th: 'ติดตั้งต่อเติมหลังคา/โรงรถ วัสดุแผ่นโพลี', src: job02 },
  { th: 'งานติดตั้งถังเก็บน้ำ และปั๊มน้ำ', src: job03 },
  { th: 'ปศุสัตว์', src: job04 },
  { th: 'งานซ่อมถนนลาดยาง / ผิวจราจรเร่งด่วนถนนยางมะตอย', src: job05 },
  { th: 'งานฐานราก', src: job06 },
  { th: 'ติดตั้งฝ้า (ฝ้าฉาบเรียบ/ฝ้าหลุม)', src: job07 },
  { th: 'งานบำบัดน้ำ', src: job08 },
  { th: 'ทำไร่ ทำสวน', src: job09 },
  { th: 'งานตีเส้นจราจรด่วน / ทางม้าลาย', src: job10 },
  { th: 'งานโครงหลังคา', src: job11 },
  { th: 'กั้นห้องภายใน ผนังเบา', src: job12 },
  { th: 'ปั๊มน้ำโซลาร์เซลล์ และอุปกรณ์ติดตั้ง', src: job13 },
  { th: 'งานดูแลสวนบ้าน', src: job14 },
  { th: 'กลุ่มงานระบายน้ำ ป้องกันตลิ่ง และบดอัดด่วน', src: job15 },
  { th: 'กลุ่มงาน PPE & เซฟตี้หน้างานซ่อมฉุกเฉิน', src: job16 },
  { th: 'งานจัดสวนทางเดินรอบบ้านความยาว 6 เมตร', src: job17 },
]

export const jobImage = (label: Localized | undefined) => jobImages.find((j) => j.th === label?.th)?.src
