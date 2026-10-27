import type { Choice, TitledText } from '../../datasets/types'
import type { Localized } from '../../i18n'

// The interest ids `journey`, `product1`, `product2` and `course` are fixed: the page's buttons preselect them in the form.
export type LandingProduct = { headline: Localized; name: Localized; tagline: Localized; features: TitledText[]; cta: Localized }

export type LandingContent = {
  brand: Localized
  hero: { lead: Localized; title: Localized; emphasis: Localized; highlight: Localized; text: Localized; cta: Localized; more: Localized }
  clients: { title: Localized; groups: { label: Localized; names: string[] }[] }
  solutions: { title: Localized; text: Localized; products: LandingProduct[] }
  academy: { title: Localized; text: Localized; viewAll: Localized; gallery: Localized[]; courses: { tag: Localized; title: Localized; meta: Localized }[] }
  partners: { title: Localized; text: Localized; groups: { label: Localized; tools: { name: string; logo: string }[] }[]; note: Localized }
  articles: { title: Localized; text: Localized; items: { category: Localized; title: Localized; summary: Localized }[] }
  faq: { title: Localized; text: Localized; items: { question: Localized; answer: Localized }[] }
  contact: { company: Localized; address: Localized; phone: string; email: string }
  form: { title: Localized; companyLabel: Localized; interestLabel: Localized; interests: Choice[]; perks: TitledText[] }
}
