import { Route, Routes } from 'react-router-dom'
import { AccountHome } from './pages/AccountHome'
import { AccountMenuPage, ComingSoon } from './pages/AccountMisc'
import { AccountPage } from './pages/AccountPage'
import { Browse } from './pages/Browse'
import { CartPage } from './pages/CartPage'
import { CategoryPage } from './pages/CategoryPage'
import { BrandPage } from './pages/BrandPage'
import { CampaignPage } from './pages/CampaignPage'
import { Checkout } from './pages/Checkout'
import { Confirmation } from './pages/Confirmation'
import { Home } from './pages/Home'
import { PaymentPage } from './pages/PaymentPage'
import { InfoPage } from './pages/InfoPage'
import { OrdersPage } from './pages/OrdersPage'
import { ProductPage } from './pages/ProductPage'
import { SoonPage } from './pages/SoonPage'
import { StoresPage } from './pages/StoresPage'
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
        <Route path="info/:slug" element={<InfoPage />} />
        <Route path="stores" element={<StoresPage />} />
        <Route path="campaign/:key" element={<CampaignPage />} />
        <Route path="brand/:index" element={<BrandPage />} />
        <Route path="soon" element={<SoonPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Routes>
    </Storefront>
  )
}
