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
  /** true somente com autorização documentada da pessoa para publicar */
  authorized: boolean;
  demo?: boolean;
};

export const reels: Reel[] = [];
export const articles: Article[] = [];
export const reviews: Review[] = [];

/** Link do perfil da Samara no Google (página de avaliações). Nulo = sem link. */
export const googleProfileUrl: string | null = null;
