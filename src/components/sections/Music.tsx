import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Volume2 } from 'lucide-react'
import { music } from '../../config/media'
import { useCopy } from '../../hooks/useCopy'
import { SectionHeading } from '../ui/SectionHeading'

const YT_ORIGIN = 'https://www.youtube-nocookie.com'

/**
 * YouTube se carga cuando el reproductor entra en pantalla (en silencio, como exigen los navegadores),
 * se pausa al salir y vuelve a reproducirse al regresar. El sonido solo se activa con un clic.
 */
export function Music() {
  const copy = useCopy()
  const id = music.youtubeVideoId
  const [active, setActive] = useState(false)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const ready = useRef(false)
  const inView = useRef(false)
  const hasObserver = typeof IntersectionObserver !== 'undefined'

  const send = useCallback((func: string, args: unknown[] = []) => {
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), YT_ORIGIN)
  }, [])

  useEffect(() => {
    const el = playerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting
        if (entry.isIntersecting) setActive(true)
        if (ready.current) send(entry.isIntersecting ? 'playVideo' : 'pauseVideo')
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [send])

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YT_ORIGIN || typeof e.data !== 'string') return
      try {
        const data = JSON.parse(e.data) as { event?: string }
        if (data.event === 'onError') setFailed(true)
      } catch {
        /* mensaje que no es JSON */
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const onFrameLoad = () => {
    ready.current = true
    // Pide a YouTube que envíe eventos (para detectar errores de reproducción).
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), YT_ORIGIN)
    if (hasObserver && !inView.current) send('pauseVideo')
  }

  const enableSound = () => {
    send('unMute')
    send('setVolume', [100])
    send('playVideo')
    setMuted(false)
  }

  const origin = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''
  const src = `${YT_ORIGIN}/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0&enablejsapi=1&origin=${origin}`

  return (
    <section id="musica" aria-labelledby="musica-title" className="section">
      <div className="music">
        <SectionHeading id="musica-title" title={copy.music.title} description={copy.music.description} />
        <div className="player" ref={playerRef}>
          {failed ? (
            <div className="player__error" role="alert">
              <h3>{copy.music.errorTitle}</h3>
              <p>{copy.music.errorText}</p>
            </div>
          ) : active ? (
            <>
              <iframe
                ref={frameRef}
                src={src}
                title={copy.music.iframeTitle}
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={onFrameLoad}
              />
              {muted ? (
                <button type="button" className="player__sound" onClick={enableSound}>
                  <Volume2 aria-hidden="true" size={20} />
                  {copy.music.soundOn}
                </button>
              ) : null}
            </>
          ) : (
            <button type="button" className="player__facade" onClick={() => setActive(true)}>
              <span className="player__play">
                <Play aria-hidden="true" size={30} fill="currentColor" />
              </span>
              <span className="player__label">{copy.music.play}</span>
              <span className="player__hint">{copy.music.playHint}</span>
            </button>
          )}
        </div>
        <a className="music__link" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
          {copy.music.watch}
          <span className="sr-only"> {copy.common.externalHint}</span>
        </a>
      </div>
    </section>
  )
}
