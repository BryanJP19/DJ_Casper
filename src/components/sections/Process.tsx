import { useCopy } from '../../hooks/useCopy'
import { SectionHeading } from '../ui/SectionHeading'

export function Process() {
  const copy = useCopy()
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="section">
      <div className="container">
        <SectionHeading id="proceso-title" title={copy.process.title} description={copy.process.description} />
        <ol className="steps">
          {copy.process.steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>
                <span className="sr-only">{i + 1}. </span>
                {s.title}
              </h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
