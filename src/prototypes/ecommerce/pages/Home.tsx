import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { AppPromoCard, BannerSlide, Carousel, Col, Grid, IconCircle, ShortcutCard, ShortcutRow } from '../../../ui'
import { s } from '../strings'

export function Home() {
  const { t } = useLang()
  const { home } = useDataset().dataset.ecommerce
  const prev = t(s.scrollPrev)
  const next = t(s.scrollNext)

  return (
    <>
      <div>
        <Grid>
          <Col span={{ base: 4, sm: 8, md: 8 }}>
            <div className="stack">
              <Carousel label={t(s.bannerList)} dots prevLabel={prev} nextLabel={next}>
                {home.slides.map((slide, i) => (
                  <BannerSlide key={i} title={t(slide.title)} text={t(slide.text)} />
                ))}
              </Carousel>
              <ShortcutRow>
                {home.shortcuts.map((x, i) => (
                  <ShortcutCard key={i} title={t(x.title)} text={t(x.text)} tag={t(x.tag)} />
                ))}
              </ShortcutRow>
            </div>
          </Col>
          <Col span={{ base: 4, sm: 8, md: 4 }}>
            <AppPromoCard
              title={t(home.app.title)}
              subtitle={t(home.app.subtitle)}
              couponIntro={t(s.couponIntro)}
              couponValue={String(home.app.coupon)}
              couponTitle={t(s.couponTitle)}
              couponNote={t(s.couponNote)}
              stores={['App Store', 'Google Play']}
              clubTitle={t(home.app.club)}
              clubBadge={t(s.memberBadge)}
              earnText={
                <>
                  {t(s.earnBefore)} <strong>{home.app.earnBaht} {t(s.baht)}</strong> {t(s.earnAfter)} <strong>{t(s.onePoint)}</strong>
                </>
              }
              joinLabel={`${t(s.join)}${t(home.app.club)}`}
            />
          </Col>
        </Grid>
      </div>

      <div className="section">
        <Grid>
          <Col>
            <Carousel label={t(s.quickLinks)} count={7} minItem="96px" arrows={false} prevLabel={prev} nextLabel={next}>
              {home.circles.map((c, i) => (
                <div key={i} className="circle-link">
                  <IconCircle size="lg" />
                  <span>{t(c)}</span>
                </div>
              ))}
            </Carousel>
          </Col>
        </Grid>
      </div>
    </>
  )
}
