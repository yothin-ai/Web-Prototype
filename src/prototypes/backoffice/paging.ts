import { useLang } from '../../i18n'
import type { Localized } from '../../i18n'
import type { PagingLabels } from '../../ui'

const w = {
  nav: { th: 'เลือกหน้าของตาราง', en: 'Table pages' },
  prev: { th: 'ก่อนหน้า', en: 'Previous' },
  next: { th: 'ถัดไป', en: 'Next' },
  perPage: { th: 'แถวต่อหน้า', en: 'Rows per page' },
  page: { th: 'หน้า', en: 'Page' },
  shows: { th: 'แสดง', en: 'Showing' },
  of: { th: 'จาก', en: 'of' },
} satisfies Record<string, Localized>

// What a back office table needs to be split into pages: `paging(25)` gives its `pageSize` and the words of the page bar.
export function usePaging() {
  const { t } = useLang()
  const labels: PagingLabels = {
    nav: t(w.nav),
    prev: t(w.prev),
    next: t(w.next),
    perPage: t(w.perPage),
    page: (n) => `${t(w.page)} ${n}`,
    summary: (from, to, total) => `${t(w.shows)} ${from}–${to} ${t(w.of)} ${total}`,
  }
  return (size = 25) => ({ pageSize: size, paging: labels })
}
