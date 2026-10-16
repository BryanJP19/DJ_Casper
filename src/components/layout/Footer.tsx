import { useCopy } from '../../hooks/useCopy'
import { site } from '../../config/site'
import { buildGenericMessage, buildWhatsAppUrl } from '../../lib/whatsapp'
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from '../ui/BrandIcons'

export function Footer() {
  const copy = useCopy()
  const year = new Date().getFullYear()
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

  return (
    <footer id="pie" className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <a href="#inicio" aria-label={copy.nav.logoLabel}>
            <img src="/logo.png" alt="" width={360} height={365} loading="lazy" />
          </a>
          <p className="footer__desc">{copy.footer.description}</p>
        </div>
        <nav aria-label={copy.footer.sections}>
          <h2>{copy.footer.sections}</h2>
          <ul>
            {copy.nav.links.map((l) => (
              <li key={l.id}>
                <a className="footer__link" href={`#${l.id}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>{copy.footer.contact}</h2>
          <ul>
            <li>
              <a className="footer__link" href={buildWhatsAppUrl(buildGenericMessage())} {...ext}>
                <WhatsAppIcon width={18} height={18} /> {site.whatsappDisplay}
                <span className="sr-only"> {copy.common.externalHint}</span>
              </a>
            </li>
            <li>
              <a className="footer__link" href={site.instagramUrl} {...ext}>
                <InstagramIcon width={18} height={18} /> Instagram {site.instagramHandle}
                <span className="sr-only"> {copy.common.externalHint}</span>
              </a>
            </li>
            <li>
              <a className="footer__link" href={site.youtubeUrl} {...ext}>
                <YouTubeIcon width={18} height={18} /> YouTube {site.youtubeHandle}
                <span className="sr-only"> {copy.common.externalHint}</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>{copy.footer.markets}</h2>
          <ul className="footer__list-plain">
            {site.serviceCountries.map((c) => (
              <li key={c}>{copy.form.countries[c]}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
          © {year} {site.brand}. {copy.footer.rights}
        </p>
        {site.privacyPolicyUrl ? <a href={site.privacyPolicyUrl}>{copy.footer.privacy}</a> : null}
      </div>
    </footer>
  )
}
