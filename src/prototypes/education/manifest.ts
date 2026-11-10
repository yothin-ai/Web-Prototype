import { Education } from './Education'
import type { PrototypeManifest } from '../types'

const manifest: PrototypeManifest = {
  id: 'education',
  order: 3,
  title: { th: 'Educational', en: 'Educational' },
  summary: { th: 'เว็บเรียนออนไลน์ ตั้งแต่เลือกคอร์สจนรับใบประกาศนียบัตรและรีวิว', en: 'Online learning from choosing a course to a certificate and a review' },
  journey: [
    { th: 'ดูรายการคอร์ส', en: 'Browse courses' },
    { th: 'สมัคร', en: 'Enroll' },
    { th: 'เรียนบทเรียน', en: 'Take a lesson' },
    { th: 'ทำแบบทดสอบ', en: 'Take a quiz' },
    { th: 'รับใบประกาศนียบัตร', en: 'Get a certificate' },
    { th: 'ดูความคืบหน้าและรีวิว', en: 'View progress and review' },
  ],
  status: 'ready',
  Component: Education,
}

export default manifest
