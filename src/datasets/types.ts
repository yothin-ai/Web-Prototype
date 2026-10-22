import type { Localized } from '../i18n'

export type ProductDetail = {
  sku: string
  unit: Localized
  standard?: Localized
  // Path shown after "Home" in the breadcrumb, ending before the product name.
  path?: Localized[]
  highlights: Localized[]
  general: Localized[]
  details: Localized[]
  install: Localized
  warranty: Localized
  caution: Localized
  specs: { label: Localized; value: Localized }[]
  related?: string[]
}

// Store-wide facts shown on every product page. Placeholder values, kept here so they can change per dataset.
export type Coupon = {
  id: string
  title: Localized
  detail: Localized
  kind: 'amount' | 'percent' | 'freeship'
  value: number
  // Largest discount a percentage coupon can give.
  cap?: number
  minSpend: number
  // Where it is spent: at checkout online, or at a store till.
  channel: 'online' | 'store'
  starts: string
  expires: string
  memberOnly?: boolean
  // Already past its date (a fixed flag so the demo looks the same every day).
  expired?: boolean
  // All the coupons are taken; it cannot be claimed any more.
  full?: boolean
  // Points a member pays to get this coupon; such a coupon is not on the public coupon page.
  redeemCost?: number
}

// Checkout content: coupons, instalment banks and the bank-transfer account (all placeholders).
// The sample shopper shown on the account page: no real person.
export type AccountContent = { name: Localized; email: string; provider: Localized; memberNo: string; points: number; tier: Localized; nextTier: Localized; toNext: number; spent: number }

export type CheckoutContent = {
  coupons: Coupon[]
  banks: Localized[]
  installmentMonths: number[]
  transfer: { bank: Localized; name: Localized; number: string }
  paymentWindowMinutes: number
}

export type StoreInfo = {
  stockDefault: number
  shelf: Localized
  delivery: Localized
  pickupMinutes: number
  installmentMin: number
  installmentMonths: number
}

export type Product = {
  id: string
  name: Localized
  description: Localized
  category: Localized
  price: number
  brand?: Localized
  // Set on Flash Sale items: the price before the discount and the stock figures.
  originalPrice?: number
  sold?: number
  stock?: number
  detail?: ProductDetail
}

export type Choice = { id: string; name: Localized; detail: Localized; price?: number }

// A node of the category tree. The Storefront menu shows three levels: category, subcategory, item.
export type MenuNode = { label: Localized; children?: MenuNode[] }
export type Article = { category: Localized; views: string; title: Localized }
export type Slide = { title: Localized; text: Localized }
export type Shortcut = { title: Localized; text: Localized; tag: Localized }

// What the storefront home page shows. Labels that never change per business live in the page's own strings.
export type EcommerceHome = {
  promoStrip: Localized
  utility: Localized[]
  categories: Localized[]
  menu: MenuNode[]
  assistant: Localized
  slides: Slide[]
  app: { title: Localized; subtitle: Localized; coupon: number; club: Localized; earnBaht: number }
  shortcuts: Shortcut[]
  circles: Localized[]
  flashIds: string[]
  flashStartSeconds: number
  jobsTitle: Localized
  jobs: Localized[]
  brands: Localized[]
  recommendedIds: string[]
  ideasTitle: Localized
  articles: Article[]
  trust: { title: Localized; text: Localized }
}

export type EcommerceContent = {
  home: EcommerceHome
  store: StoreInfo
  account: AccountContent
  checkout: CheckoutContent
  products: Product[]
  shippingMethods: Choice[]
  paymentMethods: Choice[]
}

export type TitledText = { title: Localized; body: Localized }

// The interest ids `journey`, `product1`, `product2` and `course` are fixed: the page's buttons preselect them in the form.
export type LandingProduct = { headline: Localized; name: Localized; tagline: Localized; features: TitledText[]; cta: Localized }

export type LandingContent = {
  hero: { lead: Localized; title: Localized; text: Localized; cta: Localized; more: Localized }
  clients: { title: Localized; groups: { label: Localized; names: string[] }[] }
  solutions: { title: Localized; text: Localized; products: LandingProduct[] }
  academy: { title: Localized; text: Localized; viewAll: Localized; courses: { tag: Localized; title: Localized; meta: Localized }[] }
  partners: { title: Localized; text: Localized; names: string[] }
  articles: { title: Localized; text: Localized; items: { category: Localized; title: Localized; summary: Localized }[] }
  faq: { title: Localized; text: Localized; items: { question: Localized; answer: Localized }[] }
  contact: { company: Localized; address: Localized; phone: string; email: string }
  form: { title: Localized; companyLabel: Localized; interestLabel: Localized; interests: Choice[]; perks: TitledText[] }
}

export type Lesson = { id: string; title: Localized; body: Localized; minutes: number }

export type QuizQuestion = {
  id: string
  question: Localized
  options: { id: string; text: Localized }[]
  correctId: string
}

export type Course = {
  id: string
  title: Localized
  summary: Localized
  level: Localized
  lessons: Lesson[]
  quiz: QuizQuestion[]
}

export type EducationContent = { courses: Course[] }

// A Dataset carries content and wording only, never styling (see GLOSSARY.md).
export type Dataset = {
  id: string
  name: Localized
  brandName: Localized
  tagline: Localized
  ecommerce: EcommerceContent
  landing: LandingContent
  education: EducationContent
}
