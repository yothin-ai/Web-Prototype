import { useState } from 'react'
import { useLang } from '../../../i18n'
import { Button, Field } from '../../../ui'
import { c } from '../checkoutStrings'
import { useClubLinked } from '../checkout'

// Links the member card with a phone number or a national ID (simulated); used at checkout and on the club page.
export function ClubLinkForm({ idPrefix = 'club' }: { idPrefix?: string }) {
  const { t } = useLang()
  const [, setLinked] = useClubLinked()
  const [tab, setTab] = useState<'phone' | 'id'>('phone')
  const [value, setValue] = useState('')
  return (
    <>
      <div className="row">
        <Button size="sm" variant={tab === 'phone' ? 'primary' : 'secondary'} aria-pressed={tab === 'phone'} onClick={() => setTab('phone')}>{t(c.tabPhone)}</Button>
        <Button size="sm" variant={tab === 'id' ? 'primary' : 'secondary'} aria-pressed={tab === 'id'} onClick={() => setTab('id')}>{t(c.tabNationalId)}</Button>
      </div>
      <Field label={tab === 'phone' ? t(c.tabPhone) : t(c.tabNationalId)} id={`${idPrefix}-value`} inputMode="numeric" placeholder={tab === 'phone' ? t(c.phonePlaceholder) : t(c.idPlaceholder)} value={value} onChange={(e) => setValue(e.target.value.replace(/\D/g, '').slice(0, tab === 'phone' ? 10 : 13))} />
      <Button onClick={() => { setLinked(true); setValue('') }}>{t(c.connect)}</Button>
    </>
  )
}
