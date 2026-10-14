import type { ReactNode } from 'react'
import { Button, Card } from '../../../ui'

// The narrow centred card both the sign-in and the register pages sit in.
export function AuthCard({ children }: { children: ReactNode }) {
  return <div className="auth-page"><Card>{children}</Card></div>
}

export function GoogleButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <Button variant="secondary" icon="globe" onClick={onClick}>{label}</Button>
}
