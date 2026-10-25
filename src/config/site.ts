/**
 * Fonte única dos dados profissionais. Tudo que for `null` é tratado como
 * "não confirmado": o site omite a informação ou desabilita o recurso.
 * Ver docs/CONTENT_PENDING.md para a lista do que falta confirmar.
 */
export const site = {
  /** Nome provisório até confirmação. */
  displayName: "Samara Rúbia",
  professionalName: null as string | null,
  specialty: "Fisioterapia Pélvica",
  crefito: null as string | null,

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Indexação só é liberada com NEXT_PUBLIC_INDEXABLE=true (após aprovação). */
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  locale: "pt-BR",

  contact: {
    /** Somente dígitos com DDI, ex.: "5562999999999". */
    whatsapp: null as string | null,
    /** Usuário sem @, ex.: "samara.fisio". */
    instagram: null as string | null,
  },

  location: {
    city: null as string | null,
    region: null as string | null,
    address: null as string | null,
    mapsUrl: null as string | null,
    modality: null as string | null,
    hours: null as string | null,
  },

  bio: {
    summary: null as string | null,
    education: [] as string[],
  },

  /** Caminhos em /public. Enquanto null, o layout usa composições gráficas. */
  images: {
    portrait: null as string | null,
    portraitAlt: "Retrato de Samara Rúbia",
    office: null as string | null,
    officeAlt: "Consultório de Samara Rúbia",
  },

  whatsappMessage:
    "Olá, Samara! Gostaria de saber mais sobre o atendimento de fisioterapia pélvica e agendar uma avaliação.",

  /** Marque true somente após revisão da Samara. Controla os avisos "em revisão". */
  approved: {
    services: false,
    faq: false,
    about: false,
    privacy: false,
  },

  /** Ative/desative áreas de atuação por slug (ver src/content/services.ts). */
  enabledServices: [
    "saude-pelvica-feminina",
    "saude-pelvica-masculina",
    "incontinencia-urinaria",
    "dor-pelvica",
    "disfuncoes-do-assoalho-pelvico",
    "gestacao-e-pos-parto",
    "queixas-sexuais",
    "reabilitacao-funcional",
  ] as string[],
};

export const fullName = site.professionalName ?? site.displayName;
