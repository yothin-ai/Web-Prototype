import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { datasets, defaultDataset } from '.'
import type { Dataset } from './types'

const STORAGE_KEY = 'mps:dataset'

function readId(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && datasets.some((d) => d.id === stored)) return stored
  } catch {
    // storage unavailable: fall through to the default
  }
  return defaultDataset.id
}

type DatasetContext = { dataset: Dataset; datasets: Dataset[]; setDatasetId: (id: string) => void }

const Context = createContext<DatasetContext | null>(null)

export function DatasetProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState(readId)

  // A choice made in another tab of this browser applies here too.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) setId(readId())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setDatasetId = useCallback((next: string) => {
    setId(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // keep the choice in memory only
    }
  }, [])

  const value = useMemo(
    () => ({ dataset: datasets.find((d) => d.id === id) ?? defaultDataset, datasets, setDatasetId }),
    [id, setDatasetId],
  )
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useDataset(): DatasetContext {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useDataset must be used inside DatasetProvider')
  return ctx
}
