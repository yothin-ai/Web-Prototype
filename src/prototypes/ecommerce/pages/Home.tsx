import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import {
  AppPromoCard, BannerSlide, BrandChip, Button, Carousel, Col, Countdown, FlashSaleCard, Grid, IconCircle, ProductImage, SectionHeader, ShortcutCard, ShortcutRow, TileMosaic,
} from '../../../ui'
import { formatMoney, useAddToCart, useEcommerce } from '../cart'
import { s } from '../strings'
import { useGoSearch } from '../Storefront'

const chunk = <T,>(items: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, i * size + size))

export function Home() {
  const { t, lang } = useLang()
  const goSearch = useGoSearch()
  const add = useAddToCart()
  const { productById } = useEcommerce()
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

      <div className="storefront-section">
        <div className="sale-panel">
          <SectionHeader
            tone="sale"
            title={t(s.flashTitle)}
            aside={<Countdown startSeconds={home.flashStartSeconds} label={t(s.remaining)} />}
          />
          <div className="sale-panel__body">
            <Carousel label={t(s.flashRow)} count={6} minItem="150px" prevLabel={prev} nextLabel={next}>
              {home.flashIds.map((id) => {
                const p = productById(id)
                if (!p || p.originalPrice === undefined) return null
                const sold = p.sold ?? 0
                const stock = p.stock ?? 0
                return (
                  <FlashSaleCard
                    key={id}
                    flashLabel={t(s.flashTag)}
                    imageLabel={t(p.name)}
                    name={t(p.name)}
                    price={formatMoney(p.price, lang)}
                    originalPrice={formatMoney(p.originalPrice, lang)}
                    discount={`-${Math.round((1 - p.price / p.originalPrice) * 100)}%`}
                    soldText={`${t(s.soldBefore)} ${sold} ${t(s.pieces)}`}
                    stockText={`${t(s.leftBefore)} ${stock}`}
                    progress={sold + stock === 0 ? 0 : Math.round((sold / (sold + stock)) * 100)}
                    buyLabel={t(s.buyNow)}
                    onBuy={() => add(id)}
                  />
                )
              })}
            </Carousel>
          </div>
        </div>
      </div>

      <div className="storefront-section">
        <SectionHeader title={t(s.categoriesButton)} />
        <Carousel label={t(s.categoriesRow)} count={6} minItem="96px" dots prevLabel={prev} nextLabel={next}>
          {chunk(home.categories, 2).map((pair, i) => (
            <div key={i} className="category-column">
              {pair.map((c) => (
                <button key={t(c)} type="button" className="category-tile" onClick={() => goSearch(t(c))}>
                  <ProductImage label={t(c)} />
                  <span>{t(c)}</span>
                </button>
              ))}
            </div>
          ))}
        </Carousel>
      </div>

      <div className="storefront-section">
        <SectionHeader title={t(home.jobsTitle)} action={<Button size="sm">{t(s.viewAll)}</Button>} />
        <Carousel label={t(s.jobsRow)} dots prevLabel={prev} nextLabel={next}>
          {chunk(home.jobs, 9).map((page, i) => (
            <TileMosaic key={i} tiles={page.map((j) => t(j))} onSelect={goSearch} />
          ))}
        </Carousel>
      </div>

      <div className="storefront-section">
        <SectionHeader title={t(s.brandsTitle)} />
        <Carousel label={t(s.brandsRow)} count={10} minItem="88px" dots prevLabel={prev} nextLabel={next}>
          {chunk(home.brands, 2).map((pair, i) => (
            <div key={i} className="brand-column">
              {pair.map((b) => (
                <BrandChip key={t(b)} name={t(b)} onSelect={() => goSearch(t(b))} />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}
