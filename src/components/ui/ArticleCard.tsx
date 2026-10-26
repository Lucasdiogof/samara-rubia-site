import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import type { Article } from "@/config/content";
import { getDict, href, type Lang } from "@/i18n";
import { categoryLabel, formatDate } from "@/lib/content";

/** Card de artigo: capa 3:2 (ou composição gráfica), categoria, data, título e resumo. */
export function ArticleCard({ article, lang }: { article: Article; lang: Lang }) {
  const t = getDict(lang).content;
  const a = article.i18n[lang];
  return (
    <article className="group relative flex h-full flex-col" data-demo={article.demo || undefined}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-cream">
        {article.cover ? (
          <Photo photo={article.cover} sizes="(min-width: 1024px) 30vw, 90vw" />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(135deg,var(--cream),var(--sand))]"
          />
        )}
        {article.demo && (
          <span className="absolute left-3 top-3 rounded-full bg-cocoa-deep px-3 py-1 text-[0.68rem] font-semibold tracking-[0.08em] text-vanilla">
            {t.demo}
          </span>
        )}
      </div>
      <p className="mt-5 flex flex-wrap items-center gap-x-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
        <span>{categoryLabel(lang, article.category)}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.date} className="font-normal normal-case tracking-normal">
          {formatDate(lang, article.date)}
        </time>
      </p>
      <h3 className="mt-2 font-display text-[1.55rem] leading-tight text-cocoa-deep">
        <Link
          href={href(lang, `/conteudos/${article.slug}/`)}
          className="after:absolute after:inset-0"
        >
          {a.title}
        </Link>
      </h3>
      <p className="mt-2 text-cocoa">{a.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-cocoa-deep">
        {t.read}
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </article>
  );
}
