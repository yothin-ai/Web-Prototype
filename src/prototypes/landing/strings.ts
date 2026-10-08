import type { Localized } from '../../i18n'

export const s = {
  seeHow: { th: 'ดูว่าทำงานอย่างไร', en: 'See how it works' },
  signUp: { th: 'สมัคร', en: 'Sign up' },
  stepsTitle: { th: 'เริ่มต้นใน 3 ขั้นตอน', en: 'Get started in 3 steps' },
  step: { th: 'ขั้นที่', en: 'Step' },
  testimonialsTitle: { th: 'เสียงจากผู้ใช้', en: 'What users say' },
  faqTitle: { th: 'คำถามที่พบบ่อย', en: 'Frequently asked questions' },
  formIntro: { th: 'กรอกข้อมูลสั้น ๆ แล้วเริ่มใช้งานได้ทันที', en: 'Fill in a few details and start right away.' },
  name: { th: 'ชื่อ-นามสกุล', en: 'Full name' },
  email: { th: 'อีเมล', en: 'Email' },
  required: { th: 'จำเป็นต้องกรอก', en: 'Required' },
  badEmail: { th: 'รูปแบบอีเมลไม่ถูกต้อง', en: 'That email address looks invalid' },
  submit: { th: 'สมัครเลย', en: 'Create my account' },
  perks: { th: 'สิ่งที่คุณจะได้รับ', en: 'What you get' },
  thanksBadge: { th: 'ได้รับข้อมูลแล้ว', en: 'You’re in' },
  thanksTitle: { th: 'ขอบคุณที่สมัคร', en: 'Thanks for signing up' },
  thanksNote: {
    th: 'นี่เป็นเดโม ไม่มีอีเมลถูกส่งและไม่มีข้อมูลถูกเก็บนอกเบราว์เซอร์นี้',
    en: 'This is a demo: no email is sent and nothing is stored outside this browser.',
  },
  yourDetails: { th: 'ข้อมูลที่คุณกรอก', en: 'Your details' },
  backHome: { th: 'กลับหน้าแรก', en: 'Back to the home page' },
} satisfies Record<string, Localized>
