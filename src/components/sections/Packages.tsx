import { Check } from 'lucide-react'
import { packageTiers } from '../../config/packages'
import { useCopy } from '../../hooks/useCopy'
import { useQuote } from '../../context/QuoteContext'
import { Button } from '../ui/Button'

/** Paquetes confirmados: qué incluye cada uno. "Me interesa" los preselecciona en el formulario. */
export function Packages() {
  const copy = useCopy()
  const { selectPackage } = useQuote()
  const t = copy.packages

  return (
    <div className="packages" role="group" aria-labelledby="paquetes-title">
      <h3 id="paquetes-title" className="packages__title">
        {t.title}
      </h3>
      <p className="packages__desc">{t.description}</p>
      <ul className="packages__grid">
        {packageTiers.map((id) => {
          const pkg = t.items[id]
          return (
            <li key={id} className="pkg">
              <h4 className="pkg__name">{pkg.name}</h4>
              <p className="pkg__tier" aria-label={t.priceLabel(pkg.tier)}>
                <span aria-hidden="true">{'$'.repeat(pkg.tier)}</span>
              </p>
              <p className="pkg__includes">{t.includes}</p>
              <ul className="pkg__list">
                {pkg.features.map((feature) => (
                  <li key={feature}>
                    <Check aria-hidden="true" size={18} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="btn--block" onClick={() => selectPackage(id)} aria-label={`${t.cta}: ${t.items[id].name}`}>
                {t.cta}
              </Button>
            </li>
          )
        })}
      </ul>
      <p className="packages__note">{t.priceNote}</p>
    </div>
  )
}
