import { useDemoState } from '../../state/demoState'
import { PROTOTYPE_ID } from './cart'

export type Profile = { name: string; phone: string; email: string }

// Edits to the sample shopper; an empty name or email falls back to the Dataset's sample.
export const useProfile = () => useDemoState<Profile>(PROTOTYPE_ID, 'profile', { name: '', phone: '', email: '' })

// Whether the shopper is signed in. The demo starts signed in as the sample shopper; the
// "Sign out" button turns this off and the account pages then send you to the sign-in page.
export const useSignedIn = () => useDemoState<boolean>(PROTOTYPE_ID, 'signedIn', true)

// Where to go after signing in: the page you were sent from, if it is inside this prototype.
export const safeNext = (next: string | null, fallback: string) => (next && next.startsWith(`/${PROTOTYPE_ID}`) ? next : fallback)
