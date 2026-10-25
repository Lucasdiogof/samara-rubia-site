export type Article = {
  slug: string;
  title: string;
  summary: string;
  date: string; // AAAA-MM-DD
  category: string;
  author: string;
  body: string; // parágrafos separados por linha em branco
  seo?: { title?: string; description?: string };
};

/** Vazio de propósito: só publique artigos revisados. Ver docs/DOCUMENTATION.md. */
export const articles: Article[] = [];
