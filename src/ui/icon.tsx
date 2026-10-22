import {
  Banknote, Bell, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleHelp, ClipboardList, Clock, CreditCard, Crown, Eye, Gift, Globe,
  Hammer, Headset, Heart, House, Info, LayoutGrid, Lightbulb, Lock, LogOut, Mail, MapPin, Menu, Minus, Package, Pencil, Percent, Phone, Plus,
  QrCode, Receipt, RotateCcw, Search, Settings, ShieldCheck, ShoppingCart, Smartphone, Star, Store, Tag, Ticket, Trash2, TriangleAlert, Truck,
  User, Wallet, Wrench, X, Landmark, ArrowUpRight, type LucideIcon,
} from 'lucide-react'
import { tokens } from '../tokens/tokens'

// The icons the system may use, drawn from Lucide (https://lucide.dev/icons). To allow another one,
// import it above and add a line here; it then shows up on /moodboard by itself.
export const icons = {
  search: Search, cart: ShoppingCart, user: User, heart: Heart, pin: MapPin, phone: Phone, headset: Headset, menu: Menu, grid: LayoutGrid,
  down: ChevronDown, up: ChevronUp, left: ChevronLeft, right: ChevronRight, close: X, plus: Plus, minus: Minus, trash: Trash2, edit: Pencil, check: Check,
  truck: Truck, shield: ShieldCheck, returns: RotateCcw, card: CreditCard, qr: QrCode, bank: Landmark, cash: Banknote, package: Package, receipt: Receipt,
  ticket: Ticket, star: Star, crown: Crown, wallet: Wallet, home: House, orders: ClipboardList, logout: LogOut, bell: Bell, info: Info, warning: TriangleAlert,
  store: Store, hammer: Hammer, wrench: Wrench, idea: Lightbulb, gift: Gift, help: CircleHelp, mail: Mail, clock: Clock, tag: Tag, percent: Percent,
  settings: Settings, view: Eye, lock: Lock, phoneApp: Smartphone, globe: Globe, external: ArrowUpRight,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons
export type IconSize = keyof typeof tokens.icon.size

// A line icon that takes its colour from the text around it. Without `label` it is decoration and hidden
// from screen readers; give `label` when the icon is the only thing telling the user what something is.
export function Icon({ name, size = 'md', label }: { name: IconName; size?: IconSize; label?: string }) {
  const Glyph = icons[name]
  return <Glyph className={`icon icon--${size}`} strokeWidth={tokens.icon.stroke} aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined} />
}
