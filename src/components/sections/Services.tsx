import { services } from '../../config/services'
import { useCopy } from '../../hooks/useCopy'
import { useQuote } from '../../context/QuoteContext'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { DemoBadge } from '../ui/DemoBadge'
import { Packages } from './Packages'

export function Services() {
  const copy = useCopy()
  const { selectEvent } = useQuote()

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section">
      <div className="container">
        <SectionHeading id="servicios-title" title={copy.services.title} description={copy.services.description} />
        <ul className="cards">
          {services.map((s) => {
            const t = copy.services.items[s.id]
            return (
              <li key={s.id} className="card">
                <div className="card__media">
                  <img src={s.image} alt={t.alt} width={s.width} height={s.height} loading="lazy" decoding="async" />
                  <DemoBadge show={s.placeholder} />
                </div>
                <div className="card__body">
                  <h3 className="card__title">{t.name}</h3>
                  <p className="card__text">{t.description}</p>
                  <Button variant="secondary" small onClick={() => selectEvent(s.id)} aria-label={`${copy.services.cta}: ${t.name}`}>
                    {copy.services.cta}
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
        <Packages />
      </div>
    </section>
  )
}
