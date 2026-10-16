import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'
import { site } from '../config/site'

describe('App', () => {
  it('renderiza todas las secciones y un solo h1', () => {
    const { container } = render(<App />)
    for (const id of ['inicio', 'servicios', 'sobre-mi', 'proceso', 'cotizacion', 'galeria', 'redes', 'testimonios', 'faq', 'contacto']) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument()
    }
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('los enlaces externos son seguros y apuntan a los perfiles confirmados', () => {
    render(<App />)
    const ig = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === site.instagramUrl)
    const yt = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === site.youtubeUrl)
    expect(ig.length).toBeGreaterThan(0)
    expect(yt.length).toBeGreaterThan(0)
    for (const a of [...ig, ...yt]) expect(a).toHaveAttribute('rel', 'noopener noreferrer')
    for (const a of screen.getAllByRole('link')) {
      const href = a.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).not.toBe('#')
    }
  })

  it('no muestra precios, y el acordeón de FAQ se abre y cierra', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    expect(container.textContent).not.toMatch(/\$\s?\d/)
    const q = screen.getByRole('button', { name: /¿cómo se determina el precio/i })
    expect(q).toHaveAttribute('aria-expanded', 'false')
    await user.click(q)
    expect(q).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/cotización personalizada, según los detalles/i)).toBeVisible()
    await user.click(q)
    expect(q).toHaveAttribute('aria-expanded', 'false')
  })

  it('la galería abre un visor modal y se cierra con Escape devolviendo el foco', async () => {
    const user = userEvent.setup()
    render(<App />)
    const tile = screen.getByRole('button', { name: /ampliar: djcasper en acción/i })
    await user.click(tile)
    expect(screen.getByRole('dialog', { name: /visor de galería/i })).toBeInTheDocument()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByText(/2 de 9/)).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(tile).toHaveFocus()
  })
})
