import { useLang } from '../i18n'
import { strings } from '../shell/strings'
import { useDemoState } from '../state/demoState'
import { Card, Col, Field, Grid } from '../ui'
import type { PrototypeManifest } from './types'

export function Placeholder({ prototype }: { prototype: PrototypeManifest }) {
  const { t } = useLang()
  const [note, setNote] = useDemoState(prototype.id, 'note', '')

  return (
    <div className="section">
      <Grid>
        <Col span={{ base: 4, sm: 8, md: 7 }}>
          <div className="stack">
            <h1>{t(prototype.title)}</h1>
            <p className="muted">{t(prototype.summary)}</p>
            <p>{t(strings.placeholderNote)}</p>
            <Card>
              <h3>{t(strings.journey)}</h3>
              <ol>
                {prototype.journey.map((step, i) => (
                  <li key={i}>{t(step)}</li>
                ))}
              </ol>
            </Card>
          </div>
        </Col>
        <Col span={{ base: 4, sm: 8, md: 5 }}>
          <Card>
            <Field
              label={t(strings.tryState)}
              hint={t(strings.tryStateHint)}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Card>
        </Col>
      </Grid>
    </div>
  )
}
