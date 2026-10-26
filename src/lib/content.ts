import {
  articles as realArticles,
  reels as realReels,
  reviews as realReviews,
  googleProfileUrl,
  type Article,
  type Reel,
  type Review,
} from "@/config/content";
import { demoArticles, demoReels, demoReviews } from "@/content/demo";
import { getDict, type Lang } from "@/i18n";

/** Exemplos fictícios: somente em `next dev` ou com NEXT_PUBLIC_CONTENT_DEMO=true (nunca em produção). */
export const showDemo =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_CONTENT_DEMO === "true";

const byDateDesc = <T extends { date: string }>(l: T[]) =>
  [...l].sort((a, b) => b.date.localeCompare(a.date));

export const allReels = (): Reel[] =>
  byDateDesc([...realReels, ...(showDemo ? demoReels : [])]);

/** Só artigos aprovados pela Samara (e os exemplos de desenvolvimento). */
export const allArticles = (): Article[] =>
  byDateDesc([...realArticles, ...(showDemo ? demoArticles : [])].filter((a) => a.approved));

export const allReviews = (): Review[] =>
  byDateDesc([...realReviews, ...(showDemo ? demoReviews : [])].filter((r) => r.authorized));

export const hasContent = () => allReels().length + allArticles().length > 0;
export { googleProfileUrl };

export const categoryLabel = (lang: Lang, c: Article["category"]) =>
  getDict(lang).content.categories[c];

export const formatDate = (lang: Lang, iso: string) =>
  new Intl.DateTimeFormat({ pt: "pt-BR", en: "en-GB", es: "es-ES" }[lang], {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

/** Código do Reel a partir do link original; nulo se o link não for de um Reel/post do Instagram. */
export const instagramCode = (url: string) =>
  /^https:\/\/(www\.)?instagram\.com\/(reel|reels|p)\/([\w-]+)/.exec(url)?.[3] ?? null;
