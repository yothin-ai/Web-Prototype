import { Route, Routes } from 'react-router-dom'
import { AccountHome } from './pages/AccountHome'
import { AccountMenuPage, ComingSoon } from './pages/AccountMisc'
import { AccountPage } from './pages/AccountPage'
import { Browse } from './pages/Browse'
import { CartPage } from './pages/CartPage'
import { CategoryPage } from './pages/CategoryPage'
import { Checkout } from './pages/Checkout'
import { Confirmation } from './pages/Confirmation'
import { Home } from './pages/Home'
import { PaymentPage } from './pages/PaymentPage'
import { OrdersPage } from './pages/OrdersPage'
import { ProductPage } from './pages/ProductPage'
import { Storefront } from './Storefront'

export function Ecommerce() {
  return (
    <Storefront>
      <Routes>
        <Route index element={<Home />} />
        <Route path="products" element={<Browse />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="pay" element={<PaymentPage />} />
        <Route path="done/:orderId" element={<Confirmation />} />
        <Route path="account" element={<AccountHome />} />
        <Route path="account/profile" element={<AccountPage />} />
        <Route path="account/addresses" element={<AccountPage focus="address" />} />
        <Route path="account/menu" element={<AccountMenuPage />} />
        <Route path="account/:page" element={<ComingSoon />} />
        <Route path="orders" element={<OrdersPage />} />
      </Routes>
    </Storefront>
  )
}
