import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { ContactRows } from "@/components/ui/ContactRows";
import { site } from "@/config/site";

/** Mostra apenas dados confirmados; o restante aparece como "A confirmar". */
export function LocationSection() {
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
          <ContactRows only={["address", "modality", "hours"]} />
        </FadeInSection>
      </div>
    </section>
  );
}
