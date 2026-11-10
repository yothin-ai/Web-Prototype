import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useLang } from '../../i18n'
import { Badge, Button, Col, Grid, Logo, SideNav, SideNavLayout } from '../../ui'
import { PROTOTYPE_ID, useCounts, useSearch } from './data'
import { Overview } from './pages/Overview'
import { OrderDetail } from './pages/OrderDetail'
import { Orders } from './pages/Orders'
import { Receive } from './pages/Receive'
import { StockDetail } from './pages/StockDetail'
import { StockList } from './pages/StockList'
import { b } from './strings'

// The shop's back office: a dark menu at the left, and beside it a bar with the alerts and the way to the shop, then the page.
export function BackOffice() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const counts = useCounts()
  const here = pathname.replace(base, '') || '/'
  const item = (to: string, label: string, icon: 'home' | 'orders' | 'package' | 'plus', badge?: number) => ({
    to: `${base}${to}${search}`,
    label,
    icon,
    active: to === '/' ? here === '/' : here.startsWith(to),
    badge: badge ? String(badge) : undefined,
  })
  return (
    <SideNavLayout
      fill
      menu={
        <SideNav
          label={t(b.menu)}
          menuLabel={t(b.menuButton)}
          brand={<Logo name={t(b.brand)} tone="on-dark" />}
          groups={[
            { title: t(b.groupOverview), items: [item('/', t(b.navOverview), 'home')] },
            { title: t(b.groupOrders), items: [item('/orders', t(b.navOrders), 'orders', counts.toPack)] },
            { title: t(b.groupStock), items: [item('/stock', t(b.navStock), 'package', counts.alerts), item('/receive', t(b.navReceive), 'plus')] },
          ]}
        />
      }
    >
      <Grid>
        <Col>
          <div className="stack">
        <div className="row">
          <span className="muted row__grow">{t(b.owner)}</span>
          <Button to={`${base}/stock?level=alert${search ? `&${search.slice(1)}` : ''}`} variant="ghost" size="sm" icon="bell">
            <span className="visually-hidden">{t(b.alerts)}</span>
            {counts.alerts > 0 && <Badge tone="danger">{counts.alerts}</Badge>}
          </Button>
          <Button to="/ecommerce" variant="secondary" size="sm" newTab newTabLabel={t(b.newTab)}>{t(b.toShop)}</Button>
        </div>
        <Routes>
          <Route index element={<Overview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetail />} />
          <Route path="stock" element={<StockList />} />
          <Route path="stock/:productId" element={<StockDetail />} />
          <Route path="receive" element={<Receive />} />
          <Route path="*" element={<Navigate to={`${base}${search}`} replace />} />
        </Routes>
          </div>
        </Col>
      </Grid>
    </SideNavLayout>
  )
}
