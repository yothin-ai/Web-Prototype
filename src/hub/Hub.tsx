import { useDataset } from '../datasets/DatasetContext'
import { useLang } from '../i18n'
import { prototypes } from '../prototypes/registry'
import { ConfirmButton } from '../shell/ConfirmButton'
import { PageHeader } from '../shell/PageHeader'
import { strings } from '../shell/strings'
import { resetAll } from '../state/demoState'
import { Badge, Button, Card, ChoiceCard, ChoiceGroup, Col, Grid } from '../ui'

export function Hub() {
  const { t } = useLang()
  const { dataset, datasets, setDatasetId } = useDataset()
  return (
    <>
      <PageHeader
        extra={
          <>
            <Button to="/moodboard" variant="ghost" size="sm">{t(strings.moodboard)}</Button>
            <ConfirmButton label={strings.resetAll} onConfirm={() => resetAll(prototypes.map((p) => p.id))} />
          </>
        }
      />
      <div className="section">
        <Grid>
          <Col>
            <div className="stack">
              <h1>{t(strings.hubTitle)}</h1>
              <p className="muted">{t(strings.hubIntro)}</p>
              <h3>{t(strings.dataset)}</h3>
              <ChoiceGroup label={t(strings.dataset)}>
                {datasets.map((d) => (
                  <ChoiceCard
                    key={d.id}
                    title={t(d.name)}
                    detail={t(d.tagline)}
                    selected={d.id === dataset.id}
                    onSelect={() => {
                      if (d.id === dataset.id) return
                      setDatasetId(d.id)
                      resetAll(prototypes.map((p) => p.id))
                    }}
                  />
                ))}
              </ChoiceGroup>
              <p className="muted">{t(strings.datasetNote)}</p>
            </div>
          </Col>
        </Grid>
      </div>
      <Grid>
        {prototypes.map((p) => (
          <Col key={p.id} span={{ base: 4, sm: 4, md: 4 }}>
            <Card to={`/${p.id}`}>
              <Badge tone={p.status === 'ready' ? 'success' : 'warning'}>{t(strings[p.status])}</Badge>
              <h2>{t(p.title)}</h2>
              <p className="muted">{t(p.summary)}</p>
              <p className="muted">{p.journey.map((s) => t(s)).join(' → ')}</p>
            </Card>
          </Col>
        ))}
      </Grid>
    </>
  )
}
