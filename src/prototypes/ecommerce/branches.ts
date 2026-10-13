import type { Localized } from '../../i18n'
import { useDemoState } from '../../state/demoState'
import { PROTOTYPE_ID } from './cart'

export type Branch = { id: string; name: Localized; province: Localized; address: Localized; hours: Localized }

// Sample stores for the branch menu and the store finder. Addresses are made up on purpose.
const hours: Localized = { th: 'เปิดทุกวัน 08:00 - 20:00 น.', en: 'Open daily 08:00 - 20:00' }

export const branches: Branch[] = [
  { id: 'b1', name: { th: 'สาขาตัวอย่าง ปทุมธานี', en: 'Sample branch, Pathum Thani' }, province: { th: 'ปทุมธานี', en: 'Pathum Thani' }, address: { th: '000 หมู่ 0 ถนนตัวอย่าง ต.ตัวอย่าง อ.ตัวอย่าง', en: '000 Moo 0, Example Road, Example District' }, hours },
  { id: 'b2', name: { th: 'สาขาตัวอย่าง กรุงเทพฯ', en: 'Sample branch, Bangkok' }, province: { th: 'กรุงเทพมหานคร', en: 'Bangkok' }, address: { th: '111 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง', en: '111 Example Road, Example Sub-district' }, hours },
  { id: 'b3', name: { th: 'สาขาตัวอย่าง เชียงใหม่', en: 'Sample branch, Chiang Mai' }, province: { th: 'เชียงใหม่', en: 'Chiang Mai' }, address: { th: '222 ถนนตัวอย่าง ต.ตัวอย่าง อ.เมือง', en: '222 Example Road, Mueang District' }, hours },
  { id: 'b4', name: { th: 'สาขาตัวอย่าง ขอนแก่น', en: 'Sample branch, Khon Kaen' }, province: { th: 'ขอนแก่น', en: 'Khon Kaen' }, address: { th: '333 ถนนตัวอย่าง ต.ตัวอย่าง อ.เมือง', en: '333 Example Road, Mueang District' }, hours },
  { id: 'b5', name: { th: 'สาขาตัวอย่าง นครราชสีมา', en: 'Sample branch, Nakhon Ratchasima' }, province: { th: 'นครราชสีมา', en: 'Nakhon Ratchasima' }, address: { th: '444 ถนนตัวอย่าง ต.ตัวอย่าง อ.เมือง', en: '444 Example Road, Mueang District' }, hours },
  { id: 'b6', name: { th: 'สาขาตัวอย่าง ภูเก็ต', en: 'Sample branch, Phuket' }, province: { th: 'ภูเก็ต', en: 'Phuket' }, address: { th: '555 ถนนตัวอย่าง ต.ตัวอย่าง อ.เมือง', en: '555 Example Road, Mueang District' }, hours },
]

export const branchById = (id: string) => branches.find((b) => b.id === id) ?? branches[0]

// The store the shopper picked in the menu; the first sample store until they choose.
export const useBranch = () => useDemoState<string>(PROTOTYPE_ID, 'branch', 'b1')
