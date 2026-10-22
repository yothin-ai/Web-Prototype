import { Landing } from './Landing'
import type { PrototypeManifest } from '../types'

const manifest: PrototypeManifest = {
  id: 'landing',
  order: 2,
  title: { th: 'Landing Page', en: 'Landing Page' },
  summary: { th: 'หน้าแนะนำบริษัท โซลูชัน หลักสูตร และบทความ ที่พาผู้ชมไปถึงการกรอกฟอร์ม', en: 'A company landing page with solutions, courses and articles that leads the visitor to a form' },
  journey: [
    { th: 'อ่านเนื้อหาและเลื่อนดูโซลูชัน', en: 'Read the page and browse the solutions' },
    { th: 'กดปุ่มสนใจ', en: 'Click an interest button' },
    { th: 'กรอกฟอร์ม', en: 'Fill in the form' },
    { th: 'หน้าขอบคุณ', en: 'Thank-you page' },
  ],
  status: 'ready',
  Component: Landing,
}

export default manifest
