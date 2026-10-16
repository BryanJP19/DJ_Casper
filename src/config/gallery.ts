interface GalleryBase {
  /** Clave del texto (etiqueta y alt) en content/es.ts → gallery.items[id]. */
  id: string
  /** Clases de rejilla del mosaico: tile--big, tile--tall, tile--wide o vacío. */
  tile: string
  /** Punto de enfoque al recortar la foto en el mosaico (CSS object-position). */
  position?: string
  /** true mientras sea una imagen de demostración. */
  placeholder: boolean
  width: number
  height: number
}
export interface GalleryImage extends GalleryBase {
  kind: 'image'
  src: string
}
/** Preparado para vídeo futuro: nunca se reproduce automáticamente. */
export interface GalleryVideo extends GalleryBase {
  kind: 'video'
  poster: string
  src: string
}
export type GalleryItem = GalleryImage | GalleryVideo

/** Fotos reales en public/images/gallery/. Para cambiar una: sustituye el archivo (mismo nombre) o edita src/width/height. */
export const galleryItems: GalleryItem[] = [
  { id: 'g1', kind: 'image', src: '/images/gallery/g1.webp', width: 1024, height: 682, tile: 'tile--big', placeholder: false },
  { id: 'g2', kind: 'image', src: '/images/gallery/g2.webp', width: 768, height: 1024, tile: 'tile--tall', placeholder: false },
  { id: 'g3', kind: 'image', src: '/images/gallery/g3.webp', width: 768, height: 1024, tile: '', position: 'center 55%', placeholder: false },
  { id: 'g4', kind: 'image', src: '/images/gallery/g4.webp', width: 768, height: 1024, tile: '', position: 'center 60%', placeholder: false },
  { id: 'g5', kind: 'image', src: '/images/gallery/g5.webp', width: 682, height: 1024, tile: 'tile--tall', placeholder: false },
  { id: 'g6', kind: 'image', src: '/images/gallery/g6.webp', width: 1024, height: 768, tile: 'tile--big', placeholder: false },
  { id: 'g7', kind: 'image', src: '/images/gallery/g7.webp', width: 682, height: 1024, tile: 'tile--tall', placeholder: false },
  { id: 'g8', kind: 'image', src: '/images/gallery/g8.webp', width: 768, height: 1024, tile: 'tile--wide', position: 'center 45%', placeholder: false },
  { id: 'g9', kind: 'image', src: '/images/gallery/g9.webp', width: 682, height: 1024, tile: 'tile--wide', position: 'center 35%', placeholder: false },
]
