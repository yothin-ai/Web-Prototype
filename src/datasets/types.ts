import type { Localized } from '../i18n'

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
}

export type Choice = { id: string; name: Localized; detail: Localized; price?: number }

export type Slide = { title: Localized; text: Localized }
export type Shortcut = { title: Localized; text: Localized; tag: Localized }

// What the storefront home page shows. Labels that never change per business live in the page's own strings.
export type EcommerceHome = {
  promoStrip: Localized
  utility: Localized[]
  categories: Localized[]
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
}

export type EcommerceContent = {
  home: EcommerceHome
  products: Product[]
  shippingMethods: Choice[]
  paymentMethods: Choice[]
}

export type TitledText = { title: Localized; body: Localized }

export type LandingContent = {
  badge: Localized
  featuresTitle: Localized
  finalTitle: Localized
  formTitle: Localized
  companyLabel: Localized
  interestLabel: Localized
  headline: Localized
  subheadline: Localized
  cta: Localized
  features: TitledText[]
  steps: TitledText[]
  testimonials: { quote: Localized; author: Localized }[]
  faqs: { question: Localized; answer: Localized }[]
  interests: Choice[]
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
