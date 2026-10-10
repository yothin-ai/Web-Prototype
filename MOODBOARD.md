# Moodboard rules

`/moodboard` shows how the system looks. The values live in [`src/tokens/tokens.ts`](src/tokens/tokens.ts) and the shared components in [`src/ui/`](src/ui/index.tsx). Read this file before writing any UI. The decision is recorded in [ADR 0001](docs/adr/0001-moodboard-is-the-only-ui-source.md).

## Rules

1. **Only tokens.** Colors, fonts, font sizes, spacing, radii and shadows come from CSS variables (`var(--color-accent)`, `var(--space-4)` and so on). Never write a hex, `rgb()`, a font name, or a media query outside `src/tokens/`. `npm run check:tokens` enforces this.
2. **Only shared components.** Build from `Button`, `Card`, `Badge`, `Field`, `Grid`, `Col`, `ProductImage`, `QuantityStepper`, `DataRow`, `ChoiceGroup`, `ChoiceCard`, `Hero`, `Accordion`, `Quote`, `ProgressBar`, `NavTabs`, and the storefront blocks `IconCircle`, `PromoStrip`, `UtilityBar`, `SiteHeader`, `CategoryNav`, `Carousel` (with `BannerSlide`), `ShortcutRow`/`ShortcutCard`, `AppPromoCard`, and the sale blocks `SectionHeader` (with `Countdown`), `FlashSaleCard`, `TileMosaic` and `BrandChip`, and the content blocks `ArticleCard`, `BenefitBar` and `SiteFooter`, and `MegaMenu` (the three-level category panel), and the product-page blocks `Breadcrumb`, `ProductGallery`, `Tabs` and `StickyActionBar`, and the form blocks `StepPill`, `Select`, `Switch`, `Checkbox` and `Notice`, and the account blocks `SettingRow`, `AccountSidebar`, `MemberBanner`, `StatCard` and `BottomTabBar`, the cart block `CartItem`, and the category blocks `CategoryCard`, `CategoryTile`, `CategoryPills` and `FilterGroup`. Icons are not drawn yet: use `IconCircle` wherever an icon belongs. Use the `row__grow` class to push the next item in a `row` to the far end. If a Prototype needs something else (a price table, a video player), propose it to the user first. Add it to `src/ui/` and `/moodboard` only after they approve.
3. **One layout container.** Pages use `Grid` and `Col`: 4 columns on phones, 8 from `sm`, 12 from `md`. Do not write custom breakpoints; change the numbers in `tokens.breakpoint` if they ever need to move.
4. **Both languages.** Every visible string is a `{ th, en }` pair. Prototype content lives in a Dataset, never in the component.
5. **Responsive from the start.** Check every page on a phone width and a laptop width.

## Color roles

| Token | Use |
| --- | --- |
| `bg` | Page background |
| `surface` | Cards, forms, bars |
| `surfaceAlt` | Secondary or subtly separated areas |
| `border` | Borders and dividers |
| `text` / `textMuted` | Primary and secondary text |
| `accent` / `accentHover` / `accentText` | Primary actions and links; one accent action per screen |
| `accentSoft` | Soft highlights such as badges and selected items |
| `success` / `warning` / `danger` | Status; `danger` also marks destructive actions |

## Starting direction

The current values are a neutral starting point: warm off-white surfaces, an indigo accent, Inter with Noto Sans Thai, and generous rounded corners. Change `tokens.ts` and the whole system follows.
