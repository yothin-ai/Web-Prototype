import slide1 from './hardware-slide-1.jpg'
import slide2 from './hardware-slide-2.jpg'
import slide3 from './hardware-slide-3.jpg'
import slide4 from './hardware-slide-4.jpg'
import slide5 from './hardware-slide-5.jpg'
import promoStrip from './hardware-promo-strip.jpg'

// Advertising pictures for the home page, by dataset (resized copies of the originals in src/assets/brand/slide-banner and
// promo-strip). The Thai headline is part of the picture, so the pictures are used in Thai only; a dataset without
// pictures, or the English page, keeps the plain text banners. The slides follow the order of `home.slides`.
export const slideImages: Record<string, string[]> = {
  hardware: [slide1, slide2, slide3, slide4, slide5],
}
export const promoStripImages: Record<string, string> = {
  hardware: promoStrip,
}
