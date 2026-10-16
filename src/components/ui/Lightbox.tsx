import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '../../config/gallery'
import { useCopy } from '../../hooks/useCopy'
import { DemoBadge } from './DemoBadge'

interface Props {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onChange: (index: number) => void
}

const FOCUSABLE = 'button, [href], video[controls], [tabindex]:not([tabindex="-1"])'

/** Visor modal accesible: foco atrapado, Escape, flechas, y devolución del foco al cerrar. */
export function Lightbox({ items, index, onClose, onChange }: Props) {
  const copy = useCopy()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]
  const meta = copy.gallery.items[item.id]
  const n = items.length

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onChange((index + 1) % n)
      else if (e.key === 'ArrowLeft') onChange((index - 1 + n) % n)
      else if (e.key === 'Tab' && dialogRef.current) {
        const els = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
        if (!els.length) return
        const first = els[0]
        const last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, n, onChange, onClose])

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={copy.gallery.lightbox.label} className="lightbox" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button ref={closeRef} type="button" onClick={onClose} aria-label={copy.common.close} className="icon-btn icon-btn--close">
        <X aria-hidden="true" />
      </button>
      <button type="button" onClick={() => onChange((index - 1 + n) % n)} aria-label={copy.gallery.lightbox.prev} className="icon-btn icon-btn--prev">
        <ChevronLeft aria-hidden="true" />
      </button>
      <button type="button" onClick={() => onChange((index + 1) % n)} aria-label={copy.gallery.lightbox.next} className="icon-btn icon-btn--next">
        <ChevronRight aria-hidden="true" />
      </button>
      <figure>
        <div className="lightbox__media">
          {item.kind === 'image' ? (
            <img src={item.src} alt={meta.alt} width={item.width} height={item.height} />
          ) : (
            <video src={item.src} poster={item.poster} controls preload="none">
              <track kind="captions" />
            </video>
          )}
          <DemoBadge show={item.placeholder} />
        </div>
        <figcaption>
          {meta.label} · {copy.gallery.lightbox.counter(index + 1, n)}
        </figcaption>
      </figure>
    </div>
  )
}
