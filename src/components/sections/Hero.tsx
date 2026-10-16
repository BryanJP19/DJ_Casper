import { useCopy } from '../../hooks/useCopy'
import { buildGenericMessage, buildWhatsAppUrl } from '../../lib/whatsapp'
import { ButtonLink } from '../ui/Button'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { DemoBadge } from '../ui/DemoBadge'

const bars = [0.5, 0.9, 0.65, 1, 0.75, 0.55, 0.95, 0.7, 0.85, 0.6, 1, 0.8, 0.5, 0.9, 0.7, 0.95, 0.6, 0.85]

export function Hero() {
  const copy = useCopy()
  const accent = { violet: 'accent-violet', cyan: 'accent-cyan' }

  return (
    <section id="inicio" aria-labelledby="hero-title" className="hero">
      <img
        className="hero__img"
        src="/images/demo/hero.svg"
        alt={copy.hero.imageAlt}
        width={1920}
        height={1080}
        {...({ fetchpriority: 'high' } as Record<string, string>)}
        decoding="async"
      />
      <div aria-hidden="true" className="hero__shade" />
      <div aria-hidden="true" className="hero__fade" />
      <DemoBadge />

      <div className="container">
        <div className="hero__content">
          <p className="hero__eyebrow">{copy.hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            {copy.hero.headline.map((line, i) => (
              <span key={i} className="hero__line">
                {line.map((seg, j) => (
                  <span key={j} className={seg.accent ? accent[seg.accent] : undefined}>
                    {seg.text}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero__text">{copy.hero.description}</p>
          <div className="hero__actions">
            <ButtonLink href={buildWhatsAppUrl(buildGenericMessage())} external>
              <WhatsAppIcon width={20} height={20} />
              {copy.hero.primaryCta}
              <span className="sr-only"> {copy.common.externalHint}</span>
            </ButtonLink>
            <ButtonLink href="#servicios" variant="secondary">
              {copy.hero.secondaryCta}
            </ButtonLink>
          </div>
          <p className="hero__markets">{copy.common.marketsLine}</p>
        </div>
      </div>

      <div aria-hidden="true" className="eq">
        {bars.map((h, i) => (
          <span key={i} className="eq__bar" style={{ height: `${h * 100}%`, animationDelay: `${(i % 6) * 0.17}s`, animationDuration: `${1.2 + (i % 5) * 0.2}s` }} />
        ))}
      </div>
    </section>
  )
}
