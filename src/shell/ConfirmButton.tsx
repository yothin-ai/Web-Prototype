import { useEffect, useState } from 'react'
import { useLang, type Localized } from '../i18n'
import { Button } from '../ui'
import { strings } from './strings'

// Two-step button: the first press asks to confirm, a second press within 3s acts.
export function ConfirmButton({ label, onConfirm }: { label: Localized; onConfirm: () => void }) {
  const { t } = useLang()
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (!armed) return
    const timer = window.setTimeout(() => setArmed(false), 3000)
    return () => window.clearTimeout(timer)
  }, [armed])

  return (
    <Button
      size="sm"
      variant={armed ? 'danger' : 'secondary'}
      onClick={() => {
        if (armed) {
          setArmed(false)
          onConfirm()
        } else setArmed(true)
      }}
    >
      {t(armed ? strings.resetConfirm : label)}
    </Button>
  )
}
