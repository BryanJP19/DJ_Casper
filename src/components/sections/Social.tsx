import { ArrowUpRight } from 'lucide-react'
import { site } from '../../config/site'
import { useCopy } from '../../hooks/useCopy'
import { SectionHeading } from '../ui/SectionHeading'
import { InstagramIcon, YouTubeIcon } from '../ui/BrandIcons'

export function Social() {
  const copy = useCopy()
  const cards = [
    { key: 'instagram', href: site.instagramUrl, handle: site.instagramHandle, Icon: InstagramIcon, mod: '', ...copy.social.instagram },
    { key: 'youtube', href: site.youtubeUrl, handle: site.youtubeHandle, Icon: YouTubeIcon, mod: ' social__card--yt', ...copy.social.youtube },
  ]
  return (
    <section id="redes" aria-labelledby="redes-title" className="section section--alt">
      <div className="container">
        <SectionHeading id="redes-title" title={copy.social.title} description={copy.social.description} />
        <ul className="social">
          {cards.map(({ key, href, handle, Icon, mod, name, text, cta }) => (
            <li key={key}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${cta}: ${handle} ${copy.common.externalHint}`} className={`social__card${mod}`}>
                <span className="social__icon">
                  <Icon width={32} height={32} />
                </span>
                <span className="social__body">
                  <span className="social__name">{name}</span>
                  <span className="social__handle">{handle}</span>
                  <span className="social__text">{text}</span>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
