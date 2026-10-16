import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, DataRow, IconCircle } from '../../../ui'
import { PROTOTYPE_ID } from '../cart'
import { serviceById, useBookings, type BookingStatus } from '../services'
import { sv } from '../serviceStrings'
import { AccountShell } from './AccountShell'

const statusLabel = { pending: sv.stPending, confirmed: sv.stConfirmed, done: sv.stDone, cancelled: sv.stCancelled }
const statusTone: Record<BookingStatus, 'success' | 'warning' | undefined> = { pending: 'warning', confirmed: 'success', done: undefined, cancelled: undefined }
const slotLabel = { morning: sv.slotMorning, afternoon: sv.slotAfternoon, evening: sv.slotEvening }

// The shopper's technician bookings and where each one stands.
export function MyBookingsPage() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { list, cancel } = useBookings()
  const base = `/${PROTOTYPE_ID}`
  const day = (iso: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium' }).format(new Date(iso))
  return (
    <AccountShell active="bookings">
      <div className="stack">
        <h1>{t(sv.myTitle)}</h1>
        <span className="muted">{t(sv.mySub)}</span>
        {list.length === 0 ? (
          <Card>
            <strong>{t(sv.myEmpty)}</strong>
            <div><Button to={`${base}/services${search}`} variant="secondary" size="sm">{t(sv.bookNow)}</Button></div>
          </Card>
        ) : list.map((b) => {
          const service = serviceById(b.serviceId)
          return (
            <Card key={b.id}>
              <div className="row">
                {service && <IconCircle size="md" icon={service.icon} />}
                <div className="stack row__grow"><h3>{service ? t(service.name) : '-'}</h3><span className="muted">{b.id}</span></div>
                <Badge tone={statusTone[b.status]}>{t(statusLabel[b.status])}</Badge>
              </div>
              <DataRow muted label={t(sv.when)} value={`${day(b.date)} · ${t(slotLabel[b.slot])}`} />
              <DataRow muted label={t(sv.addrLabel)} value={b.address} />
              {b.note && <DataRow muted label={t(sv.noteLabel)} value={b.note} />}
              {b.status === 'pending' && <div><Button size="sm" variant="secondary" onClick={() => cancel(b.id)}>{t(sv.cancel)}</Button></div>}
            </Card>
          )
        })}
      </div>
    </AccountShell>
  )
}
