import { quoteCategories } from '../../config/services'
import { useCopy } from '../../hooks/useCopy'
import { useQuote } from '../../context/QuoteContext'
import { SectionHeading } from '../ui/SectionHeading'
import { QuoteForm } from './QuoteForm'

export function Quote() {
  const copy = useCopy()
  const { selectedEvent, selectEvent } = useQuote()

  return (
    <section id="cotizacion" aria-labelledby="cotizacion-title" className="section section--alt">
      <div className="container">
        <SectionHeading id="cotizacion-title" title={copy.quote.title} description={copy.quote.description} />
        <div className="quote-layout">
          <div role="group" aria-label={copy.quote.categoriesLabel} className="cats">
            {quoteCategories.map((c) => {
              const t = copy.quote.categories[c.id]
              const pressed = selectedEvent === c.eventType
              return (
                <button key={c.id} type="button" className="cat" aria-pressed={pressed} onClick={() => selectEvent(c.eventType)}>
                  <strong>
                    {t.name}
                    {pressed ? <span className="sr-only"> (seleccionado)</span> : null}
                  </strong>
                  <span>{t.text}</span>
                </button>
              )
            })}
          </div>
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
