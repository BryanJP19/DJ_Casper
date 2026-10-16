import { useEffect, useState } from 'react'

/** true mientras alguno de los elementos indicados esté en pantalla. */
export function useAnyVisible(ids: string[]): boolean {
  const [visible, setVisible] = useState(false)
  const key = ids.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const state = new Map<string, boolean>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) state.set(entry.target.id, entry.isIntersecting)
      setVisible([...state.values()].some(Boolean))
    })
    key.split('|').forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [key])

  return visible
}
