import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { EventTypeId } from '../config/services'

interface QuoteContextValue {
  selectedEvent: EventTypeId | ''
  /** Aumenta con cada selección, incluso repetida, para que el formulario se sincronice siempre. */
  selectionNonce: number
  /** Guarda el tipo de evento elegido y lleva al visitante al formulario. */
  selectEvent: (id: EventTypeId) => void
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [selectedEvent, setSelectedEvent] = useState<EventTypeId | ''>('')
  const [selectionNonce, setSelectionNonce] = useState(0)

  const selectEvent = useCallback((id: EventTypeId) => {
    setSelectedEvent(id)
    setSelectionNonce((n) => n + 1)
    const target = document.getElementById('cotizacion')
    target?.scrollIntoView?.({ block: 'start' })
    if (target && window.history?.replaceState) window.history.replaceState(null, '', '#cotizacion')
  }, [])

  const value = useMemo(() => ({ selectedEvent, selectionNonce, selectEvent }), [selectedEvent, selectionNonce, selectEvent])
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote debe usarse dentro de QuoteProvider')
  return ctx
}
