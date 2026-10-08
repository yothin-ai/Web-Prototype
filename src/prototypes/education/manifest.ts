import { Education } from './Education'
import type { PrototypeManifest } from '../types'

const manifest: PrototypeManifest = {
  id: 'education',
  order: 3,
  title: { th: 'Educational', en: 'Educational' },
  summary: { th: 'เว็บเรียนออนไลน์ ตั้งแต่สมัครคอร์สจนดูความคืบหน้า', en: 'Online learning from enrolling to tracking progress' },
  journey: [
    { th: 'ดูรายการคอร์ส', en: 'Browse courses' },
    { th: 'สมัคร', en: 'Enroll' },
    { th: 'เรียนบทเรียน', en: 'Take a lesson' },
    { th: 'ทำแบบทดสอบ', en: 'Take a quiz' },
    { th: 'ดูความคืบหน้า', en: 'View progress' },
  ],
  status: 'ready',
  Component: Education,
}

export default manifest
