import { Briefcase, Cake, Gift, Heart, PartyPopper, Sparkles, type LucideIcon } from 'lucide-react'
import type { EventTypeId } from '../../config/services'
import { useCopy } from '../../hooks/useCopy'
import { useQuote } from '../../context/QuoteContext'

const icons: [Exclude<EventTypeId, 'otro'>, LucideIcon][] = [
  ['boda', Heart],
  ['xv', Sparkles],
  ['cumpleanos', Cake],
  ['corporativo', Briefcase],
  ['fiesta-privada', PartyPopper],
  ['celebracion-especial', Gift],
]

/** Acceso rápido por tipo de evento: preselecciona el evento y lleva a la cotización. */
export function EventStrip() {
  const copy = useCopy()
  const { selectEvent } = useQuote()
  return (
    <div className="strip" role="group" aria-label={copy.strip.label}>
      <ul className="strip__list">
        {icons.map(([id, Icon]) => {
          const name = copy.services.items[id].name
          return (
            <li key={id}>
              <button type="button" className="strip__btn" onClick={() => selectEvent(id)} aria-label={`${copy.strip.cta}: ${name}`}>
                <Icon aria-hidden="true" size={28} />
                <span aria-hidden="true">{name}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
