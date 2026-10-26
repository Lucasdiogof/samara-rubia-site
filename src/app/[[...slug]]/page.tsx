import { notFound } from "next/navigation";
import { href, langs, parseSlug } from "@/i18n";
import { getRoute, notFoundPath, routePaths } from "@/views";

export const dynamicParams = false;

type Props = { params: Promise<{ slug?: string[] }> };

/** Todas as combinações idioma × página: o português fica na raiz, en/es sob /en/ e /es/. */
export function generateStaticParams() {
  return [
    ...langs.flatMap((lang) =>
      routePaths.map((p) => ({ slug: href(lang, p).split("/").filter(Boolean) })),
    ),
    { slug: notFoundPath.split("/").filter(Boolean) },
  ];
}

export async function generateMetadata({ params }: Props) {
  const { lang, path } = parseSlug((await params).slug);
  return getRoute(path)?.meta(lang) ?? {};
}

export default async function Page({ params }: Props) {
  const { lang, path } = parseSlug((await params).slug);
  const route = getRoute(path);
  if (!route) notFound();
  return <route.View lang={lang} />;
}
