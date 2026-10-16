import { QuoteProvider } from '../context/QuoteContext'
import { useCopy } from '../hooks/useCopy'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp'
import { Hero } from '../components/sections/Hero'
import { EventStrip } from '../components/sections/EventStrip'
import { Services } from '../components/sections/Services'
import { About } from '../components/sections/About'
import { Process } from '../components/sections/Process'
import { Quote } from '../components/sections/Quote'
import { Gallery } from '../components/sections/Gallery'
import { Music } from '../components/sections/Music'
import { Social } from '../components/sections/Social'
import { Testimonials } from '../components/sections/Testimonials'
import { Faq } from '../components/sections/Faq'
import { FinalCta } from '../components/sections/FinalCta'

export function App() {
  const copy = useCopy()
  return (
    <QuoteProvider>
      <a href="#contenido" className="skip-link">
        {copy.common.skipToContent}
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <EventStrip />
        <Services />
        <About />
        <Process />
        <Quote />
        <Gallery />
        <Music />
        <Social />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </QuoteProvider>
  )
}
