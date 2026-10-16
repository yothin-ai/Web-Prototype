import type { Localized } from '../../i18n'
import type { IconName } from '../../ui'
import { useDemoState } from '../../state/demoState'
import { PROTOTYPE_ID } from './cart'

const p = (th: string, en: string): Localized => ({ th, en })

export type ServiceType = { id: string; icon: IconName; name: Localized; desc: Localized; from: number }
export type Portfolio = { id: string; type: string; title: Localized; branch: Localized; place: Localized; did: Localized }

// Sample installation services. The text is written for the demo; the prices are made up.
export const serviceTypes: ServiceType[] = [
  { id: 'disinfect', icon: 'shield', name: p('ฉีดพ่นฆ่าเชื้อ', 'Disinfection spraying'), desc: p('ฉีดพ่นน้ำยาฆ่าเชื้อทั้งบ้านและรถยนต์ ช่วยลดเชื้อโรคและแบคทีเรีย', 'Spraying disinfectant through a home or a car to cut germs and bacteria'), from: 1200 },
  { id: 'aircon', icon: 'home', name: p('เครื่องปรับอากาศ', 'Air conditioners'), desc: p('ติดตั้ง ล้าง และรื้อถอนแอร์ ทั้งแบบติดผนัง ตั้งพื้น และฝังฝ้า', 'Installing, cleaning and removing air conditioners: wall, floor and ceiling types'), from: 2500 },
  { id: 'heater', icon: 'idea', name: p('เครื่องทำน้ำอุ่น-น้ำร้อน', 'Water heaters'), desc: p('ติดตั้งเครื่องทำน้ำอุ่นและน้ำร้อน พร้อมตรวจระบบไฟให้ปลอดภัย', 'Installing water heaters with a check of the wiring for safety'), from: 900 },
  { id: 'pump', icon: 'wrench', name: p('ปั๊มน้ำ-ถังน้ำ', 'Pumps and tanks'), desc: p('ติดตั้งปั๊มน้ำอัตโนมัติและถังน้ำ รวมถึงล้างปั๊มและถัง', 'Installing automatic pumps and water tanks, and cleaning them'), from: 1500 },
  { id: 'filter', icon: 'check', name: p('เครื่องกรองน้ำ', 'Water filters'), desc: p('ติดตั้งเครื่องกรองน้ำและเปลี่ยนไส้กรองตามรอบ', 'Installing water filters and changing cartridges on schedule'), from: 700 },
  { id: 'kitchen', icon: 'store', name: p('เครื่องครัว', 'Kitchen appliances'), desc: p('ติดตั้งเตา เครื่องดูดควัน และอ่างล้างจาน', 'Installing hobs, hoods and sinks'), from: 1000 },
  { id: 'sanitary', icon: 'package', name: p('สุขภัณฑ์', 'Sanitary ware'), desc: p('ติดตั้งโถสุขภัณฑ์ อ่างล้างหน้า และฝักบัว', 'Installing toilets, basins and showers'), from: 800 },
  { id: 'cctv', icon: 'view', name: p('กล้องวงจรปิด', 'CCTV'), desc: p('ติดตั้งกล้องวงจรปิดพร้อมตั้งค่าดูผ่านมือถือ', 'Installing CCTV cameras and setting them up to watch on a phone'), from: 3500 },
  { id: 'door', icon: 'lock', name: p('ประตู-หน้าต่าง', 'Doors and windows'), desc: p('ติดตั้งประตู หน้าต่าง และอุปกรณ์ล็อก', 'Installing doors, windows and locks'), from: 1800 },
]
export const serviceById = (id: string | null | undefined) => serviceTypes.find((x) => x.id === id)

const place = (th: string, en: string) => ({ branch: p(`สาขาตัวอย่าง ${th}`, `Sample branch ${en}`), place: p(`จ.${th}`, en) })
export const portfolios: Portfolio[] = [
  { id: 'pf1', type: 'heater', title: p('ติดตั้งเครื่องทำน้ำอุ่น', 'Water heater installation'), ...place('นครปฐม', 'Nakhon Pathom'), did: p('ติดตั้งเครื่องทำน้ำอุ่นในห้องน้ำชั้นสอง เดินท่อและตรวจระบบกันไฟรั่วให้เรียบร้อยภายในครึ่งวัน', 'Fitted a water heater in a first-floor bathroom, ran the pipes and tested the earth-leakage safety, all in half a day.') },
  { id: 'pf2', type: 'pump', title: p('ติดตั้งปั๊มน้ำ/ถังน้ำ', 'Pump and tank installation'), ...place('ขอนแก่น', 'Khon Kaen'), did: p('เปลี่ยนปั๊มน้ำอัตโนมัติและติดตั้งถังน้ำใหม่ ตั้งแรงดันให้เหมาะกับบ้านสองชั้น', 'Replaced the automatic pump and fitted a new tank, setting the pressure for a two-storey house.') },
  { id: 'pf3', type: 'aircon', title: p('ติดตั้งเครื่องปรับอากาศ', 'Air conditioner installation'), ...place('เชียงใหม่', 'Chiang Mai'), did: p('ติดตั้งแอร์ติดผนัง 2 เครื่องในห้องนอน พร้อมเดินท่อน้ำทิ้งซ่อนใต้ฝ้า', 'Installed two wall units in bedrooms with the drain pipes hidden above the ceiling.') },
  { id: 'pf4', type: 'aircon', title: p('ล้างและตรวจเช็กแอร์', 'Air conditioner cleaning and check'), ...place('นครราชสีมา', 'Nakhon Ratchasima'), did: p('ล้างแอร์ 4 เครื่อง ตรวจน้ำยาและเปลี่ยนแผ่นกรองให้ทั้งหมด', 'Cleaned four units, checked the refrigerant and changed all the filters.') },
  { id: 'pf5', type: 'disinfect', title: p('ฉีดพ่นฆ่าเชื้อทั้งบ้าน', 'Whole-house disinfection'), ...place('ภูเก็ต', 'Phuket'), did: p('ฉีดพ่นฆ่าเชื้อบ้านสองชั้นและรถยนต์หนึ่งคัน ใช้เวลาประมาณสองชั่วโมง', 'Sprayed a two-storey house and one car in about two hours.') },
  { id: 'pf6', type: 'cctv', title: p('ติดตั้งกล้องวงจรปิด 4 จุด', 'Four-camera CCTV setup'), ...place('สงขลา', 'Songkhla'), did: p('ติดตั้งกล้อง 4 ตัวรอบบ้าน เชื่อมต่อเครื่องบันทึกและตั้งค่าดูผ่านมือถือ', 'Mounted four cameras around the house, linked the recorder and set up phone viewing.') },
  { id: 'pf7', type: 'sanitary', title: p('เปลี่ยนสุขภัณฑ์ห้องน้ำ', 'Bathroom fittings change'), ...place('กรุงเทพฯ', 'Bangkok'), did: p('เปลี่ยนโถสุขภัณฑ์ อ่างล้างหน้า และฝักบัว ทดสอบการรั่วซึมก่อนส่งมอบ', 'Swapped the toilet, basin and shower and tested for leaks before handover.') },
  { id: 'pf8', type: 'door', title: p('ติดตั้งประตูและหน้าต่างอะลูมิเนียม', 'Aluminium doors and windows'), ...place('ระยอง', 'Rayong'), did: p('ติดตั้งประตูบานเลื่อนและหน้าต่าง 3 บาน พร้อมอุดซีลกันน้ำรั่ว', 'Fitted a sliding door and three windows with waterproof sealing.') },
]

export const slots = ['morning', 'afternoon', 'evening'] as const
export type Slot = (typeof slots)[number]

export type BookingStatus = 'pending' | 'confirmed' | 'done' | 'cancelled'
export type Booking = { id: string; serviceId: string; date: string; slot: Slot; address: string | Localized; name: string | Localized; phone: string; note: string | Localized; status: BookingStatus; at: string }

const addr = p('99 ถนนตัวอย่าง ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดตัวอย่าง 00000', '99 Sample Road, Sample Subdistrict, Sample District, Sample Province 00000')
const who = p('ผู้ใช้ตัวอย่าง', 'Sample shopper')
const seed: Booking[] = [
  { id: 'SV-482913', serviceId: 'aircon', date: '2026-10-22', slot: 'morning', address: addr, name: who, phone: '0800000000', note: p('ติดตั้งแอร์ห้องนอน 2 เครื่อง', 'Install two bedroom air conditioners'), status: 'confirmed', at: '2026-10-12T10:15:00' },
  { id: 'SV-310276', serviceId: 'heater', date: '2026-10-02', slot: 'afternoon', address: addr, name: who, phone: '0800000000', note: p('ติดตั้งเครื่องทำน้ำอุ่นห้องน้ำชั้นล่าง', 'Install a water heater in the ground-floor bathroom'), status: 'done', at: '2026-09-28T09:00:00' },
]

export function useBookings() {
  const [list, setList] = useDemoState<Booking[]>(PROTOTYPE_ID, 'bookings', seed)
  return {
    list: [...list].sort((a, b) => b.at.localeCompare(a.at)),
    add: (b: Omit<Booking, 'id' | 'at' | 'status'>) => {
      const booking: Booking = { ...b, id: `SV-${Math.floor(Math.random() * 900000) + 100000}`, at: new Date().toISOString(), status: 'pending' }
      setList([booking, ...list])
      return booking
    },
    cancel: (id: string) => setList(list.map((x) => (x.id === id && x.status === 'pending' ? { ...x, status: 'cancelled' } : x))),
  }
}
