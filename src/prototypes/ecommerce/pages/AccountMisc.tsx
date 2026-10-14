import { useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { AccountSidebar, Button, Card } from '../../../ui'
import { a } from '../accountStrings'
import { useSignedIn } from '../account'
import { PROTOTYPE_ID } from '../cart'
import { AccountShell, useAccountIdentity, useAccountMenu, type AccountPageId } from './AccountShell'

const known: AccountPageId[] = ['reviews', 'club', 'coupons', 'wallet']
const titles = { reviews: a.menuReviews, club: a.menuClub, coupons: a.menuCoupons, wallet: a.menuWallet, help: a.scHelp }

// Pages that exist in the menu but are not built in this demo.
export function ComingSoon() {
  const { t } = useLang()
  const { search } = useLocation()
  const { page = '' } = useParams()
  const id = known.find((k) => k === page) ?? 'home'
  const title = titles[page as keyof typeof titles]
  return (
    <AccountShell active={id}>
      <Card>
        <h2>{title ? t(title) : t(a.soonTitle)}</h2>
        <strong>{t(a.soonTitle)}</strong>
        <span className="muted">{t(a.soonText)}</span>
        <div><Button to={`/${PROTOTYPE_ID}/account${search}`} variant="secondary" size="sm">{t(a.menuHome)}</Button></div>
      </Card>
    </AccountShell>
  )
}

// The full account menu as a page, opened from the "Menu" tab on phones.
export function AccountMenuPage() {
  const { t } = useLang()
  const { groups } = useAccountMenu('menu')
  const who = useAccountIdentity()
  const [, setSignedIn] = useSignedIn()
  const signOut = () => setSignedIn(false)
  return (
    <AccountShell active="menu">
      <div className="account-menu-only"><AccountSidebar always name={who.name} email={who.email} badge={who.tier} groups={groups} logoutLabel={t(a.logout)} onLogout={signOut} /></div>
    </AccountShell>
  )
}
