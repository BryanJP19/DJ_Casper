import { es, type Copy } from './es'
import type { Locale } from '../config/site'

/** Añade aquí `en` cuando exista src/content/en.ts (debe cumplir el tipo Copy). */
const dictionaries: Record<Locale, Copy> = { es, en: es }

export function getCopy(locale: Locale = 'es'): Copy {
  return dictionaries[locale] ?? es
}
