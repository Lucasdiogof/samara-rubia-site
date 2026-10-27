import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
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
        <FadeInSection className="mt-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-[linear-gradient(135deg,var(--vanilla),var(--cream))] shadow-[var(--shadow-soft)] lg:grid lg:grid-cols-[1fr_22rem]">
            <ContactRows lang={lang} only={[...only]} bare />
            <div className="relative flex flex-col items-start justify-center gap-5 border-t border-border p-8 lg:border-l lg:border-t-0">
              <MapPin
                aria-hidden="true"
                strokeWidth={1}
                className="pointer-events-none absolute -bottom-3 right-4 h-28 w-28 text-cocoa opacity-[0.09]"
              />
              {site.location.mapsUrl && (
                <AnimatedButton href={site.location.mapsUrl} className="relative w-full sm:w-auto">
                  {getDict(lang).contactRows.directions}
                </AnimatedButton>
              )}
              <Link
                href={href(lang, "/contato/")}
                className="link-u relative inline-flex items-center gap-2 font-semibold text-cocoa-deep"
              >
                {t.allChannels}
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
