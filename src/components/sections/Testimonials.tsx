import { testimonials } from '../../config/testimonials'
import { useCopy } from '../../hooks/useCopy'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  const copy = useCopy()
  const hasReal = testimonials.length > 0
  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="section">
      <div className="container">
        <SectionHeading id="testimonios-title" title={copy.testimonials.title} description={hasReal ? undefined : copy.testimonials.description} />
        {hasReal ? (
          <ul className="t-grid">
            {testimonials.map((t) => (
              <li key={t.id}>
                <figure className="t-card">
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    <strong>{t.author}</strong>
                    {t.eventType ? ` · ${t.eventType}` : ''}
                    {t.rating ? ` · ${t.rating.value}/5 (${t.rating.source})` : ''}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h3 className="t-sub">{copy.testimonials.fallbackTitle}</h3>
            <ul className="t-grid">
              {copy.testimonials.fallback.map((c) => (
                <li key={c.title} className="t-card">
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
