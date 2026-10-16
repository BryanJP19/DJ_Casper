import { Headset, MapPin, Music2, SlidersHorizontal, type LucideIcon } from 'lucide-react'
import { useCopy } from '../../hooks/useCopy'
import { SectionHeading } from '../ui/SectionHeading'
import { DemoBadge } from '../ui/DemoBadge'

const factIcons: LucideIcon[] = [Music2, SlidersHorizontal, Headset, MapPin]

export function About() {
  const copy = useCopy()
  return (
    <section id="sobre-mi" aria-labelledby="sobre-title" className="section section--alt">
      <div className="about">
        <div className="about__media">
          <div aria-hidden="true" className="about__frame" />
          <div className="about__photo">
            <img src="/images/gallery/g9.webp" alt={copy.about.imageAlt} width={960} height={1200} loading="lazy" decoding="async" />
            <DemoBadge />
          </div>
        </div>
        <div>
          <SectionHeading id="sobre-title" title={copy.about.title} />
          <p className="about__text">{copy.about.text}</p>
          {/* PENDIENTE: biografía real, estilos musicales, experiencia, idiomas y equipamiento confirmados (ver config/pending.ts). */}
          <div className="why">
            <h3 className="why__title">{copy.about.whyTitle}</h3>
            <ul className="why__grid">
              {copy.about.facts.map((f, i) => {
                const Icon = factIcons[i] ?? Music2
                return (
                  <li key={f.title} className="why__item">
                    <span className="why__icon">
                      <Icon aria-hidden="true" size={22} />
                    </span>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
