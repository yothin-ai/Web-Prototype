import type { Localized } from './index'
import { useLang } from './index'

const w = {
  placeholder: { th: 'พิมพ์เพื่อค้นหา', en: 'Type to search' },
  empty: { th: 'ไม่พบตัวเลือกที่ตรงกัน', en: 'No option matches' },
  found: { th: 'พบ', en: 'Found' },
  items: { th: 'ตัวเลือก', en: 'options' },
} satisfies Record<string, Localized>

// The words a SearchSelect needs, in the chosen language: spread them onto it.
export function useSearchLabels() {
  const { t } = useLang()
  return {
    searchPlaceholder: t(w.placeholder),
    emptyText: t(w.empty),
    countText: (count: number) => `${t(w.found)} ${count} ${t(w.items)}`,
  }
}
