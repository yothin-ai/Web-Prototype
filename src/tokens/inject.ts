import { tokens } from './tokens'

const STYLE_ID = 'design-tokens'

function cssVars(): string {
  const lines: string[] = []
  for (const [name, value] of Object.entries(tokens.color)) lines.push(`--color-${kebab(name)}: ${value};`)
  lines.push(`--font-family: ${tokens.font.family};`, `--font-mono: ${tokens.font.mono};`)
  for (const [name, value] of Object.entries(tokens.font.size)) lines.push(`--font-size-${name}: ${value};`)
  for (const [name, value] of Object.entries(tokens.font.weight)) lines.push(`--font-weight-${name}: ${value};`)
  for (const [name, value] of Object.entries(tokens.font.lineHeight)) lines.push(`--line-height-${name}: ${value};`)
  for (const [name, value] of Object.entries(tokens.space)) lines.push(`--space-${name}: ${value};`)
  for (const [name, value] of Object.entries(tokens.icon.size)) lines.push(`--icon-size-${name}: ${value};`)
  for (const [name, value] of Object.entries(tokens.radius)) lines.push(`--radius-${name}: ${value};`)
  for (const [name, value] of Object.entries(tokens.shadow)) lines.push(`--shadow-${name}: ${value};`)
  lines.push(`--grid-gutter: ${tokens.grid.gutter};`, `--grid-max-width: ${tokens.grid.maxWidth};`)
  return `:root {\n  ${lines.join('\n  ')}\n}`
}

// The grid is generated here because media queries cannot read CSS variables.
function gridCss(): string {
  const { breakpoint, grid } = tokens
  const spans = (cls: string, count: number) =>
    Array.from({ length: count }, (_, i) => `.${cls}-${i + 1} { grid-column: span ${i + 1}; }`).join(' ')
  const at = (width: number, css: string) => `@media (min-width: ${width}px) { ${css} }`
  // A tile mosaic reacts to its own width, not the window's, so it fits any column it is placed in.
  const mosaic = [
    `.tile-mosaic { container-type: inline-size; }`,
    `.tile-mosaic__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .tile-mosaic__grid > :first-child { grid-column: span 2; }`,
    `@container (min-width: ${breakpoint.sm}px) { .tile-mosaic__grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } .tile-mosaic__grid > :first-child { grid-row: span 2; } }`,
  ].join('\n')
  // The product gallery puts thumbnails beside the picture only when its own column is wide enough.
  const galleryMin = 480
  const gallery = [
    `.gallery { container-type: inline-size; }`,
    `.gallery__layout { display: flex; flex-direction: column-reverse; gap: var(--space-3); }`,
    `.gallery__thumbs { display: flex; flex-direction: row; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }`,
    `@container (min-width: ${galleryMin}px) { .gallery__layout { flex-direction: row; } .gallery__thumbs { flex-direction: column; overflow-x: visible; overflow-y: auto; } }`,
  ].join('\n')
  return [
    `.grid { display: grid; grid-template-columns: repeat(${grid.columns.base}, minmax(0, 1fr)); gap: var(--grid-gutter); max-width: var(--grid-max-width); margin-inline: auto; padding-inline: var(--space-4); width: 100%; box-sizing: border-box; }`,
    `.col { grid-column: 1 / -1; min-width: 0; }`,
    spans('col', grid.columns.base),
    at(breakpoint.sm, `.grid { grid-template-columns: repeat(${grid.columns.sm}, minmax(0, 1fr)); } .col-sm-full { grid-column: 1 / -1; } ${spans('col-sm', grid.columns.sm)}`),
    mosaic,
    gallery,
    `.site-header { position: relative; }`,
    // From the sm breakpoint the site header follows the page, just under the Shell bar.
    at(breakpoint.sm, `.site-header { position: sticky; top: var(--shell-bar-height, 0px); }`),
    // Account area: the side menu shows from md up; below that a bottom tab bar takes over.
    `.account-aside { display: none; } .account-menu-only { display: block; } .bottom-tabs { display: grid; } .account-page { padding-bottom: calc(var(--space-8) * 2); } .account-split { grid-template-columns: minmax(0, 1fr); } .stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }`,
    at(breakpoint.sm, `.stat-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }`),
    // Product listings: filters fold away and the grid has two columns on a phone, more as the screen widens.
    `.listing-filters { display: none; } .listing-filters--open { display: flex; } .listing-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }`,
    at(breakpoint.sm, `.listing-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }`),
    at(breakpoint.md, `.listing-filters { display: flex; } .btn.listing-toggle { display: none; } .listing-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }`),
    at(breakpoint.md, `.account-aside { display: block; } .account-menu-only { display: none; } .bottom-tabs { display: none; } .account-page { padding-bottom: 0; } .account-split { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }`),
    at(breakpoint.md, `.checkout-aside { position: sticky; top: calc(var(--shell-bar-height, 0px) + var(--site-header-height, 0px) + var(--space-4)); }`),
    at(breakpoint.md, `.grid { grid-template-columns: repeat(${grid.columns.md}, minmax(0, 1fr)); } .col-md-full { grid-column: 1 / -1; } ${spans('col-md', grid.columns.md)}`),
  ].join('\n')
}

function kebab(name: string): string {
  return name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
}

export function injectTokens(): void {
  let el = document.getElementById(STYLE_ID)
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    document.head.prepend(el)
  }
  el.textContent = `${cssVars()}\n${gridCss()}`
}
