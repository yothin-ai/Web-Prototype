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
