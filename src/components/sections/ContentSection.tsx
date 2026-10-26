import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { ArticleGrid } from "@/components/ui/ArticleGrid";
import { ReelGrid } from "@/components/ui/ReelGrid";
import { getDict, href, type Lang } from "@/i18n";
import { allArticles, allReels } from "@/lib/content";

/** Home: até 3 Reels e 3 artigos. Sem nenhum conteúdo publicado, a seção inteira some. */
export function ContentSection({ lang }: { lang: Lang }) {
  const t = getDict(lang).content;
  const reels = allReels().slice(0, 3);
  const articles = allArticles().slice(0, 3);
  if (reels.length + articles.length === 0) return null;
  return (
    <section className="section" aria-labelledby="conteudos-title">
      <div className="wrap">
        <p className="eyebrow">{t.eyebrow}</p>
        <RevealText as="h2" id="conteudos-title" className="t-h2 mt-5 max-w-3xl">
          {t.title}
        </RevealText>
        <FadeInSection delay={0.2}>
          <p className="t-lead mt-6">{t.lead}</p>
        </FadeInSection>
        {reels.length > 0 && (
          <div className="mt-14">
            <h3 className="mb-6 font-display text-3xl text-cocoa-deep">{t.videos}</h3>
            <ReelGrid reels={reels} lang={lang} />
          </div>
        )}
        {articles.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 font-display text-3xl text-cocoa-deep">{t.articles}</h3>
            <ArticleGrid articles={articles} lang={lang} />
          </div>
        )}
        <Link
          href={href(lang, "/conteudos/")}
          className="link-u mt-12 inline-block font-semibold text-cocoa-deep"
        >
          {t.seeAll}
        </Link>
      </div>
    </section>
  );
}
