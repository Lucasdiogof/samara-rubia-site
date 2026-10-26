/**
 * EXEMPLOS FICTÍCIOS só para desenvolvimento e comparação visual (NEXT_PUBLIC_CONTENT_DEMO=true
 * ou `next dev`). Nunca entram no build público: ver `showDemo` em lib/content.ts.
 */
import type { Article, Reel, Review } from "@/config/content";

const lorem = (t: string) => ({
  title: `${t} (exemplo)`,
  summary: "Texto de exemplo para teste de layout. Não é conteúdo clínico real.",
  body: [
    "Parágrafo de exemplo para teste de layout. Não é conteúdo clínico real.",
    "## Subtítulo de exemplo",
    "Outro parágrafo de exemplo, apenas para verificar espaçamento e leitura.",
  ],
});

export const demoReels: Reel[] = [1, 2, 3].map((n) => ({
  id: `demo-reel-${n}`,
  url: `https://www.instagram.com/reel/DEMO000000${n}/`,
  title: {
    pt: `Reel de exemplo ${n}`,
    en: `Sample reel ${n}`,
    es: `Reel de ejemplo ${n}`,
  },
  cover: null,
  date: "2026-01-01",
  demo: true,
}));

export const demoArticles: Article[] = (
  [
    ["exemplo-um", "geral"],
    ["exemplo-dois", "gestacao"],
    ["exemplo-tres", "incontinencia"],
  ] as const
).map(([slug, category], i) => ({
  slug,
  category,
  date: `2026-01-0${i + 1}`,
  cover: null,
  approved: true,
  demo: true,
  i18n: {
    pt: lorem(`Artigo ${i + 1}`),
    en: { ...lorem(`Article ${i + 1}`), title: `Sample article ${i + 1}` },
    es: { ...lorem(`Artículo ${i + 1}`), title: `Artículo de ejemplo ${i + 1}` },
  },
}));

export const demoReviews: Review[] = [1, 2, 3].map((n) => ({
  id: `demo-review-${n}`,
  author: `Nome de exemplo ${n}`,
  date: "2026-01-01",
  text: "Texto de avaliação de exemplo, apenas para teste de layout.",
  lang: "pt",
  authorized: true,
  demo: true,
}));
