import { useLang } from '../../i18n'
import { tokens, typeScale } from '../../tokens/tokens'
import { Block, Chapter, TableWrap } from '../shared'
import { text } from '../text'

const px = (rem: string) => Math.round(parseFloat(rem) * 16)

export function Typography() {
  const { t } = useLang()
  return (
    <Chapter id="typography" number="02" title={t(text.c2Title)} tag={t(text.c2Tag)}>
      <Block number="2.1" title={t(text.c21)} note={t(text.c21Note)}>
        <div className="mb-fontcard">
          <span className="mb-fontcard__big">Aa ก</span>
          <div className="stack">
            <strong>Inter Variable + Noto Sans Thai</strong>
            <span className="muted">{tokens.font.family}</span>
            <span>{t(text.glyphs)}</span>
            <span className="muted">{Object.entries(tokens.font.weight).map(([k, v]) => `${k} ${v}`).join(' · ')}</span>
          </div>
        </div>
      </Block>
      <Block number="2.2" title={t(text.c22)} note={t(text.c22Note)}>
        <TableWrap>
          <thead>
            <tr>
              <th>{t(text.role)}</th>
              <th>{t(text.size)}</th>
              <th>{t(text.lineHeight)}</th>
              <th>{t(text.weight)}</th>
              <th>{t(text.use)}</th>
              <th>{t(text.preview)}</th>
            </tr>
          </thead>
          <tbody>
            {typeScale.map((row) => (
              <tr key={row.role}>
                <td><strong>{row.role}</strong></td>
                <td className="mb-mono">{row.size} · {tokens.font.size[row.size]} ({px(tokens.font.size[row.size])}px)</td>
                <td className="mb-mono">{row.lineHeight} · {tokens.font.lineHeight[row.lineHeight]}</td>
                <td className="mb-mono">{row.weight} · {tokens.font.weight[row.weight]}</td>
                <td className="muted">{t(row.use)}</td>
                <td>
                  <span
                    style={{
                      fontSize: `var(--font-size-${row.size})`,
                      fontWeight: `var(--font-weight-${row.weight})`,
                      lineHeight: `var(--line-height-${row.lineHeight})`,
                    }}
                  >
                    {t(text.sample)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Block>
    </Chapter>
  )
}
