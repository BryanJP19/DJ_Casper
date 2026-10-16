import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCopy } from '../../hooks/useCopy'
import { SectionHeading } from '../ui/SectionHeading'

export function Faq() {
  const copy = useCopy()
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" aria-labelledby="faq-title" className="section section--alt">
      <div className="faq">
        <SectionHeading id="faq-title" title={copy.faq.title} />
        <div className="faq__list">
          {copy.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="faq__item">
                <h3 className="faq__q">
                  <button type="button" id={`faq-btn-${i}`} className="faq__btn" aria-expanded={isOpen} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    {item.q}
                    <ChevronDown aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!isOpen} className="faq__panel">
                  {item.a}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
