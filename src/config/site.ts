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
  crefito: "3383766-F" as string | null,

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Indexação só é liberada com NEXT_PUBLIC_INDEXABLE=true (após aprovação). */
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",

  contact: {
    /** Somente dígitos com DDI, ex.: "5562999999999". */
    whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? null) as string | null,
    /** Usuário sem @, ex.: "samara.fisio". */
    instagram: (process.env.NEXT_PUBLIC_INSTAGRAM ?? null) as string | null,
  },

  location: {
    /** Samara atende neste consultório (não é a marca dela). */
    venue: "La Femme Consultórios" as string | null,
    address: "Rua 1123, nº 359, Quadra 220" as string | null,
    district: "Setor Marista" as string | null,
    city: "Goiânia" as string | null,
    region: "GO" as string | null,
    /** Rota no Google Maps pelo endereço confirmado (sem número de sala, que não foi informado). */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("La Femme Consultórios, Rua 1123, 359, Quadra 220, Setor Marista, Goiânia - GO") as
        | string
        | null,
    /** ex.: ["Presencial", "Online"]; vazio = "a confirmar" */
    modalities: [] as string[],
    /** Faixa confirmada; os dias da semana ainda não foram informados. */
    hours: { open: "07:30", close: "18:00" } as { open: string; close: string } | null,
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

  /** Marque true somente após revisão da Samara. Controla os avisos "em revisão". */
  approved: {
    services: true,
    faq: true,
    about: true,
    privacy: true,
  },

  /** Ative/desative áreas de atuação por slug (ver src/content/services.ts). */
  enabledServices: [
    "disfuncoes-sexuais-femininas",
    "dor-pelvica",
    "endometriose",
    "incontinencia-urinaria",
    "bexiga-hiperativa",
    "retencao-urinaria",
    "prolapso-de-orgaos-pelvicos",
    "constipacao",
    "prostatectomia-radical",
    "gestacao-e-pos-parto",
  ] as string[],
};

export const fullName = site.professionalName ?? site.displayName;
