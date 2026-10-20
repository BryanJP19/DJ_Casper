/** Paquetes confirmados por DJcasper (flyer "Nuestros paquetes de eventos"). Los textos están en content/es.ts → packages. */
export type PackageTier = 'basico' | 'intermedio' | 'avanzado'
export type PackageId = PackageTier | 'no-se'

export const packageTiers: PackageTier[] = ['basico', 'intermedio', 'avanzado']
/** Opciones del formulario (incluye "Aún no lo sé"). */
export const packageOptionIds: PackageId[] = [...packageTiers, 'no-se']
