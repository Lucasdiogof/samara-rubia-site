import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { ContactRows, nothingConfirmed } from "@/components/ui/ContactRows";
import { site } from "@/config/site";
import { hasChannel } from "@/lib/contact";
import { getDict, href, type Lang } from "@/i18n";

const only = ["address", "modality", "hours"] as const;

/**
 * Localização. Sem nenhum dado confirmado, vira uma faixa curta (uma única mensagem);
 * com dados, mostra a seção completa automaticamente.
 */
export function LocationSection({ lang }: { lang: Lang }) {
  const t = getDict(lang).location;
  if (nothingConfirmed(lang, [...only])) {
    return (
      <section
        className="border-y border-border pb-[calc(2.5rem+var(--lap))] pt-10"
        aria-labelledby="local-title"
      >
        <div className="wrap flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="local-title" className="font-display text-2xl text-cocoa-deep">
            {t.shortTitle}
          </h2>
          <p className="text-cocoa">
            {t.soon}{" "}
            {hasChannel && (
              <Link href={href(lang, "/contato/")} className="link-u font-semibold text-cocoa-deep">
                {t.seeContact}
              </Link>
            )}
          </p>
        </div>
      </section>
    );
  }
  const place = [site.location.city, site.location.region].filter(Boolean).join(" · ");
  return (
    <section className="border-y border-border py-20" aria-labelledby="local-title">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">{t.eyebrow}</p>
          <RevealText as="h2" id="local-title" className="t-h2 mt-5">
            {t.title(place)}
          </RevealText>
          <FadeInSection delay={0.2}>
            {site.location.mapsUrl && (
              <AnimatedButton href={site.location.mapsUrl} className="mt-8">
                {getDict(lang).contactRows.directions}
              </AnimatedButton>
            )}
            <Link
              href={href(lang, "/contato/")}
              className="link-u mt-6 block w-fit font-semibold text-cocoa-deep"
            >
              {t.allChannels}
            </Link>
          </FadeInSection>
        </div>
        <FadeInSection className="lg:col-span-6 lg:col-start-7">
          <ContactRows lang={lang} only={[...only]} />
        </FadeInSection>
      </div>
    </section>
  );
}
