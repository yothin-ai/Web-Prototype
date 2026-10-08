import { useDataset } from '../../datasets/DatasetContext'
import { useDemoState } from '../../state/demoState'

export const PROTOTYPE_ID = 'landing'
export type Lead = { name: string; email: string; company: string; interestId: string }

export const useLanding = () => useDataset().dataset.landing
export const useLead = () => useDemoState<Lead | null>(PROTOTYPE_ID, 'lead', null)
