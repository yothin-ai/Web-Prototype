import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useLang } from '../../i18n'
import { Button, Col, Grid, NavTabs } from '../../ui'
import { PROTOTYPE_ID, useBackOrders, useSearch } from './data'
import { Overview } from './pages/Overview'
import { OrderDetail } from './pages/OrderDetail'
import { Orders } from './pages/Orders'
import { Receive } from './pages/Receive'
import { StockDetail } from './pages/StockDetail'
import { StockList } from './pages/StockList'
import { b } from './strings'

// The shop's back office: a title row, the menu, and the page. The storefront opens in a new tab.
export function BackOffice() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  // Opening the back office first still gives the orders their samples.
  useBackOrders()
  const here = pathname.replace(base, '') || '/'
  const item = (to: string, label: string) => ({ to: `${base}${to}${search}`, label, active: to === '/' ? here === '/' : here.startsWith(to) })
  return (
    <div className="section">
      <Grid>
        <Col>
          <div className="stack">
            <div className="row">
              <strong>{t(b.brand)}</strong>
              <span className="muted row__grow">{t(b.owner)}</span>
              <Button to="/ecommerce" variant="secondary" size="sm" newTab newTabLabel={t(b.newTab)}>{t(b.toShop)}</Button>
            </div>
            <NavTabs
              label={t(b.menu)}
              items={[item('/', t(b.navOverview)), item('/orders', t(b.navOrders)), item('/stock', t(b.navStock)), item('/receive', t(b.navReceive))]}
            />
          </div>
        </Col>
        <Col>
          <Routes>
            <Route index element={<Overview />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="stock" element={<StockList />} />
            <Route path="stock/:productId" element={<StockDetail />} />
            <Route path="receive" element={<Receive />} />
            <Route path="*" element={<Navigate to={`${base}${search}`} replace />} />
          </Routes>
        </Col>
      </Grid>
    </div>
  )
}
