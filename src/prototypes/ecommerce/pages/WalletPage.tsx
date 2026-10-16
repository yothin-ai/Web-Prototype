import { useLang } from '../../../i18n'
import { BalanceCard, Card, DataRow, IconCircle, Notice } from '../../../ui'
import { formatDate, formatMoney } from '../cart'
import { useWallet } from '../wallet'
import { wl } from '../walletStrings'
import { AccountShell } from './AccountShell'

// The shopper's wallet: what can be spent, where it came from, and what it has paid for.
export function WalletPage() {
  const { t, lang } = useLang()
  const { credits, debits, balance, readyCount } = useWallet()
  return (
    <AccountShell active="wallet">
      <BalanceCard label={t(wl.label)} caption={t(wl.caption)} amount={balance.toLocaleString()} unit={t(wl.unit)} note={`${readyCount} ${t(wl.ready)}`} />
      <Card>
        <div className="row"><IconCircle size="md" icon="wallet" /><div className="stack row__grow"><h3>{t(wl.listTitle)}</h3><span className="muted">{credits.length} {t(wl.items)}</span></div></div>
        {credits.length === 0 ? (
          <div className="stack"><strong>{t(wl.emptyTitle)}</strong><span className="muted">{t(wl.emptyText)}</span></div>
        ) : credits.map((c) => (
          <DataRow
            key={c.id}
            label={<span className="stack"><strong>{t(c.title)}</strong><span className="muted">{formatDate(c.at, lang)} · {c.remaining > 0 ? t(wl.statusReady) : t(wl.statusUsed)}</span></span>}
            value={<span className="stack"><strong>{formatMoney(c.remaining, lang)}</strong>{c.remaining !== c.amount && <span className="muted">{t(wl.of)} {formatMoney(c.amount, lang)}</span>}</span>}
          />
        ))}
      </Card>
      {debits.length > 0 && (
        <Card>
          <h3>{t(wl.usedTitle)}</h3>
          {debits.map((d) => (
            <DataRow key={d.id} label={<span className="stack"><strong>{t(wl.usedFor)} {d.orderId}</strong><span className="muted">{formatDate(d.at, lang)}</span></span>} value={`−${formatMoney(d.amount, lang)}`} />
          ))}
        </Card>
      )}
      <Notice tone="info" title={t(wl.howTitle)}>{t(wl.howText)}</Notice>
    </AccountShell>
  )
}
