import type { CountryCode } from '../config/site'
import type { DurationId, EventTypeId, InterestId } from '../config/services'

export interface HeadlineSegment {
  text: string
  accent?: 'violet' | 'cyan'
}

/** Todo el texto visible del sitio. Para inglés: crear en.ts con esta misma forma. */
export const es = {
  meta: {
    title: 'DJcasper | DJ profesional para bodas, fiestas y eventos',
    description:
      'Conoce DJcasper y solicita una cotización personalizada para tu evento en Estados Unidos o República Dominicana. Contacta por WhatsApp.',
  },
  common: {
    skipToContent: 'Saltar al contenido',
    externalHint: '(se abre en una pestaña nueva)',
    demoImage: 'Imagen de demostración',
    close: 'Cerrar',
    marketsLine: 'Estados Unidos · República Dominicana',
  },
  nav: {
    label: 'Principal',
    logoLabel: 'DJCASPER, ir al inicio',
    links: [
      { id: 'inicio', label: 'Inicio' },
      { id: 'servicios', label: 'Servicios' },
      { id: 'sobre-mi', label: 'Sobre mí' },
      { id: 'galeria', label: 'Galería' },
      { id: 'contacto', label: 'Contacto' },
    ],
    cta: 'Cotizar ahora',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  hero: {
    eyebrow: 'DJ PROFESIONAL PARA EVENTOS',
    headline: [
      [{ text: 'TU EVENTO.' }],
      [{ text: 'TU ' }, { text: 'MÚSICA.', accent: 'violet' }],
      [{ text: 'UNA EXPERIENCIA ' }, { text: 'INOLVIDABLE.', accent: 'cyan' }],
    ] as HeadlineSegment[][],
    description:
      'Cada celebración tiene su propia energía. Con DJcasper, la música se adapta a tu evento para crear el ambiente que tus invitados recordarán.',
    primaryCta: 'Cotizar por WhatsApp',
    secondaryCta: 'Ver servicios',
    imageAlt: 'Ilustración de demostración: silueta de un DJ tras su equipo, con luces violeta y cian sobre el público',
  },
  strip: { label: 'Tipos de evento', cta: 'Cotizar' },
  services: {
    title: 'EL AMBIENTE PERFECTO PARA CADA OCASIÓN',
    description: 'Soluciones musicales adaptadas al estilo, la energía y las necesidades de cada celebración.',
    cta: 'Consultar disponibilidad',
    items: {
      boda: {
        name: 'Bodas',
        description: 'Música pensada para acompañar cada momento de un día que quieres recordar.',
        phrase: 'una boda',
        alt: 'Ilustración de demostración: luces cálidas desenfocadas en un ambiente elegante',
      },
      cumpleanos: {
        name: 'Cumpleaños',
        description: 'El ritmo justo para que el festejado y sus invitados disfruten la celebración.',
        phrase: 'un cumpleaños',
        alt: 'Ilustración de demostración: público bailando bajo luces cian y violeta',
      },
      xv: {
        name: 'XV años',
        description: 'Una noche especial merece una selección musical a la altura de la ocasión.',
        phrase: 'unos XV años',
        alt: 'Ilustración de demostración: luces violeta sobre una pista de baile',
      },
      corporativo: {
        name: 'Eventos corporativos',
        description: 'Ambiente musical adecuado para encuentros de empresa, lanzamientos y celebraciones de equipo.',
        phrase: 'un evento corporativo',
        alt: 'Ilustración de demostración: haces de luz azul y cian sobre un salón',
      },
      'fiesta-privada': {
        name: 'Fiestas privadas',
        description: 'Música para reuniones privadas con el estilo y la energía que tú elijas.',
        phrase: 'una fiesta privada',
        alt: 'Ilustración de demostración: DJ frente a una pista iluminada en violeta',
      },
      'celebracion-especial': {
        name: 'Celebraciones especiales',
        description: 'Aniversarios, graduaciones y otras ocasiones que merecen una banda sonora propia.',
        phrase: 'una celebración especial',
        alt: 'Ilustración de demostración: destellos de luz rosa y cian en un ambiente festivo',
      },
      otro: { name: 'Otro evento', description: '', phrase: 'un evento', alt: '' },
    } as Record<EventTypeId, { name: string; description: string; phrase: string; alt: string }>,
  },
  about: {
    title: 'MÁS QUE MÚSICA, CREAMOS MOMENTOS',
    text:
      'En DJcasper creemos que la música es una parte esencial de cualquier celebración. Nuestro objetivo es crear el ambiente adecuado para cada ocasión, adaptando la experiencia musical al público, al estilo del evento y a los momentos que merecen recordarse.',
    imageAlt: 'Ilustración de demostración: silueta de DJ con luces cian y violeta',
    whyTitle: '¿Por qué DJcasper?',
    facts: [
      { title: 'Música adaptada a tu evento', text: 'Se ajusta al público, al estilo y a los momentos de tu celebración.' },
      { title: 'Propuesta personalizada', text: 'Sin tarifas fijas: cada cotización parte de los detalles de tu evento.' },
      { title: 'Atención directa por WhatsApp', text: 'Conversas con DJcasper para resolver dudas y confirmar disponibilidad.' },
      { title: 'Estados Unidos y República Dominicana', text: 'La cobertura por ciudad se confirma al cotizar.' },
    ],
  },
  process: {
    title: 'CÓMO FUNCIONA LA CONTRATACIÓN',
    description: 'Cuatro pasos sencillos, de la primera conversación al evento.',
    steps: [
      { title: 'Cuéntanos tu evento', text: 'Indica qué tipo de celebración estás organizando.' },
      { title: 'Personalizamos la propuesta', text: 'DJcasper recibe los detalles necesarios para preparar una cotización.' },
      {
        title: 'Confirmamos disponibilidad y detalles',
        text: 'Se conversan la fecha, la ubicación, las necesidades del evento y las condiciones del servicio.',
      },
      { title: 'Preparamos la experiencia', text: 'Una vez acordados los detalles, se coordinan los aspectos de la contratación.' },
    ],
  },
  quote: {
    title: 'TU EVENTO MERECE UNA PROPUESTA A SU MEDIDA',
    description:
      'Cuéntanos los detalles de tu celebración y contacta con DJcasper para consultar disponibilidad y recibir una cotización personalizada.',
    categoriesLabel: 'Elige el tipo de propuesta',
    categories: {
      privadas: { name: 'Celebraciones privadas', text: 'Fiestas y reuniones con tu estilo.' },
      bodas: { name: 'Bodas y ocasiones especiales', text: 'Momentos que merecen su propia música.' },
      corporativos: { name: 'Eventos corporativos', text: 'Ambiente para encuentros de empresa.' },
      personalizados: { name: 'Eventos personalizados', text: 'Cuéntanos tu idea y la conversamos.' },
    },
    selectedAnnouncement: 'Tipo de evento seleccionado:',
  },
  form: {
    title: 'Datos de tu evento',
    requiredHint: 'Los campos con * son obligatorios.',
    privacyNote:
      'Estos datos solo sirven para preparar tu mensaje de WhatsApp; este sitio no los guarda. No se envía nada hasta que tú lo envíes desde WhatsApp.',
    fields: {
      name: { label: 'Nombre', placeholder: 'Tu nombre' },
      phone: { label: 'Número de contacto', placeholder: '+1 973 000 0000', hint: 'Incluye el código de país.' },
      eventType: { label: 'Tipo de evento', placeholder: 'Selecciona una opción' },
      date: { label: 'Fecha del evento' },
      country: { label: 'País', placeholder: 'Selecciona un país' },
      city: { label: 'Ciudad o ubicación', placeholder: 'Ej.: ciudad o sector' },
      duration: { label: 'Duración aproximada', placeholder: 'Selecciona una opción' },
      guests: { label: 'Número estimado de invitados', hint: 'Opcional' },
      interests: { label: 'Servicios que deseas consultar', hint: 'Opcional' },
      notes: { label: 'Información adicional', hint: 'Opcional', placeholder: 'Estilo musical, momentos clave, dudas…' },
    },
    countries: { US: 'Estados Unidos', DO: 'República Dominicana' } as Record<CountryCode, string>,
    durations: {
      'hasta-2': 'Hasta 2 horas',
      '3-4': 'De 3 a 4 horas',
      '5-6': 'De 5 a 6 horas',
      '7-mas': '7 horas o más',
      'no-se': 'Aún no lo sé',
    } as Record<DurationId, string>,
    interests: {
      'evento-completo': 'Música para todo el evento',
      ceremonia: 'Música para la ceremonia',
      'seleccion-personalizada': 'Selección musical personalizada',
      otro: 'Otro (cuéntanos en la información adicional)',
    } as Record<InterestId, string>,
    errors: {
      nameRequired: 'Escribe tu nombre.',
      nameShort: 'El nombre debe tener al menos 2 caracteres.',
      phoneRequired: 'Escribe un número de contacto.',
      phoneInvalid: 'Revisa el número: usa entre 7 y 15 dígitos, con código de país.',
      eventTypeRequired: 'Selecciona el tipo de evento.',
      dateRequired: 'Indica la fecha del evento.',
      dateInvalid: 'La fecha no es válida.',
      datePast: 'La fecha no puede ser anterior a hoy.',
      countryRequired: 'Selecciona el país.',
      cityRequired: 'Indica la ciudad o ubicación.',
      durationRequired: 'Selecciona la duración aproximada.',
      guestsInvalid: 'Escribe un número entero entre 1 y 100000, o deja el campo vacío.',
      summary: (n: number) => (n === 1 ? 'Hay 1 campo por corregir.' : `Hay ${n} campos por corregir.`),
    },
    submit: 'Preparar mensaje en WhatsApp',
    submitting: 'Abriendo WhatsApp…',
    result: {
      opened:
        'Preparamos tu mensaje y abrimos WhatsApp. Revísalo y envíalo desde allí: todavía no se ha enviado nada.',
      blocked:
        'Tu navegador bloqueó la ventana. Usa el enlace para abrir WhatsApp con tu mensaje ya preparado.',
      link: 'Abrir WhatsApp con mi mensaje',
    },
  },
  gallery: {
    title: 'ASÍ SE VIVE LA EXPERIENCIA DJCASPER',
    description: 'Una muestra visual del ambiente que acompaña a cada celebración.',
    open: 'Ampliar',
    lightbox: { label: 'Visor de galería', prev: 'Anterior', next: 'Siguiente', counter: (i: number, n: number) => `${i} de ${n}` },
    items: {
      g1: { label: 'DJcasper en acción', alt: 'DJ con gorra mezclando en un controlador entre dos bocinas, con luces móviles a los lados' },
      g2: { label: 'Momento de boda', alt: 'Pareja de novios bailando en un salón mientras el controlador del DJ aparece en primer plano' },
      g3: { label: 'Cabina de DJ', alt: 'Cabina negra de DJ con dos bocinas sobre trípodes y luces azul y roja en la pared' },
      g4: { label: 'Montaje para celebración', alt: 'Cabina de DJ con bocinas junto a una decoración de globos y mariposas rosadas' },
      g5: { label: 'Detrás de la consola', alt: 'DJ con gorra y audífonos mezclando en un controlador junto a una bocina' },
      g6: { label: 'Pista animada', alt: 'Invitada levantando la mano en un salón con luces tenues y barras luminosas, con la laptop del DJ en primer plano' },
      g7: { label: 'En la mezcla', alt: 'DJ con gorra mirando de lado mientras mueve los controles de su consola' },
      g8: { label: 'Equipo de mezcla', alt: 'Controlador, laptop y micrófono de DJ frente a un salón de eventos con luces azules y rosadas' },
      g9: { label: 'Concentración', alt: 'DJ con audífonos ajustándolos mientras mezcla frente a una bocina' },
    } as Record<string, { label: string; alt: string }>,
  },
  music: {
    title: 'ESCUCHA EL SONIDO DJCASPER',
    description:
      'El vídeo empieza (sin sonido) cuando llegas aquí y se pausa cuando te vas. Pulsa «Activar sonido» para escucharlo.',
    play: 'Reproducir música',
    playHint: 'Se abre el reproductor de YouTube',
    soundOn: 'Activar sonido',
    iframeTitle: 'Reproductor de YouTube de DJcasper',
    watch: 'Ver en YouTube',
    errorTitle: 'YouTube no permite reproducir este vídeo aquí',
    errorText: 'Puede que su propietario haya desactivado la reproducción en otras webs. Ábrelo directamente en YouTube.',
  },
  social: {
    title: 'SIGUE EL UNIVERSO DJCASPER',
    description: 'Mira más en sus canales oficiales.',
    instagram: { name: 'Instagram', text: 'Fotos y momentos recientes.', cta: 'Visitar Instagram' },
    youtube: { name: 'YouTube', text: 'Vídeos y mezclas en el canal.', cta: 'Visitar YouTube' },
  },
  testimonials: {
    title: 'LA CONFIANZA TAMBIÉN SE CELEBRA',
    description: 'Las opiniones de clientes se mostrarán aquí cuando estén verificadas y autorizadas.',
    fallbackTitle: 'Qué esperar al cotizar',
    fallback: [
      { title: 'Conversación directa', text: 'Hablas por WhatsApp con DJcasper, sin intermediarios en este sitio.' },
      { title: 'Propuesta según tu evento', text: 'La cotización parte de tu fecha, ubicación y necesidades.' },
      { title: 'Disponibilidad confirmada contigo', text: 'La fecha se confirma en la conversación, no de forma automática.' },
    ],
  },
  faq: {
    title: 'PREGUNTAS FRECUENTES',
    items: [
      {
        q: '¿En qué lugares trabaja DJcasper?',
        a: 'DJcasper atiende solicitudes para eventos en Estados Unidos y República Dominicana. La cobertura de cada ciudad o zona se confirma directamente al cotizar, así que indícanos dónde será tu evento.',
      },
      {
        q: '¿Cómo puedo solicitar una cotización?',
        a: 'Completa el formulario de esta página: prepararemos un mensaje con tus datos y abriremos WhatsApp para que lo revises y lo envíes. También puedes escribir directamente al número de WhatsApp.',
      },
      {
        q: '¿Qué tipos de eventos puede consultar un cliente?',
        a: 'Bodas, cumpleaños, XV años, eventos corporativos, fiestas privadas y otras celebraciones especiales. Si tu evento es distinto, cuéntalo y lo conversamos.',
      },
      {
        q: '¿Cómo se determina el precio del servicio?',
        a: 'No hay tarifas fijas publicadas. El precio se determina mediante una cotización personalizada, según los detalles de tu evento.',
      },
      {
        q: '¿Con cuánta anticipación debería consultar una fecha?',
        a: 'Lo mejor es consultar en cuanto tengas la fecha definida. La disponibilidad no se reserva automáticamente: se confirma directamente en la conversación.',
      },
      {
        q: '¿Puedo solicitar una selección musical personalizada?',
        a: 'Sí, puedes indicarlo en el formulario o por WhatsApp y conversarlo directamente. Lo que sea posible para tu evento se confirma contigo.',
      },
      {
        q: '¿Qué información debo proporcionar para recibir una propuesta?',
        a: 'Tu nombre y un número de contacto, el tipo de evento, la fecha, el país y la ciudad o ubicación, y la duración aproximada. Opcionalmente, el número de invitados y cualquier detalle adicional.',
      },
    ],
  },
  finalCta: {
    title: 'VAMOS A DARLE VIDA A TU PRÓXIMO EVENTO',
    description: 'Cuéntanos qué estás organizando y hablemos de una propuesta musical diseñada para tu celebración.',
    primary: 'Cotizar por WhatsApp',
    secondary: 'Ver Instagram',
    imageAlt: '',
  },
  footer: {
    description:
      'DJ profesional y servicios musicales para eventos. Cotizaciones personalizadas para celebraciones en Estados Unidos y República Dominicana.',
    sections: 'Secciones',
    contact: 'Contacto',
    markets: 'Mercados de servicio',
    privacy: 'Política de privacidad',
    rights: 'Todos los derechos reservados.',
  },
  floatingWhatsApp: 'Cotizar por WhatsApp',
  whatsapp: {
    generic:
      'Hola, DJcasper. Me gustaría solicitar una cotización personalizada para mi evento. ¿Podrían ayudarme con información sobre disponibilidad y servicios?',
    contextual: (phrase: string) =>
      `Hola, DJcasper. Me gustaría solicitar una cotización personalizada para ${phrase}. Quisiera consultar disponibilidad y conocer las opciones de servicio.`,
    quoteIntro: 'Hola, DJcasper. Me gustaría solicitar una cotización personalizada. Estos son los datos de mi evento:',
    labels: {
      name: 'Nombre',
      phone: 'Contacto',
      eventType: 'Tipo de evento',
      date: 'Fecha',
      country: 'País',
      city: 'Ciudad o ubicación',
      duration: 'Duración aproximada',
      guests: 'Invitados (aprox.)',
      interests: 'Quiero consultar',
      notes: 'Información adicional',
    },
    quoteOutro: '¿Podrían confirmarme disponibilidad y enviarme una propuesta? Gracias.',
    dateLocale: 'es',
  },
}

export type Copy = typeof es
