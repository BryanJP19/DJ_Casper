import { useAnyVisible } from '../../hooks/useSectionVisible'
import { useCopy } from '../../hooks/useCopy'
import { buildGenericMessage, buildWhatsAppUrl } from '../../lib/whatsapp'
import { WhatsAppIcon } from '../ui/BrandIcons'

/** Botón flotante; se oculta al llegar a la cotización y al footer para no tapar formularios ni enlaces. */
export function FloatingWhatsApp() {
  const copy = useCopy()
  const hide = useAnyVisible(['cotizacion', 'pie'])
  if (hide) return null
  return (
    <a
      href={buildWhatsAppUrl(buildGenericMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${copy.floatingWhatsApp} ${copy.common.externalHint}`}
      className="fab"
    >
      <WhatsAppIcon width={30} height={30} />
    </a>
  )
}
