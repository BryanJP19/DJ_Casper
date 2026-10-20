import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuoteProvider } from '../../context/QuoteContext'
import { Services } from './Services'
import { Quote } from './Quote'

function setup() {
  return render(
    <QuoteProvider>
      <Services />
      <Quote />
    </QuoteProvider>,
  )
}

afterEach(() => vi.restoreAllMocks())

describe('formulario de cotización', () => {
  it('muestra errores accesibles y no abre WhatsApp con campos vacíos', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole('button', { name: /preparar mensaje en whatsapp/i }))
    expect(open).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(/campos por corregir/i)
    expect(screen.getByLabelText(/^Nombre/)).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Escribe tu nombre.')).toBeInTheDocument()
  })

  it('abre WhatsApp con el mensaje codificado cuando es válido', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue({} as Window)
    const user = userEvent.setup()
    setup()
    await user.type(screen.getByLabelText(/^Nombre/), 'María')
    await user.type(screen.getByLabelText(/Número de contacto/), '+1 973 277 0649')
    await user.selectOptions(screen.getByLabelText(/Tipo de evento/), 'boda')
    await user.type(screen.getByLabelText(/Fecha del evento/), '2099-05-20')
    await user.selectOptions(screen.getByLabelText(/^País/), 'DO')
    await user.type(screen.getByLabelText(/Ciudad o ubicación/), 'Santo Domingo')
    await user.selectOptions(screen.getByLabelText(/Duración aproximada/), '3-4')
    await user.click(screen.getByRole('button', { name: /preparar mensaje en whatsapp/i }))
    expect(open).toHaveBeenCalledTimes(1)
    const url = String(open.mock.calls[0][0])
    expect(url.startsWith('https://wa.me/19732770649?text=')).toBe(true)
    expect(decodeURIComponent(url)).toContain('Tipo de evento: Bodas')
    expect(screen.getByText(/todavía no se ha enviado nada/i)).toBeInTheDocument()
  })

  it('ofrece enlace alternativo si el navegador bloquea la ventana', async () => {
    vi.spyOn(window, 'open').mockReturnValue(null)
    const user = userEvent.setup()
    setup()
    await user.type(screen.getByLabelText(/^Nombre/), 'Luis')
    await user.type(screen.getByLabelText(/Número de contacto/), '8095550100')
    await user.selectOptions(screen.getByLabelText(/Tipo de evento/), 'otro')
    await user.type(screen.getByLabelText(/Fecha del evento/), '2099-05-20')
    await user.selectOptions(screen.getByLabelText(/^País/), 'US')
    await user.type(screen.getByLabelText(/Ciudad o ubicación/), 'Newark')
    await user.selectOptions(screen.getByLabelText(/Duración aproximada/), 'no-se')
    await user.click(screen.getByRole('button', { name: /preparar mensaje en whatsapp/i }))
    const link = screen.getByRole('link', { name: /abrir whatsapp con mi mensaje/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/19732770649?text='))
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('el botón Me interesa de un paquete lo preselecciona y lo envía en el mensaje', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue({} as Window)
    const user = userEvent.setup()
    setup()
    expect(screen.getAllByText('Luces')).toHaveLength(2)
    expect(screen.getByText('Máquina de burbujas')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /me interesa: intermedio/i }))
    expect(screen.getByRole('radio', { name: 'Intermedio' })).toBeChecked()
    await user.type(screen.getByLabelText(/^Nombre/), 'Ana')
    await user.type(screen.getByLabelText(/Número de contacto/), '8095550100')
    await user.selectOptions(screen.getByLabelText(/Tipo de evento/), 'boda')
    await user.type(screen.getByLabelText(/Fecha del evento/), '2099-05-20')
    await user.selectOptions(screen.getByLabelText(/^País/), 'US')
    await user.type(screen.getByLabelText(/Ciudad o ubicación/), 'Newark')
    await user.selectOptions(screen.getByLabelText(/Duración aproximada/), '3-4')
    await user.click(screen.getByRole('button', { name: /preparar mensaje en whatsapp/i }))
    expect(decodeURIComponent(String(open.mock.calls[0][0]))).toContain('Paquete de interés: Intermedio')
  })

  it('al elegir un servicio preselecciona el tipo de evento', async () => {
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole('button', { name: /consultar disponibilidad: xv años/i }))
    expect(screen.getByLabelText(/Tipo de evento/)).toHaveValue('xv')
  })
})
