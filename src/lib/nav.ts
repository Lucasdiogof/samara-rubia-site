import { getDict, href, type Lang } from "@/i18n";
import { hasContent } from "@/lib/content";

/** Itens do menu no idioma. "Conteúdos" só aparece quando há algo publicado. */
export function navItems(lang: Lang) {
  const t = getDict(lang).nav;
  return [
    { path: "/", label: t.home },
    { path: "/sobre/", label: t.about },
    { path: "/tratamentos/", label: t.treatments },
    ...(hasContent() ? [{ path: "/conteudos/", label: t.content }] : []),
    { path: "/como-funciona/", label: t.how },
    { path: "/perguntas-frequentes/", label: t.faq },
    { path: "/contato/", label: t.contact },
  ].map((n) => ({ ...n, href: href(lang, n.path) }));
}
