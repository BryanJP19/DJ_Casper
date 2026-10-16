import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  it('abre y cierra el menú móvil con clic y con Escape', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /abrir menú/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(screen.getByRole('button', { name: /cerrar menú/i })).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById('menu-movil')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(document.getElementById('menu-movil')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /abrir menú/i })).toHaveFocus()
  })
  it('el logotipo enlaza al inicio y existe el botón Cotizar ahora', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /ir al inicio/i })).toHaveAttribute('href', '#inicio')
    expect(screen.getAllByRole('link', { name: 'Cotizar ahora' })[0]).toHaveAttribute('href', '#cotizacion')
  })
})
