import type { Metadata } from "next";
import { fullName, site } from "@/config/site";
import { getDict, href, langMeta, langs, type Lang } from "@/i18n";
import { hasWhatsapp } from "@/lib/contact";

/** URL absoluta de um caminho neutro (/sobre/) no idioma indicado. */
export const localizedUrl = (lang: Lang, path: string) =>
  new URL(href(lang, path), site.url).toString();

/** Alternativas por idioma (hreflang) de um caminho neutro. */
export const languageAlternates = (path: string) => ({
  ...Object.fromEntries(langs.map((l) => [langMeta[l].htmlLang, localizedUrl(l, path)])),
  "x-default": localizedUrl("pt", path),
});

export const siteDescription = (lang: Lang) => getDict(lang).siteDescription(hasWhatsapp);

/** Troque public/og.png (1200×630) por uma versão com fotografia quando houver. */
const ogImage = (lang: Lang) => ({
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${fullName} — ${getDict(lang).specialty}`,
});

/** Único ponto que monta título, canonical, hreflang, Open Graph e Twitter Card. */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  lang: Lang;
}): Metadata {
  const url = localizedUrl(opts.lang, opts.path);
  const image = ogImage(opts.lang);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url, languages: languageAlternates(opts.path) },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: `${fullName} — ${getDict(opts.lang).specialty}`,
      locale: langMeta[opts.lang].ogLocale,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image.url],
    },
  };
}

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  lang: Lang;
}): Metadata {
  return buildMetadata({ ...opts, title: `${opts.title} | ${fullName}` });
}
