// The single source of truth for the system's look. /moodboard renders these
// values, components read them as CSS variables, and nothing else may define
// colors, fonts, spacing or breakpoints (see MOODBOARD.md and ADR 0001).

export const tokens = {
  color: {
    bg: '#faf8f5',
    surface: '#ffffff',
    surfaceAlt: '#f3efe9',
    border: '#e4ddd3',
    text: '#1f2430',
    textMuted: '#5f6676',
    accent: '#3b3fd9',
    accentHover: '#2f33b8',
    accentText: '#ffffff',
    accentSoft: '#e8e9fc',
    success: '#1f8a5b',
    warning: '#9a6212',
    danger: '#c2392f',
  },
  font: {
    family: "'Inter Variable', 'Noto Sans Thai', system-ui, sans-serif",
    mono: "ui-monospace, 'SF Mono', Menlo, monospace",
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.75rem',
    },
    weight: { regular: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.25, normal: 1.65 },
  },
  space: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '24px', 6: '32px', 7: '48px', 8: '64px' },
  // Icon boxes and line weight (Lucide icons are drawn with strokes).
  icon: { size: { sm: '16px', md: '24px', lg: '32px' }, stroke: 2 },
  radius: { sm: '6px', md: '12px', lg: '20px', pill: '999px' },
  shadow: {
    sm: '0 1px 2px rgba(31, 36, 48, 0.08)',
    md: '0 6px 20px rgba(31, 36, 48, 0.10)',
  },
  // Viewport widths (px) where the grid gains columns.
  breakpoint: { sm: 640, md: 960 },
  grid: {
    columns: { base: 4, sm: 8, md: 12 },
    gutter: '16px',
    maxWidth: '1200px',
  },
} as const

export type ColorToken = keyof typeof tokens.color

// What each color is for. Shown on /moodboard and mirrored by MOODBOARD.md.
export const colorUsage: Record<ColorToken, { th: string; en: string }> = {
  bg: { th: 'พื้นหลังของทั้งหน้า', en: 'Page background' },
  surface: { th: 'พื้นของการ์ด ฟอร์ม และแถบ', en: 'Cards, forms and bars' },
  surfaceAlt: { th: 'พื้นรองหรือส่วนที่ต้องแยกออกเบา ๆ', en: 'Secondary or subtly separated areas' },
  border: { th: 'เส้นขอบและเส้นแบ่ง', en: 'Borders and dividers' },
  text: { th: 'ข้อความหลัก', en: 'Primary text' },
  textMuted: { th: 'ข้อความรองและคำอธิบาย', en: 'Secondary text and captions' },
  accent: { th: 'ปุ่มหลักและลิงก์ (1 จุดเด่นต่อหน้าจอ)', en: 'Primary actions and links' },
  accentHover: { th: 'สถานะ hover/กดของ accent', en: 'Hover and pressed state of accent' },
  accentText: { th: 'ข้อความบนพื้น accent', en: 'Text on accent backgrounds' },
  accentSoft: { th: 'พื้นเน้นแบบอ่อน เช่น ป้ายและรายการที่เลือก', en: 'Soft highlight, such as badges and selected items' },
  success: { th: 'สำเร็จ', en: 'Success' },
  warning: { th: 'คำเตือน', en: 'Warning' },
  danger: { th: 'ข้อผิดพลาดและการกระทำที่ลบหรือล้าง', en: 'Errors and destructive actions' },
}

type Text = { th: string; en: string }

// How the type tokens are combined into roles. Shown on /moodboard.
export const typeScale: {
  role: string
  size: keyof typeof tokens.font.size
  weight: keyof typeof tokens.font.weight
  lineHeight: keyof typeof tokens.font.lineHeight
  use: Text
}[] = [
  { role: 'Display', size: '3xl', weight: 'bold', lineHeight: 'tight', use: { th: 'หัวข้อใหญ่ใน Hero', en: 'Hero headline' } },
  { role: 'Heading 1', size: '2xl', weight: 'bold', lineHeight: 'tight', use: { th: 'หัวข้อหน้า', en: 'Page title' } },
  { role: 'Heading 2', size: 'xl', weight: 'bold', lineHeight: 'tight', use: { th: 'หัวข้อส่วนและชื่อแบรนด์', en: 'Section titles and brand name' } },
  { role: 'Heading 3', size: 'lg', weight: 'medium', lineHeight: 'tight', use: { th: 'หัวข้อการ์ด', en: 'Card titles' } },
  { role: 'Lead', size: 'lg', weight: 'regular', lineHeight: 'normal', use: { th: 'ประโยคนำใต้ Hero และคำพูดอ้างอิง', en: 'Sentence under a hero, and quotes' } },
  { role: 'Body', size: 'md', weight: 'regular', lineHeight: 'normal', use: { th: 'เนื้อหาทั่วไปและปุ่ม', en: 'General content and buttons' } },
  { role: 'Label', size: 'sm', weight: 'medium', lineHeight: 'normal', use: { th: 'ป้ายกำกับฟอร์ม ปุ่มเล็ก และเมนูแท็บ', en: 'Form labels, small buttons and tabs' } },
  { role: 'Caption', size: 'xs', weight: 'medium', lineHeight: 'normal', use: { th: 'ป้าย (Badge) และข้อความช่วยเหลือ', en: 'Badges and helper text' } },
]

export const spaceUsage: Record<keyof typeof tokens.space, Text> = {
  1: { th: 'ช่องว่างแคบสุด เช่น ภายในป้าย', en: 'Tightest gaps, such as inside badges' },
  2: { th: 'ช่องว่างระหว่างปุ่มเล็กและไอคอน', en: 'Between small buttons and icons' },
  3: { th: 'ช่องไฟในแถวและระยะแนวตั้งของปุ่ม', en: 'Row gaps and vertical button padding' },
  4: { th: 'ระยะระหว่างการ์ดและขอบหน้า (gutter)', en: 'Between cards and the page edge (gutter)' },
  5: { th: 'ระยะภายในการ์ดและปุ่ม', en: 'Inside cards and buttons' },
  6: { th: 'ระยะระหว่างส่วนของหน้า', en: 'Between page sections' },
  7: { th: 'สำรองไว้สำหรับช่องว่างขนาดใหญ่', en: 'Reserved for large gaps' },
  8: { th: 'สำรองไว้สำหรับช่องว่างขนาดใหญ่มาก', en: 'Reserved for very large gaps' },
}

export const radiusUsage: Record<keyof typeof tokens.radius, Text> = {
  sm: { th: 'ช่องกรอกข้อมูลและกรอบภาพ', en: 'Inputs and image frames' },
  md: { th: 'การ์ด ตัวเลือก คำถามพับได้ และคำพูดอ้างอิง', en: 'Cards, choices, accordion items and quotes' },
  lg: { th: 'สำรองไว้สำหรับแผงขนาดใหญ่', en: 'Reserved for large panels' },
  pill: { th: 'ปุ่ม ป้าย แท็บ และแถบความคืบหน้า', en: 'Buttons, badges, tabs and progress bars' },
}

export const shadowUsage: Record<keyof typeof tokens.shadow, Text> = {
  sm: { th: 'การ์ดในสถานะปกติ', en: 'Cards at rest' },
  md: { th: 'การ์ดที่กดได้เมื่อชี้เมาส์', en: 'Clickable cards on hover' },
}
