import { WHATSAPP_BASE_URL, site } from '../config/site'
import type { Locale } from '../config/site'
import type { EventTypeId } from '../config/services'
import { getCopy } from '../content'
import type { QuoteFormData } from './validation'

/** Construye https://wa.me/<número>?text=<mensaje codificado>. */
export function buildWhatsAppUrl(message?: string, number: string = site.whatsappNumber): string {
  const base = `${WHATSAPP_BASE_URL}/${number}`
  const text = message?.trim()
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export function buildGenericMessage(locale: Locale = site.defaultLocale): string {
  return getCopy(locale).whatsapp.generic
}

export function buildEventMessage(eventType: EventTypeId | '' | null | undefined, locale: Locale = site.defaultLocale): string {
  if (!eventType) return buildGenericMessage(locale)
  const copy = getCopy(locale)
  return copy.whatsapp.contextual(copy.services.items[eventType].phrase)
}

export function formatEventDate(iso: string, locale: Locale = site.defaultLocale): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return new Intl.DateTimeFormat(getCopy(locale).whatsapp.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

/** Resumen legible de la solicitud. Omite los campos vacíos. */
export function buildQuoteMessage(data: QuoteFormData, locale: Locale = site.defaultLocale): string {
  const copy = getCopy(locale)
  const l = copy.whatsapp.labels
  const lines: Array<[string, string]> = []
  const push = (label: string, value: string | undefined) => {
    const v = value?.trim()
    if (v) lines.push([label, v])
  }

  push(l.name, data.name)
  push(l.phone, data.phone)
  if (data.eventType) push(l.eventType, copy.services.items[data.eventType].name)
  if (data.date) push(l.date, formatEventDate(data.date, locale))
  if (data.country) push(l.country, copy.form.countries[data.country])
  push(l.city, data.city)
  if (data.duration) push(l.duration, copy.form.durations[data.duration])
  push(l.guests, data.guests)
  if (data.packageId) push(l.package, copy.form.packages[data.packageId])
  if (data.interests.length) push(l.interests, data.interests.map((i) => copy.form.interests[i]).join(', '))
  push(l.notes, data.notes)

  const body = lines.map(([label, value]) => `• ${label}: ${value}`).join('\n')
  return `${copy.whatsapp.quoteIntro}\n\n${body}\n\n${copy.whatsapp.quoteOutro}`
}

/**
 * Abre WhatsApp en una pestaña nueva. Devuelve false si el navegador bloqueó la ventana.
 * No se usa "noopener" en window.open porque haría imposible detectar el bloqueo; se anula el opener a mano.
 */
export function openWhatsApp(url: string): boolean {
  const win = window.open(url, '_blank')
  if (!win) return false
  try {
    win.opener = null
  } catch {
    /* ignorar */
  }
  return true
}
