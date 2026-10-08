import { Route, Routes, useLocation } from 'react-router-dom'
import { useDataset } from '../../datasets/DatasetContext'
import { useLang } from '../../i18n'
import { Col, Grid, NavTabs } from '../../ui'
import { cartCount, PROTOTYPE_ID, useCart } from './cart'
import { Browse } from './pages/Browse'
import { CartPage } from './pages/CartPage'
import { Checkout } from './pages/Checkout'
import { Confirmation } from './pages/Confirmation'
import { OrdersPage } from './pages/OrdersPage'
import { s } from './strings'

export function Ecommerce() {
  const { t } = useLang()
  const { dataset } = useDataset()
  const { pathname, search } = useLocation()
  const [cart] = useCart()
  const base = `/${PROTOTYPE_ID}`
  const count = cartCount(cart)

  // `search` is carried on every link so ?clean=1 survives navigation.
  const items = [
    { to: `${base}${search}`, label: t(s.browse), active: pathname === base || pathname === `${base}/` },
    { to: `${base}/cart${search}`, label: `${t(s.cart)}${count ? ` (${count})` : ''}`, active: pathname.startsWith(`${base}/cart`) || pathname.startsWith(`${base}/checkout`) },
    { to: `${base}/orders${search}`, label: t(s.orders), active: pathname.startsWith(`${base}/orders`) || pathname.startsWith(`${base}/done`) },
  ]

  return (
    <>
      <div className="section">
        <Grid>
          <Col>
            <div className="stack">
              <h2>{t(dataset.brandName)}</h2>
              <NavTabs label={t(dataset.brandName)} items={items} />
            </div>
          </Col>
        </Grid>
      </div>
      <Routes>
        <Route index element={<Browse />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="done/:orderId" element={<Confirmation />} />
        <Route path="orders" element={<OrdersPage />} />
      </Routes>
    </>
  )
}
