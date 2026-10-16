import { site } from '../../config/site'
import { useCopy } from '../../hooks/useCopy'
import { buildGenericMessage, buildWhatsAppUrl } from '../../lib/whatsapp'
import { ButtonLink } from '../ui/Button'
import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons'

export function FinalCta() {
  const copy = useCopy()
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="cta">
      <img className="cta__img" src="/images/demo/cta.svg" alt="" width={1920} height={900} loading="lazy" decoding="async" />
      <div aria-hidden="true" className="cta__shade" />
      <div className="container">
        <h2 id="contacto-title" className="cta__title">
          {copy.finalCta.title}
        </h2>
        <p className="cta__text">{copy.finalCta.description}</p>
        <div className="cta__actions">
          <ButtonLink href={buildWhatsAppUrl(buildGenericMessage())} external>
            <WhatsAppIcon width={20} height={20} />
            {copy.finalCta.primary}
            <span className="sr-only"> {copy.common.externalHint}</span>
          </ButtonLink>
          <ButtonLink href={site.instagramUrl} external variant="secondary">
            <InstagramIcon width={20} height={20} />
            {copy.finalCta.secondary}
            <span className="sr-only"> {copy.common.externalHint}</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
