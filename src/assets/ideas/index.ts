import type { Localized } from '../../i18n'
import afterFlood from './after-flood.jpg'
import cement from './cement.jpg'
import checkValve from './check-valve.jpg'
import floodHealth from './flood-health.jpg'
import floodProtection from './flood-protection.jpg'
import fridge from './fridge.jpg'
import livingRoom from './living-room.jpg'
import memberPerks from './member-perks.jpg'
import rainGutter from './rain-gutter.jpg'

// Cover pictures of the articles of the hardware shop (resized copies of the originals in src/assets/brand/Home inspiration).
// They carry the Thai headline, so they are looked up by the Thai title and shown in Thai only.
const ideaImages: { th: string; src: string }[] = [
  { th: 'แต่งห้องนั่งเล่นให้อบอุ่นน่าอยู่', src: livingRoom },
  { th: 'เชื่อมต่อบัญชี รับสิทธิพิเศษฟรี', src: memberPerks },
  { th: 'รางน้ำฝนล้น แก้ได้ง่ายกว่าที่คิด', src: rainGutter },
  { th: 'สัญญาณเตือนสุขภาพหลังน้ำท่วม 7 ข้อ', src: floodHealth },
  { th: '10 ขั้นตอนดูแลบ้านหลังน้ำลด', src: afterFlood },
  { th: 'น้ำย้อนเข้าบ้าน ติดวาล์วกันย้อนเองได้ไหม', src: checkValve },
  { th: 'ความรู้เรื่องปูน สำหรับคนสร้างบ้านครั้งแรก', src: cement },
  { th: 'อุปกรณ์กันน้ำท่วมบ้าน 10 อย่างที่ควรมี', src: floodProtection },
  { th: '5 วิธีจัดตู้เย็น หยิบง่าย เก็บได้นาน', src: fridge },
]

export const ideaImage = (title: Localized | undefined) => ideaImages.find((i) => i.th === title?.th)?.src
