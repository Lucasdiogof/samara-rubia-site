/** Idiomas do site. O português fica na raiz (/sobre/); os demais ganham prefixo (/en/about...). */
export const langs = ["pt", "en", "es"] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = "pt";

export const langMeta: Record<Lang, { htmlLang: string; ogLocale: string; label: string; name: string }> = {
  pt: { htmlLang: "pt-BR", ogLocale: "pt_BR", label: "PT", name: "Português" },
  en: { htmlLang: "en", ogLocale: "en_US", label: "EN", name: "English" },
  es: { htmlLang: "es", ogLocale: "es_ES", label: "ES", name: "Español" },
};

/** Mensagem inicial do WhatsApp e rótulo do CTA principal (pequenos: usados em componentes de cliente). */
export const waMessage: Record<Lang, string> = {
  pt: "Olá, Samara! Gostaria de saber mais sobre o atendimento de fisioterapia pélvica e agendar uma avaliação.",
  en: "Hello, Samara! I'd like to know more about pelvic physiotherapy and book an assessment.",
  es: "¡Hola, Samara! Me gustaría saber más sobre la fisioterapia pélvica y reservar una evaluación.",
};
export const ctaLabel: Record<Lang, { schedule: string; instagram: string }> = {
  pt: { schedule: "Agendar avaliação", instagram: "Conhecer no Instagram" },
  en: { schedule: "Book an assessment", instagram: "Visit Instagram" },
  es: { schedule: "Reservar evaluación", instagram: "Conocer en Instagram" },
};

export const isLang = (v: string | undefined): v is Lang => !!v && (langs as readonly string[]).includes(v);

/** Caminho "neutro" (/sobre/) para o caminho do idioma (/en/sobre/). */
export const href = (lang: Lang, path: string) =>
  lang === defaultLang ? path : path === "/" ? `/${lang}/` : `/${lang}${path}`;

/** Separa o idioma do caminho atual: "/en/sobre/" -> { lang: "en", path: "/sobre/" }. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isLang(first) && first !== defaultLang) return { lang: first, path: `/${rest.join("/")}` };
  return { lang: defaultLang, path: pathname };
}

/** Segmentos da URL -> idioma + caminho neutro: ["en","sobre"] -> { lang: "en", path: "/sobre/" }. */
export function parseSlug(slug: string[] = []): { lang: Lang; path: string } {
  const [first, ...rest] = slug;
  const lang = isLang(first) && first !== defaultLang ? first : defaultLang;
  const parts = lang === defaultLang ? slug : rest;
  return { lang, path: parts.length ? `/${parts.join("/")}/` : "/" };
}
