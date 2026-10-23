import type { Localized } from '../i18n'

export const strings = {
  backToHub: { th: '← กลับ Hub', en: '← Back to Hub' },
  newTab: { th: '(เปิดในแท็บใหม่)', en: '(opens in a new tab)' },
  reset: { th: 'Reset เดโม', en: 'Reset demo' },
  resetConfirm: { th: 'ยืนยัน Reset?', en: 'Confirm reset?' },
  resetAll: { th: 'Reset ทั้งหมด', en: 'Reset all' },
  moodboard: { th: 'Moodboard', en: 'Moodboard' },
  hubTitle: { th: 'เลือก Prototype ที่ต้องการดู', en: 'Choose a Prototype to explore' },
  hubIntro: {
    th: 'ทุก Prototype กดได้ครบ Journey และข้อมูลที่กรอกเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น',
    en: 'Every Prototype can be clicked through its full Journey; what you enter stays in your own browser.',
  },
  dataset: { th: 'ชุดข้อมูล', en: 'Dataset' },
  datasetNote: {
    th: 'เมื่อเปลี่ยนชุดข้อมูล ข้อมูลที่บันทึกไว้ในทุก Prototype จะถูก Reset เพื่อไม่ให้ปนกัน',
    en: 'Switching dataset resets what is saved in every Prototype so the two never mix.',
  },
  planned: { th: 'กำลังสร้าง', en: 'In progress' },
  ready: { th: 'พร้อมใช้', en: 'Ready' },
  journey: { th: 'Journey', en: 'Journey' },
  open: { th: 'เปิดดู', en: 'Open' },
  notFound: { th: 'ไม่พบหน้านี้', en: 'Page not found' },
  placeholderNote: {
    th: 'Prototype นี้ยังไม่ถูกสร้าง นี่คือหน้าชั่วคราวเพื่อทดสอบ Shell และ Demo state',
    en: 'This Prototype is not built yet. This placeholder exists to try the Shell and Demo state.',
  },
  tryState: { th: 'ลองบันทึกข้อความ', en: 'Try saving a note' },
  tryStateHint: {
    th: 'รีเฟรชแล้วข้อความยังอยู่ กด Reset แล้วหาย',
    en: 'It survives a refresh and disappears after Reset',
  },
  languageLabel: { th: 'ภาษา', en: 'Language' },
} satisfies Record<string, Localized>
