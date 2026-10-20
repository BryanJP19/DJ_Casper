export type EventTypeId =
  | 'boda'
  | 'cumpleanos'
  | 'xv'
  | 'corporativo'
  | 'fiesta-privada'
  | 'celebracion-especial'
  | 'otro'

export interface ServiceConfig {
  id: Exclude<EventTypeId, 'otro'>
  image: string
  width: number
  height: number
  /** true mientras la imagen sea una ilustración de demostración. */
  placeholder: boolean
}

export const services: ServiceConfig[] = [
  { id: 'boda', image: '/images/demo/service-boda.svg', width: 800, height: 600, placeholder: true },
  { id: 'cumpleanos', image: '/images/demo/service-cumpleanos.svg', width: 800, height: 600, placeholder: true },
  { id: 'xv', image: '/images/demo/service-xv.svg', width: 800, height: 600, placeholder: true },
  { id: 'corporativo', image: '/images/demo/service-corporativo.svg', width: 800, height: 600, placeholder: true },
  { id: 'fiesta-privada', image: '/images/demo/service-fiesta-privada.svg', width: 800, height: 600, placeholder: true },
  { id: 'celebracion-especial', image: '/images/demo/service-celebracion-especial.svg', width: 800, height: 600, placeholder: true },
]

/** Categorías de la sección de cotización → tipo de evento preseleccionado. */
export const quoteCategories: { id: 'privadas' | 'bodas' | 'corporativos' | 'personalizados'; eventType: EventTypeId }[] = [
  { id: 'privadas', eventType: 'fiesta-privada' },
  { id: 'bodas', eventType: 'boda' },
  { id: 'corporativos', eventType: 'corporativo' },
  { id: 'personalizados', eventType: 'otro' },
]

export const eventTypeIds: EventTypeId[] = [...services.map((s) => s.id), 'otro']

export type DurationId = 'hasta-2' | '3-4' | '5-6' | '7-mas' | 'no-se'
export const durationIds: DurationId[] = ['hasta-2', '3-4', '5-6', '7-mas', 'no-se']

export type InterestId = 'evento-completo' | 'ceremonia' | 'seleccion-personalizada' | 'otro'
export const interestIds: InterestId[] = ['evento-completo', 'ceremonia', 'seleccion-personalizada', 'otro']
