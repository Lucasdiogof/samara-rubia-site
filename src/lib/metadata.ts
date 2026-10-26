import type { Metadata } from "next";
import { fullName, site } from "@/config/site";
import { hasWhatsapp } from "@/lib/contact";

/** Descrição geral: só cita o WhatsApp quando o canal existe. */
export const siteDescription = `${site.specialty} para homens e mulheres: avaliação individual, escuta e acolhimento.${hasWhatsapp ? " Agende pelo WhatsApp." : ""}`;

/** Troque public/og.png (1200×630) por uma versão com fotografia quando houver. */
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${fullName} — ${site.specialty}`,
};

/** Único ponto que monta título, canonical, Open Graph e Twitter Card. */
export function buildMetadata(opts: { title: string; description: string; url: string }): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.url,
      siteName: `${fullName} — ${site.specialty}`,
      locale: "pt_BR",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogImage.url],
    },
  };
}

export function pageMetadata(opts: { title: string; description: string; path: string }): Metadata {
  return buildMetadata({
    title: `${opts.title} | ${fullName}`,
    description: opts.description,
    url: new URL(opts.path, site.url).toString(),
  });
}
