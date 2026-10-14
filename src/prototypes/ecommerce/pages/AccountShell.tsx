import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { AccountSidebar, BottomTabBar, Col, Grid, type IconName } from '../../../ui'
import { a } from '../accountStrings'
import { useProfile, useSignedIn } from '../account'
import { PROTOTYPE_ID } from '../cart'

export type AccountPageId = 'home' | 'profile' | 'addresses' | 'orders' | 'reviews' | 'club' | 'coupons' | 'wallet' | 'menu'

const menuIcons: Record<AccountPageId, IconName> = { home: 'home', profile: 'user', addresses: 'pin', orders: 'orders', reviews: 'star', club: 'crown', coupons: 'ticket', wallet: 'wallet', menu: 'menu' }

// Builds the account menu once so the side menu, the tab bar and the menu page agree.
export function useAccountMenu(active: AccountPageId) {
  const { t } = useLang()
  const { search } = useLocation()
  const base = `/${PROTOTYPE_ID}`
  const item = (id: AccountPageId, to: string, label: string) => ({ to: `${base}${to}${search}`, label, active: active === id, icon: menuIcons[id] })
  const groups = [
    { title: t(a.groupOverview), items: [item('home', '/account', t(a.menuHome))] },
    { title: t(a.groupAccount), items: [item('profile', '/account/profile', t(a.menuProfile)), item('addresses', '/account/addresses', t(a.menuAddresses))] },
    { title: t(a.groupOrders), items: [item('orders', '/orders', t(a.menuOrderList)), item('reviews', '/account/reviews', t(a.menuReviews))] },
    { title: t(a.groupMember), items: [item('club', '/account/club', t(a.menuClub)), item('coupons', '/account/coupons', t(a.menuCoupons)), item('wallet', '/account/wallet', t(a.menuWallet))] },
  ]
  const tabs = [
    item('home', '/account', t(a.menuHome)),
    item('orders', '/orders', t(a.tabOrders)),
    item('coupons', '/account/coupons', t(a.tabCoupons)),
    item('club', '/account/club', t(a.tabClub)),
    item('menu', '/account/menu', t(a.tabMenu)),
  ]
  return { groups, tabs }
}

export function useAccountIdentity() {
  const { t } = useLang()
  const { dataset } = useDataset()
  const { account } = dataset.ecommerce
  const [profile] = useProfile()
  return { name: profile.name || t(account.name), email: profile.email || account.email, tier: t(account.tier) }
}

// The shared frame of every account page: side menu on wide screens, bottom tabs on narrow ones.
export function AccountShell({ active, children }: { active: AccountPageId; children: ReactNode }) {
  const { t } = useLang()
  const { groups, tabs } = useAccountMenu(active)
  const who = useAccountIdentity()
  const [signedIn, setSignedIn] = useSignedIn()
  const { pathname, search } = useLocation()
  const base = `/${PROTOTYPE_ID}`
  const signOut = () => setSignedIn(false)
  // The account pages need a signed-in shopper; otherwise sign in first and come back here.
  if (!signedIn) return <Navigate to={`${base}/login?next=${encodeURIComponent(pathname + search)}`} replace />
  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 3 }} className="account-aside">
        <AccountSidebar name={who.name} email={who.email} badge={who.tier} groups={groups} logoutLabel={t(a.logout)} onLogout={signOut} />
      </Col>
      <Col span={{ base: 4, sm: 8, md: 9 }}>
        <div className="stack account-page">
          {children}
        </div>
      </Col>
      <BottomTabBar label={t(a.menuLabel)} items={tabs} />
    </Grid>
  )
}
