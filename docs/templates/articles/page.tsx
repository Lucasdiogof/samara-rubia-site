// Copie para src/app/conteudos/page.tsx quando houver artigos revisados.
import Link from "next/link";
import { PageHero } from "@/components/ui/PageParts";
import { articles } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Conteúdos",
  description: "Artigos educativos sobre saúde pélvica.",
  path: "/conteudos/",
});

export default function Conteudos() {
  return (
    <>
      <PageHero
        eyebrow="Conteúdos"
        title="Para *entender* melhor."
        crumbs={[{ name: "Conteúdos", path: "/conteudos/" }]}
      />
      <section className="wrap pb-24">
        <ul className="divide-y divide-border border-y border-border">
          {articles.map((a) => (
            <li key={a.slug} className="py-6">
              <Link href={`/conteudos/${a.slug}/`} className="font-display text-3xl">
                {a.title}
              </Link>
              <p className="mt-2 text-cocoa">{a.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
