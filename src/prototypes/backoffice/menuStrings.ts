import type { Localized } from '../../i18n'

// The words the ⋯ menus of the tables share.
export const mn = {
  manage: { th: 'จัดการ', en: 'Manage' },
  view: { th: 'ดู', en: 'View' },
  print: { th: 'พิมพ์', en: 'Print' },
} satisfies Record<string, Localized>
