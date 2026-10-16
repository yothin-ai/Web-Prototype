import { useDemoState } from '../../state/demoState'
import { PROTOTYPE_ID } from './cart'

export type CookieChoice = { decided: boolean; analytics: boolean; marketing: boolean }

// What the shopper agreed to. Nothing is decided on the first visit, so the notice shows until a choice is made.
export const useCookieChoice = () => useDemoState<CookieChoice>(PROTOTYPE_ID, 'cookies', { decided: false, analytics: false, marketing: false })
