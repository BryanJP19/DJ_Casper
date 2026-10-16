export interface Testimonial {
  id: string
  quote: string
  /** Nombre o identificación AUTORIZADA por el cliente. */
  author: string
  eventType?: string
  /** Solo si existe una fuente real verificable. */
  rating?: { value: number; source: string }
}

/**
 * Añade aquí únicamente opiniones reales y autorizadas.
 * Mientras esté vacío, la sección muestra una alternativa sin afirmar resultados.
 */
export const testimonials: Testimonial[] = []
