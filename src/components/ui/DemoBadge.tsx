import { site } from '../../config/site'
import { useCopy } from '../../hooks/useCopy'

/** Etiqueta para recursos provisionales; se oculta con site.showPlaceholderBadges = false. */
export function DemoBadge({ show = true }: { show?: boolean }) {
  const copy = useCopy()
  if (!show || !site.showPlaceholderBadges) return null
  return <span className="badge-demo">{copy.common.demoImage}</span>
}
