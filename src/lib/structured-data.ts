import { fullName, site } from "@/config/site";
import { getDict, langMeta, type Lang } from "@/i18n";
import { instagramUrl } from "./contact";

/** Só emite dados estruturados verdadeiros: Person/LocalBusiness exigem dados confirmados. */
export const websiteLd = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${fullName} — ${getDict(lang).specialty}`,
  url: site.url,
  inLanguage: langMeta[lang].htmlLang,
});

export function personLd(lang: Lang) {
  if (!site.professionalName) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.professionalName,
    jobTitle: getDict(lang).jobTitle,
    url: site.url,
    ...(instagramUrl ? { sameAs: [instagramUrl] } : {}),
  };
}

export function businessLd(lang: Lang) {
  const { address, city } = site.location;
  if (!site.professionalName || !address || !city) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Physiotherapy",
    name: `${site.professionalName} — ${getDict(lang).specialty}`,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: city,
      addressCountry: "BR",
    },
    ...(site.location.hours ? { openingHours: site.location.hours } : {}),
  };
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: new URL(it.path, site.url).toString(),
  })),
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});
