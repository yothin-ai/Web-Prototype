import type { ReactNode } from 'react'
import { Badge, Button, Checkbox } from './index'

type CartItemProps = {
  checked: boolean
  onCheck: (checked: boolean) => void
  checkLabel: string
  disabled?: boolean
  thumb: ReactNode
  skuLabel: string
  sku: string
  name: ReactNode
  status: string
  statusTone?: 'success' | 'danger'
  price: string
  quantity: ReactNode
  removeLabel: string
  onRemove: () => void
}

// One line of the cart: tick box, picture, SKU, name, stock badge, price, quantity and remove.
export function CartItem({ checked, onCheck, checkLabel, disabled, thumb, skuLabel, sku, name, status, statusTone = 'success', price, quantity, removeLabel, onRemove }: CartItemProps) {
  return (
    <div className={`cart-item${disabled ? ' cart-item--off' : ''}`}>
      <Checkbox bare checked={checked && !disabled} disabled={disabled} onChange={onCheck} label={checkLabel} />
      <div className="cart-item__thumb">{thumb}</div>
      <div className="cart-item__main">
        <span className="row"><Badge>{skuLabel}</Badge><span className="muted">{sku}</span></span>
        {name}
        <Badge tone={statusTone === 'danger' ? 'warning' : 'success'}>{status}</Badge>
      </div>
      <div className="cart-item__side">
        <strong className="cart-item__price">{price}</strong>
        {quantity}
        <Button variant="ghost" size="sm" onClick={onRemove}>{removeLabel}</Button>
      </div>
    </div>
  )
}
