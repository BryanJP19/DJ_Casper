import type { Plugin } from 'vite'

/**
 * Inyecta canonical / og:url / og:image y genera sitemap.xml y robots.txt
 * únicamente cuando se define VITE_SITE_URL (el dominio real publicado).
 * Sin dominio confirmado no se emiten URLs absolutas inventadas.
 */
export function seoPlugin(siteUrlRaw?: string): Plugin {
  const siteUrl = siteUrlRaw?.trim().replace(/\/+$/, '')
  return {
    name: 'djcasper-seo',
    transformIndexHtml(html) {
      if (!siteUrl) return html
      const tags = [
        `<link rel="canonical" href="${siteUrl}/" />`,
        `<meta property="og:url" content="${siteUrl}/" />`,
        `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
        `<meta name="twitter:image" content="${siteUrl}/og-image.png" />`,
      ].join('\n    ')
      return html.replace('</head>', `    ${tags}\n  </head>`)
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml` : ''].filter(Boolean).join('\n') + '\n'
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      if (siteUrl) {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      }
    },
  }
}
