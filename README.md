# DJcasper — Web de cotizaciones por WhatsApp

Landing page en **React + Vite + TypeScript con CSS propio (sin Tailwind)** para DJcasper (Estados Unidos y República Dominicana). El objetivo es convertir visitas en solicitudes de cotización personalizada por WhatsApp. No hay precios fijos ni datos inventados.

## Ejecutar en local
```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm test           # Vitest + Testing Library
npm run build      # producción en dist/
npm run preview    # probar el build
```

## Estilos (CSS propio)
- `src/styles/base.css`: variables de marca (`:root`), tipografías, botones y utilidades.
- `src/styles/layout.css`: navbar, hero, tira de eventos, footer y botón flotante de WhatsApp.
- `src/styles/sections.css`: servicios, sobre mí, proceso, formulario, galería, redes, FAQ y llamada final.
- Los colores y radios se cambian en `:root` de `base.css`.

## Logo
`public/logo.png` (completo) y `public/logo-mark.png` (solo la marca) son versiones transparentes del logo de DJcasper; también `favicon.png` y `apple-touch-icon.png`.

## Datos comerciales (un solo lugar)
- `src/config/site.ts`: marca, WhatsApp (`whatsappNumber` se define una vez), Instagram, YouTube, países, `privacyPolicyUrl`, `showPlaceholderBadges`.
- `src/config/services.ts`, `gallery.ts`, `testimonials.ts`, `pending.ts`: servicios, galería, testimonios reales y pendientes.
- `src/content/es.ts`: **todo el texto** (servicios, FAQ, mensajes de WhatsApp). Para inglés: crear `src/content/en.ts` con el tipo `Copy` y registrarlo en `src/content/index.ts`.
- `src/lib/whatsapp.ts`: utilidad tipada de enlaces `wa.me` (codificación con `encodeURIComponent`).

## Reemplazar las imágenes provisionales
Las imágenes actuales son **ilustraciones SVG de demostración**, no fotos de DJcasper (`public/images/demo/`).
1. Añade tus fotos (idealmente `.webp`/`.avif`, ~1600 px de ancho máx. para hero, ~800 px para tarjetas).
2. Cambia las rutas, `width` y `height` en `src/config/services.ts` y `gallery.ts`; el hero, "Sobre mí" y la llamada final usan `hero.svg`, `about.svg` y `cta.svg` (en `Hero.tsx`, `About.tsx`, `FinalCta.tsx` y el `<link rel="preload">` de `index.html`).
3. Actualiza los textos alternativos en `src/content/es.ts`.
4. Pon `showPlaceholderBadges: false` y `placeholder: false` en cada recurso real.
5. Sustituye `public/og-image.png` (1200×630) por una imagen real.
Para vídeo: añade un elemento `kind: 'video'` en `gallery.ts` (nunca se reproduce solo).

## Publicar (Vercel o Netlify)
- Build: `npm run build` · Salida: `dist` (ya hay `vercel.json` y `netlify.toml`).
- Variable `VITE_SITE_URL=https://tu-dominio.com` (sin barra final): activa canonical, `og:url`, `og:image`, `sitemap.xml` y `Sitemap:` en `robots.txt`. Sin ella no se emiten URLs absolutas.
- No usa rutas, así que no hace falta redirección SPA.

## SEO: limitación de una SPA
El contenido se genera en el navegador; Google lo procesa, pero otros rastreadores y vistas previas dependen de las metaetiquetas de `index.html` (incluidas) y de un bloque `<noscript>`. Si se quiere HTML prerrenderizado, la opción compatible con Vite sin cambiar de stack es `vite-react-ssg`. Para posicionamiento por ciudad/evento, espera a confirmar las zonas de cobertura.

## Pendiente antes del lanzamiento
Ver `src/config/pending.ts`: fotos reales, biografía/estilos/idiomas/equipamiento confirmados, ciudades de cobertura, testimonios autorizados, dominio y política de privacidad, versión en inglés.
