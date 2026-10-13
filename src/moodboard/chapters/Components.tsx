import { useState } from 'react'
import { useLang } from '../../i18n'
import {
  AccountSidebar, BottomTabBar, CartItem, CategoryCard, CategoryPills, BranchCard, CategoryTile, Checkbox, DropdownMenu, FilterGroup, ProductCard, MemberBanner, SettingRow, StatCard, Accordion, AppPromoCard, Breadcrumb, ArticleCard, BenefitBar, Badge, BannerSlide, BrandChip, Button, Card, Carousel, CategoryNav, ChoiceCard, ChoiceGroup, Col, Countdown, DataRow, Field, FlashSaleCard, Grid, Hero, IconCircle, Logo, NavTabs, Notice, Select, StepPill, Switch,
  MegaMenu, ProductGallery, ProductImage, ProgressBar, PromoStrip, QuantityStepper, Quote, SectionHeader, ShortcutCard, ShortcutRow, SiteFooter, SiteHeader, StickyActionBar, Tabs, TileMosaic, UtilityBar,
} from '../../ui'
import { Block, Chapter, TableWrap } from '../shared'
import { text } from '../text'

export function Components() {
  const { t } = useLang()
  const [qty, setQty] = useState(1)
  const [choice, setChoice] = useState('a')
  const [switched, setSwitched] = useState(false)
  const [ticked, setTicked] = useState(true)
  const [cartQty, setCartQty] = useState(2)
  const [cartOn, setCartOn] = useState(true)
  const [filterOn, setFilterOn] = useState<string[]>(['a'])
  const variants = [
    { name: text.primary, variant: 'primary' as const },
    { name: text.secondary, variant: 'secondary' as const },
    { name: text.ghost, variant: 'ghost' as const },
    { name: text.danger, variant: 'danger' as const },
  ]

  return (
    <Chapter id="components" number="04" title={t(text.c4Title)} tag={t(text.c4Tag)}>
      <Block number="4.1" title={t(text.c41)} note={t(text.c41Note)}>
        <TableWrap>
          <thead>
            <tr>
              <th />
              <th>{t(text.stateDefault)}</th>
              <th>{t(text.stateHover)}</th>
              <th>{t(text.stateFocus)}</th>
              <th>{t(text.stateDisabled)}</th>
              <th>{t(text.small)}</th>
            </tr>
          </thead>
          <tbody>
            {variants.map(({ name, variant }) => (
              <tr key={variant}>
                <td><strong>{t(name)}</strong></td>
                <td><Button variant={variant}>{t(name)}</Button></td>
                <td><Button variant={variant} className="state-hover">{t(name)}</Button></td>
                <td><Button variant={variant} className="state-focus">{t(name)}</Button></td>
                <td><Button variant={variant} disabled>{t(name)}</Button></td>
                <td><Button variant={variant} size="sm">{t(name)}</Button></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Block>

      <Block number="4.2" title={t(text.c42)} note={t(text.c42Note)}>
        <Grid>
          <Col span={{ base: 4, sm: 4, md: 3 }}>
            <p className="mb-caption">{t(text.stateDefault)}</p>
            <Field label={t(text.fieldLabel)} hint={t(text.fieldHint)} id="mb-f1" />
          </Col>
          <Col span={{ base: 4, sm: 4, md: 3 }}>
            <p className="mb-caption">{t(text.stateFocus)}</p>
            <div className="state-focus-field"><Field label={t(text.fieldLabel)} hint={t(text.fieldHint)} id="mb-f2" defaultValue={t(text.fieldValue)} /></div>
          </Col>
          <Col span={{ base: 4, sm: 4, md: 3 }}>
            <p className="mb-caption">{t(text.stateDisabled)}</p>
            <Field label={t(text.fieldLabel)} hint={t(text.fieldHint)} id="mb-f3" defaultValue={t(text.fieldValue)} disabled />
          </Col>
        </Grid>
      </Block>

      <Block number="4.3" title={t(text.c43)} note={t(text.c43Note)}>
        <Grid>
          <Col span={{ base: 4, sm: 4, md: 4 }}>
            <p className="mb-caption">{t(text.stateDefault)}</p>
            <Card>
              <ProductImage label={t(text.sampleName)} />
              <Badge>{t(text.sampleCategory)}</Badge>
              <h3>{t(text.sampleName)}</h3>
              <p className="muted">{t(text.sampleDesc)}</p>
              <DataRow label={<strong>฿1,200</strong>} value={<Button size="sm">{t(text.add)}</Button>} />
            </Card>
          </Col>
          <Col span={{ base: 4, sm: 4, md: 4 }}>
            <p className="mb-caption">{t(text.stateHover)}</p>
            <div className="state-hover-card">
              <Card>
                <ProductImage label={t(text.sampleName)} />
                <Badge>{t(text.sampleCategory)}</Badge>
                <h3>{t(text.sampleName)}</h3>
                <p className="muted">{t(text.sampleDesc)}</p>
                <DataRow label={<strong>฿1,200</strong>} value={<Button size="sm">{t(text.add)}</Button>} />
              </Card>
            </div>
          </Col>
        </Grid>
      </Block>

      <Block number="4.4" title={t(text.c44)} note={t(text.c44Note)}>
        <div className="row">
          <Badge>{t(text.ready)}</Badge>
          <Badge tone="success">{t(text.success)}</Badge>
          <Badge tone="warning">{t(text.warning)}</Badge>
        </div>
      </Block>

      <Block number="4.5" title={t(text.c45)} note={t(text.c45Note)}>
        <div className="mb-bar">
          <Logo name={t(text.brandName)} />
          <NavTabs
            label={t(text.navTabs)}
            items={[
              { to: '/moodboard', label: t(text.tabOne), active: true },
              { to: '/moodboard', label: t(text.tabTwo), active: false },
              { to: '/moodboard', label: t(text.tabThree), active: false },
            ]}
          />
        </div>
      </Block>

      <Block number="4.6" title={t(text.c46)} note={t(text.c46Note)}>
        <Grid>
          <Col span={{ base: 4, sm: 8, md: 6 }}>
            <p className="mb-caption">{t(text.choice)}</p>
            <ChoiceGroup label={t(text.choice)}>
              <ChoiceCard title={t(text.optionA)} detail={t(text.optionDetail)} price="฿40" selected={choice === 'a'} onSelect={() => setChoice('a')} />
              <ChoiceCard title={t(text.optionB)} detail={t(text.optionDetail)} price="฿90" selected={choice === 'b'} onSelect={() => setChoice('b')} />
            </ChoiceGroup>
          </Col>
          <Col span={{ base: 4, sm: 8, md: 6 }}>
            <div className="stack">
              <div className="stack">
                <p className="mb-caption">{t(text.stepper)}</p>
                <div><QuantityStepper value={qty} onChange={setQty} label={t(text.quantity)} decreaseLabel={t(text.decrease)} increaseLabel={t(text.increase)} /></div>
              </div>
              <div className="stack">
                <p className="mb-caption">{t(text.dataRow)}</p>
                <Card>
                  <DataRow muted label={t(text.subtotal)} value="฿1,200" />
                  <DataRow muted label={t(text.shipping)} value="฿40" />
                  <DataRow strong label={t(text.total)} value="฿1,240" />
                </Card>
              </div>
              <div className="stack">
                <p className="mb-caption">{t(text.progressBar)}</p>
                <ProgressBar value={60} label={t(text.progress)} />
              </div>
            </div>
          </Col>
        </Grid>
      </Block>

      <Block number="4.7" title={t(text.c47)} note={t(text.c47Note)}>
        <div className="stack">
          <p className="mb-caption">{t(text.heroName)}</p>
          <Hero title={t(text.heroTitle)} subtitle={t(text.heroSubtitle)} actions={<Button>{t(text.primary)}</Button>} />
          <Grid>
            <Col span={{ base: 4, sm: 8, md: 6 }}>
              <p className="mb-caption">{t(text.accordion)}</p>
              <Accordion items={[{ title: t(text.question), body: t(text.answer) }, { title: t(text.question), body: t(text.answer) }]} />
            </Col>
            <Col span={{ base: 4, sm: 8, md: 6 }}>
              <p className="mb-caption">{t(text.quote)}</p>
              <Quote text={t(text.quoteText)} author={t(text.quoteAuthor)} />
            </Col>
          </Grid>
        </div>
      </Block>
      <Block number="4.8" title={t(text.c48)} note={t(text.c48Note)}>
        <div className="stack">
          <p className="mb-caption">{t(text.iconCircle)}</p>
          <div className="row"><IconCircle size="sm" /><IconCircle size="md" /><IconCircle size="lg" /><IconCircle size="lg" tone="muted" /></div>
          <p className="mb-caption">{t(text.promoStrip)}</p>
          <PromoStrip>{t(text.promoText)}</PromoStrip>
          <p className="mb-caption">{t(text.utilityBar)}</p>
          <UtilityBar items={[t(text.phone), t(text.branch), t(text.help)]} end={<Badge>TH · EN</Badge>} />
          <p className="mb-caption">{t(text.siteHeader)}</p>
          <SiteHeader
            logo={<Logo name={t(text.brandName)} />}
            categoriesLabel={t(text.categoriesBtn)}
            searchPlaceholder={t(text.searchPh)}
            searchLabel={t(text.searchBtn)}
            onSearch={() => {}}
            account={{ label: t(text.accountLabel), sub: t(text.signIn), to: '/moodboard' }}
            cart={{ label: t(text.cartLabel), sub: t(text.cartEmpty), to: '/moodboard', count: 2 }}
          />
          <p className="mb-caption">{t(text.categoryNav)}</p>
          <CategoryNav
            label={t(text.categoryNav)}
            items={[t(text.cat1), t(text.cat2), t(text.cat3)]}
            onSelect={() => {}}
            prevLabel={t(text.scrollPrev)}
            nextLabel={t(text.scrollNext)}
            end={<Button size="sm"><IconCircle size="sm" />{t(text.askAi)}</Button>}
          />
          <p className="mb-caption">{t(text.carousel)}</p>
          <Carousel label={t(text.carousel)} dots prevLabel={t(text.scrollPrev)} nextLabel={t(text.scrollNext)}>
            <BannerSlide title={t(text.slide1)} text={t(text.slideText)} />
            <BannerSlide title={t(text.slide2)} text={t(text.slideText)} />
          </Carousel>
          <Grid>
            <Col span={{ base: 4, sm: 8, md: 6 }}>
              <p className="mb-caption">{t(text.shortcut)}</p>
              <ShortcutRow>
                <ShortcutCard title={t(text.shortcutTitle)} text={t(text.shortcutText)} tag="HOT" />
              </ShortcutRow>
            </Col>
            <Col span={{ base: 4, sm: 8, md: 6 }}>
              <p className="mb-caption">{t(text.appCard)}</p>
              <AppPromoCard
                title={t(text.appTitle)}
                subtitle={t(text.appSub)}
                couponIntro={t(text.couponIntro)}
                couponValue="100"
                couponTitle={t(text.couponTitle)}
                couponNote={t(text.couponNote)}
                stores={['App Store', 'Google Play']}
                clubTitle={t(text.clubTitle)}
                clubBadge="Member"
                earnText={t(text.earnText)}
                joinLabel={t(text.joinLabel)}
              />
            </Col>
          </Grid>
        </div>
      </Block>
      <Block number="4.9" title={t(text.c49)} note={t(text.c49Note)}>
        <div className="stack">
          <p className="mb-caption">{t(text.sectionHeader)}</p>
          <SectionHeader title={t(text.flashTitle)} aside={<Countdown startSeconds={5574} label={t(text.remaining)} />} action={<Button size="sm">{t(text.viewAll)}</Button>} />
          <Grid>
            <Col span={{ base: 4, sm: 4, md: 3 }}>
              <p className="mb-caption">{t(text.flashCard)}</p>
              <FlashSaleCard
                flashLabel="FLASH SALE"
                imageLabel={t(text.sampleName)}
                name={t(text.saleName)}
                price="฿1,490"
                originalPrice="฿2,490"
                discount="-40%"
                soldText={t(text.soldText)}
                stockText={t(text.leftText)}
                progress={50}
                buyLabel={t(text.buyNow)}
                onBuy={() => {}}
              />
            </Col>
            <Col span={{ base: 4, sm: 8, md: 9 }}>
              <p className="mb-caption">{t(text.tileMosaic)}</p>
              <TileMosaic tiles={[t(text.tileA), t(text.tileB), t(text.tileC), t(text.tileD), t(text.tileE)]} onSelect={() => {}} />
            </Col>
          </Grid>
          <p className="mb-caption">{t(text.brandChip)}</p>
          <div className="row">
            {[text.brandA, text.brandB, text.brandC].map((b, i) => (
              <div key={i} style={{ width: 'calc(var(--space-8) * 2)' }}><BrandChip name={t(b)} onSelect={() => {}} /></div>
            ))}
          </div>
        </div>
      </Block>
      <Block number="4.10" title={t(text.c410)} note={t(text.c410Note)}>
        <div className="stack">
          <Grid>
            <Col span={{ base: 4, sm: 4, md: 4 }}>
              <p className="mb-caption">{t(text.articleCard)}</p>
              <ArticleCard category={t(text.articleCategory)} views="4.19k" title={t(text.articleTitle)} readLabel={t(text.readMore)} onRead={() => {}} />
            </Col>
            <Col span={{ base: 4, sm: 4, md: 8 }}>
              <p className="mb-caption">{t(text.benefitBar)}</p>
              <BenefitBar title={t(text.benefitTitle)} text={t(text.benefitText)} items={[{ title: t(text.benefit1), text: t(text.benefitText) }, { title: t(text.benefit2), text: t(text.benefitText) }, { title: t(text.benefit3), text: t(text.benefitText) }]} />
            </Col>
          </Grid>
          <p className="mb-caption">{t(text.siteFooter)}</p>
          <SiteFooter
            logo={<Logo name={t(text.brandName)} tone="on-dark" />}
            contact={[t(text.footerContact)]}
            socials={['Facebook', 'Line']}
            stores={['App Store', 'Google Play']}
            perks={[{ title: t(text.benefit1), text: t(text.benefitText) }, { title: t(text.benefit2), text: t(text.benefitText) }]}
            columns={[{ title: t(text.footerColumn), links: [{ label: t(text.footerLink) }, { label: t(text.footerLink), to: '/moodboard' }] }]}
            certTitle={t(text.footerColumn)}
            hoursNote={t(text.footerLink)}
            complaint={{ label: t(text.footerLink), to: '/moodboard' }}
            copyright={`© 2026 ${t(text.brandName)}`}
            legal={[{ label: t(text.footerLink), to: '/moodboard' }, { label: t(text.footerLink) }]}
            payments={['Credit card', 'PromptPay']}
          />
        </div>
      </Block>
      <Block number="4.11" title={t(text.c411)} note={t(text.c411Note)}>
        <MegaMenu
          nodes={[
            {
              label: t(text.megaCat1),
              children: [
                { label: t(text.megaSub1), children: [{ label: t(text.megaLeaf1) }, { label: t(text.megaLeaf2) }, { label: t(text.megaLeaf3) }] },
                { label: t(text.megaSub2), children: [{ label: t(text.megaLeaf2) }, { label: t(text.megaLeaf3) }] },
                { label: t(text.megaSub3) },
              ],
            },
            { label: t(text.megaCat2), children: [{ label: t(text.megaSub2), children: [{ label: t(text.megaLeaf1) }] }] },
          ]}
          title={t(text.megaTitle)}
          viewAllLabel={t(text.viewAll)}
          backLabel={t(text.megaBack)}
          emptyText={t(text.megaEmpty)}
          onSelect={() => {}}
        />
      </Block>
      <Block number="4.12" title={t(text.c412)} note={t(text.c412Note)}>
        <div className="stack">
          <p className="mb-caption">{t(text.breadcrumb)}</p>
          <Breadcrumb label={t(text.breadcrumb)} items={[{ label: t(text.home), to: '/moodboard' }, { label: t(text.crumbMid), to: '/moodboard' }, { label: t(text.crumbLast) }]} />
          <Grid>
            <Col span={{ base: 4, sm: 8, md: 5 }}>
              <p className="mb-caption">{t(text.gallery)}</p>
              <ProductGallery name={t(text.sampleName)} frameLabels={[1, 2, 3, 4, 5].map((n) => `${t(text.frame)} ${n}`)} prevLabel={t(text.prevImage)} nextLabel={t(text.nextImage)} />
            </Col>
            <Col span={{ base: 4, sm: 8, md: 7 }}>
              <p className="mb-caption">{t(text.tabs)}</p>
              <Tabs
                label={t(text.tabs)}
                tabs={[
                  { id: 'mb-one', label: t(text.tabOneLabel), content: <p>{t(text.tabBody)}</p> },
                  { id: 'mb-two', label: t(text.tabTwoLabel), content: <p>{t(text.tabBody)}</p> },
                  { id: 'mb-three', label: t(text.tabThreeLabel), content: <p>{t(text.tabBody)}</p> },
                ]}
              />
            </Col>
          </Grid>
          <p className="mb-caption">{t(text.stickyBar)}</p>
          <StickyActionBar
            inline
            visible
            name={t(text.sampleName)}
            price="฿1,200"
            actions={<><Button variant="secondary" size="sm">{t(text.addToCart)}</Button><Button size="sm">{t(text.buyNowLabel)}</Button></>}
          />
        </div>
      </Block>
      <Block number="4.13" title={t(text.c413)} note={t(text.c413Note)}>
        <div className="stack">
          <StepPill step={2} label={t(text.stepLabel)} progress={t(text.stepProgress)} />
          <Select label={t(text.selectLabel)} id="mb-select" placeholder={t(text.selectPlaceholder)} options={[{ value: 'a', label: t(text.optionA) }, { value: 'b', label: t(text.optionB) }]} hint={t(text.selectHint)} />
          <Switch checked={switched} onChange={setSwitched} label={t(text.switchLabel)} description={t(text.switchDesc)} />
          <Checkbox checked={ticked} onChange={setTicked} label={t(text.checkboxLabel)} />
          <Notice tone="info" title={t(text.noticeInfo)}>{t(text.noticeBody)}</Notice>
          <Notice tone="success" title={t(text.noticeSuccess)} />
          <Notice tone="error" title={t(text.noticeError)} />
        </div>
      </Block>
      <Block number="4.14" title={t(text.c414)} note={t(text.c414Note)}>
        <div className="stack">
          <p className="mb-caption">{t(text.settingRow)}</p>
          <Card>
            <SettingRow label={t(text.settingName)} value={t(text.settingValue)} emptyText={t(text.settingEmpty)} actionLabel={t(text.settingChange)} saveLabel={t(text.settingSave)} cancelLabel={t(text.settingCancel)} />
            <SettingRow label={t(text.settingPhone)} emptyText={t(text.settingEmpty)} actionLabel={t(text.settingAdd)} saveLabel={t(text.settingSave)} cancelLabel={t(text.settingCancel)} />
          </Card>
        </div>
      </Block>
      <Block number="4.15" title={t(text.c415)} note={t(text.c415Note)}>
        <div className="stack">
          <p className="mb-caption">{t(text.memberBanner)}</p>
          <MemberBanner tier={t(text.tierName)} points="1,280" pointsLabel={t(text.pointsWord)} progress={35} progressText={t(text.progressSample)} progressLabel={t(text.pointsWord)} perksLabel={t(text.perksWord)} action={<Button size="sm">{t(text.redeemWord)}</Button>} />
          <p className="mb-caption">{t(text.statCard)}</p>
          <div className="stat-grid">
            <StatCard label={t(text.pointsWord)} value="1,280" note={t(text.statNote)} />
            <StatCard label={t(text.couponWord)} value="3" note={t(text.statNote)} />
          </div>
          <Grid>
            <Col span={{ base: 4, sm: 4, md: 5 }}>
              <p className="mb-caption">{t(text.accountSidebar)}</p>
              <AccountSidebar name={t(text.settingValue)} email="sample@example.com" badge={t(text.tierName)} groups={[{ title: t(text.groupSample), items: [{ to: '/moodboard', label: t(text.acctProfile), active: true }, { to: '/moodboard', label: t(text.acctOrders), active: false }] }]} logoutLabel={t(text.logoutWord)} onLogout={() => {}} />
            </Col>
            <Col span={{ base: 4, sm: 4, md: 7 }}>
              <p className="mb-caption">{t(text.bottomTabs)}</p>
              <BottomTabBar inline label={t(text.bottomTabs)} items={[{ to: '/moodboard', label: t(text.acctProfile), active: true }, { to: '/moodboard', label: t(text.acctOrders), active: false }, { to: '/moodboard', label: t(text.couponWord), active: false }]} />
            </Col>
          </Grid>
        </div>
      </Block>
      <Block number="4.16" title={t(text.c416)} note={t(text.c416Note)}>
        <div className="stack">
          <CartItem
            checked={cartOn}
            onCheck={setCartOn}
            checkLabel={t(text.cartSelect)}
            thumb={<ProductImage label={t(text.sampleName)} />}
            skuLabel="SKU"
            sku="SKU-00000001"
            name={<strong>{t(text.sampleName)}</strong>}
            status={t(text.cartReady)}
            price="฿1,200"
            quantity={<QuantityStepper value={cartQty} label={t(text.qty)} decreaseLabel="-" increaseLabel="+" onChange={setCartQty} />}
            removeLabel={t(text.cartRemove)}
            onRemove={() => {}}
          />
          <CartItem
            checked={false}
            onCheck={() => {}}
            checkLabel={t(text.cartSelect)}
            disabled
            thumb={<ProductImage label={t(text.sampleName)} />}
            skuLabel="SKU"
            sku="SKU-00000002"
            name={<strong>{t(text.sampleName)}</strong>}
            status={t(text.cartSoldOut)}
            statusTone="danger"
            price="฿320"
            quantity={<QuantityStepper value={1} label={t(text.qty)} decreaseLabel="-" increaseLabel="+" onChange={() => {}} />}
            removeLabel={t(text.cartRemove)}
            onRemove={() => {}}
          />
        </div>
      </Block>
      <Block number="4.17" title={t(text.c417)} note={t(text.c417Note)}>
        <div className="stack">
          <p className="mb-caption">{t(text.categoryCard)}</p>
          <CategoryCard title={t(text.sampleName)} text={t(text.sampleList)} actionLabel={t(text.shopNowWord)} to="/moodboard" thumb={<ProductImage label={t(text.sampleName)} />} />
          <p className="mb-caption">{t(text.categoryTile)}</p>
          <div className="listing-grid">
            <CategoryTile title={t(text.sampleName)} to="/moodboard" thumb={<ProductImage label={t(text.sampleName)} />} />
            <CategoryTile title={t(text.sampleName)} to="/moodboard" thumb={<ProductImage label={t(text.sampleName)} />} />
          </div>
          <p className="mb-caption">{t(text.categoryPills)}</p>
          <CategoryPills label={t(text.categoryPills)} items={[{ label: t(text.allWord), to: '/moodboard', active: false }, { label: t(text.optionA), to: '/moodboard', active: true }, { label: t(text.optionB), to: '/moodboard', active: false }]} />
          <p className="mb-caption">{t(text.filterGroup)}</p>
          <FilterGroup title={t(text.brandWord)} options={[{ id: 'a', label: t(text.optionA), count: 6, checked: filterOn.includes('a') }, { id: 'b', label: t(text.optionB), count: 2, checked: filterOn.includes('b') }]} onToggle={(id) => setFilterOn(filterOn.includes(id) ? filterOn.filter((x) => x !== id) : [...filterOn, id])} />
        </div>
      </Block>
      <Block number="4.18" title={t(text.c418)} note={t(text.c418Note)}>
        <div className="stack">
          <div className="listing-grid">
            <ProductCard to="/moodboard" imageLabel={t(text.sampleName)} badges={<Badge>{t(text.brandWord)}</Badge>} name={t(text.longName)} price="฿1,090" action={<Button size="sm">{t(text.addToCart)}</Button>} />
            <ProductCard to="/moodboard" imageLabel={t(text.sampleName)} badges={<Badge>{t(text.brandWord)}</Badge>} name={t(text.sampleName)} price="฿355" action={<Button size="sm">{t(text.addToCart)}</Button>} />
          </div>
          <p className="muted">{t(text.productCardRule)}</p>
        </div>
      </Block>
      <Block number="4.19" title={t(text.c419)} note={t(text.c419Note)}>
        <div className="stack">
          <p className="mb-caption">{t(text.dropdownMenu)}</p>
          <div className="row">
            <DropdownMenu variant="button" trigger={t(text.dropdownTrigger)} items={[{ id: 'a', label: t(text.optionA), detail: t(text.optionDetail), active: true }, { id: 'b', label: t(text.optionB), detail: t(text.optionDetail) }]} footer={<span>{t(text.dropdownFooter)}</span>} />
          </div>
          <p className="mb-caption">{t(text.dropdownBar)}</p>
          <UtilityBar items={[t(text.branchHours), <DropdownMenu key="m" trigger={t(text.branchName)} items={[{ id: 'a', label: t(text.optionA), detail: t(text.optionDetail), active: true }, { id: 'b', label: t(text.optionB), detail: t(text.optionDetail) }]} />]} />
          <p className="mb-caption">{t(text.branchCard)}</p>
          <BranchCard name={t(text.branchName)} address={t(text.branchAddress)} hours={t(text.branchHours)} province={t(text.branchProvince)} selected={false} selectedLabel={t(text.branchMine)} chooseLabel={t(text.branchChoose)} onChoose={() => {}} />
          <BranchCard name={t(text.branchName)} address={t(text.branchAddress)} hours={t(text.branchHours)} province={t(text.branchProvince)} selected selectedLabel={t(text.branchMine)} chooseLabel={t(text.branchChoose)} onChoose={() => {}} />
        </div>
      </Block>
    </Chapter>
  )
}
