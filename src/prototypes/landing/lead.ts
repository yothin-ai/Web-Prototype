import { useDataset } from '../../datasets/DatasetContext'
import { useDemoState } from '../../state/demoState'

export const PROTOTYPE_ID = 'landing'
export type Lead = { name: string; email: string; company: string; interestId: string }

export const useLanding = () => useDataset().dataset.landing
export const useLead = () => useDemoState<Lead | null>(PROTOTYPE_ID, 'lead', null)

// The form's interest ids are fixed (see LandingContent); a button picks one with ?interest=.
export const signupPath = (search: string, interest: string) => {
  const params = new URLSearchParams(search)
  params.set('interest', interest)
  return `/${PROTOTYPE_ID}/signup?${params.toString()}`
}

// Scrolls to a section of the home page, without the animation when the visitor asked for less motion.
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' })
}
