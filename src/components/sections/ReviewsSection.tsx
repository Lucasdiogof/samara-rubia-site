import { Star } from "lucide-react";
import { RevealText, StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { getDict, type Lang } from "@/i18n";
import { allReviews, formatDate, googleProfileUrl } from "@/lib/content";

/**
 * Avaliações do Google. Só exibe avaliações reais e autorizadas (config/content.ts); sem elas,
 * a seção some (ou vira um único link discreto se o perfil do Google estiver configurado).
 * Nunca emite dados estruturados de avaliação.
 */
export function ReviewsSection({ lang }: { lang: Lang }) {
  const t = getDict(lang).reviews;
  const list = allReviews();
  if (list.length === 0) {
    if (!googleProfileUrl) return null;
    return (
      <section className="border-t border-border py-10" aria-labelledby="avaliacoes-title">
        <div className="wrap flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="avaliacoes-title" className="font-display text-2xl text-cocoa-deep">
            {t.eyebrow}
          </h2>
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
    <section className="section lap bg-cream" aria-labelledby="avaliacoes-title">
      <div className="wrap">
        <p className="eyebrow">{t.eyebrow}</p>
        <RevealText as="h2" id="avaliacoes-title" className="t-h2 mt-5 max-w-3xl">
          {t.title}
        </RevealText>
        <p className="t-lead mt-6">{t.lead}</p>
        <StaggerContainer as="ul" className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 6).map((r) => (
            <StaggerItem
              as="li"
              key={r.id}
              className="rounded-[1.5rem] bg-vanilla p-7 shadow-[var(--shadow-soft)]"
            >
              <div data-demo={r.demo || undefined} className="flex h-full flex-col">
                {r.demo && (
                  <p className="mb-4 w-fit rounded-xl bg-cocoa-deep px-3 py-1 text-xs font-semibold tracking-[0.06em] text-vanilla">
                    {t.demo}
                  </p>
                )}
                {r.rating && (
                  <p
                    className="mb-3 flex gap-0.5 text-cocoa"
                    role="img"
                    aria-label={t.stars(r.rating)}
                  >
                    {Array.from({ length: r.rating }, (_, i) => (
                      <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
                    ))}
                  </p>
                )}
                <blockquote lang={r.lang} className="flex-1 text-cocoa-deep">
                  “{r.text}”
                </blockquote>
                <footer className="mt-6 border-t border-border pt-4 text-sm text-cocoa">
                  <span className="font-semibold text-cocoa-deep">{r.author}</span>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={r.date}>{formatDate(lang, r.date)}</time>
                  <span className="block">
                    {r.url && !r.demo ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="link-u">
                        {t.source}
                      </a>
                    ) : (
                      t.source
                    )}
                  </span>
                </footer>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
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
