import { describe, expect, it } from 'vitest'
import { buildEventMessage, buildGenericMessage, buildQuoteMessage, buildWhatsAppUrl } from './whatsapp'
import { emptyQuoteForm, type QuoteFormData } from './validation'

const decode = (url: string) => decodeURIComponent(url.split('?text=')[1])

describe('buildWhatsAppUrl', () => {
  it('usa el número configurado y codifica el mensaje', () => {
    const url = buildWhatsAppUrl('Hola, ¿cómo estás? Sí & no #1')
    expect(url.startsWith('https://wa.me/19732770649?text=')).toBe(true)
    expect(url).not.toContain(' ')
    expect(url).toContain('%26')
    expect(url).toContain('%23')
    expect(decode(url)).toBe('Hola, ¿cómo estás? Sí & no #1')
  })
  it('sin mensaje devuelve solo el enlace base', () => {
    expect(buildWhatsAppUrl()).toBe('https://wa.me/19732770649')
  })
})

describe('mensajes', () => {
  it('mensaje inicial exacto', () => {
    expect(buildGenericMessage()).toBe(
      'Hola, DJcasper. Me gustaría solicitar una cotización personalizada para mi evento. ¿Podrían ayudarme con información sobre disponibilidad y servicios?',
    )
  })
  it('mensaje contextual para boda', () => {
    expect(buildEventMessage('boda')).toBe(
      'Hola, DJcasper. Me gustaría solicitar una cotización personalizada para una boda. Quisiera consultar disponibilidad y conocer las opciones de servicio.',
    )
  })
  it('sin tipo de evento usa el mensaje genérico', () => {
    expect(buildEventMessage('')).toBe(buildGenericMessage())
  })
})

describe('buildQuoteMessage', () => {
  const full: QuoteFormData = {
    name: 'María Peña',
    phone: '+1 809 555 0100',
    eventType: 'xv',
    date: '2027-03-20',
    country: 'DO',
    city: 'Santo Domingo Oeste',
    duration: '5-6',
    guests: '120',
    interests: ['evento-completo', 'seleccion-personalizada'],
    notes: 'Mucho merengue & bachata',
  }
  it('incluye los datos y codifica acentos y símbolos', () => {
    const url = buildWhatsAppUrl(buildQuoteMessage(full))
    const text = decode(url)
    expect(text).toContain('Nombre: María Peña')
    expect(text).toContain('Tipo de evento: XV años')
    expect(text).toContain('Fecha: 20 de marzo de 2027')
    expect(text).toContain('País: República Dominicana')
    expect(text).toContain('Ciudad o ubicación: Santo Domingo Oeste')
    expect(text).toContain('Invitados (aprox.): 120')
    expect(text).toContain('Mucho merengue & bachata')
    expect(url).toContain('%0A')
  })
  it('omite los campos vacíos', () => {
    const text = buildQuoteMessage({ ...emptyQuoteForm, name: 'Ana', phone: '8095550100', eventType: 'boda' })
    expect(text).toContain('Nombre: Ana')
    expect(text).not.toContain('Invitados')
    expect(text).not.toContain('Información adicional')
    expect(text).not.toContain('Fecha:')
  })
})
