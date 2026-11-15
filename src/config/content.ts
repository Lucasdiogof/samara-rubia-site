/**
 * Conteúdos editoriais e avaliações. Tudo vazio = as seções ficam ocultas na versão pública.
 * Como adicionar itens reais: docs/CONTENT_GUIDE.md.
 */
import type { PhotoConfig } from "@/config/site";
import type { Lang } from "@/i18n/config";

export type ByLang = Record<Lang, string>;

/** Reel do Instagram da própria Samara (o vídeo continua hospedado no Instagram). */
export type Reel = {
  id: string;
  /** link original, ex.: https://www.instagram.com/reel/AbC123xyz/ */
  url: string;
  title: ByLang;
  /** capa 9:16 gerada por `npm run images` (ver docs/IMAGES.md); sem capa = composição gráfica */
  cover: PhotoConfig | null;
  date: string; // AAAA-MM-DD
  /** só os exemplos de desenvolvimento usam true */
  demo?: boolean;
};

/**
 * Publicação do Instagram em formato /p/ (imagem, carrossel ou vídeo; o tipo não é assumido).
 * Sem título, legenda nem data: só o link original e, quando houver, uma capa autorizada.
 */
export type Post = {
  id: string;
  /** link original, exatamente como a Samara informou (inclusive ?img_index=1) */
  url: string;
  cover: PhotoConfig | null;
  /** tipo da mídia, conforme o próprio Instagram */
  kind?: "video" | "carousel" | "image";
  /** data de publicação (AAAA-MM-DD) */
  date?: string;
  /** legenda original, no idioma em que foi escrita (pt); não é traduzida nem editada */
  caption?: string;
};

export type ArticleCategory = "geral" | "gestacao" | "incontinencia" | "dor" | "intimidade";

export type ArticleText = {
  title: string;
  summary: string;
  /** parágrafos; uma linha começando com "## " vira subtítulo */
  body: string[];
  seoTitle?: string;
  seoDescription?: string;
};

/** Artigo informativo. Só é publicado com `approved: true` (aprovação da Samara) e nos 3 idiomas. */
export type Article = {
  slug: string;
  category: ArticleCategory;
  date: string; // AAAA-MM-DD
  cover: PhotoConfig | null;
  approved: boolean;
  i18n: Record<Lang, ArticleText>;
  demo?: boolean;
};

/** Avaliação real do Google, transcrita com autorização de quem a escreveu. */
export type Review = {
  id: string;
  /** como a pessoa autorizou ser identificada (ex.: "Maria S.") */
  author: string;
  date: string; // AAAA-MM-DD
  /** texto original, sem traduzir nem editar */
  text: string;
  /** idioma do texto original */
  lang: Lang;
  /** 1 a 5; omita se não quiser exibir estrelas */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** link da avaliação no Google, se houver */
  url?: string;
  /** o Google mostra só "há X dias": a data é aproximada e o site exibe apenas mês e ano */
  dateApprox?: boolean;
  /** true somente com autorização documentada da pessoa para publicar */
  authorized: boolean;
  demo?: boolean;
};

export const reels: Reel[] = [];
/** Publicações reais informadas pela Samara (perfil @samara.rubiaa). Ordem = ordem de exibição (para reordenar, troque a posição dos itens). */
/**
 * Dados extraídos uma única vez da conta da Samara (Apify, 26/10/2026), sem comentários nem dados de
 * terceiros. As capas foram baixadas e hospedadas no site (as URLs do Instagram expiram).
 */
export const posts: Post[] = [
  {
    id: "ig-C-WGsEgRqcv",
    url: "https://www.instagram.com/p/C-WGsEgRqcv/?img_index=1",
    kind: "carousel",
    date: "2024-08-06",
    cover: { name: "ig-post-3", alt: "", width: 1440, height: 1800, widths: [480, 768, 1080], focal: { x: 50, y: 50 } },
    caption:
      "VOCÊ SABIA QUE…\n\nMuitas pessoas podem se beneficiar da fisioterapia pélvica? 🌸💖\n\nQuer descobrir se você é uma delas? Arraste para o lado e confira! 👉🏽",
  },
  {
    id: "ig-DcUbBVSvcX8",
    url: "https://www.instagram.com/p/DcUbBVSvcX8/",
    kind: "video",
    date: "2026-08-21",
    cover: { name: "ig-post-1", alt: "", width: 720, height: 1280, widths: [480], focal: { x: 50, y: 30 } },
    caption:
      "Nem todo escape de urina acontece por fraqueza do assoalho pélvico.\n\nÀs vezes, o problema pode estar no excesso de tensão ou na falta de coordenação da musculatura.\n\nPor isso, antes de fortalecer, é preciso avaliar. 💕",
  },
  {
    id: "ig-DdKRgA9BfXa",
    url: "https://www.instagram.com/p/DdKRgA9BfXa/",
    kind: "video",
    date: "2026-09-11",
    cover: { name: "ig-post-2", alt: "", width: 720, height: 1280, widths: [480], focal: { x: 50, y: 30 } },
    caption:
      "Você organiza o seu dia pensando em onde vai encontrar um banheiro?\n\nQuando a urgência ou a frequência urinária começa a limitar sua rotina, não é algo que você simplesmente precisa aprender a aceitar.\n\nÉ possível investigar a causa e tratar.",
  },
];
export const articles: Article[] = [];
export const reviews: Review[] = [
  // Transcritas em 15/11/2026 do perfil oficial (nota 5,0). Autorização: docs/AUTORIZACOES-AVALIACOES.md.
  {
    id: "g-crebilon",
    author: "Crebilon De Araújo",
    date: "2026-11-11",
    dateApprox: true,
    text: "Atendimento profissional com leveza e resultados concretos.",
    lang: "pt",
    rating: 5,
    authorized: true,
  },
  {
    id: "g-andreya",
    author: "Andreya Martins",
    date: "2026-11-08",
    dateApprox: true,
    text: "Sem palavras pra descrever ela😍 uma pessoa MARAVILHOSA 🩷 uma profissional sem igual , muito prestativa e presente do início ao fim das suas atividades com ela. Não tenho a reclamar ela me acompanhou durante minhas duas gestação e sempre quiz somente ela, por ser uma profissional exemplar e muito amável, ela ama oq faz , e sempre faz com carinho❣️🩷..",
    lang: "pt",
    rating: 5,
    authorized: true,
  },
  {
    id: "g-doraci",
    author: "Doraci Alves",
    date: "2026-11-08",
    dateApprox: true,
    text: "Samara é uma profissional excepcional porque tem compromisso com seu paciente é muito preocupada em ver o resultado realizado e o paciente satisfeito, eu como paciente dela senti segurança e tive um resultado muito positivo e vou continuar é super índico.",
    lang: "pt",
    rating: 5,
    authorized: true,
  },
  {
    id: "g-william",
    author: "William Cordeiro",
    date: "2026-11-08",
    dateApprox: true,
    text: "Atendido excelente! Precisei fazer fisioterapia após cirurgia de próstata devido a incontinência urinária. Hoje em dia não preciso não tenho mais problemas. Recomendo muito!",
    lang: "pt",
    rating: 5,
    authorized: true,
  },
  {
    id: "g-dezire",
    author: "Dezirê Gomes",
    date: "2026-11-08",
    dateApprox: true,
    text: "Após várias cirurgias na coluna, afetando a bexiga, conheci a Samara que me ajudou na minha recuperação.",
    lang: "pt",
    rating: 5,
    authorized: true,
  },
];

/** Link do perfil da Samara no Google (página de avaliações). Nulo = sem link. */
export const googleProfileUrl: string | null = "https://www.google.com/maps?cid=2387843673426098565";

/** Link curto oficial do perfil (informado pela Samara), usado em dados estruturados. */
export const googleShareUrl = "https://share.google/0U02eVQQcknDOJqB7";

/**
 * Nota geral e total de avaliações, conferidos manualmente no Perfil da Empresa. Atualizar com a data
 * da conferência (docs/REVIEWS.md). Não vira dado estruturado (o Google não aceita nota própria).
 */
export const googleRating: { value: number; count: number; checkedAt: string } | null = {
  value: 5,
  count: 6,
  checkedAt: "2026-11-15",
};
