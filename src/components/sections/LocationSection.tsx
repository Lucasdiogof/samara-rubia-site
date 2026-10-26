import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { ContactRows, nothingConfirmed } from "@/components/ui/ContactRows";
import { site } from "@/config/site";
import { hasChannel } from "@/lib/contact";

const only = ["address", "modality", "hours"] as const;

/**
 * Localização. Sem nenhum dado confirmado, vira uma faixa curta (uma única mensagem);
 * com dados, mostra a seção completa automaticamente.
 */
export function LocationSection() {
  if (nothingConfirmed([...only])) {
    return (
      <section
        className="border-y border-border pb-[calc(2.5rem+var(--lap))] pt-10"
        aria-labelledby="local-title"
      >
        <div className="wrap flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="local-title" className="font-display text-2xl text-cocoa-deep">
            Onde encontrar o atendimento
          </h2>
          <p className="text-cocoa">
            Endereço, modalidade e horários serão divulgados em breve.{" "}
            {hasChannel && (
              <Link href="/contato/" className="link-u font-semibold text-cocoa-deep">
                Ver contato
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
          <p className="eyebrow">Localização</p>
          <RevealText as="h2" id="local-title" className="t-h2 mt-5">
            {place
              ? `${place}: onde *encontrar* o atendimento.`
              : "Onde *encontrar* o atendimento."}
          </RevealText>
          <FadeInSection delay={0.2}>
            <Link
              href="/contato/"
              className="link-u mt-6 inline-block font-semibold text-cocoa-deep"
            >
              Todos os canais de contato
            </Link>
          </FadeInSection>
        </div>
        <FadeInSection className="lg:col-span-6 lg:col-start-7">
          <ContactRows only={[...only]} />
        </FadeInSection>
      </div>
    </section>
  );
}
