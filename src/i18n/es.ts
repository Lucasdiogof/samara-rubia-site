import type { Dict } from "./pt";

/** Borrador en español: debe ser revisado por Samara antes de liberar el idioma para indexación. */
export const es: Dict = {
  specialty: "Fisioterapia Pélvica",
  siteDescription: (wa) =>
    `Fisioterapeuta pélvica en Goiânia, Brasil (Setor Marista). Fisioterapia pélvica femenina y masculina con evaluación individual y seguimiento.${wa ? " Reserva por WhatsApp." : ""}`,

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
      "Fisioterapia pélvica para mujeres y hombres, en Goiânia.",
    navigation: "Navegación",
    contact: "Contacto",
    waSoon: "WhatsApp próximamente",
    rights: "Todos los derechos reservados.",
  },

  hero: {
    eyebrow: "Fisioterapia Pélvica en Goiânia",
    about: "Conoce mi trabajo",
    title: "*Samara Rúbia* Fisioterapeuta Pélvica",
    lead: "Evaluación y tratamiento de disfunciones urinarias, intestinales y sexuales y del dolor pélvico, en mujeres y hombres.",
  },

  pelvic: {
    eyebrow: "Salud pélvica",
    title: "¿Qué es la Fisioterapia Pélvica y qué *trata?*",
    text: "La fisioterapia pélvica actúa en la prevención y el tratamiento de alteraciones del suelo pélvico, relacionadas con las funciones urinaria, intestinal y sexual, en hombres y mujeres.",
    all: "Conoce todos los tratamientos",
  },

  aboutTeaser: {
    eyebrow: "Sobre mí",
    heading: "Atención especializada para tu *suelo pélvico*",
    body: [
      "Graduada en Fisioterapia por la Pontificia Universidad Católica de Goiás, con formación en Fisioterapia Pélvica y cinco años de actuación profesional en Goiânia.",
      "Atiendo a mujeres y hombres con molestias urinarias, intestinales y sexuales y con dolor pélvico, siempre a partir de una evaluación detallada.",
    ] as string[],
    title: "Un espacio para hablar de lo *delicado,* sin prisa.",
    summary: (name) =>
      `Soy ${name}, fisioterapeuta pélvica. Creo en una atención en la que cada persona es escuchada con atención, entiende cada etapa y decide junto conmigo el camino de su cuidado.`,
    button: "Conocer mi historia",
  },

  signals: {
    eyebrow: "Un momento para ti",
    title: "¿Te identificas con alguna de estas *situaciones?*",
    subtitle: "Selecciona las situaciones que forman parte de tu día a día.",
    group: "Situaciones del día a día",
    of: "de",
    selected: ["0 seleccionadas", "1 seleccionada", "{n} seleccionadas"],
    counter: "Situaciones seleccionadas",
    items: [
      { title: "Pérdidas de orina", text: "Pierdo orina al reír, toser, estornudar o hacer ejercicio." },
      { title: "Urgencia urinaria", text: "Siento ganas repentinas de orinar y tengo que correr al baño." },
      { title: "Sueño interrumpido", text: "Me despierto de noche para orinar y eso afecta mi descanso." },
      { title: "Prevención", text: "Uso toallas o protectores por miedo a perder orina." },
      { title: "Movimiento", text: "Evito la actividad física por miedo a pérdidas o molestias." },
      { title: "Molestia pélvica", text: "Siento dolor, presión o pesadez en la zona pélvica." },
      { title: "Salud íntima", text: "Siento dolor o molestia durante las relaciones sexuales." },
      { title: "Función intestinal", text: "Tengo dificultad para evacuar o siento que no vacío por completo." },
    ],
    /** 0, 1, 2–3, 4–5, 6–8 selecionados. Mensagens educativas: nunca pontuação, risco ou gravidade. */
    states: [
      { title: "¿Alguna de estas situaciones forma parte de tu rutina?", text: "Selecciona las opciones con las que te identificas." },
      { title: "¿Te ha pasado alguna vez?", text: "Si esta situación ocurre con frecuencia o te causa molestia, vale la pena investigarla." },
      { title: "¿Esto ha afectado tu día a día?", text: "Entender qué causa estos síntomas es importante para definir el tratamiento adecuado." },
      { title: "¿Hace cuánto tiempo convives con estos síntomas?", text: "Una evaluación fisioterapéutica puede ayudar a entender tus molestias y orientar el tratamiento." },
      { title: "¿Qué tal si conversamos sobre lo que sientes?", text: "En la consulta, podemos evaluar estas molestias con calma y entender qué cuidados tienen sentido para tu caso." },
    ],
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
    titleWa: "¿Reservamos tu *evaluación?*",
    titleNoWa: "Pronto, el primer *contacto.*",
    textWa:
      "Escríbeme por WhatsApp para acordar día y hora.",
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
    ctaBandTitle: "¿Quieres reservar tu evaluación?",
    ctaFaqTitle: "¿Te quedaron dudas?",
    ctaFaqLabel: "Preguntas frecuentes",
    ctaHowTitle: "¿Quieres entender la atención?",
    ctaHowLabel: "Cómo funciona",
    otherAreas: "Otras áreas",
  },

  home: {
    title: (name, specialty) => `${name} | ${specialty} en Goiânia`,
  },

  how: {
    metaTitle: "Cómo funciona la atención",
    metaDescription:
      "Del primer contacto por WhatsApp al seguimiento: así es la evaluación en fisioterapia pélvica, con privacidad y consentimiento.",
    eyebrow: "Cómo funciona",
    title: "Una atención *clara* en cada etapa.",
    lead: "Mira qué ocurre desde el primer mensaje hasta el seguimiento.",
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
        "El plan se revisa a lo largo del camino.",
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
      "Respuestas organizadas por tema. Si tu duda no está aquí, pregunta por WhatsApp.",
    leadNoWa: "Respuestas organizadas por tema.",
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
          a: "Depende de cada persona y de cada objetivo. El plan se define después de la evaluación.",
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
          q: "¿Dónde y cuándo es la atención? ¿Y los valores y seguros?",
          a: "La atención es en Goiânia (dirección en la sección Ubicación), de lunes a viernes, de 9:00 a 18:00. Confirma los precios y los seguros por WhatsApp.",
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
    pageTitle: "Mi trayectoria *profesional.*",
    lead: "Conoce mi formación, mi experiencia y mi forma de trabajar en la fisioterapia pélvica.",
    review:
      "Versión de revisión: la historia profesional, la formación y las fotografías se incluirán tras su confirmación.",
    history: "Trayectoria profesional",
    historyFallback:
      "La presentación completa de la trayectoria profesional se publicará una vez que la propia Samara confirme la información.",
    education: "Formación",
    specializations: "Especializaciones",
    courses: "Cursos y calificaciones",
    approach: "Cómo conduzco mis consultas",
    crumb: "Sobre mí",
    story: [
      "Soy graduada en Fisioterapia por la PUC Goiás y tengo formación en Fisioterapia Pélvica. Ejerzo desde hace cinco años en Goiânia.",
      "Trabajo en la prevención y el tratamiento de disfunciones urinarias, intestinales y sexuales, en mujeres y hombres.",
      "Sigo estudiando para que las conductas sigan la evidencia científica y se ajusten a cada paciente.",
    ] as string[],
    approachItems: [
      { title: "Evaluación detallada", text: "Investigación de los síntomas, del historial clínico y de los hábitos de vida." },
      { title: "Hablar sin vergüenza", text: "Libertad para hablar de temas íntimos, sin vergüenza ni juicios." },
      { title: "Práctica basada en evidencia", text: "Conductas terapéuticas fundamentadas en el conocimiento científico." },
      { title: "Seguimiento de la evolución", text: "Reevaluación y adaptación del tratamiento según la evolución clínica." },
    ],
  },

  treatments: {
    metaTitle: "Tratamientos y áreas de actuación",
    metaDescription:
      "Conoce las atenciones de fisioterapia pélvica: incontinencia urinaria, vejiga hiperactiva, endometriosis, dolor pélvico crónico, prolapso, embarazo y posparto, entre otras.",
    eyebrow: "Tratamientos",
    title: "Áreas de la *fisioterapia pélvica.*",
    lead: "Conoce las áreas en las que la fisioterapia pélvica actúa y elige un tema para saber más.",
    review:
      "Versión de revisión: las áreas de actuación aún serán confirmadas por la profesional.",
    crumb: "Tratamientos",
    reviewDetail:
      "Versión de revisión: este contenido está a la espera de la validación de la profesional antes de su publicación.",
    whenIndicated: "Cuándo puede estar indicada la evaluación",
    followUpTitle: "Cómo funciona el seguimiento",
    followUp:
      "El seguimiento se define después de la evaluación individual, de acuerdo con tus molestias y objetivos. La frecuencia, la duración y las conductas se acuerdan contigo.",
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
      title: "Disfunciones sexuales",
      short: "Un espacio sin juicios para hablar de dolor y molestias íntimas.",
      description:
        "El dolor o la molestia en la vida sexual pueden estar relacionados con el suelo pélvico. La evaluación se hace con privacidad y a tu ritmo.",
      indications: [
        "Dolor durante la penetración o después de la relación",
        "Contracción involuntaria que dificulta o impide la penetración",
        "Sensación de tensión o dificultad para relajar la región pélvica",
        "Molestia que interfiere en la vida íntima",
      ],
    },
    {
      slug: "dor-na-relacao",
      title: "Dolor en la relación sexual",
      short: "Evaluación del dolor o la molestia durante o después de la relación sexual.",
      description:
        "El dolor durante la relación sexual puede estar relacionado con la tensión o la mayor sensibilidad de los músculos del suelo pélvico, entre otros factores. La evaluación ayuda a entender el origen de la molestia y a definir el tratamiento.",
      indications: [
        "Dolor en la penetración",
        "Dolor durante o después de la relación",
        "Ardor o sensibilidad en la entrada de la vagina",
        "Temor o tensión antes de la relación por el dolor",
      ],
    },
    {
      slug: "dor-pelvica",
      title: "Dolor pélvico crónico",
      short: "Evaluación de dolores persistentes en la región de la pelvis.",
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
      title: "Incontinencia urinaria",
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
        "El embarazo y el parto traen cambios importantes para el cuerpo. La fisioterapia pélvica puede orientar el cuidado del suelo pélvico antes y después del nacimiento.",
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
    videos: "Videos",
    articles: "Artículos",
    seeAll: "Ver todos los contenidos",
    metaTitle: "Contenidos educativos",
    metaDescription:
      "Videos y artículos informativos sobre fisioterapia pélvica.",
    pageEyebrow: "Contenidos",
    pageTitle: "Contenidos *educativos.*",
    crumb: "Contenidos",
    empty: "Los contenidos educativos se publicarán aquí tras la revisión de la profesional.",
    watch: "Ver aquí",
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
    lead: "Comentarios dejados en Google, reproducidos con autorización de sus autores.",
    source: "Opinión en Google",
    demo: "OPINIÓN DE PRUEBA — ficticia, no es de una paciente real",
    seeAll: "Ver todas las opiniones en Google",
    summary: (v: string, n: number) => `Nota ${v} de 5 · ${n} opiniones en Google`,
    carousel: "Carrusel de reseñas de Google",
    prev: "Reseñas anteriores",
    next: "Reseñas siguientes",
    goTo: (n) => `Ir al grupo de reseñas ${n}`,
    stars: (n) => `${n} de 5 estrellas`,
  },

  jobTitle: "Fisioterapeuta pélvica",
};
