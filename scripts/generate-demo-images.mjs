// Genera ilustraciones de DEMOSTRACIÓN (SVG originales, no fotografías) en public/images/demo.
// Sustitúyelas por fotografías reales de DJcasper (ver README: "Cómo reemplazar las imágenes").
import { writeFileSync, mkdirSync } from 'node:fs'

const OUT = 'public/images/demo'
mkdirSync(OUT, { recursive: true })

function rng(seed) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}
const f = (n) => Number(n.toFixed(1))

function scene({ name, w, h, seed, a = '#A855F7', b = '#22D3EE', kind = 'crowd', beams = 5, crowd = true, mood = 1 }) {
  const r = rng(seed)
  let g = ''
  g += `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07090D"/><stop offset=".6" stop-color="#0D1118"/><stop offset="1" stop-color="#121722"/></linearGradient>
  <linearGradient id="ba" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}" stop-opacity="${0.55 * mood}"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></linearGradient>
  <linearGradient id="bb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b}" stop-opacity="${0.5 * mood}"/><stop offset="1" stop-color="${b}" stop-opacity="0"/></linearGradient>
  <radialGradient id="glow" cx=".5" cy=".62" r=".6"><stop offset="0" stop-color="${a}" stop-opacity=".45"/><stop offset=".5" stop-color="${b}" stop-opacity=".12"/><stop offset="1" stop-color="#07090D" stop-opacity="0"/></radialGradient>
  <filter id="blur"><feGaussianBlur stdDeviation="${f(w / 160)}"/></filter>
  <filter id="blur2"><feGaussianBlur stdDeviation="${f(w / 60)}"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" fill="url(#glow)"/>`
  if (kind === 'elegant') {
    for (let i = 0; i < 46; i++) {
      const x = r() * w, y = r() * h * 0.7, rad = (0.008 + r() * 0.03) * w
      g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="${r() > 0.5 ? a : b}" opacity="${f(0.15 + r() * 0.4)}" filter="url(#blur)"/>`
    }
  } else {
    for (let i = 0; i < beams; i++) {
      const x0 = ((i + 0.5) / beams) * w + (r() - 0.5) * w * 0.1
      const x1 = x0 + (r() - 0.5) * w * 0.9
      const half = w * (0.025 + r() * 0.03)
      const fill = i % 2 ? 'url(#bb)' : 'url(#ba)'
      g += `<polygon points="${f(x0 - 4)},-10 ${f(x0 + 4)},-10 ${f(x1 + half)},${h} ${f(x1 - half)},${h}" fill="${fill}" filter="url(#blur)"/>`
    }
    for (let i = 0; i < beams; i++) {
      const x = ((i + 0.5) / beams) * w
      g += `<circle cx="${f(x)}" cy="${f(h * 0.04)}" r="${f(w * 0.008)}" fill="#F8FAFC" opacity=".8"/>`
    }
  }
  if (kind === 'booth' || kind === 'crowd') {
    const cx = w * 0.5, baseY = h * 0.66
    g += `<ellipse cx="${f(cx)}" cy="${f(baseY - h * 0.14)}" rx="${f(w * 0.2)}" ry="${f(h * 0.2)}" fill="${b}" opacity=".12" filter="url(#blur2)"/>`
    g += `<rect x="${f(cx - w * 0.17)}" y="${f(baseY)}" width="${f(w * 0.34)}" height="${f(h * 0.1)}" rx="${f(w * 0.006)}" fill="#121722" stroke="${a}" stroke-opacity=".6" stroke-width="${f(w * 0.0025)}"/>`
    g += `<rect x="${f(cx - w * 0.15)}" y="${f(baseY - h * 0.012)}" width="${f(w * 0.3)}" height="${f(h * 0.014)}" fill="#181F2B"/>`
    g += `<circle cx="${f(cx - w * 0.07)}" cy="${f(baseY - h * 0.005)}" r="${f(w * 0.032)}" fill="#0D1118" stroke="${b}" stroke-width="${f(w * 0.003)}"/><circle cx="${f(cx + w * 0.07)}" cy="${f(baseY - h * 0.005)}" r="${f(w * 0.032)}" fill="#0D1118" stroke="${a}" stroke-width="${f(w * 0.003)}"/>`
    g += `<circle cx="${f(cx)}" cy="${f(baseY - h * 0.19)}" r="${f(w * 0.028)}" fill="#07090D"/>`
    g += `<path d="M${f(cx - w * 0.045)} ${f(baseY - h * 0.01)} L${f(cx - w * 0.03)} ${f(baseY - h * 0.16)} Q${f(cx)} ${f(baseY - h * 0.2)} ${f(cx + w * 0.03)} ${f(baseY - h * 0.16)} L${f(cx + w * 0.045)} ${f(baseY - h * 0.01)} Z" fill="#07090D"/>`
    g += `<path d="M${f(cx - w * 0.03)} ${f(baseY - h * 0.14)} L${f(cx - w * 0.085)} ${f(baseY - h * 0.26)} M${f(cx + w * 0.03)} ${f(baseY - h * 0.14)} L${f(cx + w * 0.07)} ${f(baseY - h * 0.03)}" stroke="#07090D" stroke-width="${f(w * 0.011)}" stroke-linecap="round" fill="none"/>`
    g += `<path d="M${f(cx - w * 0.04)} ${f(baseY - h * 0.2)} Q${f(cx)} ${f(baseY - h * 0.255)} ${f(cx + w * 0.04)} ${f(baseY - h * 0.2)}" stroke="${a}" stroke-width="${f(w * 0.004)}" fill="none"/>`
  }
  if (kind === 'mixer') {
    const cx = w / 2, cy = h * 0.52
    g += `<rect x="${f(w * 0.12)}" y="${f(h * 0.22)}" width="${f(w * 0.76)}" height="${f(h * 0.56)}" rx="${f(w * 0.02)}" fill="#121722" stroke="#293142" stroke-width="${f(w * 0.004)}"/>`
    for (const sx of [0.3, 0.7]) {
      const x = w * sx
      g += `<circle cx="${f(x)}" cy="${f(cy)}" r="${f(h * 0.2)}" fill="#0D1118" stroke="${sx < 0.5 ? a : b}" stroke-width="${f(w * 0.006)}"/><circle cx="${f(x)}" cy="${f(cy)}" r="${f(h * 0.13)}" fill="none" stroke="#293142" stroke-width="${f(w * 0.004)}"/><circle cx="${f(x)}" cy="${f(cy)}" r="${f(h * 0.03)}" fill="${sx < 0.5 ? a : b}"/>`
    }
    for (let i = 0; i < 4; i++) {
      const x = cx - w * 0.06 + i * w * 0.04
      g += `<rect x="${f(x)}" y="${f(h * 0.32)}" width="${f(w * 0.008)}" height="${f(h * 0.36)}" fill="#293142"/><rect x="${f(x - w * 0.008)}" y="${f(h * (0.4 + r() * 0.18))}" width="${f(w * 0.024)}" height="${f(h * 0.04)}" rx="3" fill="${i % 2 ? b : a}"/>`
    }
  }
  if (kind === 'lights') {
    for (let i = 0; i < 7; i++) {
      const x = ((i + 0.5) / 7) * w
      g += `<circle cx="${f(x)}" cy="${f(h * 0.12)}" r="${f(w * 0.05)}" fill="${i % 2 ? b : a}" opacity=".25" filter="url(#blur2)"/>`
    }
  }
  if (crowd) {
    const n = Math.round(w / 22)
    for (let i = 0; i < n; i++) {
      const x = (i / n) * w + (r() - 0.5) * 16
      const row = r()
      const y = h * (0.86 + row * 0.18)
      const s = w * (0.014 + row * 0.014)
      g += `<circle cx="${f(x)}" cy="${f(y - s * 1.7)}" r="${f(s * 0.8)}" fill="#05060A"/><path d="M${f(x - s * 1.5)} ${f(h + 4)} Q${f(x)} ${f(y - s * 1.5)} ${f(x + s * 1.5)} ${f(h + 4)} Z" fill="#05060A"/>`
      if (r() > 0.88) g += `<path d="M${f(x + s)} ${f(y - s * 0.6)} L${f(x + s * 1.6)} ${f(y - s * 3.4)}" stroke="#05060A" stroke-width="${f(s * 0.5)}" stroke-linecap="round"/>`
    }
  }
  g += `<rect width="${w}" height="${h}" fill="url(#bg)" opacity=".0"/>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Imagen de demostración">${g}</svg>`
  writeFileSync(`${OUT}/${name}.svg`, svg)
}

const V = '#A855F7', C = '#22D3EE', P = '#E879F9', B = '#60A5FA'
// Hero y secciones grandes
scene({ name: 'hero', w: 1920, h: 1080, seed: 11, kind: 'booth', beams: 7 })
scene({ name: 'about', w: 960, h: 1200, seed: 23, kind: 'booth', beams: 4, a: C, b: V })
scene({ name: 'cta', w: 1920, h: 900, seed: 37, kind: 'crowd', beams: 9, a: V, b: C })
// Servicios (4:3)
scene({ name: 'service-boda', w: 800, h: 600, seed: 41, kind: 'elegant', crowd: false, a: P, b: V })
scene({ name: 'service-cumpleanos', w: 800, h: 600, seed: 42, kind: 'crowd', beams: 4, a: C, b: V })
scene({ name: 'service-xv', w: 800, h: 600, seed: 43, kind: 'elegant', crowd: true, a: V, b: C })
scene({ name: 'service-corporativo', w: 800, h: 600, seed: 44, kind: 'lights', beams: 3, crowd: true, a: B, b: C })
scene({ name: 'service-fiesta-privada', w: 800, h: 600, seed: 45, kind: 'booth', beams: 5, a: V, b: C })
scene({ name: 'service-celebracion-especial', w: 800, h: 600, seed: 46, kind: 'elegant', crowd: false, a: C, b: P })
// Galería
console.log('Imágenes de demostración generadas en', OUT)
