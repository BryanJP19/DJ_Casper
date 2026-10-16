import { eventTypeIds, durationIds, interestIds } from '../config/services'
import type { DurationId, EventTypeId, InterestId } from '../config/services'
import { site } from '../config/site'
import type { CountryCode } from '../config/site'
import type { Copy } from '../content/es'

export interface QuoteFormData {
  name: string
  phone: string
  eventType: EventTypeId | ''
  /** Formato yyyy-mm-dd (input type="date"). */
  date: string
  country: CountryCode | ''
  city: string
  duration: DurationId | ''
  guests: string
  interests: InterestId[]
  notes: string
}

export type QuoteErrors = Partial<Record<keyof QuoteFormData, string>>

export const emptyQuoteForm: QuoteFormData = {
  name: '',
  phone: '',
  eventType: '',
  date: '',
  country: '',
  city: '',
  duration: '',
  guests: '',
  interests: [],
  notes: '',
}

/** Fecha local de hoy en formato yyyy-mm-dd. */
export function todayISO(now: Date = new Date()): string {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function isValidISODate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return false
  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])]
  const date = new Date(y, m - 1, d)
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

export function validateQuote(data: QuoteFormData, copy: Copy, now: Date = new Date()): QuoteErrors {
  const e = copy.form.errors
  const errors: QuoteErrors = {}

  const name = data.name.trim()
  if (!name) errors.name = e.nameRequired
  else if (name.length < 2) errors.name = e.nameShort

  const phone = data.phone.trim()
  const digits = phone.replace(/\D/g, '')
  if (!phone) errors.phone = e.phoneRequired
  else if (!/^[+\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) errors.phone = e.phoneInvalid

  if (!data.eventType || !eventTypeIds.includes(data.eventType)) errors.eventType = e.eventTypeRequired

  if (!data.date) errors.date = e.dateRequired
  else if (!isValidISODate(data.date)) errors.date = e.dateInvalid
  else if (data.date < todayISO(now)) errors.date = e.datePast

  if (!data.country || !site.serviceCountries.includes(data.country)) errors.country = e.countryRequired
  if (!data.city.trim()) errors.city = e.cityRequired
  if (!data.duration || !durationIds.includes(data.duration)) errors.duration = e.durationRequired

  const guests = data.guests.trim()
  if (guests) {
    const n = Number(guests)
    if (!/^\d+$/.test(guests) || n < 1 || n > 100000) errors.guests = e.guestsInvalid
  }

  return errors
}

export const interestOptions = interestIds
