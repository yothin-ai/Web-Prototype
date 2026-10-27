import hero from './hero-default.jpg'
import vibestudio from './product-vibestudio.jpg'
import vibekit from './product-vibekit.jpg'
import gallery1 from './gallery-1.jpg'
import gallery2 from './gallery-2.jpg'
import gallery3 from './gallery-3.jpg'
import course1 from './course-1.jpg'
import course2 from './course-2.jpg'

// The pictures of the Landing page (resized copies of the originals in src/assets/brand/Landing). None of them
// carries text, so they are shown in both languages. Lists follow the order of the items in content.ts.

// The picture behind the opening band.
export const heroImage = hero

// One picture per product in `solutions.products`.
export const productImages = [vibestudio, vibekit]

// One picture per slide in `academy.gallery`.
export const galleryImages = [gallery1, gallery2, gallery3]

// One cover per course in `academy.courses`.
export const courseImages = [course1, course2]
