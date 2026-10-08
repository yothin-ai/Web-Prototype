import type { Dataset } from './types'

const modules = import.meta.glob<{ default: Dataset }>('./*/index.ts', { eager: true })

// The generic dataset comes first; the rest follow alphabetically.
export const datasets: Dataset[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.id === 'default' ? -1 : b.id === 'default' ? 1 : a.id.localeCompare(b.id)))
export const defaultDataset: Dataset = datasets[0]
