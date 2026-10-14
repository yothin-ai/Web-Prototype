import { useEffect, useRef, type ReactNode } from 'react'
import { Icon } from './icon'
import './ui.css'

// A panel over the page, built on the native <dialog>: it traps focus, closes on Escape and
// on a click on the dimmed backdrop, and the page behind it does not scroll.
export function Modal({ open, onClose, label, closeLabel, children }: { open: boolean; onClose: () => void; label: string; closeLabel: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = before }
  }, [open])

  if (!open) return null
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={label}
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal__panel">
        <button type="button" className="modal__close" aria-label={closeLabel} onClick={onClose}><Icon name="close" size="md" /></button>
        {children}
      </div>
    </dialog>
  )
}
