import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useCopy } from '../../hooks/useCopy'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ButtonLink } from '../ui/Button'

export function Navbar() {
  const copy = useCopy()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const active = useActiveSection(copy.nav.links.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open
  return (
    <header className={`nav${solid ? ' nav--solid' : ''}${scrolled ? ' nav--line' : ''}`}>
      <div className="nav__inner">
        <a href="#inicio" aria-label={copy.nav.logoLabel} className="nav__logo">
          <img src="/logo-mark.png" alt="" width={160} height={134} />
          <span aria-hidden="true">CASPER</span>
        </a>

        <nav aria-label={copy.nav.label}>
          <ul className="nav__links">
            {copy.nav.links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className={`nav__link${active === l.id ? ' nav__link--active' : ''}`} aria-current={active === l.id ? 'true' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav__cta">
              <ButtonLink href="#cotizacion" small>
                {copy.nav.cta}
              </ButtonLink>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      {open ? (
        <nav id="menu-movil" aria-label={copy.nav.label} className="nav__mobile">
          <ul>
            {copy.nav.links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`nav__mlink${active === l.id ? ' nav__mlink--active' : ''}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <ButtonLink href="#cotizacion" className="btn--block" onClick={() => setOpen(false)}>
                {copy.nav.cta}
              </ButtonLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
