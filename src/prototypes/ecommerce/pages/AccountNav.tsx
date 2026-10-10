import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { AccountNav } from '../../../ui'
import { a } from '../accountStrings'
import { PROTOTYPE_ID } from '../cart'

// The shared account menu for the profile and orders pages.
export function AccountMenu({ active }: { active: 'profile' | 'orders' }) {
  const { t } = useLang()
  const { search } = useLocation()
  const base = `/${PROTOTYPE_ID}`
  return (
    <AccountNav
      label={t(a.menuLabel)}
      items={[
        { to: `${base}/account${search}`, label: t(a.menuProfile), active: active === 'profile' },
        { to: `${base}/orders${search}`, label: t(a.menuOrders), active: active === 'orders' },
      ]}
    />
  )
}
