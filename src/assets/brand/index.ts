import appStore from './app-store.avif'
import googlePlay from './google-play.avif'
import paymentMethods from './payment-methods.avif'

// Third-party badges and logos supplied for the storefront. They are the owners' trademarks,
// shown here only so the prototype looks like a finished shop; nothing links to them.
export const storeBadges = [
  { label: 'App Store', src: appStore },
  { label: 'Google Play', src: googlePlay },
]
export const paymentStrip = { alt: 'Mastercard, Visa, JCB, ttb, Krungthai, Bangkok Bank, SCB, Krungsri, Kasikorn', src: paymentMethods }
