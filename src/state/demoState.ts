import { useCallback, useMemo, useSyncExternalStore } from 'react'

// Demo state lives only in this browser, one JSON blob per Prototype.
const PREFIX = 'mps:state:'
const CHANGE_EVENT = 'mps:state-change'

function read(prototypeId: string): string {
  try {
    return localStorage.getItem(PREFIX + prototypeId) ?? ''
  } catch {
    return ''
  }
}

function write(prototypeId: string, value: Record<string, unknown> | null): void {
  try {
    if (value === null) localStorage.removeItem(PREFIX + prototypeId)
    else localStorage.setItem(PREFIX + prototypeId, JSON.stringify(value))
  } catch {
    // storage unavailable: state will not persist
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function subscribe(listener: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, listener)
  window.addEventListener('storage', listener)
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener)
    window.removeEventListener('storage', listener)
  }
}

function parse(raw: string): Record<string, unknown> {
  if (!raw) return {}
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    return {}
  }
}

export function useDemoState<T>(prototypeId: string, key: string, initial: T): [T, (value: T) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(prototypeId),
    () => '',
  )
  const stored = useMemo(() => parse(raw), [raw])
  const value = key in stored ? (stored[key] as T) : initial
  const set = useCallback(
    (next: T) => write(prototypeId, { ...parse(read(prototypeId)), [key]: next }),
    [prototypeId, key],
  )
  return [value, set]
}

export function resetPrototype(prototypeId: string): void {
  write(prototypeId, null)
}

export function resetAll(prototypeIds: string[]): void {
  prototypeIds.forEach(resetPrototype)
}
