import type { PrototypeManifest } from './types'

// Adding a Prototype = adding a folder with a manifest.ts; the Hub finds it here.
const modules = import.meta.glob<{ default: PrototypeManifest }>('./*/manifest.ts', { eager: true })

export const prototypes: PrototypeManifest[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order)

export const findPrototype = (id: string) => prototypes.find((p) => p.id === id)
