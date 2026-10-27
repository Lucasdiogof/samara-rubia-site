import Link from "next/link";
import { FadeInSection } from "@/components/animations/Reveal";
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
  return (
    <section
      className="border-y border-border pb-[calc(2.5rem+var(--lap))] pt-10"
      aria-labelledby="local-title"
    >
      <div className="wrap">
        <h2 id="local-title" className="eyebrow">
          {t.eyebrow}
        </h2>
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-12">
          <FadeInSection className="lg:col-span-7">
            <ContactRows lang={lang} only={[...only]} />
          </FadeInSection>
          <FadeInSection delay={0.1} className="flex flex-col items-start gap-5 lg:col-span-5 lg:pl-6">
            {site.location.mapsUrl && (
              <AnimatedButton href={site.location.mapsUrl}>
                {getDict(lang).contactRows.directions}
              </AnimatedButton>
            )}
            <Link
              href={href(lang, "/contato/")}
              className="link-u font-semibold text-cocoa-deep"
            >
              {t.allChannels}
            </Link>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
