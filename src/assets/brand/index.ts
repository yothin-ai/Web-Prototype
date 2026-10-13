import appStore from './app-store.avif'
import facebook from './facebook.avif'
import googlePlay from './google-play.avif'
import instagram from './instagram.avif'
import line from './line.avif'
import paymentMethods from './payment-methods.avif'
import tiktok from './tiktok.avif'
import x from './x.avif'
import youtube from './youtube.avif'

// Third-party badges and logos supplied for the storefront. They are the owners' trademarks,
// shown here only so the prototype looks like a finished shop; nothing links to them.
export const storeBadges = [
  { label: 'App Store', src: appStore },
  { label: 'Google Play', src: googlePlay },
]
export const paymentStrip = { alt: 'Mastercard, Visa, JCB, ttb, Krungthai, Bangkok Bank, SCB, Krungsri, Kasikorn', src: paymentMethods }
export const socialIcons = [
  { label: 'Facebook', src: facebook },
  { label: 'Line', src: line },
  { label: 'Instagram', src: instagram },
  { label: 'YouTube', src: youtube },
  { label: 'TikTok', src: tiktok },
  { label: 'X', src: x },
]
