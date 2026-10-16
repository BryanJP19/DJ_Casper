import { describe, expect, it } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Music } from './Music'

describe('Music', () => {
  it('no carga YouTube hasta que entra en pantalla o se pulsa reproducir', async () => {
    const user = userEvent.setup()
    const { container } = render(<Music />)
    expect(container.querySelector('iframe')).toBeNull()
    await user.click(screen.getByRole('button', { name: /reproducir música/i }))
    const frame = container.querySelector('iframe')
    expect(frame?.getAttribute('src')).toContain('youtube-nocookie.com/embed/6DWPoIWWUg4')
    expect(frame?.getAttribute('src')).toContain('mute=1')
    expect(frame).toHaveAttribute('referrerpolicy', 'strict-origin-when-cross-origin')
    expect(screen.getByRole('button', { name: /activar sonido/i })).toBeInTheDocument()
  })

  it('muestra una alternativa clara si YouTube informa de un error', async () => {
    const user = userEvent.setup()
    const { container } = render(<Music />)
    await user.click(screen.getByRole('button', { name: /reproducir música/i }))
    act(() => {
      window.dispatchEvent(new MessageEvent('message', { origin: 'https://www.youtube-nocookie.com', data: JSON.stringify({ event: 'onError', info: 150 }) }))
    })
    expect(screen.getByRole('alert')).toHaveTextContent(/no permite reproducir/i)
    expect(container.querySelector('iframe')).toBeNull()
    expect(screen.getByRole('link', { name: /ver en youtube/i })).toBeInTheDocument()
  })
})
