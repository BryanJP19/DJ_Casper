/**
 * Datos comerciales centralizados de DJcasper.
 * Modifica aquí los datos confirmados; ningún componente los duplica.
 */
export type Locale = 'es' | 'en'
export type CountryCode = 'US' | 'DO'

export const site = {
  brand: 'DJcasper',
  brandUpper: 'DJCASPER',
  defaultLocale: 'es' as Locale,
  /** Número para wa.me: solo dígitos, con código de país. */
  whatsappNumber: '19732770649',
  whatsappDisplay: '+1 (973) 277-0649',
  instagramUrl: 'https://www.instagram.com/djcasper03/',
  instagramHandle: '@djcasper03',
  youtubeUrl: 'https://www.youtube.com/@djcasper-r1o',
  youtubeHandle: '@djcasper-r1o',
  /** Países confirmados. Para ampliar: añade el código aquí y su nombre en content/es.ts. */
  serviceCountries: ['US', 'DO'] as CountryCode[],
  /** URL de una política de privacidad real. Mientras sea null no se muestra enlace. */
  privacyPolicyUrl: null as string | null,
  /** Muestra la etiqueta "Imagen de demostración" sobre recursos provisionales. Pon false al lanzar con fotos reales. */
  showPlaceholderBadges: false,
}

export const WHATSAPP_BASE_URL = 'https://wa.me'
