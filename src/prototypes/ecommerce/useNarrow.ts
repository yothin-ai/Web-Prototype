import { useEffect, useState } from 'react'
import { tokens } from '../../tokens/tokens'

// True on phone-width screens, where bars stay on screen and columns stack.
export function useNarrow() {
  const query = `(max-width: ${tokens.breakpoint.sm - 1}px)`
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setNarrow(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return narrow
}
