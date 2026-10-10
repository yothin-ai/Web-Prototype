import { useDemoState } from '../../state/demoState'
import { PROTOTYPE_ID } from './cart'

export type Profile = { name: string; phone: string; email: string }

// Edits to the sample shopper; an empty name or email falls back to the Dataset's sample.
export const useProfile = () => useDemoState<Profile>(PROTOTYPE_ID, 'profile', { name: '', phone: '', email: '' })
