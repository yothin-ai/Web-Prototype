import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import {
  AppPromoCard, ArticleCard, BannerSlide, BenefitBar, BrandChip, Badge, Button, Card, DataRow, Carousel, Col, Countdown, FlashSaleCard, Grid, IconCircle, ProductImage, SectionHeader, ShortcutCard, ShortcutRow, TileMosaic,
} from '../../../ui'
import { formatMoney, useAddToCart, useEcommerce } from '../cart'
import { f } from '../footer'
import { s } from '../strings'
import { Link, useLocation } from 'react-router-dom'
import { PROTOTYPE_ID } from '../cart'
import { useGoSearch } from '../Storefront'

const chunk = <T,>(items: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, i * size + size))

export function Home() {
  const { t, lang } = useLang()
  const goSearch = useGoSearch()
  const { search } = useLocation()
  const detailPath = (id: string) => `/${PROTOTYPE_ID}/product/${id}${search}`
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
                    to={detailPath(id)}
                  />
                )
              })}
            </Carousel>
          </div>
        </div>
      </div>

      <div className="storefront-section">
        <SectionHeader title={t(s.categoriesButton)} />
        <Carousel label={t(s.categoriesRow)} count={6} minItem="96px" rows={2} dots prevLabel={prev} nextLabel={next}>
          {home.categories.map((c) => (
            <button key={t(c)} type="button" className="category-tile" onClick={() => goSearch(t(c))}>
              <ProductImage label={t(c)} />
              <span>{t(c)}</span>
            </button>
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
        <Carousel label={t(s.brandsRow)} count={10} minItem="88px" rows={2} dots prevLabel={prev} nextLabel={next}>
          {home.brands.map((b) => (
            <BrandChip key={t(b)} name={t(b)} onSelect={() => goSearch(t(b))} />
          ))}
        </Carousel>
      </div>

      <div className="storefront-section">
        <SectionHeader title={t(s.recommendedTitle)} />
        <div className="product-grid">
          {home.recommendedIds.map((id) => {
            const p = productById(id)
            if (!p) return null
            return (
              <Card key={id}>
                <Link to={detailPath(id)} className="card-link"><ProductImage label={t(p.name)} /></Link>
                <Badge>{t(p.brand ?? p.category)}</Badge>
                <Link to={detailPath(id)} className="card-link"><h3 className="article-card__title">{t(p.name)}</h3></Link>
                <DataRow label={<strong>{formatMoney(p.price, lang)}</strong>} value={<Button size="sm" onClick={() => add(id)}>{t(s.add)}</Button>} />
              </Card>
            )
          })}
        </div>
      </div>

      <div className="storefront-section">
        <SectionHeader title={t(home.ideasTitle)} action={<Button size="sm">{t(s.viewAll)}</Button>} />
        <div className="article-grid" aria-label={t(s.articlesRow)}>
          {home.articles.map((a, i) => (
            <ArticleCard key={i} category={t(a.category)} views={a.views} title={t(a.title)} readLabel={t(s.readMore)} onRead={() => {}} />
          ))}
        </div>
      </div>

      <BenefitBar title={t(home.trust.title)} text={t(home.trust.text)} items={f.benefits.map((b) => ({ title: t(b.title), text: t(b.text) }))} />
    </>
  )
}
