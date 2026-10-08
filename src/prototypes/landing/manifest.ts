import { Landing } from './Landing'
import type { PrototypeManifest } from '../types'

const manifest: PrototypeManifest = {
  id: 'landing',
  order: 2,
  title: { th: 'Landing Page', en: 'Landing Page' },
  summary: { th: 'หน้าแนะนำที่พาผู้ชมไปถึงการกรอกฟอร์ม', en: 'A landing page that leads the visitor to a form submission' },
  journey: [
    { th: 'อ่านเนื้อหา', en: 'Read the content' },
    { th: 'กด CTA', en: 'Click the call to action' },
    { th: 'กรอกฟอร์ม', en: 'Fill in the form' },
    { th: 'หน้าขอบคุณ', en: 'Thank-you page' },
  ],
  status: 'ready',
  Component: Landing,
}

export default manifest
