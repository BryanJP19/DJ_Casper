import { describe, expect, it } from 'vitest'
import { getCopy } from '../content'
import { emptyQuoteForm, todayISO, validateQuote, type QuoteFormData } from './validation'

const copy = getCopy('es')
const now = new Date(2026, 9, 9)
const valid: QuoteFormData = {
  ...emptyQuoteForm,
  name: 'Ana',
  phone: '+1 973 277 0649',
  eventType: 'boda',
  date: '2026-12-01',
  country: 'US',
  city: 'Newark',
  duration: '3-4',
}

describe('validateQuote', () => {
  it('acepta datos válidos con opcionales vacíos', () => {
    expect(validateQuote(valid, copy, now)).toEqual({})
  })
  it('exige los campos obligatorios', () => {
    const errors = validateQuote(emptyQuoteForm, copy, now)
    expect(Object.keys(errors).sort()).toEqual(['city', 'country', 'date', 'duration', 'eventType', 'name', 'phone'])
  })
  it('rechaza teléfonos inválidos', () => {
    expect(validateQuote({ ...valid, phone: 'abc' }, copy, now).phone).toBeTruthy()
    expect(validateQuote({ ...valid, phone: '123' }, copy, now).phone).toBeTruthy()
  })
  it('rechaza fechas pasadas y acepta hoy', () => {
    expect(validateQuote({ ...valid, date: '2026-10-08' }, copy, now).date).toBe(copy.form.errors.datePast)
    expect(validateQuote({ ...valid, date: todayISO(now) }, copy, now).date).toBeUndefined()
    expect(validateQuote({ ...valid, date: '2026-02-31' }, copy, now).date).toBe(copy.form.errors.dateInvalid)
  })
  it('valida invitados opcionales', () => {
    expect(validateQuote({ ...valid, guests: '80' }, copy, now).guests).toBeUndefined()
    expect(validateQuote({ ...valid, guests: '0' }, copy, now).guests).toBeTruthy()
    expect(validateQuote({ ...valid, guests: 'muchos' }, copy, now).guests).toBeTruthy()
  })
})
