import type { Localized } from '../i18n'

export type Product = {
  id: string
  name: Localized
  description: Localized
  category: Localized
  price: number
}

export type Choice = { id: string; name: Localized; detail: Localized; price?: number }

export type EcommerceContent = {
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
