import { getCopy } from '../content'
import { site } from '../config/site'

/** Punto único de acceso al texto. Una futura versión en inglés solo cambia el locale aquí. */
export function useCopy() {
  return getCopy(site.defaultLocale)
}
