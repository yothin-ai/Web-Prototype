import { useLang } from '../../i18n'
import { spaceUsage, tokens } from '../../tokens/tokens'
import { Col, Grid } from '../../ui'
import { Block, Chapter, TableWrap } from '../shared'
import { text } from '../text'

export function Spacing() {
  const { t } = useLang()
  const { breakpoint, grid } = tokens
  const rows = [
    { name: text.desktop, range: `≥ ${breakpoint.md}px`, cols: grid.columns.md },
    { name: text.tablet, range: `${breakpoint.sm}–${breakpoint.md - 1}px`, cols: grid.columns.sm },
    { name: text.mobile, range: `< ${breakpoint.sm}px`, cols: grid.columns.base },
  ]
  return (
    <Chapter id="spacing" number="03" title={t(text.c3Title)} tag={t(text.c3Tag)}>
      <Block number="3.1" title={t(text.c31)} note={t(text.c31Note)}>
        <div className="scale">
          {(Object.keys(tokens.space).map(Number) as (keyof typeof tokens.space)[]).map((name) => (
            <div className="scale__row" key={name}>
              <span className="scale__label">space-{name} · {tokens.space[name]}</span>
              <div className="space-bar" style={{ width: `var(--space-${name})` }} />
              <span className="muted">{t(spaceUsage[name])}</span>
            </div>
          ))}
        </div>
      </Block>
      <Block number="3.2" title={t(text.c32)} note={t(text.c32Note)}>
        <TableWrap>
          <thead>
            <tr>
              <th>{t(text.device)}</th>
              <th>{t(text.range)}</th>
              <th>{t(text.columns)}</th>
              <th>{t(text.gutter)}</th>
              <th>{t(text.margin)}</th>
              <th>{t(text.maxWidth)}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.range}>
                <td><strong>{t(r.name)}</strong></td>
                <td className="mb-mono">{r.range}</td>
                <td className="mb-mono">{r.cols}</td>
                <td className="mb-mono">{grid.gutter}</td>
                <td className="mb-mono">{tokens.space[4]}</td>
                <td className="mb-mono">{grid.maxWidth}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Block>
      <Block number="3.3" title={t(text.c33)} note={t(text.c33Note)}>
        <Grid>
          {Array.from({ length: grid.columns.md }, (_, i) => (
            <Col key={i} span={{ base: 1, sm: 1, md: 1 }}>
              <div className="grid-demo">{i + 1}</div>
            </Col>
          ))}
        </Grid>
      </Block>
    </Chapter>
  )
}
