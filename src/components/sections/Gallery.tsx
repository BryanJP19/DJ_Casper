import { useState } from 'react'
import { galleryItems } from '../../config/gallery'
import { useCopy } from '../../hooks/useCopy'
import { SectionHeading } from '../ui/SectionHeading'
import { Lightbox } from '../ui/Lightbox'
import { DemoBadge } from '../ui/DemoBadge'

export function Gallery() {
  const copy = useCopy()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="section">
      <div className="container">
        <SectionHeading id="galeria-title" title={copy.gallery.title} description={copy.gallery.description} />
        <ul className="mosaic">
          {galleryItems.map((item, i) => {
            const meta = copy.gallery.items[item.id]
            return (
              <li key={item.id} className={`tile ${item.tile}`.trim()}>
                <button type="button" className="tile__btn" onClick={() => setOpen(i)} aria-label={`${copy.gallery.open}: ${meta.label}`}>
                  <img src={item.kind === 'image' ? item.src : item.poster} alt={meta.alt} width={item.width} height={item.height} loading="lazy" decoding="async" style={item.position ? { objectPosition: item.position } : undefined} />
                  <span className="tile__label">{meta.label}</span>
                  <DemoBadge show={item.placeholder} />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {open !== null ? <Lightbox items={galleryItems} index={open} onClose={() => setOpen(null)} onChange={setOpen} /> : null}
    </section>
  )
}
