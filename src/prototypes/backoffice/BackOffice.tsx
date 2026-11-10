import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useLang } from '../../i18n'
import { Badge, Button, Col, Grid, Logo, SideNav, SideNavLayout } from '../../ui'
import { PROTOTYPE_ID, useCounts, useSearch } from './data'
import { Overview } from './pages/Overview'
import { OrderDetail } from './pages/OrderDetail'
import { Adjustments } from './pages/Adjustments'
import { CashBook } from './pages/CashBook'
import { InvoiceView } from './pages/InvoiceView'
import { Invoices } from './pages/Invoices'
import { ProfitLoss } from './pages/ProfitLoss'
import { VatReport } from './pages/VatReport'
import { ac } from './accStrings'
import { NewPurchaseOrder } from './pages/NewPurchaseOrder'
import { Movements } from './pages/Movements'
import { Orders } from './pages/Orders'
import { Valuation } from './pages/Valuation'
import { PurchaseOrderDetail } from './pages/PurchaseOrderDetail'
import { PurchaseOrders } from './pages/PurchaseOrders'
import { Suppliers } from './pages/Suppliers'
import { Transfers } from './pages/Transfers'
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
  const item = (to: string, label: string, icon: 'home' | 'orders' | 'package' | 'plus' | 'edit' | 'truck' | 'receipt' | 'store' | 'cash' | 'percent' | 'bank', badge?: number) => ({
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
            { title: t(b.groupStock), items: [item('/stock', t(b.navStock), 'package', counts.alerts), item('/adjustments', t(b.navAdjust), 'edit'), item('/transfers', t(b.navTransfers), 'truck'), item('/receive', t(b.navReceive), 'plus')] },
            { title: t(b.groupPurchasing), items: [item('/purchase-orders', t(b.navPurchaseOrders), 'receipt'), item('/suppliers', t(b.navSuppliers), 'store')] },
            { title: t(b.groupReports), items: [item('/reports/valuation', t(b.navValuation), 'cash'), item('/reports/movements', t(b.navMovements), 'receipt')] },
            { title: t(ac.groupAccounting), items: [item('/accounting/cash-book', t(ac.navCashBook), 'cash'), item('/accounting/invoices', t(ac.navInvoices), 'receipt'), item('/accounting/vat', t(ac.navVat), 'percent'), item('/accounting/profit', t(ac.navProfit), 'bank')] },
          ]}
        />
      }
    >
      <Grid>
        <Col>
          <div className="stack">
        <div className="row no-print">
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
          <Route path="adjustments" element={<Adjustments />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="purchase-orders/new" element={<NewPurchaseOrder />} />
          <Route path="purchase-orders/:poId" element={<PurchaseOrderDetail />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="accounting/cash-book" element={<CashBook />} />
          <Route path="accounting/invoices" element={<Invoices />} />
          <Route path="accounting/invoices/:invoiceId" element={<InvoiceView />} />
          <Route path="accounting/vat" element={<VatReport />} />
          <Route path="accounting/profit" element={<ProfitLoss />} />
          <Route path="reports/valuation" element={<Valuation />} />
          <Route path="reports/movements" element={<Movements />} />
          <Route path="receive" element={<Receive />} />
          <Route path="*" element={<Navigate to={`${base}${search}`} replace />} />
        </Routes>
          </div>
        </Col>
      </Grid>
    </SideNavLayout>
  )
}
