import { Icon } from './icon'
import './ui.css'

// Five stars. Without `onChange` it only shows `value`; with it the stars become a radio group the shopper can pick from.
export function RatingStars({ value, onChange, label, starLabel }: { value: number; onChange?: (value: number) => void; label: string; starLabel?: (n: number) => string }) {
  const stars = [1, 2, 3, 4, 5]
  if (!onChange) {
    return (
      <span className="rating" role="img" aria-label={`${label}: ${value}/5`}>
        {stars.map((n) => <span key={n} className={`rating__star${n <= Math.round(value) ? ' rating__star--on' : ''}`} aria-hidden="true"><Icon name="star" size="sm" /></span>)}
      </span>
    )
  }
  return (
    <span className="rating rating--input" role="radiogroup" aria-label={label}>
      {stars.map((n) => (
        <button key={n} type="button" role="radio" aria-checked={value === n} aria-label={starLabel ? starLabel(n) : String(n)} className={`rating__star${n <= value ? ' rating__star--on' : ''}`} onClick={() => onChange(n)}>
          <Icon name="star" size="md" />
        </button>
      ))}
    </span>
  )
}
