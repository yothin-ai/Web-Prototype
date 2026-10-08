import { Route, Routes } from 'react-router-dom'
import { Browse } from './pages/Browse'
import { CartPage } from './pages/CartPage'
import { Checkout } from './pages/Checkout'
import { Confirmation } from './pages/Confirmation'
import { Home } from './pages/Home'
import { OrdersPage } from './pages/OrdersPage'
import { Storefront } from './Storefront'

export function Ecommerce() {
  return (
    <Storefront>
      <Routes>
        <Route index element={<Home />} />
        <Route path="products" element={<Browse />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="done/:orderId" element={<Confirmation />} />
        <Route path="orders" element={<OrdersPage />} />
      </Routes>
    </Storefront>
  )
}
