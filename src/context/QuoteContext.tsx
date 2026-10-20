import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { EventTypeId } from '../config/services'
import type { PackageId } from '../config/packages'

interface QuoteContextValue {
  selectedEvent: EventTypeId | ''
  selectedPackage: PackageId | ''
  /** Aumentan con cada selección (incluso repetida) para que el formulario se sincronice siempre. */
  eventNonce: number
  packageNonce: number
  /** Guardan la elección y llevan al visitante al formulario. */
  selectEvent: (id: EventTypeId) => void
  selectPackage: (id: PackageId) => void
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

function goToForm() {
  const target = document.getElementById('cotizacion')
  target?.scrollIntoView?.({ block: 'start' })
  if (target && window.history?.replaceState) window.history.replaceState(null, '', '#cotizacion')
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [selectedEvent, setSelectedEvent] = useState<EventTypeId | ''>('')
  const [selectedPackage, setSelectedPackage] = useState<PackageId | ''>('')
  const [eventNonce, setEventNonce] = useState(0)
  const [packageNonce, setPackageNonce] = useState(0)

  const selectEvent = useCallback((id: EventTypeId) => {
    setSelectedEvent(id)
    setEventNonce((n) => n + 1)
    goToForm()
  }, [])

  const selectPackage = useCallback((id: PackageId) => {
    setSelectedPackage(id)
    setPackageNonce((n) => n + 1)
    goToForm()
  }, [])

  const value = useMemo(
    () => ({ selectedEvent, selectedPackage, eventNonce, packageNonce, selectEvent, selectPackage }),
    [selectedEvent, selectedPackage, eventNonce, packageNonce, selectEvent, selectPackage],
  )
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote debe usarse dentro de QuoteProvider')
  return ctx
}
