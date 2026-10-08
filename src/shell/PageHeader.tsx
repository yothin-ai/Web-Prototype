import type { ReactNode } from 'react'
import { useLang } from '../i18n'
import { Button } from '../ui'
import { LanguageToggle } from './LanguageToggle'
import { strings } from './strings'
import './shell.css'

export function PageHeader({ showBack, extra }: { showBack?: boolean; extra?: ReactNode }) {
  const { t } = useLang()
  return (
    <div className="page-header">
      {showBack && <Button to="/" variant="ghost" size="sm">{t(strings.backToHub)}</Button>}
      <span className="page-header__spacer" />
      {extra}
      <LanguageToggle />
    </div>
  )
}
