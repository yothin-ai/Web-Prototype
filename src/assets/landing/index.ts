import hero from './hero-default.jpg'
import vibestudio from './product-vibestudio.jpg'
import vibekit from './product-vibekit.jpg'
import gallery1 from './gallery-1.jpg'
import gallery2 from './gallery-2.jpg'
import gallery3 from './gallery-3.jpg'
import course1 from './course-1.jpg'
import course2 from './course-2.jpg'
import article1 from './article-1.jpg'
import article2 from './article-2.jpg'
import article3 from './article-3.jpg'
import article4 from './article-4.jpg'
import toolClaude from './tools/claude.svg'
import toolOpenai from './tools/openai.svg'
import toolCursor from './tools/cursor.svg'
import toolVercel from './tools/vercel.svg'
import toolNetlify from './tools/netlify.svg'
import toolCloudflare from './tools/cloudflare.svg'
import toolSupabase from './tools/supabase.svg'
import toolGithub from './tools/github.svg'

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

// One cover per article in `articles.items`.
export const articleImages = [article1, article2, article3, article4]

// The tools' own marks, unchanged (CC0 or MIT copies from theSVG; the marks stay the property of their owners).
// Keyed by the `logo` of each tool in `partners.groups`.
export const toolLogos: Record<string, string> = {
  claude: toolClaude,
  openai: toolOpenai,
  cursor: toolCursor,
  vercel: toolVercel,
  netlify: toolNetlify,
  cloudflare: toolCloudflare,
  supabase: toolSupabase,
  github: toolGithub,
}
