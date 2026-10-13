import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { BranchCard, Breadcrumb, Col, Grid, Select } from '../../../ui'
import { branches, useBranch } from '../branches'
import { PROTOTYPE_ID } from '../cart'
import { s } from '../strings'

// The store finder: every sample store, filtered by province, with a button to choose one.
export function StoresPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const [branchId, setBranchId] = useBranch()
  const [province, setProvince] = useState('')
  const provinces = [...new Map(branches.map((b) => [b.province.th ?? '', b.province])).values()]
  const shown = branches.filter((b) => !province || b.province.th === province)
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `/${PROTOTYPE_ID}${search}` }, { label: t(s.storesTitle) }]} />
          <h1>{t(s.storesTitle)}</h1>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}>
        <Select label={t(s.storesProvince)} id="stores-province" value={province} placeholder={t(s.storesAll)} options={provinces.map((p) => ({ value: p.th ?? '', label: t(p) }))} onChange={(e) => setProvince(e.target.value)} />
      </Col>
      <Col>
        <div className="stack">
          {shown.map((b) => (
            <BranchCard key={b.id} name={t(b.name)} address={t(b.address)} hours={t(b.hours)} province={t(b.province)} selected={b.id === branchId} selectedLabel={t(s.storeSelected)} chooseLabel={t(s.storeChoose)} onChoose={() => setBranchId(b.id)} />
          ))}
        </div>
      </Col>
    </Grid>
  )
}
