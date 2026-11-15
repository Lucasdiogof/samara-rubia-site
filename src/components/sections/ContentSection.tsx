import Link from "next/link";
import { ArticleGrid } from "@/components/ui/ArticleGrid";
import { PostGrid } from "@/components/ui/PostGrid";
import { ReelGrid } from "@/components/ui/ReelGrid";
import { getDict, href, type Lang } from "@/i18n";
import { allArticles, allPosts, allReels } from "@/lib/content";

/** Home: até 3 Reels e 3 artigos. Sem nenhum conteúdo publicado, a seção inteira some. */
export function ContentSection({ lang }: { lang: Lang }) {
  const t = getDict(lang).content;
  const reels = allReels().slice(0, 3);
  const posts = allPosts().slice(0, 3);
  const articles = allArticles().slice(0, 3);
  if (reels.length + posts.length + articles.length === 0) return null;
  return (
    <section className="section" aria-labelledby="conteudos-title">
      <div className="wrap">
        <h2 id="conteudos-title" className="eyebrow">
          {t.eyebrow}
        </h2>
        {reels.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-6 font-display text-3xl text-cocoa-deep">{t.videos}</h3>
            <ReelGrid reels={reels} lang={lang} />
          </div>
        )}
        {posts.length > 0 && (
          <div className="mt-12">
            <PostGrid posts={posts} lang={lang} />
          </div>
        )}
        {articles.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-6 font-display text-3xl text-cocoa-deep">{t.articles}</h3>
            <ArticleGrid articles={articles} lang={lang} />
          </div>
        )}
        <Link
          href={href(lang, "/conteudos/")}
          className="link-u mt-10 inline-block font-semibold text-cocoa-deep"
        >
          {t.seeAll}
        </Link>
      </div>
    </section>
  );
}
