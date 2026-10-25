// Copie para src/app/conteudos/[slug]/page.tsx quando houver artigos revisados.
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageParts";
import { articles } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return a
    ? pageMetadata({
        title: a.seo?.title ?? a.title,
        description: a.seo?.description ?? a.summary,
        path: `/conteudos/${a.slug}/`,
      })
    : {};
}

export default async function Artigo({ params }: Props) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <>
      <PageHero
        eyebrow={a.category}
        title={a.title}
        lead={a.summary}
        crumbs={[
          { name: "Conteúdos", path: "/conteudos/" },
          { name: a.title, path: `/conteudos/${a.slug}/` },
        ]}
      />
      <article className="wrap prose-calm pb-24">
        <p className="text-sm">
          {a.author} · {a.date}
        </p>
        {a.body.split("\n\n").map((p) => (
          <p key={p}>{p}</p>
        ))}
      </article>
    </>
  );
}
