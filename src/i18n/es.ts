import type { Dict } from "./pt";

/** Borrador en español: debe ser revisado por Samara antes de liberar el idioma para indexación. */
export const es: Dict = {
  specialty: "Fisioterapia Pélvica",
  siteDescription: (wa) =>
    `Fisioterapia pélvica para hombres y mujeres: evaluación individual, escucha y acogida.${wa ? " Reserva por WhatsApp." : ""}`,

  a11y: {
    skip: "Saltar al contenido",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    navMain: "Principal",
    navMobile: "Menú móvil",
    navFooter: "Pie de página",
    navBreadcrumb: "Estás en",
    shortcut: "Acceso directo para reservar",
    scheduleWa: "Reservar por WhatsApp",
    themeToDark: "Activar tema oscuro",
    themeToLight: "Activar tema claro",
    language: "Idioma",
  },

  nav: {
    home: "Inicio",
    about: "Sobre mí",
    treatments: "Tratamientos",
    how: "Cómo funciona",
    faq: "Preguntas",
    contact: "Contacto",
    content: "Contenidos",
    privacy: "Política de privacidad",
  },

  footer: {
    blurb:
      "Fisioterapia pélvica con escucha, privacidad y cuidado individualizado, para hombres y mujeres.",
    navigation: "Navegación",
    contact: "Contacto",
    waSoon: "WhatsApp próximamente",
    rights: "Todos los derechos reservados.",
    disclaimer:
      "El contenido de este sitio es educativo y no sustituye la evaluación de un profesional de la salud.",
  },

  hero: {
    eyebrow: "Fisioterapia Pélvica en Goiânia",
    about: "Conoce mi trabajo",
    points: ["Etapas explicadas", "Secreto profesional", "Para hombres y mujeres"],
  },

  intro: {
    eyebrow: "Qué es la fisioterapia pélvica",
    text: "La fisioterapia pélvica cuida la región que sostiene y coordina funciones esenciales del día a día: orinar, evacuar, moverse y vivir la intimidad. Es un cuidado para *hombres y mujeres,* en cualquier etapa de la vida.",
  },

  areas: {
    eyebrow: "Áreas de actuación",
    title: "Dónde la fisioterapia pélvica *puede* ayudar.",
    text: "Temas por los que suele buscarse una evaluación. Cada caso es único y el plan nace de tu evaluación individual.",
    all: "Ver todos los tratamientos",
  },

  /** Apresentação profissional (texto da Samara), exibida em Sobre mim e na página Sobre. */
  bio: [
    "Soy Samara Rúbia, fisioterapeuta egresada de la Pontificia Universidad Católica de Goiás (PUC Goiás), con 5 años de trabajo en Goiânia y formación en Fisioterapia Pélvica.",
    "Mi trabajo está dirigido al cuidado de mujeres y hombres que presentan alteraciones relacionadas con el suelo pélvico.",
    "Creo en una atención individualizada, acogedora y basada en evidencia científica. Cada paciente tiene necesidades distintas y, por eso, realizo una evaluación detallada para comprender cada caso y definir un tratamiento personalizado.",
    "Busco mantenerme en constante actualización para ofrecer un cuidado seguro, individualizado y adecuado a las necesidades de cada paciente, contribuyendo a la mejora de los síntomas, de la función del suelo pélvico y de la calidad de vida.",
  ] as string[],

  aboutTeaser: {
    eyebrow: "Sobre mí",
    heading: "Atención especializada para tu *calidad de vida*",
    title: "Un espacio para hablar de lo *delicado,* sin prisa.",
    summary: (name) =>
      `Soy ${name}, fisioterapeuta pélvica. Creo en una atención en la que cada persona es escuchada con atención, entiende cada etapa y decide junto conmigo el camino de su cuidado.`,
    button: "Conocer mi historia",
  },

  journeySection: {
    eyebrow: "Cómo funciona la atención",
    title: "Del primer contacto al *seguimiento,* paso a paso.",
    details: "Ver detalles de la atención",
  },
  journey: [
    {
      title: "Primer contacto",
      text: "Envías un mensaje al WhatsApp profesional. Sin formularios y sin tener que contar detalles clínicos por escrito.",
    },
    {
      title: "Reserva de la cita",
      text: "Acordamos el mejor día y horario y recibes las indicaciones para la evaluación.",
    },
    {
      title: "Evaluación individual",
      text: "Una conversación sobre tu historia y tus molestias. Cada etapa se explica y solo ocurre con tu consentimiento.",
    },
    {
      title: "Conducta y seguimiento",
      text: "Con base en la evaluación, definimos juntos un plan individualizado y cómo será el seguimiento.",
    },
  ],

  differentialsSection: { eyebrow: "Diferenciales", title: "Lo que puedes esperar de *la atención.*" },
  differentials: [
    {
      title: "Atención individualizada",
      text: "Cada persona tiene una historia. El cuidado parte de la tuya.",
    },
    {
      title: "Escucha y acogida",
      text: "Un espacio para hablar de temas delicados, sin prisa y sin juicios.",
    },
    {
      title: "Respeto a la privacidad",
      text: "Secreto profesional y cuidado con cada información compartida.",
    },
    {
      title: "Etapas explicadas",
      text: "Entiendes qué se hará y por qué, antes de cualquier procedimiento.",
    },
    {
      title: "Plan terapéutico individualizado",
      text: "Conductas definidas a partir de la evaluación y ajustadas a lo largo del camino.",
    },
  ],

  faqSection: {
    eyebrow: "Preguntas frecuentes",
    title: "Preguntas que *suelen* surgir.",
    all: "Ver todas las preguntas",
  },

  location: {
    shortTitle: "Dónde encontrar la atención",
    soon: "La dirección, la modalidad y los horarios se darán a conocer pronto.",
    seeContact: "Ver contacto",
    eyebrow: "Ubicación",
    allChannels: "Todos los canales de contacto",
  },

  finalCta: {
    eyebrow: "Próximo paso",
    titleWa: "Tu cuidado empieza con una *conversación.*",
    titleNoWa: "Pronto, el primer *contacto.*",
    textWa:
      "Envía un mensaje para reservar tu evaluación. Sin compromiso y sin tener que detallar nada por escrito.",
    textNoWa:
      "Los canales de contacto y de reserva de citas aún están en preparación y se publicarán aquí en cuanto se confirmen.",
    buttonWa: "Reservar por WhatsApp",
    buttonNoWa: "Entiende cómo funciona",
  },

  office: { eyebrow: "Consultorio", title: "Un espacio pensado para *tu comodidad.*" },

  contactRows: {
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    address: "Dirección",
    modality: "Modalidad",
    hours: "Horarios",
    insurance: "Seguros",
    soon: "Próximamente",
    callWa: "Escribir por WhatsApp",
    hoursText: (open, close) => `De ${open} a ${close}`,
    hoursNote: "De lunes a viernes",
    modalities: { presencial: "Presencial", online: "En línea" },
    directions: "Cómo llegar",
    venueAt: (venue) => `Atención en ${venue}`,
    and: "y",
    pending: (names) => `${names}: se publicarán aquí en cuanto se confirmen.`,
  },

  page: {
    breadcrumbHome: "Inicio",
    ctaBandTitle: "¿Conversamos sobre tu cuidado?",
    ctaFaqTitle: "¿Te quedaron dudas?",
    ctaFaqLabel: "Preguntas frecuentes",
    ctaHowTitle: "¿Quieres entender la atención?",
    ctaHowLabel: "Cómo funciona",
    otherAreas: "Otras áreas",
  },

  home: {
    title: (name, specialty) => `${name} | ${specialty}`,
  },

  how: {
    metaTitle: "Cómo funciona la atención",
    metaDescription:
      "Del primer contacto por WhatsApp al seguimiento: así es la evaluación en fisioterapia pélvica, con privacidad y consentimiento.",
    eyebrow: "Cómo funciona",
    title: "Una atención *clara* en cada etapa.",
    lead: "Saber lo que va a pasar ayuda a llegar con más tranquilidad. Mira el recorrido y los cuidados que lo acompañan.",
    crumb: "Cómo funciona",
    care: [
      [
        "Privacidad",
        "Secreto profesional. Por WhatsApp, envía solo lo necesario para reservar la cita; los detalles clínicos se conversan en la evaluación.",
      ],
      [
        "Consentimiento",
        "Cada etapa se explica antes de ocurrir y solo se realiza con tu comprensión y acuerdo. Puedes pedir parar en cualquier momento.",
      ],
      [
        "Seguimiento",
        "El plan es individual y se revisa a lo largo del camino. No hay promesa de plazo ni de resultado.",
      ],
    ],
  },

  contactPage: {
    metaTitleWa: "Contacto y reserva de cita",
    metaTitleNoWa: "Contacto",
    metaDescWa:
      "Reserva tu evaluación de fisioterapia pélvica por WhatsApp y conoce los canales de contacto.",
    metaDescNoWa:
      "Canales de contacto de fisioterapia pélvica. La información de atención se publicará aquí en cuanto se confirme.",
    eyebrow: "Contacto",
    title: "¿Hablamos?",
    leadWa: "La cita se reserva por WhatsApp, de forma sencilla y sin formularios.",
    leadSome:
      "La reserva de citas aún no está disponible en este sitio. Mira abajo los canales confirmados.",
    leadNone:
      "Los canales de atención aún están en preparación. Esta página se actualizará con la información confirmada.",
    schedule: "Reservar evaluación",
    scheduleText:
      "Haz clic para abrir una conversación con un mensaje inicial listo. No envíes información clínica detallada por mensaje.",
    callWa: "Escribir por WhatsApp",
    preparing: "Canales en preparación",
    preparingText:
      "El número de WhatsApp para reservar citas se publicará aquí en cuanto se confirme. Hasta entonces, no hay canal de reserva disponible en este sitio.",
  },

  faqPage: {
    metaTitle: "Preguntas frecuentes",
    metaDescription:
      "Respuestas sobre fisioterapia pélvica, primera consulta, reserva de cita y privacidad.",
    eyebrow: "Dudas",
    title: "Preguntas *frecuentes.*",
    leadWa:
      "Respuestas educativas, organizadas por tema. ¿Te quedó alguna duda? Solo pregunta en la página de contacto.",
    leadNoWa: "Respuestas educativas, organizadas por tema.",
    review:
      "Versión de revisión: las respuestas aún serán validadas clínicamente por la profesional.",
    crumb: "Preguntas frecuentes",
  },
  faqGroups: [
    {
      topic: "Sobre la fisioterapia pélvica",
      items: [
        {
          q: "¿Qué es la fisioterapia pélvica?",
          a: "Es el área de la fisioterapia dedicada a la salud de la región pélvica. Cuida el suelo pélvico, un conjunto de músculos y tejidos que sostiene órganos como la vejiga y el intestino y participa en el control urinario e intestinal y en la función sexual.",
        },
        {
          q: "¿Los hombres también pueden hacerla?",
          a: "Sí. La evaluación está dirigida a personas de cualquier género que tengan molestias o dudas sobre la salud pélvica.",
        },
        {
          q: "¿Necesito un diagnóstico antes de consultar?",
          a: "Puedes buscar una evaluación incluso con dudas o molestias aún no aclaradas. Si hace falta una derivación o exámenes complementarios, se te orientará durante la atención.",
        },
      ],
    },
    {
      topic: "Sobre la atención",
      items: [
        {
          q: "¿Cómo es la primera consulta?",
          a: "La evaluación comienza con una conversación sobre tu historia y tus molestias. Los procedimientos de evaluación adecuados a tu caso se explican antes de cualquier etapa, y nada se realiza sin tu comprensión y consentimiento.",
        },
        {
          q: "¿La evaluación causa dolor o vergüenza?",
          a: "El objetivo es que te sientas seguro/a. Cada etapa se explica antes de ocurrir y solo se realiza con tu consentimiento. Si algo molesta, es posible ajustar o interrumpir.",
        },
        {
          q: "¿Necesito una derivación médica?",
          a: "La necesidad de derivación será confirmada por la profesional. Si se indica una evaluación médica o exámenes, se te orientará durante la atención.",
        },
        {
          q: "¿Cuántas sesiones voy a necesitar?",
          a: "Depende de cada persona y de cada objetivo. El plan se define después de la evaluación, sin promesas de plazo ni de resultado.",
        },
        {
          q: "¿El contenido del sitio sustituye una consulta?",
          a: "No. La información del sitio es educativa y no sustituye la evaluación de un profesional de la salud.",
        },
      ],
    },
    {
      topic: "Reserva de cita y privacidad",
      items: [
        {
          q: "¿Cómo reservo una evaluación?",
          a: "Para reservar una evaluación, escribe al WhatsApp profesional, acuerda el mejor horario y recibe las indicaciones para ese día.",
        },
        {
          q: "¿La atención es presencial? ¿Y los valores y seguros?",
          a: "La atención es presencial, en Goiânia (dirección en la sección Ubicación), y también en línea, de lunes a viernes. Confirma los precios y los seguros directamente por WhatsApp.",
        },
        {
          q: "¿Mi información de salud se mantiene en secreto?",
          a: "La información de salud se trata con secreto profesional. Por WhatsApp, envía solo lo necesario para reservar la cita; los detalles clínicos se conversan en la evaluación.",
        },
      ],
    },
  ],

  privacy: {
    metaTitle: "Política de privacidad",
    metaDescription:
      "Cómo este sitio trata los datos: sin formularios, sin registro y sin rastreo de terceros.",
    eyebrow: "Institucional",
    title: "Política de *privacidad.*",
    lead: "Transparencia sobre los pocos datos que intervienen al navegar por este sitio.",
    review:
      "Versión de revisión: texto preliminar, sujeto a la validación de la profesional y a la identificación del responsable del tratamiento. No constituye una declaración de cumplimiento jurídico integral.",
    crumb: "Política de privacidad",
    blocks: (name) => [
      [
        "Qué datos recoge este sitio",
        [
          "Este sitio no tiene formularios, registro, área de acceso ni base de datos. No recoge por sí mismo datos personales ni información de salud de los visitantes.",
          "No usamos cookies publicitarias ni herramientas de análisis o rastreo de terceros en esta versión.",
        ],
      ],
      [
        "Contacto por WhatsApp",
        [
          "Al pulsar los botones de reserva, accederás a WhatsApp, un servicio de terceros con su propia política de privacidad. El mensaje inicial es estándar y no contiene información clínica.",
          "Recomendamos no enviar detalles de salud por mensaje; se conversan en la evaluación, bajo secreto profesional.",
        ],
      ],
      [
        "Enlaces externos y alojamiento",
        [
          "Los enlaces a Instagram y Google Maps llevan a servicios de terceros, regidos por sus propias políticas. Los videos (Reels) solo se cargan desde Instagram después de que haces clic para verlos. Las publicaciones de Instagram se cargan directamente desde Instagram cuando llegas a esa parte de la página.",
          "El sitio está alojado en Cloudflare, que puede registrar datos técnicos de acceso (como la dirección IP) por seguridad y funcionamiento de la red. Las tipografías las sirve el propio sitio. La elección de tema e idioma se guarda solo en tu navegador.",
        ],
      ],
      [
        "Tus derechos",
        [
          `Puedes solicitar información sobre el tratamiento de datos a través de los canales de contacto de ${name}, conforme a la Ley General de Protección de Datos de Brasil (LGPD).`,
        ],
      ],
    ],
  },

  about: {
    metaTitle: "Sobre mí",
    metaDescription: (name) =>
      `Conoce a ${name}, fisioterapeuta pélvica: enfoque de atención, formación y valores.`,
    eyebrow: "Sobre mí",
    title: (first) => `Mucho gusto, *${first}.*`,
    pageTitle: "Mi *historia.*",
    lead: "Fisioterapeuta pélvica, con una atención pensada para que cada persona se sienta escuchada y segura.",
    review:
      "Versión de revisión: la historia profesional, la formación y las fotografías se incluirán tras su confirmación.",
    history: "Historia profesional",
    historyFallback:
      "La presentación completa de la trayectoria profesional se publicará una vez que la propia Samara confirme la información.",
    education: "Formación",
    specializations: "Especializaciones",
    courses: "Cursos y calificaciones",
    approach: "Enfoque de atención",
    crumb: "Sobre mí",
  },

  treatments: {
    metaTitle: "Tratamientos y áreas de actuación",
    metaDescription:
      "Conoce las atenciones de fisioterapia pélvica: incontinencia urinaria, vejiga hiperactiva, endometriosis, dolor pélvico crónico, prolapso, embarazo y posparto, entre otras.",
    eyebrow: "Tratamientos",
    title: "Áreas de la *fisioterapia pélvica.*",
    lead: "Temas por los que suele buscarse una evaluación. El contenido es educativo y no sustituye la evaluación individual.",
    review:
      "Versión de revisión: las áreas de actuación aún serán confirmadas por la profesional.",
    crumb: "Tratamientos",
    reviewDetail:
      "Versión de revisión: este contenido está a la espera de la validación de la profesional antes de su publicación.",
    whenIndicated: "Cuándo puede estar indicada la evaluación",
    followUpTitle: "Cómo funciona el seguimiento",
    followUp:
      "El seguimiento se define después de la evaluación individual, de acuerdo con tus molestias y objetivos. La frecuencia, la duración y las conductas se acuerdan contigo, sin promesa de plazo ni de resultado.",
    disclaimer:
      "Este contenido es educativo y no sustituye la evaluación de un profesional de la salud. No hay promesa de cura ni de resultado.",
  },

  notFound: {
    title: "Página no encontrada",
    code: "Error 404",
    heading: "Este camino no *existe.*",
    text: "La página que buscas puede haber cambiado de lugar.",
    home: "Volver al inicio",
    contact: "Hablar con Samara",
    how: "Cómo funciona",
  },

  services: [
    {
      slug: "disfuncoes-sexuais-femininas",
      title: "Disfunciones sexuales femeninas",
      short: "Un espacio sin juicios para hablar de dolor y molestias íntimas.",
      description:
        "El dolor o la molestia en la vida sexual pueden estar relacionados con el suelo pélvico. La conversación se lleva con respeto, privacidad y a tu ritmo.",
      indications: [
        "Dolor durante la penetración o después de la relación",
        "Contracción involuntaria que dificulta o impide la penetración",
        "Sensación de tensión o dificultad para relajar la región pélvica",
        "Molestia que interfiere en la vida íntima",
      ],
    },
    {
      slug: "dor-pelvica",
      title: "Dolor pélvico crónico",
      short: "Escucha y evaluación para dolores persistentes en la región de la pelvis.",
      description:
        "El dolor pélvico crónico puede tener distintos orígenes e impactar el sueño, el trabajo y la vida íntima. La evaluación fisioterapéutica considera tu historial y tu rutina para orientar los próximos pasos.",
      indications: [
        "Dolor persistente en la región pélvica, lumbar baja o perineal",
        "Dolor al sentarse por períodos prolongados",
        "Dolor asociado a la menstruación, cuando lo oriente la evaluación",
        "Molestia al orinar o evacuar sin causa aún aclarada",
      ],
    },
    {
      slug: "endometriose",
      title: "Endometriosis",
      short: "Apoyo en el manejo del dolor y de los síntomas, junto con el seguimiento médico.",
      description:
        "La endometriosis es una condición en la que un tejido similar al del útero crece fuera de él y puede causar dolor y otros síntomas. La fisioterapia pélvica puede complementar el tratamiento médico, atendiendo la musculatura y el dolor asociados.",
      indications: [
        "Dolor pélvico o cólicos intensos asociados a la endometriosis",
        "Dolor durante las relaciones sexuales",
        "Síntomas urinarios o intestinales que acompañan el ciclo menstrual",
        "Tensión de la musculatura del suelo pélvico y de la región lumbar",
      ],
    },
    {
      slug: "incontinencia-urinaria",
      title: "Incontinencia urinaria femenina y masculina",
      short: "Evaluación de la pérdida involuntaria de orina, en mujeres y hombres.",
      description:
        "La pérdida involuntaria de orina es una molestia común, pero no tiene por qué tratarse como algo normal o inevitable. La evaluación fisioterapéutica ayuda a entender el contexto de cada persona, sea mujer u hombre.",
      indications: [
        "Pérdida de orina al toser, estornudar, reír o hacer ejercicio",
        "Urgencia intensa para orinar",
        "Pérdida de orina tras cirugías de la región pélvica, como la de próstata",
        "Temor a salir de casa o a practicar actividades por causa del problema",
      ],
    },
    {
      slug: "bexiga-hiperativa",
      title: "Vejiga hiperactiva",
      short: "Evaluación de la urgencia y la frecuencia urinaria que alteran la rutina.",
      description:
        "En la vejiga hiperactiva, las ganas de orinar aparecen de repente y con intensidad, a veces con pérdida de orina. Cuando esto empieza a limitar la rutina, es posible investigar la causa y tratar.",
      indications: [
        "Urgencia repentina e intensa para orinar",
        "Idas al baño con una frecuencia mayor de la habitual",
        "Despertar varias veces por la noche para orinar",
        "Pérdida de orina que acompaña la urgencia",
      ],
    },
    {
      slug: "retencao-urinaria",
      title: "Retención urinaria",
      short: "Evaluación de dificultades para vaciar la vejiga.",
      description:
        "En la retención urinaria, la vejiga no se vacía por completo o cuesta iniciar la micción. La evaluación ayuda a entender el papel del suelo pélvico y a orientar cuándo buscar también una evaluación médica.",
      indications: [
        "Dificultad para empezar a orinar",
        "Chorro débil o que se corta y vuelve a empezar",
        "Sensación de que la vejiga no se vació por completo",
        "Necesidad de hacer fuerza para orinar",
      ],
    },
    {
      slug: "prolapso-de-orgaos-pelvicos",
      title: "Prolapso de órganos pélvicos",
      short: "Evaluación de molestias de peso o de \"descenso\" de los órganos de la pelvis.",
      description:
        "En el prolapso, órganos como la vejiga, el útero o el recto descienden hacia la vagina por falta de sostén. La fisioterapia pélvica puede formar parte del cuidado conservador, y la evaluación orienta cuándo se necesitan otras conductas.",
      indications: [
        "Sensación de peso o de \"bulto\" en la región genital",
        "Sensación de que algo sale por la vagina",
        "Molestia que empeora al permanecer mucho tiempo de pie",
        "Síntomas urinarios o intestinales asociados",
      ],
    },
    {
      slug: "constipacao",
      title: "Estreñimiento",
      short: "Evaluación del intestino atascado y de la dificultad para evacuar.",
      description:
        "El estreñimiento puede estar relacionado con la coordinación y la relajación de la musculatura del suelo pélvico, además de hábitos y otros factores. La evaluación ayuda a entender qué está contribuyendo en tu caso.",
      indications: [
        "Esfuerzo excesivo para evacuar",
        "Heces duras o evacuación incompleta",
        "Sensación de bloqueo al intentar evacuar",
        "Estreñimiento que persiste con el tiempo",
      ],
    },
    {
      slug: "prostatectomia-radical",
      title: "Pre y postoperatorio de prostatectomía radical",
      short: "Preparación y recuperación del suelo pélvico en la cirugía de próstata.",
      description:
        "La prostatectomía radical es la cirugía de extirpación de la próstata. La fisioterapia pélvica puede orientar la preparación del suelo pélvico antes de la cirugía y acompañar la recuperación después, respetando la autorización del equipo médico.",
      indications: [
        "Preparación del suelo pélvico antes de la cirugía",
        "Pérdida de orina después de la prostatectomía",
        "Orientaciones para la recuperación, según la autorización médica",
        "Dudas sobre qué esperar antes y después de la operación",
      ],
    },
    {
      slug: "gestacao-e-pos-parto",
      title: "Embarazo y posparto",
      short: "Acompañamiento del cuerpo durante y después del embarazo.",
      description:
        "El embarazo y el parto traen cambios importantes para el cuerpo. La fisioterapia pélvica puede orientar el cuidado del suelo pélvico antes y después del nacimiento, respetando tu momento.",
      indications: [
        "Dudas sobre la preparación del cuerpo para el parto",
        "Pérdida de orina durante o después del embarazo",
        "Dolor en la región pélvica o lumbar durante el embarazo",
        "Cuidados para la recuperación tras el parto, según la autorización profesional",
      ],
    },
  ],

  content: {
    eyebrow: "Contenidos educativos",
    title: "Información clara para *cuidarte.*",
    lead: "Videos, publicaciones y artículos informativos. No sustituyen la evaluación individual.",
    videos: "Videos",
    articles: "Artículos",
    seeAll: "Ver todos los contenidos",
    metaTitle: "Contenidos educativos",
    metaDescription:
      "Videos y artículos informativos sobre fisioterapia pélvica. El contenido es educativo y no sustituye la evaluación individual.",
    pageEyebrow: "Contenidos",
    pageTitle: "Contenidos *educativos.*",
    pageLead:
      "Videos, publicaciones y artículos sobre salud pélvica. Son informativos y no sustituyen la evaluación de un profesional de la salud.",
    crumb: "Contenidos",
    empty: "Los contenidos educativos se publicarán aquí tras la revisión de la profesional.",
    watch: "Ver aquí",
    posts: "Publicaciones",
    postTitle: (n) => `Publicación ${n}`,
    postHint: "Publicación original en Instagram.",
    playerPost: (n) => `Publicación de Instagram ${n}`,
    openIg: "Ver en Instagram",
    postsCarousel: "Publicaciones de Instagram",
    prev: "Publicación anterior",
    next: "Siguiente publicación",
    goTo: (n) => `Ir a la publicación ${n}`,
    igNote:
      "El contenido se carga desde Instagram solo después de hacer clic; Instagram puede registrar datos de tu acceso.",
    player: (title) => `Reproductor del Reel: ${title}`,
    demo: "EJEMPLO DE DESARROLLO",
    read: "Leer artículo",
    back: "Todos los contenidos",
    disclaimer:
      "Este contenido es educativo y no sustituye la evaluación de un profesional de la salud. No hay promesa de cura ni de resultado.",
    categories: {
      geral: "Salud pélvica",
      gestacao: "Embarazo y posparto",
      incontinencia: "Incontinencia urinaria",
      dor: "Dolor pélvico",
      intimidade: "Salud íntima",
    },
  },
  reviews: {
    eyebrow: "Opiniones",
    title: "Lo que dicen *sobre* la atención.",
    lead: "Opiniones publicadas en Google, transcritas con la autorización de quienes las escribieron.",
    source: "Opinión en Google",
    demo: "OPINIÓN DE PRUEBA — ficticia, no es de una paciente real",
    seeAll: "Ver opiniones en Google",
    stars: (n) => `${n} de 5 estrellas`,
  },

  jobTitle: "Fisioterapeuta pélvica",
};
