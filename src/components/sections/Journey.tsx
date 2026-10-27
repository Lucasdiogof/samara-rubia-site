import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { getDict, href, type Lang } from "@/i18n";

/** Storytelling: a linha de progresso e as etapas acompanham o scroll. */
export function Journey({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const t = getDict(lang);
  return (
    <section
      className={`section ${compact ? "lap bg-background" : ""}`}
      aria-labelledby="jornada-title"
    >
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">{t.journeySection.eyebrow}</p>
            <RevealText as="h2" id="jornada-title" className="t-h2 mt-5">
              {t.journeySection.title}
            </RevealText>
            {compact && (
              <FadeInSection delay={0.2}>
                <Link
                  href={href(lang, "/como-funciona/")}
                  className="link-u mt-6 inline-block font-semibold text-cocoa-deep"
                >
                  {t.journeySection.details}
                </Link>
              </FadeInSection>
            )}
          </div>
        </div>
        <ol data-story className="relative lg:col-span-7">
          <span
            className="absolute bottom-3 left-[calc(1.125rem-0.5px)] top-3 w-px bg-border"
            aria-hidden="true"
          />
          <span
            data-progress
            className="absolute bottom-3 left-[calc(1.125rem-0.5px)] top-3 w-px origin-top bg-cocoa"
            aria-hidden="true"
          />
          {t.journey.map((s, i) => (
            <li key={s.title} data-step className="relative pb-10 pl-14 last:pb-0">
              <span className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full step-dot font-display text-lg">
                {i + 1}
              </span>
              <h3 className="t-h3">{s.title}</h3>
              <p className="mt-3 max-w-md text-cocoa">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
