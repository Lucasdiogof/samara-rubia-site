/**
 * Fonte única dos dados profissionais. Tudo que for `null` é tratado como
 * "não confirmado": o site omite a informação ou desabilita o recurso.
 * Ver docs/CONTENT_PENDING.md para a lista do que falta confirmar.
 */
/** Foto gerada por `npm run images` (ver docs/IMAGES.md). Os arquivos ficam em public/images. */
export type PhotoConfig = {
  /** prefixo dos arquivos: /images/<name>-<largura>.(avif|webp|jpg) */
  name: string;
  /** descrição da imagem para leitores de tela (obrigatória, sem "foto de") */
  alt: string;
  /** dimensões do arquivo original (reservam o espaço e evitam layout shift) */
  width: number;
  height: number;
  /** larguras geradas (o script imprime esta lista) */
  widths: number[];
  /** ponto focal do recorte, em % (50/50 = centro; rosto costuma ficar em y ≈ 25–35) */
  focal?: { x: number; y: number };
};

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
    whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? null) as string | null,
    /** Usuário sem @, ex.: "samara.fisio". */
    instagram: (process.env.NEXT_PUBLIC_INSTAGRAM ?? null) as string | null,
  },

  location: {
    city: null as string | null,
    region: null as string | null,
    address: null as string | null,
    mapsUrl: null as string | null,
    /** ex.: ["Presencial", "Online"]; vazio = "a confirmar" */
    modalities: [] as string[],
    hours: null as string | null,
  },

  /** Convênios aceitos. Vazio = a informação não é exibida. */
  insurance: [] as string[],

  /** Tudo vazio/nulo = bloco omitido. Só preencha com dados confirmados. */
  bio: {
    summary: null as string | null,
    /** parágrafos sobre a abordagem profissional (opcional) */
    approach: [] as string[],
    education: [] as string[],
    specializations: [] as string[],
    courses: [] as string[],
  },

  /**
   * Fotografias reais (nulo/vazio = composição gráfica atual).
   * Proporções, resoluções e passo a passo em docs/IMAGES.md.
   */
  images: {
    /** hero: recomendado 4:5 vertical, mínimo 1600 px de largura */
    hero: null as PhotoConfig | null,
    /** seção Sobre (home e página): recomendado 3:4 vertical, mínimo 1400 px */
    portrait: null as PhotoConfig | null,
    /** consultório: recomendado 3:2 horizontal (a primeira é a principal), 1 a 4 fotos */
    office: [] as PhotoConfig[],
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
