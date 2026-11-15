import { Star } from "lucide-react";
import { getDict, type Lang } from "@/i18n";
import { ReviewsCarousel } from "@/components/ui/ReviewsCarousel";
import { googleRating } from "@/config/content";
import { allReviews, formatDate, googleProfileUrl } from "@/lib/content";

/**
 * Avaliações do Google. Só exibe avaliações reais e autorizadas (config/content.ts); sem elas,
 * a seção some (ou vira um único link discreto se o perfil do Google estiver configurado).
 * Nunca emite dados estruturados de avaliação.
 */
export function ReviewsSection({ lang }: { lang: Lang }) {
  const t = getDict(lang).reviews;
  const list = allReviews();
  const rating = googleRating && (
    <p className="flex items-center gap-2 text-cocoa-deep">
      <Star size={18} fill="currentColor" aria-hidden="true" className="text-gold" />
      <span className="font-semibold">
        {t.summary(googleRating.value.toLocaleString(lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "pt-BR", { minimumFractionDigits: 1 }), googleRating.count)}
      </span>
    </p>
  );
  if (list.length === 0) {
    if (!googleProfileUrl) return null;
    return (
      <section className="border-t border-border py-10" aria-labelledby="avaliacoes-title">
        <div className="wrap flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex flex-col gap-2">
            <h2 id="avaliacoes-title" className="font-display text-2xl text-cocoa-deep">
              {t.eyebrow}
            </h2>
            {rating}
          </div>
          <a
            href={googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-u font-semibold text-cocoa-deep"
          >
            {t.seeAll}
          </a>
        </div>
      </section>
    );
  }
  return (
    <section className="section lap overflow-x-clip bg-cream" aria-labelledby="avaliacoes-title">
      <div className="wrap">
        <h2 id="avaliacoes-title" className="eyebrow mb-8">
          {t.eyebrow}
        </h2>
        <ReviewsCarousel label={t.carousel} prev={t.prev} next={t.next} goTo={list.map((_, i) => t.goTo(i + 1))}>
          {list.map((r) => (
            <figure key={r.id} className="flex w-full flex-col rounded-[1.5rem] bg-vanilla p-7 shadow-[var(--shadow-soft)]">
              {r.rating && (
                <p className="mb-3 flex gap-0.5 text-gold" role="img" aria-label={t.stars(r.rating)}>
                  {Array.from({ length: r.rating }, (_, i) => (
                    <Star key={i} size={18} fill="currentColor" aria-hidden="true" />
                  ))}
                </p>
              )}
              <blockquote lang={r.lang} className="flex-1 text-cocoa-deep">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 text-sm text-cocoa">
                <span className="font-semibold text-cocoa-deep">{r.author}</span>
                <span aria-hidden="true"> · </span>
                <time dateTime={r.date}>{formatDate(lang, r.date, r.dateApprox)}</time>
                <span className="block">
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="link-u">
                      {t.source}
                    </a>
                  ) : (
                    t.source
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </ReviewsCarousel>
        {googleProfileUrl && (
          <a
            href={googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-u mt-10 inline-block font-semibold text-cocoa-deep"
          >
            {t.seeAll}
          </a>
        )}
      </div>
    </section>
  );
}
