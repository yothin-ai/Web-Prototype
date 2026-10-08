import type { ComponentType } from 'react'
import type { Localized } from '../i18n'

export type PrototypeManifest = {
  id: string
  order: number
  title: Localized
  summary: Localized
  // The one main end-to-end path the Prototype must let a Viewer click through.
  journey: Localized[]
  status: 'planned' | 'ready'
  // Omitted while status is "planned": the Shell shows a placeholder instead.
  Component?: ComponentType
}
